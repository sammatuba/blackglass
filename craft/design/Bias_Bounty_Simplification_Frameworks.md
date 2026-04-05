# Simplifying Bias Bounty: Frameworks for General Audiences

## The Problem: Cognitive Load Analysis

Original Bias Bounty requires players to:
1. Read complex system descriptions
2. Hold multiple evidence cards
3. Match evidence to abstract bias categories
4. Argue under uncertainty
5. Understand technical AI concepts

**Cognitive Load:** HIGH → Intimidating for general audiences

---

# PART 1: Simplification Frameworks

## Framework 1: Finland's "Elements of AI" Philosophy

### Principle: "Don't Dumb It Down—Clarify the Logic"

**What Finland did:**
- Taught Bayes' theorem to 1% of population without requiring calculus
- Used visual metaphors and relatable examples
- Focused on intuition over technical precision

**Application to Bias Bounty:**

| Original (Too Technical) | Simplified (Intuitive) |
|--------------------------|------------------------|
| "Historical Bias in training data" | "The AI learned from biased history" |
| "Proxy discrimination via correlated variables" | "The AI found sneaky shortcuts to discriminate" |
| "Representation bias in feature selection" | "The AI only understands some people's experiences" |
| "Evaluation bias in benchmark datasets" | "The AI tests well on paper but fails in real life" |

**Key Insight:** Use **narrative metaphors** instead of academic terminology.

---

## Framework 2: UNESCO Spiral Curriculum (Progressive Disclosure)

### Principle: Start Concrete, Build to Abstract

**UNESCO Levels:**
- **Level 1 (Understand):** Recognize AI, see examples
- **Level 2 (Apply):** Use tools, make decisions  
- **Level 3 (Create):** Design systems, audit complexity

**Application:** Create three tiers of Bias Bounty

### Tier 1: "GUESS THE PATTERN" (Entry Level)
**Target:** Ages 10+, no prior knowledge
**Time:** 15-20 minutes

**Simplification:**
- Instead of abstract "bias types," use **visible outcomes**
- Cards show: "What happened" → "Who was affected"
- No technical terminology

**Example Tier 1 Card:**
```
┌─────────────────────────────────────────┐
│  THE SCENARIO                           │
├─────────────────────────────────────────┤
│  An AI helps doctors diagnose illness.  │
│                                         │
│  WHAT HAPPENED:                         │
│  The AI works great for most patients,  │
│  but often misses problems in people    │
│  with darker skin.                      │
│                                         │
│  WHO WAS AFFECTED:                      │
│  ☒ People with darker skin              │
│  ☐ People with lighter skin             │
│                                         │
│  QUESTION: Why might this happen?       │
│  [Discussion prompt, no wrong answers]  │
└─────────────────────────────────────────┘
```

### Tier 2: "FIND THE FLAW" (Intermediate)
**Target:** Ages 14+, some familiarity
**Time:** 30-40 minutes

**Simplification:**
- Introduce 3 simple categories (not 6-7 bias types)
- Focus on **source of problem**, not technical mechanism

**The Three Simple Categories:**
1. **BAD START** (Historical Bias simplified)
   - "The AI learned from old unfair patterns"
   
2. **WRONG MEASURING** (Measurement Bias simplified)
   - "The AI measures success in a limited way"
   
3. **SNEAKY SHORTCUTS** (Proxy Discrimination simplified)
   - "The AI found hidden ways to discriminate"

### Tier 3: "BIAS BOUNTY PRO" (Advanced)
**Target:** Ages 16+, ready for technical terms
**Time:** 45-60 minutes

**This is the original version**—now accessible because players built up to it.

---

## Framework 3: Council of Europe "Human Dimension" Focus

### Principle: Start with Human Impact, Not Technical Mechanism

**What CoE emphasizes:**
- AI literacy must include human rights, democracy, rule of law
- Start with **lived experience**, work backwards to technical cause

**Application:**

**Original approach (bad):**
> "This system exhibits measurement bias due to feature selection that privileges continuous employment over skill diversity"

**Simplified approach (good):**
> "Maria took 2 years off to care for her sick mom. The AI marked her as 'unreliable' even though she's highly skilled. What happened?"

**Framework: The "AFFECTED PERSON" Method**
Every scenario must:
1. Introduce a specific person (not abstract "users")
2. Show their specific harm (not "bias exists")
3. Let players work backwards to cause

---

## Framework 4: NIST "Map, Measure, Manage" Simplification

### Principle: Break Complexity into Stages

**NIST RMF adapted for general audiences:**

| NIST Term | Simple Version | Game Action |
|-----------|----------------|-------------|
| MAP | "What could go wrong?" | Look at system, guess problems |
| MEASURE | "Did it actually go wrong?" | Check evidence cards |
| MANAGE | "How do we fix it?" | Propose solutions |
| GOVERN | "Who's responsible?" | Discuss accountability |

**Simplification:** Turn each into a **physical game phase** with clear actions.

---

## Framework 5: "Toy Examples" Pedagogy (From Gamification Research)

### Principle: Use Obvious, Even Silly Examples to Teach Principles

**Examples from the pedagogy document:**
- Teachable Machine uses "rock paper scissors" to teach classification
- TensorFlow Playground uses colored dots, not real data

**Application:** Start with **non-AI examples** to teach the pattern.

### Phase 1: Learn the Pattern with Familiar Examples

**Example 1: The Teacher's Favorite**
```
Ms. Johnson always calls on students who sit in front.
She says she treats everyone fairly, but over time, 
only front-row students get opportunities.

TYPE: BAD START (she developed a habit that favored some)
```

**Example 2: The Test Score Trap**
```
A school judges teachers by their students' test scores.
Teachers start teaching only what's on the test, 
ignoring creativity and critical thinking.

TYPE: WRONG MEASURING (the measurement changed behavior)
```

**Example 3: The Neighborhood Code**
```
An insurance company doesn't ask about race, 
but charges more in certain zip codes.
Those zip codes have higher minority populations.

TYPE: SNEAKY SHORTCUTS (used proxy to discriminate)
```

**After 2-3 familiar examples, transition to AI systems.**

---

# PART 2: Practical Simplification Strategies

## Strategy 1: Component Reduction

**Original:** 120+ cards, 6 bias types, stakeholder cards
**Simplified:** 40 cards, 3 bias types, no extra mechanics

### Simplified Card Types (3 only)

**1. SYSTEM CARDS (8 cards)**
```
┌─────────────────────────────────────────┐
│  HIRING HELPER AI                       │
│                                         │
│  What it does: Sorts job applications   │
│  so employers see "best" candidates     │
│  first. Used by 100+ companies.         │
│                                         │
│  [Simple icon: briefcase with stars]    │
└─────────────────────────────────────────┘
```

**2. PROBLEM CARDS (24 cards)**
```
┌─────────────────────────────────────────┐
│  THE PROBLEM                            │
│                                         │
│  Identical resumes with different       │
│  names got different scores:            │
│                                         │
│  "John" → 87 points ★★★★              │
│  "Jamal" → 72 points ★★★               │
│                                         │
│  [Simple bar chart visual]              │
└─────────────────────────────────────────┘
```

**3. TYPE CARDS (8 cards - 3 types + instructions)**
```
┌─────────────────────────────────────────┐
│  SNEAKY SHORTCUTS                       │
│  ★ Common Problem                       │
├─────────────────────────────────────────┤
│  The AI found a hidden way to treat     │
│  people differently, even when told     │
│  not to.                                │
│                                         │
│  Example: Using zip code to guess race  │
│                                         │
│  [Icon: magnifying glass with question] │
└─────────────────────────────────────────┘
```

## Strategy 2: Eliminate Hidden Information

**Original:** Players hold secret evidence cards
**Problem:** Memory load, uncertainty, intimidation

**Simplified:** **Collaborative Investigation**

### New Structure: Everyone Sees Everything

1. **Reveal System Card** → All players read together
2. **Reveal 3 Problem Cards** → Lay them out face-up
3. **Group Discussion** → "Which problem do you see?"
4. **Vote Together** → Match problems to types
5. **Learn Together** → Check answer, discuss

**Advantages:**
- No one feels "wrong" alone
- Natural conversation emerges
- Lower pressure = more participation

## Strategy 3: Use Visual Pattern Matching

**Original:** Reading comprehension, abstract matching
**Simplified:** Visual + minimal text

### Visual Language System

**BAD START** problems always show:
- 📚 Book/history icon
- Arrow pointing backward (past → present)
- Multiple similar examples over time

**WRONG MEASURING** problems always show:
- 📏 Ruler/measuring icon  
- Single number highlighted
- "Good at X but bad at Y" contrast

**SNEAKY SHORTCUTS** problems always show:
- 🎭 Mask/disguise icon
- Indirect path diagram
- "Looks like A, actually B" structure

## Strategy 4: Discussion Prompts Instead of Arguments

**Original:** Players debate competing claims
**Problem:** Confrontational, requires confidence

**Simplified:** Structured reflection rounds

### New Discussion Structure

**Round 1: OBSERVE** (1 minute silent)
- Look at the cards
- What patterns do you notice?

**Round 2: WONDER** (2 minutes sharing)
- "I wonder why..." questions only
- No answers, just curiosity
- Example: "I wonder why the AI scored names differently"

**Round 3: CONNECT** (2 minutes)
- Which TYPE card feels related?
- What real-world examples come to mind?

**Round 4: COMMIT** (vote together)
- Everyone points to the TYPE card they think fits
- Discuss any differences

## Strategy 5: Scaffolding with Examples First

**Before playing with AI systems, warm up with:**

### Pre-Game: "Bias Detectives Training" (10 minutes)

**Exercise 1: Spot the Pattern**
```
The vending machine at school is too high.
Shorter students can't reach it.

Question: Was this intentional?
Answer: Probably not—designers just didn't think about all users.

This is WRONG MEASURING: The "success" was "dispenses snacks"
not "everyone can get snacks"
```

**Exercise 2: The Echo**
```
A radio station plays songs based on what listeners liked before.
Over time, they only play one genre.
Listeners of other genres leave.
The station says "we play what people want"
but they created this problem themselves.

This is BAD START: The feedback loop amplified early patterns
```

**Exercise 3: The Code Word**
```
A club doesn't allow "people from that neighborhood"
but uses a different excuse each time.
"Dress code" "Members only" "Private event"

This is SNEAKY SHORTCUTS: Finding reasons that seem fair
but hide the real discrimination
```

**Now players have pattern recognition before AI complexity.**

---

# PART 3: Simplified Game Structure

## "BIAS BOUNTY LITE" - Complete Rules

### Components (40 cards total)
- 8 SYSTEM cards (simple scenarios)
- 24 PROBLEM cards (3 per system)
- 8 TYPE cards (3 types + reference)

### Players
3-6 players (no facilitator needed)

### Time
25-35 minutes

### Setup
1. Shuffle SYSTEM cards
2. Place TYPE cards in center as reference
3. Everyone gets a score tracker (paper/pen or tokens)

### Round Structure (5 minutes each)

**1. REVEAL SYSTEM (30 seconds)**
- Flip top SYSTEM card
- Everyone reads silently

**2. REVEAL PROBLEMS (30 seconds)**
- Flip 3 PROBLEM cards for this system
- Lay them out so everyone can see

**3. DISCUSS (2 minutes)**
- Use OBSERVE → WONDER → CONNECT structure
- No one is "the leader"—everyone contributes

**4. MATCH (1 minute)**
- Everyone points to the TYPE card they think matches
- For each PROBLEM, vote on which TYPE fits best

**5. REVEAL & LEARN (1 minute)**
- Flip PROBLEM cards to reveal "TYPE: ___" on back
- Discussion: Were we right? Why/why not?
- Everyone who matched correctly gets 1 point

### Winning
Most points after 6 rounds wins. But: Everyone learns, so everyone wins.

---

# PART 4: Example Round (Full Walkthrough)

## Round 3: LOAN APPROVER AI

### SYSTEM CARD Revealed:
```
┌─────────────────────────────────────────┐
│  LOAN APPROVER AI                       │
│  [Icon: money with checkmark]           │
├─────────────────────────────────────────┤
│  Banks use this AI to decide who gets   │
│  approved for home loans.               │
│                                         │
│  It looks at: income, credit history,   │
│  employment, and other factors.         │
│                                         │
│  Goal: Predict who will pay back loans  │
└─────────────────────────────────────────┘
```

### PROBLEM CARDS Revealed:

**Problem A:**
```
THE PROBLEM

The AI was trained on 20 years of loan decisions.
During those 20 years, banks often rejected
qualified applicants in certain neighborhoods.

Now the AI continues this pattern.

[Icon: calendar going backwards]
```

**Problem B:**
```
THE PROBLEM

The AI rates people as "risky" if they change
jobs frequently. 

But gig workers and freelancers change jobs
by nature of their work—they're not unreliable.

[Icon: person with question mark, briefcase]
```

**Problem C:**
```
THE PROBLEM

The AI doesn't ask about race.
But it charges higher rates in certain zip codes.

Those zip codes have mostly Black and Latino
residents. The pattern matches racial lines.

[Icon: map with different zones]
```

### TYPE CARDS in Center:
```
BAD START          WRONG MEASURING     SNEAKY SHORTCUTS
📚                 📏                   🎭
"The AI learned   "The AI measures     "The AI finds
from biased       success in a        hidden ways to
times"            limited way"         discriminate"
```

### DISCUSSION PHASE:

**Player A:** "I notice Problem A mentions history—20 years of decisions. That sounds like BAD START."

**Player B:** "Problem B is about how they measure 'reliable'—gig workers are reliable but measured as risky. That's WRONG MEASURING."

**Player C:** "Problem C is tricky. They don't ask about race but the results match race anyway. That's a SNEAKY SHORTCUT."

### VOTING PHASE:
- Problem A: Everyone agrees → BAD START
- Problem B: Everyone agrees → WRONG MEASURING  
- Problem C: Mixed opinions → Discussion continues

**Player D:** "Wait, couldn't C also be BAD START? The historical redlining created the zip code pattern?"

**Group realizes:** Multiple types can apply! Both SNEAKY SHORTCUT and BAD START contribute.

### REVEAL:
Cards flipped:
- Problem A: BAD START ✓
- Problem B: WRONG MEASURING ✓
- Problem C: SNEAKY SHORTCUTS (also BAD START noted as contributing)

### LEARNING MOMENT:
"Real bias is often layered. This is why fixing AI is hard—one fix might not be enough."

---

# PART 5: Comparison Table

| Aspect | Original Bias Bounty | Bias Bounty Lite |
|--------|---------------------|------------------|
| **Time** | 45-60 min | 25-35 min |
| **Cards** | 120+ | 40 |
| **Bias Types** | 6-7 technical | 3 intuitive |
| **Hidden Info** | Yes (competitive) | No (collaborative) |
| **Player Roles** | Complex | None |
| **Winning** | Individual points | Individual, but group learns |
| **Debate Style** | Argumentative | Curiosity-driven |
| **Examples** | All AI | Warm-up with real-world |
| **Audience** | Ages 16+, technical | Ages 12+, general |

---

# Summary: Core Simplification Principles

1. **Three Types Only:** BAD START, WRONG MEASURING, SNEAKY SHORTCUTS
2. **Everything Visible:** No hidden cards, investigate together
3. **Warm-Up First:** Non-AI examples build pattern recognition
4. **Visual Language:** Icons and layout teach the types
5. **Structured Discussion:** OBSERVE → WONDER → CONNECT → COMMIT
6. **Human First:** Every problem shows WHO was affected
7. **Layered Learning:** Multiple answers can be right

**Result:** Same core insight (bias is patterned and fixable) without intimidating complexity.
