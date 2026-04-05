# Tech Stack Recommendation: Bias Bounty Lite

**Date:** 2026-02-05  
**Decision:** Use **Vanilla HTML/CSS/JS** or **React** (see recommendation below)  
**Not recommended:** Godot (explained below)

---

## The Question

> "Is Godot the best and simple enough?"

**Short answer:** Godot is excellent for games, but it's **overkill** for Bias Bounty Lite. A web-based approach is simpler, faster to develop, and more accessible.

---

## Honest Assessment: Godot

### Godot Strengths
- ✅ Built specifically for games
- ✅ Excellent 2D/3D animation system
- ✅ Card physics (drag, drop, flip)
- ✅ Particle effects, shaders
- ✅ Export to desktop, mobile, web

### Godot Weaknesses for THIS Project
- ❌ **Overkill for card UI** - Bias Bounty is information display, not physics simulation
- ❌ **GDScript learning curve** - New language for most developers
- ❌ **Web export limitations** - Web version has performance/size constraints
- ❌ **Build complexity** - Export process vs. just opening HTML file
- ❌ **Sharing friction** - Users must download/install vs. open URL
- ❌ **Iterating speed** - Compile + export vs. save + refresh

### When to Use Godot
Use Godot if your game needs:
- Real-time physics (physics puzzles, platformers)
- Complex animations (skeletal, state machines)
- Particle systems (explosions, magic effects)
- Precise collision detection
- 3D elements

**Bias Bounty Lite needs:** Card display, text content, click navigation, simple transitions

**Verdict:** Godot is like using a sports car to go grocery shopping. It works, but it's unnecessary complexity.

---

## Recommendation: Web-Based Approach

### Option A: Vanilla HTML/CSS/JS (Recommended for Speed)

**Best if:** You want fastest prototype, no build tools, easiest sharing

**Pros:**
- ✅ Zero setup (just create files)
- ✅ Instant iteration (save → refresh)
- ✅ Universal access (any device with browser)
- ✅ Easy sharing (GitHub Pages, Netlify, etc.)
- ✅ No dependencies to manage
- ✅ Offline capable (Service Worker)

**Cons:**
- ❌ Manual state management
- ❌ No component reuse (copy/paste HTML)
- ❌ Basic animations (CSS only)

**Time to playable:** 2-4 hours

**Folder structure:**
```
bias-bounty-lite/
├── web-vanilla/
│   ├── index.html      # Single page, sections for phases
│   ├── styles.css      # Card styling, animations
│   └── app.js          # State, navigation, scoring
```

---

### Option B: React (Recommended for Polish)

**Best if:** You want component architecture, richer interactions, PWA features

**Pros:**
- ✅ Component-based (Card, SystemCard, ProblemCard)
- ✅ State management built-in
- ✅ Rich ecosystem (animation libraries, etc.)
- ✅ PWA capable (installable, offline-first)
- ✅ TypeScript support (catch errors early)
- ✅ Better for team development

**Cons:**
- ❌ Build step required
- ❌ Node.js dependency
- ❌ Larger initial setup

**Time to playable:** 4-8 hours (more setup, faster later)

**Folder structure:**
```
bias-bounty-lite/
├── react-pwa/
│   ├── public/
│   ├── src/
│   │   ├── components/     # Card components
│   │   ├── data/          # Card content
│   │   ├── hooks/         # Game state
│   │   └── App.jsx
│   └── package.json
```

---

## Direct Comparison

| Factor | Vanilla | React | Godot |
|--------|---------|-------|-------|
| **Setup time** | 0 min | 10 min | 30 min |
| **Learning curve** | Low | Medium | High (GDScript) |
| **Iteration speed** | Instant | Fast (hot reload) | Slow (compile + export) |
| **Card animations** | CSS only | CSS + libraries | Excellent (built-in) |
| **State management** | Manual | React hooks | GDScript |
| **Sharing** | URL | URL | Download/Install |
| **Mobile support** | Responsive | Responsive/PWA | Native export |
| **Offline capable** | Yes (Service Worker) | Yes (PWA) | Yes (native) |
| **Code complexity** | Low | Medium | Medium |
| **Future maintenance** | Medium | Easy | Medium |

---

## My Recommendation

### Start with: Vanilla HTML/CSS/JS

**Rationale:**
1. **Fastest path to playable** - You can have a working demo in hours
2. **No barriers** - No build tools, no dependencies, no learning curve
3. **Good enough** - Bias Bounty is information-heavy, not animation-heavy
4. **Easy to share** - Send a link, get feedback immediately
5. **Can upgrade later** - If you need React features, porting is straightforward

### Upgrade to React if:
- You want to add complex animations
- You're building multiple game demos (reusable components)
- You want PWA features (installable, push notifications)
- Team development (component separation)

### Use Godot only if:
- You decide to add physics-based card interactions
- You want 3D elements
- You're targeting console/mobile stores primarily

---

## Implementation Approach

### Phase 1: Vanilla (Now)
```bash
cd demos/bias-bounty-lite/
mkdir web-vanilla
cd web-vanilla

# Create three files:
# - index.html (structure)
# - styles.css (design system)
# - app.js (logic)
```

**Focus:** Get one complete system working end-to-end

### Phase 2: React (Optional Future)
If vanilla feels limiting:
```bash
cd demos/bias-bounty-lite/
npm create vite@latest react-pwa -- --template react
# Port content from vanilla version
```

### Phase 3: Godot (Unlikely Needed)
Only if web versions hit limitations not anticipated.

---

## Quick Start: Vanilla Version

**Step 1: Create folder**
```bash
cd demos/bias-bounty-lite/
mkdir web-vanilla
cd web-vanilla
```

**Step 2: Create index.html**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bias Bounty Lite</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="game">
        <!-- Game renders here -->
    </div>
    <script src="app.js"></script>
</body>
</html>
```

**Step 3: Create styles.css**
Copy color palette and card dimensions from `../../shared/design-system.md`

**Step 4: Create app.js**
Implement game state and phase transitions

**Step 5: Test**
Open `index.html` in browser

---

## Counter-Arguments Addressed

### "But Godot is made for games!"
True, but Bias Bounty Lite is primarily **information display** with light interaction. It's closer to a interactive slideshow than a physics-based game. Web tech handles this perfectly.

### "But I want to learn Godot!"
Great reason to use Godot for a future project! For this specific deliverable, prioritize speed and simplicity.

### "But web games aren't 'real' games!"
Tell that to Wordle, 2048, or any number of successful web-based games. The platform doesn't determine game quality.

### "What about mobile?"
Vanilla/React with responsive design work great on mobile. PWA features make them installable. Godot mobile export requires more setup.

---

## Final Verdict

| Scenario | Recommendation |
|----------|----------------|
| **Fastest demo** | Vanilla HTML/CSS/JS |
| **Most polished** | React PWA |
| **Learning experience** | Your choice (all teach different skills) |
| **Production app** | React PWA |
| **Just for fun** | Whatever interests you |

**For this project (Bias Bounty Lite):**

👉 **Use Vanilla HTML/CSS/JS** in `demos/bias-bounty-lite/web-vanilla/`

It's the right tool for the job: simple, fast, accessible, and completely sufficient for the game's requirements.

---

**Decision made:** Start with vanilla web. Can upgrade to React if needed. Godot reserved for future game projects with different requirements.
