# Ink Game Design Foundation — AI Literacy Interactive Fiction

**Project:** Human-in-the-Loop Game → Ink Narrative Redesign
**Date:** March 27, 2026
**Status:** Design Foundation (Pre-Production)

---

## Part 1: Design Principles & Architecture

### 1.1 Narrative Architecture

**Primary structure: Branch-and-Bottleneck + Hub-and-Spoke Hybrid**

Players make divergent choices that create meaningfully different experiences, but the narrative converges at key "crisis points" — shared moments every player passes through regardless of path. This gives real agency while keeping the story coherent across all four personas.

- **Branch-and-bottleneck** for the main story arc (Acts 1-3)
- **Hub-and-spoke** for Act 2's investigation phase (choose which leads to pursue)
- **Time cave** used sparingly for pivotal moments where choices create genuinely different realities

**Six branching structures (reference):**

1. **Tree** — exponential branches, unsustainable for production. Avoid.
2. **Branch-and-bottleneck** — diverge then converge at key moments. RECOMMENDED for main story.
3. **Hub-and-spoke** — central location, choose which missions/leads to pursue. RECOMMENDED for investigation chapters.
4. **Time cave** — every choice creates entirely new timeline. Use sparingly for climactic moments.
5. **Gauntlet** — mostly linear with flavor choices. Use for prologues/tutorials only.
6. **Loop-and-grow / Storylets / QBN** — modular pieces assembled dynamically. Consider for post-game reflection.

### 1.2 Ink Engine Reference

**Core syntax:**
- `== knot_name ==` — major story sections
- `= stitch_name` — subsections within knots
- `-> knot_name` — divert (go to)
- `* [Choice text]` — single-use choice
- `+ [Choice text]` — sticky (repeatable) choice
- `-` — gather point (where branches reconverge)
- `VAR name = value` — variable declaration
- `~ name = value` — variable assignment
- `{variable: text if true | text if false}` — conditional text
- `-> tunnel ->` — tunnels (reusable scenes, return to caller)
- `<- thread` — threads (parallel narrative tracks)
- `# tag` — metadata tags

**Why Ink over alternatives:**
- **vs. Twine:** Ink handles complex state tracking, variables, and conditional logic far better. Twine is more visual but less powerful for branching narratives with persistent state.
- **vs. ChoiceScript:** Ink is open-source, exports to web via ink.js, and has a more flexible scripting model.
- **vs. Ren'Py:** Ren'Py is built for visual novels. Ink is text-first, which fits our literary approach.

**Web export:** ink.js compiles .ink files to JSON, playable in any browser. No build step needed beyond the compiler.

### 1.3 Player Agency

**Conditional callback technique:** Choices feel meaningful because the game remembers and references them later, even if the main plot converges. Example: choosing to read a confidential report in Act 1 means a character references your knowledge in Act 3.

**Organic feedback over explicit validation:** Consequences show up naturally in the story ("The hiring manager eyes you warily — she heard you questioned the algorithm") rather than score popups ("You chose correctly! +10 points").

**Both options should feel reasonable.** Never present a clearly "right" and clearly "wrong" choice. The learning happens when the player sees consequences they didn't anticipate.

### 1.4 Gamification for Education

**Self-Determination Theory (SDT) framework:**
- **Autonomy** — real choices that shape the narrative, not cosmetic options
- **Competence** — escalating challenge across three acts, with early wins building confidence
- **Relatedness** — characters the player cares about, whose fates depend on decisions

**Anti-patterns to avoid:**
- "Chocolate-covered broccoli" — quizzes disguised as gameplay. If it feels like a test, it fails.
- Explicit right/wrong feedback — kills exploration instinct
- Front-loaded exposition — trust the player to learn through experience

**Patterns to embrace:**
- **Delayed consequence systems:** Choice in Act 1 echoes in Act 3. The player connects the dots themselves.
- **Discovery-based learning:** The story IS the lesson. Concepts emerge from narrative consequences, not lectures.
- **Failure as teacher:** Let the player fail and see why. The "bad" ending where an AI system causes harm teaches more than the "good" ending where everything works out.
- **LM-GM framework:** Map each learning objective to a specific game mechanic.

| Learning Objective | Game Mechanic |
|---|---|
| Automation Bias | Player defaults to accepting AI recommendation; consequences reveal the cost |
| Training Data Bias | Investigating the dataset reveals historical patterns the AI absorbed |
| Proxy Variables | Following the money/data trail uncovers hidden correlations |
| AI Hallucination | Trusting a confident-sounding AI output leads to professional consequences |
| Confidence ≠ Accuracy | AI confidence scores shown alongside actual outcomes |
| Contextual Blindness | Key context the AI can't see changes the right decision entirely |
| Appropriate Trust | Trust calibration score reflects nuanced judgment, not binary right/wrong |
| Human-in-Command | Moments where overriding AI is correct AND moments where deferring is correct |
| Risk Tiers | Different scenarios carry different stakes, requiring different scrutiny levels |

### 1.5 Replayability Design

**Lessons from exemplar games:**
- **Undertale:** Genocide/Pacifist/Neutral routes fundamentally change the game's meaning
- **80 Days:** 150+ cities, any single playthrough visits ~30. Massive content-to-playthrough ratio.
- **NieR: Automata:** Three mandatory playthroughs as different characters to get the "full" story
- **Her Story:** Non-linear investigation where the player's search terms determine what they find
- **The Last of Us Part II:** Forced perspective shift makes you empathize with "the enemy"

**Applied to our game:**
- **3-4 persona paths,** each seeing ~30% of total content per playthrough
- **Rashomon effect:** Same core incident, radically different perspectives and information
- **Content-to-playthrough ratio of 1:3** — for every minute of gameplay, three minutes of content exists that this persona can't see
- **Cross-persona references:** Subtle hints that other perspectives exist ("Someone from engineering tried to warn us, but...")
- **Epilogue that evolves:** If we track across playthroughs, the final reflection deepens with each persona completed

**Persona selection layers:**
1. **Role** — who you are in the story (Decision-Maker, Affected, Builder, Overseer)
2. **Values** — what you prioritize (efficiency, justice, innovation, safety) — expressed through choices, not menus
3. **Knowledge level** — how much AI literacy you bring — the game adapts difficulty subtly

### 1.6 Literary & Art Direction

**Tone:** Playful-but-substantive. Think Black Mirror meets a TED talk meets a choose-your-own-adventure book. Never preachy, never trivializing. The humor comes from recognition ("oh, I've been in that meeting") not from mockery.

**Point of view:** Second person, present tense. "You look at the screen. The AI's confidence score reads 94%. Your finger hovers over APPROVE."

**Choice text craft:**
- Both options must feel reasonable — no "Save the puppy / Kick the puppy" dichotomies
- Choices should reveal character, not just plot direction
- Use specificity: "Ask to see the training data" not "Investigate further"
- Occasional time pressure: some choices disappear if you explore too long

**World-building:** Near-future, recognizable but slightly advanced. AI is more capable but the workplace, the courtroom, the hospital all feel familiar. No sci-fi dystopia — the point is that these issues exist NOW, slightly amplified.

**Visual design philosophy:** Minimal. Text-first. Inspired by:
- **80 Days** — gorgeous but restrained, letting text carry the weight
- **A Dark Room** — proves text alone can create atmosphere
- **Device 6** — creative typography as narrative device

---

## Part 2: Existing Content Inventory

### 2.1 The Four Existing Games

**Human-in-the-Loop: Trust, But Verify**
The most developed game. 15 scenarios where you decide ACCEPT or OVERRIDE an AI recommendation. Spend "investigation tokens" to reveal clues before deciding. Mentor character Dr. Maya Chen guides through 3 escalating levels: operations → healthcare/finance → justice/safety. Gray-area design: 6 scenarios AI is correct, 7 AI is wrong, 2 genuinely ambiguous.

**Bias Bounty Lite**
Collaborative pattern-matching. Players see an AI system and match its failure to bias patterns: BAD START (biased training data), WRONG MEASURING (flawed metrics), SNEAKY SHORTCUTS (proxy variables). Real cases: Amazon hiring algorithm, Apple Card gender bias, UK A-level grading scandal.

**Hallucination Hunt: Evidence Board**
Fact-checking game. 30+ AI-generated claims investigated with 5 tool types. Players stamp verdicts: VERIFIED / HALLUCINATED / UNVERIFIABLE. Includes fabricated citations, wrong statistics, confident nonsense, partially correct claims.

**Risk Assessment Protocol**
NIST RMF simulation. 15 AI systems run through MAP → MEASURE → MANAGE → GOVERN phases. Players assign EU AI Act risk tiers. Most governance-focused, most abstract. Hardest to adapt to IF but elements can be woven in as "professional consequences."

### 2.2 Nine Core Concepts

1. **Automation Bias** — over-trusting AI outputs because they seem authoritative
2. **Training Data Bias** — AI learns and amplifies patterns from biased historical data
3. **Proxy Variables** — AI finds hidden correlates to protected traits (zip code → race)
4. **AI Hallucination** — confident-sounding but fabricated information
5. **Confidence ≠ Accuracy** — high certainty score doesn't mean correctness
6. **Contextual Blindness** — AI lacks real-world nuance that changes the right decision
7. **Appropriate Trust** — calibrating oversight to the stakes and context
8. **Human-in-Command** — maintaining authority to override, question, or reject AI
9. **Risk Tiers** — different AI systems warrant different levels of scrutiny

### 2.3 Best Scenarios for Ink Adaptation

| Scenario | Why It Works as IF | Primary Concept |
|---|---|---|
| Job candidate screening | Clear protagonist POV, visible bias, emotional stakes | Training Data Bias, Proxy Variables |
| Social media moderation (Holocaust education) | High moral weight, contextual twist, urgency | Contextual Blindness |
| Sentencing recommendation (zip code proxy) | Courtroom drama, systemic injustice reveal | Proxy Variables, Risk Tiers |
| AI essay grading (non-native speaker) | Personal story hook, "false positive" injustice | Automation Bias, Contextual Blindness |
| Autonomous vehicle (construction worker) | Real-time life/death stakes | Human-in-Command, Risk Tiers |
| Hallucinated legal citations (Mata v. Avianca) | Lawyer protagonist, professional consequences | AI Hallucination, Confidence ≠ Accuracy |
| AI proctoring (disabled students) | Underrepresented perspective, systemic harm | Training Data Bias, Appropriate Trust |

### 2.4 Transferable Mechanics

| Current Mechanic | Ink Adaptation |
|---|---|
| Investigation tokens | Resource-gated branches: "You have 2 investigation tokens. Spend one to review the training data?" |
| Evidence board accumulation | Ink variables tracking knowledge flags: `VAR knows_about_proxy = false` |
| Consequence visualization | Branching IS the consequence — player lives through the outcome |
| Mentor (Dr. Maya Chen) | Narrative guide who reacts to choices, provides context without lecturing |
| Gray-area design | Both ACCEPT and OVERRIDE paths have genuine merit in ambiguous scenarios |
| Quiz questions (quiz_data.js) | Embedded reflection moments between chapters — brief, in-character, not test-like |
| 3-level escalation | Three-act structure: familiar → high-stakes → systemic |

### 2.5 Evaluation Framework

- 7-phase assessment methodology, previously scored 8.0 → 9.0 after one enhancement cycle
- Concept mastery measured via 8 concepts × 3 questions (already written in quiz_data.js)
- Framework alignment coverage: UNESCO, OECD, NIST AI RMF, EU AI Act, Council of Europe
- Decision accuracy, investigation depth, and time-on-task as engagement proxies
- For Ink: embed assessment as in-character reflection, track via variables, surface in epilogue

---

## Part 3: Proposed Game Concept

### 3.1 Title Options

1. **ARIA** — the name of the AI system at the center of the incident (also a musical term — a self-contained piece for one voice)
2. **The Calibration** — refers to trust calibration, the core mechanic
3. **Override** — the central tension: when do you override the machine?
4. **Four Sides of the Algorithm** — explicit about the multi-perspective structure
5. **Confidence: 94%** — evocative, specific, captures the false certainty theme

### 3.2 Premise

Near-future. AI systems are deeply embedded in daily life — hiring, healthcare, justice, education. An AI system called ARIA (Adaptive Risk and Intelligence Assessment) makes a consequential mistake that cascades across multiple lives.

The player experiences the aftermath from four different perspectives. Each playthrough reveals a different facet of the same incident. Only by playing all four do you see the full picture.

The incident: ARIA, deployed by a mid-size company for hiring and internal operations, flags a job candidate as high-risk based on proxy variables the developers never intended. The candidate is rejected. They happen to be a whistleblower who was about to report safety violations at a client's facility. The safety violations go unreported. An accident occurs.

This single incident touches hiring bias, proxy variables, human-in-the-loop failures, corporate accountability, regulatory gaps, and the human cost of algorithmic decisions — hitting most of the 9 core concepts organically.

### 3.3 Persona System

**The Decision-Maker (Corporate)**
VP of Operations who approved ARIA's deployment. Faces: board pressure, legal exposure, the gap between what was promised and what was built. Their choices center on accountability, transparency, and whether to protect the company or do the right thing.
*Concepts emphasized:* Automation Bias, Appropriate Trust, Risk Tiers

**The Affected (Personal)**
The rejected candidate whose whistleblower report never reached the right people. Faces: injustice, the opaque system that judged them, the question of whether to fight or move on. Their choices center on justice, visibility, and personal cost.
*Concepts emphasized:* Proxy Variables, Training Data Bias, Human-in-Command

**The Builder (Technical)**
The lead engineer who built ARIA. Faces: the gap between intention and impact, technical debt that became moral debt, the pressure to ship vs. the duty to test. Their choices center on responsibility, technical honesty, and what they knew vs. what they chose not to investigate.
*Concepts emphasized:* Training Data Bias, Contextual Blindness, Confidence ≠ Accuracy

**The Overseer (Governance)**
A regulator investigating the incident after the accident. Faces: systemic patterns, political pressure, the limits of regulation, and the question of who is really responsible when an algorithm fails. Their choices center on systemic change, precedent, and pragmatism vs. idealism.
*Concepts emphasized:* Risk Tiers, AI Hallucination, Appropriate Trust

### 3.4 Chapter Structure

**Act 1: The Incident** (Persona-specific prologues → converge at crisis point)
- Each persona has a unique prologue (~5 min) establishing their world and stakes
- All four prologues lead to the same moment: the accident is reported in the news
- Branch-and-bottleneck: different entry points, same crisis

**Act 2: The Investigation** (Hub-and-spoke — choose which leads to pursue)
- Central hub: the player's desk/office/home, where they process information
- Spokes: 4-6 investigation leads, each revealing different aspects of the incident
- Persona determines which leads are accessible (Builder can examine the code, Overseer can subpoena records, Affected can talk to other rejected candidates, Decision-Maker can review internal communications)
- Investigation tokens limit how many leads you can pursue (forces prioritization)
- Each lead teaches one core concept through lived experience

**Act 3: The Reckoning** (Consequences cascade, persona-specific epilogue)
- Your investigation choices determine what you know
- What you know determines your options at the final crisis: the board hearing / the public testimony / the code review / the regulatory ruling
- Multiple endings per persona, shaped by trust calibration and knowledge
- Epilogue reflects on what was learned, what was missed, and what other perspectives might reveal

### 3.5 Core Mechanic: Trust Calibration

Instead of a simple score, track a "trust calibration" variable — how well the player calibrates their trust in AI systems.

```ink
VAR trust_calibration = 50  // 0 = total distrust, 100 = blind trust, 50 = well-calibrated

// Over-trusting
~ trust_calibration = trust_calibration + 10
// "You accepted ARIA's recommendation without checking the underlying data."

// Under-trusting
~ trust_calibration = trust_calibration - 15
// "You rejected the AI's analysis, even though the evidence supported it."

// Well-calibrated
// (trust_calibration stays near 50)
// "You reviewed ARIA's confidence score, checked the edge cases, and made your call."
```

Over-trusting and under-trusting both have consequences. The game doesn't reward blanket skepticism OR blanket acceptance. The ideal is nuanced, context-dependent judgment.

**End-of-game calibration assessment:**
- 40-60: Well-calibrated — you made thoughtful, context-aware decisions
- 60-80: Leaning toward over-trust — you may be susceptible to automation bias
- 20-40: Leaning toward distrust — you may miss valuable AI insights
- 80-100 or 0-20: Extreme positions — the epilogue gently explores why

### 3.6 Teaching Through Consequences

Each of the 9 concepts is taught through a specific story beat:

1. **Automation Bias** → Act 1: You're shown ARIA's recommendation and your instinct is to accept it. If you do, Act 3 reveals what you missed.
2. **Training Data Bias** → Act 2 investigation: Examining the training data reveals historical patterns ARIA absorbed without question.
3. **Proxy Variables** → Act 2 investigation: Following the data trail shows zip code correlating with rejection rate, which correlates with race.
4. **AI Hallucination** → Act 2 investigation: ARIA generated a "risk report" citing patterns that don't exist in the actual data.
5. **Confidence ≠ Accuracy** → Recurring: ARIA's confidence scores are shown alongside actual outcomes throughout.
6. **Contextual Blindness** → Act 1-2: The crucial context (whistleblower status) that ARIA couldn't see.
7. **Appropriate Trust** → Trust calibration mechanic throughout — reflected in epilogue.
8. **Human-in-Command** → Act 3: The moment where you decide whether to override, accept, or reform the system.
9. **Risk Tiers** → Overseer's path: classifying ARIA's deployment against regulatory frameworks.

### 3.7 Replayability Hooks

- Each persona playthrough reveals ~30% of total content
- Cross-persona easter eggs: "A woman from engineering tried to raise concerns last month, but her email was buried." (Playing as The Builder, you wrote that email.)
- Epilogue deepens with each completed playthrough (if tracked via browser localStorage or similar)
- Hidden investigation leads only accessible to specific personas
- The "full picture" only emerges across all four playthroughs
- Dr. Maya Chen appears differently to each persona — colleague, advocate, expert witness, advisor

---

## Part 4: Ink Technical Blueprint

### 4.1 File Structure

```
game/
├── main.ink              # Entry point, persona selection, global setup
├── shared/
│   ├── variables.ink     # Global state: trust_calibration, tokens, knowledge flags
│   ├── characters.ink    # Character definitions, Dr. Maya Chen dialogue patterns
│   └── world.ink         # World constants, ARIA system description, timeline
├── personas/
│   ├── decision_maker/
│   │   ├── prologue.ink  # Act 1 for this persona
│   │   ├── hub.ink       # Act 2 investigation hub
│   │   └── reckoning.ink # Act 3 for this persona
│   ├── affected/
│   │   ├── prologue.ink
│   │   ├── hub.ink
│   │   └── reckoning.ink
│   ├── builder/
│   │   ├── prologue.ink
│   │   ├── hub.ink
│   │   └── reckoning.ink
│   └── overseer/
│       ├── prologue.ink
│       ├── hub.ink
│       └── reckoning.ink
├── scenarios/            # Reusable investigation tunnels
│   ├── examine_training_data.ink
│   ├── interview_candidate.ink
│   ├── review_internal_comms.ink
│   ├── analyze_confidence_scores.ink
│   ├── trace_proxy_variables.ink
│   └── inspect_risk_report.ink
├── reflection/           # Post-chapter moments
│   └── calibration_check.ink
└── web/                  # ink.js integration
    ├── index.html
    ├── story.js
    └── style.css
```

### 4.2 Key Variable System

```ink
// === PERSONA ===
VAR persona = ""  // "decision_maker", "affected", "builder", "overseer"

// === TRUST CALIBRATION ===
VAR trust_calibration = 50  // 0-100, 50 is ideal

// === INVESTIGATION RESOURCES ===
VAR investigation_tokens = 3  // How many leads you can pursue in Act 2

// === KNOWLEDGE FLAGS ===
VAR knows_about_proxy = false
VAR knows_about_training_bias = false
VAR knows_about_whistleblower = false
VAR knows_about_hallucinated_report = false
VAR knows_about_confidence_gap = false
VAR knows_about_internal_warnings = false
VAR examined_source_code = false
VAR spoke_to_candidate = false
VAR reviewed_board_minutes = false

// === RELATIONSHIP TRACKING ===
VAR maya_trust = 50        // Dr. Maya Chen's trust in you
VAR public_perception = 50 // How the public sees the incident

// === CONCEPT EXPOSURE ===
VAR concepts_encountered = 0  // Track how many of the 9 concepts the player has experienced
```

### 4.3 Code Patterns

**Pattern 1: Trust Calibration**
```ink
=== trust_decision ===
The screen shows ARIA's assessment: "Candidate Risk Score: HIGH (94% confidence)"

* [Accept ARIA's recommendation]
  ~ trust_calibration = trust_calibration + 10
  You click APPROVE. The system moves to the next candidate.
  {trust_calibration > 70: Something nags at you. You've been approving a lot of these lately.}
  -> next_scene

* [Request the underlying data]
  ~ investigation_tokens = investigation_tokens - 1
  You pull up the feature weights. One variable jumps out...
  -> examine_data

* [Override — reject ARIA's assessment]
  ~ trust_calibration = trust_calibration - 10
  You mark OVERRIDE. Your manager will want a reason.
  -> justify_override
```

**Pattern 2: Persona-Aware Conditional Text**
```ink
=== the_news_breaks ===
Your phone buzzes. A news alert.

{persona == "decision_maker":
  "AI-Powered Hiring System Under Fire After Workplace Accident"
  Your stomach drops. That's your system.
}
{persona == "affected":
  "Rejected Job Candidate Was Whistleblower, Investigation Reveals"
  That's you. They're talking about you.
}
{persona == "builder":
  "Algorithm Blamed in Safety Failure — Developer Team Under Scrutiny"
  You read it three times. You built that algorithm.
}
{persona == "overseer":
  "Regulators Launch Probe Into AI Hiring Practices After Fatal Accident"
  Your phone rings. It's the deputy commissioner. "This one's yours."
}
```

**Pattern 3: Resource-Gated Investigation**
```ink
=== investigation_hub ===
You have {investigation_tokens} investigation {investigation_tokens == 1: lead | leads} left to pursue.

+ {investigation_tokens > 0 && not knows_about_proxy} [Trace the proxy variables in ARIA's model]
  ~ investigation_tokens = investigation_tokens - 1
  -> trace_proxy_variables ->
  -> investigation_hub

+ {investigation_tokens > 0 && not knows_about_training_bias} [Examine the training dataset]
  ~ investigation_tokens = investigation_tokens - 1
  -> examine_training_data ->
  -> investigation_hub

+ {investigation_tokens > 0 && not spoke_to_candidate && persona != "affected"} [Interview the rejected candidate]
  ~ investigation_tokens = investigation_tokens - 1
  -> interview_candidate ->
  -> investigation_hub

+ [Proceed to the hearing with what you know]
  -> act3_reckoning
```

**Pattern 4: Tunnel Scenario (Reusable Across Personas)**
```ink
=== examine_training_data ===
// This tunnel is called from multiple personas but reads differently

{persona == "builder":
  You open the dataset you assembled two years ago. The familiar columns scroll past.
  It takes you twenty minutes to see what you should have seen then.
}
{persona == "overseer":
  The subpoenaed dataset arrives as a 40GB CSV. Your analyst highlights the key columns.
}
{persona == "decision_maker":
  The CTO walks you through the training data. You nod along, but the technical details blur.
}

The data spans five years of hiring decisions. You notice a pattern...

~ knows_about_training_bias = true
~ concepts_encountered = concepts_encountered + 1

Historical rejection rates correlate strongly with zip code. And zip code correlates with...

* [Keep investigating this thread]
  ~ knows_about_proxy = true
  ~ concepts_encountered = concepts_encountered + 1
  The correlation isn't accidental. The AI learned to use zip code as a proxy.
  ->->

* [You've seen enough]
  ->->
```

**Pattern 5: Mentor Dialogue (Dr. Maya Chen)**
```ink
=== maya_reflection ===
// Called between acts as a reflection beat

{persona == "builder":
  Dr. Chen leans back. "You know, the dataset isn't the villain here. It's a mirror."
}
{persona == "affected":
  Maya puts down her coffee. "What happened to you isn't rare. That's what makes it systemic."
}

{knows_about_proxy && knows_about_training_bias:
  "You're starting to see the full picture," she says. "Most people stop at the first layer."
  ~ maya_trust = maya_trust + 10
}

{not knows_about_proxy && not knows_about_training_bias:
  She pauses. "There's more to this than what's on the surface. Have you looked at the data?"
}
```

**Pattern 6: Disguised Assessment**
```ink
=== reflection_moment ===
// Embedded assessment that feels like character reflection, not a quiz

Maya looks at you. "If you had to explain to a jury why this happened — in one sentence — what would you say?"

* ["The AI learned bias from historical data"]
  {knows_about_training_bias: She nods. "That's exactly right. And it's not unique to ARIA."}
  {not knows_about_training_bias: She tilts her head. "Close, but how do you know that? Did you look at the data?"}
  ~ concepts_encountered = concepts_encountered + 1

* ["Someone should have been checking the AI's decisions"]
  She nods slowly. "Human oversight. The loop that wasn't closed."
  ~ concepts_encountered = concepts_encountered + 1

* ["The whole system is broken — AI shouldn't make these decisions"]
  ~ trust_calibration = trust_calibration - 10
  "That's one take," she says carefully. "But what about the decisions AI gets right?"
```

**Pattern 7: Web Layer Tags**
```ink
=== scene_with_tags ===
# CONCEPT: proxy_variables
# DIFFICULTY: intermediate
# PERSONA: builder
# ACT: 2

The code review reveals something unexpected...
```

### 4.4 Web Integration Notes

The Ink story compiles to JSON via `inklecate`. The web layer (`story.js`) handles:
- Loading compiled story JSON
- Rendering text and choices
- Persisting state across sessions (for replayability tracking)
- Tracking which personas have been completed
- Minimal CSS animations for atmosphere (text fade-in, choice highlighting)
- Mobile-responsive design (this should work on phones)

The web layer should be as thin as possible — the narrative carries everything. No complex UI, no sprites, no audio (initially). Just beautiful typography and pacing.

---

## Quick Reference Card for Writers

**Before writing any scene, ask:**
1. Which persona(s) can reach this scene?
2. Which concept(s) does this scene teach?
3. What knowledge flags does this scene check or set?
4. Does this scene move trust_calibration? In which direction?
5. Is there a genuine dilemma here, or is one choice obviously "correct"?

**Voice checklist:**
- Second person, present tense
- Specific details over generic descriptions
- Both choice options feel reasonable
- No lectures — show, don't tell
- Humor from recognition, not mockery

**Concept-to-scene mapping rule:** Every concept must be teachable through consequence, not explanation. If you can't show the concept through what happens next, the scene isn't ready.

---

*This document is the foundation. Next steps: write the four prologues, build the investigation hub, and create the first complete playthrough for one persona (recommended: The Affected, as their emotional arc is the most immediately compelling).*
