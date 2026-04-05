// ============================================================
// MAYA — Act 1, Scene 2: "The Good Samaritan"
// COMPOSITE DRAFT | GCash Wrong-Send Scam
// ============================================================
// STRUCTURAL BACKBONE: Writer 2 (Storyteller) — Aling Nena's story, amount reduction, gut punch
// INTERNAL MONOLOGUE: Writer 4 (Empathist) — shame, guilt, the kindness trap
// FAMILY GC DIALOGUE: Writer 5 (Satirist) — Tita Merly, conflicting advice
// NOTIFICATION TIMING: Writer 3 (Thriller) — pacing, sound cues, typing indicators
// ============================================================

VAR gcash_balance = 1247
VAR sent_money_back = false
VAR checked_balance = false
VAR asked_gcash_support = false
VAR blocked_sender = false
VAR asked_family_gc = false
VAR googled_scam = false
VAR trust_score = 0
VAR suspicion_level = 0
VAR scene2_complete = false

// CONCEPT TRACKING
VAR concept_appropriate_trust = false
VAR concept_human_in_command = false

=== scene_2 ===

#SCENE_TRANSITION
#SOUND: night_ambient, phone_charging_hum

It's 11:47 PM. You're half-asleep, phone on the pillow beside you. Tomorrow is Monday. Your alarm is set for 5:30.

#SOUND: gcash_notification_chime
#UI: gcash_notification_popup

Your phone lights up the ceiling.

#UI: notification_banner
<b>GCash:</b> You received ₱5,000.00 from Unknown.

You sit up. Blink at the screen.

Five thousand pesos. From no one you know.

    * [Check the notification]
        You tap it open. The GCash app loads — the transaction is right there at the top. ₱5,000.00. Received. From a number you don't recognize.
        ~ trust_score += 1
        -> sms_arrives
    * [Ignore it, go back to sleep]
        You set the phone face-down. Probably a glitch. You'll deal with it tomorrow.
        #SOUND: sms_triple_buzz
        But then the messages start.
        -> sms_arrives

= sms_arrives

#SOUND: sms_buzz
#UI: sms_thread_open

Three messages, rapid-fire, from an unknown number:

#UI: sms_bubble_incoming
"Ate please don't spend it po 🙏 I sent to wrong number"

#PAUSE: 1.2s
#UI: typing_indicator

#UI: sms_bubble_incoming
"It's for my daughter's hospital bill po. She's 7. Her name is Althea. Please ate, that's all we have."

#PAUSE: 0.8s
#UI: sms_bubble_incoming
"I'm a single mother po, I work as labandera. I'm begging you ate 🙏🙏🙏"

// INTERNAL MONOLOGUE — The Kindness Trap
You read it twice. Your chest tightens. You think of your own Mama, who raised three kids on a market vendor's salary. You think of every time someone helped your family when no one had to.

Not helping feels like becoming the kind of person you swore you'd never be.

    * [Reply: "Don't worry po, I'll send it back"]
        ~ trust_score += 3
        You type fast, almost instinctively. Because this is who you are. This is who Mama raised.
        #UI: sms_bubble_outgoing
        "Don't worry po, I'll send it back 🙏"
        -> return_instructions
    * [Reply: "Wait — let me check my account first"] #EXIT_POINT
        ~ suspicion_level += 1
        ~ concept_appropriate_trust = true
        // You feel a prickle of guilt even as you type it. Checking feels like an accusation. Like saying: I don't believe you. To a mother. About her sick daughter.
        #UI: sms_bubble_outgoing
        "Wait po, let me check muna my balance."
        -> check_balance
    * [Screenshot the messages and send to the family GC] #EXIT_POINT
        ~ asked_family_gc = true
        You screenshot everything. Your thumb hovers over the family group chat. At this hour, only the insomniacs will see it — but your family has opinions, and they have them loudly.
        -> family_gc
    * [Google "GCash wrong send scam"] #EXIT_POINT
        ~ googled_scam = true
        ~ suspicion_level += 2
        Something nags at you. You open Chrome.
        -> google_search

= check_balance

#UI: gcash_app_open
~ checked_balance = true

You open GCash. Stare at the balance.

<b>₱1,247.00</b>

Not ₱6,247. Not ₱1,247 plus five thousand. Just... what you had before.

#SOUND: quiet_dread_tone

The five thousand was never there.

~ suspicion_level += 3
~ concept_appropriate_trust = true

    * [Confront the sender about the balance]
        #UI: sms_bubble_outgoing
        "Ate, I checked my balance po. Walang dumating na 5,000."
        -> sender_panics
    * [Send to family GC with this new info]
        ~ asked_family_gc = true
        You screenshot your balance beside the notification. Something is wrong here.
        -> family_gc_with_evidence

= return_instructions

#PAUSE: 1.5s
#UI: typing_indicator_long

She takes a moment to reply. Then:

#UI: sms_bubble_incoming
"Thank you po ate, God bless you po 🙏😭 Please send to this number po — 0917-XXX-XXXX. Send ₱3,000 na lang po, keep ₱2,000 for your trouble."

// INTERNAL MONOLOGUE — The Red Flag You Almost Miss
Wait. A different number. And the amount changed. She sent five thousand but only wants three back? That should feel generous, but instead it lands wrong — like a price negotiated in advance. Like she already knew you'd say yes.

~ suspicion_level += 1

    * ["Wait, why a different number?"]
        ~ suspicion_level += 2
        ~ concept_appropriate_trust = true
        #UI: sms_bubble_outgoing
        "Ate, bakit ibang number po? Hindi ba sa'yo i-rereturn ko?"
        -> sender_panics
    * ["Why only 3,000 if you sent 5,000?"]
        ~ suspicion_level += 2
        #UI: sms_bubble_outgoing
        "You sent 5k pero 3k lang ibabalik ko? Ate, I can return the full amount naman po."
        -> sender_panics
    * [Just send the ₱3,000 — she's suffering]
        ~ sent_money_back = true
        ~ gcash_balance -= 3000
        // You push down the doubt. Doubt is a luxury for people who've never been desperate. You open GCash, type the number, type 3,000, and hit Send.
        #SOUND: gcash_send_chime
        #UI: gcash_send_confirmation
        -> money_sent
    * [Check your GCash balance first] #EXIT_POINT
        ~ concept_human_in_command = true
        Something makes you pause. Your thumb hovers over Send. Then moves to your balance instead.
        -> check_balance

= family_gc

#UI: messenger_gc_open
#SOUND: messenger_pop

// 11:52 PM — Family GC: "SANTOS SUPREMACY 💪"

#UI: gc_bubble
<b>You:</b> [screenshot] Guys may nag-wrong-send sa GCash ko. 5k. Legit ba to?

#PAUSE: 2.0s
#UI: typing_indicator
#UI: gc_bubble
<b>Tita Merly:</b> AY KAWAWA NAMAN! Send it back anak, imaginin mo kung ikaw yun. Single mother pa. Baka wala nang makain yung bata 😢

#PAUSE: 1.0s
#UI: gc_bubble
<b>Kuya Jomar:</b> HUWAG. Classic scam yan. Check mo muna balance mo kung talagang dumating.

#UI: gc_bubble
<b>Tita Merly:</b> Naku Jomar ang dami mong alam. Hindi lahat scam sa mundo. May mga tao talagang nangangailangan.

#UI: gc_bubble
<b>Kuya Jomar:</b> Tita. With all due respect. CHECK. THE. BALANCE.

#UI: gc_bubble
<b>Mama:</b> Anak, what does your gut tell you?

~ concept_human_in_command = true

    * [Side with Tita Merly — send it back]
        ~ trust_score += 2
        -> return_instructions
    * [Side with Kuya Jomar — check the balance] #EXIT_POINT
        ~ suspicion_level += 2
        Kuya Jomar has been scammed before. He lost 8,000 pesos to a fake Lazada COD. He's earned his paranoia.
        -> check_balance
    * [Listen to Mama — trust your gut]
        ~ concept_human_in_command = true
        Your gut says: something here doesn't add up. But your heart says: what if she's real?
        -> gut_check

= family_gc_with_evidence

#UI: messenger_gc_open

#UI: gc_bubble
<b>You:</b> [screenshot of balance] Guys. Look. Balance ko same pa rin. Yung 5k na notification, FAKE.

#PAUSE: 1.5s
#UI: gc_bubble
<b>Kuya Jomar:</b> WHAT DID I SAY. 🎤⬇️

#UI: gc_bubble
<b>Tita Merly:</b> ... ay.

#UI: gc_bubble
<b>Mama:</b> Block mo na anak. Now na.

~ suspicion_level += 3
-> scam_reveal

= google_search

#UI: chrome_search
// Search: "GCash wrong send scam Philippines"

The first three results all say the same thing: it's a scam. The notification is spoofed. The "wrong send" is bait. The money was never in your account. If you "return" it, you're sending your own money to a stranger.

Aling Nena from your barangay fell for this last month. Sent ₱3,500 she'd saved for her grandson's school supplies. She cried at the sari-sari store telling your Mama about it. "Akala ko totoong nanay," she said. "Kasi sino namang magpapanggap?"

~ suspicion_level += 3
~ concept_appropriate_trust = true

    * [Go back and confront the sender]
        -> sender_panics
    * [Block the number immediately]
        ~ blocked_sender = true
        -> scam_reveal

= gut_check

You close the group chat. Sit in the dark. The phone glows in your hands.

What does your gut tell you?

It tells you: a real mother in crisis wouldn't tell you to keep ₱2,000. She'd want every peso back.

~ suspicion_level += 2

    * [Check the balance]
        -> check_balance
    * [Send the money anyway — you'd rather be kind than right]
        ~ sent_money_back = true
        ~ gcash_balance -= 3000
        -> money_sent

= sender_panics

#UI: sms_thread_open
#SOUND: sms_buzz_rapid

#UI: sms_bubble_incoming
"Ate please po 😭 my daughter is in the hospital po"

#UI: sms_bubble_incoming
"Baka nag-error lang po yung app niyo"

#UI: sms_bubble_incoming
"Ate??"

#PAUSE: 2.0s
#UI: typing_indicator

#UI: sms_bubble_incoming
"Fine. Wag mo na ibalik. Sana masarap ulam mo."

The mask slips. Just like that. No more "po." No more crying emoji. The sick daughter, the labandera mother, the hospital — all of it, a script. Rehearsed and reused. You were never talking to a desperate mother. You were talking to someone who does this professionally.

Althea was never real.

~ suspicion_level += 5
-> scam_reveal

= money_sent

#UI: gcash_balance_update
// Balance: ₱-1,753.00... wait. ₱1,247 - ₱3,000 = insufficient.
// OR if player had enough:

{gcash_balance < 0:
    #UI: gcash_error
    Transaction failed. Insufficient balance. You stare at the screen. You have ₱1,247. She asked for ₱3,000. The ₱5,000 was never yours.
    The five thousand was never there. You almost sent money you didn't have, to return money you never received.
    ~ sent_money_back = false
    ~ suspicion_level += 3
    -> scam_reveal
}

-> scam_reveal

= scam_reveal

~ scene2_complete = true

#SCENE: revelation
#SOUND: ambient_silence

{sent_money_back:
    You sit in the dark, stomach hollow. Three thousand pesos. Two weeks of packed lunches. Gone to someone who invented a daughter to steal from strangers.
    You don't tell Mama. You eat less that week and say you're dieting.
- else:
    {checked_balance:
        You caught it. The balance that didn't change. The number that didn't match. The amount that shifted like a negotiation. You caught it — but it doesn't feel like winning.
    }
    {googled_scam:
        You think of Aling Nena. How she's you, in the version of tonight where you didn't Google it. How many Aling Nenas are out there right now, reading the same messages about the same daughter who doesn't exist?
    }
    {asked_family_gc:
        Kuya Jomar sends one more message to the GC at midnight: "Aling Nena sa kanto lost 3,500 to this exact scam last month. EXACT same script."
    }
    {blocked_sender:
        You blocked the number. But you know there are a thousand more numbers. And a thousand more Altheas.
    }
}

#UI: concept_card
<b>APPROPRIATE TRUST</b> — Kindness and caution aren't opposites. Verifying doesn't make you cruel. The scammer weaponized your goodness — the instinct to help, the shame of suspicion. Real emergencies survive a five-second balance check.

#UI: concept_card
<b>HUMAN-IN-COMMAND</b> — You are always allowed to pause. To check. To ask someone. No legitimate request falls apart because you took thirty seconds to verify it. Urgency that punishes caution is a red flag, not a reason to rush.

// EXIT POINT TRACKING
{checked_balance: ~ concept_appropriate_trust = true}
{asked_gcash_support: ~ concept_human_in_command = true}

-> scene_3_teaser

= scene_3_teaser

#SCENE_TRANSITION
#SOUND: morning_alarm

// TEASER — Act 1, Scene 3: "The Inbox"

Monday morning. 6:15 AM. You're on the jeepney, elbow-to-elbow with the commute. Your phone buzzes.

#UI: email_notification
<b>From:</b> noreply@ph-govt-benefits.com
<b>Subject:</b> ACTION REQUIRED: Your SSS Benefit Disbursement (₱12,400) is pending verification

You almost scroll past. But ₱12,400. That's rent. That's three months of Internet. And it says SSS — you did file a claim two months ago...

#UI: fade_to_black
<i>Scene 3: "The Inbox" — Coming next.</i>

-> END

// ============================================================
// END OF SCENE 2 — "The Good Samaritan"
// ============================================================
