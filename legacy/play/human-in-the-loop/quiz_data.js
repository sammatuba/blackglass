// ========================================
// Concept Mastery Quiz Data (IMP-003)
// ========================================

const QUIZ_DATA = {
  automationBias: {
    questions: [
      {
        id: 'ab1',
        question: 'What is automation bias?',
        options: [
          'The tendency to prefer automated systems over manual ones',
          'The tendency to over-rely on automated systems, leading to errors when AI is wrong',
          'The bias that exists in AI training data',
          'The preference for human decision-making over AI'
        ],
        correct: 1
      },
      {
        id: 'ab2',
        question: 'Which of the following is an example of automation bias?',
        options: [
          'A doctor double-checking an AI diagnosis',
          'A pilot trusting GPS over their own eyes in poor visibility',
          'A manager rejecting an AI hiring recommendation',
          'A teacher verifying AI-generated content'
        ],
        correct: 1
      },
      {
        id: 'ab3',
        question: 'How can you recognize automation bias in yourself?',
        options: [
          'You feel excited about new technology',
          'You feel uncomfortable disagreeing with AI even when you have doubts',
          'You prefer using manual tools',
          'You never use AI systems'
        ],
        correct: 1
      }
    ]
  },
  contextualRisk: {
    questions: [
      {
        id: 'cr1',
        question: 'What is contextual risk assessment?',
        options: [
          'Evaluating how much context an AI has access to',
          'Evaluating the stakes of a decision to determine appropriate oversight level',
          'Assessing the risk of AI taking over jobs',
          'Measuring the accuracy of AI in different contexts'
        ],
        correct: 1
      },
      {
        id: 'cr2',
        question: 'Which scenario represents HIGH contextual risk?',
        options: [
          'AI recommending a movie',
          'AI routing a customer service ticket',
          'AI diagnosing a medical condition',
          'AI filtering spam emails'
        ],
        correct: 2
      },
      {
        id: 'cr3',
        question: 'What question should you ask when assessing contextual risk?',
        options: [
          'How fast is the AI?',
          'What happens if the AI is wrong? Can we recover?',
          'How expensive is the AI system?',
          'Who built the AI?'
        ],
        correct: 1
      }
    ]
  },
  trainingDataBias: {
    questions: [
      {
        id: 'tdb1',
        question: 'What is training data bias?',
        options: [
          'AI learning patterns from historical data, including historical prejudices',
          'The bias of AI developers',
          'The preference for certain types of data over others',
          'Errors in data storage'
        ],
        correct: 0
      },
      {
        id: 'tdb2',
        question: 'How can you spot training data bias?',
        options: [
          'Ask: Who was represented in the training data? What groups might be missing?',
          'Check if the AI is running fast',
          'Look at the color of the user interface',
          'Count the number of features'
        ],
        correct: 0
      },
      {
        id: 'tdb3',
        question: 'Which is a real-world example of training data bias?',
        options: [
          'AI that recommends the same restaurant to everyone',
          'Hiring AI that penalizes career gaps (often women) or facial recognition that fails on dark skin',
          'AI that is slow to respond',
          'AI that requires a lot of electricity'
        ],
        correct: 1
      }
    ]
  },
  proxyVariables: {
    questions: [
      {
        id: 'pv1',
        question: 'What are proxy variables?',
        options: [
          'Variables that directly measure what we care about',
          'When AI finds alternative factors that correlate with protected characteristics after explicit variables are removed',
          'Variables that improve AI accuracy',
          'Temporary variables used during AI training'
        ],
        correct: 1
      },
      {
        id: 'pv2',
        question: 'Which is an example of a proxy variable?',
        options: [
          'Using income to predict spending',
          'Using zip code as a proxy for race in credit scoring',
           'Using age to determine retirement benefits',
          'Using education level for job requirements'
        ],
        correct: 1
      },
      {
        id: 'pv3',
        question: 'How can you spot proxy variable bias?',
        options: [
          'The AI claims to be "neutral" but outcomes still disadvantage certain groups',
          'The AI runs slowly',
          'The AI has a nice user interface',
          'The AI was built by a big company'
        ],
        correct: 0
      }
    ]
  },
  aiHallucination: {
    questions: [
      {
        id: 'ah1',
        question: 'What is AI hallucination?',
        options: [
          'When AI sees things that are not there',
          'AI generating confident-sounding but false information, including fake citations',
          'When AI becomes sentient',
          'AI dreaming during sleep mode'
        ],
        correct: 1
      },
      {
        id: 'ah2',
        question: 'Which is a real-world example of AI hallucination?',
        options: [
          'AI recommending a book that exists',
          'Lawyers submitting AI-generated briefs with fake case citations',
          'AI correctly translating a sentence',
          'AI recognizing a cat in a photo'
        ],
        correct: 1
      },
      {
        id: 'ah3',
        question: 'How can you detect AI hallucination?',
        options: [
          'Check specific claims, citations, and data points independently',
          'Trust the AI if it sounds confident',
          'Use the AI more frequently',
          'Only use AI for simple tasks'
        ],
        correct: 0
      }
    ]
  },
  confidenceVsAccuracy: {
    questions: [
      {
        id: 'cva1',
        question: 'What is the relationship between AI confidence and accuracy?',
        options: [
          'High confidence always means high accuracy',
          'AI expresses high confidence even when wrong; confidence is not a reliable indicator',
          'Low confidence always means low accuracy',
          'Confidence and accuracy are the same thing'
        ],
        correct: 1
      },
      {
        id: 'cva2',
        question: 'How should you treat AI confidence scores?',
        options: [
          'As definitive proof of correctness',
          'As marketing, not evidence of correctness',
          'As only relevant for technical users',
          'As always accurate'
        ],
        correct: 1
      },
      {
        id: 'cva3',
        question: 'What does a low confidence score indicate?',
        options: [
          'The AI is broken',
          'The AI needs more training',
          'Human review is needed',
          'The task is unimportant'
        ],
        correct: 2
      }
    ]
  },
  contextualBlindness: {
    questions: [
      {
        id: 'cb1',
        question: 'What is contextual blindness in AI?',
        options: [
          'AI that cannot see images',
          'AI processing keywords and patterns but lacking real-world context and common sense',
          'AI that works only in certain countries',
          'AI that requires context to function'
        ],
        correct: 1
      },
      {
        id: 'cb2',
        question: 'Which is an example of contextual blindness?',
        options: [
          'AI accurately translating languages',
          'Content moderation flagging educational discussions about extremism as extremist content',
          'AI recognizing objects in photos',
          'AI playing chess at grandmaster level'
        ],
        correct: 1
      },
      {
        id: 'cb3',
        question: 'How can you spot contextual blindness?',
        options: [
          'The AI decision makes sense at a surface level but fails with deeper context',
          'The AI runs very fast',
          'The AI has many users',
          'The AI is expensive'
        ],
        correct: 0
      }
    ]
  },
  appropriateTrust: {
    questions: [
      {
        id: 'at1',
        question: 'What is appropriate trust?',
        options: [
          'Always trusting AI',
          'Never trusting AI',
          'Calibrating trust based on the AI\'s track record, the stakes, and your own expertise',
          'Trusting AI only in emergencies'
        ],
        correct: 2
      },
      {
        id: 'at2',
        question: 'What is an example of appropriate trust?',
        options: [
          'Trusting spell-check but not letting it rewrite legal contracts without review',
          'Blindly accepting all AI recommendations',
          'Never using AI tools',
          'Only using AI for entertainment'
        ],
        correct: 0
      },
      {
        id: 'at3',
        question: 'How can you practice appropriate trust?',
        options: [
          'Evaluate each case individually—neither blind acceptance nor blanket rejection',
          'Always override AI decisions',
          'Always accept AI decisions',
          'Ignore the context'
        ],
        correct: 0
      }
    ]
  },
  humanInCommand: {
    questions: [
      {
        id: 'hic1',
        question: 'What does "Human-in-Command" mean?',
        options: [
          'Humans must operate AI systems manually',
          'The ultimate authority to decide NOT to use an AI system when it\'s inappropriate',
          'AI systems must have human supervisors watching at all times',
          'Humans must write all AI code'
        ],
        correct: 1
      },
      {
        id: 'hic2',
        question: 'Which is an example of Human-in-Command?',
        options: [
          'A judge refusing to use a biased risk assessment tool',
          'A doctor accepting an AI diagnosis without review',
          'A pilot letting autopilot fly the entire route',
          'A teacher using AI grades without checking'
        ],
        correct: 0
      },
      {
        id: 'hic3',
        question: 'How can you exercise Human-in-Command?',
        options: [
          'You have the right and responsibility to say "no" to AI assistance',
          'Always use AI when available',
          'Let AI make all decisions',
          'Avoid learning about AI'
        ],
        correct: 0
      }
    ]
  }
};

// Quiz functions
function getQuizForConcept(conceptId) {
  return QUIZ_DATA[conceptId] || null;
}

function getRandomQuestion(conceptId, excludeIds = []) {
  const quiz = getQuizForConcept(conceptId);
  if (!quiz) return null;
  
  const availableQuestions = quiz.questions.filter(q => !excludeIds.includes(q.id));
  if (availableQuestions.length === 0) return null;
  
  return availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
}
