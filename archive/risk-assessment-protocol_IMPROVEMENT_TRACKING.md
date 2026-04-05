# Risk Assessment Protocol: Improvement Tracking

**Project:** Risk Assessment Protocol Demo  
**Baseline Version:** 1.0  
**Target Version:** 1.3  
**Last Updated:** February 6, 2026  

---

## Quick Status Dashboard

| Version | Items | Status | Score Target |
|---------|-------|--------|--------------|
| v1.1 Critical | 3 | ✅ Complete | 6.5 → 7.5 (+1.0) |
| v1.2 Important | 3 | 🔴 Pending | 7.5 → 8.2 |
| v1.3 Enhancement | 3 | 🔴 Pending | 8.2 → 8.5 |

**Current Overall Score:** 6.5/10  
**Target Overall Score:** 8.5/10

---

## v1.1 Critical Priority Items

### CR-001: Expand System Pool to 15+ Systems

**Status:** ✅ Complete  
**Priority:** Critical  
**Estimated Effort:** 4 hours  
**Score Impact:** +0.4

**Description:**
Current demo has only 6 systems. Need to expand to at least 15 systems covering all major risk domains and EU AI Act categories.

**New Systems to Add:**

| ID | System | Domain | Risk Tier | Key Risks |
|----|--------|--------|-----------|-----------|
| 7 | Criminal Risk Assessment | Justice | High | Bias, due process |
| 8 | University Admission AI | Education | High | Fairness, transparency |
| 9 | Autonomous Vehicle | Transportation | High | Safety, liability |
| 10 | Energy Grid Optimizer | Environment | High | Critical infrastructure |
| 11 | AI Art Generator | Creative | Limited | Copyright, attribution |
| 12 | Facial Recognition | Security | Unacceptable/High | Privacy, consent |
| 13 | Insurance Underwriting | Finance | High | Discrimination |
| 14 | Tenant Screening | Housing | High | Housing discrimination |
| 15 | Exam Proctoring | Education | High | Privacy, false positives |

**Acceptance Criteria:**
- [ ] 15 complete system definitions
- [ ] Each system has correctAnswers for all 4 phases
- [ ] Covers all 4 EU AI Act risk tiers
- [ ] Includes at least 3 new domains (Justice, Education, Transportation)
- [ ] Systems have varied complexity levels

**Files to Modify:**
- `app.js` - Add new systems to SYSTEMS array
- Update OPTIONS if new risk types needed
- Update STAKEHOLDERS if needed

---

### CR-002: Add Consequence Visualization

**Status:** ✅ Complete  
**Priority:** Critical  
**Estimated Effort:** 3 hours  
**Score Impact:** +0.3

**Description:**
Add real-world consequence stories that show the impact of risk management decisions on stakeholders.

**Implementation Details:**

Add `consequences` object to each system:
```javascript
consequences: {
  excellent: "All risks properly managed. Stakeholders protected.",
  good: "Most risks addressed. Minor issues remain.",
  poor: "Critical risks missed. Harm to stakeholders occurred.",
  bad: "Severe oversight failures. Significant harm."
}
```

**Stakeholder Impact Stories:**
- Hiring: Show impact on rejected candidates
- Medical: Show patient outcomes
- Credit: Show financial impact on applicants
- Content: Show mental health impacts

**Acceptance Criteria:**
- [ ] Consequence display in results screen
- [ ] Color-coded by performance level
- [ ] Stakeholder-specific impact stories
- [ ] Minimum 2 consequence variants per system

**Files to Modify:**
- `app.js` - Add consequences to SYSTEMS, update showResults()
- `styles.css` - Add consequence visualization styles

---

### CR-003: Implement Adaptive Difficulty

**Status:** ✅ Complete  
**Priority:** Critical  
**Estimated Effort:** 3 hours  
**Score Impact:** +0.3

**Description:**
Add three difficulty levels that adjust based on player performance.

**Difficulty Levels:**

| Level | Description | Modifications |
|-------|-------------|---------------|
| Beginner | Learning mode | Show hints, fewer options, explain choices |
| Standard | Normal play | Current experience |
| Expert | Challenge mode | Time limits, hidden risk tiers, more options |

**Adaptive Logic:**
- Track score across systems
- After 3 systems, adjust difficulty:
  - >80% correct → Increase
  - <50% correct → Decrease

**Acceptance Criteria:**
- [ ] Difficulty selector on start screen
- [ ] Adaptive difficulty adjustment
- [ ] Difficulty indicator in UI
- [ ] Different hint levels per difficulty
- [ ] Expert mode adds time pressure

**Files to Modify:**
- `app.js` - Add difficulty system
- `index.html` - Add difficulty badge
- `styles.css` - Add difficulty indicator styles

---

## v1.2 Important Priority Items

### IMP-001: Add Concept Mastery Quizzes

**Status:** 🔴 Pending  
**Priority:** Important  
**Estimated Effort:** 4 hours  
**Score Impact:** +0.3

**Description:**
Add post-system quizzes to verify learning of NIST RMF and EU AI Act concepts.

**Quiz Structure:**
- 2-3 questions per system
- Multiple choice format
- Immediate feedback
- Must achieve 60% to advance

**Question Types:**
- "Which NIST function involves identifying risks?"
- "What EU AI Act tier requires strict compliance?"
- "Which mitigation strategy provides transparency?"

**Acceptance Criteria:**
- [ ] Quiz data structure
- [ ] Quiz modal UI
- [ ] Progress tracking
- [ ] Pass/fail logic
- [ ] Retry mechanism

**Files to Modify:**
- New: `quiz_data.js`
- `app.js` - Add quiz logic
- `index.html` - Add quiz modal
- `styles.css` - Add quiz styles

---

### IMP-002: Implement System Randomization

**Status:** 🔴 Pending  
**Priority:** Important  
**Estimated Effort:** 2 hours  **Score Impact:** +0.2

**Description:**
Randomize system order and select subset from larger pool to increase replayability.

**Implementation:**
- Shuffle systems array at game start
- Select 8-10 systems from pool of 15
- Ensure good domain distribution

**Acceptance Criteria:**
- [ ] Fisher-Yates shuffle algorithm
- [ ] Configurable number of systems per game
- [ ] No repeats in single game
- [ ] Domain variety enforcement

**Files to Modify:**
- `app.js` - Add shuffleArray(), update startGame()

---

### IMP-003: Enhanced Feedback System

**Status:** 🔴 Pending  
**Priority:** Important  
**Estimated Effort:** 2 hours  
**Score Impact:** +0.2

**Description:**
Improve feedback to show which specific answers were correct/incorrect and why.

**Features:**
- Color-coded selections (green=correct, red=incorrect)
- Explanation for each phase
- Comparison with "ideal" answer
- Learning tip for missed concepts

**Acceptance Criteria:**
- [ ] Visual feedback on selections
- [ ] Per-phase explanations
- [ ] Missed concept identification
- [ ] Educational tips

**Files to Modify:**
- `app.js` - Enhanced showResults()
- `styles.css` - Feedback styling

---

## v1.3 Enhancement Priority Items

### ENH-001: Narrative Framing - Risk Consultant Story

**Status:** 🔴 Pending  
**Priority:** Enhancement  
**Estimated Effort:** 3 hours  
**Score Impact:** +0.1

**Description:**
Add narrative framing where player is a "Risk Management Consultant" helping clients.

**Story Elements:**
- Client introductions
- Project briefings
- Success/failure client reactions
- Career progression (Junior → Senior → Partner)

**Acceptance Criteria:**
- [ ] Client persona for each system
- [ ] Narrative intro/outro screens
- [ ] Career progression tracking
- [ ] Client feedback messages

**Files to Modify:**
- New: `narrative_data.js`
- `app.js` - Integrate narrative
- `styles.css` - Narrative styling

---

### ENH-002: Collaborative Mode

**Status:** 🔴 Pending  
**Priority:** Enhancement  
**Estimated Effort:** 4 hours  
**Score Impact:** +0.1

**Description:**
Add two-player mode where players compare risk assessments and discuss differences.

**Features:**
- Side-by-side comparison
- Discussion prompts
- Consensus building
- Agreement scoring

**Acceptance Criteria:**
- [ ] Two-player selection mode
- [ ] Comparison view
- [ ] Discussion prompts
- [ ] Agreement metrics

**Files to Modify:**
- New: `collaborative_mode.js`
- `index.html` - Add collaborative UI
- `styles.css` - Collaborative styles

---

### ENH-003: Accessibility Improvements

**Status:** 🔴 Pending  
**Priority:** Enhancement  
**Estimated Effort:** 2 hours  
**Score Impact:** +0.1

**Description:**
Add comprehensive accessibility features.

**Features:**
- ARIA labels for all interactive elements
- Keyboard navigation support
- High contrast mode
- Screen reader announcements
- Focus indicators

**Acceptance Criteria:**
- [ ] ARIA labels throughout
- [ ] Full keyboard navigation
- [ ] High contrast theme
- [ ] Screen reader tested
- [ ] Focus management

**Files to Modify:**
- `index.html` - Add ARIA attributes
- `app.js` - Add keyboard handling
- `styles.css` - Add high contrast theme

---

## Progress Log

| Date | Version | Item | Status | Notes |
|------|---------|------|--------|-------|
| 2026-02-06 | Baseline | Evaluation Complete | ✅ | Score: 6.5/10 |
| 2026-02-06 | v1.1 | CR-001 - 15 Systems | ✅ | 3003 combinations |
| 2026-02-06 | v1.1 | CR-002 - Consequences | ✅ | 60 stories added |
| 2026-02-06 | v1.1 | CR-003 - Difficulty | ✅ | 3 levels + adaptive |
| 2026-02-06 | v1.1 | Release Complete | ✅ | Score: 7.5/10 |

---

## Success Metrics

### Before/After Targets

| Metric | v1.0 | v1.1 | v1.2 | v1.3 |
|--------|------|------|------|------|
| Overall Score | 6.5 | 7.5 ✅ | 8.2 | 8.5 |
| Systems Count | 6 | 15 ✅ | 15 | 15 |
| Concepts Taught | 6 | 10 ✅ | 10 | 10 |
| Replayability | Low | High ✅ | High | High |
| Framework Coverage | 75% | 85% ✅ | 90% | 90% |

### Feature Completeness

| Category | v1.0 | v1.1 | v1.2 | v1.3 |
|----------|------|------|------|------|
| Single Player | ✅ | ✅ | ✅ | ✅ |
| Adaptive Difficulty | ❌ | ✅ | ✅ | ✅ |
| Consequences | ❌ | ✅ | ✅ | ✅ |
| Quizzes | ❌ | ❌ | ✅ | ✅ |
| Randomization | ❌ | ❌ | ✅ | ✅ |
| Narrative | ❌ | ❌ | ❌ | ✅ |
| Collaborative | ❌ | ❌ | ❌ | ✅ |
| Accessibility | ⚠️ | ⚠️ | ⚠️ | ✅ |

---

## Change Request Process

To add new improvement items:

1. **Propose:** Add to "Pending Items" section
2. **Review:** Assess priority and effort
3. **Schedule:** Assign to version
4. **Implement:** Move to "In Progress"
5. **Verify:** Test and document
6. **Close:** Mark complete, update metrics

---

*Last Updated: February 6, 2026*
