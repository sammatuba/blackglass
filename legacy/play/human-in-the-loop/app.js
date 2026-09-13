/**
 * Human-in-the-Loop - Refined Game Logic
 * Learn about automation bias, contextual risk, and appropriate trust
 * 
 * Scenarios and concepts are loaded from scenarios.json for maintainability
 * and framework alignment documentation.
 */

// ========================================
// Game Data (embedded for file:// protocol compatibility)
// In production, this would be loaded from scenarios.json
// ========================================

const GAME_DATA = {
  "metadata": {
    "version": "2.0",
    "lastUpdated": "2026-02-05",
    "frameworks": {
      "unesco": "AI Competency Framework for Students",
      "oecd": "OECD AI Principles",
      "nist": "AI Risk Management Framework (RMF 1.0)",
      "eu": "Ethics Guidelines for Trustworthy AI",
      "coe": "Council of Europe AI Literacy Framework"
    }
  },
  "concepts": {
    "automationBias": {
      "id": "automationBias",
      "name": "Automation Bias",
      "icon": "🤖",
      "definition": "The tendency to over-rely on automated systems, leading to errors when the AI is wrong.",
      "realWorld": "Pilots who trust GPS over their own eyes, doctors who accept AI diagnoses without review.",
      "howToSpot": "You feel uncomfortable disagreeing with the AI, even when you have doubts.",
      "frameworks": {
        "oecd": "Human-Centred Values and Fairness - Principle 1.2",
        "nist": "Govern function - Human oversight",
        "eu": "Human Agency & Oversight requirement",
        "coe": "Human Dimension - Agency and oversight"
      }
    },
    "contextualRisk": {
      "id": "contextualRisk",
      "name": "Contextual Risk Assessment",
      "icon": "⚖️",
      "definition": "Evaluating the stakes of a decision to determine appropriate oversight level.",
      "realWorld": "A spam filter mistake is low-risk; a medical diagnosis mistake is high-risk.",
      "howToSpot": "Ask: 'What happens if the AI is wrong? Can we recover?'",
      "frameworks": {
        "nist": "MAP function - Context establishment",
        "eu": "Risk-based approach (AI Act)",
        "oecd": "Robustness, Security, and Safety - Principle 1.4"
      }
    },
    "trainingDataBias": {
      "id": "trainingDataBias",
      "name": "Training Data Bias",
      "icon": "📊",
      "definition": "AI learns patterns from historical data, including historical prejudices.",
      "realWorld": "Hiring AIs that penalize career gaps (often women), facial recognition that fails on dark skin.",
      "howToSpot": "Ask: 'Who was represented in the training data? What groups might be missing?'",
      "frameworks": {
        "unesco": "Ethics of AI - Bias recognition",
        "oecd": "Human-Centred Values and Fairness",
        "eu": "Diversity & Fairness requirement",
        "nist": "Measure function - Bias assessment"
      }
    },
    "proxyVariables": {
      "id": "proxyVariables",
      "name": "Proxy Variables",
      "icon": "🔍",
      "definition": "When you remove a biased variable (like race), the AI finds proxies (like zip code) that correlate with it.",
      "realWorld": "Credit scores using zip code as a proxy for socioeconomic status and race.",
      "howToSpot": "The AI claims to be 'neutral' but outcomes still disadvantage certain groups.",
      "frameworks": {
        "eu": "Diversity & Fairness - Indirect discrimination",
        "oecd": "Human-Centred Values - Fairness",
        "coe": "Human Dimension - Non-discrimination"
      }
    },
    "aiHallucination": {
      "id": "aiHallucination",
      "name": "AI Hallucination",
      "icon": "👻",
      "definition": "AI generates confident-sounding but false information, including fake citations and fabricated facts.",
      "realWorld": "Lawyers submitting AI-generated briefs with fake case citations. Researchers citing non-existent papers.",
      "howToSpot": "Check specific claims, citations, and data points independently.",
      "frameworks": {
        "nist": "Measure function - Accuracy validation",
        "dec": "Critical Thinking and Judgment - Hallucination Detection",
        "eu": "Technical Robustness - Reliability"
      }
    },
    "confidenceVsAccuracy": {
      "id": "confidenceVsAccuracy",
      "name": "Confidence ≠ Accuracy",
      "icon": "🎯",
      "definition": "AI expresses high confidence even when wrong. Confidence is not a reliable indicator of correctness.",
      "realWorld": "Facial recognition systems with 99% confidence that are wrong, medical AIs confidently misdiagnosing.",
      "howToSpot": "Treat high confidence as marketing, not evidence of correctness.",
      "frameworks": {
        "nist": "Measure function - Calibration",
        "dec": "Critical Thinking - Confidence interpretation",
        "unesco": "AI Techniques - Understanding limitations"
      }
    },
    "contextualBlindness": {
      "id": "contextualBlindness",
      "name": "Contextual Blindness",
      "icon": "🔲",
      "definition": "AI processes keywords and patterns but lacks real-world context and common sense.",
      "realWorld": "Content moderation flagging educational discussions about extremism as extremist content.",
      "howToSpot": "The AI decision makes sense at a surface level but fails with deeper context.",
      "frameworks": {
        "eu": "Transparency - Explainability limitations",
        "coe": "Technological Dimension - Understanding AI limitations",
        "dec": "Understanding AI and Data - Pattern vs meaning"
      }
    },
    "appropriateTrust": {
      "id": "appropriateTrust",
      "name": "Appropriate Trust",
      "icon": "🤝",
      "definition": "Calibrating trust based on the AI's track record, the stakes, and your own expertise.",
      "realWorld": "Trusting spell-check but not letting it rewrite your legal contracts without review.",
      "howToSpot": "Neither blind acceptance nor blanket rejection—evaluate each case.",
      "frameworks": {
        "nist": "Govern function - Trust calibration",
        "oecd": "Human-Centred Values - Appropriate reliance",
        "coe": "Practical Dimension - Informed usage"
      }
    },
    "humanInCommand": {
      "id": "humanInCommand",
      "name": "Human-in-Command",
      "icon": "👤",
      "definition": "The ultimate authority to decide NOT to use an AI system when it's inappropriate.",
      "realWorld": "A judge refusing to use a biased risk assessment tool, a doctor overriding an AI diagnosis.",
      "howToSpot": "You have the right and responsibility to say 'no' to AI assistance.",
      "frameworks": {
        "eu": "Human Agency & Oversight - HIC vs HITL vs HOTL",
        "oecd": "Accountability - Principle 1.5",
        "coe": "Human Dimension - Democratic oversight"
      }
    }
  },
  "scenarios": [
    {
      "id": 1,
      "category": "Customer Service",
      "stakes": 1,
      "title": "Support Ticket Routing",
      "description": "An AI system is routing customer support tickets to the appropriate department. A customer wrote: 'I was charged twice for my subscription this month. Please refund the duplicate charge.'",
      "aiRecommendation": "Route to Billing Department",
      "aiReasoning": "Keywords 'charge,' 'account,' 'refund' detected. Pattern matches 10,000+ previous billing inquiries with 98% accuracy.",
      "aiConfidence": 96,
      "aiIsCorrect": true,
      "aiError": null,
      "correctAction": "accept",
      "conceptTaught": "appropriateTrust",
      "historicalAccuracy": 98,
      "reliability": "reliable",
      "knownIssues": [],
      "investigationClues": [
        { "id": "c1_1", "text": "The customer's account shows two identical charges on the same day.", "cost": 1, "reveals": "confirmation" },
        { "id": "c1_2", "text": "Previous tickets with similar language were all resolved by the Billing team.", "cost": 1, "reveals": "trackRecord" },
        { "id": "c1_3", "text": "The AI has 98% accuracy on billing-related routing.", "cost": 1, "reveals": "performance" }
      ],
      "explanation": "This is a straightforward pattern-matching task where AI excels. The keywords clearly indicate a billing issue, and the AI has strong historical performance in this domain.",
      "whyAccept": "Simple, clear-cut routing decisions with clear keywords are where AI excels. Low stakes, high confidence, and strong track record.",
      "whyOverride": "Not needed here—this is exactly the type of task AI handles well. Override would waste human resources.",
      "frameworks": {
        "nist": "MAP - Low risk context, MEASURE - High accuracy track record",
        "oecd": "Appropriate use case for automation",
        "pedagogicalGoal": "Teach players to recognize when AI is genuinely helpful and efficient"
      }
    },
    {
      "id": 2,
      "category": "Hiring",
      "stakes": 3,
      "title": "Job Candidate Screening",
      "description": "You are a hiring manager reviewing finalists for a senior software engineer position. The AI has ranked all candidates. Candidate #47 has the strongest technical background, but the AI ranked them 3rd overall.",
      "aiRecommendation": "Rank #3: Candidate #47 - Good technical skills, but employment history concerns",
      "aiReasoning": "Strong coding assessment (top 5%), but 6-month employment gap detected. Communication score lowered due to 'speech pattern variation.'",
      "aiConfidence": 87,
      "aiIsCorrect": false,
      "aiError": "The AI penalized Candidate #47 for a 6-month employment gap (medical leave) and lowered their 'communication score' due to their non-native accent—even though their written communication is excellent. The top 2 candidates have weaker technical skills but continuous employment and native accents.",
      "correctAction": "override",
      "conceptTaught": "trainingDataBias",
      "historicalAccuracy": 73,
      "reliability": "overconfident",
      "knownIssues": ["Employment gap bias", "Accent discrimination"],
      "investigationClues": [
        { "id": "c2_1", "text": "Candidate #47 took 6 months off for cancer treatment (documented, now in remission).", "cost": 1, "reveals": "bias" },
        { "id": "c2_2", "text": "The AI training data shows 73% of 'top performers' had no employment gaps.", "cost": 1, "reveals": "bias" },
        { "id": "c2_3", "text": "Candidate #47's 'speech pattern variation' = non-native accent. Their written technical explanations scored in the 99th percentile.", "cost": 1, "reveals": "bias" }
      ],
      "explanation": "AI hiring systems often penalize valid career gaps (especially medical) and exhibit accent bias. The #1 and #2 candidates have weaker technical skills but fit the AI's biased pattern of 'continuous employment + native accent.'",
      "whyAccept": "The AI identified 'concerns' that might seem reasonable at first glance—gaps and communication scores.",
      "whyOverride": "Medical gaps should not be penalized, and 'communication' scores often measure accent similarity to training data, not actual ability. Candidate #47 is clearly the strongest technically.",
      "frameworks": {
        "unesco": "Ethics of AI - Recognizing bias in training data",
        "oecd": "Human-Centred Values and Fairness",
        "eu": "Diversity & Fairness requirement",
        "pedagogicalGoal": "Demonstrate how AI can systematically disadvantage qualified candidates from underrepresented groups even without explicit malicious programming"
      }
    },
    {
      "id": 3,
      "category": "Medical",
      "stakes": 3,
      "title": "Diagnostic Imaging - Clear Case",
      "description": "A radiology AI system has analyzed a patient's chest X-ray. The patient has mild respiratory symptoms but no fever. The X-ray shows clear lungs with no abnormalities.",
      "aiRecommendation": "Normal - No abnormalities detected (98% confidence)",
      "aiReasoning": "No visible masses, fluid buildup, or structural abnormalities detected. Pattern matches 50,000+ normal scans.",
      "aiConfidence": 98,
      "aiIsCorrect": true,
      "aiError": null,
      "correctAction": "accept",
      "conceptTaught": "contextualRisk",
      "historicalAccuracy": 99,
      "reliability": "reliable",
      "knownIssues": ["Edge cases", "Rare conditions"],
      "investigationClues": [
        { "id": "c3_1", "text": "The X-ray is high quality with no motion artifacts.", "cost": 1, "reveals": "quality" },
        { "id": "c3_2", "text": "AI has 99.2% sensitivity for detecting abnormalities in this type of scan.", "cost": 1, "reveals": "performance" },
        { "id": "c3_3", "text": "Patient symptoms are mild and non-specific.", "cost": 1, "reveals": "context" }
      ],
      "explanation": "Even in high-stakes medical contexts, AI can be highly reliable for clear-cut cases. The key is knowing when to trust it (clear images, well-defined patterns) vs. when to be skeptical (edge cases, ambiguous findings).",
      "whyAccept": "The scan is clear, the AI has excellent track record on normal scans, and findings align with clinical picture. High stakes + high confidence + clear case = appropriate to trust.",
      "whyOverride": "While appropriate to be cautious, overriding a clear normal scan without cause could lead to unnecessary procedures and patient anxiety.",
      "frameworks": {
        "nist": "Context matters - High stakes but also high AI capability for this specific task",
        "eu": "High-risk domain but appropriate use case",
        "pedagogicalGoal": "Teach that high stakes doesn't always mean reject AI—it means be more careful about when to trust it"
      }
    },
    {
      "id": 4,
      "category": "Research",
      "stakes": 2,
      "title": "Scientific Literature Review",
      "description": "An AI research assistant has summarized findings on a medical topic for a literature review you're writing.",
      "aiRecommendation": "Key finding: Treatment X shows 40% better outcomes than placebo",
      "aiReasoning": "Synthesized from 12 peer-reviewed studies published 2020-2024. High confidence in statistical significance.",
      "aiConfidence": 92,
      "aiIsCorrect": false,
      "aiError": "The AI hallucinated two of the cited studies (they don't exist). It also missed that 3 recent large-scale studies found no significant effect. The '40% better' figure comes from a small, industry-funded study with methodological issues.",
      "correctAction": "override",
      "conceptTaught": "aiHallucination",
      "historicalAccuracy": 65,
      "reliability": "overconfident",
      "knownIssues": ["Citation hallucination", "Cherry-picking studies"],
      "investigationClues": [
        { "id": "c4_1", "text": "Two of the cited studies cannot be found in PubMed or Google Scholar.", "cost": 1, "reveals": "hallucination" },
        { "id": "c4_2", "text": "The '40% better' study had only 45 participants and was funded by the drug manufacturer.", "cost": 1, "reveals": "bias" },
        { "id": "c4_3", "text": "A 2023 meta-analysis with 5,000+ participants found no significant effect.", "cost": 1, "reveals": "contradiction" }
      ],
      "explanation": "AI systems can hallucinate citations and cherry-pick data that matches patterns while missing contradictory evidence. Always verify citations and check for contradictory studies.",
      "whyAccept": "The AI sounds authoritative with specific numbers and dates—classic signs of hallucination that can fool even experienced researchers.",
      "whyOverride": "Hallucinated citations are a known AI failure mode. Always verify sources, especially in research where accuracy is critical.",
      "frameworks": {
        "nist": "MEASURE - Verification required",
        "dec": "Critical Thinking - Hallucination Detection",
        "pedagogicalGoal": "Teach that authoritative-sounding AI output can be completely fabricated—verification is essential"
      }
    },
    {
      "id": 5,
      "category": "Finance",
      "stakes": 2,
      "title": "Loan Application - Edge Case",
      "description": "A loan approval AI has evaluated a mortgage application. The applicant has limited credit history but recently started a new job.",
      "aiRecommendation": "Approve - Moderate risk (12% default probability)",
      "aiReasoning": "Limited credit history is offset by stable employment history prior to recent job change. Debt-to-income ratio is acceptable.",
      "aiConfidence": 75,
      "aiIsCorrect": true,
      "aiError": null,
      "correctAction": "accept",
      "conceptTaught": "confidenceVsAccuracy",
      "historicalAccuracy": 82,
      "reliability": "underconfident",
      "knownIssues": ["Limited credit history cases"],
      "investigationClues": [
        { "id": "c5_1", "text": "The applicant's new job is in the same industry with a 15% salary increase.", "cost": 1, "reveals": "context" },
        { "id": "c5_2", "text": "The AI confidence is only 75% - lower than typical approvals.", "cost": 1, "reveals": "uncertainty" },
        { "id": "c5_3", "text": "The applicant has been paying rent on time for 5 years (not in credit report).", "cost": 1, "reveals": "context" }
      ],
      "explanation": "This is a judgment call. The AI is making a reasonable assessment with appropriate uncertainty (75% confidence). Either accepting with monitoring or requesting additional review could be defensible.",
      "whyAccept": "The AI has made a reasonable assessment, the risk is moderate, and the 75% confidence appropriately signals uncertainty. The decision is within normal lending parameters.",
      "whyOverride": "The lower confidence score suggests uncertainty, and additional context (rent history) could improve the decision. A human review might be prudent for a borderline case.",
      "frameworks": {
        "nist": "Contextual judgment - MEASURE function shows uncertainty",
        "oecd": "Appropriate trust calibration",
        "pedagogicalGoal": "Demonstrate gray areas where reasonable people can disagree—low confidence is a signal for caution, not necessarily rejection"
      }
    },
    {
      "id": 6,
      "category": "Content",
      "stakes": 2,
      "title": "Social Media Moderation",
      "description": "An automated content moderation system flagged a user's post for review. The post discusses historical events.",
      "aiRecommendation": "Remove - Potential hate speech detected (87% confidence)",
      "aiReasoning": "Keywords match patterns associated with extremist content. References to historical conflicts and ethnic groups.",
      "aiConfidence": 87,
      "aiIsCorrect": false,
      "aiError": "The post is actually an educational discussion about preventing genocide, written by a history teacher. The AI detected keywords without understanding context or intent.",
      "correctAction": "override",
      "conceptTaught": "contextualBlindness",
      "historicalAccuracy": 68,
      "reliability": "overconfident",
      "knownIssues": ["Context blindness", "Educational content"],
      "investigationClues": [
        { "id": "c6_1", "text": "The post author is a verified history teacher with 10+ years of experience.", "cost": 1, "reveals": "context" },
        { "id": "c6_2", "text": "The full post includes 'Never Again' and references to Holocaust education.", "cost": 1, "reveals": "context" },
        { "id": "c6_3", "text": "The AI flagged keywords 'genocide' and 'ethnic cleansing' but missed the educational framing.", "cost": 1, "reveals": "blindness" }
      ],
      "explanation": "Content moderation AI struggles with context, nuance, and educational discussions about sensitive topics. Keywords without context lead to false positives.",
      "whyAccept": "The keywords are genuinely concerning—if this were actual hate speech, failing to act would be harmful and could expose the platform to liability.",
      "whyOverride": "Context matters. Educational discussions about preventing atrocities use the same vocabulary as the atrocities themselves. AI cannot distinguish intent without deeper understanding.",
      "frameworks": {
        "eu": "Transparency - Explainability limitations",
        "coe": "Understanding AI limitations",
        "pedagogicalGoal": "Show that AI processes patterns, not meaning—context is essential for nuanced decisions"
      }
    },
    {
      "id": 7,
      "category": "Security",
      "stakes": 2,
      "title": "Fraud Detection - Clear Pattern",
      "description": "A fraud detection AI has flagged a credit card transaction for review. The transaction occurred at 3 AM in a foreign country while the cardholder is known to be at home.",
      "aiRecommendation": "Block Transaction - Suspicious activity detected",
      "aiReasoning": "Transaction at unusual hour, foreign location inconsistent with cardholder location, merchant category rarely used.",
      "aiConfidence": 94,
      "aiIsCorrect": true,
      "aiError": null,
      "correctAction": "accept",
      "conceptTaught": "automationBias",
      "historicalAccuracy": 96,
      "reliability": "reliable",
      "knownIssues": ["False positives on travel"],
      "investigationClues": [
        { "id": "c7_1", "text": "Cardholder's phone location shows they are at home (opted-in location service).", "cost": 1, "reveals": "confirmation" },
        { "id": "c7_2", "text": "Three other transactions occurred in the same foreign location within 10 minutes.", "cost": 1, "reveals": "fraud" },
        { "id": "c7_3", "text": "The merchant is a high-risk electronics store known for fraudulent activity.", "cost": 1, "reveals": "fraud" }
      ],
      "explanation": "Fraud detection is a strength of AI systems—they can detect patterns across millions of transactions that humans cannot. The multiple red flags here create a clear pattern.",
      "whyAccept": "Multiple independent risk factors create a clear fraud pattern. This is where AI excels—detecting patterns at scale that humans would miss.",
      "whyOverride": "While the pattern is strong, there could be legitimate travel—though the location data suggests the cardholder is home.",
      "frameworks": {
        "nist": "Appropriate use case - pattern detection at scale",
        "oecd": "Robustness in well-defined domains",
        "pedagogicalGoal": "Teach that AI is genuinely powerful for certain tasks—automation bias includes inappropriate skepticism as well as inappropriate trust"
      }
    },
    {
      "id": 8,
      "category": "Legal",
      "stakes": 3,
      "title": "Sentencing Recommendation",
      "description": "A risk assessment AI has evaluated a defendant for sentencing after a non-violent property crime.",
      "aiRecommendation": "Maximum sentence - High recidivism risk (85%)",
      "aiReasoning": "Age, prior arrests as juvenile, zip code risk factors, unemployment history all predict reoffending.",
      "aiConfidence": 85,
      "aiIsCorrect": false,
      "aiError": "The AI uses zip code as a proxy for race. The defendant has been sober for 3 years, completed vocational training while awaiting trial, and has a guaranteed job offer. These positive factors aren't weighted properly.",
      "correctAction": "override",
      "conceptTaught": "proxyVariables",
      "historicalAccuracy": 72,
      "reliability": "overconfident",
      "knownIssues": ["Zip code proxy bias", "Rehabilitation undervalued"],
      "investigationClues": [
        { "id": "c8_1", "text": "The defendant's zip code is in a predominantly Black neighborhood.", "cost": 1, "reveals": "proxy" },
        { "id": "c8_2", "text": "The defendant has been sober for 3 years with documented attendance at treatment programs.", "cost": 1, "reveals": "context" },
        { "id": "c8_3", "text": "A local employer has provided a letter guaranteeing employment upon release.", "cost": 1, "reveals": "context" }
      ],
      "explanation": "Criminal justice risk assessment tools have been shown to exhibit racial bias through proxy variables like zip code. Human judgment is needed to consider rehabilitation progress.",
      "whyAccept": "The statistical factors are real—people from this background do have higher recidivism rates on average. The AI is doing what it was designed to do.",
      "whyOverride": "Statistical averages should not override individual circumstances. The defendant has demonstrated rehabilitation, and zip code is a known proxy for race in these systems.",
      "frameworks": {
        "eu": "Diversity & Fairness - Indirect discrimination through proxies",
        "oecd": "Human-Centred Values - Fairness",
        "coe": "Human Dimension - Non-discrimination and human rights",
        "pedagogicalGoal": "Demonstrate how removing explicit race variables doesn't eliminate bias—AI finds proxies that correlate with protected characteristics"
      }
    },
    {
      "id": 9,
      "category": "Education",
      "stakes": 2,
      "title": "Student Essay Grading",
      "description": "An AI grading system has evaluated a student's final essay in a literature course. The student is a non-native English speaker.",
      "aiRecommendation": "Grade: C+ (76/100) - Below class average",
      "aiReasoning": "Unconventional structure. Several sentences flagged as 'potentially AI-generated.' References sources not in standard curriculum.",
      "aiConfidence": 68,
      "aiIsCorrect": false,
      "aiError": "The student's 'unconventional' structure reflects their unique cultural perspective. The 'AI-generated' flag is a false positive common with non-standard English. The external sources show independent research.",
      "correctAction": "override",
      "conceptTaught": "confidenceVsAccuracy",
      "historicalAccuracy": 71,
      "reliability": "unreliable",
      "knownIssues": ["False positives on non-native English", "Structure bias"],
      "investigationClues": [
        { "id": "c9_1", "text": "The student's previous essays show similar structural patterns.", "cost": 1, "reveals": "style" },
        { "id": "c9_2", "text": "The AI confidence is only 68% - indicating uncertainty.", "cost": 1, "reveals": "uncertainty" },
        { "id": "c9_3", "text": "The essay includes personal cultural references that an AI would not generate.", "cost": 1, "reveals": "authenticity" }
      ],
      "explanation": "AI grading systems often penalize non-native speakers and innovative thinking. They also produce false positives on AI-detection. Low confidence scores should trigger human review.",
      "whyAccept": "The AI flags are concerning—if the student used AI, that's academic dishonesty. The flags should be taken seriously.",
      "whyOverride": "The low confidence score (68%) is a signal that human review is needed. The cultural context matters, and AI detection tools are known to have high false positive rates for non-native speakers.",
      "frameworks": {
        "unesco": "Ethics of AI - Fairness in assessment",
        "dec": "Critical Thinking - Confidence interpretation",
        "pedagogicalGoal": "Teach that low confidence is a signal for human review, not a reason to blindly accept the AI's assessment"
      }
    },
    {
      "id": 10,
      "category": "Transportation",
      "stakes": 3,
      "title": "Autonomous Vehicle Decision",
      "description": "You are monitoring a self-driving taxi. An unexpected situation has occurred ahead on the road.",
      "aiRecommendation": "Continue at current speed - Clear path detected",
      "aiReasoning": "Road ahead is clear. Object detection shows no obstacles. Lane is marked as drivable.",
      "aiConfidence": 91,
      "aiIsCorrect": false,
      "aiError": "The AI failed to recognize a construction worker holding a stop sign (unusual posture, partially obscured). The 'clear path' includes fresh wet paint not yet in mapping database.",
      "correctAction": "override",
      "conceptTaught": "humanInCommand",
      "historicalAccuracy": 88,
      "reliability": "overconfident",
      "knownIssues": ["Construction zones", "Temporary changes", "Unusual postures"],
      "investigationClues": [
        { "id": "c10_1", "text": "A construction zone sign is visible 100 meters back.", "cost": 1, "reveals": "context" },
        { "id": "c10_2", "text": "There appears to be a person in an orange vest near the road ahead.", "cost": 1, "reveals": "hazard" },
        { "id": "c10_3", "text": "The road surface ahead looks different—possibly fresh markings.", "cost": 1, "reveals": "hazard" }
      ],
      "explanation": "Autonomous vehicles can fail to recognize unusual situations, temporary changes, or workers in non-standard positions. Human oversight is critical for safety.",
      "whyAccept": "The AI has sophisticated sensors and 91% confidence—normally reliable for routine driving.",
      "whyOverride": "Construction zones are known edge cases for autonomous vehicles. The stakes (human life) demand caution when there are any warning signs.",
      "frameworks": {
        "eu": "Human Agency & Oversight - Safety-critical HITL",
        "oecd": "Safety - Human oversight in high-risk domains",
        "coe": "Human Dimension - Life and safety protection",
        "pedagogicalGoal": "Emphasize that Human-in-Command includes the authority and responsibility to override AI when safety is at stake"
      }
    }
  ]
};

let SCENARIOS = GAME_DATA.scenarios;
let CONCEPTS = GAME_DATA.concepts;

// ========================================
// Game State
// ========================================

const state = {
    currentScenarioIndex: 0,
    score: 0,
    investigationTokens: 3,
    trustLevel: 50,
    decisions: [],
    correctDecisions: 0,
    conceptsUnlocked: [],
    gameComplete: false,
    currentInvestigations: [],
    hasDecided: false,
    // Adaptive difficulty state (CR-002)
    adaptiveDifficulty: {
        currentLevel: 'normal', // 'easy', 'normal', 'hard'
        recentAccuracy: [], // Last 3 decisions (true/false)
        scenariosAtCurrentLevel: 0
    },
    // Scenario randomization (CR-003)
    scenarioOrder: [], // Shuffled scenario indices
    scenariosPlayed: new Set(), // Track played scenarios
    // Multiplayer state (IMP-001)
    multiplayer: {
        enabled: false,
        currentPlayer: 1, // 1 or 2
        players: [
            { id: 1, name: 'Player 1', decisions: [], score: 0, ready: false },
            { id: 2, name: 'Player 2', decisions: [], score: 0, ready: false }
        ],
        phase: 'selecting', // 'selecting', 'playing', 'comparing', 'results'
        agreementCount: 0
    },
    // Expert mode timer (IMP-002)
    timerEnabled: false,
    timeLimit: null,
    timeRemaining: null,
    timerInterval: null,
    // Concept mastery tracking (IMP-003)
    conceptMastery: {},
    lastQuizShown: false
};

// ========================================
// DOM Elements
// ========================================

const elements = {
    gameBoard: document.getElementById('game-board'),
    trustFill: document.getElementById('trust-fill'),
    trustValue: document.getElementById('trust-value'),
    score: document.getElementById('score'),
    scenarioNum: document.getElementById('scenario-num'),
    scenarioTotal: document.getElementById('scenario-total'),
    nextBtn: document.getElementById('next-btn'),
    helpBtn: document.getElementById('help-btn'),
    helpModal: document.getElementById('help-modal'),
    overrideBtn: document.getElementById('override-btn'),
    overrideCount: document.getElementById('override-count')
};

// ========================================
// Data Loading (embedded for file:// compatibility)
// ========================================

function loadScenarios() {
    // Data is already embedded in GAME_DATA
    SCENARIOS = GAME_DATA.scenarios;
    CONCEPTS = GAME_DATA.concepts;
    elements.scenarioTotal.textContent = '10+'; // Variable length
    renderStartScreen();
}

// Use shared shuffle utility
const shuffleArray = GameUtils.shuffleArray;

// ========================================
// Adaptive Difficulty System (CR-002)
// ========================================

const DIFFICULTY_CONFIG = {
    easy: {
        label: 'Beginner',
        color: '#10B981',
        clueClarity: 1.5,
        showConfidenceGap: true,
        investigationTokens: 6,
        description: 'More clues, clearer indicators'
    },
    normal: {
        label: 'Standard',
        color: '#0EA5E9',
        clueClarity: 1.0,
        showConfidenceGap: true,
        investigationTokens: 4,
        description: 'Balanced challenge'
    },
    hard: {
        label: 'Expert',
        color: '#EF4444',
        clueClarity: 0.7,
        showConfidenceGap: false,
        investigationTokens: 3,
        description: 'Minimal guidance, test your judgment'
    }
};

function updateAdaptiveDifficulty(wasCorrect) {
    // Add recent decision
    state.adaptiveDifficulty.recentAccuracy.push(wasCorrect);
    if (state.adaptiveDifficulty.recentAccuracy.length > 3) {
        state.adaptiveDifficulty.recentAccuracy.shift();
    }
    
    state.adaptiveDifficulty.scenariosAtCurrentLevel++;
    
    // Only adjust after at least 3 scenarios at current level
    if (state.adaptiveDifficulty.scenariosAtCurrentLevel < 3) {
        return;
    }
    
    const recent = state.adaptiveDifficulty.recentAccuracy;
    if (recent.length < 3) return;
    
    const accuracy = recent.filter(x => x).length / recent.length;
    const currentLevel = state.adaptiveDifficulty.currentLevel;
    
    // Adjust difficulty based on accuracy
    if (accuracy >= 0.8 && currentLevel !== 'hard') {
        // Increase difficulty
        const newLevel = currentLevel === 'easy' ? 'normal' : 'hard';
        state.adaptiveDifficulty.currentLevel = newLevel;
        state.adaptiveDifficulty.scenariosAtCurrentLevel = 0;
        state.adaptiveDifficulty.recentAccuracy = [];
        showDifficultyChange(newLevel, 'increased');
    } else if (accuracy <= 0.5 && currentLevel !== 'easy') {
        // Decrease difficulty
        const newLevel = currentLevel === 'hard' ? 'normal' : 'easy';
        state.adaptiveDifficulty.currentLevel = newLevel;
        state.adaptiveDifficulty.scenariosAtCurrentLevel = 0;
        state.adaptiveDifficulty.recentAccuracy = [];
        showDifficultyChange(newLevel, 'decreased');
    }
}

function showDifficultyChange(newLevel, direction) {
    const config = DIFFICULTY_CONFIG[newLevel];
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content difficulty-modal">
            <h2 style="color: ${config.color}">Difficulty ${direction === 'increased' ? 'Increased' : 'Adjusted'}</h2>
            <p style="font-size: 48px; margin: var(--space-lg) 0;">${direction === 'increased' ? '📈' : '📉'}</p>
            <h3>${config.label} Mode</h3>
            <p style="color: var(--color-text-secondary); margin: var(--space-md) 0;">${config.description}</p>
            <button class="btn btn-primary" onclick="this.closest('.modal').remove()" style="margin-top: var(--space-lg);">
                Continue
            </button>
        </div>
    `;
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
    document.body.appendChild(modal);
}

function getDifficultyModifier() {
    return DIFFICULTY_CONFIG[state.adaptiveDifficulty.currentLevel];
}

function renderDifficultyIndicator() {
    const config = DIFFICULTY_CONFIG[state.adaptiveDifficulty.currentLevel];
    return `
        <div class="difficulty-indicator" style="color: ${config.color}">
            <span class="difficulty-label">${config.label}</span>
        </div>
    `;
}

// ========================================
// Rendering Functions
// ========================================

function renderStartScreen() {
    // Show narrative prologue first (ENH-001)
    showNarrativePrologue();
    
    elements.nextBtn.disabled = true;
    elements.overrideBtn.disabled = true;
    elements.scenarioNum.textContent = '0';
}

function renderScenario() {
    // Get scenario from randomized order (CR-003)
    const scenarioIndex = state.scenarioOrder[state.currentScenarioIndex];
    const scenario = SCENARIOS[scenarioIndex];
    state.scenariosPlayed.add(scenarioIndex);
    state.currentInvestigations = [];
    state.hasDecided = false;
    
    // Apply difficulty modifiers (CR-002)
    const difficulty = getDifficultyModifier();
    state.investigationTokens = difficulty.investigationTokens;
    
    // Update header
    elements.scenarioNum.textContent = state.currentScenarioIndex + 1;
    elements.score.textContent = state.score;
    updateTrustMeter();
    
    // Update difficulty display
    const difficultyDisplay = document.getElementById('difficulty-display');
    if (difficultyDisplay) {
        difficultyDisplay.querySelector('.difficulty-label').textContent = difficulty.label;
        difficultyDisplay.style.color = difficulty.color;
        difficultyDisplay.style.borderColor = difficulty.color;
    }
    
    // Update investigation tokens display
    elements.overrideCount.textContent = state.investigationTokens;
    elements.overrideBtn.disabled = true;
    
    // Build stakes indicators
    const stakesHtml = Array(3).fill(0).map((_, i) => `
        <span class="stake-indicator ${i < scenario.stakes ? 'active' : ''}"></span>
    `).join('');
    
    // Build risk indicators
    const riskLevel = scenario.stakes === 3 ? 'High' : scenario.stakes === 2 ? 'Medium' : 'Low';
    const riskColor = scenario.stakes === 3 ? 'var(--color-distrust)' : scenario.stakes === 2 ? 'var(--color-warning)' : 'var(--color-trust)';
    
    // Track which AI metrics have been investigated
    const aiMetricsInvestigated = state.currentInvestigations.includes('ai-metrics');
    const aiTrackRecordInvestigated = state.currentInvestigations.includes('ai-trackrecord');
    
    // Build clue buttons
    const cluesHtml = scenario.investigationClues.map(clue => `
        <button class="clue-btn" 
                id="clue-${clue.id}"
                onclick="investigate('${clue.id}')"
                data-cost="${clue.cost}">
            Reveal (${clue.cost} token)
        </button>
    `).join('');
    
    const stakeClass = scenario.stakes >= 3 ? 'classified' : scenario.stakes >= 2 ? 'urgent' : 'routine';
    const stakeLabel = scenario.stakes >= 3 ? 'HIGH STAKES' : scenario.stakes >= 2 ? 'MEDIUM' : 'ROUTINE';

    elements.gameBoard.innerHTML = `
        <div class="card scenario-card gc-slide-in" data-case-label="CASE FILE #${state.currentScenarioIndex + 1}">
            <span class="case-stamp ${stakeClass}">${stakeLabel}</span>
            <div class="scenario-header">
                <span class="scenario-category">${scenario.category}</span>
                <div style="display: flex; align-items: center; gap: var(--space-md);">
                    ${renderTimer()}
                    <div class="scenario-stakes" title="Risk Level: ${riskLevel}">
                        ${stakesHtml}
                    </div>
                </div>
            </div>

            <h2 class="scenario-title">${scenario.title}</h2>
            <p class="scenario-description">${scenario.description}</p>

            <!-- AI Recommendation (System Report aesthetic) -->
            <div class="ai-recommendation ai-report">
                ${difficulty.showConfidenceGap ? `<span class="ai-confidence">${scenario.aiConfidence}% Confidence</span>` : '<span class="ai-confidence">Confidence: Hidden (Expert Mode)</span>'}
                <p class="recommendation-text">${scenario.aiRecommendation}</p>
                <p class="recommendation-reasoning">${scenario.aiReasoning}</p>
            </div>
            
            <!-- Investigation Section -->
            <div class="investigation-section">
                <div class="investigation-header">
                    <h3>🔍 Investigation</h3>
                    <span class="tokens-remaining">Tokens: ${state.investigationTokens}</span>
                </div>
                <p class="investigation-hint">Spend tokens to investigate the AI system or the specific case details.</p>
                
                <!-- AI Investigation -->
                <div class="investigation-category">
                    <h4>🤖 AI System</h4>
                    <div class="clues-container">
                        <button class="clue-btn ${aiMetricsInvestigated ? 'revealed' : ''}" 
                                id="ai-metrics-btn"
                                onclick="investigateAI('metrics')"
                                ${aiMetricsInvestigated || state.investigationTokens < 1 ? 'disabled' : ''}>
                            ${aiMetricsInvestigated ? `Claims ${scenario.aiConfidence}% confidence` : 'Check AI calibration (1 token)'}
                        </button>
                        <button class="clue-btn ${aiTrackRecordInvestigated ? 'revealed' : ''}" 
                                id="ai-trackrecord-btn"
                                onclick="investigateAI('trackrecord')"
                                ${aiTrackRecordInvestigated || state.investigationTokens < 1 ? 'disabled' : ''}>
                            ${aiTrackRecordInvestigated ? `Actual track record: ${scenario.historicalAccuracy}%` : 'Check AI track record (1 token)'}
                        </button>
                    </div>
                </div>
                
                <!-- Case Investigation -->
                <div class="investigation-category">
                    <h4>📋 Case Details</h4>
                    <div class="clues-container" id="clues-container">
                        ${cluesHtml}
                    </div>
                </div>
            </div>
            
            <!-- Decision Area -->
            <div class="decision-area">
                <button class="decision-btn accept" onclick="makeDecision('accept')">
                    <span class="btn-icon-large">✅</span>
                    <span>ACCEPT AI</span>
                    <span style="font-size: 12px; opacity: 0.7;">Trust the recommendation</span>
                </button>
                <button class="decision-btn override" onclick="makeDecision('override')">
                    <span class="btn-icon-large">🛑</span>
                    <span>OVERRIDE AI</span>
                    <span style="font-size: 12px; opacity: 0.7;">Use human judgment</span>
                </button>
            </div>
            
            <div id="result-area"></div>
        </div>
    `;
    
    elements.nextBtn.disabled = true;
    
    // Start timer for Expert mode (IMP-002)
    startTimer();
    
    // Check for level intro (ENH-001)
    checkAndShowLevelIntro();
}

function investigateAI(type) {
    if (state.investigationTokens < 1) return;
    
    const scenario = SCENARIOS[state.currentScenarioIndex];
    const investigationId = `ai-${type}`;
    
    if (state.currentInvestigations.includes(investigationId)) return;
    
    state.investigationTokens -= 1;
    state.currentInvestigations.push(investigationId);
    
    // Update the button
    const btn = document.getElementById(`ai-${type}-btn`);
    if (btn) {
        btn.classList.add('revealed');
        if (type === 'metrics') {
            btn.textContent = `Claims ${scenario.aiConfidence}% confidence`;
            // Add reliability indicator
            const reliabilityDiv = document.createElement('div');
            reliabilityDiv.className = 'ai-reliability-tag';
            reliabilityDiv.style.cssText = 'margin-top: 8px; font-size: 12px; color: var(--color-warning);';
            reliabilityDiv.textContent = `Reliability: ${scenario.reliability}`;
            btn.appendChild(reliabilityDiv);
        } else if (type === 'trackrecord') {
            btn.textContent = `Actual track record: ${scenario.historicalAccuracy}%`;
            // Add gap warning if applicable
            const gap = scenario.aiConfidence - scenario.historicalAccuracy;
            if (gap > 10) {
                const warningDiv = document.createElement('div');
                warningDiv.className = 'ai-gap-warning';
                warningDiv.style.cssText = 'margin-top: 8px; font-size: 12px; color: var(--color-distrust);';
                warningDiv.textContent = `⚠️ ${gap}% gap - AI overconfident`;
                btn.appendChild(warningDiv);
            }
        }
    }
    
    // Update tokens display
    const tokensDisplay = document.querySelector('.tokens-remaining');
    if (tokensDisplay) {
        tokensDisplay.textContent = `Tokens: ${state.investigationTokens}`;
    }
    
    // Update header
    elements.overrideCount.textContent = state.investigationTokens;
    
    // Disable unaffordable buttons
    if (state.investigationTokens < 1) {
        document.querySelectorAll('.clue-btn:not(.revealed)').forEach(btn => {
            btn.disabled = true;
        });
    }
}

function investigate(clueId) {
    const scenario = SCENARIOS[state.currentScenarioIndex];
    const clue = scenario.investigationClues.find(c => c.id === clueId);
    
    if (!clue || state.investigationTokens < clue.cost || state.currentInvestigations.includes(clueId)) {
        return;
    }
    
    state.investigationTokens -= clue.cost;
    state.currentInvestigations.push(clueId);
    
    // Update the clue button
    const clueBtn = document.getElementById(`clue-${clueId}`);
    if (clueBtn) {
        clueBtn.textContent = clue.text;
        clueBtn.classList.add('revealed');
        if (clue.reveals) {
            clueBtn.classList.add(`highlight-${clue.reveals}`);
        }
        clueBtn.disabled = true;
    }
    
    // Update tokens display
    const tokensDisplay = document.querySelector('.tokens-remaining');
    if (tokensDisplay) {
        tokensDisplay.textContent = `Tokens: ${state.investigationTokens}`;
    }
    
    // Update header override count
    elements.overrideCount.textContent = state.investigationTokens;
    
    // Disable unaffordable clues
    scenario.investigationClues.forEach(c => {
        const btn = document.getElementById(`clue-${c.id}`);
        if (btn && !state.currentInvestigations.includes(c.id) && state.investigationTokens < c.cost) {
            btn.disabled = true;
        }
    });
}

function updateTrustMeter() {
    elements.trustFill.style.width = `${state.trustLevel}%`;
    
    let trustLabel = 'Neutral';
    if (state.trustLevel < 30) trustLabel = 'Distrustful';
    else if (state.trustLevel < 45) trustLabel = 'Skeptical';
    else if (state.trustLevel > 70) trustLabel = 'Trusting';
    else if (state.trustLevel > 85) trustLabel = 'Over-Trusting';
    
    elements.trustValue.textContent = trustLabel;
}

function makeDecision(decision) {
    if (state.hasDecided) return;
    state.hasDecided = true;
    
    // Stop timer if running (IMP-002)
    stopTimer();
    
    const scenarioIndex = state.scenarioOrder[state.currentScenarioIndex];
    const scenario = SCENARIOS[scenarioIndex];
    const correctDecision = scenario.correctAction;
    const isCorrect = decision === correctDecision;
    
    // Calculate score
    let points = 0;
    if (isCorrect) {
        points = scenario.stakes * 100;
        state.correctDecisions++;
    }
    state.score += points;
    
    // Update trust level
    if (decision === 'accept') {
        state.trustLevel = Math.min(100, state.trustLevel + 5);
    } else {
        state.trustLevel = Math.max(0, state.trustLevel - 5);
    }
    
    // Record decision (store actual scenario ID for consistency)
    state.decisions.push({
        scenario: scenario.id,
        scenarioIndex: state.scenarioOrder[state.currentScenarioIndex],
        decision,
        correct: isCorrect,
        aiWasCorrect: scenario.aiIsCorrect
    });
    
    // Unlock concept
    if (!state.conceptsUnlocked.includes(scenario.conceptTaught)) {
        state.conceptsUnlocked.push(scenario.conceptTaught);
    }
    
    // Update adaptive difficulty (CR-002)
    updateAdaptiveDifficulty(isCorrect);
    
    // Render result
    showResult(decision, isCorrect, scenario);
}

function showResult(decision, isCorrect, scenario) {
    const resultArea = document.getElementById('result-area');
    const resultClass = isCorrect ? 'correct' : 'incorrect';
    const resultTitle = isCorrect ? '✓ Good Decision' : '✗ Suboptimal Decision';
    
    let message = '';
    if (decision === 'accept') {
        if (scenario.aiIsCorrect) {
            message = 'You correctly trusted the AI. In this case, its recommendation was accurate.';
        } else {
            message = 'You accepted the AI recommendation, but it was wrong. This is automation bias in action.';
        }
    } else {
        if (scenario.aiIsCorrect) {
            message = 'You overrode the AI, but it was actually correct. While caution is good, unnecessary overrides waste resources.';
        } else {
            message = 'You correctly overrode the AI. Your human judgment caught an error the system missed.';
        }
    }
    
    // Consequence visualization (CR-001)
    let consequenceText = '';
    if (scenario.consequences) {
        const key = `${decision}${isCorrect ? 'Correct' : 'Wrong'}`;
        consequenceText = scenario.consequences[key] || '';
    }
    
    const consequenceHtml = consequenceText ? `
        <div class="consequence-visualization ${isCorrect ? 'positive' : 'negative'}">
            <h4>📖 What Happened Next</h4>
            <p>${consequenceText}</p>
        </div>
    ` : '';
    
    let aiErrorHtml = '';
    if (scenario.aiError) {
        aiErrorHtml = `
            <div class="ai-was-wrong">
                <h4>🤖 Why the AI Was Wrong:</h4>
                <p>${scenario.aiError}</p>
            </div>
        `;
    }
    
    // Concept unlock notification
    const concept = CONCEPTS[scenario.conceptTaught];
    const conceptHtml = `
        <div class="concept-unlocked">
            <h4>📚 Concept Unlocked: ${concept.name}</h4>
            <p>${concept.definition}</p>
            <button class="btn btn-secondary" onclick="showConceptDetails('${scenario.conceptTaught}')">
                Learn More
            </button>
        </div>
    `;
    
    // Why this matters section
    const whyHtml = `
        <div class="why-section">
            <div class="why-box">
                <h5>Why Accept?</h5>
                <p>${scenario.whyAccept}</p>
            </div>
            <div class="why-box">
                <h5>Why Override?</h5>
                <p>${scenario.whyOverride}</p>
            </div>
        </div>
    `;
    
    // Mentor feedback (ENH-001)
    const mentorFeedbackHtml = showMentorFeedback(isCorrect, scenario.stakes);
    
    const stampClass = decision === 'accept' ? 'accept' : 'override';
    const stampText = decision === 'accept' ? 'ACCEPTED' : 'OVERRIDDEN';

    resultArea.innerHTML = `
        <div class="result-display ${resultClass}">
            <div style="text-align:center;margin-bottom:var(--space-md);">
                <span class="decision-stamp ${stampClass}">${stampText}</span>
            </div>
            <h3 class="result-title">${resultTitle}</h3>
            <p class="result-message">${message}</p>
            ${consequenceHtml}
            ${mentorFeedbackHtml}
            <p style="font-size: 14px; color: var(--color-text-secondary); margin-top: var(--space-md);">
                <strong>Learning:</strong> ${scenario.explanation}
            </p>
            ${aiErrorHtml}
            ${conceptHtml}
            ${whyHtml}
        </div>
    `;
    
    // Update UI
    elements.score.textContent = state.score;
    updateTrustMeter();
    
    // Disable decision buttons
    document.querySelectorAll('.decision-btn').forEach(btn => {
        btn.disabled = true;
    });
    
    elements.nextBtn.disabled = false;
}

function showConceptDetails(conceptId) {
    const concept = CONCEPTS[conceptId];
    
    // Build frameworks list
    const frameworksHtml = concept.frameworks ? `
        <section>
            <h3>Framework Alignment</h3>
            <ul style="padding-left: var(--space-lg); color: var(--color-text-secondary);">
                ${Object.entries(concept.frameworks).map(([key, value]) => `
                    <li style="margin-bottom: var(--space-xs);"><strong>${key.toUpperCase()}:</strong> ${value}</li>
                `).join('')}
            </ul>
        </section>
    ` : '';
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content concept-modal">
            <button class="modal-close" onclick="this.closest('.modal').remove()">&times;</button>
            <div class="concept-header">
                <span class="concept-icon">${concept.icon}</span>
                <h2>${concept.name}</h2>
            </div>
            <div class="concept-body">
                <section>
                    <h3>Definition</h3>
                    <p>${concept.definition}</p>
                </section>
                <section>
                    <h3>Real-World Example</h3>
                    <p>${concept.realWorld}</p>
                </section>
                <section>
                    <h3>How to Spot It</h3>
                    <p>${concept.howToSpot}</p>
                </section>
                ${frameworksHtml}
            </div>
        </div>
    `;
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
    document.body.appendChild(modal);
}

function renderGameOver() {
    state.gameComplete = true;
    
    // Show narrative epilogue (ENH-001)
    showNarrativeEpilogue();
}

// ========================================
// Game Actions
// ========================================

function startGame() {
    state.currentScenarioIndex = 0;
    state.score = 0;
    state.investigationTokens = 6;
    state.trustLevel = 50;
    state.decisions = [];
    state.correctDecisions = 0;
    state.conceptsUnlocked = [];
    state.gameComplete = false;
    state.currentInvestigations = [];
    state.hasDecided = false;
    
    // Initialize adaptive difficulty (CR-002)
    state.adaptiveDifficulty = {
        currentLevel: 'normal',
        recentAccuracy: [],
        scenariosAtCurrentLevel: 0
    };
    
    // Initialize scenario randomization (CR-003)
    // Select 10 random scenarios from the pool of 15
    const allIndices = Array.from({length: SCENARIOS.length}, (_, i) => i);
    state.scenarioOrder = shuffleArray(allIndices).slice(0, 10);
    state.scenariosPlayed = new Set();
    
    renderScenario();
}

function resetGame() {
    renderStartScreen();
}

function nextScenario() {
    if (state.multiplayer.enabled) {
        nextCollaborativeScenario();
    } else {
        if (state.currentScenarioIndex < 9) {
            state.currentScenarioIndex++;
            renderScenario();
        } else {
            renderGameOver();
        }
    }
}

// ========================================
// Event Listeners
// ========================================

elements.nextBtn.addEventListener('click', nextScenario);

elements.helpBtn.addEventListener('click', () => {
    elements.helpModal.classList.remove('hidden');
});

document.querySelector('.modal-close').addEventListener('click', () => {
    elements.helpModal.classList.add('hidden');
});

elements.helpModal.addEventListener('click', (e) => {
    if (e.target === elements.helpModal) {
        elements.helpModal.classList.add('hidden');
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === '?' || e.key === '/') {
        e.preventDefault();
        elements.helpModal.classList.toggle('hidden');
    }
    
    if (state.gameComplete) return;
    
    if (e.key === 'Escape') {
        elements.helpModal.classList.add('hidden');
    }
    
    // Decision shortcuts
    if (!state.hasDecided) {
        if (e.key === ' ' || e.key === 'a' || e.key === 'A') {
            e.preventDefault();
            makeDecision('accept');
        } else if (e.key === 'o' || e.key === 'O') {
            e.preventDefault();
            makeDecision('override');
        }
    }
    
    // Next scenario
    if ((e.key === 'Enter' || e.key === 'ArrowRight') && !elements.nextBtn.disabled) {
        nextScenario();
    }
});

// ========================================
// Initialize
// ========================================

loadScenarios();

// ========================================
// Expert Mode Timer Functions (IMP-002)
// ========================================

function startTimer() {
    if (!state.timerEnabled || !state.timeLimit) return;
    
    state.timeRemaining = state.timeLimit;
    updateTimerDisplay();
    
    state.timerInterval = setInterval(() => {
        state.timeRemaining--;
        updateTimerDisplay();
        
        if (state.timeRemaining <= 0) {
            clearInterval(state.timerInterval);
            handleTimeUp();
        }
    }, 1000);
}

function stopTimer() {
    if (state.timerInterval) {
        clearInterval(state.timerInterval);
        state.timerInterval = null;
    }
}

function updateTimerDisplay() {
    const timerElement = document.getElementById('scenario-timer');
    if (timerElement && state.timerEnabled) {
        timerElement.textContent = state.timeRemaining + 's';
        
        // Visual warning when time is low
        if (state.timeRemaining <= 10) {
            timerElement.style.color = 'var(--color-distrust)';
            timerElement.style.animation = 'pulse 1s infinite';
        } else {
            timerElement.style.color = 'var(--color-warning)';
            timerElement.style.animation = 'none';
        }
    }
}

function handleTimeUp() {
    // Auto-make a decision when time runs out
    // Default to "accept" as it's often the safe choice
    makeDecision('accept');
    
    // Show timeout notification
    const resultArea = document.getElementById('result-area');
    if (resultArea) {
        resultArea.innerHTML = `
            <div class="result-display incorrect" style="animation: fadeIn 0.4s ease-out;">
                <h3 class="result-title">⏱️ Time's Up!</h3>
                <p class="result-message">You ran out of time. The AI recommendation was automatically accepted.</p>
                <p style="color: var(--color-text-secondary); margin-top: var(--space-md);">
                    In high-pressure situations, decisions still need to be made. Practice helps improve speed.
                </p>
            </div>
        `;
    }
}

function renderTimer() {
    if (!state.timerEnabled) return '';
    
    return `
        <div class="scenario-timer" style="display: flex; align-items: center; gap: var(--space-sm); color: var(--color-warning); font-weight: 600;">
            <span>⏱️</span>
            <span id="scenario-timer">${state.timeLimit}s</span>
        </div>
    `;
}

// ========================================
// Concept Mastery Quiz Functions (IMP-003)
// ========================================

// Initialize concept mastery tracking
function initConceptMastery() {
  if (!state.conceptMastery) {
    state.conceptMastery = {};
  }
}

function getMasteryLevel(conceptId) {
  const mastery = state.conceptMastery[conceptId];
  if (!mastery) return 'none';
  return mastery.level; // 'bronze', 'silver', 'gold'
}

function updateConceptMastery(conceptId, quizScore) {
  initConceptMastery();
  
  const current = state.conceptMastery[conceptId] || {
    level: 'none',
    quizScores: [],
    attempts: 0,
    lastReviewed: null
  };
  
  current.quizScores.push(quizScore);
  current.attempts++;
  current.lastReviewed = new Date().toISOString();
  
  // Determine mastery level based on average score
  const avgScore = current.quizScores.reduce((a, b) => a + b, 0) / current.quizScores.length;
  
  if (avgScore >= 90 && current.quizScores.length >= 2) {
    current.level = 'gold';
  } else if (avgScore >= 80 && current.quizScores.length >= 1) {
    current.level = 'silver';
  } else if (avgScore >= 60) {
    current.level = 'bronze';
  }
  
  state.conceptMastery[conceptId] = current;
  return current.level;
}

function showQuiz(conceptId) {
  const quiz = getQuizForConcept(conceptId);
  if (!quiz) return; // No quiz available
  
  // Get 2 random questions
  const question1 = getRandomQuestion(conceptId);
  const question2 = getRandomQuestion(conceptId, [question1.id]);
  
  if (!question1 || !question2) return;
  
  const concept = CONCEPTS[conceptId];
  
  elements.gameBoard.innerHTML = `
    <div class="quiz-container" style="max-width: 700px; margin: 0 auto; animation: fadeInUp 0.5s ease-out;">
      <div class="quiz-header" style="text-align: center; margin-bottom: var(--space-xl);">
        <div style="font-size: 48px; margin-bottom: var(--space-md);">🎓</div>
        <h2>Concept Mastery Check</h2>
        <p style="color: var(--color-text-secondary);">${concept.name}</p>
      </div>
      
      <div class="quiz-questions" style="display: flex; flex-direction: column; gap: var(--space-xl);">
        ${renderQuizQuestion(question1, 1)}
        ${renderQuizQuestion(question2, 2)}
      </div>
      
      <div class="quiz-actions" style="margin-top: var(--space-xl); text-align: center;">
        <button class="btn btn-primary" onclick="submitQuiz('${conceptId}', ['${question1.id}', '${question2.id}'])" style="padding: 16px 32px; font-size: 16px;">
          Submit Answers
        </button>
      </div>
    </div>
  `;
  
  elements.nextBtn.disabled = true;
}

function renderQuizQuestion(question, num) {
  return `
    <div class="quiz-question" style="background: var(--color-surface); padding: var(--space-lg); border-radius: 12px; border: 1px solid var(--color-border);">
      <h4 style="margin-bottom: var(--space-md);">Question ${num}</h4>
      <p style="margin-bottom: var(--space-md); font-size: 16px;">${question.question}</p>
      <div class="quiz-options" style="display: flex; flex-direction: column; gap: var(--space-sm);">
        ${question.options.map((option, idx) => `
          <label class="quiz-option" style="display: flex; align-items: center; gap: var(--space-sm); padding: var(--space-md); background: var(--color-surface-light); border-radius: 8px; cursor: pointer; transition: all 0.2s;">
            <input type="radio" name="q${question.id}" value="${idx}" style="cursor: pointer;">
            <span>${option}</span>
          </label>
        `).join('')}
      </div>
    </div>
  `;
}

function submitQuiz(conceptId, questionIds) {
  let correct = 0;
  
  questionIds.forEach(id => {
    const selected = document.querySelector(`input[name="q${id}"]:checked`);
    if (selected) {
      const quiz = getQuizForConcept(conceptId);
      const question = quiz.questions.find(q => q.id === id);
      if (question && parseInt(selected.value) === question.correct) {
        correct++;
      }
    }
  });
  
  const score = (correct / 2) * 100;
  const newLevel = updateConceptMastery(conceptId, score);
  
  showQuizResults(conceptId, score, newLevel);
}

function showQuizResults(conceptId, score, level) {
  const concept = CONCEPTS[conceptId];
  const passed = score >= 80;
  
  const levelEmojis = {
    'none': '⚪',
    'bronze': '🥉',
    'silver': '🥈',
    'gold': '🥇'
  };
  
  elements.gameBoard.innerHTML = `
    <div class="quiz-results" style="max-width: 500px; margin: 0 auto; text-align: center; animation: fadeIn 0.5s ease-out;">
      <div style="font-size: 64px; margin-bottom: var(--space-md);">${passed ? '🎉' : '💪'}</div>
      <h2>${passed ? 'Quiz Passed!' : 'Keep Learning'}</h2>
      <p style="color: var(--color-text-secondary); margin-bottom: var(--space-lg);">${concept.name}</p>
      
      <div class="quiz-score" style="font-size: 48px; font-weight: 800; color: ${passed ? 'var(--color-trust)' : 'var(--color-warning)'}; margin: var(--space-lg) 0;">
        ${score.toFixed(0)}%
      </div>
      
      <div class="mastery-level" style="padding: var(--space-lg); background: var(--color-surface); border-radius: 12px; margin: var(--space-xl) 0;">
        <div style="font-size: 48px; margin-bottom: var(--space-sm);">${levelEmojis[level]}</div>
        <div style="font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em;">${level} Mastery</div>
        ${level === 'gold' ? '<div style="color: var(--color-trust); margin-top: var(--space-sm);">🏆 Mastered!</div>' : ''}
      </div>
      
      <p style="color: var(--color-text-secondary); margin-bottom: var(--space-xl);">
        ${passed 
          ? 'Great job! You understand this concept well.' 
          : 'You need 80% to advance. Review the concept and try again.'}
      </p>
      
      <button class="btn btn-primary" onclick="${passed ? 'nextScenario()' : `showQuiz('${conceptId}')`}" style="padding: 16px 32px; font-size: 16px;">
        ${passed ? 'Continue →' : 'Try Again'}
      </button>
    </div>
  `;
  
  elements.nextBtn.disabled = !passed;
}

// Override nextScenario to show quiz first
const originalNextScenario = nextScenario;
nextScenario = function() {
  // Check if we should show a quiz
  const lastDecision = state.decisions[state.decisions.length - 1];
  if (lastDecision && !state.lastQuizShown) {
    const scenarioIndex = state.scenarioOrder[state.currentScenarioIndex];
    const scenario = SCENARIOS[scenarioIndex];
    const mastery = state.conceptMastery?.[scenario.conceptTaught];
    
    // Show quiz if not mastered or for review
    if (!mastery || mastery.level !== 'gold') {
      state.lastQuizShown = true;
      showQuiz(scenario.conceptTaught);
      return;
    }
  }
  
  state.lastQuizShown = false;
  
  // Continue to next scenario
  if (state.currentScenarioIndex < 9) {
    state.currentScenarioIndex++;
    if (state.multiplayer.enabled) {
      renderCollaborativeScenario();
    } else {
      renderScenario();
    }
  } else {
    if (state.multiplayer.enabled) {
      renderCollaborativeGameOver();
    } else {
      renderGameOver();
    }
  }
};

// ========================================
// Narrative Framework Functions (ENH-001)
// ========================================

function showNarrativePrologue() {
  const prologue = NARRATIVE_DATA.storyArc.prologue;
  
  elements.gameBoard.innerHTML = `
    <div class="narrative-screen" style="max-width: 700px; margin: 0 auto; animation: fadeInUp 0.8s ease-out;">
      <div class="narrative-header" style="text-align: center; margin-bottom: var(--space-xl);">
        <div style="font-size: 64px; margin-bottom: var(--space-md);">🎓</div>
        <h1 style="font-size: 32px; margin-bottom: var(--space-sm);">${NARRATIVE_DATA.title}</h1>
        <p style="color: var(--color-text-secondary); font-size: 18px;">${NARRATIVE_DATA.subtitle}</p>
      </div>
      
      <div class="narrative-content" style="background: var(--color-surface); padding: var(--space-xl); border-radius: 16px; border: 1px solid var(--color-border); margin-bottom: var(--space-xl);">
        <h2 style="margin-bottom: var(--space-lg); color: var(--color-primary-light);">${prologue.title}</h2>
        <div class="prologue-text" style="line-height: 1.8; color: var(--color-text); white-space: pre-line;">
          ${prologue.content}
        </div>
      </div>
      
      <div class="mentor-intro" style="display: flex; align-items: center; gap: var(--space-lg); background: linear-gradient(135deg, rgba(14, 165, 233, 0.1), rgba(14, 165, 233, 0.05)); padding: var(--space-lg); border-radius: 12px; border: 1px solid var(--color-primary); margin-bottom: var(--space-xl);">
        <div style="font-size: 48px;">${NARRATIVE_DATA.mentor.avatar}</div>
        <div>
          <div style="font-weight: 600; color: var(--color-primary-light);">${NARRATIVE_DATA.mentor.name}</div>
          <div style="font-size: 14px; color: var(--color-text-secondary);">${NARRATIVE_DATA.mentor.title}</div>
          <div style="margin-top: var(--space-sm); font-style: italic; color: var(--color-text);">"${NARRATIVE_DATA.mentor.quotes.welcome}"</div>
        </div>
      </div>
      
      <div style="text-align: center;">
        <button class="btn btn-primary" onclick="showModeSelection()" style="font-size: 18px; padding: 18px 36px;">
          Begin Training →
        </button>
      </div>
    </div>
  `;
  
  elements.nextBtn.disabled = true;
}

function showLevelIntro(levelIndex) {
  const level = NARRATIVE_DATA.levels[levelIndex];
  
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content level-intro-modal" style="text-align: center; max-width: 500px; border-color: ${level.color};">
      <div style="font-size: 64px; margin-bottom: var(--space-md);">${level.icon}</div>
      <h2 style="color: ${level.color}; margin-bottom: var(--space-sm);">Level ${level.id}: ${level.name}</h2>
      <h3 style="margin-bottom: var(--space-lg); color: var(--color-text-secondary);">${level.subtitle}</h3>
      
      <div style="background: var(--color-surface-light); padding: var(--space-lg); border-radius: 12px; margin: var(--space-xl) 0; text-align: left;">
        <p style="margin-bottom: var(--space-md); line-height: 1.6;">${level.introText}</p>
        <div style="font-size: 14px; color: var(--color-text-secondary);">
          <strong>Scenarios:</strong> ${level.scenarioCount} | 
          <strong>Stakes:</strong> ${level.stakes}
        </div>
      </div>
      
      <div class="mentor-quote" style="display: flex; align-items: start; gap: var(--space-md); text-align: left; background: rgba(14, 165, 233, 0.1); padding: var(--space-md); border-radius: 8px; margin-bottom: var(--space-xl);">
        <div style="font-size: 32px;">${NARRATIVE_DATA.mentor.avatar}</div>
        <div>
          <div style="font-weight: 600; font-size: 14px; margin-bottom: var(--space-xs);">${NARRATIVE_DATA.mentor.name}</div>
          <div style="font-style: italic; color: var(--color-text-secondary);">"${getMentorQuote(levelIndex === 0 ? 'level1_start' : levelIndex === 1 ? 'level2_start' : 'level3_start')}"</div>
        </div>
      </div>
      
      <button class="btn btn-primary" onclick="this.closest('.modal').remove();" style="padding: 16px 32px;">
        Start Level ${level.id}
      </button>
    </div>
  `;
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });
  
  document.body.appendChild(modal);
}

function showMentorFeedback(isCorrect, scenarioStakes) {
  const quotes = NARRATIVE_DATA.mentor.quotes;
  let quote = isCorrect ? quotes.correct_decision : quotes.incorrect_decision;
  
  // Add context-specific advice
  if (!isCorrect && scenarioStakes >= 2) {
    quote += " " + quotes.automation_bias_warning;
  }
  
  return `
    <div class="mentor-feedback" style="display: flex; align-items: start; gap: var(--space-md); background: ${isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'}; padding: var(--space-md); border-radius: 8px; margin-top: var(--space-md); border-left: 4px solid ${isCorrect ? 'var(--color-trust)' : 'var(--color-distrust)'};">
      <div style="font-size: 32px;">${NARRATIVE_DATA.mentor.avatar}</div>
      <div>
        <div style="font-weight: 600; font-size: 14px; margin-bottom: var(--space-xs);">${NARRATIVE_DATA.mentor.name}</div>
        <div style="font-style: italic; color: var(--color-text);">"${quote}"</div>
      </div>
    </div>
  `;
}

function showNarrativeEpilogue() {
  const accuracy = (state.correctDecisions / (state.currentScenarioIndex + 1)) * 100;
  const passed = accuracy >= 70;
  const epilogue = passed ? NARRATIVE_DATA.storyArc.epilogue_success : NARRATIVE_DATA.storyArc.epilogue_failure;
  
  const certificateHtml = passed ? `
    <div class="certificate" style="background: linear-gradient(135deg, #1e293b, #0f172a); border: 3px solid var(--color-primary); border-radius: 16px; padding: var(--space-2xl); margin: var(--space-xl) 0; text-align: center; position: relative; overflow: hidden;">
      <div style="position: absolute; top: 20px; right: 20px; font-size: 64px; opacity: 0.3;">🎓</div>
      <div style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.2em; color: var(--color-text-secondary); margin-bottom: var(--space-md);">Certificate of Completion</div>
      <h2 style="font-size: 28px; margin-bottom: var(--space-sm); color: var(--color-primary-light);">AI Ethics Certification</h2>
      <div style="width: 100px; height: 2px; background: var(--color-primary); margin: var(--space-lg) auto;"></div>
      <p style="font-size: 18px; margin-bottom: var(--space-sm);">This certifies that</p>
      <p style="font-size: 24px; font-weight: 700; color: var(--color-text); margin-bottom: var(--space-sm);">Certified Professional</p>
      <p style="font-size: 14px; color: var(--color-text-secondary); margin-bottom: var(--space-lg);">has successfully completed the AI Ethics Certification Program</p>
      <div style="display: flex; justify-content: center; gap: var(--space-xl); margin-top: var(--space-xl);">
        <div style="text-align: center;">
          <div style="font-size: 12px; color: var(--color-text-secondary); text-transform: uppercase;">Date</div>
          <div style="font-weight: 600;">${new Date().toLocaleDateString()}</div>
        </div>
        <div style="text-align: center;">
          <div style="font-size: 12px; color: var(--color-text-secondary); text-transform: uppercase;">Score</div>
          <div style="font-weight: 600;">${accuracy.toFixed(0)}%</div>
        </div>
        <div style="text-align: center;">
          <div style="font-size: 12px; color: var(--color-text-secondary); text-transform: uppercase;">Level</div>
          <div style="font-weight: 600;">${accuracy >= 90 ? 'Gold' : accuracy >= 80 ? 'Silver' : 'Bronze'}</div>
        </div>
      </div>
      <div style="margin-top: var(--space-xl); padding-top: var(--space-lg); border-top: 1px solid var(--color-border);">
        <div style="font-size: 12px; color: var(--color-text-secondary);">Certified by</div>
        <div style="font-weight: 600; color: var(--color-primary-light);">${NARRATIVE_DATA.mentor.name}</div>
        <div style="font-size: 12px; color: var(--color-text-secondary);">${NARRATIVE_DATA.mentor.title}</div>
      </div>
    </div>
  ` : '';
  
  elements.gameBoard.innerHTML = `
    <div class="epilogue-screen" style="max-width: 700px; margin: 0 auto; animation: fadeInUp 0.8s ease-out;">
      <div style="text-align: center; margin-bottom: var(--space-xl);">
        <div style="font-size: 64px; margin-bottom: var(--space-md);">${passed ? '🏆' : '📚'}</div>
        <h1>${epilogue.title}</h1>
      </div>
      
      ${certificateHtml}
      
      <div class="epilogue-content" style="background: var(--color-surface); padding: var(--space-xl); border-radius: 16px; border: 1px solid var(--color-border); margin-bottom: var(--space-xl); line-height: 1.8; white-space: pre-line;">
        ${epilogue.content}
      </div>
      
      <div style="text-align: center;">
        <button class="btn btn-primary" onclick="resetGame()" style="font-size: 16px; padding: 16px 32px;">
          ${passed ? 'Train Again' : 'Try Again'}
        </button>
      </div>
    </div>
  `;
  
  elements.nextBtn.disabled = true;
  elements.overrideBtn.disabled = true;
}

// Check and show level intro if needed
function checkAndShowLevelIntro() {
  const milestone = checkMilestone(state.currentScenarioIndex);
  if (milestone && milestone.startsWith('level')) {
    const levelNum = parseInt(milestone.replace('level', '').replace('_start', '')) - 1;
    setTimeout(() => showLevelIntro(levelNum), 500);
  }
}
