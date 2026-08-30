/**
 * Hallucination Hunt — Evidence Board Game
 * A fact-checker investigation game where players use tool cards
 * to investigate AI claims and stamp verdicts.
 *
 * Depends on:
 *   - claims_data.js  (CLAIMS array)
 *   - ../shared/game-utils.js  (GameUtils)
 *   - ../shared/card-base.css  (gc-* classes)
 */

(function () {
    'use strict';

    /* ========================================
       Constants
       ======================================== */

    const STORAGE_KEY = 'hallucinationHunt';
    const TOTAL_ROUNDS = 15;
    const RESTOCK_INTERVAL = 5; // restock tools every N rounds

    const TOOL_DEFS = {
        citations: { name: 'Citation Check', icon: '\uD83D\uDCDA', color: 'blue', key: 'citations' },
        facts:     { name: 'Fact Cross-Ref', icon: '\uD83D\uDD0E', color: 'green', key: 'facts' },
        sources:   { name: 'Source Verify',  icon: '\uD83D\uDD17', color: 'yellow', key: 'sources' },
        logic:     { name: 'Logic Analysis', icon: '\uD83E\uDDE0', color: 'red', key: 'logic' },
        expert:    { name: 'Expert Consult', icon: '\uD83C\uDF93', color: 'purple', key: 'expert' }
    };

    const INITIAL_TOOLS = {
        citations: 3,
        facts: 3,
        sources: 2,
        logic: 2,
        expert: 2
    };

    const VERDICTS = {
        trust:        { label: 'VERIFIED',      stampClass: 'gc-stamp-accept',  cssClass: 'verdict-trust' },
        hallucination:{ label: 'HALLUCINATED',   stampClass: 'gc-stamp-reject',  cssClass: 'verdict-hallucination' },
        unverifiable: { label: 'UNVERIFIABLE',   stampClass: 'gc-stamp-caution', cssClass: 'verdict-unverifiable' }
    };

    const CERT_TIERS = [
        { min: 90, name: 'Gold',   icon: '\uD83E\uDD47', className: 'tier-gold' },
        { min: 80, name: 'Silver', icon: '\uD83E\uDD48', className: 'tier-silver' },
        { min: 60, name: 'Bronze', icon: '\uD83E\uDD49', className: 'tier-bronze' },
        { min: 0,  name: 'Novice', icon: '\uD83D\uDCCB', className: 'tier-novice' }
    ];

    /* ========================================
       State
       ======================================== */

    let state = {
        phase: 'start',       // start | playing | end
        round: 0,             // current round (0-indexed internally, displayed 1-indexed)
        score: 0,
        streak: 0,
        bestStreak: 0,
        tools: { ...INITIAL_TOOLS },
        usedToolsThisRound: [],
        claims: [],           // shuffled list of claim IDs for this game
        evidenceBoard: [],    // { claimId, verdict, correct, toolsUsed }
        currentClaim: null,
        flipped: false,
        stamped: false,
        difficulty: 1,
        results: { trust: { correct: 0, total: 0 }, hallucination: { correct: 0, total: 0 }, unverifiable: { correct: 0, total: 0 } },
        toolUsage: { citations: 0, facts: 0, sources: 0, logic: 0, expert: 0 }
    };

    /* ========================================
       DOM References
       ======================================== */

    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);

    /* ========================================
       Initialization
       ======================================== */

    function initGame() {
        // Select and shuffle claims based on difficulty ramp
        const pool = [...CLAIMS];
        const shuffled = GameUtils.shuffleArray(pool);
        const selected = shuffled.slice(0, Math.min(TOTAL_ROUNDS, shuffled.length));

        // Sort by difficulty for adaptive ramping
        selected.sort((a, b) => a.difficulty - b.difficulty);

        state = {
            phase: 'playing',
            round: 0,
            score: 0,
            streak: 0,
            bestStreak: 0,
            tools: { ...INITIAL_TOOLS },
            usedToolsThisRound: [],
            claims: selected.map(c => c.id),
            evidenceBoard: [],
            currentClaim: null,
            flipped: false,
            stamped: false,
            difficulty: 1,
            results: { trust: { correct: 0, total: 0 }, hallucination: { correct: 0, total: 0 }, unverifiable: { correct: 0, total: 0 } },
            toolUsage: { citations: 0, facts: 0, sources: 0, logic: 0, expert: 0 }
        };

        dealNextClaim();
    }

    /* ========================================
       Claim Management
       ======================================== */

    function getClaimById(id) {
        return CLAIMS.find(c => c.id === id);
    }

    function dealNextClaim() {
        if (state.round >= state.claims.length) {
            endGame();
            return;
        }

        // Restock tools every N rounds
        if (state.round > 0 && state.round % RESTOCK_INTERVAL === 0) {
            restockTools();
        }

        state.currentClaim = getClaimById(state.claims[state.round]);
        state.flipped = false;
        state.stamped = false;
        state.usedToolsThisRound = [];

        renderGame();

        // Announce for screen readers
        GameUtils.announceToScreenReader(`Round ${state.round + 1} of ${state.claims.length}. A new claim card has been dealt. Tap or click it to flip and read.`);
    }

    function restockTools() {
        // Add half of initial amounts (rounded up)
        Object.keys(INITIAL_TOOLS).forEach(t => {
            state.tools[t] += Math.ceil(INITIAL_TOOLS[t] / 2);
        });
        showToast('Tools restocked!', 'restock');
    }

    /* ========================================
       Adaptive Difficulty
       ======================================== */

    function adaptDifficulty() {
        const recent = state.evidenceBoard.slice(-5);
        if (recent.length < 3) return;

        const recentCorrect = recent.filter(e => e.correct).length;
        const ratio = recentCorrect / recent.length;

        if (ratio >= 0.8 && state.difficulty < 3) {
            state.difficulty = Math.min(3, state.difficulty + 1);
        } else if (ratio <= 0.3 && state.difficulty > 1) {
            state.difficulty = Math.max(1, state.difficulty - 1);
        }
    }

    /* ========================================
       Tool Play
       ======================================== */

    function playTool(toolType) {
        if (state.stamped) return;
        if (!state.flipped) {
            showToast('Flip the claim card first!', 'warning');
            return;
        }
        if (state.tools[toolType] <= 0) {
            showToast('No more of this tool! Use another.', 'warning');
            return;
        }
        if (state.usedToolsThisRound.includes(toolType)) {
            showToast('Already used this tool on this claim.', 'warning');
            return;
        }

        state.tools[toolType]--;
        state.usedToolsThisRound.push(toolType);
        state.toolUsage[toolType]++;

        renderToolHand();
        renderToolResults();
        renderHeader();

        // Animate the result sliding in
        const results = $$('.investigation-result');
        const latest = results[results.length - 1];
        if (latest) {
            latest.classList.add('gc-slide-in');
        }

        GameUtils.announceToScreenReader(`${TOOL_DEFS[toolType].name} result: ${state.currentClaim.toolResults[toolType]}`);
    }

    /* ========================================
       Verdict Stamping
       ======================================== */

    function stampVerdict(verdict) {
        if (state.stamped || !state.flipped) return;

        state.stamped = true;
        const claim = state.currentClaim;
        const correct = verdict === claim.type;

        // Scoring
        let points = 0;
        if (correct) {
            points += 100;
            // Efficiency bonus: fewer tools = more bonus
            const toolsUsed = state.usedToolsThisRound.length;
            if (toolsUsed === 0) points += 50;
            else if (toolsUsed === 1) points += 30;
            else if (toolsUsed === 2) points += 15;

            // Streak bonus
            state.streak++;
            if (state.streak > state.bestStreak) state.bestStreak = state.streak;
            if (state.streak >= 3) points += 25 * (state.streak - 2);
        } else {
            points = -25;
            state.streak = 0;
        }

        state.score = Math.max(0, state.score + points);

        // Track results
        state.results[claim.type].total++;
        if (correct) state.results[claim.type].correct++;

        // Add to evidence board
        state.evidenceBoard.push({
            claimId: claim.id,
            verdict: verdict,
            correct: correct,
            toolsUsed: state.usedToolsThisRound.length
        });

        adaptDifficulty();

        // Render stamp and feedback
        renderStamp(verdict, correct);
        renderHeader();
        renderEvidenceBoardCounts();

        if (correct && state.streak >= 3) {
            GameUtils.launchConfetti();
        }

        GameUtils.announceToScreenReader(
            correct
                ? `Correct! This claim is ${VERDICTS[claim.type].label}. +${points} points. Streak: ${state.streak}.`
                : `Incorrect. This claim is ${VERDICTS[claim.type].label}. ${claim.explanation}`
        );

        // Save progress
        saveProgress();
    }

    /* ========================================
       End Game
       ======================================== */

    function endGame() {
        state.phase = 'end';
        renderEndScreen();
        saveProgress();
    }

    /* ========================================
       Rendering — Main Orchestrator
       ======================================== */

    function renderGame() {
        const app = $('#app');
        app.innerHTML = '';
        app.appendChild(buildHeader());
        app.appendChild(buildMainArea());
        app.appendChild(buildBottomBar());
        app.appendChild(buildEvidenceBoardPanel());
        app.appendChild(buildHelpModal());

        bindEvents();
    }

    /* ========================================
       Rendering — Header
       ======================================== */

    function buildHeader() {
        const header = el('header', 'game-header');
        header.innerHTML = `
            <div class="header-left">
                <button class="gc-btn-icon board-toggle-btn" id="board-toggle" aria-label="Toggle evidence board" title="Evidence Board">
                    <span>\uD83D\uDCCB</span>
                </button>
                <div class="header-stat">
                    <span class="stat-label">Score</span>
                    <span class="stat-value" id="hdr-score">${state.score}</span>
                </div>
            </div>
            <div class="header-center">
                <div class="round-indicator">
                    <span class="round-label">Round</span>
                    <span class="round-value" id="hdr-round">${state.round + 1}</span>
                    <span class="round-sep">/</span>
                    <span class="round-total">${state.claims.length}</span>
                </div>
            </div>
            <div class="header-right">
                <div class="streak-indicator ${state.streak >= 3 ? 'streak-hot' : ''}" id="hdr-streak">
                    <span class="streak-icon">\uD83D\uDD25</span>
                    <span class="streak-value">${state.streak}</span>
                </div>
                <button class="gc-btn-icon" id="help-btn" aria-label="Help" title="How to Play">?</button>
            </div>
        `;
        return header;
    }

    function renderHeader() {
        const scoreEl = $('#hdr-score');
        const roundEl = $('#hdr-round');
        const streakEl = $('#hdr-streak');
        if (scoreEl) scoreEl.textContent = state.score;
        if (roundEl) roundEl.textContent = state.round + 1;
        if (streakEl) {
            streakEl.querySelector('.streak-value').textContent = state.streak;
            streakEl.classList.toggle('streak-hot', state.streak >= 3);
        }
    }

    /* ========================================
       Rendering — Main Area
       ======================================== */

    function buildMainArea() {
        const main = el('main', 'game-main');
        main.id = 'game-main';

        // Claim card
        const cardArea = el('div', 'claim-card-area');
        cardArea.appendChild(buildClaimCard());
        main.appendChild(cardArea);

        // Investigation results area
        const resultsArea = el('div', 'investigation-area');
        resultsArea.id = 'investigation-area';
        main.appendChild(resultsArea);

        // Red flags area (shown after stamp)
        const feedbackArea = el('div', 'feedback-area');
        feedbackArea.id = 'feedback-area';
        main.appendChild(feedbackArea);

        return main;
    }

    /* ========================================
       Rendering — Claim Card
       ======================================== */

    function buildClaimCard() {
        const claim = state.currentClaim;
        const card = el('div', `gc-card claim-card gc-deal ${state.flipped ? 'flipped' : ''}`);
        card.id = 'claim-card';
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', state.flipped ? 'Claim card, flipped' : 'Claim card face down, click to flip');
        card.setAttribute('tabindex', '0');

        const inner = el('div', 'gc-card-inner');

        // Back (face-down)
        const back = el('div', 'gc-card-back');
        back.innerHTML = `
            <div class="card-back-content">
                <span class="card-back-icon">\uD83D\uDC41\uFE0F</span>
                <span class="card-back-label">Tap to Investigate</span>
            </div>
        `;

        // Front (face-up)
        const front = el('div', 'gc-card-front');
        const diffStars = GameUtils.difficultyStars(claim.difficulty);
        front.innerHTML = `
            <div class="claim-header">
                <span class="gc-badge gc-badge-topic">${claim.topic}</span>
                ${diffStars}
            </div>
            <div class="claim-text-area">
                <div class="claim-quote-mark">\u201C</div>
                <p class="claim-text">${claim.text}</p>
            </div>
            <div class="claim-footer">
                <span class="claim-source-tag">\uD83E\uDD16 AI-Generated Content</span>
            </div>
            <div class="stamp-overlay" id="stamp-overlay"></div>
        `;

        inner.appendChild(back);
        inner.appendChild(front);
        card.appendChild(inner);

        return card;
    }

    function renderClaimCard() {
        const existing = $('#claim-card');
        if (existing) {
            existing.classList.toggle('flipped', state.flipped);
            existing.setAttribute('aria-label', state.flipped ? 'Claim card, flipped' : 'Claim card face down, click to flip');
        }
    }

    /* ========================================
       Rendering — Tool Results
       ======================================== */

    function renderToolResults() {
        const area = $('#investigation-area');
        if (!area) return;

        area.innerHTML = '';
        state.usedToolsThisRound.forEach(toolKey => {
            const def = TOOL_DEFS[toolKey];
            const result = state.currentClaim.toolResults[toolKey];
            const div = el('div', `investigation-result tool-result-${def.color}`);
            div.innerHTML = `
                <div class="result-header">
                    <span class="result-icon">${def.icon}</span>
                    <span class="result-name">${def.name}</span>
                </div>
                <p class="result-text">${result}</p>
            `;
            area.appendChild(div);
        });
    }

    /* ========================================
       Rendering — Stamp & Feedback
       ======================================== */

    function renderStamp(verdict, correct) {
        const overlay = $('#stamp-overlay');
        if (overlay) {
            const v = VERDICTS[state.currentClaim.type];
            overlay.innerHTML = `<div class="gc-stamp ${v.stampClass}">${v.label}</div>`;
        }

        // Show feedback
        const feedback = $('#feedback-area');
        if (!feedback) return;

        const claim = state.currentClaim;
        const correctVerdict = VERDICTS[claim.type];

        feedback.innerHTML = `
            <div class="feedback-card gc-slide-in ${correct ? 'feedback-correct' : 'feedback-wrong'}">
                <div class="feedback-header">
                    <span class="feedback-icon">${correct ? '\u2713' : '\u2717'}</span>
                    <span class="feedback-label">${correct ? 'Correct!' : 'Not quite.'}</span>
                    <span class="feedback-points">${correct ? '+' : ''}${correct ? calculatePoints() : '-25'} pts</span>
                </div>
                <p class="feedback-explanation">${claim.explanation}</p>
                ${claim.redFlags.length > 0 ? `
                    <div class="feedback-flags">
                        <strong>Red Flags:</strong>
                        <ul>${claim.redFlags.map(f => `<li>${f}</li>`).join('')}</ul>
                    </div>
                ` : ''}
                <div class="feedback-frameworks">
                    ${claim.frameworks.map(f => `<span class="gc-badge ${getBadgeClass(f)}">${f}</span>`).join('')}
                </div>
                ${claim.realWorldExample ? `
                    <div class="feedback-example">
                        <strong>Real-world example:</strong> ${claim.realWorldExample}
                    </div>
                ` : ''}
            </div>
        `;

        // Enable next button
        const nextBtn = $('#next-btn');
        if (nextBtn) nextBtn.disabled = false;

        // Disable verdict buttons
        $$('.verdict-btn').forEach(btn => btn.disabled = true);
        $$('.tool-card').forEach(btn => btn.disabled = true);
    }

    function calculatePoints() {
        let points = 100;
        const toolsUsed = state.usedToolsThisRound.length;
        if (toolsUsed === 0) points += 50;
        else if (toolsUsed === 1) points += 30;
        else if (toolsUsed === 2) points += 15;
        if (state.streak >= 3) points += 25 * (state.streak - 2);
        return points;
    }

    /* ========================================
       Rendering — Tool Hand (Bottom Bar)
       ======================================== */

    function buildBottomBar() {
        const bar = el('div', 'gc-bottom-bar game-bottom');
        bar.id = 'game-bottom';

        // Tool hand
        const hand = el('div', 'tool-hand');
        hand.id = 'tool-hand';

        Object.entries(TOOL_DEFS).forEach(([key, def]) => {
            const count = state.tools[key];
            const used = state.usedToolsThisRound.includes(key);
            const depleted = count <= 0;

            const card = el('button', `tool-card tool-${def.color} ${depleted ? 'depleted' : ''} ${used ? 'used' : ''}`);
            card.dataset.tool = key;
            card.disabled = depleted || state.stamped;
            card.setAttribute('aria-label', `${def.name}: ${count} remaining`);
            card.setAttribute('title', `${def.name} (${count} left)`);
            card.innerHTML = `
                <span class="tool-card-icon">${def.icon}</span>
                <span class="tool-card-name">${def.name}</span>
                <span class="tool-card-count gc-token gc-token-sm gc-token-${def.color}">${count}</span>
            `;
            hand.appendChild(card);
        });

        bar.appendChild(hand);

        // Verdict area
        const verdictArea = el('div', 'verdict-area');
        verdictArea.id = 'verdict-area';

        const verdictEntries = [
            { key: 'trust',         label: 'Verified',      shortcut: '1' },
            { key: 'hallucination', label: 'Hallucinated',  shortcut: '2' },
            { key: 'unverifiable',  label: 'Unverifiable',  shortcut: '3' }
        ];

        verdictEntries.forEach(v => {
            const btn = el('button', `verdict-btn gc-btn ${VERDICTS[v.key].cssClass}`);
            btn.dataset.verdict = v.key;
            btn.disabled = !state.flipped || state.stamped;
            btn.setAttribute('aria-label', `Stamp as ${v.label} (${v.shortcut})`);
            btn.innerHTML = `<span class="verdict-label">${v.label}</span><span class="verdict-shortcut">${v.shortcut}</span>`;
            verdictArea.appendChild(btn);
        });

        bar.appendChild(verdictArea);

        // Next button
        const nextBtn = el('button', 'gc-btn gc-btn-primary next-btn');
        nextBtn.id = 'next-btn';
        nextBtn.disabled = !state.stamped;
        nextBtn.innerHTML = `Next <span class="btn-arrow">\u2192</span>`;
        bar.appendChild(nextBtn);

        return bar;
    }

    function renderToolHand() {
        $$('.tool-card').forEach(card => {
            const key = card.dataset.tool;
            const count = state.tools[key];
            const used = state.usedToolsThisRound.includes(key);
            const depleted = count <= 0;

            card.classList.toggle('depleted', depleted);
            card.classList.toggle('used', used);
            card.disabled = depleted || state.stamped || used;

            const countEl = card.querySelector('.tool-card-count');
            if (countEl) countEl.textContent = count;
        });
    }

    /* ========================================
       Rendering — Evidence Board Panel
       ======================================== */

    function buildEvidenceBoardPanel() {
        const panel = el('div', 'evidence-panel hidden');
        panel.id = 'evidence-panel';

        panel.innerHTML = `
            <div class="evidence-panel-inner">
                <div class="evidence-header">
                    <h2>Evidence Board</h2>
                    <button class="gc-btn-icon evidence-close" id="evidence-close" aria-label="Close evidence board">&times;</button>
                </div>
                <div class="evidence-counts" id="evidence-counts">
                    <div class="evidence-count count-trust">
                        <span class="count-icon">\u2713</span>
                        <span class="count-label">Verified</span>
                        <span class="count-num" id="count-trust">0</span>
                    </div>
                    <div class="evidence-count count-hallucination">
                        <span class="count-icon">\u26A0</span>
                        <span class="count-label">Hallucinated</span>
                        <span class="count-num" id="count-hallucination">0</span>
                    </div>
                    <div class="evidence-count count-unverifiable">
                        <span class="count-icon">?</span>
                        <span class="count-label">Unverifiable</span>
                        <span class="count-num" id="count-unverifiable">0</span>
                    </div>
                </div>
                <div class="evidence-grid" id="evidence-grid"></div>
            </div>
        `;

        return panel;
    }

    function renderEvidenceBoardCounts() {
        const counts = { trust: 0, hallucination: 0, unverifiable: 0 };
        state.evidenceBoard.forEach(e => {
            const claim = getClaimById(e.claimId);
            if (claim) counts[claim.type]++;
        });

        ['trust', 'hallucination', 'unverifiable'].forEach(t => {
            const el = $(`#count-${t}`);
            if (el) el.textContent = counts[t];
        });

        renderEvidenceBoardGrid();
    }

    function renderEvidenceBoardGrid() {
        const grid = $('#evidence-grid');
        if (!grid) return;

        grid.innerHTML = '';
        state.evidenceBoard.forEach(entry => {
            const claim = getClaimById(entry.claimId);
            if (!claim) return;

            const mini = el('div', `evidence-mini-card ${entry.correct ? 'mini-correct' : 'mini-wrong'}`);
            mini.innerHTML = `
                <span class="mini-topic">${claim.topic}</span>
                <span class="mini-verdict ${VERDICTS[entry.verdict].cssClass}">${VERDICTS[entry.verdict].label}</span>
                <span class="mini-result">${entry.correct ? '\u2713' : '\u2717'}</span>
            `;
            grid.appendChild(mini);
        });
    }

    /* ========================================
       Rendering — Help Modal
       ======================================== */

    function buildHelpModal() {
        const backdrop = el('div', 'gc-modal-backdrop hidden');
        backdrop.id = 'help-modal';

        backdrop.innerHTML = `
            <div class="gc-modal">
                <button class="gc-modal-close" id="help-close" aria-label="Close help">&times;</button>
                <h2>How to Play</h2>
                <div class="help-sections">
                    <div class="help-section">
                        <h3>Objective</h3>
                        <p>You are an AI fact-checker. Investigate AI-generated claims using your tool cards, then stamp your verdict: <strong>Verified</strong>, <strong>Hallucinated</strong>, or <strong>Unverifiable</strong>.</p>
                    </div>
                    <div class="help-section">
                        <h3>Investigation Tools</h3>
                        <ul>
                            <li><strong>\uD83D\uDCDA Citation Check</strong> - Verify if cited studies and papers exist</li>
                            <li><strong>\uD83D\uDD0E Fact Cross-Reference</strong> - Check specific facts against known data</li>
                            <li><strong>\uD83D\uDD17 Source Verification</strong> - Verify if named people and institutions are real</li>
                            <li><strong>\uD83E\uDDE0 Logic Analysis</strong> - Check for internal contradictions</li>
                            <li><strong>\uD83C\uDF93 Expert Consultation</strong> - Get a domain expert perspective</li>
                        </ul>
                    </div>
                    <div class="help-section">
                        <h3>Scoring</h3>
                        <ul>
                            <li><strong>+100</strong> for correct verdict</li>
                            <li><strong>+50 bonus</strong> for using zero tools (expert instinct!)</li>
                            <li><strong>+30/+15 bonus</strong> for using 1 or 2 tools</li>
                            <li><strong>Streak bonuses</strong> for 3+ correct in a row</li>
                            <li><strong>-25</strong> for incorrect verdict</li>
                        </ul>
                    </div>
                    <div class="help-section">
                        <h3>Keyboard Shortcuts</h3>
                        <ul>
                            <li><strong>Space/Enter</strong> - Flip card / Next round</li>
                            <li><strong>1</strong> - Stamp Verified</li>
                            <li><strong>2</strong> - Stamp Hallucinated</li>
                            <li><strong>3</strong> - Stamp Unverifiable</li>
                            <li><strong>Q/W/E/R/T</strong> - Play tool cards</li>
                            <li><strong>B</strong> - Toggle evidence board</li>
                            <li><strong>?</strong> - Toggle help</li>
                        </ul>
                    </div>
                    <div class="help-section">
                        <h3>Red Flags to Watch For</h3>
                        <ul>
                            <li>Specific statistics without verifiable sources</li>
                            <li>Named researchers or studies you cannot find</li>
                            <li>Confident statements about uncertain topics</li>
                            <li>Common myths presented as facts</li>
                            <li>Partially correct information with subtle errors</li>
                            <li>Extraordinary claims with no media coverage</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;

        return backdrop;
    }

    /* ========================================
       Rendering — Start Screen
       ======================================== */

    function renderStartScreen() {
        const app = $('#app');
        const saved = GameUtils.GameStorage.load(STORAGE_KEY);

        app.innerHTML = `
            <div class="start-screen">
                <div class="start-logo">\uD83D\uDC41\uFE0F</div>
                <h1 class="start-title">Hallucination <span class="accent">Hunt</span></h1>
                <p class="start-tagline">Evidence Board Investigation</p>
                <p class="start-desc">AI generates convincing but false information. Use your investigation tools to separate fact from fiction. Can you spot the hallucinations?</p>
                <div class="start-stats">
                    <div class="start-stat">
                        <span class="start-stat-num">${TOTAL_ROUNDS}</span>
                        <span class="start-stat-label">Claims</span>
                    </div>
                    <div class="start-stat">
                        <span class="start-stat-num">12</span>
                        <span class="start-stat-label">Tool Cards</span>
                    </div>
                    <div class="start-stat">
                        <span class="start-stat-num">3</span>
                        <span class="start-stat-label">Verdicts</span>
                    </div>
                </div>
                <button class="gc-btn gc-btn-primary start-btn" id="start-btn">Begin Investigation</button>
                ${saved ? '<button class="gc-btn gc-btn-secondary start-btn-resume" id="resume-btn">Resume Previous Game</button>' : ''}
            </div>
        `;

        $('#start-btn').addEventListener('click', () => initGame());
        const resumeBtn = $('#resume-btn');
        if (resumeBtn) {
            resumeBtn.addEventListener('click', () => {
                loadProgress();
                if (state.phase === 'playing') {
                    renderGame();
                } else {
                    initGame();
                }
            });
        }
    }

    /* ========================================
       Rendering — End Screen
       ======================================== */

    function renderEndScreen() {
        const total = state.evidenceBoard.length;
        const correct = state.evidenceBoard.filter(e => e.correct).length;
        const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
        const tier = CERT_TIERS.find(t => accuracy >= t.min);

        // Skill breakdown
        const skills = {};
        Object.keys(state.results).forEach(type => {
            const r = state.results[type];
            skills[type] = r.total > 0 ? Math.round((r.correct / r.total) * 100) : 0;
        });

        // Tool efficiency
        const totalTools = Object.values(state.toolUsage).reduce((a, b) => a + b, 0);

        const app = $('#app');
        app.innerHTML = `
            <div class="end-screen">
                <div class="certificate ${tier.className}">
                    <div class="cert-header">
                        <span class="cert-icon">${tier.icon}</span>
                        <h2 class="cert-title">${tier.name} Fact-Checker</h2>
                    </div>
                    <div class="cert-score">
                        <span class="cert-score-num">${state.score}</span>
                        <span class="cert-score-label">Points</span>
                    </div>
                    <div class="cert-accuracy">
                        <span class="cert-accuracy-num">${accuracy}%</span>
                        <span class="cert-accuracy-label">Accuracy (${correct}/${total})</span>
                    </div>
                    <div class="cert-streak">
                        <span>Best Streak: ${state.bestStreak}</span>
                    </div>
                </div>

                <div class="skill-breakdown">
                    <h3>Verification Skills</h3>
                    <div class="skill-bars">
                        <div class="skill-row">
                            <span class="skill-name">Spotting Hallucinations</span>
                            <div class="skill-bar-track">
                                <div class="skill-bar-fill bar-hallucination" style="width: ${skills.hallucination}%"></div>
                            </div>
                            <span class="skill-pct">${skills.hallucination}%</span>
                        </div>
                        <div class="skill-row">
                            <span class="skill-name">Confirming Truths</span>
                            <div class="skill-bar-track">
                                <div class="skill-bar-fill bar-trust" style="width: ${skills.trust}%"></div>
                            </div>
                            <span class="skill-pct">${skills.trust}%</span>
                        </div>
                        <div class="skill-row">
                            <span class="skill-name">Recognizing Uncertainty</span>
                            <div class="skill-bar-track">
                                <div class="skill-bar-fill bar-unverifiable" style="width: ${skills.unverifiable}%"></div>
                            </div>
                            <span class="skill-pct">${skills.unverifiable}%</span>
                        </div>
                    </div>
                </div>

                <div class="tool-efficiency">
                    <h3>Tool Usage</h3>
                    <div class="tool-stats">
                        ${Object.entries(state.toolUsage).map(([key, count]) => `
                            <div class="tool-stat">
                                <span class="tool-stat-icon">${TOOL_DEFS[key].icon}</span>
                                <span class="tool-stat-name">${TOOL_DEFS[key].name}</span>
                                <span class="tool-stat-count">${count}</span>
                            </div>
                        `).join('')}
                    </div>
                    <p class="tool-total">Total tools used: ${totalTools} across ${total} claims</p>
                </div>

                <div class="end-evidence-summary">
                    <h3>Evidence Board Summary</h3>
                    <div class="evidence-summary-grid">
                        ${state.evidenceBoard.map(entry => {
                            const claim = getClaimById(entry.claimId);
                            return `
                                <div class="summary-card ${entry.correct ? 'summary-correct' : 'summary-wrong'}">
                                    <span class="summary-topic">${claim.topic}</span>
                                    <span class="summary-result">${entry.correct ? '\u2713' : '\u2717'}</span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>

                <div class="end-actions">
                    <button class="gc-btn gc-btn-primary" id="play-again-btn">Play Again</button>
                    <a href="../" class="gc-btn gc-btn-secondary">All Games</a>
                </div>
            </div>
        `;

        $('#play-again-btn').addEventListener('click', () => {
            GameUtils.GameStorage.clear(STORAGE_KEY);
            initGame();
        });

        GameUtils.launchConfetti();
        GameUtils.announceToScreenReader(`Game complete! You scored ${state.score} points with ${accuracy}% accuracy. ${tier.name} tier.`);
    }

    /* ========================================
       Event Binding
       ======================================== */

    function bindEvents() {
        // Card flip
        const card = $('#claim-card');
        if (card) {
            card.addEventListener('click', handleCardFlip);
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardFlip();
                }
            });
        }

        // Tool cards
        $$('.tool-card').forEach(tc => {
            tc.addEventListener('click', () => playTool(tc.dataset.tool));
        });

        // Verdict buttons
        $$('.verdict-btn').forEach(btn => {
            btn.addEventListener('click', () => stampVerdict(btn.dataset.verdict));
        });

        // Next button
        const nextBtn = $('#next-btn');
        if (nextBtn) {
            nextBtn.addEventListener('click', handleNext);
        }

        // Evidence board toggle
        const boardToggle = $('#board-toggle');
        if (boardToggle) {
            boardToggle.addEventListener('click', toggleEvidenceBoard);
        }

        const boardClose = $('#evidence-close');
        if (boardClose) {
            boardClose.addEventListener('click', toggleEvidenceBoard);
        }

        // Help modal
        const helpBtn = $('#help-btn');
        if (helpBtn) {
            helpBtn.addEventListener('click', toggleHelp);
        }

        const helpClose = $('#help-close');
        if (helpClose) {
            helpClose.addEventListener('click', toggleHelp);
        }

        const helpModal = $('#help-modal');
        if (helpModal) {
            helpModal.addEventListener('click', (e) => {
                if (e.target === helpModal) toggleHelp();
            });
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', handleKeyboard);
    }

    function handleCardFlip() {
        if (state.stamped) return;
        if (!state.flipped) {
            state.flipped = true;
            renderClaimCard();

            // Enable verdict buttons
            $$('.verdict-btn').forEach(btn => btn.disabled = false);

            GameUtils.announceToScreenReader(`Claim revealed: ${state.currentClaim.text}`);
        }
    }

    function handleNext() {
        if (!state.stamped) return;
        state.round++;
        dealNextClaim();
    }

    function toggleEvidenceBoard() {
        const panel = $('#evidence-panel');
        if (panel) {
            panel.classList.toggle('hidden');
            renderEvidenceBoardCounts();
        }
    }

    function toggleHelp() {
        const modal = $('#help-modal');
        if (modal) modal.classList.toggle('hidden');
    }

    function handleKeyboard(e) {
        // Ignore when typing in inputs
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        if (state.phase !== 'playing') return;

        switch (e.key) {
            case ' ':
            case 'Enter':
                e.preventDefault();
                if (!state.flipped) handleCardFlip();
                else if (state.stamped) handleNext();
                break;
            case '1':
                if (state.flipped && !state.stamped) stampVerdict('trust');
                break;
            case '2':
                if (state.flipped && !state.stamped) stampVerdict('hallucination');
                break;
            case '3':
                if (state.flipped && !state.stamped) stampVerdict('unverifiable');
                break;
            case 'q':
            case 'Q':
                playTool('citations');
                break;
            case 'w':
            case 'W':
                playTool('facts');
                break;
            case 'e':
            case 'E':
                playTool('sources');
                break;
            case 'r':
            case 'R':
                playTool('logic');
                break;
            case 't':
            case 'T':
                playTool('expert');
                break;
            case 'b':
            case 'B':
                toggleEvidenceBoard();
                break;
            case '?':
            case '/':
                toggleHelp();
                break;
            case 'Escape':
                // Close any open panel
                const panel = $('#evidence-panel');
                if (panel && !panel.classList.contains('hidden')) {
                    panel.classList.add('hidden');
                }
                const helpMod = $('#help-modal');
                if (helpMod && !helpMod.classList.contains('hidden')) {
                    helpMod.classList.add('hidden');
                }
                break;
        }
    }

    /* ========================================
       Toast Notifications
       ======================================== */

    function showToast(message, type) {
        // Remove existing toast
        const existing = $('.game-toast');
        if (existing) existing.remove();

        const toast = el('div', `game-toast toast-${type || 'info'}`);
        toast.textContent = message;
        document.body.appendChild(toast);

        // Auto-remove after animation
        setTimeout(() => toast.classList.add('toast-show'), 10);
        setTimeout(() => {
            toast.classList.remove('toast-show');
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }

    /* ========================================
       Persistence
       ======================================== */

    function saveProgress() {
        GameUtils.GameStorage.save(STORAGE_KEY, {
            phase: state.phase,
            round: state.round,
            score: state.score,
            streak: state.streak,
            bestStreak: state.bestStreak,
            tools: state.tools,
            claims: state.claims,
            evidenceBoard: state.evidenceBoard,
            difficulty: state.difficulty,
            results: state.results,
            toolUsage: state.toolUsage
        });
    }

    function loadProgress() {
        const saved = GameUtils.GameStorage.load(STORAGE_KEY);
        if (!saved) return;

        state.phase = saved.phase || 'start';
        state.round = saved.round || 0;
        state.score = saved.score || 0;
        state.streak = saved.streak || 0;
        state.bestStreak = saved.bestStreak || 0;
        state.tools = saved.tools || { ...INITIAL_TOOLS };
        state.claims = saved.claims || [];
        state.evidenceBoard = saved.evidenceBoard || [];
        state.difficulty = saved.difficulty || 1;
        state.results = saved.results || { trust: { correct: 0, total: 0 }, hallucination: { correct: 0, total: 0 }, unverifiable: { correct: 0, total: 0 } };
        state.toolUsage = saved.toolUsage || { citations: 0, facts: 0, sources: 0, logic: 0, expert: 0 };

        // Restore current claim
        if (state.claims[state.round]) {
            state.currentClaim = getClaimById(state.claims[state.round]);
        }
        state.flipped = false;
        state.stamped = false;
        state.usedToolsThisRound = [];
    }

    /* ========================================
       Utility Helpers
       ======================================== */

    function el(tag, className) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        return element;
    }

    function getBadgeClass(framework) {
        const lower = framework.toLowerCase();
        if (lower.includes('unesco')) return 'gc-badge-unesco';
        if (lower.includes('oecd')) return 'gc-badge-oecd';
        if (lower.includes('nist')) return 'gc-badge-nist';
        if (lower.includes('eu')) return 'gc-badge-eu';
        if (lower.includes('coe')) return 'gc-badge-coe';
        return 'gc-badge-oecd';
    }

    /* ========================================
       Boot
       ======================================== */

    document.addEventListener('DOMContentLoaded', () => {
        renderStartScreen();
    });

})();
