// Preview-only font picker. Runs on Vercel preview URLs and localhost,
// never on vigneshrajsb.com. Remove before merging the font PR.
(function () {
  var h = location.hostname;
  if (!(h.endsWith('.vercel.app') || h === 'localhost' || h === '127.0.0.1')) return;

  var GF = 'https://fonts.googleapis.com/css2?';
  var upright =
    '.name,.masthead .aside,.work .cta,.masthead .pronounce,.archive-head h1,' +
    '.archive-head .tagline,.post-subtitle,.entries .title em{font-style:normal}';

  var OPTIONS = {
    A: {
      label: 'A · Vollkorn + Karla (old)',
      gf: 'family=Vollkorn:ital,wght@0,400..700;1,400..700&family=Karla:wght@300..600',
      css:
        ":root{--font-text:'Vollkorn',Georgia,serif;--font-meta:'Karla',sans-serif}" +
        '.name{font-style:italic;font-weight:500;font-stretch:normal;letter-spacing:-0.01em}' +
        'h2{font-stretch:normal;letter-spacing:0}',
    },
    B: {
      label: 'B · IBM Plex Sans + Mono',
      gf: 'family=IBM+Plex+Sans:wght@200;300;400;500;600;700&family=IBM+Plex+Mono:wght@300;400;500',
      css:
        ":root{--font-text:'IBM Plex Sans',sans-serif;--font-meta:'IBM Plex Mono',monospace}" +
        '.name,h2{font-stretch:normal}' + upright,
    },
    C: {
      label: 'C · Mona Sans + JetBrains Mono',
      gf: 'family=Mona+Sans:wdth,wght@75..125,200..900&family=JetBrains+Mono:wght@300..500',
      css: '',
    },
    D: {
      label: 'D · Geist + Geist Mono',
      gf: 'family=Geist:wght@100..900&family=Geist+Mono:wght@300..500',
      css:
        ":root{--font-text:'Geist',sans-serif;--font-meta:'Geist Mono',monospace}" +
        '.name,h2{font-stretch:normal}' + upright,
    },
    E: {
      label: 'E · Newsreader + Hanken + JetBrains',
      gf:
        'family=Newsreader:opsz,wght@6..72,400..600&family=Hanken+Grotesk:wght@100..900' +
        '&family=JetBrains+Mono:wght@300..500',
      css:
        ":root{--font-text:'Hanken Grotesk',sans-serif;--font-meta:'JetBrains Mono',monospace}" +
        ".name{font-family:'Newsreader',serif;font-weight:500;font-stretch:normal;letter-spacing:-0.02em}" +
        'h2{font-stretch:normal}' + upright,
    },
    F: {
      label: 'F · Mona Sans only',
      gf: 'family=Mona+Sans:wdth,wght@75..125,200..900',
      css: ":root{--font-meta:'Mona Sans',sans-serif}",
    },
    G: {
      label: 'G · Geist only',
      gf: 'family=Geist:wght@100..900',
      css:
        ":root{--font-text:'Geist',sans-serif;--font-meta:'Geist',sans-serif}" +
        '.name,h2{font-stretch:normal}' + upright,
    },
  };
  var WEIGHTS = [300, 350, 400];

  function get(k, d) {
    try { return localStorage.getItem('fontlab-' + k) || d; } catch (e) { return d; }
  }
  function set(k, v) {
    try { localStorage.setItem('fontlab-' + k, v); } catch (e) {}
  }

  var params = new URLSearchParams(location.search);
  var state = {
    font: params.get('font') || get('font', 'C'),
    weight: params.get('weight') || get('weight', '400'),
  };
  if (!OPTIONS[state.font]) state.font = 'C';

  var link = document.createElement('link');
  link.rel = 'stylesheet';
  document.head.appendChild(link);
  var style = document.createElement('style');
  document.head.appendChild(style);

  function apply() {
    var o = OPTIONS[state.font];
    link.href = o.gf ? GF + o.gf + '&display=swap' : '';
    style.textContent = o.css + 'body{font-weight:' + state.weight + '}';
    set('font', state.font);
    set('weight', state.weight);
    var u = new URL(location.href);
    u.searchParams.set('font', state.font);
    u.searchParams.set('weight', state.weight);
    history.replaceState(null, '', u);
  }

  function select(name, values, labels) {
    var s = document.createElement('select');
    s.setAttribute('aria-label', name === 'font' ? 'Font option' : 'Body weight');
    values.forEach(function (v, i) {
      var opt = document.createElement('option');
      opt.value = v;
      opt.textContent = labels[i];
      if (String(v) === String(state[name])) opt.selected = true;
      s.appendChild(opt);
    });
    s.addEventListener('change', function () {
      state[name] = s.value;
      apply();
    });
    return s;
  }

  function mount() {
    var box = document.createElement('div');
    box.setAttribute('role', 'group');
    box.setAttribute('aria-label', 'Font preview controls');
    box.style.cssText =
      'position:fixed;right:12px;bottom:12px;z-index:9999;display:flex;gap:6px;' +
      'flex-wrap:wrap;max-width:calc(100vw - 24px);padding:8px;border-radius:10px;' +
      'background:var(--bg-subtle);border:1px solid var(--rule);' +
      'box-shadow:0 4px 18px rgba(0,0,0,.15);font:13px/1.2 system-ui,sans-serif;font-weight:400';
    var keys = Object.keys(OPTIONS);
    box.appendChild(select('font', keys, keys.map(function (k) { return OPTIONS[k].label; })));
    box.appendChild(
      select('weight', WEIGHTS, WEIGHTS.map(function (w) {
        return 'Body ' + w + (w === 300 ? ' (light)' : w === 400 ? ' (regular)' : '');
      }))
    );
    [].forEach.call(box.querySelectorAll('select'), function (s) {
      s.style.cssText =
        'font:inherit;min-height:44px;padding:0 8px;border-radius:6px;' +
        'border:1px solid var(--rule);background:var(--bg);color:var(--ink)';
    });
    document.body.appendChild(box);
  }

  apply();
  if (document.body) mount();
  else document.addEventListener('DOMContentLoaded', mount);
})();
