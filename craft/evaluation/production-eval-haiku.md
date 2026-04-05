# DISINFO — Production Feasibility & Market Viability Evaluation

**Evaluator:** Claude Haiku (Production & Market Viability Specialist)
**Score:** 6.5/10 — Greenlit with scope reductions needed

---

## Summary

DISINFO is a genuinely interesting concept with real market potential, but the current design document describes an 18-month project being pitched as a 6-month one. The multi-agent narrative pipeline is the most technically unproven element and carries the highest schedule risk.

---

## Key Findings

### Timeline
Full scope as documented is **14–18 months** for a team of 3–5 people. This is not a soft estimate — it reflects the true complexity of the state machine, QA burden, and pipeline validation work.

### MVP Recommendation: Ship Maya (Target) Only
The four-persona structure is elegant on paper but adds compounding QA surface area. **Ship the Target persona (Maya) as the MVP.** This validates the core loop — phone-as-world, feed curation, verification mechanic — before committing to the full cast.

### Multi-Agent Pipeline: Unproven at This Scale
The multi-agent content generation pipeline is the riskiest technical bet. It has not been validated at production volume. Budget a dedicated 4–6 week spike before locking content architecture.

### State Machine Complexity Underestimated
The design document describes a branching state machine as if it were a linear flowchart. Cross-state dependencies will cause regressions. Estimate 2× the QA time currently budgeted for state transitions alone.

### Cross-Persona Connections Double QA Burden
Every connection between personas (shared content, call-outs, overlapping timelines) is a regression risk. Each one requires testing in all affected states across all persona paths. Keep cross-connections minimal in v1.

### Browser Verification Mechanic
The browser verification mechanic as described needs **2–3 additional weeks of UX design and prototyping** before it can be specced for engineering. It's currently a sketch, not a design.

### Realistic Team Size
3–5 people (1 narrative lead, 1 engineer, 1 QA, 1 producer, optional 1 artist). Do not attempt this with fewer than 3 full-time contributors.

---

## Recommendation

Greenlight with conditions:
1. Reduce v1 scope to Maya (Target) only
2. Run pipeline spike before locking architecture
3. Revise timeline to 9–12 months for single-persona MVP
4. Defer cross-persona connections to v1.1
