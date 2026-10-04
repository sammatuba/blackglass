/**
 * Bias Bounty - Game Logic (Full Version v1.1)
 * A collaborative investigation game about AI bias patterns
 * 
 * Improvements in v1.1:
 * - Foundation framework alignment (UNESCO, OECD, NIST, EU)
 * - Real-world consequence visualization
 * - Concept mastery assessment (quiz system)
 * - Adaptive difficulty system
 * - Enhanced progress persistence
 */

// ========================================
// Game Configuration
// ========================================

const CONFIG = {
    version: '1.1.0',
    difficulties: {
        beginner: { timer: 90, hints: true, scoreMultiplier: 1, label: 'Beginner' },
        standard: { timer: 60, hints: true, scoreMultiplier: 1.5, label: 'Standard' },
        expert: { timer: 45, hints: false, scoreMultiplier: 2, label: 'Expert' }
    }
};

// ========================================
// Foundation Frameworks Reference
// ========================================

const FRAMEWORKS = {
    unesco: {
        name: 'UNESCO AI Competency',
        icon: '📚',
        dimensions: ['Human-Centred Mindset', 'Ethics of AI', 'AI Techniques', 'AI System Design']
    },
    oecd: {
        name: 'OECD AI Principles',
        icon: '🌍',
        principles: ['Inclusive Growth', 'Human-Centred Values', 'Transparency', 'Robustness/Safety', 'Accountability']
    },
    nist: {
        name: 'NIST AI RMF',
        icon: '🏛️',
        functions: ['MAP (Context)', 'MEASURE (Analysis)', 'MANAGE (Mitigation)', 'GOVERN (Culture)']
    },
    eu: {
        name: 'EU Ethics Guidelines',
        icon: '🇪🇺',
        requirements: ['Human Agency', 'Robustness', 'Privacy', 'Transparency', 'Fairness', 'Well-being', 'Accountability']
    }
};

// ========================================
// Hints System
// ========================================

const HINTS = {
    'bad-start': {
        general: [
            'Look for words like "trained on", "historical", "past", "years of data"',
            'Ask: What data did the AI learn from? Was that data biased?',
            'Think: Did the AI inherit existing inequalities?'
        ],
        levels: [
            '💡 Level 1: This involves historical data patterns',
            '💡💡 Level 2: The AI learned from past decisions that may have been biased',
            '💡💡💡 Level 3: This is BAD START - the AI was trained on biased historical data'
        ]
    },
    'wrong-measuring': {
        general: [
            'Look for words like "measures", "optimizes", "metric", "score"',
            'Ask: Is the AI measuring the right thing?',
            'Think: Does the metric match the real goal?'
        ],
        levels: [
            '💡 Level 1: This involves measurement or metrics',
            '💡💡 Level 2: The AI is optimizing for something that doesn\'t match the real goal',
            '💡💡💡 Level 3: This is WRONG MEASURING - the metric is flawed'
        ]
    },
    'sneaky-shortcuts': {
        general: [
            'Look for words like "correlates with", "proxies", "indirect", "never asks directly"',
            'Ask: Is the AI using something as a stand-in for something else?',
            'Think: Can you see hidden connections that might relate to protected traits?'
        ],
        levels: [
            '💡 Level 1: This involves correlations or indirect patterns',
            '💡💡 Level 2: The AI uses one factor as a proxy for another',
            '💡💡💡 Level 3: This is SNEAKY SHORTCUTS - hidden discrimination through proxies'
        ]
    }
};

// ========================================
// Game Data - Systems
// ========================================

const SYSTEMS = [
    {
        id: 'hiring-helper',
        name: 'Hiring Helper',
        description: 'Helps companies sort job applications to find the "best" candidates faster.',
        usage: 'Used by over 500 companies',
        goal: 'Find qualified workers quickly',
        icon: '💼',
        category: 'employment',
        realWorldExample: 'Amazon AI recruiting tool showed bias against women (2018)'
    },
    {
        id: 'loan-approver',
        name: 'Loan Approver',
        description: 'Helps banks decide who gets approved for home loans and at what rates.',
        usage: 'Used by major banks nationwide',
        goal: 'Predict who will repay loans',
        icon: '🏦',
        category: 'finance',
        realWorldExample: 'Apple Card algorithm investigated for gender bias (2019)'
    },
    {
        id: 'health-predictor',
        name: 'Health Predictor',
        description: 'Helps hospitals identify patients who might need extra care after discharge.',
        usage: 'Used in 200+ hospitals',
        goal: 'Prevent return hospital visits',
        icon: '🏥',
        category: 'healthcare',
        realWorldExample: 'Optum algorithm showed racial bias in healthcare (2019)'
    },
    {
        id: 'school-sorter',
        name: 'School Sorter',
        description: 'Helps schools identify students who might need extra support or tutoring.',
        usage: 'Used by districts in 15 states',
        goal: 'Allocate teaching resources',
        icon: '🎓',
        category: 'education',
        realWorldExample: 'UK A-level algorithm disadvantaged state school students (2020)'
    },
    {
        id: 'crime-forecaster',
        name: 'Crime Forecaster',
        description: 'Helps police decide where to patrol based on predicted "high-risk" areas.',
        usage: 'Used by police in major cities',
        goal: 'Prevent crime before it happens',
        icon: '👮',
        category: 'criminal_justice',
        realWorldExample: 'PredPol algorithm showed bias in Los Angeles (2021)'
    },
    {
        id: 'insurance-rater',
        name: 'Insurance Rater',
        description: 'Helps insurance companies set prices for car insurance for new customers.',
        usage: 'Used by major auto insurers',
        goal: 'Predict who will have accidents',
        icon: '🚗',
        category: 'finance',
        realWorldExample: 'Auto insurance algorithms charged minorities more (2015 study)'
    },
    {
        id: 'content-recommender',
        name: 'Content Recommender',
        description: 'Decides what videos, posts, and news to show users on social media platforms.',
        usage: 'Used by all major social networks',
        goal: 'Keep users engaged longer',
        icon: '📱',
        category: 'social_media',
        realWorldExample: 'Facebook algorithm amplified divisive content (internal research 2021)'
    },
    {
        id: 'voice-recognizer',
        name: 'Voice Recognizer',
        description: 'Converts spoken words to text for voice assistants and dictation tools.',
        usage: 'Used in phones, cars, and homes',
        goal: 'Understand spoken commands',
        icon: '🎤',
        category: 'technology',
        realWorldExample: 'Speech recognition systems show 16% error rate for Black speakers vs 3% for white (Stanford 2020)'
    }
];

// ========================================
// Game Data - Problems with Framework Alignment & Impact
// ========================================

const PROBLEMS = [
    // Hiring Helper Problems
    {
        id: 'hh-1',
        systemId: 'hiring-helper',
        title: 'Historical Male Dominance',
        description: 'The AI was trained on 10 years of hiring decisions from tech companies. During those years, 73% of people hired were men.',
        affected: ['Women applicants'],
        affectedStats: 'Women 3x less likely to be recommended',
        pattern: 'bad-start',
        explanation: 'This is BAD START because the AI learned from historical data that reflected past discrimination.',
        frameworks: {
            unesco: ['Ethics of AI', 'AI Techniques'],
            oecd: ['Human-Centred Values', 'Transparency'],
            nist: ['MAP (Context)'],
            eu: ['Fairness', 'Transparency']
        },
        impact: {
            description: 'Perpetuates gender gaps in tech industry',
            statistics: 'Tech workforce only 25% women despite 50% of computer science degrees',
            realWorld: 'Amazon discontinued their tool after discovering this bias'
        }
    },
    {
        id: 'hh-2',
        systemId: 'hiring-helper',
        title: 'Name-Based Scoring',
        description: 'Researchers sent identical resumes with different names. "John" scored 87/100, "Jamal" scored 72/100, "Emily" scored 79/100, "Lakisha" scored 65/100.',
        affected: ['People with non-white names'],
        affectedStats: 'Black-sounding names get 50% fewer callbacks',
        pattern: 'sneaky-shortcuts',
        explanation: 'This is SNEAKY SHORTCUTS because the AI learned to associate certain names with lower qualifications, even though names don\'t indicate ability.',
        frameworks: {
            unesco: ['Human-Centred Mindset', 'Ethics of AI'],
            oecd: ['Inclusive Growth', 'Human-Centred Values'],
            nist: ['MEASURE (Analysis)'],
            eu: ['Fairness', 'Human Agency']
        },
        impact: {
            description: 'Direct discrimination in hiring opportunities',
            statistics: 'Identical resumes with Black names get 50% fewer interview callbacks',
            realWorld: 'NBER study confirmed this bias persists across industries'
        }
    },
    {
        id: 'hh-3',
        systemId: 'hiring-helper',
        title: 'Employment Gap Penalty',
        description: 'The AI penalizes "employment gaps" longer than 6 months. This hurts people who took time off for childcare, had illness, or did gig work.',
        affected: ['Caregivers (mostly women)', 'People with health challenges', 'Gig economy workers'],
        affectedStats: 'Caregivers penalized despite qualifications',
        pattern: 'wrong-measuring',
        explanation: 'This is WRONG MEASURING because gaps don\'t measure qualification—many skilled people have valid reasons for career breaks.',
        frameworks: {
            unesco: ['AI Techniques', 'AI System Design'],
            oecd: ['Robustness/Safety'],
            nist: ['MEASURE (Analysis)'],
            eu: ['Robustness', 'Fairness']
        },
        impact: {
            description: 'Penalizes caregivers and people with health challenges',
            statistics: '73% of caregivers are women, 40% leave workforce temporarily',
            realWorld: 'Many qualified candidates screened out by gap filters'
        }
    },
    
    // Loan Approver Problems
    {
        id: 'la-1',
        systemId: 'loan-approver',
        title: 'Historical Redlining',
        description: 'The AI was trained on 20 years of loan decisions. During those years, banks often rejected qualified applicants in certain neighborhoods (redlining). The AI learned these patterns.',
        affected: ['Residents of historically excluded neighborhoods'],
        affectedStats: 'Minority neighborhoods face higher rejection rates',
        pattern: 'bad-start',
        explanation: 'This is BAD START because the AI learned from historical lending discrimination against minority neighborhoods.',
        frameworks: {
            unesco: ['Ethics of AI', 'Human-Centred Mindset'],
            oecd: ['Inclusive Growth', 'Accountability'],
            nist: ['MAP (Context)'],
            eu: ['Fairness', 'Accountability']
        },
        impact: {
            description: 'Perpetuates wealth gaps through housing discrimination',
            statistics: 'Homeownership gap: 73% white vs 44% Black households',
            realWorld: 'Redlining was illegalized in 1968 but effects persist in data'
        }
    },
    {
        id: 'la-2',
        systemId: 'loan-approver',
        title: 'Zip Code Proxies',
        description: 'The AI charges higher interest rates in certain zip codes. Those zip codes have higher percentages of Black and Latino residents. The AI never asks about race directly.',
        affected: ['Black and Latino applicants'],
        affectedStats: 'Up to $500/year more in interest payments',
        pattern: 'sneaky-shortcuts',
        explanation: 'This is SNEAKY SHORTCUTS because the AI uses zip codes as a hidden proxy for race to discriminate indirectly.',
        frameworks: {
            unesco: ['AI Techniques', 'Ethics of AI'],
            oecd: ['Transparency', 'Human-Centred Values'],
            nist: ['MEASURE (Analysis)'],
            eu: ['Transparency', 'Fairness']
        },
        impact: {
            description: 'Indirect racial discrimination in lending',
            statistics: 'Minority borrowers pay $500M more in interest annually',
            realWorld: 'CFPB has investigated zip-code based pricing discrimination'
        }
    },
    {
        id: 'la-3',
        systemId: 'loan-approver',
        title: 'Credit Score Limitations',
        description: 'The AI uses credit score as the main factor. But credit scores don\'t account for: medical debt (often unavoidable), predatory lending history, or discrimination in past credit access.',
        affected: ['People with medical emergencies', 'Victims of predatory lending', 'Those denied credit history building'],
        affectedStats: 'Medical debt affects 100M Americans',
        pattern: 'wrong-measuring',
        explanation: 'This is WRONG MEASURING because credit scores are an incomplete measure of loan repayment ability.',
        frameworks: {
            unesco: ['AI Techniques', 'AI System Design'],
            oecd: ['Robustness/Safety'],
            nist: ['MEASURE (Analysis)'],
            eu: ['Robustness', 'Fairness']
        },
        impact: {
            description: 'Excludes creditworthy borrowers due to flawed metrics',
            statistics: '100M Americans have medical debt affecting credit scores',
            realWorld: 'Many borrowers with medical debt are actually lower-risk'
        }
    },
    
    // Health Predictor Problems
    {
        id: 'hp-1',
        systemId: 'health-predictor',
        title: 'Spending vs. Need Confusion',
        description: 'The AI predicts who needs extra care based on past hospital spending. Historically, Black patients received less care for the same conditions. The AI learned that "less spending" means "less need"—but it actually meant "less access."',
        affected: ['Black patients needing care'],
        affectedStats: 'Black patients receive less care for same conditions',
        pattern: 'bad-start',
        explanation: 'This is BAD START because the AI learned from historical healthcare disparities that under-treated Black patients.',
        frameworks: {
            unesco: ['Human-Centred Mindset', 'Ethics of AI'],
            oecd: ['Human-Centred Values', 'Inclusive Growth'],
            nist: ['MAP (Context)'],
            eu: ['Fairness', 'Human Agency']
        },
        impact: {
            description: 'Denies care to those who need it most',
            statistics: 'Black patients 47M under-treated annually due to algorithmic bias',
            realWorld: 'Optum algorithm affected 49 million patients'
        }
    },
    {
        id: 'hp-2',
        systemId: 'health-predictor',
        title: 'Skin Tone Detection Failure',
        description: 'The AI was tested mostly on patients at wealthy hospitals. It works well for white patients. It misses warning signs in darker skin tones because symptoms look different on different skin.',
        affected: ['Patients with darker skin'],
        affectedStats: 'Diagnostic accuracy 10-15% lower for dark skin',
        pattern: 'sneaky-shortcuts',
        explanation: 'This is SNEAKY SHORTCUTS because the AI relies on visual patterns that correlate with race rather than actual medical indicators.',
        frameworks: {
            unesco: ['AI Techniques', 'Human-Centred Mindset'],
            oecd: ['Robustness/Safety'],
            nist: ['MEASURE (Analysis)'],
            eu: ['Robustness', 'Fairness']
        },
        impact: {
            description: 'Delayed diagnosis and treatment for darker-skinned patients',
            statistics: 'Pulse oximeters 3x more likely to miss low oxygen in Black patients',
            realWorld: 'COVID-19 revealed widespread pulse oximeter racial bias'
        }
    },
    {
        id: 'hp-3',
        systemId: 'health-predictor',
        title: 'Universal "Normal" Ranges',
        description: 'The AI defines "healthy" based on averages from population studies. But "normal" heart rates, blood pressure, and lab values differ by age, sex, and ethnicity. Healthy individuals get flagged incorrectly.',
        affected: ['Women (different heart symptoms)', 'Elderly (different "normal" ranges)', 'Non-white ethnicities'],
        affectedStats: 'Women 50% more likely to be misdiagnosed for heart issues',
        pattern: 'wrong-measuring',
        explanation: 'This is WRONG MEASURING because the AI uses a single standard that doesn\'t account for legitimate biological variation.',
        frameworks: {
            unesco: ['AI Techniques', 'AI System Design'],
            oecd: ['Robustness/Safety'],
            nist: ['MEASURE (Analysis)'],
            eu: ['Robustness', 'Fairness']
        },
        impact: {
            description: 'Misdiagnosis due to one-size-fits-all standards',
            statistics: 'Women 50% more likely to be misdiagnosed for heart attacks',
            realWorld: 'Many conditions present differently across demographics'
        }
    },
    
    // School Sorter Problems
    {
        id: 'ss-1',
        systemId: 'school-sorter',
        title: 'Historical Tracking',
        description: 'The AI was trained on decades of student data from schools that historically tracked Black and Latino students into vocational programs while steering white students to college prep.',
        affected: ['Black and Latino students', 'Students from low-income families'],
        affectedStats: 'Tracking persists despite similar test scores',
        pattern: 'bad-start',
        explanation: 'This is BAD START because the AI learned from historical educational tracking that limited opportunities for minority students.',
        frameworks: {
            unesco: ['Human-Centred Mindset', 'Ethics of AI'],
            oecd: ['Inclusive Growth', 'Human-Centred Values'],
            nist: ['MAP (Context)'],
            eu: ['Fairness', 'Human Agency']
        },
        impact: {
            description: 'Limits educational opportunities for minority students',
            statistics: 'Black students 2x more likely to be in remedial tracks',
            realWorld: 'Gifted programs remain segregated nationwide'
        }
    },
    {
        id: 'ss-2',
        systemId: 'school-sorter',
        title: 'Test Score Over-Reliance',
        description: 'The AI relies heavily on standardized test scores. But these tests favor students from wealthy districts with test prep resources. The AI never asks about a student\'s growth potential or obstacles overcome.',
        affected: ['Students from under-resourced schools', 'Students with test anxiety', 'English language learners'],
        affectedStats: 'Test scores correlate more with income than ability',
        pattern: 'wrong-measuring',
        explanation: 'This is WRONG MEASURING because test scores measure access to resources more than actual learning potential.',
        frameworks: {
            unesco: ['AI Techniques', 'AI System Design'],
            oecd: ['Robustness/Safety'],
            nist: ['MEASURE (Analysis)'],
            eu: ['Robustness', 'Fairness']
        },
        impact: {
            description: 'Misidentifies talented students from disadvantaged backgrounds',
            statistics: 'SAT scores correlate 0.4 with family income',
            realWorld: 'Many colleges dropped SAT requirements due to equity concerns'
        }
    },
    {
        id: 'ss-3',
        systemId: 'school-sorter',
        title: 'Behavior Bias',
        description: 'The AI flags students as "needing support" based on disciplinary records. But Black students are disciplined more harshly for the same behaviors as white students. The AI treats the records as objective truth.',
        affected: ['Black students', 'Students with disabilities', 'Boys (more harshly disciplined than girls)'],
        affectedStats: 'Black students 3.5x more likely to be suspended',
        pattern: 'sneaky-shortcuts',
        explanation: 'This is SNEAKY SHORTCUTS because the AI uses disciplinary records as a proxy for needing help, when records reflect biased discipline practices.',
        frameworks: {
            unesco: ['Ethics of AI', 'AI Techniques'],
            oecd: ['Transparency', 'Accountability'],
            nist: ['MEASURE (Analysis)'],
            eu: ['Fairness', 'Transparency']
        },
        impact: {
            description: 'Disproportionately labels minority students as problems',
            statistics: 'Black students 3.5x more likely to be suspended for same behavior',
            realWorld: 'School-to-prison pipeline disproportionately affects Black students'
        }
    },
    
    // Crime Forecaster Problems
    {
        id: 'cf-1',
        systemId: 'crime-forecaster',
        title: 'Arrest Data Feedback Loop',
        description: 'The AI predicts crime based on historical arrest data. But police have historically arrested more people in minority neighborhoods for the same behaviors. The AI sends police back to those neighborhoods, creating more arrests there.',
        affected: ['Residents of over-policed neighborhoods', 'Black and Latino communities'],
        affectedStats: 'Predictions create self-fulfilling prophecies',
        pattern: 'bad-start',
        explanation: 'This is BAD START because the AI learned from biased policing data that over-represented crime in minority areas.',
        frameworks: {
            unesco: ['Human-Centred Mindset', 'Ethics of AI'],
            oecd: ['Accountability', 'Human-Centred Values'],
            nist: ['MAP (Context)'],
            eu: ['Accountability', 'Fairness']
        },
        impact: {
            description: 'Creates self-fulfilling prophecy of over-policing',
            statistics: 'Predictive policing 2x more likely to target minority areas',
            realWorld: 'Feedback loop documented in Chicago, Los Angeles, and other cities'
        }
    },
    {
        id: 'cf-2',
        systemId: 'crime-forecaster',
        title: 'Geographic Proxies',
        description: 'The AI flags "high-risk" areas using factors like: 911 call volume, nuisance complaints, and building code violations. These correlate with poverty and race. The AI never sees the actual crime, just the neighborhood characteristics.',
        affected: ['Low-income neighborhoods', 'Communities of color', 'Renters in poorly maintained housing'],
        affectedStats: 'Poverty indicators used as crime proxies',
        pattern: 'sneaky-shortcuts',
        explanation: 'This is SNEAKY SHORTCUTS because the AI uses neighborhood characteristics as hidden proxies for race and class.',
        frameworks: {
            unesco: ['AI Techniques', 'Ethics of AI'],
            oecd: ['Transparency', 'Human-Centred Values'],
            nist: ['MEASURE (Analysis)'],
            eu: ['Transparency', 'Fairness']
        },
        impact: {
            description: 'Criminalizes poverty and neighborhood conditions',
            statistics: ' nuisance complaints 4x higher in poor neighborhoods',
            realWorld: 'Many cities have banned predictive policing due to bias'
        }
    },
    {
        id: 'cf-3',
        systemId: 'crime-forecaster',
        title: 'Predictive Policing Harms',
        description: 'The AI measures success by "crime prevented"—meaning fewer reported incidents in patrolled areas. But heavy policing can suppress reporting (people stop calling police they don\'t trust) while increasing surveillance harm.',
        affected: ['Over-surveilled communities', 'Victims who avoid police', 'People stopped without cause'],
        affectedStats: 'Community trust declines with increased surveillance',
        pattern: 'wrong-measuring',
        explanation: 'This is WRONG MEASURING because "fewer reports" doesn\'t mean "less crime"—it can mean less community trust.',
        frameworks: {
            unesco: ['AI Techniques', 'AI System Design'],
            oecd: ['Robustness/Safety'],
            nist: ['MEASURE (Analysis)'],
            eu: ['Robustness', 'Human Agency']
        },
        impact: {
            description: 'Erodes community trust while claiming success',
            statistics: 'Stop-and-frisk reduced crime reports by 20% in targeted areas',
            realWorld: 'Broken trust leads to unsolved crimes in over-policed communities'
        }
    },
    
    // Insurance Rater Problems
    {
        id: 'ir-1',
        systemId: 'insurance-rater',
        name: 'Neighborhood Rating Bias',
        description: 'The AI was trained on decades of insurance data from an era when companies explicitly charged higher rates in minority neighborhoods. Though now illegal, the historical patterns persist in the data.',
        affected: ['Residents of historically redlined areas', 'Urban drivers in minority neighborhoods'],
        affectedStats: 'Rates up to 30% higher in minority zip codes',
        pattern: 'bad-start',
        explanation: 'This is BAD START because the AI learned pricing patterns from the era of explicitly racist insurance practices.',
        frameworks: {
            unesco: ['Human-Centred Mindset', 'Ethics of AI'],
            oecd: ['Inclusive Growth', 'Accountability'],
            nist: ['MAP (Context)'],
            eu: ['Fairness', 'Accountability']
        },
        impact: {
            description: 'Perpetuates historical discrimination in pricing',
            statistics: 'Minority neighborhoods pay 30% more for same coverage',
            realWorld: 'California banned ZIP code as primary rating factor (2020)'
        }
    },
    {
        id: 'ir-2',
        systemId: 'insurance-rater',
        title: 'Occupation Proxies',
        description: 'The AI considers occupation as a risk factor. Certain jobs correlate with race and class: "professional" jobs get discounts, "service" jobs get penalties. The AI never asks about actual driving behavior.',
        affected: ['Working-class drivers', 'Service industry workers', 'Immigrants in certain job categories'],
        affectedStats: 'Service workers pay $200-400 more annually',
        pattern: 'sneaky-shortcuts',
        explanation: 'This is SNEAKY SHORTCUTS because occupation acts as a hidden proxy for race and class in pricing.',
        frameworks: {
            unesco: ['AI Techniques', 'Ethics of AI'],
            oecd: ['Transparency', 'Human-Centred Values'],
            nist: ['MEASURE (Analysis)'],
            eu: ['Transparency', 'Fairness']
        },
        impact: {
            description: 'Penalizes working-class drivers through job-based pricing',
            statistics: 'Service workers pay average $300 more annually',
            realWorld: 'Some states have banned occupation-based insurance pricing'
        }
    },
    {
        id: 'ir-3',
        systemId: 'insurance-rater',
        title: 'Driving Score Limitations',
        description: 'The AI uses telematics (driving behavior tracking) to set rates. But it measures hard braking, which happens more in: stop-and-go city traffic, areas with jaywalking, and neighborhoods without crosswalks.',
        affected: ['City drivers', 'Low-income areas with poor infrastructure', 'Delivery drivers'],
        affectedStats: 'Urban drivers penalized for infrastructure issues',
        pattern: 'wrong-measuring',
        explanation: 'This is WRONG MEASURING because "hard braking" measures road conditions and infrastructure more than driving skill.',
        frameworks: {
            unesco: ['AI Techniques', 'AI System Design'],
            oecd: ['Robustness/Safety'],
            nist: ['MEASURE (Analysis)'],
            eu: ['Robustness', 'Fairness']
        },
        impact: {
            description: 'Penalizes drivers for poor infrastructure in their neighborhoods',
            statistics: 'City drivers score 25% "worse" due to traffic conditions',
            realWorld: 'Telematics scoring heavily favors suburban drivers'
        }
    },
    
    // Content Recommender Problems
    {
        id: 'cr-1',
        systemId: 'content-recommender',
        title: 'Engagement Optimization',
        description: 'The AI was trained on billions of user interactions showing that outrage, fear, and controversy drive clicks. It learned to amplify divisive content because that\'s what got engagement historically.',
        affected: ['All users exposed to polarizing content', 'Democracies with misinformation', 'Vulnerable to radicalization'],
        affectedStats: 'Divisive content gets 3x more engagement',
        pattern: 'bad-start',
        explanation: 'This is BAD START because the AI learned from user behavior that rewarded sensational and divisive content.',
        frameworks: {
            unesco: ['Human-Centred Mindset', 'Ethics of AI'],
            oecd: ['Human-Centred Values', 'Inclusive Growth'],
            nist: ['MAP (Context)'],
            eu: ['Societal Well-being', 'Human Agency']
        },
        impact: {
            description: 'Amplifies polarization and undermines democracy',
            statistics: 'Misinformation spreads 6x faster than factual content',
            realWorld: 'Facebook internal research showed Instagram harmed teen mental health'
        }
    },
    {
        id: 'cr-2',
        systemId: 'content-recommender',
        title: 'Filter Bubbles',
        description: 'The AI shows users content similar to what they engaged with before. Over time, users only see one perspective. The AI never asks if users want to see diverse viewpoints—it just optimizes for clicks.',
        affected: ['Users seeking diverse perspectives', 'Society\'s shared reality', 'Political discourse'],
        affectedStats: 'Users rarely see opposing viewpoints',
        pattern: 'sneaky-shortcuts',
        explanation: 'This is SNEAKY SHORTCUTS because the AI uses past clicks as a proxy for "what users want" rather than measuring actual satisfaction or knowledge gain.',
        frameworks: {
            unesco: ['AI Techniques', 'Human-Centred Mindset'],
            oecd: ['Transparency', 'Human-Centred Values'],
            nist: ['MEASURE (Analysis)'],
            eu: ['Transparency', 'Human Agency']
        },
        impact: {
            description: 'Creates echo chambers and reduces shared reality',
            statistics: 'Partisan polarization increased 40% since algorithmic feeds',
            realWorld: 'Filter bubbles documented across all major platforms'
        }
    },
    {
        id: 'cr-3',
        systemId: 'content-recommender',
        title: 'Addiction Design',
        description: 'The AI measures success by "time spent on platform." But this metric rewards addictive, endless-scrolling designs over content that actually informs or satisfies. The AI optimizes for addiction, not well-being.',
        affected: ['Users with addictive tendencies', 'Children and teens', 'Mental health of heavy users'],
        affectedStats: 'Teens spend average 7+ hours daily on screens',
        pattern: 'wrong-measuring',
        explanation: 'This is WRONG MEASURING because "time spent" doesn\'t measure value delivered—it often measures addiction and wasted time.',
        frameworks: {
            unesco: ['AI Techniques', 'AI System Design'],
            oecd: ['Robustness/Safety', 'Human-Centred Values'],
            nist: ['MEASURE (Analysis)'],
            eu: ['Human Agency', 'Societal Well-being']
        },
        impact: {
            description: 'Optimizes for addiction over user well-being',
            statistics: 'Teen depression rates doubled alongside social media adoption',
            realWorld: 'Multiple lawsuits allege platforms designed for addiction'
        }
    },
    
    // Voice Recognizer Problems
    {
        id: 'vr-1',
        systemId: 'voice-recognizer',
        title: 'Accent Bias',
        description: 'The AI was trained primarily on American English speakers from specific regions. It works well for those accents but fails for Southern US, Scottish, Indian, Nigerian, and many other English accents.',
        affected: ['Non-standard accent speakers', 'Immigrants', 'Regional dialect speakers'],
        affectedStats: 'Error rate 2x higher for non-standard accents',
        pattern: 'bad-start',
        explanation: 'This is BAD START because the AI learned from biased training data that under-represented diverse accents.',
        frameworks: {
            unesco: ['Human-Centred Mindset', 'AI Techniques'],
            oecd: ['Inclusive Growth', 'Human-Centred Values'],
            nist: ['MAP (Context)'],
            eu: ['Fairness', 'Inclusion']
        },
        impact: {
            description: 'Excludes speakers of non-standard English accents',
            statistics: 'Error rates 2x higher for Indian, Chinese, and African accents',
            realWorld: 'Many users abandon voice assistants due to recognition failures'
        }
    },
    {
        id: 'vr-2',
        systemId: 'voice-recognizer',
        title: 'Gender Recognition Failure',
        description: 'The AI was trained on voices labeled by binary gender (male/female). It struggles with: higher-pitched male voices, lower-pitched female voices, transgender voices, and non-binary voices. It forces everyone into two categories.',
        affected: ['Transgender individuals', 'Non-binary people', 'People with non-conforming voices'],
        affectedStats: 'Non-binary voices misclassified 40% of time',
        pattern: 'sneaky-shortcuts',
        explanation: 'This is SNEAKY SHORTCUTS because the AI uses pitch and tone as proxies for gender, which don\'t capture the complexity of human identity.',
        frameworks: {
            unesco: ['AI Techniques', 'Human-Centred Mindset'],
            oecd: ['Transparency', 'Human-Centred Values'],
            nist: ['MEASURE (Analysis)'],
            eu: ['Fairness', 'Human Agency']
        },
        impact: {
            description: 'Erases non-binary identities through forced binary classification',
            statistics: 'Non-binary voices misclassified 40% of the time',
            realWorld: 'Voice AI often fails transgender users post-transition'
        }
    },
    {
        id: 'vr-3',
        systemId: 'voice-recognizer',
        title: 'Dialect Discrimination',
        description: 'The AI measures "accuracy" against a single standard of "proper" English. But African American Vernacular English (AAVE) is linguistically valid—just different. The AI treats dialect differences as errors.',
        affected: ['AAVE speakers', 'Other non-standard dialect speakers', 'Bilingual English speakers'],
        affectedStats: 'AAVE 5x more likely to be marked as errors',
        pattern: 'wrong-measuring',
        explanation: 'This is WRONG MEASURING because the AI measures against one dialect standard rather than recognizing linguistic diversity.',
        frameworks: {
            unesco: ['AI Techniques', 'AI System Design'],
            oecd: ['Robustness/Safety'],
            nist: ['MEASURE (Analysis)'],
            eu: ['Fairness', 'Inclusion']
        },
        impact: {
            description: 'Devalues legitimate linguistic diversity',
            statistics: 'AAVE marked as error 5x more than standard English',
            realWorld: 'Affects millions of AAVE speakers accessing voice services'
        }
    }
];

// ========================================
// Pattern Definitions
// ========================================

const PATTERNS = [
    {
        id: 'bad-start',
        name: 'Bad Start',
        icon: '📚',
        color: '#DC2626',
        colorLight: '#FEE2E2',
        description: 'The AI learned from biased history',
        phrase: '"The past trained the future"',
        signs: ['References to historical data', 'Patterns that existed "for years"', 'Past discrimination affecting now'],
        examples: ['Historical hiring data', 'Past loan decisions', 'Previous arrest records']
    },
    {
        id: 'wrong-measuring',
        name: 'Wrong Measuring',
        icon: '📏',
        color: '#F59E0B',
        colorLight: '#FEF3C7',
        description: 'The AI measures success poorly',
        phrase: '"What gets measured gets misled"',
        signs: ['"Good at X but bad at Y"', 'Optimizing for wrong thing', 'Metric doesn\'t match real goal'],
        examples: ['Time spent vs satisfaction', 'Test scores vs ability', 'Credit score vs reliability']
    },
    {
        id: 'sneaky-shortcuts',
        name: 'Sneaky Shortcuts',
        icon: '🎭',
        color: '#16A34A',
        colorLight: '#DCFCE7',
        description: 'The AI finds hidden ways to discriminate',
        phrase: '"Correlation masquerading as truth"',
        signs: ['Patterns that "look like" something', 'Correlation used as causation', 'Hidden connections revealed'],
        examples: ['Zip codes as race proxy', 'Names as gender proxy', 'Behavior as need proxy']
    }
];

// ========================================
// Quiz Data - Assessment System
// ========================================

const QUIZ_QUESTIONS = [
    {
        id: 'q1',
        question: 'An AI loan approval system was trained on 20 years of historical loan data. During that period, banks explicitly discriminated against minority neighborhoods. The AI now rejects qualified applicants from those same neighborhoods. What pattern is this?',
        options: ['Bad Start', 'Wrong Measuring', 'Sneaky Shortcuts'],
        correct: 0,
        explanation: 'This is BAD START because the AI learned from historical data that contained past discrimination. The biased past is training the biased future.'
    },
    {
        id: 'q2',
        question: 'A healthcare AI uses "hospital spending" to predict who needs extra care. But it doesn\'t account for the fact that Black patients historically received less care for the same conditions. What pattern is this?',
        options: ['Bad Start', 'Wrong Measuring', 'Sneaky Shortcuts'],
        correct: 0,
        explanation: 'This is BAD START because the AI learned that "less spending = less need" when in fact it meant "less access due to discrimination."'
    },
    {
        id: 'q3',
        question: 'A hiring AI uses "employment gaps" as a major negative factor. This penalizes caregivers (mostly women), people with medical issues, and gig workers—even though many are highly qualified. What pattern is this?',
        options: ['Bad Start', 'Wrong Measuring', 'Sneaky Shortcuts'],
        correct: 1,
        explanation: 'This is WRONG MEASURING because employment gaps don\'t actually measure qualification. The metric is measuring something different from what matters.'
    },
    {
        id: 'q4',
        question: 'A school evaluation AI relies heavily on standardized test scores. But these scores correlate more with family income and test prep access than actual learning ability. What pattern is this?',
        options: ['Bad Start', 'Wrong Measuring', 'Sneaky Shortcuts'],
        correct: 1,
        explanation: 'This is WRONG MEASURING because test scores measure access to resources, not actual potential. The metric doesn\'t match the real goal.'
    },
    {
        id: 'q5',
        question: 'An insurance AI charges higher rates in certain zip codes—without ever asking about race. Those zip codes happen to have higher percentages of Black and Latino residents. What pattern is this?',
        options: ['Bad Start', 'Wrong Measuring', 'Sneaky Shortcuts'],
        correct: 2,
        explanation: 'This is SNEAKY SHORTCUTS because the AI uses zip codes as a hidden proxy for race. It discriminates without explicitly mentioning the protected characteristic.'
    },
    {
        id: 'q6',
        question: 'A voice recognition AI works well for "standard" American accents but fails for Southern US, Indian, Nigerian, and Scottish accents. It was trained primarily on news broadcasts from specific regions. What pattern is this?',
        options: ['Bad Start', 'Wrong Measuring', 'Sneaky Shortcuts'],
        correct: 0,
        explanation: 'This is BAD START because the AI was trained on limited, unrepresentative data. The training data bias creates performance bias.'
    },
    {
        id: 'q7',
        question: 'A predictive policing AI measures its success by "fewer crime reports" in patrolled areas. But heavy policing suppresses reporting (people stop calling police they don\'t trust). What pattern is this?',
        options: ['Bad Start', 'Wrong Measuring', 'Sneaky Shortcuts'],
        correct: 1,
        explanation: 'This is WRONG MEASURING because "fewer reports" doesn\'t mean "less crime." The metric is measuring community trust, not safety.'
    },
    {
        id: 'q8',
        question: 'A content recommendation AI shows users more of what they clicked before. Over time, users only see one political perspective. The AI uses past clicks as a proxy for "what users want." What pattern is this?',
        options: ['Bad Start', 'Wrong Measuring', 'Sneaky Shortcuts'],
        correct: 2,
        explanation: 'This is SNEAKY SHORTCUTS because clicks are a poor proxy for actual satisfaction or knowledge gain. The AI creates filter bubbles through this shortcut.'
    }
];

// ========================================
// Game Phases
// ========================================

const PHASES = [
    { id: 'REVEAL_SYSTEM', name: 'Reveal System', duration: 0 },
    { id: 'REVEAL_PROBLEMS', name: 'Reveal Problems', duration: 0 },
    { id: 'OBSERVE', name: 'Observe', duration: 60 },
    { id: 'DISCUSS', name: 'Discuss & Vote', duration: 0 },
    { id: 'COMMIT', name: 'Commit', duration: 0 },
    { id: 'REFLECT', name: 'Reflect', duration: 0 }
];

// ========================================
// Game State
// ========================================

const state = {
    currentSystemIndex: 0,
    currentPhase: 0,
    score: 0,
    selections: {}, // problemId -> patternId
    timer: null,
    timeRemaining: 0,
    gameComplete: false,
    correctAnswers: 0,
    totalAttempts: 0,
    systemsPlayed: 0,
    difficulty: 'standard', // beginner, standard, expert
    hintLevel: {}, // problemId -> hintLevel (0-2)
    quizResults: {
        preQuiz: null,
        postQuiz: null
    },
    conceptMastery: {
        'bad-start': { correct: 0, total: 0 },
        'wrong-measuring': { correct: 0, total: 0 },
        'sneaky-shortcuts': { correct: 0, total: 0 }
    },
    frameworksEncountered: new Set(),
    impactsRevealed: [],
    startTime: null,
    hintUsage: 0
};

// ========================================
// DOM Elements
// ========================================

const elements = {
    gameBoard: document.getElementById('game-board'),
    phaseIndicator: document.getElementById('phase-indicator'),
    phaseNumber: document.querySelector('.phase-number'),
    phaseName: document.querySelector('.phase-name'),
    score: document.getElementById('score'),
    systemCounter: document.getElementById('system-counter'),
    prevBtn: document.getElementById('prev-btn'),
    nextBtn: document.getElementById('next-btn'),
    timerDisplay: document.getElementById('timer-display'),
    timerValue: document.getElementById('timer-value'),
    patternBar: document.getElementById('pattern-bar'),
    helpModal: document.getElementById('help-modal'),
    confettiCanvas: document.getElementById('confetti'),
    difficultySelector: null // Will be created dynamically
};

// ========================================
// Rendering Functions
// ========================================

function renderStartScreen() {
    const saved = loadProgress();
    const hasProgress = saved && saved.currentSystemIndex > 0;
    
    elements.gameBoard.innerHTML = `
        <div class="start-screen">
            <div class="game-logo">🔍</div>
            <h1>Bias Bounty <span class="version-badge">v${CONFIG.version}</span></h1>
            <p class="tagline">Find the hidden unfairness—before it finds you.</p>
            <p class="game-description">
                Investigate AI systems together and learn to recognize three patterns 
                of how unfairness enters automated decision-making. Now featuring 
                framework alignment, impact visualization, and skill assessment.
            </p>
            
            <div class="patterns-preview">
                <div class="pattern-mini bad-start">
                    <span class="icon">📚</span>
                    <span class="name">Bad Start</span>
                </div>
                <div class="pattern-mini wrong-measuring">
                    <span class="icon">📏</span>
                    <span class="name">Wrong Measuring</span>
                </div>
                <div class="pattern-mini sneaky-shortcuts">
                    <span class="icon">🎭</span>
                    <span class="name">Sneaky Shortcuts</span>
                </div>
            </div>
            
            <div class="difficulty-selector">
                <p class="selector-label">Select Difficulty:</p>
                <div class="difficulty-options">
                    <button class="difficulty-btn ${state.difficulty === 'beginner' ? 'selected' : ''}" 
                            onclick="selectDifficulty('beginner')"
                            title="Hints always visible, ${CONFIG.difficulties.beginner.timer}s timer">
                        🌱 Beginner
                    </button>
                    <button class="difficulty-btn ${state.difficulty === 'standard' ? 'selected' : ''}" 
                            onclick="selectDifficulty('standard')"
                            title="Standard hints, ${CONFIG.difficulties.standard.timer}s timer">
                        ⚖️ Standard
                    </button>
                    <button class="difficulty-btn ${state.difficulty === 'expert' ? 'selected' : ''}" 
                            onclick="selectDifficulty('expert')"
                            title="No hints, ${CONFIG.difficulties.expert.timer}s timer, 2x points">
                        🔥 Expert
                    </button>
                </div>
            </div>
            
            <div class="start-buttons">
                <button class="btn btn-primary start-btn" onclick="startGame()">
                    ${hasProgress ? 'New Game' : 'Start Investigation'}
                </button>
                ${hasProgress ? `
                    <button class="btn btn-secondary" onclick="continueGame()">
                        Continue (${saved.currentSystemIndex}/${SYSTEMS.length} systems)
                    </button>
                ` : ''}
                <button class="btn btn-secondary" onclick="showQuiz('pre')">
                    📋 Take Pre-Quiz
                </button>
            </div>
            
            ${hasProgress ? `
                <p class="saved-progress-info">
                    Previous score: ${saved.score} points | 
                    Difficulty: ${CONFIG.difficulties[saved.difficulty || 'standard'].label}
                </p>
            ` : ''}
            
            <div class="new-features">
                <p class="features-title">✨ New in v1.1:</p>
                <ul class="features-list">
                    <li>📚 Framework alignment (UNESCO, OECD, NIST, EU)</li>
                    <li>📊 Real-world impact visualization</li>
                    <li>📝 Concept mastery assessment</li>
                    <li>🎚️ Adaptive difficulty levels</li>
                    <li>💾 Progress persistence</li>
                </ul>
            </div>
        </div>
    `;
    elements.prevBtn.disabled = true;
    elements.nextBtn.style.display = 'none';
    elements.patternBar.classList.add('hidden');
}

function selectDifficulty(difficulty) {
    state.difficulty = difficulty;
    renderStartScreen(); // Re-render to show selected state
}

function renderSystemCard(system) {
    return `
        <div class="system-card-flip" id="system-flip-card" onclick="this.classList.add('flipped')">
            <div class="gc-card-inner">
                <div class="card-face card-back">
                    <span class="back-icon">🔍</span>
                    <span class="back-label">AI System</span>
                </div>
                <div class="card-face card-front">
                    <span class="system-icon">${system.icon}</span>
                    <h2>${system.name}</h2>
                    <p class="description">${system.description}</p>
                    <div class="system-meta">
                        <div class="meta-item">
                            <span class="meta-label">Usage</span>
                            <span class="meta-value">${system.usage}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Goal</span>
                            <span class="meta-value">${system.goal}</span>
                        </div>
                    </div>
                    <div class="real-world-example">
                        <span class="example-label">📰 Real World:</span>
                        <span class="example-text">${system.realWorldExample}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderProblemCard(problem, showSelection = false) {
    const affectedList = problem.affected.map(a => `<li>${a}</li>`).join('');
    const config = CONFIG.difficulties[state.difficulty];
    const showHints = config.hints;
    const currentHintLevel = state.hintLevel[problem.id] || 0;
    
    // Framework badges
    const frameworkBadges = [];
    if (problem.frameworks) {
        if (problem.frameworks.unesco) frameworkBadges.push('<span class="framework-badge unesco" title="UNESCO AI Competency">📚 UNESCO</span>');
        if (problem.frameworks.oecd) frameworkBadges.push('<span class="framework-badge oecd" title="OECD AI Principles">🌍 OECD</span>');
        if (problem.frameworks.nist) frameworkBadges.push('<span class="framework-badge nist" title="NIST AI RMF">🏛️ NIST</span>');
        if (problem.frameworks.eu) frameworkBadges.push('<span class="framework-badge eu" title="EU Ethics Guidelines">🇪🇺 EU</span>');
    }
    
    if (showSelection) {
        const currentSelection = state.selections[problem.id];
        const hints = HINTS[problem.pattern];
        
        return `
            <div class="problem-vote-card" data-problem="${problem.id}">
                <div class="card problem-card problem-preview">
                    <div class="problem-header">
                        <span class="problem-badge">Problem</span>
                        ${frameworkBadges.join('')}
                    </div>
                    <h3>${problem.title}</h3>
                    <p class="problem-description">${problem.description}</p>
                    <div class="affected-section">
                        <span class="affected-label">Who Was Affected</span>
                        <ul class="affected-list">${affectedList}</ul>
                    </div>
                    ${problem.affectedStats ? `
                        <div class="affected-stats">
                            📊 ${problem.affectedStats}
                        </div>
                    ` : ''}
                    ${showHints ? `
                        <div class="hint-section">
                            <button class="hint-btn" onclick="showHint('${problem.id}', event)">
                                💡 Need a hint? (${3 - currentHintLevel} remaining)
                            </button>
                            <div class="hint-display" id="hint-${problem.id}">
                                ${currentHintLevel > 0 ? hints.levels[currentHintLevel - 1] : 'Click for a hint'}
                            </div>
                        </div>
                    ` : ''}
                </div>
                <div class="pattern-options">
                    ${PATTERNS.map(p => `
                        <div class="pattern-option ${currentSelection === p.id ? 'selected' : ''}" 
                             data-pattern="${p.id}"
                             onclick="selectPattern('${problem.id}', '${p.id}')">
                            <span class="option-icon">${p.icon}</span>
                            <span class="option-name">${p.name}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    return `
        <div class="card problem-card" data-problem="${problem.id}">
            <div class="problem-header">
                <span class="problem-badge">Problem</span>
                ${frameworkBadges.join('')}
            </div>
            <h3>${problem.title}</h3>
            <p class="problem-description">${problem.description}</p>
            <div class="affected-section">
                <span class="affected-label">Who Was Affected</span>
                <ul class="affected-list">${affectedList}</ul>
            </div>
            ${problem.affectedStats ? `
                <div class="affected-stats">
                    📊 ${problem.affectedStats}
                </div>
            ` : ''}
        </div>
    `;
}

function renderPhase() {
    const phase = PHASES[state.currentPhase];
    const system = SYSTEMS[state.currentSystemIndex];
    const problems = PROBLEMS.filter(p => p.systemId === system.id);
    const config = CONFIG.difficulties[state.difficulty];
    
    // Update header
    elements.phaseNumber.textContent = state.currentPhase + 1;
    elements.phaseName.textContent = phase.name;
    elements.systemCounter.textContent = `System ${state.currentSystemIndex + 1}/${SYSTEMS.length} (${config.label})`;
    
    // Show/hide pattern bar
    if (state.currentPhase >= 2) {
        elements.patternBar.classList.remove('hidden');
    } else {
        elements.patternBar.classList.add('hidden');
    }
    
    // Render phase content
    switch(phase.id) {
        case 'REVEAL_SYSTEM':
            elements.gameBoard.innerHTML = `
                <h2 class="phase-title gc-slide-in">🔍 System Revealed</h2>
                ${renderSystemCard(system)}
                <p class="phase-instruction gc-slide-in" style="animation-delay:0.3s">
                    Tap the card to reveal the AI system you'll investigate.
                </p>
            `;
            elements.timerDisplay.classList.add('hidden');
            // Auto-flip after a short delay
            setTimeout(() => {
                const flipCard = document.getElementById('system-flip-card');
                if (flipCard) flipCard.classList.add('flipped');
            }, 800);
            break;

        case 'REVEAL_PROBLEMS':
            elements.gameBoard.innerHTML = `
                <h2 class="phase-title gc-slide-in">⚠️ Problems Found</h2>
                <div class="problems-grid" id="problems-container">
                    ${problems.map(p => renderProblemCard(p)).join('')}
                </div>
                <p class="phase-instruction gc-slide-in" style="animation-delay:0.5s">
                    Three specific problems have been identified with this system.
                    Take note of who was affected and what patterns you see.
                </p>
            `;
            // Trigger deal animation
            GameUtils.dealCards(document.getElementById('problems-container'));
            break;
            
        case 'OBSERVE':
            elements.gameBoard.innerHTML = `
                <div class="timer-phase">
                    <h2 class="phase-title">🤫 Silent Observation</h2>
                    <div class="timer-display-large" id="observation-timer">${config.timer}</div>
                    <p class="timer-message">
                        Study the problems in silence. Look for patterns that match 
                        the three types shown above. No talking—just think!
                    </p>
                    <div class="difficulty-indicator">
                        Mode: ${config.label} | Timer: ${config.timer}s
                    </div>
                </div>
            `;
            startTimer(config.timer, 'observation-timer');
            break;
            
        case 'DISCUSS':
            elements.gameBoard.innerHTML = `
                <h2 class="phase-title">💬 Discuss & Vote</h2>
                <div class="hints-bar" style="margin-bottom: var(--space-lg); padding: var(--space-md); background: var(--color-bg); border-radius: var(--radius-md); max-width: 900px;">
                    <p style="font-size: var(--font-size-sm); color: var(--color-text-secondary); margin-bottom: var(--space-sm);">
                        <strong>💡 Hint:</strong> Click a pattern type above to see clues
                    </p>
                    <div id="hint-display" style="font-size: var(--font-size-sm); font-style: italic; color: var(--color-text-muted);">
                        Hover over 📚 Bad Start, 📏 Wrong Measuring, or 🎭 Sneaky Shortcuts in the pattern bar above for hints
                    </div>
                </div>
                <div class="problem-pattern-grid">
                    ${problems.map(p => renderProblemCard(p, true)).join('')}
                </div>
                <p class="phase-instruction">
                    For each problem, select which pattern fits best. 
                    Discuss with your group—there may be multiple valid answers!
                </p>
            `;
            setupHintInteractions();
            break;
            
        case 'COMMIT':
            const allSelected = problems.every(p => state.selections[p.id]);
            elements.gameBoard.innerHTML = `
                <h2 class="phase-title">✓ Commit Your Answers</h2>
                <div class="card" style="max-width: 600px; text-align: center;">
                    <h3 style="margin-bottom: var(--space-lg);">Your Selections</h3>
                    ${problems.map(p => {
                        const selection = state.selections[p.id];
                        const pattern = PATTERNS.find(pat => pat.id === selection);
                        return `
                            <div style="margin-bottom: var(--space-md); padding: var(--space-md); background: var(--color-bg); border-radius: var(--radius-md);">
                                <strong>${p.title}</strong> → 
                                <span style="color: ${pattern?.color || 'inherit'}">${pattern?.icon || ''} ${pattern?.name || 'Not selected'}</span>
                            </div>
                        `;
                    }).join('')}
                    ${!allSelected ? '<p style="color: var(--color-bad-start); margin-top: var(--space-md);">⚠️ Please select a pattern for each problem</p>' : ''}
                </div>
                <p class="phase-instruction">
                    ${allSelected 
                        ? 'Ready to see how you did? Click Next to reveal the answers!' 
                        : 'Go back and make sure you\'ve selected a pattern for each problem.'}
                </p>
            `;
            elements.nextBtn.disabled = !allSelected;
            break;
            
        case 'REFLECT':
            renderResults(problems);
            break;
    }
    
    // Update button states
    elements.prevBtn.disabled = state.currentPhase === 0;
    elements.nextBtn.style.display = 'inline-flex';
    elements.nextBtn.disabled = false;
    
    if (phase.id === 'REFLECT') {
        elements.nextBtn.innerHTML = state.currentSystemIndex < SYSTEMS.length - 1 
            ? '<span>Next System</span><span class="btn-icon">→</span>'
            : '<span>See Final Score</span><span class="btn-icon">🏆</span>';
    } else {
        elements.nextBtn.innerHTML = '<span>Next Phase</span><span class="btn-icon">→</span>';
    }
}

// ... [Additional functions will be in the next part due to file size]


// ========================================
// Results & Impact Visualization
// ========================================

function renderResults(problems) {
    // Save progress after each system
    saveProgress();
    
    let points = 0;
    let correct = 0;
    const config = CONFIG.difficulties[state.difficulty];
    
    const resultsHtml = problems.map((problem, index) => {
        const selection = state.selections[problem.id];
        const isCorrect = selection === problem.pattern;
        
        // Track concept mastery
        state.conceptMastery[problem.pattern].total++;
        if (isCorrect) {
            const basePoints = 1;
            points += basePoints * config.scoreMultiplier;
            correct++;
            state.conceptMastery[problem.pattern].correct++;
        }
        
        // Track frameworks encountered
        if (problem.frameworks) {
            Object.keys(problem.frameworks).forEach(fw => state.frameworksEncountered.add(fw));
        }
        
        // Track impact
        if (problem.impact) {
            state.impactsRevealed.push({
                problem: problem.title,
                impact: problem.impact
            });
        }
        
        const selectedPattern = PATTERNS.find(p => p.id === selection);
        const correctPattern = PATTERNS.find(p => p.id === problem.pattern);
        
        const resultClass = isCorrect ? 'correct' : 'incorrect';
        const badgeText = isCorrect ? '✓ Correct' : '✗ Incorrect';
        
        // Stagger animation
        const delay = index * 0.15;
        
        // Framework badges
        const frameworkBadges = [];
        if (problem.frameworks) {
            if (problem.frameworks.unesco) frameworkBadges.push('<span class="framework-badge unesco">📚 UNESCO</span>');
            if (problem.frameworks.oecd) frameworkBadges.push('<span class="framework-badge oecd">🌍 OECD</span>');
            if (problem.frameworks.nist) frameworkBadges.push('<span class="framework-badge nist">🏛️ NIST</span>');
            if (problem.frameworks.eu) frameworkBadges.push('<span class="framework-badge eu">🇪🇺 EU</span>');
        }
        
        return `
            <div class="result-item ${resultClass}" style="animation-delay: ${delay}s">
                <div class="result-header">
                    <span class="result-problem">${problem.title}</span>
                    <span class="result-badge">${badgeText}</span>
                </div>
                <div class="framework-alignment">
                    ${frameworkBadges.join('')}
                </div>
                <div class="result-details">
                    <div class="result-answer">
                        <span class="answer-label">Your answer:</span>
                        <span class="answer-value" style="background: ${selectedPattern?.color || '#ccc'}20; color: ${selectedPattern?.color || '#666'}">
                            ${selectedPattern?.icon || ''} ${selectedPattern?.name || 'None'}
                        </span>
                    </div>
                    <div class="result-correct">
                        <span class="correct-label">Correct:</span>
                        <span class="correct-value" style="background: ${correctPattern?.color}20; color: ${correctPattern?.color}">
                            ${correctPattern?.icon} ${correctPattern?.name}
                        </span>
                    </div>
                </div>
                <div class="explanation-box">
                    <strong>Why:</strong> ${problem.explanation}
                </div>
                ${renderImpactSection(problem)}
            </div>
        `;
    }).join('');
    
    // Update score
    state.score += Math.round(points);
    state.correctAnswers += correct;
    state.totalAttempts += problems.length;
    elements.score.textContent = Math.round(state.score);
    
    // Calculate rating
    const accuracy = correct / problems.length;
    let rating = '';
    let ratingClass = '';
    
    if (accuracy === 1) {
        rating = '🌟 Perfect!';
        ratingClass = 'perfect';
        triggerConfetti();
    } else if (accuracy >= 0.67) {
        rating = '👏 Great job!';
        ratingClass = 'good';
    } else if (accuracy >= 0.33) {
        rating = '💪 Keep learning!';
        ratingClass = 'okay';
    } else {
        rating = '📚 Review the patterns';
        ratingClass = 'needs-work';
    }
    
    elements.gameBoard.innerHTML = `
        <h2 class="phase-title">🤔 Reflection</h2>
        <div class="results-container">
            ${resultsHtml}
            <div class="card round-summary" style="animation-delay: ${problems.length * 0.15}s">
                <h3>Round Score: ${Math.round(points)}/${problems.length * config.scoreMultiplier} (${config.label})</h3>
                <div class="rating ${ratingClass}">${rating}</div>
                ${renderConceptMastery()}
            </div>
        </div>
        <p class="phase-instruction">
            What did you learn about ${SYSTEMS[state.currentSystemIndex].name}? 
            Notice how bias can enter AI systems in different ways.
        </p>
    `;
}

function renderImpactSection(problem) {
    if (!problem.impact) return '';
    
    return `
        <div class="impact-section">
            <div class="impact-header">
                <span class="impact-icon">🌍</span>
                <span class="impact-title">Real-World Impact</span>
            </div>
            <p class="impact-description">${problem.impact.description}</p>
            <div class="impact-stats">
                <span class="stats-icon">📊</span>
                <span>${problem.impact.statistics}</span>
            </div>
            <div class="impact-case">
                <span class="case-icon">📰</span>
                <span>${problem.impact.realWorld}</span>
            </div>
        </div>
    `;
}

function renderConceptMastery() {
    const patterns = ['bad-start', 'wrong-measuring', 'sneaky-shortcuts'];
    const patternNames = {
        'bad-start': '📚 Bad Start',
        'wrong-measuring': '📏 Wrong Measuring',
        'sneaky-shortcuts': '🎭 Sneaky Shortcuts'
    };
    
    const masteryHtml = patterns.map(p => {
        const mastery = state.conceptMastery[p];
        const percentage = mastery.total > 0 ? Math.round((mastery.correct / mastery.total) * 100) : 0;
        let level = '🔴 Novice';
        if (percentage >= 80) level = '🟢 Master';
        else if (percentage >= 50) level = '🟡 Learning';
        
        return `
            <div class="mastery-item">
                <span class="mastery-pattern">${patternNames[p]}</span>
                <span class="mastery-level">${level}</span>
                <span class="mastery-score">${mastery.correct}/${mastery.total}</span>
            </div>
        `;
    }).join('');
    
    return `
        <div class="concept-mastery">
            <h4>📈 Concept Mastery</h4>
            ${masteryHtml}
        </div>
    `;
}

function renderGameOver() {
    state.gameComplete = true;
    state.systemsPlayed = SYSTEMS.length;
    
    // Clear progress on completion
    clearProgress();
    
    const maxScore = SYSTEMS.length * 3 * CONFIG.difficulties[state.difficulty].scoreMultiplier;
    const accuracy = state.totalAttempts > 0 ? (state.correctAnswers / state.totalAttempts) : 0;
    const config = CONFIG.difficulties[state.difficulty];
    
    let title = '';
    let message = '';
    
    if (state.score >= maxScore * 0.85) {
        title = '🏆 Expert Detective';
        message = `Outstanding ${config.label} performance! You've mastered the three patterns of AI bias.`;
        triggerConfetti();
    } else if (state.score >= maxScore * 0.65) {
        title = '⭐ Skilled Investigator';
        message = 'Great work! You\'re getting very good at spotting bias patterns.';
        triggerConfetti();
    } else if (state.score >= maxScore * 0.45) {
        title = '📖 Learning the Ropes';
        message = 'Good effort! Keep practicing to recognize these important patterns.';
    } else {
        title = '🎓 Keep Studying';
        message = 'Bias detection takes practice. Review the warm-up examples and try again!';
    }
    
    // Framework coverage summary
    const frameworkSummary = Array.from(state.frameworksEncountered).map(fw => {
        const icons = { unesco: '📚', oecd: '🌍', nist: '🏛️', eu: '🇪🇺' };
        return `<span class="framework-summary-badge">${icons[fw]} ${FRAMEWORKS[fw].name}</span>`;
    }).join('');
    
    elements.gameBoard.innerHTML = `
        <div class="game-over">
            <div class="trophy">🏆</div>
            <h2>${title}</h2>
            <div class="final-score">${Math.round(state.score)}</div>
            <div class="score-label">points earned (${config.label} mode)</div>
            <div class="rating">${message}</div>
            
            <div class="framework-coverage">
                <h3>📚 Frameworks Explored</h3>
                <div class="framework-badges">
                    ${frameworkSummary || '<span class="no-frameworks">Complete more systems to see framework coverage</span>'}
                </div>
            </div>
            
            ${renderConceptMasterySummary()}
            
            <div class="stats-grid">
                <div class="stat-item">
                    <div class="stat-value">${state.correctAnswers}/${state.totalAttempts}</div>
                    <div class="stat-label">Correct Answers</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${Math.round(accuracy * 100)}%</div>
                    <div class="stat-label">Accuracy</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${SYSTEMS.length}</div>
                    <div class="stat-label">Systems Investigated</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${state.impactsRevealed.length}</div>
                    <div class="stat-label">Impacts Revealed</div>
                </div>
            </div>
            
            <div class="game-over-actions">
                <button class="btn btn-primary play-again-btn" onclick="resetGame()">
                    Play Again
                </button>
                <button class="btn btn-secondary" onclick="showQuiz('post')">
                    📋 Take Post-Quiz
                </button>
            </div>
        </div>
    `;
    
    elements.phaseIndicator.style.display = 'none';
    elements.patternBar.classList.add('hidden');
    elements.prevBtn.disabled = true;
    elements.nextBtn.style.display = 'none';
    elements.timerDisplay.classList.add('hidden');
}

function renderConceptMasterySummary() {
    const patterns = [
        { id: 'bad-start', name: '📚 Bad Start', color: '#DC2626' },
        { id: 'wrong-measuring', name: '📏 Wrong Measuring', color: '#F59E0B' },
        { id: 'sneaky-shortcuts', name: '🎭 Sneaky Shortcuts', color: '#16A34A' }
    ];
    
    return `
        <div class="mastery-summary">
            <h3>🎯 Pattern Mastery</h3>
            <div class="mastery-bars">
                ${patterns.map(p => {
                    const mastery = state.conceptMastery[p.id];
                    const percentage = mastery.total > 0 ? Math.round((mastery.correct / mastery.total) * 100) : 0;
                    return `
                        <div class="mastery-bar-item">
                            <span class="bar-label">${p.name}</span>
                            <div class="bar-container">
                                <div class="bar-fill" style="width: ${percentage}%; background: ${p.color}"></div>
                            </div>
                            <span class="bar-value">${percentage}%</span>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

// ========================================
// Quiz System
// ========================================

function showQuiz(type) {
    const isPre = type === 'pre';
    const title = isPre ? '📋 Pre-Game Assessment' : '📋 Post-Game Assessment';
    const description = isPre 
        ? 'Test your knowledge before playing. This helps measure your learning!'
        : 'Test your knowledge after playing. Compare with your pre-game results!';
    
    // Shuffle questions for variety
    const shuffledQuestions = [...QUIZ_QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 5);
    
    let currentQuestion = 0;
    const answers = [];
    
    function renderQuestion() {
        const q = shuffledQuestions[currentQuestion];
        const progress = ((currentQuestion + 1) / shuffledQuestions.length) * 100;
        
        elements.gameBoard.innerHTML = `
            <div class="quiz-container">
                <h2>${title}</h2>
                <p class="quiz-description">${description}</p>
                
                <div class="quiz-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progress}%"></div>
                    </div>
                    <span class="progress-text">Question ${currentQuestion + 1} of ${shuffledQuestions.length}</span>
                </div>
                
                <div class="quiz-question">
                    <h3>${q.question}</h3>
                    <div class="quiz-options">
                        ${q.options.map((opt, idx) => `
                            <button class="quiz-option" onclick="window.handleQuizAnswer(${idx})">
                                <span class="option-letter">${String.fromCharCode(65 + idx)}</span>
                                <span class="option-text">${opt}</span>
                            </button>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }
    
    window.handleQuizAnswer = (answerIndex) => {
        answers.push({
            question: shuffledQuestions[currentQuestion].id,
            correct: answerIndex === shuffledQuestions[currentQuestion].correct,
            answer: answerIndex
        });
        
        currentQuestion++;
        
        if (currentQuestion < shuffledQuestions.length) {
            renderQuestion();
        } else {
            showQuizResults();
        }
    };
    
    function showQuizResults() {
        const correct = answers.filter(a => a.correct).length;
        const percentage = Math.round((correct / answers.length) * 100);
        
        state.quizResults[type + 'Quiz'] = {
            correct,
            total: answers.length,
            percentage,
            answers
        };
        
        let feedback = '';
        if (percentage >= 80) feedback = '🌟 Excellent! You have strong bias detection skills.';
        else if (percentage >= 60) feedback = '👍 Good job! You understand the basics.';
        else feedback = '📚 Keep learning! Review the patterns and try again.';
        
        // Show detailed results
        const detailedResults = shuffledQuestions.map((q, idx) => {
            const userAnswer = answers[idx];
            const isCorrect = userAnswer.correct;
            return `
                <div class="quiz-result-item ${isCorrect ? 'correct' : 'incorrect'}">
                    <div class="result-question">${idx + 1}. ${q.question}</div>
                    <div class="result-answer">
                        Your answer: ${q.options[userAnswer.answer]} 
                        ${isCorrect ? '✓' : `✗ (Correct: ${q.options[q.correct]})`}
                    </div>
                    ${!isCorrect ? `<div class="result-explanation">${q.explanation}</div>` : ''}
                </div>
            `;
        }).join('');
        
        elements.gameBoard.innerHTML = `
            <div class="quiz-results">
                <h2>📊 Quiz Results</h2>
                <div class="quiz-score">${correct}/${answers.length}</div>
                <div class="quiz-percentage">${percentage}%</div>
                <div class="quiz-feedback">${feedback}</div>
                
                <div class="detailed-results">
                    <h3>Review</h3>
                    ${detailedResults}
                </div>
                
                <button class="btn btn-primary" onclick="${isPre ? 'renderStartScreen()' : 'resetGame()'}">
                    ${isPre ? 'Back to Start' : 'Play Again'}
                </button>
            </div>
        `;
        
        elements.prevBtn.style.display = 'none';
        elements.nextBtn.style.display = 'none';
    }
    
    // Hide navigation buttons during quiz
    elements.prevBtn.style.display = 'none';
    elements.nextBtn.style.display = 'none';
    elements.patternBar.classList.add('hidden');
    
    renderQuestion();
}

// ========================================
// Hint System
// ========================================

function showHint(problemId, event) {
    event.stopPropagation();
    
    const problem = PROBLEMS.find(p => p.id === problemId);
    if (!problem) return;
    
    const hints = HINTS[problem.pattern];
    const currentLevel = state.hintLevel[problemId] || 0;
    
    if (currentLevel < 3) {
        state.hintLevel[problemId] = currentLevel + 1;
        state.hintUsage++;
        
        const hintDisplay = document.getElementById(`hint-${problemId}`);
        if (hintDisplay) {
            hintDisplay.textContent = hints.levels[currentLevel];
            hintDisplay.style.fontStyle = 'normal';
            hintDisplay.style.color = '#2563EB';
        }
        
        // Update button
        const btn = event.target;
        const remaining = 3 - state.hintLevel[problemId];
        btn.textContent = remaining > 0 ? `💡 Need another hint? (${remaining} remaining)` : '💡 All hints shown';
        if (remaining === 0) btn.disabled = true;
    }
}

// ========================================
// Game Actions
// ========================================

function startGame() {
    state.currentSystemIndex = 0;
    state.currentPhase = 0;
    state.score = 0;
    state.selections = {};
    state.gameComplete = false;
    state.correctAnswers = 0;
    state.totalAttempts = 0;
    state.systemsPlayed = 0;
    state.hintLevel = {};
    state.frameworksEncountered = new Set();
    state.impactsRevealed = [];
    state.startTime = Date.now();
    state.hintUsage = 0;
    
    // Reset concept mastery
    state.conceptMastery = {
        'bad-start': { correct: 0, total: 0 },
        'wrong-measuring': { correct: 0, total: 0 },
        'sneaky-shortcuts': { correct: 0, total: 0 }
    };
    
    elements.score.textContent = '0';
    elements.phaseIndicator.style.display = 'flex';
    elements.prevBtn.style.display = 'inline-flex';
    
    renderPhase();
}

function continueGame() {
    const saved = loadProgress();
    if (saved) {
        state.score = saved.score;
        state.currentSystemIndex = saved.currentSystemIndex;
        state.correctAnswers = saved.correctAnswers;
        state.totalAttempts = saved.totalAttempts;
        state.systemsPlayed = saved.systemsPlayed;
        state.difficulty = saved.difficulty || 'standard';
        state.currentPhase = 0;
        state.selections = {};
        
        elements.score.textContent = Math.round(state.score);
        elements.phaseIndicator.style.display = 'flex';
        elements.prevBtn.style.display = 'inline-flex';
        
        renderPhase();
    }
}

function resetGame() {
    renderStartScreen();
}

function nextPhase() {
    const currentPhaseId = PHASES[state.currentPhase].id;
    
    // Clear timer if running
    if (state.timer) {
        clearInterval(state.timer);
        state.timer = null;
    }
    
    if (currentPhaseId === 'REFLECT') {
        // Move to next system or end game
        if (state.currentSystemIndex < SYSTEMS.length - 1) {
            state.currentSystemIndex++;
            state.currentPhase = 0;
            state.selections = {};
            renderPhase();
        } else {
            renderGameOver();
        }
    } else {
        state.currentPhase++;
        renderPhase();
    }
}

function prevPhase() {
    if (state.timer) {
        clearInterval(state.timer);
        state.timer = null;
    }
    
    if (state.currentPhase > 0) {
        state.currentPhase--;
        renderPhase();
    }
}

function selectPattern(problemId, patternId) {
    state.selections[problemId] = patternId;
    
    // Update UI
    const card = document.querySelector(`[data-problem="${problemId}"]`);
    if (card) {
        const options = card.querySelectorAll('.pattern-option');
        options.forEach(opt => {
            opt.classList.remove('selected');
            if (opt.dataset.pattern === patternId) {
                opt.classList.add('selected');
            }
        });
    }
}

function startTimer(seconds, elementId) {
    state.timeRemaining = seconds;
    elements.timerDisplay.classList.remove('hidden');
    elements.timerValue.textContent = seconds;
    
    const timerEl = document.getElementById(elementId);
    
    state.timer = setInterval(() => {
        state.timeRemaining--;
        
        if (timerEl) {
            timerEl.textContent = state.timeRemaining;
            
            // Visual feedback
            if (state.timeRemaining <= 10) {
                timerEl.classList.add('danger');
                timerEl.classList.remove('warning');
            } else if (state.timeRemaining <= 30) {
                timerEl.classList.add('warning');
            }
        }
        
        elements.timerValue.textContent = state.timeRemaining;
        
        if (state.timeRemaining <= 0) {
            clearInterval(state.timer);
            state.timer = null;
            // Auto-advance
            setTimeout(() => nextPhase(), 500);
        }
    }, 1000);
}

// ========================================
// Confetti Effect (using shared utility)
// ========================================

function triggerConfetti() {
    GameUtils.launchConfetti(elements.confettiCanvas);
}

// ========================================
// Hint System Interactions
// ========================================

function setupHintInteractions() {
    const patternRefs = document.querySelectorAll('.pattern-ref');
    const hintDisplay = document.getElementById('hint-display');
    
    patternRefs.forEach(ref => {
        ref.addEventListener('mouseenter', () => {
            const patternId = ref.dataset.pattern;
            const hints = HINTS[patternId];
            const randomHint = hints.general[Math.floor(Math.random() * hints.general.length)];
            const pattern = PATTERNS.find(p => p.id === patternId);
            
            if (hintDisplay) {
                hintDisplay.innerHTML = `<span style="color: ${pattern.color}">${pattern.icon} ${pattern.name}:</span> ${randomHint}`;
                hintDisplay.style.fontStyle = 'normal';
            }
        });
        
        ref.addEventListener('mouseleave', () => {
            if (hintDisplay) {
                hintDisplay.textContent = 'Hover over 📚 Bad Start, 📏 Wrong Measuring, or 🎭 Sneaky Shortcuts in the pattern bar above for hints';
                hintDisplay.style.fontStyle = 'italic';
            }
        });
    });
}

// ========================================
// Event Listeners
// ========================================

elements.nextBtn.addEventListener('click', nextPhase);
elements.prevBtn.addEventListener('click', prevPhase);

// Help button
document.getElementById('help-btn')?.addEventListener('click', () => {
    elements.helpModal.classList.remove('hidden');
});

// Modal
document.querySelector('.modal-close')?.addEventListener('click', () => {
    elements.helpModal.classList.add('hidden');
});

// Close modal on outside click
elements.helpModal?.addEventListener('click', (e) => {
    if (e.target === elements.helpModal) {
        elements.helpModal.classList.add('hidden');
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // Help toggle
    if (e.key === '?' || e.key === '/') {
        e.preventDefault();
        elements.helpModal.classList.toggle('hidden');
        return;
    }
    
    // Close modal with Escape
    if (e.key === 'Escape') {
        elements.helpModal.classList.add('hidden');
    }
    
    if (state.gameComplete) return;
    
    // Phase navigation
    if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        if (!elements.nextBtn.disabled) nextPhase();
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (!elements.prevBtn.disabled) prevPhase();
    }
    
    // Pattern selection during DISCUSS phase
    if (PHASES[state.currentPhase].id === 'DISCUSS') {
        const problemCards = document.querySelectorAll('.problem-vote-card');
        const activeProblem = document.querySelector('.problem-vote-card:focus') || problemCards[0];
        
        if (activeProblem) {
            const problemId = activeProblem.dataset.problem;
            if (e.key === '1') selectPattern(problemId, 'bad-start');
            if (e.key === '2') selectPattern(problemId, 'wrong-measuring');
            if (e.key === '3') selectPattern(problemId, 'sneaky-shortcuts');
        }
    }
});

// Resize handler for confetti
window.addEventListener('resize', () => {
    elements.confettiCanvas.width = window.innerWidth;
    elements.confettiCanvas.height = window.innerHeight;
});

// ========================================
// Progress Persistence
// ========================================

function saveProgress() {
    const progress = {
        score: state.score,
        currentSystemIndex: state.currentSystemIndex,
        correctAnswers: state.correctAnswers,
        totalAttempts: state.totalAttempts,
        systemsPlayed: state.systemsPlayed,
        difficulty: state.difficulty,
        conceptMastery: state.conceptMastery,
        timestamp: Date.now()
    };
    localStorage.setItem('biasBountyProgress', JSON.stringify(progress));
}

function loadProgress() {
    const saved = localStorage.getItem('biasBountyProgress');
    if (saved) {
        return JSON.parse(saved);
    }
    return null;
}

function clearProgress() {
    localStorage.removeItem('biasBountyProgress');
}

// ========================================
// Initialize
// ========================================

renderStartScreen();
