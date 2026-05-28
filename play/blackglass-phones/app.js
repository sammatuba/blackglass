/* =====================================================================
   BLACKGLASS — Three Phones engine
   Renders a phone rack, then drives one phone's `flow` (frames of beats),
   tracks completion + choices in localStorage, gates recognition frames
   on what you've already played, and unlocks the timeline + reflection
   once all three mornings are lived. Vanilla, offline, file:// safe.
   ===================================================================== */

(function () {
  'use strict';

  const DATA = window.PHONES;
  const { phones: PHONES_BY_ID, order: ORDER, timeline: TIMELINE, reflection: REFLECTION, anchor: ANCHOR } = DATA;
  const STORE_KEY = DATA.storeKey;

  /* ---------------- state ---------------- */
  function blankState() {
    return { completed: {}, choices: {}, seenTimeline: false };
  }
  function load() {
    try { const r = localStorage.getItem(STORE_KEY); return r ? JSON.parse(r) : blankState(); }
    catch (e) { return blankState(); }
  }
  function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {} }

  let state = load();

  /* per-run cursor */
  let run = null; // { phone, frameIndex, endKind }

  /* ---------------- dom ---------------- */
  const $app = document.getElementById('app');

  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); }

  function allDone() { return ORDER.every(id => state.completed[id]); }
  function unlocked(id) { return id === 'maya' || !!state.completed.maya; }
  function needsMet(needs) { return needs.every(id => state.completed[id]); }

  /* =================================================================
     RACK — the three phones on the desk
  ================================================================= */
  function renderRack() {
    run = null;
    clear($app);
    const wrap = el('div', 'rack');

    const head = el('div', 'rack-head');
    head.innerHTML = `
      <div class="rack-kicker">BLACKGLASS</div>
      <h1 class="rack-title">${ANCHOR.title} <span>·</span> ${ANCHOR.subtitle}</h1>
      <p class="rack-blurb">${ANCHOR.blurb}</p>
    `;
    wrap.appendChild(head);

    const grid = el('div', 'rack-grid');
    ORDER.forEach(id => grid.appendChild(rackCard(id)));
    wrap.appendChild(grid);

    /* progress / unlock hint */
    const doneCount = ORDER.filter(id => state.completed[id]).length;
    const hint = el('p', 'rack-hint');
    if (doneCount === 0) {
      hint.innerHTML = 'Start with Maya. The others wake up once you’ve seen the morning from inside her phone.';
    } else if (!allDone()) {
      hint.innerHTML = `${doneCount} of 3 mornings lived. Pick up another phone — order changes what you’ll feel.`;
    } else {
      hint.innerHTML = 'Three phones lived. Now see the one timeline none of them could.';
    }
    wrap.appendChild(hint);

    /* epilogue entries once all done */
    if (allDone()) {
      const ep = el('div', 'rack-epilogue');
      const tBtn = el('button', 'epi-btn primary', `<span class="epi-tag">↳</span> The morning, all at once`);
      tBtn.addEventListener('click', renderTimeline);
      const rBtn = el('button', 'epi-btn', `<span class="epi-tag">✻</span> What you carry forward`);
      rBtn.addEventListener('click', renderReflection);
      ep.appendChild(tBtn);
      ep.appendChild(rBtn);
      wrap.appendChild(ep);
    }

    /* reset */
    const foot = el('div', 'rack-foot');
    const reset = el('button', 'linkish', 'Reset everything');
    reset.addEventListener('click', () => {
      if (confirm('Forget all three mornings and start over?')) {
        state = blankState(); save(); renderRack();
      }
    });
    foot.appendChild(reset);
    wrap.appendChild(foot);

    $app.appendChild(wrap);
  }

  function rackCard(id) {
    const p = PHONES_BY_ID[id];
    const open = unlocked(id);
    const done = !!state.completed[id];
    const card = el('button', `rack-card theme-${p.theme}${open ? '' : ' locked'}${done ? ' done' : ''}`);
    card.type = 'button';
    card.disabled = !open;
    card.innerHTML = `
      <div class="mini-device">
        <div class="mini-wall wall-${p.lock.wallpaper}"></div>
        <div class="mini-statusbar"><span>${p.lock.time}</span><span>${p.lock.day}</span></div>
        <div class="mini-clock">${p.lock.time}<span class="mini-mer">${p.lock.meridiem}</span></div>
        ${open ? '' : '<div class="mini-lock">🔒</div>'}
        ${done ? '<div class="mini-done">✓</div>' : ''}
      </div>
      <div class="rack-card-body">
        <div class="rc-name">${p.name}</div>
        <div class="rc-verb">${p.verb}</div>
        <div class="rc-essence">${open ? p.essence : 'Locked — play Maya first.'}</div>
      </div>
      <div class="rc-action">${open ? (done ? 'Replay her morning' : 'Pick up') : ''}</div>
    `;
    if (open) card.addEventListener('click', () => startPhone(id));
    return card;
  }

  /* =================================================================
     PHONE RUN
  ================================================================= */
  function startPhone(id) {
    run = { phone: PHONES_BY_ID[id], frameIndex: -1, endKind: null };
    clear($app);
    const stage = el('div', `stage theme-${run.phone.theme}`);
    stage.id = 'stage';

    const device = el('div', 'device');
    device.style.setProperty('--brightness', (run.phone.lock.brightness / 100).toFixed(2));
    if (run.phone.lock.brightness <= 30) device.classList.add('dim');

    /* device top: status bar */
    const status = el('div', 'dev-status');
    status.innerHTML = `
      <span class="ds-time">${run.phone.lock.time}</span>
      <span class="ds-icons"><span>${dots()}</span><span class="ds-wifi">⌃</span><span class="ds-batt">▮</span></span>
    `;
    device.appendChild(status);

    /* whose phone chip */
    const chip = el('div', 'dev-chip');
    chip.innerHTML = `<button class="chip-back" title="Back to the phones">‹</button><span class="chip-name">${run.phone.name}</span><span class="chip-verb">${run.phone.verb}</span>`;
    chip.querySelector('.chip-back').addEventListener('click', renderRack);
    device.appendChild(chip);

    const screen = el('div', 'dev-screen');
    screen.id = 'screen';
    device.appendChild(screen);

    stage.appendChild(device);
    $app.appendChild(stage);

    advanceFrame();
  }

  function dots() { return '••••'; }

  function advanceFrame() {
    const flow = run.phone.flow;
    let idx = run.frameIndex + 1;
    while (idx < flow.length) {
      const f = flow[idx];
      if (f.needs && !needsMet(f.needs)) { idx++; continue; }
      break;
    }
    if (idx >= flow.length) { completePhone(run.endKind || run.phone.id); return; }
    run.frameIndex = idx;
    renderFrame(flow[idx]);
  }

  function renderFrame(f) {
    if (f.set) { Object.assign(state.choices, f.set); save(); }
    const screen = document.getElementById('screen');
    clear(screen);

    let delay = 0;
    const step = () => { const d = delay; delay += 80; return d; };

    /* chrome */
    if (f.lock) {
      screen.appendChild(staggered(renderLock(run.phone, f), step()));
    } else if (f.home) {
      screen.appendChild(staggered(renderHome(run.phone), step()));
    } else if (f.app) {
      screen.appendChild(staggered(renderAppHead(f.app), step()));
    }

    /* beats */
    let endsScene = false;
    const beats = f.beats || [];
    for (const b of beats) {
      if (b.t === 'end') { endsScene = true; run.endKind = b.kind; continue; }
      if (b.needs && !needsMet(b.needs)) continue;
      const node = renderBeat(b);
      if (node) screen.appendChild(staggered(node, step()));
    }

    /* footer: choice / continue / end */
    if (f.choice) {
      screen.appendChild(staggered(renderChoices(f.choice), step()));
    } else if (endsScene) {
      // completion handled after a beat of breath
      screen.appendChild(staggered(renderEndFooter(run.endKind), step()));
    } else {
      screen.appendChild(staggered(renderContinue(f.continueLabel || 'Continue'), step()));
    }

    screen.scrollTop = 0;
  }

  function staggered(node, delayMs) {
    node.classList.add('rise');
    node.style.animationDelay = delayMs + 'ms';
    return node;
  }

  /* ---------------- chrome renderers ---------------- */
  function renderLock(p, f) {
    const wrap = el('div', 'lockscreen');
    wrap.innerHTML = `
      <div class="lock-wall wall-${p.lock.wallpaper}"></div>
      <div class="lock-top">
        <div class="lock-day">${p.lock.day}</div>
        <div class="lock-clock">${p.lock.time}<span class="lock-mer">${p.lock.meridiem}</span></div>
        ${p.lock.brightness <= 30 ? '<div class="lock-bright">brightness ' + p.lock.brightness + '%</div>' : ''}
      </div>
    `;
    const list = el('div', 'lock-notifs');
    (f.notifs || []).forEach(n => {
      const card = el('div', 'lnotif' + (n.dim ? ' dim' : ''));
      card.innerHTML = `<div class="ln-app">${n.app}</div><div class="ln-text">${n.text}</div>${n.sub ? `<div class="ln-sub">${n.sub}</div>` : ''}`;
      list.appendChild(card);
    });
    wrap.appendChild(list);
    const wn = el('div', 'lock-wallnote', p.lock.wallpaperNote || '');
    wrap.appendChild(wn);
    return wrap;
  }

  function renderHome(p) {
    const wrap = el('div', 'homescreen');
    wrap.innerHTML = `<div class="home-wall wall-${p.lock.wallpaper}"></div>`;
    const grid = el('div', 'app-grid');
    (p.home.apps || []).forEach(a => grid.appendChild(appIcon(a)));
    (p.home.folders || []).forEach(fl => grid.appendChild(folderIcon(fl)));
    wrap.appendChild(grid);
    if (p.lock.wallpaperNote) wrap.appendChild(el('div', 'home-wallnote', p.lock.wallpaperNote));
    return wrap;
  }

  function appIcon(a) {
    const t = el('div', 'app-tile' + (a.dim ? ' dim' : ''));
    t.innerHTML = `<div class="app-ic">${a.icon}${a.badge ? `<span class="app-badge">${a.badge}</span>` : ''}</div><div class="app-lbl">${a.label}</div>`;
    return t;
  }
  function folderIcon(fl) {
    const t = el('div', 'app-tile folder' + (fl.dim ? ' dim' : ''));
    const inner = (fl.items || []).slice(0, 4).map(() => '<span></span>').join('');
    t.innerHTML = `<div class="app-ic folder-ic">${inner}</div><div class="app-lbl">${fl.label}</div>`;
    return t;
  }

  function renderAppHead(app) {
    const h = el('div', 'apphead');
    h.innerHTML = `
      <div class="ah-icon">${app.icon || '💬'}</div>
      <div class="ah-text">
        <div class="ah-name">${app.chat || app.name}</div>
        ${app.sub ? `<div class="ah-sub">${app.sub}</div>` : (app.chat ? `<div class="ah-sub">${app.name}</div>` : '')}
      </div>
    `;
    return h;
  }

  /* ---------------- beat renderers ---------------- */
  function renderBeat(b) {
    switch (b.t) {
      case 'narr': return el('div', 'b-narr', paras(b.text));
      case 'aside': return el('div', 'b-aside', `<span class="aside-br">[</span>${b.text}<span class="aside-br">]</span>`);
      case 'world': return el('div', 'b-world', paras(b.text));
      case 'sys': return el('div', 'b-sys', b.text);
      case 'msg': return renderMsg(b);
      case 'compose': return renderMsg(b, true);
      case 'link': return renderLink(b);
      case 'voice': return renderVoice(b);
      case 'notif': return renderNotif(b);
      case 'video': return renderVideo(b);
      case 'app': return renderAppHead(b.appHead);
      case 'recog-tag': return el('div', 'b-recog', `<div class="recog-mark">⟲ recognition</div>${b.text}`);
      default: return el('div', 'b-narr', `<p>${b.text || ''}</p>`);
    }
  }

  function paras(text) {
    const arr = Array.isArray(text) ? text : [text];
    return arr.map(t => `<p>${t}</p>`).join('');
  }

  function renderMsg(b, composing) {
    const row = el('div', `msg ${b.side === 'out' ? 'out' : 'in'}${composing ? ' composing' : ''}`);
    const meta = [b.sender, b.time].filter(Boolean).join(' · ');
    row.innerHTML = `${meta ? `<div class="msg-meta">${meta}</div>` : ''}<div class="bubble">${b.text}</div>`;
    return row;
  }

  function renderLink(b) {
    const c = el('div', 'link-card');
    c.innerHTML = `
      <div class="link-thumb"><span class="link-warn">!</span></div>
      <div class="link-body">
        <div class="link-title">${b.title}</div>
        <div class="link-domain">${b.domain}</div>
      </div>
    `;
    return c;
  }

  function renderVoice(b) {
    const row = el('div', `msg ${b.side === 'out' ? 'out' : 'in'}`);
    const meta = [b.sender, b.time].filter(Boolean).join(' · ');
    const bars = Array.from({ length: 22 }, (_, i) => `<span style="height:${20 + Math.round(60 * Math.abs(Math.sin(i * 1.3)))}%"></span>`).join('');
    row.innerHTML = `${meta ? `<div class="msg-meta">${meta}</div>` : ''}
      <div class="bubble voice"><span class="v-play">▶</span><span class="v-wave">${bars}</span><span class="v-secs">0:${String(b.secs).padStart(2, '0')}</span></div>`;
    return row;
  }

  function renderNotif(b) {
    const c = el('div', 'push-notif');
    c.innerHTML = `<div class="pn-app">${b.app}</div><div class="pn-text">${b.text}</div>${b.time ? `<div class="pn-time">${b.time}</div>` : ''}`;
    return c;
  }

  function renderVideo(b) {
    const c = el('div', 'video-card');
    c.innerHTML = `
      <div class="vc-frame">
        <div class="vc-play">▶</div>
        ${b.tag ? `<div class="vc-tag">${b.tag}</div>` : ''}
        ${b.views ? `<div class="vc-views">▷ ${b.views}</div>` : ''}
        <div class="vc-lower"><div class="vc-creator">${b.creator}</div><div class="vc-sub">${b.sub || ''}</div></div>
      </div>
      ${b.caption ? `<div class="vc-caption">${b.caption}</div>` : ''}
    `;
    return c;
  }

  /* ---------------- footers ---------------- */
  function renderContinue(label) {
    const wrap = el('div', 'foot');
    const btn = el('button', 'continue-btn', label);
    btn.addEventListener('click', () => { btn.disabled = true; advanceFrame(); });
    wrap.appendChild(btn);
    return wrap;
  }

  function renderChoices(choice) {
    const wrap = el('div', 'choice-block');
    wrap.appendChild(el('div', 'choice-verb', `${choice.verb} · ${choice.prompt}`));
    choice.options.forEach(opt => {
      const btn = el('button', 'choice-btn');
      btn.innerHTML = `<span class="ch-label">${opt.label}</span>${opt.sub ? `<span class="ch-sub">${opt.sub}</span>` : ''}`;
      btn.addEventListener('click', () => onChoose(opt, wrap, choice));
      wrap.appendChild(btn);
    });
    if (choice.footnote) wrap.appendChild(el('div', 'choice-footnote', choice.footnote));
    return wrap;
  }

  function onChoose(opt, wrap, choice) {
    if (opt.set) { Object.assign(state.choices, opt.set); save(); }
    const screen = document.getElementById('screen');
    // replace the choice block with a chosen marker
    const chosen = el('div', 'chose', `<span class="chose-tag">${choice.verb}</span>${opt.label}`);
    wrap.replaceWith(chosen);
    // render consequence beats
    let delay = 60;
    const say = opt.say || [];
    let lastNode = chosen;
    for (const b of say) {
      const node = renderBeat(b);
      if (node) { lastNode = staggered(node, delay); screen.appendChild(lastNode); delay += 90; }
    }
    const cont = renderContinue('Continue');
    staggered(cont, delay);
    screen.appendChild(cont);
    requestAnimationFrame(() => cont.scrollIntoView({ behavior: 'smooth', block: 'nearest' }));
  }

  function renderEndFooter(kind) {
    const p = PHONES_BY_ID[kind] || run.phone;
    const wrap = el('div', 'end-foot');
    state.completed[p.id] = true; save();
    const justUnlocked = (p.id === 'maya');
    wrap.innerHTML = `
      <div class="end-rule"></div>
      <div class="end-name">${p.name}</div>
      <div class="end-line">end of her morning</div>
      <div class="end-lesson">${p.lesson}</div>
    `;
    const btnRow = el('div', 'end-btns');
    const back = el('button', 'continue-btn', allDone() ? 'See the whole morning' : 'Back to the phones');
    back.addEventListener('click', () => { if (allDone()) renderTimeline(); else renderRack(); });
    btnRow.appendChild(back);
    if (allDone()) {
      const r = el('button', 'linkish', 'Back to the phones');
      r.addEventListener('click', renderRack);
      btnRow.appendChild(r);
    } else if (justUnlocked) {
      wrap.appendChild(el('div', 'end-unlock', 'Tita Merly and Bea have woken up.'));
    }
    wrap.appendChild(btnRow);
    return wrap;
  }

  function completePhone(kind) {
    // fallback: flow ended without an explicit end beat
    const p = PHONES_BY_ID[kind] || run.phone;
    state.completed[p.id] = true; save();
    renderRack();
  }

  /* =================================================================
     TIMELINE EPILOGUE
  ================================================================= */
  function mayaDynamic(key) {
    const c = state.choices.maya_choice;
    const map = {
      tapped: 'She taps the link anyway — “probably” misinformation is not “definitely,” and she would rather be certain than right.',
      asked: 'She asks Tita where it came from, softened with an emoji so it reads as curiosity, not doubt — and gets a vouching chain back.',
      hearted: 'She reacts ❤️ and scrolls past, adding her own name to the link — knowing, in the moment she taps it, exactly what the heart does downstream.',
      filed: 'She screenshots it for Kuya Renz, turning the problem into a message she sent but didn’t have to send yet.',
    };
    return map[c] || 'She knows the template on sight — she has built it. Knowing is not the same as stopping.';
  }

  function renderTimeline() {
    state.seenTimeline = true; save();
    run = null;
    clear($app);
    const wrap = el('div', 'epilogue');
    wrap.appendChild(headerBlock(TIMELINE.title, TIMELINE.intro));

    const line = el('div', 'timeline');
    TIMELINE.events.forEach((ev, i) => {
      const row = el('div', `tl-row theme-${ev.who}`);
      const text = ev.dynamic ? mayaDynamic(ev.dynamic) : ev.text;
      row.innerHTML = `
        <div class="tl-rail"><span class="tl-time">${ev.time}</span><span class="tl-dot"></span></div>
        <div class="tl-card">
          <div class="tl-who">${PHONES_BY_ID[ev.who].name}</div>
          <div class="tl-label">${ev.label}</div>
          <div class="tl-text">${text}</div>
        </div>
      `;
      row.style.animationDelay = (i * 90) + 'ms';
      row.classList.add('rise');
      line.appendChild(row);
    });
    wrap.appendChild(line);

    const close = el('div', 'epi-close');
    close.innerHTML = TIMELINE.close.map((t, i) => `<p${i === TIMELINE.close.length - 1 ? ' class="punch"' : ''}>${t}</p>`).join('');
    wrap.appendChild(close);

    const btns = el('div', 'epi-btns');
    const r = el('button', 'continue-btn', 'What you carry forward');
    r.addEventListener('click', renderReflection);
    const back = el('button', 'linkish', 'Back to the phones');
    back.addEventListener('click', renderRack);
    btns.appendChild(r); btns.appendChild(back);
    wrap.appendChild(btns);

    $app.appendChild(wrap);
    $app.scrollTop = 0;
  }

  /* =================================================================
     REFLECTION
  ================================================================= */
  function renderReflection() {
    run = null;
    clear($app);
    const wrap = el('div', 'epilogue reflection');
    wrap.appendChild(headerBlock(REFLECTION.title, ''));

    const cards = el('div', 'reflect-cards');
    REFLECTION.cards.forEach((c, i) => {
      const card = el('div', `reflect-card theme-${c.who}`);
      card.innerHTML = `
        <div class="rf-top"><span class="rf-name">${PHONES_BY_ID[c.who].name}</span><span class="rf-verb">${c.verb}</span></div>
        <div class="rf-line">${c.line}</div>
        <div class="rf-body">${c.body}</div>
      `;
      card.style.animationDelay = (i * 110) + 'ms';
      card.classList.add('rise');
      cards.appendChild(card);
    });
    wrap.appendChild(cards);

    const coda = el('div', 'reflect-coda', `<p>${REFLECTION.coda}</p>`);
    wrap.appendChild(coda);

    const btns = el('div', 'epi-btns');
    const back = el('button', 'continue-btn', 'Back to the phones');
    back.addEventListener('click', renderRack);
    btns.appendChild(back);
    wrap.appendChild(btns);

    $app.appendChild(wrap);
    $app.scrollTop = 0;
  }

  function headerBlock(title, intro) {
    const h = el('div', 'epi-head');
    h.innerHTML = `<h1>${title}</h1>${intro ? `<p>${intro}</p>` : ''}`;
    return h;
  }

  /* =================================================================
     SPLASH + INIT
  ================================================================= */
  function init() {
    const splash = document.getElementById('splash');
    const begin = document.getElementById('splash-begin');
    if (begin) {
      begin.addEventListener('click', () => {
        splash.classList.add('gone');
        setTimeout(() => splash.remove(), 600);
        renderRack();
      });
    } else {
      renderRack();
    }
    // if returning visitor with progress, let them skip splash quickly — still show it but it's fine.
  }

  init();
})();
