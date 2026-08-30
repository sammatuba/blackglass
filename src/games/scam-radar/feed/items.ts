import type { FamilyId, Verdict } from '../families'

export type Channel =
  | 'sms'
  | 'viber'
  | 'email'
  | 'dm'
  | 'listing'
  | 'call'
  | 'post'
  | 'wallet'

export interface FeedItem {
  id: string
  level: 1 | 2 | 3
  channel: Channel
  sender: string
  /** the handle, number, or address shown under the sender */
  handle?: string
  subject?: string
  text: string
  verdict: Verdict
  families: FamilyId[]
  /** why — names the flags present (or absent) */
  explain: string
  /** what a scam-ready person does */
  action: string
}

/* Content rules (world/guardrails.md): fictional numbers, handles, and
   domains only. Real institutions appear only as impersonation targets —
   recognizing the impersonation IS the training. */

export const FEED_ITEMS: FeedItem[] = [
  /* ---------------- SCAM · level 1 (the classics) ---------------- */
  {
    id: 'psa-case',
    level: 1,
    channel: 'sms',
    sender: 'GOVPH-PSA',
    handle: '+63 960 000 0000',
    text:
      'PSA: A complaint case has been filed against your birth certificate. Settle the ₱350 verification fee within 24 HOURS or legal action will proceed. Pay here: psa-records-verify.online',
    verdict: 'scam',
    families: ['urgency', 'authority', 'payment', 'channel'],
    explain:
      'Government agencies do not sue you by text with a 24-hour deadline, never collect fees through a link, and the PSA does not text from a prepaid mobile number.',
    action: 'Real advisories come through official channels and never demand payment in hours. Delete, and report the number to your telco’s spam report.',
  },
  {
    id: 'shopee-raffle',
    level: 1,
    channel: 'sms',
    sender: 'Shopee PH',
    handle: '+63 917 000 0000',
    text:
      'Congrats! Your number was CHOSEN in the Shopee 18.18 Electronic Raffle: iPhone 15 Pro + ₱50,000 cash! Claim within 6 hours: shopee-winner-ph.click',
    verdict: 'scam',
    families: ['toogood', 'urgency', 'channel'],
    explain:
      'You can’t win a raffle you never joined. Six-hour claim windows and misspelled look-at-me domains are the tells.',
    action: 'Prize claims happen inside the official app under Messages/Notifications — never through text links. Delete.',
  },
  {
    id: 'ate-hospital',
    level: 1,
    channel: 'sms',
    sender: 'Ate?',
    handle: 'New number — not saved',
    text:
      'Ate, si Ipe ‘to. Naaksidente ako papunta ng work, nasira yung phone ko kaya new number ito. Pwedeng pahiram muna ₱8,000 para sa hospital? I’ll pay you on Friday, promise. Please don’t tell Mama yet, nakakahiya.',
    verdict: 'scam',
    families: ['emotion', 'urgency', 'channel'],
    explain:
      'Emergency + new number + secrecy + embarrassment — the “it’s me” script hits every pressure point at once. A stolen phone means stolen contacts; a real family member can wait for one phone call.',
    action: 'Call the OLD number. Video call if you can. Ask something only the real person knows — before any money moves.',
  },
  {
    id: 'gcash-verify',
    level: 1,
    channel: 'sms',
    sender: 'GCash',
    handle: '0945 000 0000',
    text:
      'Your GCash account will be VERIFIED today and receive ₱500 free credit. Tap to confirm your identity before deactivation: gcash-kyc-claim.app-verify.ph',
    verdict: 'scam',
    families: ['toogood', 'urgency', 'channel'],
    explain:
      'Wallets never “verify” you by link — KYC happens in the app you opened yourself. Free money for nothing plus deactivation threats is the oldest double-hook there is.',
    action: 'Open the GCash app directly and check Messages inside the app. No announcement there = the text is fake.',
  },
  {
    id: 'lotto-kuya',
    level: 1,
    channel: 'post',
    sender: 'Kuya Ogie Tips',
    handle: '@ogietips (new account, 2 posts)',
    text:
      'GRABE NA-BOOST KO NA NAMAN! ₱5,000 → ₱42,000 in one night sa e-sabong AI predictor. Message me "WIN" for the access fee — first 20 players lang today!',
    verdict: 'scam',
    families: ['toogood', 'payment', 'urgency', 'channel'],
    explain:
      'Guaranteed wins, screenshots you can’t verify, “first 20 today”, and an access fee — nobody selling a money machine needs your ₱500.',
    action: 'If the system printed money, they wouldn’t need yours. Report the account.',
  },

  /* ---------------- SCAM · level 2 ---------------- */
  {
    id: 'bdo-close',
    level: 2,
    channel: 'email',
    sender: 'BDO Unibank Alerts',
    handle: 'alerts@bdo-online-verify.net',
    subject: 'Action Required: Account Permanent Closure in 48 Hours',
    text:
      'Dear Client, we detected failed verification on your account. To avoid PERMANENT CLOSURE within 48 hours, re-confirm your identity and card details at the secure portal below. BDO Customer Protection Team.',
    verdict: 'scam',
    families: ['urgency', 'authority', 'channel'],
    explain:
      'The display name says BDO; the domain says bdo-online-verify.net — an impersonation. Banks close accounts through letters and in-app notices, never countdown emails asking for card details.',
    action: 'Don’t tap the link. Open your bank’s app or type its address yourself. Forward to the bank’s official report-spam address, then delete.',
  },
  {
    id: 'marketplace-iphone',
    level: 2,
    channel: 'listing',
    sender: 'Jason • Marketplace seller',
    handle: 'Account: 3 weeks old, 0 reviews',
    text:
      'iPhone 13 128GB, 95% battery health, RUSH SALE ₱6,500 (market price ~₱18,000). 50% GCash down payment to reserve, ships tomorrow — I’m based in Cebu kasi, will just ship via J&T.',
    verdict: 'scam',
    families: ['toogood', 'payment', 'channel'],
    explain:
      'A third of the price, a too-new seller account, prepaid GCash to a stranger, and “I’m out of town” — the classic half-payment trap.',
    action: 'Meet-up + COD, or nothing. Never down-pay a stranger for a “rush” item you haven’t held.',
  },
  {
    id: 'nbi-warrant',
    level: 2,
    channel: 'call',
    sender: 'Voicemail — Unknown number',
    handle: '+63 2 8000 0000',
    text:
      '“This is Officer Reyes of the NBI Anti-Fraud Unit. A warrant under your name has been filed regarding your SIM registration. To settle before arrest procedures, press 1 to be transferred to the legal department NOW.”',
    verdict: 'scam',
    families: ['authority', 'urgency', 'emotion'],
    explain:
      'Government agents don’t announce warrants by robocall, don’t take settlements by phone transfer, and arrests aren’t a press-1 affair. Fear first, “settlement” second — every time.',
    action: 'Hang up. Look up the agency’s official hotline yourself if you want certainty. Real processes arrive on paper.',
  },
  {
    id: 'crypto-tita-nena',
    level: 2,
    channel: 'dm',
    sender: 'Tita Nena',
    handle: 'Messenger — account reactivated',
    text:
      'Iha, it’s me! I’ve been earning in my sleep with this USDT pool ng ka-opisina ng anak ko. ₱10,000 mo becomes ₱12,500 in 2 weeks, GUARANTEED. I’ll teach you. Send via GCash lang sa coordinator.',
    verdict: 'scam',
    families: ['toogood', 'payment', 'emotion'],
    explain:
      '“Guaranteed” returns don’t exist, and a hijacked or reactivated tita account is the trust bridge. Real investments are never coordinated through a DM’d GCash number.',
    action: 'Voice call the real Tita Nena on her saved number before anything else. Then check whether her account was compromised.',
  },
  {
    id: 'load-scam',
    level: 2,
    channel: 'sms',
    sender: 'Promo Claim Center',
    handle: '+63 906 000 0000',
    text:
      'Your SIM earned a ₱150 LOAD REBATE! To receive, send a GCash transfer of ₱10 “processing” to 0966-000-0000. Rebate arrives in 5 mins. Reply STOP to decline.',
    verdict: 'scam',
    families: ['payment', 'toogood'],
    explain:
      'You never pay to receive money. A ₱10 “processing fee” for a ₱150 rebate is the whole scam — repeated across thousands of victims.',
    action: 'Delete. No legitimate promo needs you to send money first.',
  },
  {
    id: 'renovation-group',
    level: 2,
    channel: 'post',
    sender: 'AngatPinas Investors',
    handle: 'FB Group · 48K members',
    text:
      '🎉 PAYOUT DAY PROOF! Members received 30% AGAIN this month. SEC & DTI registered po kami! Slots for the next cycle close Friday — comment "JOIN" and DM our admin for the payment details. Bawal ang bashers, please. 🙏',
    verdict: 'scam',
    families: ['toogood', 'urgency', 'payment', 'channel'],
    explain:
      'Payout screenshots are edited or paid out from new members’ own money (a Ponzi). “SEC registered” is claimed, not shown. Closing dates and “no bashers” silence the exact questions that break the spell.',
    action: 'Check the SEC’s official registration database yourself. 30% a month is not an investment; it’s a queue.',
  },
  {
    id: 'dct-bonus',
    level: 2,
    channel: 'email',
    sender: 'DepEd Division Office',
    handle: 'memoranda@deped-division8.edu-portal.online',
    subject: 'Division Memorandum No. 812 — Encoding of Winter Bonus',
    text:
      'To all teaching and non-teaching personnel: Submit your signed acknowledgment via the portal link to be included in this cycle’s bonus encoding. Deadline: tomorrow, 5PM. Portal: docs-shared-drive.link/teaching',
    verdict: 'scam',
    families: ['authority', 'urgency', 'channel'],
    explain:
      'Targeted at teachers — hijacked or spoofed office language, a made-up “winter” bonus (there is no such Philippine bonus), and a deadline. The domain isn’t the division’s real one.',
    action: 'Verify with your school head through the official division channels you already have. Real memoranda circulate on official letterhead and the real domain.',
  },
  {
    id: 'otp-fish',
    level: 2,
    channel: 'sms',
    sender: 'GCash OTP',
    handle: '+63 917 000 0000',
    text:
      'Your One-Time PIN (OTP) is 582914. NEVER share this code with anyone, including GCash staff. Ref: TX-88213',
    verdict: 'legit',
    families: [],
    explain:
      'The message itself is a genuine system OTP. A real OTP even warns you not to share it — the scam only happens later, when a “representative” asks you to read it out.',
    action: 'Didn’t request anything? Ignore it — and if someone contacts you asking for this code, that person is the scam.',
  },
  {
    id: 'meralco-bill',
    level: 2,
    channel: 'sms',
    sender: 'Meralco',
    handle: 'Official bill reminder',
    text:
      'Your Meralco bill: ₱2,314.55, due Oct 12. Pay via the Meralco Mobile App, authorized payment centers, or your bank app. Reference number is printed on your bill.',
    verdict: 'legit',
    families: [],
    explain:
      'Amount, due date, official payment channels — and crucially, no link, no deadline panic, no “reply to avoid disconnection”. It points you to channels you already use.',
    action: 'Pay inside your own banking app or the official Meralco app. That’s it.',
  },
  {
    id: 'dr-santos-confirm',
    level: 2,
    channel: 'call',
    sender: 'Voicemail — Santos Dental Clinic',
    handle: 'Clinic landline (saved contact)',
    text:
      '“Good afternoon, this is Grace from Dr. Santos’ clinic, calling to confirm your cleaning appointment tomorrow at 10AM. See you!”',
    verdict: 'legit',
    families: [],
    explain:
      'A saved, known number confirming an appointment you actually have. No money, no personal details requested, no pressure. Boring is what legit sounds like.',
    action: 'Nothing needed. If you ever doubt a clinic call, call the clinic back on its saved number.',
  },
  {
    id: 'bpi-installment',
    level: 2,
    channel: 'sms',
    sender: 'BPI',
    handle: 'Card ending 4821',
    text:
      'Your credit card ending 4821 now has a new installment transaction posted. View details on the BPI app.',
    verdict: 'legit',
    families: [],
    explain:
      'Informational only: no link, no urgency, no request for details, and it points to the app you already have. (If you didn’t make the purchase, the app is where you dispute it.)',
    action: 'Open your banking app to review — never through links in texts.',
  },
  {
    id: 'prc-received',
    level: 2,
    channel: 'email',
    sender: 'PRC LERIS',
    handle: 'no-reply@prc-official.gov.ph (in your Reply chain — you applied last month)',
    subject: 'Application Received — Professional Regulation Commission',
    text:
      'Your application for license renewal has been received and is in queue. Processing takes fifteen (15) working days. This is an automated message; do not reply.',
    verdict: 'legit',
    families: [],
    explain:
      'Matches an application you actually filed, asks for nothing, sends you nowhere, and sets a realistic timeline. Government messages are usually this dull.',
    action: 'Nothing — wait for processing, monitor through the same official portal you applied on.',
  },
  {
    id: 'shopee-sale',
    level: 2,
    channel: 'sms',
    sender: 'Shopee',
    handle: 'App notification',
    text:
      '10.10 Brand Sale is live! Up to 80% off + ₱1 shipping vouchers today only. Open the app to claim your vouchers.',
    verdict: 'legit',
    families: [],
    explain:
      'It advertises a sale and asks you to open the official app — no external link, no payment, no personal info. Real promos don’t need anything FROM you.',
    action: 'Open the app (or don’t). Nothing to defend against here.',
  },
  {
    id: 'barangay-post',
    level: 2,
    channel: 'post',
    sender: 'Barangay San Isidro Official Page',
    handle: 'Verified page · follows your barangay hall',
    text:
      'ANNOUNCEMENT: Debris cleanup after #KristinePH — Zone 1 & 2: Monday 6AM. Zone 3 & 4: Tuesday 6AM. Bring valid ID for relief goods pickup at the covered court, 9AM–3PM daily. Hotline: (02) 8000-0000.',
    verdict: 'legit',
    families: [],
    explain:
      'Logistics, schedules, a hotline — no money, no links, no panic. Community announcements read like a to-do list, not a threat.',
    action: 'Nothing. This is what a useful government post looks like.',
  },
  {
    id: 'school-memo',
    level: 2,
    channel: 'email',
    sender: 'Principal’s Office — Sta. Rita NHS',
    handle: 'From your school’s domain (saved in contacts)',
    subject: 'Memo 2026-14: Faculty Meeting Rescheduled',
    text:
      'Please be advised the Thursday faculty meeting is moved to 2:00 PM, AVR. Agenda unchanged. — Office of the Principal',
    verdict: 'legit',
    families: [],
    explain:
      'From the real domain of an institution you belong to, about a real event, asking for nothing but attendance.',
    action: 'Attend at 2PM. Life can be this simple.',
  },
  {
    id: 'marites-new-number',
    level: 2,
    channel: 'viber',
    sender: 'Marites??',
    handle: 'Unknown number — claims to be your officemate',
    text:
      'Hi Mars, it’s Marites! Phone broke, new SIM 🥺 Baka may extra load ka, 50 lang, bayaran ko bukas sa office. Kagabi pa kasi akong walang signal eh.',
    verdict: 'verify',
    families: ['channel', 'emotion'],
    explain:
      'Could be true — people really do lose phones — but “new number + small favor” is also the standard probe before the ₱8,000 version of this message. A 50-peso test today maps your trust for a bigger ask tomorrow.',
    action: 'Don’t reply here. Message her OLD number or Viber account, or ask a question only the real Marites gets right.',
  },
  {
    id: 'dhl-customs',
    level: 2,
    channel: 'email',
    sender: 'DHL Express',
    handle: 'tracking@parcel-alerts.info',
    subject: 'Your shipment PH882510 is on HOLD — action needed',
    text:
      'Your package is held at customs: unpaid VAT of ₱248. Settle within 24 hours to continue delivery, or the item returns to sender.',
    verdict: 'verify',
    families: ['payment', 'urgency', 'channel'],
    explain:
      'You DID order something online last week — that’s what makes this land. But real couriers let you settle duties in their official app/site against a real tracking number, and the sender domain here isn’t DHL’s.',
    action: 'Copy the tracking number, open the official DHL app yourself, and check. Verify through the channel you choose, never the link they gave you.',
  },
  {
    id: 'mpin-change',
    level: 2,
    channel: 'wallet',
    sender: 'GCash — Account alert',
    handle: 'In your GCash app inbox',
    text:
      'Your MPIN was changed successfully at 9:42 PM. If you did not make this change, lock your account immediately in the app or call 2882.',
    verdict: 'verify',
    families: ['channel'],
    explain:
      'A real in-app alert — but it describes something you didn’t do. The message is genuine; the emergency is real; the response runs through official channels only.',
    action: 'Lock the account in the app NOW, change the MPIN, call 2882 from the app’s contact page. Speed matters — through official doors.',
  },
  {
    id: 'airpods-classmate',
    level: 2,
    channel: 'dm',
    sender: 'Carlo (classmate)',
    handle: 'Messenger — account may be compromised',
    text:
      'Bro! Nakalimutan ko, may spare akong AirPods Pro 2, sealed, ₱4,500 nalang (₱9,990 sa mall). Sabihan mo ako ng address, ship ko bukas COD. First come first served, 2 lang naiwan!',
    verdict: 'verify',
    families: ['toogood', 'channel'],
    explain:
      'Half price is a flag; a classmate’s account that posts out-of-character sales is the classic hijack pattern. But COD + known person means you can check without losing anything.',
    action: 'Message Carlo on his phone number or another channel: “Ikaw ba ‘to?” Ten seconds saves ₱4,500.',
  },
  {
    id: 'psa-delivery',
    level: 2,
    channel: 'sms',
    sender: 'PSA Delivery',
    handle: '+63 908 000 0000',
    text:
      'Your birth certificate request (Ref: PC2-000111) has been processed and scheduled for delivery. COD courier fee: ₱180 payable upon receipt.',
    verdict: 'verify',
    families: ['payment', 'channel'],
    explain:
      'If you ordered a PSA copy last week, this is plausibly real — and COD (pay only when it’s in your hands) costs you nothing even if it’s fake. The tell to check: does the reference match the receipt from the official site you used?',
    action: 'Match the reference number against your own order confirmation. Track it on the official site you ordered from. Never prepay — COD keeps the risk at zero.',
  },
  {
    id: 'phlpost-hold',
    level: 3,
    channel: 'sms',
    sender: 'PHLPost Customs',
    handle: '+63 998 000 0000',
    text:
      'NOTICE: Your package from abroad (Ref: PHX-88172) is ON HOLD at the customs clearing area. Unpaid VAT ₱312. Settle within 24 hours at phlpost-clearance.info or item will be forfeited.',
    verdict: 'scam',
    families: ['payment', 'urgency', 'channel'],
    explain:
      'Compare this with the courier message you judged earlier — same costume, different story. Here you haven’t ordered anything from abroad, the domain isn’t PHLPost’s, and “forfeited in 24 hours” is theater.',
    action: 'No order, no package, no fee. Delete and report.',
  },
  {
    id: 'job-kit',
    level: 1,
    channel: 'dm',
    sender: 'HR Amara • Online Jobs PH',
    handle: 'Messenger — no company page',
    text:
      'Hi! You’re selected for our home-based data encoding job: ₱2,000/DAY, no experience needed, 2 hrs work. To activate your account today, just get the ₱499 starter kit via GCash. Slots close tonight.',
    verdict: 'scam',
    families: ['toogood', 'payment', 'urgency'],
    explain:
      'Real employers don’t charge you to work. High pay + no experience + “kit fee” is the job-scam triple — the only person earning ₱2,000/day is the scammer, in ₱499s.',
    action: 'A job that asks you to pay first is not a job. Block.',
  },
  {
    id: 'insurance-revive',
    level: 3,
    channel: 'call',
    sender: 'Voicemail — “Bank Insurance Desk”',
    handle: '+63 2 5000 0000',
    text:
      '“Good day, Ma’am. This is Liza from your bank’s insurance partner. Your free coverage lapsed last month and hospital benefits will terminate TODAY. To revive, just process the ₱2,900 revival fee through this line with your card details.”',
    verdict: 'scam',
    families: ['authority', 'urgency', 'payment'],
    explain:
      'Named bank + vague “partner” + same-day termination + card details over the phone. Banks don’t sell insurance by surprise voicemail, and card details never go to inbound callers.',
    action: 'Hang up. Call your bank’s hotline on the back of your card and ask directly. If coverage is real, it survives a callback.',
  },
  {
    id: 'concert-tickets',
    level: 2,
    channel: 'listing',
    sender: 'Mika • Ticket resale',
    handle: 'New seller · no reviews',
    text:
      '2x FRONT ROW tickets, World Tour Manila! Selling at face value (₱8,500 total) kasi conflict sa schedule ko. GCash mo na muna para ma-transfer agad sa name mo — e-tickets sent tonight!',
    verdict: 'scam',
    families: ['payment', 'toogood', 'channel'],
    explain:
      'Front row at face value from a brand-new seller, prepayment required “to transfer” — tickets are the most faked item online. The e-ticket arrives late or never.',
    action: 'Face-to-face at the venue entrance, or buy through the official ticketing platform. Never GCash-first to a stranger.',
  },
  {
    id: 'charity-drive',
    level: 3,
    channel: 'post',
    sender: 'TulongParaSaBicol',
    handle: 'Page created 6 days ago',
    text:
      'PLEASE SHARE 🙏 Our volunteer team is packing relief goods for flood-hit families. We need donations URGENTLY — send via GCash 0995-000-0000 (contact: “R. Delos Santos”). Every peso counts. Photos of deliveries will be posted next week.',
    verdict: 'verify',
    families: ['emotion', 'payment', 'channel'],
    explain:
      'The cause is real, the urgency is real — and that’s exactly when fake donation pages bloom. Six-day-old page, personal e-wallet, and “proof later” can be a scam or a genuine neighbor. Compassion deserves one verification.',
    action: 'Give through channels you can check: your barangay/LGU’s official drive, known orgs (Red Cross, etc.). One search before one peso.',
  },
  {
    id: 'kangkong-chika',
    level: 1,
    channel: 'viber',
    sender: 'Sisters GC 🧺',
    handle: 'Saved group — Tita Baby',
    text:
      'Nay, sumulat ako ng ginataang kangkong recipe na para sa inyo HAHAHA wag kayong mainggit, may picture pa. Drop by bukas, may extra ako. 📸🥬',
    verdict: 'legit',
    families: [],
    explain:
      'Your actual family group chat, about dinner. The only thing being forwarded here is ginataang kangkong. Not every message is a battlefield — knowing the difference is the whole skill.',
    action: 'Reply “Puyat ako nay 😴”. Say yes to kangkong.',
  },
]
