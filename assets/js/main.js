/* Capasanta in Piazzetta — interaction layer.
   No dependencies: the site has to open straight off the filesystem. */
(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;
  root.classList.add('js');

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var DICT = window.CAPASANTA_I18N || {};
  var STORE = 'capasanta.lang';

  /* ── language ─────────────────────────────────────────── */
  function pickLang() {
    try {
      var saved = localStorage.getItem(STORE);
      if (saved && DICT[saved]) return saved;
    } catch (e) { /* private mode */ }
    var langs = navigator.languages || [navigator.language || 'it'];
    for (var i = 0; i < langs.length; i++) {
      var code = String(langs[i]).slice(0, 2).toLowerCase();
      if (DICT[code]) return code;
    }
    return 'it';
  }

  function applyLang(lang) {
    var t = DICT[lang];
    if (!t) return;

    doc.querySelectorAll('[data-i18n]').forEach(function (el) {
      var v = t[el.getAttribute('data-i18n')];
      if (v == null) return;
      // Copy carries intentional <br> line breaks, so assign as markup.
      if (v.indexOf('<') > -1) el.innerHTML = v; else el.textContent = v;
    });

    root.lang = t._htmlLang || lang;
    if (t._title) doc.title = t._title;
    var desc = doc.querySelector('meta[name="description"]');
    if (desc && t._desc) desc.setAttribute('content', t._desc);

    doc.querySelectorAll('.lang button').forEach(function (b) {
      var on = b.getAttribute('data-lang') === lang;
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });

    try { localStorage.setItem(STORE, lang); } catch (e) { /* ignore */ }
    markToday(t);
    openStatus(t);
    renderMenu(lang);
  }

  doc.querySelectorAll('.lang button').forEach(function (b) {
    b.addEventListener('click', function () { applyLang(b.getAttribute('data-lang')); });
  });

  /* ── open / closed, 11:00–23:00 every day ─────────────── */
  var OPEN_H = 11, SHUT_H = 23;

  /* Gli orari sono quelli del ristorante, non quelli di chi guarda: senza
     fissare il fuso, un turista che consulta il sito da Londra o da New York
     vedrebbe "chiuso" a pranzo e la carta sbagliata in evidenza. */
  var DAYS = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  function romeNow() {
    try {
      var parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Rome', hour: 'numeric', hour12: false, weekday: 'short'
      }).formatToParts(new Date());
      var o = {};
      parts.forEach(function (p) { o[p.type] = p.value; });
      var h = parseInt(o.hour, 10) % 24;
      if (isNaN(h) || DAYS[o.weekday] == null) throw 0;
      return { h: h, d: DAYS[o.weekday] };
    } catch (e) {
      var n = new Date();               // browser senza dati sui fusi
      return { h: n.getHours(), d: n.getDay() };
    }
  }

  function markToday() {
    var rows = doc.querySelectorAll('.hrs tbody tr');
    if (!rows.length) return;
    // La tabella parte dal lunedì, getDay() dalla domenica.
    var idx = (romeNow().d + 6) % 7;
    rows.forEach(function (r, i) { r.classList.toggle('is-today', i === idx); });
  }

  function openStatus(t) {
    var el = doc.querySelector('[data-open-status]');
    if (!el || !t) return;
    var h = romeNow().h;
    var open = h >= OPEN_H && h < SHUT_H;
    var msg = open ? t.openNow : (h < OPEN_H ? t.openSoon : t.shut);
    el.classList.toggle('is-shut', !open);
    el.innerHTML = '<span class="dot"></span>' + msg;
  }

  /* ── nav ──────────────────────────────────────────────── */
  var nav = doc.getElementById('nav');
  var menu = doc.getElementById('nav-m');
  var burger = doc.querySelector('.burger');

  var onScroll = function () {
    nav.classList.toggle('is-stuck', window.scrollY > window.innerHeight * 0.6);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (burger && menu) {
    var setMenu = function (open) {
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      menu.hidden = !open;
      nav.classList.toggle('is-stuck', open || window.scrollY > window.innerHeight * 0.6);
    };
    burger.addEventListener('click', function () {
      setMenu(burger.getAttribute('aria-expanded') !== 'true');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
        setMenu(false); burger.focus();
      }
    });
  }

  /* current section in the desktop nav */
  var links = Array.prototype.slice.call(doc.querySelectorAll('.nav__links a'));
  var sections = links
    .map(function (a) { return doc.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle('is-here', a.getAttribute('href') === '#' + en.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ── scroll reveal, staggered per section ─────────────── */
  var reveals = Array.prototype.slice.call(doc.querySelectorAll('.reveal'));
  if (reduced.matches) {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    /* Deliberately a scroll sweep rather than an IntersectionObserver: if an
       element crosses the whole viewport between two observer deliveries — a
       fast flick, or a reload that restores scroll deep in the page — no
       threshold crossing is reported and the content stays invisible for
       good. Comparing positions each frame cannot miss that case. */
    var pending = reveals.slice();
    var queued = false;

    var sweep = function () {
      queued = false;
      var edge = window.innerHeight * 0.88;
      var shown = 0;
      for (var i = 0; i < pending.length; i++) {
        var el = pending[i];
        if (el.getBoundingClientRect().top >= edge) continue;
        // Siblings entering together cascade instead of popping at once.
        el.style.setProperty('--d', Math.min(shown++, 6) * 80 + 'ms');
        el.classList.add('is-in');
        pending.splice(i--, 1);
      }
    };

    var onMove = function () {
      if (queued || !pending.length) return;
      queued = true;
      requestAnimationFrame(sweep);
    };

    window.addEventListener('scroll', onMove, { passive: true });
    window.addEventListener('resize', onMove, { passive: true });
    window.addEventListener('load', onMove);
    sweep();
  }

  /* ── the sun arc ──────────────────────────────────────────
     The logo is a sun rising over a horizon, so the opening hours are drawn
     as that same arc: the sun tracks 11:00 -> 23:00 as the section scrolls,
     and the mark's rays are rebuilt around it in SVG.                      */
  var arc = doc.querySelector('.day__svg');
  if (arc) {
    var track = arc.querySelector('.day__track');
    var prog = arc.querySelector('.day__prog');
    var sun = arc.querySelector('.day__sun');
    var rayG = arc.querySelector('.day__rays');
    var NS = 'http://www.w3.org/2000/svg';

    for (var r = 0; r < 28; r++) {
      var ang = (r / 28) * Math.PI * 2;
      var ln = doc.createElementNS(NS, 'line');
      ln.setAttribute('x1', (Math.cos(ang) * 16).toFixed(2));
      ln.setAttribute('y1', (Math.sin(ang) * 16).toFixed(2));
      ln.setAttribute('x2', (Math.cos(ang) * (22 + (r % 3) * 2.5)).toFixed(2));
      ln.setAttribute('y2', (Math.sin(ang) * (22 + (r % 3) * 2.5)).toFixed(2));
      rayG.appendChild(ln);
    }

    var len = track.getTotalLength();
    prog.style.strokeDasharray = len;

    /* Mark the hours where they actually fall across an 11:00-23:00 day,
       so the spacing on the arc is truthful rather than decorative. */
    var ticksG = arc.querySelector('.day__ticks');
    [11, 12.5, 17, 20, 23].forEach(function (h) {
      var pt = track.getPointAtLength(len * ((h - 11) / 12));
      var c = doc.createElementNS(NS, 'circle');
      c.setAttribute('cx', pt.x.toFixed(2));
      c.setAttribute('cy', pt.y.toFixed(2));
      c.setAttribute('r', '2.6');
      ticksG.appendChild(c);
    });

    var place = function (p) {
      p = Math.max(0, Math.min(1, p));
      prog.style.strokeDashoffset = len * (1 - p);
      var pt = track.getPointAtLength(len * p);
      sun.setAttribute('transform',
        'translate(' + pt.x.toFixed(2) + ',' + pt.y.toFixed(2) + ') rotate(' + (p * 180).toFixed(1) + ')');
    };

    if (reduced.matches) {
      place(1);
    } else {
      var sec = doc.getElementById('giornata');
      var tick = false;
      var update = function () {
        var b = sec.getBoundingClientRect();
        var vh = window.innerHeight;
        // 0 when the section's top reaches the viewport bottom, 1 once its
        // bottom clears the top — so the sun crosses as the section passes.
        place((vh - b.top) / (vh + b.height));
        tick = false;
      };
      window.addEventListener('scroll', function () {
        if (!tick) { tick = true; requestAnimationFrame(update); }
      }, { passive: true });
      window.addEventListener('resize', update, { passive: true });
      update();
    }
  }

  /* ── ambient video: only play what is on screen ───────── */
  var vids = Array.prototype.slice.call(doc.querySelectorAll('video[autoplay]'));
  vids.forEach(function (v) { v.muted = true; v.setAttribute('muted', ''); });

  if ('IntersectionObserver' in window) {
    var vio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var v = en.target;
        if (en.isIntersecting) {
          if (v.preload === 'none') v.preload = 'auto';
          var p = v.play();
          if (p && p.catch) p.catch(function () { /* autoplay refused */ });
        } else if (!v.paused) {
          v.pause();
        }
      });
    }, { rootMargin: '150px 0px', threshold: 0.05 });
    vids.forEach(function (v) { vio.observe(v); });
  }

  /* ── il menu ──────────────────────────────────────────────
     Reso da assets/js/menu.js, così i piatti stanno in un file solo e
     restano modificabili senza toccare il markup. Le due carte a orario —
     i freddi fino alle 18, gli special dopo — sono marcate con `when` e la
     carta in servizio adesso viene evidenziata.                          */
  var SWITCH_HOUR = 18;
  var MENU = window.CAPASANTA_MENU;

  function txt(v, lang) {
    if (v == null) return '';
    return typeof v === 'string' ? v : (v[lang] || v.it || '');
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function priceCells(it, wine) {
    if (!wine) return '<span class="mi__p">' + (it.p ? '€ ' + it.p : '') + '</span>';
    return '<span class="mi__g">' + (it.g ? '€ ' + it.g : '') + '</span>' +
           '<span class="mi__b">' + (it.b ? '€ ' + it.b : '') + '</span>';
  }

  function renderItem(it, lang, wine) {
    var h = '<div class="mi"><span class="mi__n">' + esc(it.n) + '</span>';
    if (it.v) {
      h += '<span class="mi__p"></span>';
      it.v.forEach(function (v) {
        h += '<div class="mi__v"><span class="mi__d">' + esc(txt(v.d, lang)) + '</span>' +
             '<span class="mi__p">€ ' + v.p + '</span></div>';
      });
    } else {
      h += priceCells(it, wine);
      var d = txt(it.d, lang);
      if (d) h += '<span class="mi__d">' + esc(d) + '</span>';
    }
    return h + '</div>';
  }

  function renderMenu(lang) {
    if (!MENU) return;
    var t = DICT[lang] || DICT.it;
    var live = romeNow().h < SWITCH_HOUR ? 'pre18' : 'post18';
    // Cambiare lingua non deve richiudere le portate che si stanno leggendo.
    var wasOpen = {};
    doc.querySelectorAll('.mg[open]').forEach(function (d) { wasOpen[d.id] = true; });

    ['cucina', 'cantina'].forEach(function (fam) {
      var host = doc.getElementById(fam === 'cucina' ? 'menuCucina' : 'menuCantina');
      if (!host) return;
      host.innerHTML = MENU[fam].map(function (g) {
        var badge = '';
        if (g.when) {
          var on = g.when === live;
          badge = '<span class="mg__when' + (on ? ' is-live' : '') + '">' +
                  esc(t[on ? 'servedNow' : g.when]) + '</span>';
        }
        var body = '';
        if (g.wine) {
          body += '<div class="mgw__head"><span></span><span>' + esc(t.byGlass) +
                  '</span><span>' + esc(t.byBottle) + '</span></div>';
        }
        body += g.items.map(function (i) { return renderItem(i, lang, g.wine); }).join('');
        if (g.note) body += '<p class="mg__note">' + esc(txt(g.note, lang)) + '</p>';

        return '<details class="mg' + (g.wine ? ' mg--wine' : '') + '" id="mg-' + g.id + '"' +
                 (wasOpen['mg-' + g.id] ? ' open' : '') + '>' +
                 '<summary><span class="mg__t">' + esc(txt(g.t, lang)) + '</span>' +
                 badge + '<span class="mg__chev"></span></summary>' +
                 '<div class="mg__body">' + body + '</div>' +
               '</details>';
      }).join('');
    });
  }

  /* ── mappa a richiesta ────────────────────────────────── */
  var mapBtn = doc.querySelector('[data-map]');
  if (mapBtn) {
    mapBtn.addEventListener('click', function () {
      var f = doc.createElement('iframe');
      f.src = mapBtn.getAttribute('data-src');
      f.title = 'Piazza Martiri della Libertà 20, Santa Margherita Ligure';
      f.loading = 'lazy';
      f.referrerPolicy = 'no-referrer-when-downgrade';
      mapBtn.replaceWith(f);
    });
  }

  /* ── footer year + boot ───────────────────────────────── */
  var y = doc.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();

  applyLang(pickLang());
})();
