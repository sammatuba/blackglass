# Risk Assessment Protocol: Quick Reference

## 5-Minute Assessment Checklist

### Foundation Alignment
- [ ] **UNESCO:** Human agency, ethics, techniques, design → 4/6 competencies
- [ ] **OECD:** All 5 principles covered → ✅ 100%
- [ ] **NIST:** Map, Measure, Manage, Govern → ⚠️ Shallow depth
- [ ] **EU:** 7 Trustworthy AI requirements → 93% coverage

### Game Loop
- [ ] **Clear loop:** System → MAP → MEASURE → MANAGE → GOVERN → Results
- [ ] **Meaningful decisions:** Multi-select risk identification
- [ ] **Immediate feedback:** Score displayed
- [ ] **Recovery:** None - linear progression ⚠️

### Systems (Scenarios)
- [ ] **Count:** 6 systems (target: 15+) ❌
- [ ] **Domains:** 6 domains covered (target: 10+) ⚠️
- [ ] **Risk tiers:** 3/4 EU tiers represented ⚠️
- [ ] **Consequences:** Score only (no stories) ❌

### Engagement
- [ ] **Progression:** System counter 1/6
- [ ] **Concepts:** 6 concepts taught
- [ ] **Narrative:** None ❌
- [ ] **Replayability:** Low - same systems ❌

### Technical
- [ ] **Offline:** ✅ Works offline
- [ ] **Mobile:** ✅ Responsive
- [ ] **Keyboard:** ⚠️ Partial support
- [ ] **Load time:** ✅ < 3 seconds

---

## Priority Quick Reference

### 🔴 Critical (Fix in v1.1)
| ID | Issue | Quick Fix |
|----|-------|-----------|
| CR-001 | Only 6 systems | Add 9 more systems |
| CR-002 | No consequences | Add impact stories |
| CR-003 | No difficulty | Add Easy/Normal/Expert |

### 🟡 Important (Fix in v1.2)
| ID | Issue | Quick Fix |
|----|-------|-----------|
| IMP-001 | No quizzes | Add 2-3 questions per system |
| IMP-002 | Static order | Shuffle systems array |
| IMP-003 | Weak feedback | Show correct/incorrect |

### 🟢 Enhancement (v1.3)
| ID | Issue | Quick Fix |
|----|-------|-----------|
| ENH-001 | No story | Add client personas |
| ENH-002 | Single player | Add compare mode |
| ENH-003 | Accessibility | Add ARIA labels |

---

## File Structure

```
demos/risk-assessment-protocol/
├── EVALUATION_REPORT.md          # This evaluation
├── IMPROVEMENT_TRACKING.md       # Progress tracking
├── QUICK_REFERENCE.md            # This file
├── evaluation-backup/            # Original files
│   ├── app.js
│   ├── index.html
│   └── styles.css
└── web-vanilla/
    ├── index.html
    ├── app.js
    └── styles.css
```

---

## Quick Commands

```bash
# View evaluation
cat EVALUATION_REPORT.md

# View tracking
cat IMPROVEMENT_TRACKING.md

# Check current score
grep "Overall Score" EVALUATION_REPORT.md

# List pending items
grep "🔴 Pending" IMPROVEMENT_TRACKING.md
```

---

## Framework Alignment Summary

| Framework | Coverage | Status |
|-----------|----------|--------|
| UNESCO AI CFS | 67% | ⚠️ Needs improvement |
| OECD Principles | 100% | ✅ Complete |
| NIST AI RMF | 75% | ⚠️ Needs depth |
| Council of Europe | 67% | ⚠️ Tech dimension weak |
| EU Ethics Guidelines | 93% | ✅ Strong |
| EU AI Act | 75% | ⚠️ Missing unacceptable tier |

---

## Domain Coverage Matrix

| Domain | Current | Target | Status |
|--------|---------|--------|--------|
| Healthcare | ✅ | ✅ | Complete |
| Finance | ✅ | ✅ | Complete |
| Employment | ✅ | ✅ | Complete |
| Customer Service | ✅ | ✅ | Complete |
| Content/Social | ✅ | ✅ | Complete |
| Utility | ✅ | ✅ | Complete |
| Criminal Justice | ❌ | ✅ | **Missing** |
| Education | ❌ | ✅ | **Missing** |
| Transportation | ❌ | ✅ | **Missing** |
| Environment | ❌ | ✅ | **Missing** |
| Creative | ❌ | ✅ | **Missing** |

---

## Scoring Reference

### Current Scoring
- Each correct selection: +25 points
- Max per phase: 100 points (4 correct)
- Max per system: 400 points
- Game max: 2400 points (6 systems)

### Rating Thresholds
| Score | Rating |
|-------|--------|
| 90%+ | 🏆 Risk Management Expert |
| 70-89% | ⭐ Compliance Professional |
| 50-69% | 🔍 Risk Analyst |
| <50% | 📚 Trainee Assessor |

---

## Quick Wins (< 1 hour each)

1. **Add keyboard navigation** - Add arrow key support
2. **Show progress percentage** - Add to header
3. **Add EU tier icons** - Visual risk indicators
4. **Improve color contrast** - WCAG AA compliance
5. **Add loading animation** - Smoother transitions

---

## Testing Checklist

Before releasing each version:

- [ ] All systems load correctly
- [ ] Score calculates properly
- [ ] Phase transitions work
- [ ] Results display correctly
- [ ] Final report shows
- [ ] Reset works
- [ ] Mobile responsive
- [ ] Keyboard accessible
- [ ] No console errors

---

*For detailed evaluation, see EVALUATION_REPORT.md*  
*For improvement tracking, see IMPROVEMENT_TRACKING.md*
