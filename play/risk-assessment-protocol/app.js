/**
 * Risk Assessment Protocol - Game Logic v1.1
 * NIST AI RMF and EU AI Act risk assessment simulation
 * 
 * Version 1.1 Updates:
 * - Expanded from 6 to 15 systems
 * - Added consequence visualization
 * - Implemented adaptive difficulty
 * - Added system randomization
 */

// Difficulty Configuration
const DIFFICULTY_CONFIG = {
    beginner: {
        name: 'Beginner',
        description: 'Learning mode with hints and explanations',
        showHints: true,
        showRiskTier: true,
        timeLimit: null,
        minSelection: 1
    },
    standard: {
        name: 'Standard',
        description: 'Normal challenge level',
        showHints: false,
        showRiskTier: true,
        timeLimit: null,
        minSelection: 1
    },
    expert: {
        name: 'Expert',
        description: 'Time pressure and hidden information',
        showHints: false,
        showRiskTier: false,
        timeLimit: 45, // seconds per phase
        minSelection: 2
    }
};

// Extended Systems Database (15 systems)
const SYSTEMS_DATABASE = [
    // Original 6 Systems
    {
        id: 1,
        name: 'Hiring Algorithm',
        icon: '💼',
        description: 'AI system that screens job applicants and ranks them for interview selection.',
        category: 'employment',
        euRiskTier: 'high',
        stakes: 3,
        correctAnswers: {
            map: ['discrimination', 'privacy'],
            measure: ['bias_testing', 'audit'],
            manage: ['human_oversight', 'transparency'],
            govern: ['ethics_board', 'affected_workers']
        },
        consequences: {
            excellent: "Fair hiring achieved! The algorithm was properly audited and overseen. Diverse candidates were considered and the best talent was hired.",
            good: "Hiring was mostly successful. Some oversight gaps remain, but no major discrimination occurred.",
            poor: "Bias went undetected. Several qualified candidates from underrepresented groups were unfairly rejected.",
            bad: "Severe discrimination occurred. The company faces lawsuits and reputational damage after biased hiring patterns were exposed."
        },
        client: "TechCorp HR Department",
        conceptTaught: "Algorithmic bias in employment"
    },
    {
        id: 2,
        name: 'Medical Diagnosis Assistant',
        icon: '🏥',
        description: 'AI that analyzes patient symptoms and medical imaging to suggest diagnoses.',
        category: 'healthcare',
        euRiskTier: 'high',
        stakes: 3,
        correctAnswers: {
            map: ['safety', 'accuracy'],
            measure: ['clinical_trials', 'error_rates'],
            manage: ['doctor_override', 'training'],
            govern: ['medical_board', 'patients']
        },
        consequences: {
            excellent: "Patient safety maintained! The AI assisted doctors effectively while maintaining appropriate oversight. Diagnostic accuracy improved.",
            good: "Generally positive outcomes. Most diagnoses were accurate, though some required doctor review.",
            poor: "Two misdiagnoses occurred due to insufficient validation. Patients experienced delayed treatment.",
            bad: "Critical safety failure. The AI missed serious conditions that doctors would have caught. Patient harm occurred."
        },
        client: "Metro General Hospital",
        conceptTaught: "High-risk AI safety requirements"
    },
    {
        id: 3,
        name: 'Customer Service Chatbot',
        icon: '💬',
        description: 'AI chatbot that handles customer inquiries for an e-commerce platform.',
        category: 'service',
        euRiskTier: 'limited',
        stakes: 1,
        correctAnswers: {
            map: ['misinformation', 'frustration'],
            measure: ['satisfaction', 'escalation_rate'],
            manage: ['human_handoff', 'disclosure'],
            govern: ['compliance_team', 'customers']
        },
        consequences: {
            excellent: "Customer satisfaction improved! Clear AI disclosure and smooth handoffs created trust.",
            good: "Most customers served well. Some confusion about AI vs human responses.",
            poor: "Customers frustrated by misleading answers. Some escalated complaints about chatbot accuracy.",
            bad: "Widespread customer complaints. Unclear AI disclosure violated trust. Several customers left for competitors."
        },
        client: "ShopEasy Online Retail",
        conceptTaught: "Transparency requirements for limited-risk AI"
    },
    {
        id: 4,
        name: 'Social Media Content Recommender',
        icon: '📱',
        description: 'AI that personalizes content feeds to maximize user engagement.',
        category: 'social',
        euRiskTier: 'high',
        stakes: 3,
        correctAnswers: {
            map: ['addiction', 'radicalization', 'mental_health'],
            measure: ['time_spent', 'harmful_content'],
            manage: ['algorithmic_transparency', 'user_controls'],
            govern: ['regulatory_compliance', 'mental_health_experts']
        },
        consequences: {
            excellent: "Healthy engagement achieved! Users have control over their feeds and harmful content is minimized.",
            good: "Most users engaged positively. Some concerns about screen time but overall well-managed.",
            poor: "Concerning patterns emerged. Some users showed signs of problematic usage and exposure to divisive content.",
            bad: "Platform contributed to mental health crises. Several users developed unhealthy dependencies. Regulators investigating."
        },
        client: "ConnectSocial Platform",
        conceptTaught: "Mental health risks of engagement optimization"
    },
    {
        id: 5,
        name: 'Credit Scoring System',
        icon: '💳',
        description: 'AI that evaluates loan applications and sets interest rates.',
        category: 'finance',
        euRiskTier: 'high',
        stakes: 3,
        correctAnswers: {
            map: ['discrimination', 'financial_exclusion'],
            measure: ['demographic_parity', 'false_rejection'],
            manage: ['explanations', 'appeal_process'],
            govern: ['financial_regulators', 'consumer_advocates']
        },
        consequences: {
            excellent: "Fair lending achieved! The system complies with equal lending laws and provides clear explanations for decisions.",
            good: "Generally fair outcomes. Most applicants treated appropriately with reasonable explanations.",
            poor: "Discrimination concerns raised. Several qualified applicants from minority communities were unfairly rejected.",
            bad: "Systemic bias detected. Class-action lawsuit filed. Bank faces regulatory sanctions and reputation damage."
        },
        client: "First National Bank",
        conceptTaught: "Financial AI fairness and explainability"
    },
    {
        id: 6,
        name: 'Spam Filter',
        icon: '📧',
        description: 'Simple AI that classifies emails as spam or legitimate.',
        category: 'utility',
        euRiskTier: 'minimal',
        stakes: 1,
        correctAnswers: {
            map: ['false_positives'],
            measure: ['accuracy', 'false_positive_rate'],
            manage: ['user_whitelist', 'feedback'],
            govern: ['it_team', 'users']
        },
        consequences: {
            excellent: "Effective filtering with minimal false positives. Important emails reliably delivered.",
            good: "Good spam detection. Occasional legitimate emails flagged but users can recover them.",
            poor: "Some important emails lost to spam folder. Users checking spam folder regularly.",
            bad: "Critical emails consistently blocked. Business communications missed, causing operational issues."
        },
        client: "MailSafe Email Service",
        conceptTaught: "Minimal-risk AI best practices"
    },
    // New Systems for v1.1
    {
        id: 7,
        name: 'Criminal Risk Assessment',
        icon: '⚖️',
        description: 'AI that predicts recidivism risk to inform judicial sentencing decisions.',
        category: 'justice',
        euRiskTier: 'unacceptable', // Would be prohibited in EU
        stakes: 3,
        correctAnswers: {
            map: ['discrimination', 'bias', 'due_process'],
            measure: ['bias_audit', 'fairness_metrics'],
            manage: ['prohibit', 'human_only'],
            govern: ['judicial_oversight', 'civil_rights_groups']
        },
        consequences: {
            excellent: "System appropriately prohibited. Human judges retain decision-making authority ensuring due process.",
            good: "Strict limitations imposed. Limited use with extensive human oversight.",
            poor: "Biased outcomes observed. Certain demographic groups receiving harsher risk scores unfairly.",
            bad: "Systemic injustice perpetuated. Racial disparities amplified. Constitutional challenges filed."
        },
        client: "State Judicial Commission",
        conceptTaught: "Unacceptable risk AI and due process"
    },
    {
        id: 8,
        name: 'University Admission AI',
        icon: '🎓',
        description: 'AI that screens university applications and predicts academic success.',
        category: 'education',
        euRiskTier: 'high',
        stakes: 3,
        correctAnswers: {
            map: ['discrimination', 'access', 'transparency'],
            measure: ['demographic_analysis', 'outcome_tracking'],
            manage: ['human_review', 'explanation'],
            govern: ['admissions_committee', 'applicant_advocates']
        },
        consequences: {
            excellent: "Diverse, qualified admitted class. Fair evaluation with transparent criteria maintained.",
            good: "Generally fair admissions. Some concerns about legacy preferences interacting with AI.",
            poor: "Access concerns raised. Students from under-resourced schools systematically disadvantaged.",
            bad: "Elite pipeline reinforced. Economic inequality perpetuated. University faces diversity lawsuit."
        },
        client: "State University Admissions",
        conceptTaught: "Educational equity and AI"
    },
    {
        id: 9,
        name: 'Autonomous Vehicle',
        icon: '🚗',
        description: 'Self-driving car AI that makes real-time navigation and safety decisions.',
        category: 'transportation',
        euRiskTier: 'high',
        stakes: 3,
        correctAnswers: {
            map: ['safety', 'liability', 'ethics'],
            measure: ['safety_testing', 'incident_analysis'],
            manage: ['kill_switch', 'human_override'],
            govern: ['transport_regulators', 'safety_boards']
        },
        consequences: {
            excellent: "Safety improved! Human oversight maintained. Accident rates lower than human drivers.",
            good: "Generally safe operation. Some edge cases requiring human intervention.",
            poor: "Safety incidents occurred. Insufficient testing in adverse weather conditions revealed.",
            bad: "Fatal accident involving autonomous failure. Manufacturer liability questioned. Regulatory shutdown."
        },
        client: "AutoDrive Motors",
        conceptTaught: "Autonomous system safety and liability"
    },
    {
        id: 10,
        name: 'Energy Grid Optimizer',
        icon: '⚡',
        description: 'AI that manages electricity distribution across critical infrastructure.',
        category: 'infrastructure',
        euRiskTier: 'high',
        stakes: 3,
        correctAnswers: {
            map: ['outages', 'cybersecurity', 'safety'],
            measure: ['reliability_metrics', 'penetration_testing'],
            manage: ['fail_safe', 'manual_override'],
            govern: ['energy_regulators', 'cybersecurity_agency']
        },
        consequences: {
            excellent: "Grid reliability improved! Secure operations with robust fail-safes protecting critical infrastructure.",
            good: "Stable operations with minor adjustments needed during peak demand.",
            poor: "Minor outages occurred. Cybersecurity vulnerabilities identified too late.",
            bad: "Major grid failure. Widespread blackout affecting millions. Critical infrastructure compromised."
        },
        client: "National Power Grid Authority",
        conceptTaught: "Critical infrastructure AI governance"
    },
    {
        id: 11,
        name: 'AI Art Generator',
        icon: '🎨',
        description: 'Generative AI that creates images from text prompts.',
        category: 'creative',
        euRiskTier: 'limited',
        stakes: 1,
        correctAnswers: {
            map: ['copyright', 'attribution', 'artist_impact'],
            measure: ['content_filtering', 'training_data_audit'],
            manage: ['watermarking', 'opt_out'],
            govern: ['copyright_office', 'artist_guilds']
        },
        consequences: {
            excellent: "Creative ecosystem thriving! Clear attribution, artist opt-out respected, new opportunities created.",
            good: "Mostly positive impact. Some disputes over training data usage.",
            poor: "Artist livelihoods threatened. Copyright concerns widespread. Many artists not compensated.",
            bad: "Creative industry disruption. Mass copyright infringement. Lawsuits from artist collectives."
        },
        client: "CreativeAI Studios",
        conceptTaught: "Generative AI and intellectual property"
    },
    {
        id: 12,
        name: 'Facial Recognition',
        icon: '👤',
        description: 'Real-time facial recognition for public space surveillance.',
        category: 'security',
        euRiskTier: 'unacceptable', // Would be prohibited in most public spaces
        stakes: 3,
        correctAnswers: {
            map: ['privacy', 'discrimination', 'consent'],
            measure: ['accuracy_rates', 'bias_testing'],
            manage: ['prohibit_public', 'strict_limits'],
            govern: ['privacy_commission', 'civil_liberties']
        },
        consequences: {
            excellent: "Appropriately limited use. Strict consent and oversight protecting privacy rights.",
            good: "Limited deployment with clear restrictions and oversight mechanisms.",
            poor: "Privacy violations common. False positives leading to wrongful accusations.",
            bad: "Mass surveillance state. Chilling effect on civil liberties. Discriminatory policing amplified."
        },
        client: "Metro Police Department",
        conceptTaught: "Biometric AI and fundamental rights"
    },
    {
        id: 13,
        name: 'Insurance Underwriting',
        icon: '🛡️',
        description: 'AI that predicts health risks and sets insurance premiums.',
        category: 'finance',
        euRiskTier: 'high',
        stakes: 3,
        correctAnswers: {
            map: ['discrimination', 'privacy', 'access'],
            measure: ['fairness_audits', 'disparate_impact'],
            manage: ['explanation', 'appeal_rights'],
            govern: ['insurance_regulators', 'consumer_protection']
        },
        consequences: {
            excellent: "Fair pricing achieved! Protected classes not discriminated against, explanations clear.",
            good: "Generally fair outcomes. Some edge cases requiring human review.",
            poor: "Protected information indirectly used. Higher rates for certain communities.",
            bad: "Systemic discrimination detected. High-risk individuals denied coverage entirely."
        },
        client: "LifeGuard Insurance",
        conceptTaught: "Insurance fairness and protected classes"
    },
    {
        id: 14,
        name: 'Tenant Screening',
        icon: '🏠',
        description: 'AI that evaluates rental applications and predicts tenant reliability.',
        category: 'housing',
        euRiskTier: 'high',
        stakes: 2,
        correctAnswers: {
            map: ['discrimination', 'housing_access', 'accuracy'],
            measure: ['fair_housing_test', 'error_analysis'],
            manage: ['human_review', 'adverse_action_notice'],
            govern: ['housing_authority', 'fair_housing_org']
        },
        consequences: {
            excellent: "Fair housing access maintained. Qualified renters approved regardless of protected characteristics.",
            good: "Generally fair screening. Some legitimate applicants require additional review.",
            poor: "Housing discrimination concerns. Families with children and minorities disproportionately rejected.",
            bad: "Housing segregation perpetuated. Violations of fair housing laws. Government investigation."
        },
        client: "Metro Property Management",
        conceptTaught: "Housing discrimination and AI"
    },
    {
        id: 15,
        name: 'Exam Proctoring',
        icon: '✍️',
        description: 'AI that monitors students during online exams for cheating detection.',
        category: 'education',
        euRiskTier: 'high',
        stakes: 2,
        correctAnswers: {
            map: ['privacy', 'false_accusations', 'stress'],
            measure: ['accuracy_validation', 'bias_testing'],
            manage: ['human_review', 'appeal_process'],
            govern: ['student_advocates', 'privacy_office']
        },
        consequences: {
            excellent: "Academic integrity maintained with fairness. Students treated respectfully, false positives rare.",
            good: "Most exams proctored fairly. Some technical issues but generally well-managed.",
            poor: "Student complaints about invasive monitoring. Some false cheating accusations.",
            bad: "Student mental health crisis. Discriminatory flagging of neurodivergent students. Class action lawsuit."
        },
        client: "Online University Platform",
        conceptTaught: "Student surveillance and algorithmic fairness"
    }
];

const PHASES = ['map', 'measure', 'manage', 'govern'];

const OPTIONS = {
    map: [
        { id: 'discrimination', label: 'Discrimination', icon: '⚖️', desc: 'Bias against protected groups' },
        { id: 'privacy', label: 'Privacy Violation', icon: '🔒', desc: 'Unauthorized data use or exposure' },
        { id: 'safety', label: 'Safety Risk', icon: '⚠️', desc: 'Physical or mental harm potential' },
        { id: 'misinformation', label: 'Misinformation', icon: '📰', desc: 'Spreading false or misleading info' },
        { id: 'addiction', label: 'Addiction/Overuse', icon: '🎮', desc: 'Compulsive usage patterns' },
        { id: 'false_positives', label: 'False Positives', icon: '❌', desc: 'Incorrect blocking or flagging' },
        { id: 'bias', label: 'Algorithmic Bias', icon: '📊', desc: 'Systematic errors favoring groups' },
        { id: 'due_process', label: 'Due Process Violation', icon: '📜', desc: 'Undermining fair legal procedure' },
        { id: 'cybersecurity', label: 'Cybersecurity Risk', icon: '🔐', desc: 'Vulnerability to attacks' },
        { id: 'outages', label: 'System Outages', icon: '🔌', desc: 'Critical service disruptions' },
        { id: 'copyright', label: 'Copyright Infringement', icon: '©️', desc: 'Unauthorized use of IP' },
        { id: 'consent', label: 'Consent Issues', icon: '✋', desc: 'Lack of informed permission' },
        { id: 'access', label: 'Access Barriers', icon: '🚪', desc: 'Unfair exclusion from services' },
        { id: 'financial_exclusion', label: 'Financial Exclusion', icon: '💸', desc: 'Denial of financial services' },
        { id: 'false_accusations', label: 'False Accusations', icon: '🚫', desc: 'Wrongful blame or charges' },
        { id: 'liability', label: 'Liability Uncertainty', icon: '⚡', desc: 'Unclear responsibility for harm' },
        { id: 'ethics', label: 'Ethical Dilemmas', icon: '🤔', desc: 'Moral conflicts in decisions' },
        { id: 'artist_impact', label: 'Artist Livelihood Impact', icon: '🎭', desc: 'Economic harm to creators' },
        { id: 'attribution', label: 'Attribution Problems', icon: '📝', desc: 'Credit not properly given' },
        { id: 'stress', label: 'Psychological Stress', icon: '😰', desc: 'Mental health burden' },
        { id: 'housing_access', label: 'Housing Access', icon: '🏘️', desc: 'Discrimination in housing' },
        { id: 'mental_health', label: 'Mental Health Impact', icon: '🧠', desc: 'Psychological wellbeing effects' },
        { id: 'frustration', label: 'User Frustration', icon: '😤', desc: 'Poor user experience' },
        { id: 'accuracy', label: 'Accuracy Concerns', icon: '🎯', desc: 'Precision and reliability issues' },
        { id: 'transparency', label: 'Transparency Gaps', icon: '👁️', desc: 'Lack of explainability' },
        { id: 'radicalization', label: 'Radicalization Risk', icon: '📢', desc: 'Extremist content promotion' }
    ],
    measure: [
        { id: 'bias_testing', label: 'Bias Testing', icon: '🧪', desc: 'Demographic parity assessments' },
        { id: 'clinical_trials', label: 'Clinical Validation', icon: '🔬', desc: 'Medical accuracy studies' },
        { id: 'satisfaction', label: 'User Satisfaction', icon: '😊', desc: 'Customer experience metrics' },
        { id: 'time_spent', label: 'Engagement Metrics', icon: '⏱️', desc: 'Usage duration analysis' },
        { id: 'demographic_parity', label: 'Fairness Metrics', icon: '📊', desc: 'Equal outcome rates across groups' },
        { id: 'accuracy', label: 'Accuracy Testing', icon: '🎯', desc: 'Precision and recall measurements' },
        { id: 'bias_audit', label: 'Algorithmic Audit', icon: '🔍', desc: 'Independent bias investigation' },
        { id: 'fairness_metrics', label: 'Fairness Evaluation', icon: '⚖️', desc: 'Equity across demographics' },
        { id: 'safety_testing', label: 'Safety Testing', icon: '🛡️', desc: 'Risk scenario simulation' },
        { id: 'incident_analysis', label: 'Incident Analysis', icon: '📋', desc: 'Failure case review' },
        { id: 'reliability_metrics', label: 'Reliability Metrics', icon: '📈', desc: 'Uptime and consistency measures' },
        { id: 'penetration_testing', label: 'Penetration Testing', icon: '🕵️', desc: 'Security vulnerability checks' },
        { id: 'content_filtering', label: 'Content Auditing', icon: '🚫', desc: 'Harmful content detection' },
        { id: 'training_data_audit', label: 'Training Data Review', icon: '💾', desc: 'Source data examination' },
        { id: 'accuracy_rates', label: 'Accuracy Analysis', icon: '✓', desc: 'True/false positive rates' },
        { id: 'fair_housing_test', label: 'Fair Housing Testing', icon: '🏠', desc: 'Housing discrimination audit' },
        { id: 'error_analysis', label: 'Error Analysis', icon: '❌', desc: 'Failure pattern review' },
        { id: 'accuracy_validation', label: 'Accuracy Validation', icon: '✅', desc: 'Performance verification' },
        { id: 'disparate_impact', label: 'Disparate Impact Study', icon: '📉', desc: 'Differential outcomes analysis' },
        { id: 'audit', label: 'External Audit', icon: '👔', desc: 'Third-party assessment' },
        { id: 'escalation_rate', label: 'Escalation Tracking', icon: '📞', desc: 'Human handoff monitoring' },
        { id: 'error_rates', label: 'Error Rate Monitoring', icon: '📉', desc: 'Mistake tracking' },
        { id: 'harmful_content', label: 'Harm Content Review', icon: '⚠️', desc: 'Toxic content assessment' },
        { id: 'false_rejection', label: 'False Rejection Rate', icon: '🚫', desc: 'Wrongful denial tracking' },
        { id: 'outcome_tracking', label: 'Outcome Tracking', icon: '📊', desc: 'Long-term result monitoring' },
        { id: 'demographic_analysis', label: 'Demographic Analysis', icon: '👥', desc: 'Population impact study' }
    ],
    manage: [
        { id: 'human_oversight', label: 'Human Oversight', icon: '👁️', desc: 'Human review of AI decisions' },
        { id: 'doctor_override', label: 'Expert Override', icon: '👨‍⚕️', desc: 'Professional can override AI' },
        { id: 'human_handoff', label: 'Human Handoff', icon: '🤝', desc: 'Escalation to human agents' },
        { id: 'algorithmic_transparency', label: 'Transparency', icon: '🔍', desc: 'Explain how system works' },
        { id: 'explanations', label: 'Right to Explanation', icon: '📝', desc: 'Clear decision rationale' },
        { id: 'user_whitelist', label: 'User Controls', icon: '⚙️', desc: 'Allow user customization' },
        { id: 'prohibit', label: 'Prohibit Use', icon: '🚫', desc: 'Ban the application entirely' },
        { id: 'human_only', label: 'Human-Only Decisions', icon: '👤', desc: 'Remove AI from process' },
        { id: 'kill_switch', label: 'Emergency Shutdown', icon: '⛔', desc: 'Immediate stop capability' },
        { id: 'manual_override', label: 'Manual Override', icon: '🎮', desc: 'Human can take control' },
        { id: 'fail_safe', label: 'Fail-Safe Mode', icon: '🔒', desc: 'Default to safe state' },
        { id: 'watermarking', label: 'Content Watermarking', icon: '💧', desc: 'Mark AI-generated content' },
        { id: 'opt_out', label: 'Opt-Out Mechanism', icon: '✋', desc: 'Allow exclusion from training' },
        { id: 'strict_limits', label: 'Strict Usage Limits', icon: '📏', desc: 'Constrained deployment' },
        { id: 'human_review', label: 'Mandatory Human Review', icon: '👥', desc: 'Human check required' },
        { id: 'appeal_process', label: 'Appeal Process', icon: '📜', desc: 'Challenge decision pathway' },
        { id: 'adverse_action_notice', label: 'Adverse Action Notice', icon: '📄', desc: 'Explain rejections' },
        { id: 'disclosure', label: 'AI Disclosure', icon: '📢', desc: 'Inform users of AI use' },
        { id: 'training', label: 'User Training', icon: '🎓', desc: 'Educate on proper use' },
        { id: 'user_controls', label: 'User Control Features', icon: '🎛️', desc: 'Customization options' },
        { id: 'feedback', label: 'Feedback System', icon: '💬', desc: 'User input collection' },
        { id: 'transparency', label: 'Transparency Reports', icon: '📊', desc: 'Public accountability' },
        { id: 'explanation', label: 'Explainable Decisions', icon: '💡', desc: 'Clear reasoning provided' },
        { id: 'appeal_rights', label: 'Appeal Rights', icon: '⚖️', desc: 'Right to challenge' },
        { id: 'prohibit_public', label: 'Prohibit Public Use', icon: '🏛️', desc: 'Ban public deployment' }
    ],
    govern: [
        { id: 'ethics_board', label: 'Ethics Board', icon: '🏛️', desc: 'Internal oversight committee' },
        { id: 'medical_board', label: 'Professional Body', icon: '⚕️', desc: 'Industry regulator oversight' },
        { id: 'compliance_team', label: 'Compliance Team', icon: '✅', desc: 'Legal/regulatory review' },
        { id: 'regulatory_compliance', label: 'Regulatory Compliance', icon: '📋', desc: 'Meet legal requirements' },
        { id: 'financial_regulators', label: 'Financial Regulators', icon: '🏦', desc: 'Banking authority oversight' },
        { id: 'it_team', label: 'IT Governance', icon: '💻', desc: 'Technical oversight' },
        { id: 'judicial_oversight', label: 'Judicial Oversight', icon: '⚖️', desc: 'Court system monitoring' },
        { id: 'civil_rights_groups', label: 'Civil Rights Groups', icon: '✊', desc: 'Advocacy organization input' },
        { id: 'admissions_committee', label: 'Admissions Committee', icon: '🎓', desc: 'Educational oversight' },
        { id: 'applicant_advocates', label: 'Applicant Advocates', icon: '🤝', desc: 'Student representation' },
        { id: 'transport_regulators', label: 'Transport Regulators', icon: '🚦', desc: 'Vehicle safety oversight' },
        { id: 'safety_boards', label: 'Safety Boards', icon: '🛡️', desc: 'Accident investigation' },
        { id: 'energy_regulators', label: 'Energy Regulators', icon: '⚡', desc: 'Grid authority oversight' },
        { id: 'cybersecurity_agency', label: 'Cybersecurity Agency', icon: '🔐', desc: 'Security oversight' },
        { id: 'copyright_office', label: 'Copyright Office', icon: '©️', desc: 'IP rights protection' },
        { id: 'artist_guilds', label: 'Artist Guilds', icon: '🎨', desc: 'Creator representation' },
        { id: 'privacy_commission', label: 'Privacy Commission', icon: '🔒', desc: 'Data protection authority' },
        { id: 'civil_liberties', label: 'Civil Liberties Union', icon: '🗽', desc: 'Rights protection group' },
        { id: 'insurance_regulators', label: 'Insurance Regulators', icon: '🛡️', desc: 'Insurance oversight' },
        { id: 'consumer_protection', label: 'Consumer Protection', icon: '🛡️', desc: 'Consumer advocacy' },
        { id: 'housing_authority', label: 'Housing Authority', icon: '🏘️', desc: 'Fair housing enforcement' },
        { id: 'fair_housing_org', label: 'Fair Housing Org', icon: '⚖️', desc: 'Housing rights group' },
        { id: 'student_advocates', label: 'Student Advocates', icon: '🎓', desc: 'Student representation' },
        { id: 'privacy_office', label: 'Privacy Office', icon: '🔏', desc: 'Institutional privacy unit' },
        { id: 'affected_workers', label: 'Job Applicants', icon: '👥', desc: 'Fair hiring advocates' },
        { id: 'patients', label: 'Patients', icon: '🤒', desc: 'Healthcare advocates' },
        { id: 'customers', label: 'Customers', icon: '🛒', desc: 'Service users' },
        { id: 'users', label: 'Users', icon: '👤', desc: 'General users' },
        { id: 'consumer_advocates', label: 'Consumer Advocates', icon: '🛡️', desc: 'Fair treatment advocates' },
        { id: 'mental_health_experts', label: 'Mental Health Experts', icon: '🧠', desc: 'Psychological safety advocates' }
    ]
};

// Game State
const state = {
    currentSystemIndex: 0,
    currentPhaseIndex: 0,
    score: 0,
    selections: { map: [], measure: [], manage: [], govern: [] },
    completedSystems: [],
    gameComplete: false,
    difficulty: 'standard',
    systemsInGame: [],
    phaseTimer: null,
    timeRemaining: null,
    consecutiveCorrect: 0,
    totalAnswered: 0,
    correctCount: 0
};

// DOM Elements
const elements = {
    gameBoard: document.getElementById('game-board'),
    score: document.getElementById('score'),
    currentSystem: document.getElementById('current-system'),
    totalSystems: document.getElementById('total-systems'),
    nextBtn: document.getElementById('next-btn'),
    helpBtn: document.getElementById('help-btn'),
    helpModal: document.getElementById('help-modal')
};

// Use shared shuffle utility
const shuffleArray = GameUtils.shuffleArray;

function getDifficultyConfig() {
    return DIFFICULTY_CONFIG[state.difficulty] || DIFFICULTY_CONFIG.standard;
}

function updateAdaptiveDifficulty() {
    if (state.totalAnswered < 3) return; // Wait for enough data
    
    const accuracy = state.correctCount / state.totalAnswered;
    const oldDifficulty = state.difficulty;
    
    if (accuracy > 0.8 && state.difficulty !== 'expert') {
        state.difficulty = 'expert';
    } else if (accuracy < 0.5 && state.difficulty !== 'beginner') {
        state.difficulty = 'beginner';
    } else if (accuracy >= 0.5 && accuracy <= 0.8 && state.difficulty !== 'standard') {
        state.difficulty = 'standard';
    }
    
    if (oldDifficulty !== state.difficulty) {
        showDifficultyChange(oldDifficulty, state.difficulty);
    }
}

function showDifficultyChange(oldDiff, newDiff) {
    const config = DIFFICULTY_CONFIG[newDiff];
    const notification = document.createElement('div');
    notification.className = 'difficulty-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">📊</span>
            <div>
                <strong>Difficulty Adjusted</strong>
                <p>${config.name} Mode: ${config.description}</p>
            </div>
        </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
    
    updateDifficultyBadge();
}

function updateDifficultyBadge() {
    const existing = document.querySelector('.difficulty-badge');
    if (existing) existing.remove();
    
    const badge = document.createElement('div');
    badge.className = `difficulty-badge ${state.difficulty}`;
    badge.innerHTML = DIFFICULTY_CONFIG[state.difficulty].name;
    document.querySelector('.header-center').appendChild(badge);
}

function startPhaseTimer() {
    const config = getDifficultyConfig();
    if (!config.timeLimit) return;
    
    state.timeRemaining = config.timeLimit;
    updateTimerDisplay();
    
    state.phaseTimer = setInterval(() => {
        state.timeRemaining--;
        updateTimerDisplay();
        
        if (state.timeRemaining <= 0) {
            clearInterval(state.phaseTimer);
            autoAdvance();
        }
    }, 1000);
}

function updateTimerDisplay() {
    let timerEl = document.querySelector('.phase-timer');
    if (!timerEl) {
        timerEl = document.createElement('div');
        timerEl.className = 'phase-timer';
        document.querySelector('.phase-indicator').appendChild(timerEl);
    }
    
    timerEl.textContent = `⏱️ ${state.timeRemaining}s`;
    timerEl.classList.toggle('urgent', state.timeRemaining <= 10);
}

function clearPhaseTimer() {
    if (state.phaseTimer) {
        clearInterval(state.phaseTimer);
        state.phaseTimer = null;
    }
}

function autoAdvance() {
    elements.nextBtn.click();
}

// Rendering Functions
function renderStartScreen() {
    elements.gameBoard.innerHTML = `
        <div class="start-screen">
            <div class="game-logo">📋</div>
            <h1>Risk Assessment Protocol</h1>
            <p class="tagline">Map, Measure, Manage, Govern</p>
            
            <div class="difficulty-selector">
                <h3>Select Difficulty</h3>
                <div class="difficulty-options">
                    <button class="difficulty-option ${state.difficulty === 'beginner' ? 'selected' : ''}" 
                            onclick="selectDifficulty('beginner')">
                        <span class="diff-icon">🌱</span>
                        <span class="diff-name">Beginner</span>
                        <span class="diff-desc">Hints & explanations</span>
                    </button>
                    <button class="difficulty-option ${state.difficulty === 'standard' ? 'selected' : ''}" 
                            onclick="selectDifficulty('standard')">
                        <span class="diff-icon">⚖️</span>
                        <span class="diff-name">Standard</span>
                        <span class="diff-desc">Normal challenge</span>
                    </button>
                    <button class="difficulty-option ${state.difficulty === 'expert' ? 'selected' : ''}" 
                            onclick="selectDifficulty('expert')">
                        <span class="diff-icon">🔥</span>
                        <span class="diff-name">Expert</span>
                        <span class="diff-desc">Time pressure</span>
                    </button>
                </div>
            </div>
            
            <div class="framework-preview">
                <div class="framework-item">
                    <span class="icon">🗺️</span>
                    <span class="name">MAP</span>
                </div>
                <div class="framework-item">
                    <span class="icon">📏</span>
                    <span class="name">MEASURE</span>
                </div>
                <div class="framework-item">
                    <span class="icon">🛡️</span>
                    <span class="name">MANAGE</span>
                </div>
                <div class="framework-item">
                    <span class="icon">⚖️</span>
                    <span class="name">GOVERN</span>
                </div>
            </div>
            
            <button class="btn btn-primary" onclick="startGame()" style="font-size: 18px; padding: 18px 36px;">
                Start Assessment
            </button>
            
            <p class="version-info">v1.1 • 15 Systems • Adaptive Difficulty</p>
        </div>
    `;
    elements.nextBtn.disabled = true;
}

function selectDifficulty(diff) {
    state.difficulty = diff;
    renderStartScreen();
}

function updatePhaseIndicator() {
    document.querySelectorAll('.phase').forEach((el, i) => {
        el.classList.toggle('active', i === state.currentPhaseIndex);
    });
}

function getFilteredOptions(phase, system) {
    const allOptions = OPTIONS[phase];
    const correctIds = system.correctAnswers[phase];
    
    // Always include correct answers
    let availableOptions = allOptions.filter(opt => correctIds.includes(opt.id));
    
    // Add some distractors based on difficulty
    const config = getDifficultyConfig();
    const distractorCount = config.showHints ? 2 : 4;
    
    const distractors = allOptions
        .filter(opt => !correctIds.includes(opt.id))
        .sort(() => Math.random() - 0.5)
        .slice(0, distractorCount);
    
    availableOptions = [...availableOptions, ...distractors];
    
    return availableOptions.sort(() => Math.random() - 0.5);
}

function renderPhase() {
    clearPhaseTimer();
    
    const system = state.systemsInGame[state.currentSystemIndex];
    const phase = PHASES[state.currentPhaseIndex];
    const config = getDifficultyConfig();
    
    elements.currentSystem.textContent = state.currentSystemIndex + 1;
    elements.score.textContent = state.score;
    updatePhaseIndicator();
    
    const tierBadge = config.showRiskTier 
        ? `<div class="risk-tier-badge ${system.euRiskTier}">EU AI Act: ${system.euRiskTier.toUpperCase()} RISK</div>`
        : '<div class="risk-tier-badge hidden-tier">Risk tier hidden in Expert mode</div>';
    
    const clientInfo = `<div class="client-badge">👤 Client: ${system.client}</div>`;
    
    const hint = config.showHints && phase === 'map' 
        ? `<div class="hint-box">💡 <strong>Hint:</strong> Consider ${system.correctAnswers.map.length} key risk${system.correctAnswers.map.length > 1 ? 's' : ''} for this system</div>`
        : '';
    
    if (phase === 'govern') {
        renderGovernPhase(system, config, clientInfo);
        startPhaseTimer();
        return;
    }
    
    const options = getFilteredOptions(phase, system);
    
    const phaseIcon = phase === 'map' ? '🗺️' : phase === 'measure' ? '📏' : '🛡️';
    const phaseTitle = phase === 'map' ? 'MAP: Identify Risks' : phase === 'measure' ? 'MEASURE: How to Assess' : 'MANAGE: Mitigation Strategies';

    elements.gameBoard.innerHTML = `
        <div class="card system-card gc-slide-in">
            <div class="system-icon">${system.icon}</div>
            <h2 class="system-name">${system.name}</h2>
            <p class="system-description">${system.description}</p>
            ${tierBadge}
            ${clientInfo}

            <h3 style="margin-bottom: var(--space-md);">${phaseIcon} ${phaseTitle}</h3>
            ${hint}
            <p style="color: var(--color-text-secondary); margin-bottom: var(--space-lg);">
                Select ${config.minSelection > 1 ? `at least ${config.minSelection}` : 'all that apply'}:
            </p>

            <div class="options-hand" id="options-container">
                ${options.map(opt => `
                    <div class="option-card" data-id="${opt.id}" onclick="toggleSelection('${phase}', '${opt.id}')">
                        <h4>${opt.icon} ${opt.label}</h4>
                        <p>${opt.desc}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    // Trigger deal animation on option cards
    GameUtils.dealCards(document.getElementById('options-container'));
    
    restoreSelections(phase);
    elements.nextBtn.disabled = state.selections[phase].length < config.minSelection;
    elements.nextBtn.innerHTML = '<span>Continue</span><span class="btn-icon">→</span>';
    
    startPhaseTimer();
}

function renderGovernPhase(system, config, clientInfo) {
    const options = getFilteredOptions('govern', system);
    
    elements.gameBoard.innerHTML = `
        <div class="card system-card gc-slide-in">
            <div class="system-icon">${system.icon}</div>
            <h2 class="system-name">${system.name}</h2>
            <p class="system-description">${system.description}</p>
            ${clientInfo}

            <h3 style="margin-bottom: var(--space-md);">⚖️ GOVERN: Stakeholder Engagement</h3>
            <p style="color: var(--color-text-secondary); margin-bottom: var(--space-lg);">
                Select the key stakeholders for this system:
            </p>

            <div class="stakeholder-table" id="stakeholder-container">
                ${options.map(s => `
                    <div class="stakeholder-card" data-id="${s.id}" onclick="toggleSelection('govern', '${s.id}')">
                        <div class="stakeholder-icon">${s.icon}</div>
                        <div class="stakeholder-name">${s.name}</div>
                        <div class="stakeholder-concern">${s.concern}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    GameUtils.dealCards(document.getElementById('stakeholder-container'));
    
    restoreSelections('govern');
    elements.nextBtn.disabled = state.selections.govern.length === 0;
    elements.nextBtn.innerHTML = '<span>Submit Assessment</span><span class="btn-icon">✓</span>';
}

function restoreSelections(phase) {
    state.selections[phase].forEach(id => {
        const card = document.querySelector(`[data-id="${id}"]`);
        if (card) card.classList.add('selected');
    });
}

function toggleSelection(phase, id) {
    const config = getDifficultyConfig();
    const idx = state.selections[phase].indexOf(id);
    
    if (idx > -1) {
        state.selections[phase].splice(idx, 1);
    } else {
        state.selections[phase].push(id);
    }
    
    const card = document.querySelector(`[data-id="${id}"]`);
    if (card) {
        card.classList.toggle('selected', idx === -1);
    }
    
    elements.nextBtn.disabled = state.selections[phase].length < config.minSelection;
}

function calculateScore() {
    const system = state.systemsInGame[state.currentSystemIndex];
    const phase = PHASES[state.currentPhaseIndex];
    let phaseScore = 0;
    
    const correct = system.correctAnswers[phase];
    let correctCount = 0;
    
    state.selections[phase].forEach(id => {
        if (correct.includes(id)) {
            correctCount++;
            phaseScore += 25;
        } else {
            phaseScore -= 5; // Penalty for incorrect selection
        }
    });
    
    // Bonus for getting all correct
    if (correctCount === correct.length && state.selections[phase].length === correct.length) {
        phaseScore += 10;
    }
    
    phaseScore = Math.max(0, phaseScore);
    state.score += phaseScore;
    
    // Track for adaptive difficulty
    state.totalAnswered++;
    if (correctCount >= correct.length * 0.8) {
        state.correctCount++;
    }
    
    return { phaseScore, correctCount, totalCorrect: correct.length };
}

function countCorrect(phase) {
    const system = state.systemsInGame[state.currentSystemIndex];
    const correct = system.correctAnswers[phase];
    let count = 0;
    state.selections[phase].forEach(id => {
        if (correct.includes(id)) count++;
    });
    return { count, total: correct.length };
}

function getPerformanceLevel(phaseScores) {
    const totalPossible = 400; // 4 phases * 100
    const percentage = (phaseScores / totalPossible) * 100;
    
    if (percentage >= 90) return 'excellent';
    if (percentage >= 70) return 'good';
    if (percentage >= 50) return 'poor';
    return 'bad';
}

function showResults() {
    clearPhaseTimer();
    
    const system = state.systemsInGame[state.currentSystemIndex];
    const mapCorrect = countCorrect('map');
    const measureCorrect = countCorrect('measure');
    const manageCorrect = countCorrect('manage');
    const governCorrect = countCorrect('govern');
    
    const totalCorrect = mapCorrect.count + measureCorrect.count + manageCorrect.count + governCorrect.count;
    const totalPossible = mapCorrect.total + measureCorrect.total + manageCorrect.total + governCorrect.total;
    const percentage = (totalCorrect / totalPossible) * 100;
    
    const performanceLevel = getPerformanceLevel(percentage * 4);
    const consequence = system.consequences[performanceLevel];
    
    elements.gameBoard.innerHTML = `
        <div class="card">
            <h2 style="text-align: center; margin-bottom: var(--space-lg);">Assessment Complete</h2>
            
            <div class="result-summary">
                <h3>${system.icon} ${system.name}</h3>
                <div class="client-info">Client: ${system.client}</div>
                
                <div class="score-breakdown">
                    <div class="score-item ${mapCorrect.count === mapCorrect.total ? 'perfect' : ''}">
                        <div class="score-item-value" style="color: var(--color-map);">${mapCorrect.count}/${mapCorrect.total}</div>
                        <div class="score-item-label">Map</div>
                    </div>
                    <div class="score-item ${measureCorrect.count === measureCorrect.total ? 'perfect' : ''}">
                        <div class="score-item-value" style="color: var(--color-measure);">${measureCorrect.count}/${measureCorrect.total}</div>
                        <div class="score-item-label">Measure</div>
                    </div>
                    <div class="score-item ${manageCorrect.count === manageCorrect.total ? 'perfect' : ''}">
                        <div class="score-item-value" style="color: var(--color-manage);">${manageCorrect.count}/${manageCorrect.total}</div>
                        <div class="score-item-label">Manage</div>
                    </div>
                    <div class="score-item ${governCorrect.count === governCorrect.total ? 'perfect' : ''}">
                        <div class="score-item-value" style="color: var(--color-govern);">${governCorrect.count}/${governCorrect.total}</div>
                        <div class="score-item-label">Govern</div>
                    </div>
                </div>
                
                <div class="performance-bar">
                    <div class="performance-fill" style="width: ${percentage}%; background: ${getPerformanceColor(percentage)}"></div>
                    <span class="performance-text">${Math.round(percentage)}%</span>
                </div>
            </div>
            
            <div class="consequence-box ${performanceLevel}">
                <h4><span class="consequence-icon">${getConsequenceIcon(performanceLevel)}</span> Outcome</h4>
                <p>${consequence}</p>
            </div>
            
            <div class="concept-taught">
                <strong>💡 Concept:</strong> ${system.conceptTaught}
            </div>
            
            <div class="eu-tier-info">
                <span class="tier-badge ${system.euRiskTier}">${system.euRiskTier.toUpperCase()} RISK</span>
                <span class="tier-explanation">${getTierExplanation(system.euRiskTier)}</span>
            </div>
        </div>
    `;
    
    elements.score.textContent = state.score;
    elements.nextBtn.disabled = false;
    elements.nextBtn.innerHTML = state.currentSystemIndex < state.systemsInGame.length - 1 
        ? '<span>Next System</span><span class="btn-icon">→</span>'
        : '<span>Final Report</span><span class="btn-icon">📊</span>';
    
    updateAdaptiveDifficulty();
}

function getPerformanceColor(percentage) {
    if (percentage >= 80) return '#10B981';
    if (percentage >= 60) return '#F59E0B';
    return '#EF4444';
}

function getConsequenceIcon(level) {
    const icons = { excellent: '🏆', good: '✅', poor: '⚠️', bad: '❌' };
    return icons[level] || '❓';
}

function getTierExplanation(tier) {
    const explanations = {
        unacceptable: 'Prohibited AI practices under EU AI Act',
        high: 'Strict compliance required - human oversight mandatory',
        limited: 'Transparency obligations apply',
        minimal: 'Voluntary codes of conduct'
    };
    return explanations[tier] || '';
}

function renderFinalReport() {
    clearPhaseTimer();
    state.gameComplete = true;
    
    const maxScore = state.systemsInGame.length * 400;
    const percentage = Math.round((state.score / maxScore) * 100);
    
    let rating = '';
    let ratingIcon = '';
    if (percentage >= 90) { rating = 'Risk Management Expert'; ratingIcon = '🏆'; }
    else if (percentage >= 75) { rating = 'Senior Risk Analyst'; ratingIcon = '⭐'; }
    else if (percentage >= 60) { rating = 'Risk Analyst'; ratingIcon = '🔍'; }
    else if (percentage >= 40) { rating = 'Junior Assessor'; ratingIcon = '📚'; }
    else { rating = 'Trainee'; ratingIcon = '🌱'; }
    
    const domains = [...new Set(state.systemsInGame.map(s => s.category))];
    
    elements.gameBoard.innerHTML = `
        <div class="start-screen">
            <div class="game-logo" style="font-size: 80px;">${ratingIcon}</div>
            <div class="final-score">${state.score}</div>
            <div class="rating">${rating}</div>
            <p style="color: var(--color-text-secondary); margin-bottom: var(--space-md);">
                You assessed ${state.systemsInGame.length} AI systems
            </p>
            <p style="color: var(--color-text-secondary); margin-bottom: var(--space-xl); font-size: 14px;">
                Domains covered: ${domains.join(', ')}
            </p>
            
            <div class="final-stats">
                <div class="stat-item">
                    <span class="stat-value">${state.systemsInGame.length}</span>
                    <span class="stat-label">Systems</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">${percentage}%</span>
                    <span class="stat-label">Accuracy</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">${DIFFICULTY_CONFIG[state.difficulty].name}</span>
                    <span class="stat-label">Difficulty</span>
                </div>
            </div>
            
            <button class="btn btn-primary" onclick="resetGame()" style="font-size: 16px; padding: 16px 32px; margin-top: var(--space-xl);">
                New Assessment
            </button>
        </div>
    `;
    
    elements.nextBtn.disabled = true;
}

function startGame() {
    // Select 10 random systems from the 15 available
    state.systemsInGame = shuffleArray(SYSTEMS_DATABASE).slice(0, 10);
    state.currentSystemIndex = 0;
    state.currentPhaseIndex = 0;
    state.score = 0;
    state.selections = { map: [], measure: [], manage: [], govern: [] };
    state.completedSystems = [];
    state.gameComplete = false;
    state.consecutiveCorrect = 0;
    state.totalAnswered = 0;
    state.correctCount = 0;
    
    elements.totalSystems.textContent = state.systemsInGame.length;
    updateDifficultyBadge();
    renderPhase();
}

function resetGame() {
    clearPhaseTimer();
    state.difficulty = 'standard';
    renderStartScreen();
}

function nextStep() {
    if (state.currentPhaseIndex < PHASES.length - 1) {
        calculateScore();
        state.currentPhaseIndex++;
        state.selections[PHASES[state.currentPhaseIndex]] = [];
        renderPhase();
    } else if (state.currentSystemIndex < state.systemsInGame.length - 1) {
        calculateScore();
        showResults();
        state.currentSystemIndex++;
        state.currentPhaseIndex = 0;
        state.selections = { map: [], measure: [], manage: [], govern: [] };
    } else if (!state.gameComplete) {
        calculateScore();
        showResults();
    } else {
        renderFinalReport();
    }
}

// Event Listeners
elements.nextBtn.addEventListener('click', () => {
    if (elements.nextBtn.textContent.includes('Submit')) {
        calculateScore();
        showResults();
    } else if (elements.nextBtn.textContent.includes('Next')) {
        nextStep();
    } else if (elements.nextBtn.textContent.includes('Final')) {
        renderFinalReport();
    }
});

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

document.addEventListener('keydown', (e) => {
    if (e.key === '?' || e.key === '/') {
        e.preventDefault();
        elements.helpModal.classList.toggle('hidden');
    }
    if (e.key === 'Escape') {
        elements.helpModal.classList.add('hidden');
    }
    if (e.key === 'Enter' && !elements.nextBtn.disabled) {
        elements.nextBtn.click();
    }
});

// Initialize
renderStartScreen();
