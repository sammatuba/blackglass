# Evaluation Framework

A systematic framework for evaluating and improving AI literacy teaching tools.

---

## Quick Assessment (5 minutes)

### 1. Foundation Check
- [ ] UNESCO: Does it teach human agency, ethics, techniques, design?
- [ ] OECD: Does it cover all 5 principles (growth, human values, transparency, safety, accountability)?
- [ ] NIST: Can players map context, measure risk, manage decisions, govern trust?
- [ ] EU: Are all 7 Trustworthy AI requirements addressed?

### 2. Game Loop Check
- [ ] Core loop: Input → Decision → Feedback → Progress?
- [ ] Decisions meaningful (not obvious)?
- [ ] Feedback immediate and educational?
- [ ] Can players recover from mistakes?

### 3. Scenario Check
- [ ] At least 10 scenarios?
- [ ] Different domains (health, finance, justice, etc.)?
- [ ] Mix of AI-correct and AI-wrong cases?
- [ ] Consequences shown to players?

### 4. Engagement Check
- [ ] Progression system?
- [ ] Concepts tracked/unlocked?
- [ ] Story or narrative framing?
- [ ] Would players replay?

### 5. Technical Check
- [ ] Works offline?
- [ ] Mobile-friendly?
- [ ] Keyboard shortcuts?
- [ ] Loads quickly (< 3 seconds)?

---

## Priority Classification

### Critical (Fix First)
Missing framework alignment, no feedback mechanism, broken core loop, no learning objectives met, technical blockers.

### Important (Fix Soon)
Limited replayability, no difficulty options, missing assessment/quizzes, no collaboration, poor mobile experience.

### Enhancement (Nice to Have)
Narrative framing, sandbox modes, accessibility features, leaderboards, achievements.

---

## Common Improvements by Type

**Decision-Making Games** (e.g., Human-in-the-Loop):
- Critical: Consequence visualization, multiple difficulty levels, concept mastery quizzes
- Important: Collaborative mode, time pressure, scenario randomization
- Enhancement: Narrative framing, sandbox mode

**Detection Games** (e.g., Hallucination Hunt):
- Critical: Progressive difficulty, clear feedback on misses, multiple example types
- Important: Hint system, practice mode, performance tracking
- Enhancement: Competitive mode, certification path

**Investigation Games** (e.g., Bias Bounty):
- Critical: Clear investigation mechanics, multiple patterns, evidence linking
- Important: Team collaboration, case variety, hint system
- Enhancement: Custom cases, narrative wrapper

---

## Full Evaluation Framework

### Phase 1: Foundation Alignment

#### UNESCO AI Competency Framework

| Dimension | Competency | Evidence | Status |
|-----------|------------|----------|--------|
| Human-Centred Mindset | Understand and assert human agency | | ⬜ Complete / ⬜ Partial / ⬜ Missing |
| Human-Centred Mindset | Recognize AI impact on human rights | | ⬜ Complete / ⬜ Partial / ⬜ Missing |
| Ethics of AI | Identify ethical dilemmas | | ⬜ Complete / ⬜ Partial / ⬜ Missing |
| Ethics of AI | Safe and responsible use | | ⬜ Complete / ⬜ Partial / ⬜ Missing |
| AI Techniques | Understand limitations | | ⬜ Complete / ⬜ Partial / ⬜ Missing |
| AI Techniques | Recognize probabilistic nature | | ⬜ Complete / ⬜ Partial / ⬜ Missing |
| AI System Design | Problem-solving with AI | | ⬜ Complete / ⬜ Partial / ⬜ Missing |

#### OECD AI Principles

| Principle | Evidence | Status |
|-----------|----------|--------|
| Inclusive Growth | | ⬜ Covered / ⬜ Missing |
| Human-Centred Values | | ⬜ Covered / ⬜ Missing |
| Transparency | | ⬜ Covered / ⬜ Missing |
| Robustness/Safety | | ⬜ Covered / ⬜ Missing |
| Accountability | | ⬜ Covered / ⬜ Missing |

#### NIST AI Risk Management Framework

| Function | Game Translation | Quality |
|----------|------------------|---------|
| MAP (Context) | | /5 |
| MEASURE (Analysis) | | /5 |
| MANAGE (Mitigation) | | /5 |
| GOVERN (Culture) | | /5 |

#### EU Ethics Guidelines (7 Trustworthy AI Requirements)

| Requirement | Evidence | Status |
|-------------|----------|--------|
| Human Agency & Oversight | | ⬜ Covered / ⬜ Missing |
| Technical Robustness | | ⬜ Covered / ⬜ Missing |
| Privacy & Data Governance | | ⬜ Covered / ⬜ Missing |
| Transparency | | ⬜ Covered / ⬜ Missing |
| Diversity & Fairness | | ⬜ Covered / ⬜ Missing |
| Societal Well-being | | ⬜ Covered / ⬜ Missing |
| Accountability | | ⬜ Covered / ⬜ Missing |

### Phase 2: Game Design Evaluation

#### Core Game Loop
```
[Input] → [Process] → [Output] → [Feedback] → [Loop]
```
- [ ] Loop clear and intuitive?
- [ ] Meaningful decisions at each step?
- [ ] Feedback immediate and informative?
- [ ] Loop supports learning objectives?

#### Decision Space

| Aspect | Current | Ideal | Gap |
|--------|---------|-------|-----|
| Decision options | | | |
| Information available | | | |
| Consequence visibility | | | |
| Retry/recovery | | | |

#### Scenario Diversity
- [ ] Healthcare  - [ ] Finance  - [ ] Criminal Justice
- [ ] Employment  - [ ] Education  - [ ] Transportation
- [ ] Content Moderation  - [ ] Privacy  - [ ] Environment

#### Gamification Mechanics

| Mechanic | Pedagogical Value | Engagement Value |
|----------|-------------------|------------------|
| Points/Scoring | /5 | /5 |
| Progression | /5 | /5 |
| Collection | /5 | /5 |
| Feedback | /5 | /5 |
| Mastery | /5 | /5 |
| Narrative | /5 | /5 |

### Phase 3: Technical Review

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Initial load | < 100KB | | |
| Offline capable | Yes | | |
| Keyboard navigation | Full | | |
| Screen reader support | ARIA | | |
| Mobile responsive | Yes | | |

### Phase 4: Issue Identification

| Priority | Issue | Impact |
|----------|-------|--------|
| Critical | | |
| Important | | |
| Enhancement | | |

### Phase 5: Improvement Recommendations

For each item, document:
- Rationale
- Implementation notes
- Acceptance criteria

### Phase 6: Documentation

After evaluation, produce:
- Evaluation report with scores
- Improvement tracking with priorities
- Implementation summary after each release

### Phase 7: Implementation Workflow

1. Document current state → 2. Prioritize → 3. Implement critical → 4. Implement important → 5. Enhancements → 6. Document & release

---

## Metrics

| Metric | Target |
|--------|--------|
| Scenarios | 15+ |
| Concepts | 8+ |
| Framework Coverage | 90%+ |
| Overall Score | 8.5+/10 |

## Framework Sources

| Framework | Location |
|-----------|----------|
| UNESCO, OECD, NIST, CoE, EU | `research/ai-literacy-safety-standards.md` |
| Gamification Best Practices | `research/gamified-ai-literacy-education.md` |

---

## Reference: Human-in-the-Loop Results

| Phase | Items | Time | Impact |
|-------|-------|------|--------|
| v1.1 Critical | 3 | 6 hrs | +0.6 |
| v1.2 Important | 3 | 6 hrs | +0.3 |
| v1.3 Enhancement | 1 | 2 hrs | +0.1 |
| **Total** | **7** | **14 hrs** | **+1.0 (8.0 → 9.0)** |
