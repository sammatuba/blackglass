/**
 * Game Utilities — Shared across all games
 * Exposed on window.GameUtils (no build step, vanilla JS)
 */

(function () {
    'use strict';

    /* ----------------------------------------
       Array Utilities
       ---------------------------------------- */

    /**
     * Fisher-Yates shuffle. Returns a new array.
     */
    function shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    /* ----------------------------------------
       GameStorage — localStorage with namespacing
       ---------------------------------------- */

    const GameStorage = {
        _prefix: 'cgAI_',

        save(key, data) {
            try {
                localStorage.setItem(this._prefix + key, JSON.stringify(data));
            } catch (e) { /* quota exceeded — fail silently */ }
        },

        load(key) {
            try {
                const raw = localStorage.getItem(this._prefix + key);
                return raw ? JSON.parse(raw) : null;
            } catch (e) { return null; }
        },

        clear(key) {
            localStorage.removeItem(this._prefix + key);
        },

        clearAll() {
            Object.keys(localStorage)
                .filter(k => k.startsWith(this._prefix))
                .forEach(k => localStorage.removeItem(k));
        }
    };

    /* ----------------------------------------
       Confetti
       ---------------------------------------- */

    function launchConfetti(canvasOrSelector) {
        const canvas = typeof canvasOrSelector === 'string'
            ? document.querySelector(canvasOrSelector)
            : canvasOrSelector;

        if (!canvas) {
            // Auto-create a canvas if none provided
            const c = document.createElement('canvas');
            c.className = 'gc-confetti';
            document.body.appendChild(c);
            return launchConfetti(c);
        }

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const colors = ['#DC2626', '#F59E0B', '#16A34A', '#2563EB', '#7C3AED', '#EC4899'];
        const particles = [];

        for (let i = 0; i < 120; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: -20 - Math.random() * 40,
                vx: (Math.random() - 0.5) * 5,
                vy: Math.random() * 3 + 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 8 + 4,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 12,
                gravity: 0.05
            });
        }

        let frame = 0;

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.x += p.vx;
                p.vy += p.gravity;
                p.y += p.vy;
                p.rotation += p.rotationSpeed;

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                ctx.restore();
            });

            frame++;
            if (frame < 200) {
                requestAnimationFrame(animate);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                // Remove auto-created canvas
                if (canvas.classList.contains('gc-confetti')) {
                    canvas.remove();
                }
            }
        }

        animate();
    }

    /* ----------------------------------------
       Card Animations
       ---------------------------------------- */

    /**
     * Trigger deal animation on children of a container.
     * Adds 'gc-deal' class with staggered delays.
     */
    function dealCards(containerOrSelector) {
        const container = typeof containerOrSelector === 'string'
            ? document.querySelector(containerOrSelector)
            : containerOrSelector;
        if (!container) return;

        const cards = container.children;
        Array.from(cards).forEach((card, i) => {
            card.classList.remove('gc-deal');
            // Force reflow
            void card.offsetWidth;
            card.style.animationDelay = `${i * 80}ms`;
            card.classList.add('gc-deal');
        });
    }

    /**
     * Flip a card element (toggle .flipped class).
     */
    function flipCard(cardOrSelector) {
        const card = typeof cardOrSelector === 'string'
            ? document.querySelector(cardOrSelector)
            : cardOrSelector;
        if (!card) return;
        card.classList.toggle('flipped');
    }

    /* ----------------------------------------
       Accessibility
       ---------------------------------------- */

    let _srRegion = null;

    /**
     * Announce a message to screen readers via a live region.
     */
    function announceToScreenReader(message) {
        if (!_srRegion) {
            _srRegion = document.createElement('div');
            _srRegion.setAttribute('role', 'status');
            _srRegion.setAttribute('aria-live', 'polite');
            _srRegion.className = 'gc-sr-only';
            document.body.appendChild(_srRegion);
        }
        _srRegion.textContent = '';
        // Small delay so screen readers notice the change
        setTimeout(() => { _srRegion.textContent = message; }, 50);
    }

    /* ----------------------------------------
       Difficulty Stars HTML
       ---------------------------------------- */

    function difficultyStars(level, max) {
        max = max || 3;
        let html = '<span class="gc-stars" aria-label="Difficulty ' + level + ' of ' + max + '">';
        for (let i = 0; i < max; i++) {
            html += i < level
                ? '<span class="filled" aria-hidden="true">★</span>'
                : '<span class="empty" aria-hidden="true">★</span>';
        }
        html += '</span>';
        return html;
    }

    /* ----------------------------------------
       Expose on window
       ---------------------------------------- */

    window.GameUtils = {
        shuffleArray,
        GameStorage,
        launchConfetti,
        dealCards,
        flipCard,
        announceToScreenReader,
        difficultyStars
    };

})();
