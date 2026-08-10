/*
 * PostHog, the site's only analytics.
 *
 * Anonymous events with localStorage persistence: unique readers count
 * correctly, nothing is stored in a cookie, nobody is identified, and no
 * consent banner is owed. Session recording stays off. Events go straight to
 * PostHog with no proxy; a reader whose blocker eats the request has answered
 * the question of whether they want to be counted.
 *
 * The whole event schema lives here and in chocolata.js: $pageview (automatic),
 * link_click, and the chocolata_* events. Autocapture is off so that list
 * stays the whole truth.
 */
(function () {
    'use strict';

    var TOKEN = 'phc_pCTMgAq3nF6H7g4wa39GDogFkS6XfLaDkntAHii9atjn';

    /* A local checkout is not a reader. */
    if (/^(localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\])$/.test(location.hostname)) return;

    /* GoatCounter honoured Do Not Track and this setup keeps that promise.
       Global Privacy Control is the newer spelling of the same request, so it
       gets the same answer. DNT itself is left to respect_dnt below. */
    if (navigator.globalPrivacyControl) return;

    /* Official PostHog loader stub, verbatim. It queues calls until array.js
       arrives, so capture works from the first line after init. */
    !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagResult isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);

    window.posthog.init(TOKEN, {
        api_host: 'https://us.i.posthog.com',
        defaults: '2026-05-30',
        persistence: 'localStorage',
        autocapture: false,
        disable_session_recording: true,
        respect_dnt: true
    });

    /* One listener covers every link on every page. Hash links move within a
       page rather than away from it, so they do not count. */
    document.addEventListener('click', function (e) {
        var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
        if (!a) return;
        var href = a.getAttribute('href');
        if (!href || href.charAt(0) === '#') return;
        window.posthog.capture('link_click', {
            href: a.href,
            text: (a.textContent || '').trim().slice(0, 80),
            external: a.host !== location.host
        });
    });
})();
