/*
 * Chocolata, the dog who lives next to the name.
 *
 * She is a frame puppet: one <img> per pose, all stacked in the same box, one
 * of them visible at a time. Cuts between frames are hard, like cels. A small
 * state machine picks the frame from pointer proximity, dwell and shake.
 *
 * Render geometry (her size, the gap, the drop past the baseline) lives in
 * styles.css so she scales with the display type. Everything here is
 * behaviour. Nothing here is required for the page to render: without the
 * script she stays on the one frame the markup already ships.
 */
(function () {
    'use strict';

    var slot = document.querySelector('.chocolata');
    var body = slot && slot.querySelector('.chocolata-body');
    var seed = body && body.querySelector('img');
    if (!seed) return;

    var CENTER = 'gaze-mid-c.png';
    var DIR = seed.getAttribute('src').replace(/[^/]+$/, '');

    /* Consulted before anything moves, loads or listens. */
    var reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    var reduced = reduceQuery.matches;

    /* Tuned on the puppet rig and frozen here. Sizes and offsets are not in
       this list; they are CSS, because they scale with the name. */
    var CFG = {
        radius: 245,          /* px from her centre: awake and tracking inside it */
        lerp: 0.18,           /* gaze easing per 60fps frame */
        blinkMin: 2.5,        /* s */
        blinkMax: 7,          /* s */
        blinkHold: 130,       /* ms */
        drowsyTimeout: 8,     /* s ignored before her eyes go heavy */
        sleepTimeout: 12,     /* s drowsy before she drops off */
        breathing: true,
        zzz: true,
        shakeThreshold: 5,    /* direction reversals per second, over her */
        annoyedHold: 2.5,     /* s */
        bellyDwell: 4000,     /* ms of still hover before she rolls */
        bellyDwellTouch: 1000, /* ms of press; a finger cannot rest as still as a cursor */
        transStep: 150,       /* ms per in-between frame */
        emoteRate: 500        /* ms between glyphs in a continuous stream */
    };

    var WAKE_THROUGH_DROWSY_MS = 300;
    var SHAKE_WINDOW_MS = 1000;
    var TAP_WINDOW_MS = 1200;
    var TAP_ANNOY_COUNT = 3;

    /* The size the radius above was tuned against. She is sized in em, so the
       radius is scaled by however big she actually rendered. */
    var TUNED_SIZE = 110;

    /* Her drawn silhouette sits inside the square frame with room to spare, and
       the bottom of that frame hangs over the role line. Hit testing the whole
       square would mean a pointer resting on the link below counted as a hand on
       her back. These trim the square down to the dog. */
    var HIT_INSET = { side: 0.18, top: 0.10, bottom: 0.30 };

    /* Her box only moves when the pointer, the scroll or the viewport does. This
       is the ceiling on trusting that, so a late reflow cannot strand her. */
    var GEOMETRY_MAX_AGE_MS = 500;

    /* ---------------------------------------------------------------- *
     * Frames
     * ---------------------------------------------------------------- */

    var GAZE_ROWS = ['up', 'mid', 'down'];
    var GAZE_COLS = ['l2', 'l1', 'c', 'r1', 'r2'];

    var MANIFEST = [];
    GAZE_ROWS.forEach(function (row, r) {
        GAZE_COLS.forEach(function (col, c) {
            MANIFEST.push({ file: 'gaze-' + row + '-' + col + '.png', group: 'gaze', row: r, col: c });
        });
    });
    ['blink.png', 'drowsy.png', 'asleep.png', 'annoyed-1.png', 'annoyed-2.png',
        'annoyed.png', 'roll-1.png', 'roll-2.png', 'roll-3.png', 'belly-up.png'
    ].forEach(function (file) {
        MANIFEST.push({ file: file, group: 'pose' });
    });

    var byFile = new Map(MANIFEST.map(function (m) { return [m.file, m]; }));
    var GAZE_FRAMES = MANIFEST.filter(function (m) { return m.group === 'gaze'; });

    /* Frames arrive after first paint, so every pose needs a stand-in for the
       moment it is still in flight. */
    var FALLBACK = {
        'blink.png': [CENTER],
        'drowsy.png': ['asleep.png', CENTER],
        'asleep.png': ['drowsy.png', CENTER],
        'annoyed.png': [CENTER],
        'annoyed-1.png': [CENTER],
        'annoyed-2.png': ['annoyed.png', CENTER],
        'belly-up.png': [CENTER],
        'roll-1.png': [CENTER],
        'roll-2.png': ['belly-up.png', CENTER],
        'roll-3.png': ['belly-up.png', CENTER]
    };

    var present = new Set([CENTER]);
    var layers = new Map([[CENTER, seed]]);
    var activeFile = CENTER;
    var framesRequested = false;

    /* The masthead costs one image on first paint. The other twenty-four load
       once the page is done, or the moment she notices a pointer nearby. */
    function loadFrames() {
        if (framesRequested || reduced) return;
        /* A cursor that starts life near the masthead must not pull twenty-four
           images into the page's own load. The load listener picks this up. */
        if (document.readyState !== 'complete') return;
        framesRequested = true;
        MANIFEST.forEach(function (m) {
            if (m.file === CENTER) return;
            var img = new Image();
            img.alt = '';
            img.decoding = 'async';
            img.fetchPriority = 'low';
            img.addEventListener('load', function () { present.add(m.file); });
            img.src = DIR + m.file;
            body.appendChild(img);
            layers.set(m.file, img);
        });
    }

    function nearestGaze(row, col) {
        var best = null;
        var bestCost = Infinity;
        for (var i = 0; i < GAZE_FRAMES.length; i++) {
            var m = GAZE_FRAMES[i];
            if (!present.has(m.file)) continue;
            var cost = Math.abs(m.row - row) * 1.25 + Math.abs(m.col - col);
            if (cost < bestCost) { bestCost = cost; best = m.file; }
        }
        return best;
    }

    function resolveFrame(file) {
        if (present.has(file)) return file;

        var meta = byFile.get(file);
        if (meta && meta.group === 'gaze') {
            var near = nearestGaze(meta.row, meta.col);
            if (near) return near;
        }

        var chain = FALLBACK[file] || [];
        for (var i = 0; i < chain.length; i++) {
            if (present.has(chain[i])) return chain[i];
        }
        return CENTER;
    }

    function showFrame(file) {
        if (file === activeFile) return;
        var prev = layers.get(activeFile);
        if (prev) prev.classList.remove('is-shown');
        var next = layers.get(file);
        if (next) next.classList.add('is-shown');
        activeFile = file;
    }

    /* ---------------------------------------------------------------- *
     * State machine
     * ---------------------------------------------------------------- */

    var S = {
        AWAKE: 'awake',
        DROWSY: 'drowsy',
        ASLEEP: 'asleep',
        WAKING: 'waking',
        ANNOYED: 'annoyed',
        TRANS_IN: 'transition-in',
        TRANS_OUT: 'transition-out',
        BELLY: 'belly-up'
    };

    /* Timed in-between sequences. Played forward into `rest`, reversed back to
       AWAKE. `reversible` lets the belly roll turn around mid-sequence when the
       pointer leaves; the annoyed flare always plays out and holds first. */
    var TRANSITIONS = {
        belly: {
            files: ['roll-1.png', 'roll-2.png', 'roll-3.png'],
            rest: S.BELLY, reversible: true
        },
        annoyed: {
            files: ['annoyed-1.png', 'annoyed-2.png'],
            rest: S.ANNOYED, reversible: false
        }
    };

    var state = S.AWAKE;
    var stateSince = performance.now();

    var pointer = { present: false, overDog: false, inRadius: false, dist: Infinity, x: 0, y: 0 };
    var gaze = { x: 0, y: 0 };
    var aim = { x: 0, y: 0 };

    var rect = null;              /* her box as of the last measurement */
    var geometryDirty = true;
    var measuredAt = 0;

    var outsideSince = performance.now();
    var overDogSince = null;
    var reversals = [];
    var taps = [];
    var lastX = 0;
    var lastMoveDir = 0;
    var blinkAt = 0;
    var blinkUntil = 0;
    var desiredFile = CENTER;

    var trans = null;
    var transName = null;
    var transSeq = [];
    var transIndex = 0;
    var transNextAt = 0;

    function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }

    /* Analytics is optional equipment. When /analytics.js chose not to run
       (localhost, DNT, GPC, blocker) there is no posthog and she keeps her
       secrets. */
    function report(name, props) {
        if (window.posthog && window.posthog.capture) window.posthog.capture(name, props);
    }

    function setState(next, now) {
        if (state === next) return;
        if (next === S.BELLY) report('chocolata_belly_rub');
        if (next === S.WAKING && state === S.ASLEEP) report('chocolata_woken');
        state = next;
        stateSince = now;
        burstQueue.length = 0;
        if (next === S.AWAKE) scheduleBlink(now);
        if (next === S.ASLEEP && CFG.zzz) queueBurst('sleep', now);
    }

    function scheduleBlink(now) {
        var lo = Math.min(CFG.blinkMin, CFG.blinkMax);
        var hi = Math.max(CFG.blinkMin, CFG.blinkMax);
        blinkAt = now + (lo + Math.random() * (hi - lo)) * 1000;
    }

    /* dir +1 plays into the rest state, -1 plays back out to AWAKE. Passing
       `from` keeps a mid-sequence reversal on the frame already showing so it
       never snaps. Returns false when the in-between frames are still loading. */
    function beginTransition(name, dir, now, from) {
        var seq = TRANSITIONS[name].files.filter(function (f) { return present.has(f); });
        if (!seq.length) return false;
        trans = TRANSITIONS[name];
        transName = name;
        transSeq = seq;
        transIndex = from === null
            ? (dir > 0 ? 0 : seq.length - 1)
            : clamp(from, 0, seq.length - 1);
        transNextAt = now + CFG.transStep;
        setState(dir > 0 ? S.TRANS_IN : S.TRANS_OUT, now);
        return true;
    }

    function arriveAwake(now, inRadius, overDog) {
        setState(S.AWAKE, now);
        outsideSince = inRadius ? null : now;
        overDogSince = overDog ? now : null;
    }

    function annoy(now, via) {
        report('chocolata_annoyed', { via: via });
        if (!beginTransition('annoyed', 1, now, null)) setState(S.ANNOYED, now);
        reversals.length = 0;
        overDogSince = null;
    }

    function gazeFrame(nx, ny) {
        var col = nx < -0.6 ? 0 : nx < -0.18 ? 1 : nx <= 0.18 ? 2 : nx <= 0.6 ? 3 : 4;
        var row = ny < -0.22 ? 0 : ny <= 0.22 ? 1 : 2;
        return 'gaze-' + GAZE_ROWS[row] + '-' + GAZE_COLS[col] + '.png';
    }

    function shakeRate(now) {
        while (reversals.length && now - reversals[0] > SHAKE_WINDOW_MS) reversals.shift();
        return reversals.length;
    }

    /* Where the pointer sits relative to her. She is laid out in flowing text, so
       her box moves whenever the page does, and the pointer can hold still while
       she does not: this is the one place that measures her, once a frame. */
    function refreshAim(now) {
        var r = body.getBoundingClientRect();
        rect = r;
        geometryDirty = false;
        measuredAt = now;

        var dx = pointer.x - (r.left + r.width / 2);
        var dy = pointer.y - (r.top + r.height / 2);
        var span = Math.max(1, radiusFor(r) * 0.6);

        pointer.dist = Math.hypot(dx, dy);
        pointer.inRadius = pointer.dist <= radiusFor(r);
        pointer.overDog =
            pointer.x >= r.left + r.width * HIT_INSET.side &&
            pointer.x <= r.right - r.width * HIT_INSET.side &&
            pointer.y >= r.top + r.height * HIT_INSET.top &&
            pointer.y <= r.bottom - r.height * HIT_INSET.bottom;
        aim.x = clamp(dx / span, -1, 1);
        aim.y = clamp(dy / span, -1, 1);
    }

    function radiusFor(r) {
        return CFG.radius * (r.width / TUNED_SIZE);
    }

    function update(now, dt) {
        /* Skipped while the pointer, the page and the viewport all hold still:
           nothing about her geometry can have changed, and the measurement is the
           only expensive thing on an idle tick. */
        if (pointer.present && (geometryDirty || now - measuredAt > GEOMETRY_MAX_AGE_MS)) {
            refreshAim(now);
        }
        var inRadius = pointer.present && pointer.inRadius;
        var overDog = pointer.present && pointer.overDog;

        /* Reversals only count while she is actually under the pointer, so a
           jittery trip across the page cannot arrive already armed. */
        if (!overDog) reversals.length = 0;

        /* Annoyed outranks the belly dwell, and only fires over her. A roll in
           progress is uninterruptible: it plays out before anything else. */
        var annoyable = state === S.AWAKE || state === S.BELLY || state === S.WAKING;
        if (overDog && annoyable && shakeRate(now) >= CFG.shakeThreshold) annoy(now, 'shake');

        switch (state) {
            case S.ANNOYED:
                if (now - stateSince >= CFG.annoyedHold * 1000) {
                    if (!beginTransition('annoyed', -1, now, null)) arriveAwake(now, inRadius, overDog);
                }
                break;

            case S.BELLY:
                if (!overDog) {
                    overDogSince = null;
                    if (!beginTransition('belly', -1, now, null)) arriveAwake(now, inRadius, overDog);
                }
                break;

            case S.TRANS_IN:
                if (now >= transNextAt) {
                    if (trans.reversible && !overDog) {
                        beginTransition(transName, -1, now, transIndex);
                    } else if (++transIndex >= transSeq.length) {
                        setState(trans.rest, now);
                    } else {
                        transNextAt = now + CFG.transStep;
                    }
                }
                break;

            case S.TRANS_OUT:
                if (now >= transNextAt) {
                    if (--transIndex < 0) arriveAwake(now, inRadius, overDog);
                    else transNextAt = now + CFG.transStep;
                }
                break;

            case S.AWAKE:
                if (overDog) {
                    if (overDogSince === null) overDogSince = now;
                    else if (now - overDogSince >= (pointer.touch ? CFG.bellyDwellTouch : CFG.bellyDwell)) {
                        if (!beginTransition('belly', 1, now, null)) setState(S.BELLY, now);
                    }
                } else {
                    overDogSince = null;
                }
                if (inRadius) {
                    outsideSince = null;
                } else {
                    if (outsideSince === null) outsideSince = now;
                    if (now - outsideSince >= CFG.drowsyTimeout * 1000) setState(S.DROWSY, now);
                }
                /* blink.png has a frontal head, so blinking out of a turned gaze
                   would snap her neck. Only blink from the neutral centre frame. */
                if (state === S.AWAKE && now >= blinkAt && present.has('blink.png')) {
                    if (resolveFrame(gazeFrame(gaze.x, gaze.y)) === CENTER) {
                        blinkUntil = now + CFG.blinkHold;
                        scheduleBlink(now + CFG.blinkHold);
                    } else {
                        scheduleBlink(now);
                    }
                }
                break;

            case S.DROWSY:
                if (inRadius) setState(S.WAKING, now);
                else if (now - stateSince >= CFG.sleepTimeout * 1000) setState(S.ASLEEP, now);
                break;

            case S.ASLEEP:
                if (inRadius) setState(S.WAKING, now);
                break;

            case S.WAKING:
                if (now - stateSince >= WAKE_THROUGH_DROWSY_MS) arriveAwake(now, inRadius, overDog);
                break;
        }

        /* Gaze eases toward the pointer; it recentres when she is not tracking. */
        var tracking = inRadius && state === S.AWAKE;
        var k = CFG.lerp >= 1 ? 1 : 1 - Math.pow(1 - CFG.lerp, dt / 16.667);
        gaze.x += ((tracking ? aim.x : 0) - gaze.x) * k;
        gaze.y += ((tracking ? aim.y : 0) - gaze.y) * k;

        switch (state) {
            case S.ASLEEP: desiredFile = 'asleep.png'; break;
            case S.DROWSY:
            case S.WAKING: desiredFile = 'drowsy.png'; break;
            case S.ANNOYED: desiredFile = 'annoyed.png'; break;
            case S.BELLY: desiredFile = 'belly-up.png'; break;
            case S.TRANS_IN:
            case S.TRANS_OUT:
                desiredFile = transSeq[clamp(transIndex, 0, transSeq.length - 1)] || CENTER;
                break;
            default:
                desiredFile = now < blinkUntil ? 'blink.png' : gazeFrame(gaze.x, gaze.y);
        }
    }

    /* ---------------------------------------------------------------- *
     * Emotes: drifting glyphs. `stream` emits on the emote-rate clock for as
     * long as its state holds; `burst` fires a fixed run once on entry. Bands
     * are fractions of her box, so they follow her render size.
     * ---------------------------------------------------------------- */

    var EMOTES = {
        love: {
            /* Trailing U+FE0E: without it older Android serves a colour emoji
               heart and ignores --accent entirely. */
            glyph: '♥︎', mode: 'stream',
            colors: ['var(--accent)', 'var(--accent-soft)'],
            size: [0.14, 0.21], life: [2200, 3200],
            x: [0.34, 0.66], y: [0.44, 0.62],
            dx: [-0.9, 0.9], rot: [-14, 14], peak: [0.45, 0.75]
        },
        sleep: {
            glyph: 'z', mode: 'burst', count: 3, spacing: 300,
            colors: ['var(--ink-3)', 'var(--ink-2)'],
            size: [0.16, 0.26], life: [1500, 1900],
            x: [0.62, 0.80], y: [0.28, 0.42],
            dx: [0.5, 1.3], rot: [-6, 12], peak: [0.55, 0.85]
        },
        irritated: {
            glyph: '#', mode: 'stream',
            colors: ['var(--ink-2)', 'var(--ink)'],
            size: [0.11, 0.16], life: [800, 1200],
            x: [0.52, 0.82], y: [0.24, 0.40],
            dx: [-0.5, 0.9], rot: [-18, 18], peak: [0.35, 0.6]
        }
    };

    var STREAM_FOR = {};
    STREAM_FOR[S.BELLY] = 'love';
    STREAM_FOR[S.ANNOYED] = 'irritated';

    var emoteLayer = null;
    var burstQueue = [];
    var activeStream = null;
    var emoteNextAt = 0;

    function rand(lo, hi) { return lo + Math.random() * (hi - lo); }
    function pick(list) { return list[Math.floor(Math.random() * list.length)]; }

    function queueBurst(name, now) {
        var e = EMOTES[name];
        for (var i = 0; i < e.count; i++) burstQueue.push({ name: name, at: now + i * e.spacing });
    }

    function spawnEmote(name) {
        var e = EMOTES[name];
        if (!emoteLayer) {
            emoteLayer = document.createElement('span');
            emoteLayer.className = 'chocolata-emotes';
            body.appendChild(emoteLayer);
        }
        var box = body.offsetWidth;
        var el = document.createElement('span');
        el.className = 'chocolata-emote';
        el.textContent = e.glyph;
        el.style.fontSize = (box * rand(e.size[0], e.size[1])).toFixed(1) + 'px';
        el.style.left = (rand(e.x[0], e.x[1]) * 100).toFixed(1) + '%';
        el.style.top = (rand(e.y[0], e.y[1]) * 100).toFixed(1) + '%';
        el.style.color = pick(e.colors);
        el.style.setProperty('--dx', rand(e.dx[0], e.dx[1]).toFixed(2) + 'em');
        el.style.setProperty('--rot', rand(e.rot[0], e.rot[1]).toFixed(1) + 'deg');
        el.style.setProperty('--peak', rand(e.peak[0], e.peak[1]).toFixed(2));
        el.style.setProperty('--dur', Math.round(rand(e.life[0], e.life[1])) + 'ms');
        el.addEventListener('animationend', function () { el.remove(); });
        emoteLayer.appendChild(el);
    }

    function driveEmotes(now) {
        while (burstQueue.length && now >= burstQueue[0].at) spawnEmote(burstQueue.shift().name);

        var name = STREAM_FOR[state] || null;
        if (!name) { activeStream = null; return; }
        if (activeStream !== name) { activeStream = name; emoteNextAt = now; }
        if (now >= emoteNextAt) {
            spawnEmote(name);
            emoteNextAt = now + CFG.emoteRate * rand(0.8, 1.25);
        }
    }

    /* ---------------------------------------------------------------- *
     * Pointer: one path for mouse, pen and finger
     * ---------------------------------------------------------------- */

    /* Deliberately does no measuring: pointermove can fire at 120Hz, and reading
       her box here would force layout right after the last frame wrote to it.
       The loop owns geometry; this only records where the pointer went. */
    function track(e, trackShake) {
        if (reduced) return;
        pointer.present = true;
        pointer.touch = e.pointerType !== 'mouse';
        pointer.x = e.clientX;
        pointer.y = e.clientY;
        geometryDirty = true;

        if (trackShake && pointer.overDog) {
            var move = e.clientX - lastX;
            if (Math.abs(move) > 1.5) {
                var dir = move > 0 ? 1 : -1;
                if (lastMoveDir !== 0 && dir !== lastMoveDir) reversals.push(performance.now());
                lastMoveDir = dir;
            }
        }
        lastX = e.clientX;

        if (nearBox(e.clientX, e.clientY)) loadFrames();
        resume();
    }

    /* Answers off the last measured box. Close enough to decide whether to start
       fetching frames, and it keeps pointermove off the layout path. */
    function nearBox(x, y) {
        if (!rect) return false;
        var dx = x - (rect.left + rect.width / 2);
        var dy = y - (rect.top + rect.height / 2);
        return Math.hypot(dx, dy) <= radiusFor(rect);
    }

    function forgetPointer() {
        pointer.present = false;
        pointer.overDog = false;
        pointer.inRadius = false;
        pointer.dist = Infinity;
        lastMoveDir = 0;
        reversals.length = 0;
        resume();
    }

    /* A finger only reports movement while it is down, so a press that lands on
       her behaves like a cursor resting on her: hold rolls her over, letting go
       rolls her back. Three quick taps read as poking, same as a shake. */
    function onPointerDown(e) {
        track(e, false);
        if (reduced || e.pointerType === 'mouse') return;
        var now = performance.now();
        /* A tap is a one-off, so it can afford the measurement the move handler
           skips: the answer has to be right on the first tap, not a frame later. */
        refreshAim(now);
        if (!pointer.overDog) return;
        taps.push(now);
        while (taps.length && now - taps[0] > TAP_WINDOW_MS) taps.shift();
        if (taps.length >= TAP_ANNOY_COUNT) {
            taps.length = 0;
            annoy(now, 'taps');
        }
    }

    function onPointerUp(e) {
        if (e.pointerType === 'mouse') return;
        forgetPointer();
    }

    /* ---------------------------------------------------------------- *
     * Loop
     * ---------------------------------------------------------------- */

    var running = false;
    var rafId = 0;
    var lastTs = 0;

    /* Being asleep already means the pointer is out of range, and only a pointer,
       a scroll or a resize can bring it back into range. All three call resume(),
       so the loop can stop dead here instead of burning frames on a still image
       for as long as the tab is open. Her breathing is CSS and carries on. */
    function settled() {
        return state === S.ASLEEP && !burstQueue.length && !activeStream;
    }

    function frame(ts) {
        var dt = Math.min(64, ts - lastTs);
        lastTs = ts;

        update(ts, dt);
        showFrame(resolveFrame(desiredFile));
        body.classList.toggle('is-breathing', state === S.ASLEEP && CFG.breathing);
        driveEmotes(ts);

        if (settled()) { running = false; return; }
        rafId = requestAnimationFrame(frame);
    }

    function resume() {
        if (running || reduced) return;
        running = true;
        lastTs = performance.now();
        rafId = requestAnimationFrame(frame);
    }

    function halt() {
        running = false;
        cancelAnimationFrame(rafId);
        burstQueue.length = 0;
        activeStream = null;
        if (emoteLayer) emoteLayer.textContent = '';
        body.classList.remove('is-breathing');
        showFrame(CENTER);
    }

    /* ---------------------------------------------------------------- *
     * Boot
     * ---------------------------------------------------------------- */

    window.addEventListener('pointermove', function (e) { track(e, true); }, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    window.addEventListener('pointercancel', onPointerUp, { passive: true });
    document.addEventListener('mouseleave', forgetPointer);
    window.addEventListener('blur', forgetPointer);
    /* Both move her under a pointer that never moved, so both invalidate the box
       and are worth waking the loop for. */
    function remeasure() {
        geometryDirty = true;
        resume();
    }
    window.addEventListener('scroll', remeasure, { passive: true });
    window.addEventListener('resize', remeasure, { passive: true });

    reduceQuery.addEventListener('change', function () {
        reduced = reduceQuery.matches;
        if (reduced) {
            halt();
        } else {
            var now = performance.now();
            state = S.AWAKE;
            stateSince = outsideSince = now;
            geometryDirty = true;
            /* blinkAt is still 0 from boot, and an instant blink on resume looks
               like a glitch rather than a dog. */
            scheduleBlink(now);
            loadFrames();
            resume();
        }
    });

    if (reduced) return;

    if (document.readyState === 'complete') loadFrames();
    else window.addEventListener('load', loadFrames, { once: true });

    scheduleBlink(performance.now());
    resume();
})();
