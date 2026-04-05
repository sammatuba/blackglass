# Project Context: Bias Bounty (Full Version)

**Created:** 2026-02-05  
**Updated:** 2026-02-06 (v1.1.0 - Full Version)  
**Status:** ✅ Production Ready

---

## TL;DR - Start Here

**Bias Bounty** is now a **Full-Featured AI Ethics Education Game** built with vanilla HTML/CSS/JS.

**What it is:** Collaborative investigation game about AI bias patterns  
**Core mechanic:** Match problems to 3 pattern types + framework alignment  
**New in v1.1:** 
- 📚 UNESCO/OECD/NIST/EU framework alignment
- 🌍 Real-world impact visualization  
- 📝 Concept mastery assessment (quizzes)
- 🎚️ Adaptive difficulty (Beginner/Standard/Expert)
- 💾 Progress persistence

**Tech:** Vanilla HTML/CSS/JS (simplest, fastest, no dependencies)

---

## Quick Start

```bash
# Open the game
cd demos/bias-bounty-lite/web-vanilla
open index.html  # or double-click in file manager

# That's it! No build step, no dependencies.
```

---

## What's New in v1.1 (Full Version)

### From Lite to Full

| Feature | v1.0 (Lite) | v1.1 (Full) |
|---------|-------------|-------------|
| Framework Alignment | ❌ None | ✅ UNESCO/OECD/NIST/EU |
| Impact Visualization | ❌ None | ✅ Statistics + Case Studies |
| Assessment | ❌ None | ✅ Pre/Post Quizzes + Mastery |
| Difficulty Levels | ❌ 1 mode | ✅ 3 modes (Beginner/Standard/Expert) |
| Real-World Examples | ❌ None | ✅ 24 documented cases |
| Progress Saving | ✅ Basic | ✅ Enhanced + Statistics |

### Score Improvement
- **Overall:** 6.5/10 → 7.8/10 (+1.3)
- **Foundation Alignment:** 5.5/10 → 7.0/10
- **Pedagogical Design:** 6/10 → 7.5/10
- **Game Mechanics:** 7/10 → 7.8/10

---

## The Game (In 60 Seconds)

Players investigate 8 real AI systems together. Each round:

1. **Reveal System** - "Hiring Helper AI sorts job applications"
2. **Reveal Problems** - 3 specific issues with documented real-world cases
3. **Observe** - Study silently with timed observation
4. **Discuss & Vote** - Which pattern fits each problem?
5. **Commit** - Confirm selections
6. **Reflect** - Learn patterns, frameworks, and real-world impacts

**Framework Badges:** Each problem shows UNESCO/OECD/NIST/EU alignment

**Impact Visualization:** Statistics and real case studies for each issue

**Mastery Tracking:** Quiz system tracks learning per pattern type

---

## The Three Patterns

| Pattern | Icon | Description | Real-World Impact |
|---------|------|-------------|-------------------|
| 📚 **Bad Start** | Red | AI learned from biased history | Perpetuates historical discrimination |
| 📏 **Wrong Measuring** | Yellow | AI measures success poorly | Optimizes wrong metrics, harms users |
| 🎭 **Sneaky Shortcuts** | Green | AI finds hidden discrimination | Uses proxies to discriminate indirectly |

---

## Technical Implementation

### What's Included

```
bias-bounty-lite/
└── web-vanilla/
    ├── index.html      # Game structure
    ├── styles.css      # Design system (~40KB)
    ├── app.js          # Game logic + data (~88KB)
    ├── README.md       # User documentation
    └── [evaluation files]
        ├── EVALUATION_REPORT.md
        ├── IMPROVEMENT_TRACKING.md
        └── IMPLEMENTATION_SUMMARY_v1.1.md
```

### Key Features (v1.1)

1. **Framework Alignment Data**
   - Each of 24 problems includes framework mappings
   - Visual badges for UNESCO, OECD, NIST, EU
   - Coverage statistics on game completion

2. **Impact Data Structure**
   ```javascript
   impact: {
       description: 'What happens to people',
       statistics: 'Numbers affected',
       realWorld: 'Documented case study'
   }
   ```

3. **Quiz System**
   - 8 assessment questions
   - Pre/post game options
   - Detailed explanations
   - Mastery tracking per pattern

4. **Difficulty Configuration**
   ```javascript
   difficulties: {
       beginner: { timer: 90, hints: true, multiplier: 1 },
       standard: { timer: 60, hints: true, multiplier: 1.5 },
       expert: { timer: 45, hints: false, multiplier: 2 }
   }
   ```

5. **Enhanced State Management**
   - Concept mastery tracking
   - Frameworks encountered
   - Impacts revealed
   - Hint usage tracking
   - Difficulty persistence

---

## Systems & Problems

### 8 AI Systems (All Real-World Based)

1. 💼 **Hiring Helper** - Amazon recruiting case
2. 🏦 **Loan Approver** - Apple Card lending case  
3. 🏥 **Health Predictor** - Optum healthcare case
4. 🎓 **School Sorter** - UK A-levels case
5. 👮 **Crime Forecaster** - PredPol policing case
6. 🚗 **Insurance Rater** - Auto insurance discrimination
7. 📱 **Content Recommender** - Facebook mental health research
8. 🎤 **Voice Recognizer** - Speech recognition accent bias

### 24 Problems Total
- 3 problems per system
- All with framework alignment
- All with real-world impact data
- Mix of Bad Start (8), Wrong Measuring (8), Sneaky Shortcuts (8)

---

## Educational Value

### Learning Outcomes

After playing, learners can:

1. **Identify** three major AI bias patterns
2. **Analyze** real AI systems for fairness issues
3. **Connect** technical problems to human impacts
4. **Reference** UNESCO, OECD, NIST, EU frameworks
5. **Evaluate** AI using structured investigation

### Target Audiences

- High school/university students
- AI/ML engineers and practitioners
- Policy makers and regulators
- Civic organizations
- General public

### Use Cases

- Classroom instruction
- Workshop activities
- Professional training
- Self-directed learning
- Group discussion facilitator

---

## Customization Guide

### Adding New Systems

1. Add system to `SYSTEMS` array:
```javascript
{
    id: 'new-system',
    name: 'New System Name',
    description: 'What it does',
    usage: 'Who uses it',
    goal: 'Its purpose',
    icon: '🔧',
    category: 'domain',
    realWorldExample: 'Documented case'
}
```

2. Add 3 problems to `PROBLEMS` array:
```javascript
{
    id: 'ns-1',
    systemId: 'new-system',
    title: 'Problem Name',
    description: 'Problem description',
    affected: ['Group 1', 'Group 2'],
    affectedStats: 'Impact statistics',
    pattern: 'bad-start', // or 'wrong-measuring', 'sneaky-shortcuts'
    explanation: 'Why this pattern',
    frameworks: {
        unesco: ['Dimension 1', 'Dimension 2'],
        oecd: ['Principle 1'],
        nist: ['Function 1'],
        eu: ['Requirement 1', 'Requirement 2']
    },
    impact: {
        description: 'What happens',
        statistics: 'Numbers',
        realWorld: 'Case study'
    }
}
```

### Modifying Difficulty

Edit `CONFIG.difficulties` in `app.js`:
```javascript
difficulties: {
    beginner: { timer: 90, hints: true, scoreMultiplier: 1 },
    standard: { timer: 60, hints: true, scoreMultiplier: 1.5 },
    expert: { timer: 45, hints: false, scoreMultiplier: 2 }
}
```

### Adding Quiz Questions

Add to `QUIZ_QUESTIONS` array:
```javascript
{
    id: 'q9',
    question: 'Your question here?',
    options: ['Option 1', 'Option 2', 'Option 3'],
    correct: 0, // index of correct answer
    explanation: 'Why this is correct'
}
```

---

## Deployment

### Option 1: GitHub Pages (Free)
```bash
git add .
git commit -m "Bias Bounty v1.1.0 - Full Version"
git push origin main
# Enable GitHub Pages in settings
```

### Option 2: Netlify (Free)
1. Go to netlify.com
2. Drag `web-vanilla` folder to deploy
3. Get instant URL

### Option 3: Local File
Just open `index.html` in a browser. No server needed.

---

## Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Full Support |
| Firefox | 88+ | ✅ Full Support |
| Safari | 14+ | ✅ Full Support |
| Edge | 90+ | ✅ Full Support |
| Mobile Chrome | Latest | ✅ Responsive |
| Mobile Safari | Latest | ✅ Responsive |

---

## Future Roadmap

### v1.2 (Important Improvements)
- [ ] Add 2 new systems (Transportation, Customer Service)
- [ ] Practice mode (quick drills)
- [ ] Enhanced "Teach Me" explanations
- [ ] Bug fixes and polish

### v1.3 (Enhancements)
- [ ] Narrative framing (Investigation Agency theme)
- [ ] Achievement system (badges/trophies)
- [ ] Scenario randomization
- [ ] Daily challenges

### v2.0 (Potential)
- [ ] Multiplayer support
- [ ] Custom scenario creator
- [ ] API for educational platforms
- [ ] Analytics dashboard

---

## Credits & References

### Framework Sources
- UNESCO Recommendation on the Ethics of AI (2021)
- OECD AI Principles (2019)
- NIST AI Risk Management Framework (2023)
- EU Ethics Guidelines for Trustworthy AI (2019)

### Real-World Cases Documented
- Amazon AI recruiting (Reuters, 2018)
- Optum healthcare algorithm (Science, 2019)
- Apple Card lending (NYT, 2019)
- UK A-levels algorithm (BBC, 2020)
- PredPol predictive policing (LA Times, 2021)
- Facebook internal research (WSJ, 2021)
- Speech recognition bias (Stanford, 2020)

---

## Evaluation Documents

Comprehensive evaluation was conducted following the project's demo evaluation framework:

- `EVALUATION_REPORT.md` - Full 7-phase evaluation
- `IMPROVEMENT_TRACKING.md` - Progress and roadmap
- `IMPLEMENTATION_SUMMARY_v1.1.md` - Detailed changes

See these files for:
- UNESCO/OECD/NIST/EU alignment analysis
- Game design evaluation
- Technical review
- Issue identification and prioritization

---

## License

Provided for non-commercial educational use.

---

**Bias Bounty v1.1.0 - Full Version**  
**Transforming AI literacy education, one pattern at a time.** 🔍
