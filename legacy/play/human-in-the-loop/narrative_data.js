// ========================================
// Narrative Framework Data (ENH-001)
// ========================================

const NARRATIVE_DATA = {
  title: "AI Ethics Certification Program",
  subtitle: "Train to become a certified AI Systems Oversight Specialist",
  
  mentor: {
    name: "Dr. Maya Chen",
    title: "Senior AI Ethics Researcher",
    avatar: "🧑‍🔬",
    quotes: {
      welcome: "Welcome to the AI Ethics Certification Program. I'm Dr. Maya Chen, and I'll be guiding you through this training. Your decisions today will determine whether you earn the certification.",
      level1_start: "Level 1: Customer Service & Operations. These are lower-stakes scenarios where AI typically performs well. Learn to recognize when AI is genuinely helpful.",
      level2_start: "Level 2: Healthcare & Finance. The stakes are higher now. Medical diagnoses and financial decisions require careful judgment. Remember: high stakes demand careful oversight.",
      level3_start: "Level 3: Justice & Safety. These are the highest-stakes decisions. Criminal justice and physical safety require the utmost vigilance. Human oversight is critical.",
      correct_decision: "Excellent judgment! You're developing the instincts of a skilled AI overseer.",
      incorrect_decision: "That decision had unexpected consequences. Let's learn from this and continue.",
      automation_bias_warning: "Be careful of automation bias—the tendency to over-rely on AI. Always verify when stakes are high.",
      final_encouragement: "You're showing great promise. Keep questioning, keep learning, and always prioritize human values.",
      certification_earned: "Congratulations! You've earned your AI Ethics Certification. Welcome to the community of AI oversight professionals.",
      certification_failed: "You didn't quite meet the certification standards this time. Review the concepts and try again—you'll get there!"
    }
  },
  
  levels: [
    {
      id: 1,
      name: "Foundation",
      subtitle: "Customer Service & Operations",
      icon: "🛎️",
      description: "Low-stakes environments where AI excels at routine tasks.",
      stakes: "low",
      scenarioCount: 3,
      color: "#10B981",
      introText: "Welcome to Level 1. In customer service and operations, AI systems handle routine pattern-matching tasks. Your job is to learn when to trust the AI and when human judgment adds value.",
      scenarioTypes: ["Customer Service", "Security", "Content"]
    },
    {
      id: 2,
      name: "Advanced",
      subtitle: "Healthcare & Finance",
      icon: "🏥",
      description: "High-stakes domains requiring careful risk assessment.",
      stakes: "medium",
      scenarioCount: 4,
      color: "#F59E0B",
      introText: "Level 2 introduces higher stakes. In healthcare and finance, errors have serious consequences. You'll need to balance AI efficiency with human oversight. Remember: context matters.",
      scenarioTypes: ["Medical", "Finance", "Research", "Education"]
    },
    {
      id: 3,
      name: "Expert",
      subtitle: "Justice & Safety",
      icon: "⚖️",
      description: "Life-impacting decisions where human oversight is paramount.",
      stakes: "high",
      scenarioCount: 3,
      color: "#EF4444",
      introText: "Final Level: Justice and Safety. These decisions affect lives, liberty, and human dignity. The AI can assist, but human judgment must prevail. This is what it means to be Human-in-Command.",
      scenarioTypes: ["Legal", "Transportation", "Hiring"]
    }
  ],
  
  storyArc: {
    prologue: {
      title: "Your Mission",
      content: `The year is 2026. AI systems are everywhere—making decisions about healthcare, finance, justice, and safety. Organizations desperately need trained professionals who can oversee these systems, catch their errors, and ensure they serve human values.

You've been selected for the prestigious AI Ethics Certification Program. Over the next hour, you'll face realistic scenarios where AI recommendations may be correct, biased, hallucinated, or dangerous.

Your trainer, Dr. Maya Chen, has prepared 10 scenarios across three difficulty levels. To earn certification, you must demonstrate:
• Appropriate trust calibration
• Recognition of AI limitations
• Human-in-Command decision making
• Understanding of AI bias and fairness

Are you ready to begin your journey?`
    },
    
    epilogue_success: {
      title: "Certification Earned",
      content: `You've done it. Through careful analysis, appropriate skepticism, and human-centered judgment, you've earned your AI Ethics Certification.

The scenarios you navigated today were based on real cases—hiring algorithms that discriminated, medical AIs that hallucinated, risk assessments that perpetuated injustice. You proved that you can spot these issues and take corrective action.

As a certified AI Systems Oversight Specialist, you'll be part of a growing community of professionals ensuring that AI serves humanity rather than harms it. The machines are powerful, but they are tools. You are the decision-maker.

Welcome to the future of responsible AI.

— Dr. Maya Chen`
    },
    
    epilogue_failure: {
      title: "Continue Your Training",
      content: `You didn't meet the certification threshold this time—but this is a learning journey, not a single test.

The scenarios you faced today were challenging by design. Real AI systems make mistakes that have real consequences. The fact that you're here, learning, shows you understand the importance of this work.

Review the concepts, practice the scenarios again, and remember: every expert was once a beginner. Dr. Chen will be here when you're ready to try again.

The AI future needs careful human oversight. Keep learning.`
    }
  },
  
  progressMilestones: [
    { scenario: 0, event: "welcome" },
    { scenario: 0, event: "level1_start" },
    { scenario: 3, event: "level2_start" },
    { scenario: 7, event: "level3_start" },
    { scenario: 9, event: "final_encouragement" }
  ]
};

// Get current level based on scenario index
function getCurrentLevel(scenarioIndex) {
  if (scenarioIndex < 3) return NARRATIVE_DATA.levels[0];
  if (scenarioIndex < 7) return NARRATIVE_DATA.levels[1];
  return NARRATIVE_DATA.levels[2];
}

// Get mentor quote based on context
function getMentorQuote(context, isCorrect = null) {
  const mentor = NARRATIVE_DATA.mentor;
  
  if (context === 'decision_feedback' && isCorrect !== null) {
    return isCorrect ? mentor.quotes.correct_decision : mentor.quotes.incorrect_decision;
  }
  
  return mentor.quotes[context] || mentor.quotes.welcome;
}

// Check for milestone events
function checkMilestone(scenarioIndex) {
  const milestone = NARRATIVE_DATA.progressMilestones.find(m => m.scenario === scenarioIndex);
  return milestone ? milestone.event : null;
}
