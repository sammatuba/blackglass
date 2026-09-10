import type { TimelineEvent } from '../types'

/* THE CONVERGENCE — the anthology's global finale. Unlocked when every
   phone in every anchor has been lived. The four stories were one season;
   this is the chronology none of the characters could stand outside of.
   Dynamic lines key on the decisions recorded across all anchors. */

export interface ConvergenceChapter {
  kicker: string
  title: string
  events: TimelineEvent[]
}

export interface ConvergenceContent {
  title: string
  subtitle: string
  intro: string[]
  chapters: ConvergenceChapter[]
  throughline: { title: string; paragraphs: string[] }
  close: string[]
}

export const CONVERGENCE: ConvergenceContent = {
  title: 'THE CONVERGENCE',
  subtitle: 'One Family. One Season.',
  intro: [
    'You have held every phone in the family. Maya’s at 6:47 on a Saturday morning. Tita Merly’s at 5:41. Bea’s at 7:14. Tita’s again on a Tuesday night, then the whole house on a Sunday afternoon, then Bea alone for five weeks after.',
    'Each of them saw one screen’s worth of the truth. This is the version none of them could stand outside of — assembled from what you actually did in their hands.',
  ],
  chapters: [
    {
      kicker: 'SATURDAY · 5:41–7:28 AM',
      title: 'The morning',
      events: [
        {
          time: '5:41',
          who: 'tita',
          label: 'A gift, arriving',
          dynamic: {
            key: 'tita_choice',
            fallback:
              'Joy sent the link the way she sends everything: early, warm, certain it would help. Being loved is not the same as being verified — but it feels exactly like it.',
            map: {
              opened: 'Tita Merly opened the link first. Being sure was never the missing step — being loved was.',
              forward: 'She forwarded it first, before anything. Love moved faster than verification, because love is faster.',
              voicenote:
                'She asked Joy about the cousin first. The loop closed through a person she trusts, which is exactly how her trust works.',
            },
          },
          text: 'Joy sent the link the way she sends everything: early, warm, certain it would help.',
        },
        {
          time: '6:47',
          who: 'maya',
          label: 'The knowing',
          dynamic: {
            key: 'maya_choice',
            fallback:
              'She recognized the template at a glance — the lever word, the .click domain, the doctor with no name. Recognizing it did not stop it.',
            map: {
              tapped:
                'She tapped it anyway, because “probably” is not “definitely,” and certainty was something she could hold. It changed nothing. It was never going to change anything.',
              asked:
                'She asked Tita, with the emoji doing all the work. Curious is permitted. She was not saying anyone was wrong.',
              hearted:
                'She hearted it. Her name went into the thread as evidence that somebody had checked. Nobody checks before they heart-react.',
              filed:
                'She screenshotted it to send to Kuya Renz later. A problem turned into a message she had not sent yet — a form of filing.',
            },
          },
          text: 'She recognized the template at a glance. Recognizing it did not stop it.',
        },
        {
          time: '7:16',
          who: 'bea',
          label: 'The debunk',
          dynamic: {
            key: 'bea_choice',
            fallback:
              'Her thumb found the feed before the decision did. The debunker was third in rotation: clean, accurate, and synthetic.',
            map: {
              tiktok: 'Her thumb found TikTok before the decision did. The debunker was third in the feed — clean, right, and generated.',
              snopes:
                'She flicked to the Snopes tab she had kept open six days. She did not read it. It felt like a seatbelt. Then TikTok anyway.',
              council:
                'She took it to the council — four people who are right about things, confirming each other. Then TikTok anyway.',
            },
          },
          text: 'The debunker was clean, accurate, and synthetic.',
        },
        {
          time: '7:28',
          who: 'bea',
          label: 'The share',
          text: 'The video was right about everything. It was also manufactured. Nobody in the family checked both facts at once — the correction mattered more than the provenance.',
        },
      ],
    },
    {
      kicker: 'TUESDAY · 8:02–8:25 PM',
      title: 'The call',
      events: [
        {
          time: '8:02',
          who: 'tita',
          label: 'A voice known for thirty years',
          dynamic: {
            key: 'tita_vc',
            fallback:
              'The voice note was thirty-four seconds, in his voice. There was no doubt to overcome — a voice she had known for thirty years could only ever come from him.',
            map: {
              asked: 'She asked the voice where he was — “sino kasama mo?” The voice had an answer. It had every answer.',
              mama: 'She called Mama first. Mama panicked. Fear compounded fear, and every minute made the next decision faster.',
              nowait: 'She opened GCash before anything else, because he needed her right now. The urgency was the point of the machine.',
            },
          },
          text: 'The voice note was thirty-four seconds, in his voice. There was no doubt to overcome.',
        },
        {
          time: '8:11',
          who: 'maya',
          label: 'The alarm',
          dynamic: {
            key: 'maya_vc',
            fallback: 'She knew on sight — Renz would never call Tita first. She texted the real Renz. Not delivered.',
            map: {
              textagain: 'She texted Kuya Renz again — KUYA PLEASE REPLY — to a phone the real Renz had left in a badminton bag.',
              wait: 'She typed WAIT. This might not be real. WAIT is the hardest message to send into a family that is already running.',
              bea: 'She consulted Bea, because Bea knows things. Bea knew things. She did not know this voice.',
            },
          },
          text: 'She knew on sight. She texted the real Renz. Not delivered.',
        },
        {
          time: '8:20',
          who: 'bea',
          label: 'The expertise',
          dynamic: {
            key: 'bea_vc',
            fallback:
              'She was right in five seconds, and being right about the mechanism turned out not to be the same as being able to help.',
            map: {
              expert: 'She stayed on the couch. She had given Maya the tools. The distance to two suburbs over was the same distance it always was.',
              content: 'She finished the slide. The deck got better, clearer, more specific — and a family’s terror became a bullet point in it.',
              present: 'She stopped explaining and called Maya — “I’m here, what do you need.” The first useful thing she did all night was not expertise.',
            },
          },
          text: 'She was right in five seconds. Being right was not the same as being there.',
        },
        {
          time: '8:21',
          who: 'tita',
          label: '₱18,500',
          text: 'The money left before the real Renz finished his badminton game. The voice had a whole script. The family had twenty-two minutes.',
        },
      ],
    },
    {
      kicker: 'SUNDAY · 2:14–4:38 PM',
      title: 'The proof',
      events: [
        {
          time: '2:30',
          who: 'tita',
          label: 'The endorsement',
          dynamic: {
            key: 'df_tita',
            fallback:
              'The deepfake arrived wearing the most trusted face on television. Thirty years of Tito Mike at 6 PM carried it past every defense she had.',
            map: {
              forward: 'She forwarded it to the family before doubt could get a word in. “Para kay Papa. Si Tito Mike pa ang nag-endorso.” Seeing was her whole verification.',
              asked: 'She asked around first. Everyone had the same answer: it looks real. It was built to.',
              opened: 'She opened the platform page. The platform was a website. The website was the proof.',
            },
          },
          text: 'The deepfake arrived wearing the most trusted face on television.',
        },
        {
          time: '3:05',
          who: 'tita',
          label: 'The account',
          dynamic: {
            key: 'df_tita_act',
            fallback: 'A page answered on the first ring. Helpfulness is the most expensive thing they sell.',
            map: {
              register: 'She registered with her real name and her real number. The machine prefers real ones — they come with real money behind them.',
              pool: 'She brought the pooled money — family money, careful money — to a page that answered on the first ring.',
            },
          },
          text: 'A page answered on the first ring.',
        },
        {
          time: '3:20',
          who: 'maya',
          label: 'The sighting',
          dynamic: {
            key: 'df_maya',
            fallback:
              'She clocked the mouth-lag and the blink on sight — and clocked, too, the ₱1,500 the referral promised. For once her skepticism was fighting her own want.',
            map: {
              called:
                'She called the number on the page. A helpful person answered. Helpfulness is the most expensive thing they sell, and she wanted to be certain before she was right.',
              bea: 'She sent it to Bea to check. Bea’s job was checking. The video was built to pass the check.',
              clicked: 'She clicked the page she knew was a scam, because “probably fake” is not “definitely fake,” and a part of her would rather be certain than right.',
            },
          },
          text: 'She clocked it on sight — and almost wished she hadn’t.',
        },
        {
          time: '4:12',
          who: 'bea',
          label: 'The receipts',
          dynamic: {
            key: 'df_bea',
            fallback:
              'Receipts, all real: no SEC record, a melted seal, “guaranteed” is illegal. The thread climbed — and reached a tenth of the scam’s audience.',
            map: {
              receipts: 'She pulled receipts — registry numbers, filings, the SEC list. None matched. The family heard it as her being negative.',
              reach: 'She went to her reach — 1,400 followers, one post, one warning. The warning was correct and arrived after the transfer.',
              council: 'She took it to the council. The council agreed it was fake. Agreement is not the same as a stopped transfer.',
            },
          },
          text: 'The receipts were all real, and they bounced.',
        },
        {
          time: '4:38',
          who: 'tita',
          label: 'The dividend',
          text: 'Papa shared the real SEC advisory. Tita: “Baka deepfake din yan 😅.” The fake didn’t have to convince everyone it was real. It only had to make everyone doubt what is.',
        },
      ],
    },
    {
      kicker: 'THE FIVE WEEKS AFTER',
      title: 'The drift',
      events: [
        {
          time: 'Wk 1',
          who: 'bea',
          label: 'The reward',
          dynamic: {
            key: 'w1',
            fallback: 'A sharp post outperformed everything careful she had written. The feed remembered what worked.',
            map: {
              nuance: 'She posted the careful version, hedges and all. It did fine. The sharp one did numbers — and she watched it do numbers.',
              sharp: 'She posted the sharp version. It did numbers. The feed remembered, and so did she.',
            },
          },
          text: 'A sharp post outperformed everything careful she had written.',
        },
        {
          time: 'Wk 3',
          who: 'bea',
          label: 'The pile-on',
          dynamic: {
            key: 'w3',
            fallback: 'The dogpile had the numbers. Joining it felt like accountability. It paid like applause.',
            map: {
              satout: 'She sat the pile-on out. It cost her reach, and she felt every lost number of it.',
              piled: 'She joined the pile-on. It felt like accountability. It paid like applause.',
            },
          },
          text: 'The dogpile had the numbers. Joining it felt like accountability.',
        },
        {
          time: 'Wk 4',
          who: 'bea',
          label: 'The quiet',
          dynamic: {
            key: 'w4',
            fallback: 'She curated the feed until it agreed with her, and mistook the silence for being right.',
            map: {
              unmuted: 'She opened the muted list and let the complications back in. A small refusal. The feed noticed, and paid her a little less for it.',
              muted: 'She muted the ones who complicated things until everyone left was nodding, and mistook the silence for being right.',
            },
          },
          text: 'She curated the feed until it agreed with her.',
        },
        {
          time: 'Wk 5',
          who: 'bea',
          label: 'The webinar',
          text: 'She taught a room to distrust the sources that confirm them — and could not see that she had spent five weeks trusting hers.',
        },
      ],
    },
  ],
  throughline: {
    title: 'The one timeline none of them could see',
    paragraphs: [
      'Every defense became the next surface. The debunk taught Bea to share faster, and the share put a synthetic face inside a family’s trust. The cloned voice taught them that a voice is not proof — so when a face arrived with the family’s whole future in its mouth, they had already stopped trusting voices and started trusting numbers.',
      'The deepfake taught them that seeing is not believing. The feed taught them that certainty is rewarded. Put together, they made a family that trusted less and shared more — the exact habitat the next deception needed.',
      'Nobody in this season was foolish. Tita Merly verified through the people she loves, which is how trust has always worked. Maya knew and could not stop. Bea was right about everything and still made it travel. Kuya Renz was face-down in a badminton bag, twelve metres from his own ringing phone.',
      'The glass was never in the screens. It was in each of them — shaped, precisely, to the size of the thing they needed to believe.',
    ],
  },
  close: [
    'You held every phone. You are the only one who got to stand in all of them.',
    'The season did not end because anyone learned a lesson. It ended because the money ran out and the feed moved on. The next one is already in a group chat somewhere, wearing a face you trust.',
    'Verification is a practice, not a verdict. The pause is the point.',
  ],
}
