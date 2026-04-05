# AI Game Project Workflow Guide

**Purpose:** Standardized process for developing AI literacy games from initial idea to playable demo.

**Use this when:** Starting ANY new game project or continuing from a handoff.

---

## Workflow Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         COMPLETE WORKFLOW PIPELINE                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐ │
│   │ RESEARCH │ → │ BRAINSTORM│ → │  DESIGN  │ → │ SIMPLIFY │ → │  DEMO    │ │
│   │  Phase   │   │  Phase   │   │  Phase   │   │  Phase   │   │  Phase   │ │
│   └────┬─────┘   └────┬─────┘   └────┬─────┘   └────┬─────┘   └────┬─────┘ │
│        │              │              │              │              │       │
│        ▼              ▼              ▼              ▼              ▼       │
│   01-foundations  02-brainstorm  03-designs   04-simplify   05-demos      │
│                                                                             │
│   Time: 1-2h      Time: 2-4h    Time: 3-6h   Time: 2-3h   Time: 4-8h     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Phase 0: Project Initialization

### When Starting a BRAND NEW Project

**Step 1: Create Project Structure**
```bash
mkdir -p ai-game-project/{research-docs,demos}
cd ai-game-project
mkdir -p research-docs/{01-foundations,02-brainstorming,03-game-designs,04-simplification}
mkdir -p demos/{web-demo,react-demo,docs}
```

**Step 2: Copy This Workflow Guide**
```bash
cp /path/to/WORKFLOW_GUIDE.md ./WORKFLOW_GUIDE.md
```

**Step 3: Create README.md**
```markdown
# [Project Name]

[One sentence description]

## Status
- [ ] Phase 1: Research
- [ ] Phase 2: Brainstorming
- [ ] Phase 3: Design
- [ ] Phase 4: Simplification
- [ ] Phase 5: Demo

## Quick Links
- [Workflow Guide](./WORKFLOW_GUIDE.md)
- [Current Phase](./research-docs/)
```

---

## Phase 1: RESEARCH

### Goal: Gather source materials and establish constraints

**Output Location:** `research-docs/01-foundations/`

### Tasks
1. **Identify target domain** (e.g., AI bias, deepfakes, privacy, etc.)
2. **Gather reference documents:**
   - Academic frameworks (UNESCO, OECD, NIST, EU AI Act)
   - Pedagogy research (gamification, learning sciences)
   - Existing games (competitive analysis)
3. **Define constraints:**
   - Target audience (age, prior knowledge)
   - Format (card game, board game, digital, hybrid)
   - Duration (15 min, 30 min, 60 min)
   - Player count (solo, 2-4, 4-8, etc.)

### Required Documents
Create these files in `research-docs/01-foundations/`:

```
01-foundations/
├── README.md              # Summary of findings
├── target-audience.md     # Who is this for?
├── learning-objectives.md # What should they learn?
├── constraints.md         # Technical/logistical limits
└── [source-documents].md  # Reference materials
```

### Phase 1 Deliverables Checklist
- [ ] Target audience defined
- [ ] Learning objectives listed
- [ ] Constraints documented
- [ ] 2-3 reference frameworks identified
- [ ] README.md summarizes research

### Handoff to Phase 2
When complete, document in `research-docs/README.md`:
```markdown
## Phase 1 Complete: Research

### Key Findings
- Target: [audience]
- Objectives: [list]
- Constraints: [list]

### Next: Brainstorming game concepts
```

---

## Phase 2: BRAINSTORMING

### Goal: Generate and evaluate game concepts

**Output Location:** `research-docs/02-brainstorming/`

### Tasks
1. **Generate concepts** (aim for 8-15 ideas)
2. **Categorize approaches**
3. **Evaluate using 5-pillar framework**
4. **Select 1-3 candidates for development**

### Concept Generation Prompts
Use these to generate ideas:
- "How would you teach [topic] through [mechanic]?"
- "What if players had to [action] to learn [concept]?"
- "Can [real-world process] become a game loop?"
- "What's the most engaging way to experience [problem]?"

### Evaluation Framework (5 Pillars)

| Pillar | Weight | Questions |
|--------|--------|-----------|
| **PED** - Pedagogical | 3x | Does it teach? Will concepts transfer? |
| **STD** - Standards | 2x | Does it align with frameworks? |
| **ENG** - Engagement | 3x | Is it fun? Replayable? Accessible? |
| **OFF** - Offline | 2x | Can it work without internet/apps? |
| **INV** - Innovation | 1x | Is it novel? Mechanics-integrated? |

### Scoring
- 5 = Exceptional
- 4 = Strong
- 3 = Adequate
- 2 = Weak
- 1 = Poor

Weighted Score = Σ(score × weight)

### Required Documents
```
02-brainstorming/
├── README.md
├── concept-[name].md      # One per concept (8-15 total)
├── evaluation-matrix.md   # All concepts scored
└── recommendation.md      # Which to pursue and why
```

### Phase 2 Deliverables Checklist
- [ ] 8-15 concepts generated
- [ ] All concepts categorized
- [ ] Evaluation matrix complete
- [ ] Top 3 candidates identified
- [ ] Final selection with rationale

### Handoff to Phase 3
```markdown
## Phase 2 Complete: Brainstorming

### Selected Concept: [Name]
**Why selected:** [2-3 sentences]
**Core mechanic:** [description]
**Anticipated challenges:** [list]

### Next: Detailed design simulation
```

---

## Phase 3: DESIGN

### Goal: Create detailed game specification

**Output Location:** `research-docs/03-game-designs/`

### Tasks
1. **Define core mechanics**
2. **Design components** (cards, boards, pieces)
3. **Create sample content**
4. **Simulate gameplay** (walk through rounds)
5. **Document rules**

### Design Document Structure
```
03-game-designs/
├── README.md
├── [game-name]-overview.md      # High-level concept
├── [game-name]-components.md    # All physical components
├── [game-name]-mechanics.md     # How it works
├── [game-name]-simulation.md    # Walkthrough example
└── [game-name]-rules.md         # Complete rules
```

### Key Design Sections

**1. Overview**
- Tagline
- Player count, time, age
- Learning objectives
- Unique selling point

**2. Components**
- List every card/type
- Quantities
- Specifications

**3. Mechanics**
- Setup
- Round structure (phases)
- Turn/actions
- Scoring
- Winning conditions

**4. Simulation**
- Sample round walkthrough
- Example cards
- Dialogue between players
- Key decision points

**5. Rules**
- Setup instructions
- Phase-by-phase guide
- Edge cases
- FAQ

### Phase 3 Deliverables Checklist
- [ ] Game playable on paper (theoretically)
- [ ] All components specified
- [ ] Complete rules documented
- [ ] Sample round simulated
- [ ] Learning objectives mapped to mechanics

### Handoff to Phase 4
```markdown
## Phase 3 Complete: Design

### Game: [Name]
**Complexity:** [Light/Medium/Heavy]
**Component count:** [N cards/pieces]
**Anticipated issues:** [complexity, accessibility, etc.]

### Next: Simplification for general audience
```

---

## Phase 4: SIMPLIFICATION

### Goal: Make accessible to target audience

**Output Location:** `research-docs/04-simplification/`

### When to Simplify
- Cognitive load too high
- Too many concepts at once
- Requires prior knowledge audience lacks
- Intimidating or overwhelming

### Simplification Frameworks

#### Framework 1: Finland Model
**"Don't dumb it down—clarify the logic"**
- Use narrative metaphors, not jargon
- Teach intuition, skip technical precision
- Example: "Bad Start" not "Historical Bias"

#### Framework 2: UNESCO Spiral
**Progressive disclosure**
- Level 1: Recognize examples
- Level 2: Apply patterns
- Level 3: Design/create

#### Framework 3: Human Dimension
**Start with impact, work to mechanism**
- Show WHO is affected
- Show HOW they're harmed
- THEN explain technical cause

#### Framework 4: Pattern Recognition
**Teach through familiar examples**
- Non-AI warm-up examples
- Build pattern intuition
- Transfer to AI contexts

### Simplification Checklist
- [ ] Technical terms translated to intuitive language
- [ ] Component count reduced (if >50)
- [ ] Hidden information eliminated (if intimidating)
- [ ] Warm-up examples created
- [ ] Visual language established
- [ ] Discussion structure simplified

### Required Documents
```
04-simplification/
├── README.md
├── simplification-frameworks.md   # Which frameworks applied
├── [game-name]-lite.md            # Simplified version spec
├── before-after-comparison.md     # What changed
└── accessibility-notes.md         # WCAG, cognitive load, etc.
```

### Phase 4 Deliverables Checklist
- [ ] Original complexity documented
- [ ] Simplified version specified
- [ ] Changes justified
- [ ] Accessibility addressed
- [ ] Target audience can now play

### Handoff to Phase 5
```markdown
## Phase 4 Complete: Simplification

### Original → Simplified
**Before:** [complexity, time, components]
**After:** [complexity, time, components]

### Key Changes
1. [Change 1]
2. [Change 2]
3. [Change 3]

### Next: Demo implementation
```

---

## Phase 5: DEMO

### Goal: Build playable digital prototype

**Output Location:** `demos/[chosen-tech]/`

### Choosing Tech Stack

| Approach | Best For | Pros | Cons |
|----------|----------|------|------|
| **Web (vanilla)** | Fastest prototype | No build, instant share | Limited polish |
| **React** | PWA, rich UI | Components, ecosystem | Build step |
| **Flutter** | Mobile apps | Cross-platform, native feel | Larger size |
| **Godot** | Game feel | Animations, physics | Overkill for simple |

### Demo Implementation Checklist

**MVP (Minimum Viable Playable)**
- [ ] Card display components
- [ ] Core game loop
- [ ] Basic scoring
- [ ] Works on target devices

**Enhanced (if time allows)**
- [ ] Animations/transitions
- [ ] Tutorial/walkthrough
- [ ] Session persistence
- [ ] Share/export features

### Demo Structure
```
demos/
├── README.md                      # Demo approach overview
├── docs/
│   └── design-system.md           # Visual specs
├── web-demo/
│   ├── vanilla/                   # HTML/CSS/JS
│   └── enhanced/                  # With localStorage, etc.
├── react-demo/
│   ├── basic/                     # CRA
│   └── advanced/                  # Next.js + PWA
└── [other-tech]/                  # Flutter, Godot, etc.
```

### Implementation Order
1. **Static display** - Show cards on screen
2. **Navigation** - Click through game flow
3. **State management** - Track scores, current phase
4. **Logic** - Implement rules, validation
5. **Polish** - Animations, responsive, accessibility

### Phase 5 Deliverables Checklist
- [ ] Demo runs without errors
- [ ] Core game loop functional
- [ ] Responsive on target devices
- [ ] README explains how to run
- [ ] (Optional) Deployed to hosting

---

## Handoff Between Sessions

### Creating a Handoff Document

When pausing work, create: `SESSION_HANDOFF_[DATE].md`

**Template:**
```markdown
# Session Handoff - [Date]

## Completed
- [ ] Phase [N]: [What was done]

## Current Status
- Location in workflow: [Phase, step]
- Working on: [Specific task]
- Blocked by: [If anything]

## Key Decisions
1. [Decision 1 and rationale]
2. [Decision 2 and rationale]

## Next Steps
1. [Immediate next task]
2. [Following task]
3. [Upcoming milestone]

## Reference Files
- Current design: [path]
- Current code: [path]
- Active questions: [list]

## Notes for Future Self
[Context that won't be obvious later]
```

### Continuing from Handoff

In new session:
1. Read most recent `SESSION_HANDOFF_*.md`
2. Review files listed in "Reference Files"
3. Check "Next Steps" section
4. Continue from "Current Status"

---

## Project Templates

### New Game Project Template

```markdown
# [Game Name]

[Tagline]

## Quick Start
- [Workflow Guide](./WORKFLOW_GUIDE.md)
- [Current Status](#status)

## Status
- [ ] Phase 1: Research
- [ ] Phase 2: Brainstorming
- [ ] Phase 3: Design
- [ ] Phase 4: Simplification
- [ ] Phase 5: Demo

## Documents
| Phase | Document | Status |
|-------|----------|--------|
| 1 | [Foundations](./research-docs/01-foundations/) | [ ] |
| 2 | [Brainstorming](./research-docs/02-brainstorming/) | [ ] |
| 3 | [Design](./research-docs/03-game-designs/) | [ ] |
| 4 | [Simplification](./research-docs/04-simplification/) | [ ] |
| 5 | [Demo](./demos/) | [ ] |

## Overview
**Concept:** [One sentence]
**Audience:** [Age, knowledge level]
**Time:** [Duration]
**Players:** [Count]
```

### Session Handoff Template

See above in "Handoff Between Sessions" section.

---

## Common Patterns

### Pattern 1: Research → One Concept
When you already know what game to build:
- Skip Phase 2 (Brainstorming) or do lightweight
- Move quickly to Phase 3 (Design)
- Document why this concept was pre-selected

### Pattern 2: Multiple Demos
When building same game in multiple technologies:
- Complete Phases 1-4 once
- Create multiple Phase 5 implementations
- Each demo references same design document

### Pattern 3: Iterative Design
When design isn't working:
- Go back from Phase 3 to Phase 2
- Generate new variations
- Keep previous attempts documented
- Version your designs: `concept-v1.md`, `concept-v2.md`

### Pattern 4: From Existing Research
When building on prior research:
- Copy `01-foundations/` from previous project
- Add new context as needed
- Note what research is inherited

---

## Quality Checkpoints

### Before Moving to Next Phase

**Phase 1 → 2:**
- [ ] Can explain target audience in one sentence
- [ ] Learning objectives are measurable
- [ ] Constraints are realistic

**Phase 2 → 3:**
- [ ] Selected concept scores >80% on evaluation
- [ ] Can describe core loop in 30 seconds
- [ ] Differentiation from existing games is clear

**Phase 3 → 4:**
- [ ] Could theoretically play with paper prototype
- [ ] All components have quantities
- [ ] Rules answer common edge cases

**Phase 4 → 5:**
- [ ] Target audience can understand without help
- [ ] Component count is reasonable (<50 items)
- [ ] Session time fits target context

**Phase 5 (Complete):**
- [ ] Demo runs without crashes
- [ ] Core loop is playable
- [ ] Someone unfamiliar can learn from demo

---

## Example Workflows

### Example A: Complete New Project
```
Day 1: Phases 1-2 (Research + Brainstorming)
Day 2: Phase 3 (Design)
Day 3: Phase 4 (Simplification)
Day 4-5: Phase 5 (Demo)
```

### Example B: Pre-selected Concept
```
Day 1: Phase 1 (Research context)
Day 1-2: Phase 3 (Design concept)
Day 2-3: Phase 4 (Simplify)
Day 3-5: Phase 5 (Demo)
```

### Example C: Multiple Demos
```
Week 1: Phases 1-4 (Design complete)
Week 2: Phase 5a (Web demo)
Week 3: Phase 5b (React demo)
Week 4: Phase 5c (Mobile demo)
```

---

## FAQ

### Q: Can I skip phases?
**A:** Yes, but document why. If skipping brainstorming because concept is pre-selected, note that in `02-brainstorming/README.md`.

### Q: What if design isn't working in Phase 3?
**A:** Go back to Phase 2. Generate variations. Don't force a broken design forward.

### Q: How much detail in Phase 3?
**A:** Enough that someone else could build it. Every card, every rule, every edge case.

### Q: Do I always need Phase 4 (Simplification)?
**A:** No. If design is already accessible, document that decision and skip. But be honest—most initial designs are too complex.

### Q: Can multiple people work on different phases?
**A:** Yes. One person does Phases 1-3 (design), another does Phase 4 (simplification), another does Phase 5 (demo). Use handoff documents.

### Q: What if I only have one session?
**A:** Focus on Phases 2-3 (Brainstorm + Design). Get concept solid. Demo can come later.

---

## Tools & Resources

### Recommended Tools
- **Markdown editor:** VS Code, Typora, or similar
- **Diagrams:** Excalidraw, Mermaid, or paper photos
- **Prototyping:** Paper cards, then Figma if needed
- **Demo:** Choose based on Phase 5 requirements

### Reference Documents
Keep these handy for all projects:
- UNESCO AI Competency Framework
- OECD AI Principles
- NIST AI Risk Management Framework
- EU AI Act
- This workflow guide

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-05 | Initial workflow established |

---

## Contributing to This Workflow

If you discover improvements:
1. Document what worked/didn't
2. Update this guide
3. Note changes in version history
4. Share with team

---

**Remember:** This workflow serves the project, not vice versa. Adapt as needed, but document adaptations.
