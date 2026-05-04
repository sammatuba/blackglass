/* =====================================================================
   BLACKGLASS — Engine
   Reads story.js (window.BLACKGLASS), renders passages, tracks flags,
   resolves branches, routes to one of four endings.
   ===================================================================== */

(function () {
    'use strict';

    const { SCENES, PASSAGES, START } = window.BLACKGLASS;
    const STORE_KEY = 'blackglass.state.v1';

    /* Map of scene key → entry passage. Lets the TOC jump cleanly. */
    const SCENE_ENTRY = {
        s1: 's1_morning',
        s2: 's2_intro',
        s3: 's3_intro',
        s4: 's4_intro',
        s5: 's5_intro',
        s6: 's6_intro',
        s7: 's7_intro',
        s8: 's8_intro',
        s9: 's9_intro',
        s10: 's10_intro',
        s11: 's11_intro',
        s12: 's12_compute',
    };

    const ACT_TITLES = {
        1: 'The Normal Day',
        2: 'The Tightening',
        3: 'The Reckoning',
    };

    /* DOM */
    const $story = document.getElementById('story');
    const $topbarTime = document.getElementById('topbar-time');
    const $topbarScene = document.getElementById('topbar-scene');
    const $toc = document.getElementById('toc');
    const $drawer = document.getElementById('drawer');
    const $drawerBackdrop = document.getElementById('drawer-backdrop');
    const $drawerClose = document.getElementById('drawer-close');
    const $tocBtn = document.getElementById('toc-btn');
    const $restartBtn = document.getElementById('restart-btn');
    const $splash = document.getElementById('splash');
    const $splashBegin = document.getElementById('splash-begin');

    let state;

    /* ---------------- state ---------------- */

    function newState() {
        return {
            current: null,
            flags: {},
            currentScene: null,
            done: false,
        };
    }

    function loadState() {
        try {
            const raw = localStorage.getItem(STORE_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch (e) { return null; }
    }

    function saveState() {
        try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
    }

    /* ---------------- ending logic ---------------- */

    function computeEnding() {
        const f = state.flags;
        if (f.s2_scammed || f.s8_scammed) return 's12_wounded';
        if (f.s4_silent && f.s6_silent) return 's12_withdrawn';
        if (f.s4_spoke && f.s6_factcheck) return 's12_protector';
        return 's12_realist';
    }

    /* ---------------- DOM helpers ---------------- */

    function el(tag, cls, html) {
        const e = document.createElement(tag);
        if (cls) e.className = cls;
        if (html != null) e.innerHTML = html;
        return e;
    }

    /* ---------------- beat rendering ---------------- */

    function renderBeat(item) {
        switch (item.k) {
            case 'p':
                return el('div', 'beat', `<p>${item.html}</p>`);
            case 'em':
                return el('div', 'beat', `<p><em>${item.html}</em></p>`);
            case 'aside':
                return el('div', 'aside', item.html);
            case 'div':
                return el('div', 'divider');
            case 'notif':
                return el('div', 'notif',
                    `<div class="notif-app">${item.app}</div><div class="notif-body">${item.html}</div>`);
            case 'chat':
                return renderChat(item);
            case 'callout':
                return el('div', 'callout',
                    `<div class="callout-tag">${item.tag}</div>${item.html}`);
            case 'endhead':
                return el('div', 'ending-card',
                    `<div class="ending-tag">${item.tag}</div><div class="ending-title">${item.title}</div>`);
            case 'final':
                return el('div', 'final-moment', `
                    <p>Screen fades to black.</p>
                    <p>One final notification sound.</p>
                    <p>You reach for your phone.</p>
                    <p>Then hesitate.</p>
                    <p>That hesitation —</p>
                    <p>That’s the whole point.</p>
                `);
            default:
                console.warn('Unknown beat kind:', item);
                return el('div', 'beat', `<p>${item.html || ''}</p>`);
        }
    }

    function renderChat(item) {
        const e = el('div', 'chat');
        let html = '';
        if (item.title) {
            html += `<div class="chat-title">${item.title}</div>`;
        }
        for (const row of item.rows) {
            if ('typing' in row) {
                const note = row.typing || 'typing…';
                html += `<div class="chat-row"><div class="chat-typing">[${note}]</div></div>`;
            } else {
                const meta = [row.from, row.time].filter(Boolean).join(' · ');
                html += `
                    <div class="chat-row">
                        ${meta ? `<div class="chat-meta">${meta}</div>` : ''}
                        <div class="chat-msg">${row.html}</div>
                    </div>`;
            }
        }
        e.innerHTML = html;
        return e;
    }

    function renderSceneHead(sceneKey) {
        const s = SCENES[sceneKey];
        if (!s) return null;
        const head = el('div', 'scene-head');
        head.innerHTML = `
            <div class="scene-act">Act ${s.act} · Scene ${s.num}</div>
            <h2 class="scene-title">${s.title}</h2>
            <div class="scene-time">${s.time}</div>
        `;
        return head;
    }

    function renderChoices(passage) {
        if (passage.choices && passage.choices.length) {
            const wrap = el('div', 'choices');
            passage.choices.forEach(c => {
                const btn = el('button', 'choice');
                btn.type = 'button';
                btn.innerHTML = c.label;
                btn.addEventListener('click', () => onChoice(c, wrap));
                wrap.appendChild(btn);
            });
            return wrap;
        }
        if (passage.next) {
            const btn = el('button', 'continue', passage.nextLabel || 'Continue');
            btn.type = 'button';
            btn.addEventListener('click', () => onContinue(passage, btn));
            return btn;
        }
        return renderReplay();
    }

    function renderReplay() {
        const wrap = el('div');
        wrap.innerHTML = `
            <div class="end-mark">END</div>
            <div class="replay">
                <button class="continue" data-act="restart">Begin again</button>
                <button class="continue" data-act="toc">Browse scenes</button>
                <button class="continue" data-act="endings">See other endings</button>
            </div>
        `;
        // Wire up after appended (we'll do it via event delegation immediately):
        wrap.addEventListener('click', (e) => {
            const act = e.target?.dataset?.act;
            if (act === 'restart') restart(true);
            else if (act === 'toc') openDrawer();
            else if (act === 'endings') showEndingMenu();
        });
        return wrap;
    }

    function renderChose(label) {
        return el('div', 'chose', label);
    }

    /* ---------------- engine ---------------- */

    function gotoPassage(id) {
        let p = PASSAGES[id];
        if (!p) { console.error('Missing passage:', id); return; }

        /* Resolve branches transparently. */
        let safety = 0;
        while (p && p.branch) {
            if (safety++ > 8) { console.error('Branch loop'); return; }
            if (p.branch.compute === 'ending') {
                id = computeEnding();
            } else if (p.branch.flag) {
                id = state.flags[p.branch.flag] ? p.branch.ifTrue : p.branch.ifFalse;
            } else {
                break;
            }
            p = PASSAGES[id];
            if (!p) { console.error('Missing branch target:', id); return; }
        }

        if (p.set) Object.assign(state.flags, p.set);

        state.current = id;

        let firstNew = null;

        /* Scene change → render header. */
        if (p.scene && p.scene !== state.currentScene) {
            state.currentScene = p.scene;
            const head = renderSceneHead(p.scene);
            if (head) {
                $story.appendChild(head);
                if (!firstNew) firstNew = head;
            }
            updateTopbar();
            updateTOC();
        }

        /* Body. */
        if (p.body) {
            for (const item of p.body) {
                const node = renderBeat(item);
                $story.appendChild(node);
                if (!firstNew) firstNew = node;
            }
        }

        /* Choices / continue / replay. */
        const cn = renderChoices(p);
        $story.appendChild(cn);
        if (!firstNew) firstNew = cn;

        if (!p.next && !p.choices) {
            state.done = true;
        }

        saveState();

        /* Scroll new content into view. */
        requestAnimationFrame(() => {
            if (firstNew) {
                firstNew.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    function onChoice(choice, wrap) {
        if (choice.set) Object.assign(state.flags, choice.set);
        wrap.replaceWith(renderChose(choice.label));
        gotoPassage(choice.target);
    }

    function onContinue(passage, btn) {
        btn.remove();
        gotoPassage(passage.next);
    }

    /* ---------------- topbar ---------------- */

    function updateTopbar() {
        const s = SCENES[state.currentScene];
        if (!s) {
            $topbarTime.textContent = '';
            $topbarScene.textContent = 'Maya’s Story';
            return;
        }
        $topbarTime.textContent = `Act ${s.act} · Scene ${s.num}`;
        $topbarScene.textContent = s.title;
    }

    /* ---------------- TOC drawer ---------------- */

    function buildTOC() {
        const sceneKeys = Object.keys(SCENES);
        let lastAct = 0;
        let html = '';
        for (const k of sceneKeys) {
            const s = SCENES[k];
            if (s.act !== lastAct) {
                html += `<div class="toc-act-head">Act ${s.act} · ${ACT_TITLES[s.act]}</div>`;
                lastAct = s.act;
            }
            html += `
                <li class="toc-item">
                    <button class="toc-link" data-scene="${k}" type="button">
                        <div class="toc-num">Scene ${s.num}</div>
                        <div class="toc-title">${s.title}</div>
                        <div class="toc-time">${s.time}</div>
                    </button>
                </li>
            `;
        }
        $toc.innerHTML = html;
        $toc.querySelectorAll('.toc-link').forEach(a => {
            a.addEventListener('click', () => jumpToScene(a.dataset.scene));
        });
    }

    function updateTOC() {
        $toc.querySelectorAll('.toc-link').forEach(a => {
            a.classList.toggle('active', a.dataset.scene === state.currentScene);
        });
    }

    function jumpToScene(sceneKey) {
        const id = SCENE_ENTRY[sceneKey];
        if (!id) return;
        closeDrawer();
        state = newState();
        $story.innerHTML = '';
        gotoPassage(id);
    }

    function showEndingMenu() {
        const opts = [
            { id: 's12_protector', tag: 'A', title: 'The Protector' },
            { id: 's12_withdrawn', tag: 'B', title: 'The Withdrawn' },
            { id: 's12_wounded', tag: 'C', title: 'The Wounded' },
            { id: 's12_realist', tag: 'D', title: 'The Realist' },
        ];
        const wrap = el('div', 'choices');
        wrap.appendChild(el('div', 'choice-prompt', 'Other endings'));
        for (const o of opts) {
            const btn = el('button', 'choice');
            btn.type = 'button';
            btn.innerHTML = `<strong>Ending ${o.tag}</strong> · ${o.title}`;
            btn.addEventListener('click', () => {
                wrap.remove();
                state.currentScene = null;   // force scene head re-render
                gotoPassage(o.id);
            });
            wrap.appendChild(btn);
        }
        $story.appendChild(wrap);
        wrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    /* ---------------- drawer ---------------- */

    function openDrawer() { $drawer.setAttribute('aria-hidden', 'false'); }
    function closeDrawer() { $drawer.setAttribute('aria-hidden', 'true'); }

    /* ---------------- restart ---------------- */

    function restart(silent) {
        if (!silent && !confirm('Restart from the beginning? Your current path will be cleared.')) return;
        state = newState();
        saveState();
        $story.innerHTML = '';
        gotoPassage(START);
    }

    /* ---------------- splash ---------------- */

    function dismissSplash() {
        $splash.classList.add('dismissed');
        setTimeout(() => $splash.remove(), 700);
    }

    /* ---------------- init ---------------- */

    function init() {
        state = newState();
        buildTOC();
        updateTopbar();

        $tocBtn.addEventListener('click', openDrawer);
        $drawerClose.addEventListener('click', closeDrawer);
        $drawerBackdrop.addEventListener('click', closeDrawer);
        $restartBtn.addEventListener('click', () => restart(false));
        $splashBegin.addEventListener('click', () => {
            dismissSplash();
            gotoPassage(START);
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeDrawer();
        });
    }

    init();
})();
