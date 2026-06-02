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
  const STORE_KEY = DATA.storeKey;
  const ANCHORS = DATA.anchors;
  const ANCHOR_ORDER = DATA.anchorOrder || Object.keys(ANCHORS);

  /* current anchor cursor (set by setAnchor) */
  let A = null;            // the active anchor object
  let PHONES_BY_ID = {};   // = A.phones

  /* ---------------- state (namespaced per anchor) ---------------- */
  function blankState() { return { anchors: {} }; }
  function load() {
    try {
      const r = localStorage.getItem(STORE_KEY);
      const s = r ? JSON.parse(r) : blankState();
      if (!s.anchors) s.anchors = {};
      return s;
    } catch (e) { return blankState(); }
  }
  function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {} }

  let state = load();

  /* per-anchor sub-state: { completed, choices, seenTimeline } */
  function as(id) {
    if (!state.anchors) state.anchors = {};
    if (!state.anchors[id]) state.anchors[id] = { completed: {}, choices: {}, seenTimeline: false };
    return state.anchors[id];
  }
  function S() { return as(A.id); }
  function setAnchor(id) { A = ANCHORS[id]; PHONES_BY_ID = A.phones; }
  function unit() { return (A.anchor.subtitle || 'Morning').replace(/^one\s+/i, '').toLowerCase(); }

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

  function allDone() { return A.order.every(id => S().completed[id]); }
  function unlocked(id) { return id === A.entry || !!S().completed[A.entry]; }
  function needsMet(needs) { return needs.every(id => S().completed[id]); }

  /* =================================================================
     ANCHOR SELECT — choose which story (which morning/evening)
  ================================================================= */
  function renderAnchorSelect() {
    run = null; A = null;
    clear($app);
    const wrap = el('div', 'rack anchors');

    const head = el('div', 'rack-head');
    head.innerHTML = `
      <div class="rack-kicker">BLACKGLASS</div>
      <h1 class="rack-title">Four ways to be fooled</h1>
      <p class="rack-blurb">The same family, the same phones, four different stories. Each stands on its own — three are a machine wearing a face you trust; the last is the feed quietly reshaping the face that scrolls.</p>
    `;
    wrap.appendChild(head);

    const grid = el('div', 'anchor-grid');
    ANCHOR_ORDER.forEach(id => grid.appendChild(anchorCard(id)));
    wrap.appendChild(grid);

    const foot = el('div', 'rack-foot');
    const reset = el('button', 'linkish', 'Reset everything');
    reset.addEventListener('click', () => {
      if (confirm('Forget both stories and start over?')) { state = blankState(); save(); renderAnchorSelect(); }
    });
    foot.appendChild(reset);
    wrap.appendChild(foot);

    $app.appendChild(wrap);
    $app.scrollTop = 0;
  }

  function anchorCard(id) {
    const an = ANCHORS[id];
    const st = as(id);
    const done = an.order.filter(pid => st.completed[pid]).length;
    const total = an.order.length;
    const card = el('button', `anchor-card theme-${an.phones[an.entry].theme}`);
    card.type = 'button';
    card.innerHTML = `
      <div class="an-kicker">${done === total ? '✓ lived' : done > 0 ? done + ' of ' + total + ' lived' : 'unplayed'}</div>
      <div class="an-title">${an.anchor.title} <span>·</span> ${an.anchor.subtitle}</div>
      <p class="an-blurb">${an.anchor.blurb}</p>
      <div class="an-q">${an.anchor.question}</div>
      <div class="an-go">${done === total ? 'Revisit →' : done > 0 ? 'Continue →' : 'Enter →'}</div>
    `;
    card.addEventListener('click', () => { setAnchor(id); renderRack(); });
    return card;
  }

  /* =================================================================
     RACK — the three phones for the current anchor
  ================================================================= */
  function renderRack() {
    run = null;
    clear($app);
    const wrap = el('div', 'rack');

    const top = el('div', 'rack-top');
    const toAnchors = el('button', 'linkish back-anchors', '‹ Both stories');
    toAnchors.addEventListener('click', renderAnchorSelect);
    top.appendChild(toAnchors);
    wrap.appendChild(top);

    const head = el('div', 'rack-head');
    head.innerHTML = `
      <div class="rack-kicker">BLACKGLASS</div>
      <h1 class="rack-title">${A.anchor.title} <span>·</span> ${A.anchor.subtitle}</h1>
      <p class="rack-blurb">${A.anchor.blurb}</p>
    `;
    wrap.appendChild(head);

    const grid = el('div', 'rack-grid');
    A.order.forEach(id => grid.appendChild(rackCard(id)));
    wrap.appendChild(grid);

    const u = unit();
    const single = A.order.length === 1;
    const entryName = PHONES_BY_ID[A.entry].name;
    const doneCount = A.order.filter(id => S().completed[id]).length;
    const hint = el('p', 'rack-hint');
    if (doneCount === 0) {
      hint.innerHTML = single
        ? `One phone. Live it through, week by week.`
        : `Start with ${entryName}. The others wake up once you’ve lived the ${u} from inside her phone.`;
    } else if (!allDone()) {
      hint.innerHTML = `${doneCount} of ${A.order.length} lived. Pick up another phone — order changes what you’ll feel.`;
    } else {
      hint.innerHTML = single
        ? `Lived. Now see what it added up to.`
        : `Three phones lived. Now see the one timeline none of them could.`;
    }
    wrap.appendChild(hint);

    /* epilogue entries once all done */
    if (allDone()) {
      const ep = el('div', 'rack-epilogue');
      const tBtn = el('button', 'epi-btn primary', `<span class="epi-tag">↳</span> ${A.timeline.title}`);
      tBtn.addEventListener('click', renderTimeline);
      const rBtn = el('button', 'epi-btn', `<span class="epi-tag">✻</span> What you carry forward`);
      rBtn.addEventListener('click', renderReflection);
      ep.appendChild(tBtn);
      ep.appendChild(rBtn);
      if (A.examine && hasArtifacts()) {
        const xBtn = el('button', 'epi-btn', `<span class="epi-tag">⌕</span> Look again — what fooled them`);
        xBtn.addEventListener('click', renderExamine);
        ep.appendChild(xBtn);
      }
      wrap.appendChild(ep);
    }

    /* reset */
    const foot = el('div', 'rack-foot');
    const reset = el('button', 'linkish', 'Reset everything');
    reset.addEventListener('click', () => {
      if (confirm('Forget both stories and start over?')) {
        state = blankState(); save(); renderAnchorSelect();
      }
    });
    foot.appendChild(reset);
    wrap.appendChild(foot);

    $app.appendChild(wrap);
    $app.scrollTop = 0;
  }

  function rackCard(id) {
    const p = PHONES_BY_ID[id];
    const open = unlocked(id);
    const done = !!S().completed[id];
    const entryName = PHONES_BY_ID[A.entry].name;
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
        <div class="rc-essence">${open ? p.essence : 'Locked — play ' + entryName + ' first.'}</div>
      </div>
      <div class="rc-action">${open ? (done ? 'Replay' : 'Pick up') : ''}</div>
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
    if (f.set) { Object.assign(S().choices, f.set); save(); }
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
      case 'gallery': return renderGallery(b);
      case 'photo': return renderPhoto(b);
      case 'weekhead': return renderWeekhead(b);
      case 'call': return renderCall(b);
      case 'transfer': return renderTransfer(b);
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

  function artifact(id) { return (id && window.ARTIFACTS && window.ARTIFACTS[id]) || null; }

  function renderLink(b) {
    const c = el('div', 'link-card');
    const art = artifact(b.artifact);
    if (art) { c.classList.add('has-art'); c.dataset.artifact = b.artifact; }
    const banner = art
      ? `<img class="link-banner" src="${art.file}" alt="" loading="lazy"
            onerror="this.closest('.link-card').classList.add('noimg');this.remove();">`
      : '';
    c.innerHTML = `
      ${banner}
      <div class="link-row">
        <div class="link-thumb"><span class="link-warn">!</span></div>
        <div class="link-body">
          <div class="link-title">${b.title}</div>
          <div class="link-domain">${b.domain}</div>
        </div>
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

  function renderGallery(b) {
    const wrap = el('div', 'art-gallery');
    (b.artifacts || []).forEach(id => {
      const art = artifact(id);
      const tile = el('div', 'art-thumb');
      if (art && art.file) {
        tile.innerHTML = `<img src="${art.file}" alt="" loading="lazy"
          onerror="this.closest('.art-thumb').classList.add('noimg');this.remove();">`;
      }
      wrap.appendChild(tile);
    });
    return wrap;
  }

  function renderWeekhead(b) {
    const c = el('div', 'weekhead');
    c.innerHTML = `<span class="wh-week">${b.week}</span><span class="wh-date">${b.date || ''}</span>${b.stat ? `<span class="wh-stat">${b.stat}</span>` : ''}`;
    return c;
  }

  function renderPhoto(b) {
    const row = el('div', `msg ${b.side === 'out' ? 'out' : 'in'} photo-msg`);
    const meta = [b.sender, b.time].filter(Boolean).join(' · ');
    const art = artifact(b.artifact);
    const img = (art && art.file)
      ? `<img class="photo-img" src="${art.file}" alt="" loading="lazy"
            onerror="this.closest('.photo-msg').classList.add('noimg');this.remove();">`
      : '';
    row.innerHTML = `${meta ? `<div class="msg-meta">${meta}</div>` : ''}
      <div class="bubble photo-bubble"><div class="photo-frame">${img}<div class="photo-ph"></div></div>${b.caption ? `<div class="photo-cap">${b.caption}</div>` : ''}</div>`;
    return row;
  }

  function renderNotif(b) {
    const c = el('div', 'push-notif');
    c.innerHTML = `<div class="pn-app">${b.app}</div><div class="pn-text">${b.text}</div>${b.time ? `<div class="pn-time">${b.time}</div>` : ''}`;
    return c;
  }

  function renderCall(b) {
    const c = el('div', 'call-card' + (b.state === 'incoming' ? ' incoming' : ''));
    const initial = (b.who || '?').trim().charAt(0);
    c.innerHTML = `
      <div class="call-top">${b.state === 'incoming' ? 'incoming call' : 'calling…'}</div>
      <div class="call-avatar">${initial}</div>
      <div class="call-who">${b.who || ''}</div>
      <div class="call-sub">${b.sub || ''}</div>
      <div class="call-actions"><span class="call-decline">✕</span><span class="call-accept">✆</span></div>
    `;
    return c;
  }

  function renderTransfer(b) {
    const done = b.stage === 'done';
    const c = el('div', 'transfer-card' + (done ? ' done' : ''));
    c.innerHTML = `
      <div class="tr-head"><span class="tr-app">GCash</span><span class="tr-status">${done ? '✓ Sent' : 'Send Money'}</span></div>
      <div class="tr-amt">₱${b.amount}</div>
      <div class="tr-to">to ${b.to}</div>
      <div class="tr-bal">Balance${done ? ' now' : ''} ₱${b.balance}</div>
    `;
    return c;
  }

  function renderVideo(b) {
    const c = el('div', 'video-card');
    const art = artifact(b.artifact);
    if (art) { c.classList.add('has-art'); c.dataset.artifact = b.artifact; }
    const still = art
      ? `<img class="vc-still" src="${art.file}" alt="" loading="lazy"
            onerror="this.closest('.video-card').classList.add('noimg');this.remove();"><div class="vc-scrim"></div>`
      : '';
    c.innerHTML = `
      <div class="vc-frame">
        ${still}
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
    if (opt.set) { Object.assign(S().choices, opt.set); save(); }
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
    S().completed[p.id] = true; save();
    const justUnlocked = (p.id === A.entry);
    const single = A.order.length === 1;
    const endLine = single ? 'five weeks on' : ('end of her ' + unit());
    wrap.innerHTML = `
      <div class="end-rule"></div>
      <div class="end-name">${p.name}</div>
      <div class="end-line">${endLine}</div>
      <div class="end-lesson">${p.lesson}</div>
    `;
    const btnRow = el('div', 'end-btns');
    const back = el('button', 'continue-btn', allDone() ? A.timeline.title : 'Back to the phones');
    back.addEventListener('click', () => { if (allDone()) renderTimeline(); else renderRack(); });
    btnRow.appendChild(back);
    if (allDone()) {
      const r = el('button', 'linkish', 'Back to the phones');
      r.addEventListener('click', renderRack);
      btnRow.appendChild(r);
    } else if (justUnlocked) {
      const others = A.order.filter(x => x !== A.entry).map(x => PHONES_BY_ID[x].name);
      wrap.appendChild(el('div', 'end-unlock', others.join(' and ') + ' have woken up.'));
    }
    wrap.appendChild(btnRow);
    return wrap;
  }

  function completePhone(kind) {
    // fallback: flow ended without an explicit end beat
    const p = PHONES_BY_ID[kind] || run.phone;
    S().completed[p.id] = true; save();
    renderRack();
  }

  /* =================================================================
     TIMELINE EPILOGUE
  ================================================================= */
  function resolveDynamic(ev) {
    if (!ev.dynamic) return ev.text;
    const d = ev.dynamic;
    const v = S().choices[d.key];
    return (d.map && d.map[v]) || d.fallback || ev.text;
  }

  function silentWitnessBlock(sw) {
    const b = el('div', 'silent-witness rise');
    b.innerHTML = `
      <div class="sw-frame">
        <div class="sw-back"></div>
        <div class="sw-mute">missed calls</div>
        <div class="sw-badge">14</div>
      </div>
      <div class="sw-body">
        <div class="sw-meta">${sw.who} · ${sw.time}</div>
        <div class="sw-title">${sw.label}</div>
        ${sw.lines.map(l => `<p>${l}</p>`).join('')}
      </div>
    `;
    return b;
  }

  function renderTimeline() {
    S().seenTimeline = true; save();
    run = null;
    clear($app);
    const TL = A.timeline;
    const wrap = el('div', 'epilogue');
    wrap.appendChild(headerBlock(TL.title, TL.intro));

    const line = el('div', 'timeline');
    TL.events.forEach((ev, i) => {
      const row = el('div', `tl-row theme-${ev.who}`);
      row.innerHTML = `
        <div class="tl-rail"><span class="tl-time">${ev.time}</span><span class="tl-dot"></span></div>
        <div class="tl-card">
          <div class="tl-who">${PHONES_BY_ID[ev.who].name}</div>
          <div class="tl-label">${ev.label}</div>
          <div class="tl-text">${resolveDynamic(ev)}</div>
        </div>
      `;
      row.style.animationDelay = (i * 80) + 'ms';
      row.classList.add('rise');
      line.appendChild(row);
    });
    wrap.appendChild(line);

    if (A.silentWitness) wrap.appendChild(silentWitnessBlock(A.silentWitness));

    const close = el('div', 'epi-close');
    close.innerHTML = TL.close.map((t, i) => `<p${i === TL.close.length - 1 ? ' class="punch"' : ''}>${t}</p>`).join('');
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
    wrap.appendChild(headerBlock(A.reflection.title, ''));

    const cards = el('div', 'reflect-cards');
    A.reflection.cards.forEach((c, i) => {
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

    const coda = el('div', 'reflect-coda', `<p>${A.reflection.coda}</p>`);
    wrap.appendChild(coda);

    const showExamine = A.examine && hasArtifacts();
    const btns = el('div', 'epi-btns');
    if (showExamine) {
      const x = el('button', 'continue-btn', 'Look again — what fooled them');
      x.addEventListener('click', renderExamine);
      btns.appendChild(x);
    }
    const back = el('button', showExamine ? 'linkish' : 'continue-btn', 'Back to the phones');
    back.addEventListener('click', renderRack);
    btns.appendChild(back);
    wrap.appendChild(btns);

    $app.appendChild(wrap);
    $app.scrollTop = 0;
  }

  /* =================================================================
     EXAMINE — the tells-reveal. The AI artifacts, looked at slowly.
     Each was built to be believed; here the planted tells become
     visible. This is the pedagogical payload: the synthetic image,
     turned into the teaching surface.
  ================================================================= */
  const EXAMINE_INTRO =
    'These are the artifacts — the things on the glass that did the convincing. ' +
    'Each was made by a machine to be believed, and believed it was. Look again, ' +
    'slowly this time. Tap a mark to see what nobody stopped to notice.';

  function hasArtifacts() {
    if (!window.ARTIFACTS) return false;
    return Object.values(window.ARTIFACTS).some((a) => a.anchor === A.id && (a.tells || []).length);
  }
  function examineOrder() {
    const order = window.ARTIFACTS_ORDER || Object.keys(window.ARTIFACTS || {});
    return order.filter((id) => {
      const a = window.ARTIFACTS && window.ARTIFACTS[id];
      return a && a.anchor === A.id && (a.tells || []).length;
    });
  }

  function renderExamine() {
    run = null;
    clear($app);
    const wrap = el('div', 'epilogue examine');
    wrap.appendChild(headerBlock('Look again', EXAMINE_INTRO));

    const list = el('div', 'examine-list');
    examineOrder().forEach((id, i) => list.appendChild(examineCard(id, window.ARTIFACTS[id], i)));
    wrap.appendChild(list);

    const btns = el('div', 'epi-btns');
    const back = el('button', 'continue-btn', 'What you carry forward');
    back.addEventListener('click', renderReflection);
    const rack = el('button', 'linkish', 'Back to the phones');
    rack.addEventListener('click', renderRack);
    btns.appendChild(back); btns.appendChild(rack);
    wrap.appendChild(btns);

    $app.appendChild(wrap);
    $app.scrollTop = 0;
  }

  function examineCard(id, art, i) {
    const tells = art.tells || [];
    const card = el('div', 'examine-card rise');
    card.style.animationDelay = (i * 80) + 'ms';

    const isVideo = art.kind === 'video';
    const img = art.file
      ? `<img class="ex-img" src="${art.file}" alt="" loading="lazy" onerror="this.closest('.ex-frame').classList.add('noimg');this.remove();">`
      : '';
    const markers = tells.map((t, n) =>
      `<button class="ex-marker" type="button" data-n="${n}" style="left:${(t.x * 100).toFixed(1)}%;top:${(t.y * 100).toFixed(1)}%" aria-label="Reveal tell ${n + 1}">${n + 1}</button>`
    ).join('');

    card.innerHTML = `
      <div class="ex-head">
        <div class="ex-title">${art.title || id}</div>
        <div class="ex-what">${art.what || ''}</div>
      </div>
      <div class="ex-frame ${isVideo ? 'ex-video' : 'ex-link'}">
        ${img}
        <div class="ex-vignette"></div>
        ${markers}
      </div>
      <button class="ex-reveal" type="button">Reveal the tells · ${tells.length}</button>
      <ol class="ex-tells"></ol>
    `;

    const tellsEl = card.querySelector('.ex-tells');
    tells.forEach((t, n) => {
      const li = el('li', 'ex-tell');
      li.dataset.n = n;
      li.innerHTML = `<span class="ex-tn">${n + 1}</span><div class="ex-td"><div class="ex-tl">${t.label}</div><div class="ex-tx">${t.detail}</div></div>`;
      tellsEl.appendChild(li);
    });

    const markerEls = Array.from(card.querySelectorAll('.ex-marker'));
    const tellEls = Array.from(card.querySelectorAll('.ex-tell'));
    const reveal = card.querySelector('.ex-reveal');

    function focus(n) {
      card.classList.add('revealed');
      reveal.textContent = 'Hide the tells';
      markerEls.forEach((m, k) => m.classList.toggle('on', k === n));
      tellEls.forEach((l, k) => l.classList.toggle('on', k === n));
      const t = tellEls[n]; if (t) t.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    markerEls.forEach((m, n) => m.addEventListener('click', () => focus(n)));
    tellEls.forEach((l, n) => l.addEventListener('click', () => focus(n)));
    reveal.addEventListener('click', () => {
      const on = card.classList.toggle('revealed');
      reveal.textContent = on ? 'Hide the tells' : ('Reveal the tells · ' + tells.length);
      if (!on) { markerEls.forEach((m) => m.classList.remove('on')); tellEls.forEach((l) => l.classList.remove('on')); }
    });

    return card;
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
        renderAnchorSelect();
      });
    } else {
      renderAnchorSelect();
    }
    // if returning visitor with progress, let them skip splash quickly — still show it but it's fine.
  }

  init();
})();
