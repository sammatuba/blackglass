# DISINFO Game — Maya Act 1, Scene 2: "The GCash Notification"
## Multi-Agent Writing Pipeline — 5 Drafts

---

## WRITER 1 — THE MINIMALIST

```ink
=== scene_2_minimalist ===

# UI: PHONE_LOCKSCREEN
# NOTIFICATION: GCASH
# SOUND: gcash_chime

{ scene1_deleted_sms:
    Maya swiped away that unknown SMS earlier. This one's different.
- else:
    Another notification. This one's different.
}

**GCash:** You received PHP 5,000.00 from Unknown.

# BEAT: 2.5s

The freelance doc is half-finished on her laptop. The cursor blinks.

# UI: SMS_THREAD
# SENDER: +63-917-XXX-4821
# LABEL: Unknown Number

**Unknown:** Hi po.

# BEAT: 3s

**Unknown:** Wrong send po.

# BEAT: 2s

**Unknown:** Pls send back.

+ [Read the messages]
    Maya stares at the three messages. Short. Polite. Nothing extra.
    -> minimalist_respond
+ [Ignore for now — finish the project brief]
    # FLAG: ignored_first_contact
    She puts the phone face-down.
    # BEAT: 8s
    # SOUND: sms_buzz
    # NOTIFICATION: SMS
    **Unknown:** Po, nandyan pa po ba kayo?
    -> minimalist_respond
+ [Check GCash balance first]
    # UI: GCASH_APP
    # CONCEPT_SEED: appropriate_trust
    She opens GCash. Taps the balance.
    **Balance:** PHP 2,341.17
    No five thousand. The balance hasn't changed.
    -> minimalist_redflag

= minimalist_respond

+ [Reply: "Who is this?"]
    # UI: SMS_THREAD
    **Maya:** Who is this po?
    # BEAT: 2s
    **Unknown:** I'm a mother po. Pls. The money is for my daughter's medicine.
    # BEAT: 1.5s
    **Unknown:** Send to this number po: 0918-XXX-7733
    # FLAG: different_number_given
    -> minimalist_decision

+ [Reply: "How much?"]
    **Maya:** How much do you need back?
    # BEAT: 1s
    **Unknown:** 5,000 po. All of it. For medicine po.
    **Unknown:** Send to 0918-XXX-7733 po.
    # FLAG: different_number_given
    -> minimalist_decision

+ [Check GCash balance first]
    -> minimalist_redflag

+ [Ask in family GC]
    # UI: CHATAPP_FAMILY_GC
    **Maya:** May nag-text sa akin, wrong send daw sa GCash. Send back daw.
    # BEAT: 3s
    **Tita Merly:** Ibalik mo na lang anak. Kawawa naman.
    # BEAT: 2s
    **Cousin Jep:** Wait. Check mo muna balance mo.
    -> minimalist_decision

= minimalist_redflag

The number says five thousand arrived. The balance says it didn't.

+ [Text back: "I don't see it in my balance"]
    **Maya:** I checked po. Wala pong pumasok na 5,000.
    # BEAT: 4s
    **Unknown:** Baka delayed po. Pls po. My daughter.
    # BEAT: 1s
    **Unknown:** Pls na po.
    -> minimalist_decision_informed

+ [Google "GCash wrong send scam"]
    # UI: BROWSER
    # CONCEPT_SEED: human_in_command
    # SEARCH: "GCash wrong send scam"
    The first result: "PSA: Fake GCash notification scam. They send a fake push notif, then guilt you into sending YOUR money."
    -> minimalist_decision_informed

+ [Block the number]
    # FLAG: blocked_early
    # OUTCOME: safe
    She blocks the number. The screen goes quiet. The cursor on her laptop blinks.
    She goes back to work. Her chest feels tight for ten minutes.
    Was that a real mother? Was there a real daughter?
    She'll never know. That's the price of being careful.
    -> scene_2_end

= minimalist_decision

+ [Send PHP 5,000 to 0918-XXX-7733]
    # FLAG: sent_money
    # OUTCOME: scammed
    She sends it. The confirmation appears. PHP 5,000 gone.
    The unknown number never texts again.
    GCash balance: PHP 2,341.17. Minus five thousand. Negative isn't possible. She had to top up first.
    She sent her own money to a stranger.
    -> scene_2_end

+ [Check GCash balance]
    -> minimalist_redflag

+ [Stall — "Wait lang po"]
    **Maya:** Wait lang po ha.
    # BEAT: 5s
    **Unknown:** Pls po mabilis lang po. Pharmacy is closing.
    -> minimalist_decision

= minimalist_decision_informed

+ [Don't send — tell them to contact GCash support]
    # OUTCOME: safe
    # CONCEPT_SEED: human_in_command
    **Maya:** If it's a wrong send po, you can file a dispute through GCash directly. They can reverse it.
    # BEAT: 6s
    No reply.
    # BEAT: 10s
    No reply. The number goes quiet. The freelance doc is still half-finished.
    -> scene_2_end

+ [Send the money anyway — what if it's real?]
    # FLAG: sent_money_despite_evidence
    # OUTCOME: scammed
    She knows the balance didn't change. But what if the system is just slow?
    She sends PHP 5,000. Her own money.
    The confirmation screen glows. The unknown number never replies.
    -> scene_2_end

+ [Block and move on]
    # FLAG: blocked_late
    # OUTCOME: safe
    Block. The screen clears. Back to work.
    -> scene_2_end

= scene_2_end
# TRANSITION: scene_3
-> END
```

---

## WRITER 2 — THE STORYTELLER

```ink
=== scene_2_storyteller ===

# UI: PHONE_NOTIFICATION
# SOUND: gcash_chime
# TIME: 11:47 AM

Maya is three paragraphs into the project brief when her phone lights up.

**GCash Notification:** You received PHP 5,000.00 from Unknown.

She frowns. She isn't expecting anything. The client doesn't pay until Friday.

# BEAT: 4s
# UI: SMS_THREAD
# SENDER: +63-917-XXX-4821

**Unknown:** Hi po, good morning. I'm so sorry to bother you. I accidentally sent PHP 5,000 to your number. It was supposed to go to the pharmacy for my daughter Althea's medication. She has a fever po for two days already. Can you please send it back? I'm begging you po. God bless.

The message is long. Grammatically imperfect. It reads like someone typing fast, hands shaking.

+ [Reply right away]
    -> storyteller_engage
+ [Read it again, slower]
    Maya reads it twice. Althea. A daughter. A fever. A pharmacy.
    -> storyteller_engage
+ [Check GCash balance first]
    -> storyteller_balance_check
+ [Screenshot and send to family GC]
    -> storyteller_family_gc

= storyteller_engage

+ ["Ate, don't worry po. Let me check first."]
    # UI: SMS_THREAD
    **Maya:** Ate, don't worry po. Let me check muna.
    # BEAT: 2s
    **Unknown:** Thank you po, thank you. Aling Nena po ang pangalan ko. Please lang po, the pharmacy closes at 1pm. Can you send to this number: 0918-XXX-7733? It's my sister's GCash po, mine has a problem kasi.
    # FLAG: different_number_given
    # FLAG: name_given_nena
    -> storyteller_choice_point

+ ["How old is your daughter?"]
    **Maya:** How old po si Althea?
    # BEAT: 1.5s
    **Unknown:** 4 years old po. She's so small pa. I brought her to the health center pero they said she needs antibiotics po. I don't have enough. The 5,000 was supposed to be from my husband na OFW po pero napunta sa inyo.
    # BEAT: 1s
    **Unknown:** Pls send to 0918-XXX-7733 po. My sister's number po kasi my GCash is locked.
    # FLAG: different_number_given
    # FLAG: backstory_deepened
    -> storyteller_choice_point

+ [Don't reply yet — check GCash]
    -> storyteller_balance_check

= storyteller_balance_check

# UI: GCASH_APP
# CONCEPT_SEED: appropriate_trust

Maya opens GCash. She scrolls to Recent Transactions.

**Last transaction:** Paid PHP 45.00 to 7-Eleven (March 28)
**Balance:** PHP 2,341.17

No incoming PHP 5,000. Nothing from any unknown sender.

# FLAG: balance_checked
# FLAG: red_flag_noticed

+ [Go back to SMS — confront them]
    **Maya:** Ate, I checked my GCash. Wala pong pumasok na 5,000.
    # BEAT: 3s
    **Unknown:** Baka delayed po ate. Minsan ganun po ang GCash. Pero please po, the pharmacy po. Si Althea po. Pls na.
    # BEAT: 1s
    **Unknown:** 0918-XXX-7733 po. Kahit 3,000 na lang po. Anything po.
    # FLAG: amount_reduced
    -> storyteller_informed_decision

+ [Screenshot the balance and send to family GC]
    -> storyteller_family_gc_informed

+ [Google it]
    # UI: BROWSER
    # SEARCH: "GCash wrong send scam philippines"
    Top result: "Don't fall for it: The 'wrong send' scam sends a FAKE notification. Your balance won't change because no money was actually sent."
    # CONCEPT_SEED: human_in_command
    -> storyteller_informed_decision

= storyteller_family_gc

# UI: CHATAPP_FAMILY_GC
# GC_NAME: Santos Fam

**Maya:** [screenshot of SMS]
**Maya:** May nag-message, wrong send daw sa GCash. Legit kaya?

# BEAT: 2s
**Tita Merly:** Ay kawawa naman! Ibalik mo na anak. Baka talagang nagkamali. Imagine if ikaw yun, gusto mo rin ibalik di ba?
# BEAT: 3s
**Tita Merly:** Sabi nga sa simbahan, do unto others.

# BEAT: 4s
**Cousin Jep:** Wait wait wait. Check mo muna balance mo Maya. Daming ganyan ngayon. Scam yan usually.
# BEAT: 2s
**Tita Merly:** Nako Jep, hindi lahat scam. Minsan totoong tao din yun na nangangailangan.
**Cousin Jep:** Tita, that's literally how they get you 😭
# BEAT: 1s
**Mama Santos:** Ano ba yan. Mag-ingat ka Maya ha.

+ [Check GCash balance]
    -> storyteller_balance_check
+ [Listen to Tita — send it back]
    -> storyteller_choice_point
+ [Listen to Jep — investigate more]
    -> storyteller_balance_check

= storyteller_family_gc_informed

# UI: CHATAPP_FAMILY_GC

**Maya:** [screenshot of GCash balance]
**Maya:** I checked. Wala naman pong pumasok. Scam ata to?

# BEAT: 2s
**Cousin Jep:** SCAM. Block mo na yan.
# BEAT: 3s
**Tita Merly:** Ay talaga? Pero paano kung delayed lang? Kawawa naman kung totoong nanay yun...
**Cousin Jep:** Tita. The balance. Didn't. Change. 😭
# BEAT: 2s
**Tita Merly:** Oo nga no. Hay naku. Ang hirap na talaga ngayon.
**Mama Santos:** Block mo na Maya.

-> storyteller_informed_decision

= storyteller_choice_point

+ [Send PHP 5,000 to 0918-XXX-7733]
    # FLAG: sent_money
    # OUTCOME: scammed
    She opens GCash. Types in the number. 0918-XXX-7733. Not the number that texted her. She pauses on that for half a second, then hits Send.
    **GCash:** You sent PHP 5,000.00 to 0918-XXX-7733.
    **Balance:** PHP 2,341.17 → PHP -2,658.83. Transaction failed. Insufficient funds.
    She tops up from her savings. Sends it.
    **Balance:** PHP 341.17.
    The unknown number sends a heart emoji. Then nothing. No reply to her follow-up. The number goes offline.
    Althea was never real.
    -> scene_2_end

+ [Stall for time]
    **Maya:** Wait lang po ate ha. I need to check something.
    # BEAT: 6s
    **Unknown:** Ate pls po. 1pm po ang pharmacy. Si Althea po.
    -> storyteller_choice_point

+ [Check GCash balance first]
    -> storyteller_balance_check

= storyteller_informed_decision

+ [Tell them to contact GCash support]
    # OUTCOME: safe
    # CONCEPT_SEED: human_in_command
    **Maya:** Ate, I checked and walang pumasok sa account ko. If it's a real wrong send, you can dispute it through GCash directly po. They can reverse it.
    # BEAT: 8s
    No reply. The typing indicator appears, then disappears. Then nothing.
    Maya puts the phone down. Goes back to the project brief. Types a sentence. Deletes it. Types it again.
    Was Althea real? Probably not. But the guilt sits in her chest like a stone.
    -> scene_2_end

+ [Block the number]
    # OUTCOME: safe
    Block. The conversation disappears. The family GC moves on to Tita Merly sharing a recipe.
    Maya stares at her laptop. She can't focus. She makes coffee instead.
    -> scene_2_end

+ [Send the money anyway — you can't risk it being real]
    # FLAG: sent_money_despite_evidence
    # OUTCOME: scammed
    She knows the balance didn't change. She knows what Jep said. But Tita Merly's voice echoes: "Imagine if ikaw yun."
    She sends PHP 5,000 from her savings.
    The unknown number replies: "God bless po." Then silence. Forever.
    -> scene_2_end

= scene_2_end
# TRANSITION: scene_3
-> END
```

---

## WRITER 3 — THE THRILLER WRITER

```ink
=== scene_2_thriller ===

# UI: LAPTOP_SCREEN
# TIME: 11:43 AM
# AMBIENT: keyboard_typing

Maya is mid-sentence on the project brief. Word count: 847. Deadline: 3pm.

# SOUND: gcash_chime
# UI: PHONE_NOTIFICATION
# ANIMATION: notification_slide_down

**GCash:** You received PHP 5,000.00 from Unknown.

# BEAT: 1s
# SOUND: sms_buzz

**+63-917-XXX-4821:** Hi po wrong send po

# BEAT: 0.8s
# SOUND: sms_buzz

**+63-917-XXX-4821:** Pls send back po

# BEAT: 0.5s
# SOUND: sms_buzz

**+63-917-XXX-4821:** Please po it's urgent

Three messages in four seconds.

+ [Pick up the phone]
    -> thriller_engage
+ [Finish typing the sentence first]
    # BEAT: 6s
    # SOUND: sms_buzz
    # SOUND: sms_buzz
    **Unknown:** Po?
    **Unknown:** Nandyan po ba kayo?
    -> thriller_engage
+ [Something feels off — check GCash immediately]
    # FLAG: early_suspicion
    -> thriller_balance

= thriller_engage

# UI: SMS_THREAD
# ANIMATION: typing_indicator

The three dots appear. Someone is typing.

# BEAT: 2s

**Unknown:** It's for my daughter's medicine po. Antibiotic. The pharmacy closes in one hour po.

# BEAT: 0.5s
# ANIMATION: typing_indicator

**Unknown:** I can't get it back through the app po. Takes 3 days daw. She can't wait 3 days po.

The messages come fast. No pauses. Like someone who's rehearsed this.

+ [Reply: "Okay, calm down po. Let me check."]
    **Maya:** Okay po. Calm down. Let me check muna.
    # BEAT: 0.8s
    **Unknown:** Thank you po thank you. Send to 0918-XXX-7733 po. My sister's number.
    # FLAG: different_number_given
    # BEAT: 0.3s
    **Unknown:** Please po mabilis lang
    -> thriller_pressure
+ [Don't reply — check GCash]
    -> thriller_balance
+ [Reply: "Why is it a different number?"]
    **Maya:** Bakit ibang number po?
    # BEAT: 1.5s
    # ANIMATION: typing_indicator
    # BEAT: 2s
    **Unknown:** My GCash is locked po. Naka-flag. That's why I can't reverse it myself po. Please po.
    # FLAG: convenient_excuse
    -> thriller_pressure

= thriller_pressure

# BEAT: 3s
# SOUND: sms_buzz

**Unknown:** Po 56 minutes na lang bago mag-close ang pharmacy

# BEAT: 8s
# SOUND: sms_buzz

**Unknown:** Po?

# BEAT: 5s
# SOUND: sms_buzz

**Unknown:** Pls po nag-iiiyak na si Althea

+ [Send it now — there's no time]
    # FLAG: sent_under_pressure
    # OUTCOME: scammed
    -> thriller_sent
+ [Wait — check balance first]
    -> thriller_balance
+ [Ask the family GC]
    -> thriller_family
+ [Google "GCash wrong send"]
    -> thriller_google

= thriller_balance

# UI: GCASH_APP
# ANIMATION: loading_spinner
# BEAT: 2s

**Balance:** PHP 2,341.17
**Recent Transactions:**
- Paid PHP 45.00 — 7-Eleven (Mar 28)
- Received PHP 8,500.00 — Client Payment (Mar 25)

No PHP 5,000 received. Nothing from Unknown.

# FLAG: balance_checked

# SOUND: sms_buzz
# UI: SMS_NOTIFICATION_OVERLAY

**Unknown:** Po are you still there? 49 minutes na lang po

+ [Confront them]
    **Maya:** I checked my GCash. Walang pumasok na 5,000.
    # BEAT: 2s
    # ANIMATION: typing_indicator
    # BEAT: 3s
    **Unknown:** Minsan delayed po sa GCash. Trust me po. Pls po. Althea po.
    # BEAT: 0.5s
    **Unknown:** Kahit 3,000 na lang po
    # FLAG: amount_dropped
    -> thriller_final_decision

+ [Block immediately]
    # OUTCOME: safe
    # FLAG: blocked_after_check
    Block. The notifications stop. The silence feels sudden and loud.
    Her phone sits on the desk, screen dark. The project brief cursor blinks.
    847 words. Deadline: 3pm. Back to work.
    The quiet doesn't feel like relief. It feels like a door closing on someone who might have needed help.
    -> scene_2_end

+ [Screenshot and send to family GC]
    -> thriller_family

= thriller_google

# UI: BROWSER
# SEARCH: "GCash wrong send scam"
# ANIMATION: results_loading

**Top Result:** "BEWARE: 'Wrong Send' GCash Scam — scammers send fake notifications then pressure you to send YOUR real money to their account."

**Second Result:** "PNP Cybercrime: Do NOT send money to unknown numbers claiming wrong send. Check your actual GCash balance."

# CONCEPT_SEED: human_in_command

# SOUND: sms_buzz
**Unknown:** 43 minutes po

+ [Go back and block them]
    # OUTCOME: safe
    -> thriller_safe_exit
+ [Go back and confront them]
    **Maya:** I looked it up po. This is a known scam.
    # BEAT: 5s
    No reply. The typing indicator appears. Disappears. Appears. Disappears.
    Then nothing.
    -> thriller_safe_exit

= thriller_family

# UI: CHATAPP_FAMILY_GC

**Maya:** [screenshot]
**Maya:** Help. Someone saying wrong send sa GCash. Legit ba?

# BEAT: 1s
**Cousin Jep:** NO. SCAM. Don't send anything.
# BEAT: 3s
**Tita Merly:** Ay nako wait baka naman totoong nagkamali. Check mo muna balance mo anak.
**Cousin Jep:** ^^^ this. Check balance. Bet you it didn't change.

{ thriller_balance:
    **Maya:** I already checked. Walang pumasok.
    **Cousin Jep:** Case closed. Block.
    **Tita Merly:** Hay. Kawawa naman kung totoo. Pero kung wala naman talagang pumasok...
    -> thriller_final_decision
- else:
    -> thriller_balance
}

= thriller_pressure_continues

# SOUND: sms_buzz
# SOUND: sms_buzz
**Unknown:** 38 minutes po
**Unknown:** Pls po I'm begging you
-> thriller_final_decision

= thriller_final_decision

+ [Send the money — you can't take the risk]
    # OUTCOME: scammed
    -> thriller_sent
+ [Tell them to contact GCash support]
    # OUTCOME: safe
    -> thriller_safe_exit
+ [Block the number]
    # OUTCOME: safe
    -> thriller_safe_exit

= thriller_sent
# FLAG: sent_money
# UI: GCASH_APP
She opens GCash. Types 0918-XXX-7733. PHP 5,000. Her hands move fast, matching the urgency she absorbed.
**Insufficient balance.** She tops up from her bank. Sends it.
**Sent.**
# BEAT: 3s
She texts: "Sent na po. I hope Althea gets better."
# BEAT: 10s
# BEAT: 10s
No reply.
# BEAT: 10s
The number is unreachable.
-> scene_2_end

= thriller_safe_exit
# OUTCOME: safe
**Maya:** Please contact GCash support po. They can reverse wrong sends.
# BEAT: 8s
The typing indicator appears one last time. Then vanishes.
The number goes silent. Maya puts her phone in her desk drawer.
The project brief isn't going to write itself.
-> scene_2_end

= scene_2_end
# TRANSITION: scene_3
-> END
```

---

## WRITER 4 — THE EMPATHIST

```ink
=== scene_2_empathist ===

# UI: PHONE_LOCKSCREEN
# SOUND: gcash_chime
# TIME: 11:52 AM
# INTERNAL: true

Maya's hands are on the keyboard when the notification lights up her phone.

**GCash:** You received PHP 5,000.00 from Unknown.

Her first thought: Did the client pay early?
Her second thought: That's not PHP 8,500.
Her third thought: Who sends five thousand pesos to a stranger?

# BEAT: 3s
# UI: SMS_THREAD
# SENDER: +63-917-XXX-4821

**Unknown:** Hi po. I'm so sorry for disturbing you. I sent PHP 5,000 to your number by mistake po. It was for my daughter's antibiotics. She's been sick since Monday. Can I please ask you to send it back po? I know this is a lot to ask from a stranger. God bless po.

Maya reads it. Her chest does the thing it does when she sees those posts — the fundraisers, the medical bills, the GoFundMe links for children she'll never meet.

+ [Feel the pull to help immediately]
    There's a mother on the other end of this number. Maybe. Probably. A child named — she scrolls up — a child who's sick. Maya knows what it's like to not have enough for medicine. She's been there.
    -> empathist_internal_1
+ [Feel the suspicion — and feel guilty about it]
    -> empathist_suspicion
+ [Check GCash balance — be practical]
    -> empathist_balance

= empathist_internal_1

She starts typing: "Don't worry po, I'll send it back."

Her thumb hovers over Send.

Wait. What number?

+ [Ask: "Where do I send it po?"]
    **Maya:** Sige po. Where do I send it?
    # BEAT: 1.5s
    **Unknown:** Thank you po, thank you so much. 0918-XXX-7733 po. My sister's GCash. Mine is locked po kasi.
    # FLAG: different_number_given
    That's... not the number that texted her.
    -> empathist_pause
+ [Check GCash first — just to be sure]
    She closes the SMS. Opens GCash. Her fingers move before her heart can argue.
    -> empathist_balance

= empathist_suspicion

# INTERNAL: maya_thought

She hates this feeling. The calculus of compassion. When did she become the person who reads a mother's plea and thinks: "Is this real?"

Is this what the internet has done to her? Is this what being careful looks like — cold?

+ [Push past the guilt — check GCash]
    No. Being careful isn't cold. It's smart. She opens GCash.
    -> empathist_balance
+ [Push past the suspicion — reply with kindness]
    **Maya:** Hi po. Don't worry. Let me help.
    # BEAT: 1s
    **Unknown:** Salamat po. Salamat talaga. Please send to 0918-XXX-7733 po. My sister will pick up the medicine.
    # FLAG: different_number_given
    -> empathist_pause
+ [Sit with the discomfort — ask the family GC]
    -> empathist_family

= empathist_balance

# UI: GCASH_APP
# CONCEPT_SEED: appropriate_trust

**Balance:** PHP 2,341.17

She scrolls through Recent Transactions. Nothing. No PHP 5,000 from anyone.

The notification said she received money. Her balance says she didn't.

# FLAG: balance_checked

Something loosens in her chest. And something tightens.

+ [Relief — it's probably a scam]
    # INTERNAL: maya_thought
    Relief first. Then: shame at the relief. Then: anger. At the scammer, for making her feel guilty. At herself, for almost falling for it. At the world, for making her distrust a text about a sick child.
    -> empathist_informed
+ [Doubt — what if GCash is just delayed?]
    # INTERNAL: maya_thought
    What if the app is slow? What if by the time it posts, the pharmacy is closed and a four-year-old doesn't get her medicine because Maya was being "careful"?
    -> empathist_doubt
+ [Send the evidence to family GC]
    -> empathist_family_informed

= empathist_pause

A different number. Not the one texting her.

# INTERNAL: maya_thought

Why would you send money from one number and ask someone to return it to a different number?

Her mother's voice in her head: "Maraming modus ngayon."
Tita Merly's voice: "Pero maraming nangangailangan din."

Both are true. Both pull.

+ [Check GCash balance]
    -> empathist_balance
+ [Ask why it's a different number]
    **Maya:** Bakit po ibang number?
    **Unknown:** Naka-lock po GCash ko. Problem po talaga. Kaya my sister na lang po.
    # BEAT: 1s
    **Unknown:** Pls po. Si Althea po. 4 years old lang po.
    -> empathist_choice
+ [Send the money — the risk of being wrong is a child not getting medicine]
    -> empathist_send

= empathist_family

# UI: CHATAPP_FAMILY_GC

**Maya:** Guys. Someone's saying they wrong-sent 5k to me on GCash. Asking me to send it back. I feel bad ignoring it but something feels off?

# BEAT: 3s
**Tita Merly:** Ibalik mo na anak. Kawawa naman. Isipin mo kung ikaw nanay nun.
# BEAT: 2s
**Cousin Jep:** DON'T. Check your balance first. Classic scam yan.
# BEAT: 1s
**Tita Merly:** Hay nako Jep, lagi ka namang negative.
**Cousin Jep:** Tita, I love you, pero that's literally how the scam works. They prey on people who think like you.
# BEAT: 2s
**Mama Santos:** Maya, mag-ingat ka. Check mo muna.

# INTERNAL: maya_thought
Jep sounds sure. Tita sounds hurt. Mama sounds worried. Maya sounds like all three.

+ [Check GCash balance]
    -> empathist_balance
+ [Listen to Tita — send it]
    -> empathist_send

= empathist_family_informed

# UI: CHATAPP_FAMILY_GC

**Maya:** I checked my GCash. Walang pumasok na 5,000. Scam ba to?
**Cousin Jep:** 100% scam. Block mo na.
# BEAT: 3s
**Tita Merly:** Ay ganun ba. Wala talagang pumasok? Hay. Okay, ingat ka anak.

# INTERNAL: maya_thought
Tita Merly's quiet acceptance hurts more than the scam attempt. She wanted it to be real too. She wanted there to be a way to help.

-> empathist_informed

= empathist_doubt

# SOUND: sms_buzz
**Unknown:** Po? I'm crying na po. Althea is burning up po.

+ [Send it — you'd rather lose 5,000 than live with the alternative]
    -> empathist_send
+ [Hold firm — trust the evidence]
    -> empathist_informed
+ [Google it first]
    # UI: BROWSER
    # SEARCH: "GCash wrong send scam"
    The search results are clear. The scam is well-documented. The notifications are fake. The children are not real.
    # CONCEPT_SEED: human_in_command
    -> empathist_informed

= empathist_informed

+ [Tell them to contact GCash support]
    # OUTCOME: safe
    **Maya:** Ate, if it's a real wrong send, GCash can reverse it po. Please contact their support.
    # BEAT: 10s
    No reply.
    # INTERNAL: maya_thought
    She did the right thing. She knows she did the right thing. So why does "right" feel this heavy?
    -> scene_2_end

+ [Block the number]
    # OUTCOME: safe
    Block. Gone.
    # INTERNAL: maya_thought
    She goes back to the project brief. Types a paragraph about "stakeholder engagement." The words mean nothing. She's thinking about a girl named Althea who probably doesn't exist.
    Probably.
    -> scene_2_end

= empathist_choice

+ [Send the money]
    -> empathist_send
+ [Check balance first]
    -> empathist_balance

= empathist_send
# FLAG: sent_money
# OUTCOME: scammed
# UI: GCASH_APP

She sends PHP 5,000 to 0918-XXX-7733. She has to top up from savings. She does it without hesitating because hesitation would mean thinking, and thinking would mean doubt, and doubt would mean she's the kind of person who lets a child suffer over suspicion.

**Sent.**

# BEAT: 3s

**Unknown:** God bless po. Thank you po.

# BEAT: 15s

She checks her balance. PHP 341.17. She texts: "I hope Althea feels better po."

# BEAT: 20s

No reply.

# BEAT: 30s

The number is unreachable.

# INTERNAL: maya_thought
The guilt of being scammed is nothing compared to the guilt she would have felt if it were real and she did nothing. That's the trap. That's always been the trap.

-> scene_2_end

= scene_2_end
# TRANSITION: scene_3
-> END
```

---

## WRITER 5 — THE SATIRIST

```ink
=== scene_2_satirist ===

# UI: PHONE_LOCKSCREEN
# SOUND: gcash_chime
# TIME: 11:58 AM — the exact time when productive people become vulnerable

**GCash:** You received PHP 5,000.00 from Unknown.

Unknown. Not "Juan dela Cruz." Not "Maria Santos." Unknown. As in: the universe has deposited money into your account and dares you to ask questions.

# BEAT: 2s
# UI: SMS_THREAD
# SENDER: +63-917-XXX-4821

**Unknown:** Good day po. I am a humble mother. I accidentally sent PHP 5,000 to your number po. This money is for my daughter Althea who is sick po. Antibiotic po. She is only 4 years old po. I am begging you po with all my heart to please return the money po. God bless po and thank you po. 🙏

Six uses of "po." One prayer emoji. One sick child. This is the Fibonacci sequence of Filipino guilt.

+ [Reply immediately — you are a good person]
    -> satirist_engage
+ [Pause — you are a suspicious person]
    -> satirist_pause
+ [Check GCash — you are a practical person]
    -> satirist_balance
+ [Screenshot for the family GC — you are a Filipino person]
    -> satirist_family

= satirist_engage

+ ["Ate, I'll help po"]
    **Maya:** Sige po ate. Where do I send?
    # BEAT: 1s
    **Unknown:** Thank you po! 0918-XXX-7733 po. My sister po kasi my GCash has a problem po.
    # FLAG: different_number_given
    A different number. Of course. Because nothing in this interaction will be straightforward, and that's by design.
    -> satirist_choice
+ ["Who are you po?"]
    **Maya:** Sorry po, sino po kayo?
    **Unknown:** Aling Nena po. Taga-Antipolo po. Nanay po. I work as a labandera po. Please lang po.
    A complete character bio in four sentences. Nena has a backstory more detailed than most Netflix characters.
    -> satirist_choice

= satirist_pause

Maya stares at the message. It's... a lot. It has the structural elements of a legitimate emergency:
- Sick child (emotional anchor)
- Specific age (detail = credibility)
- Medicine (tangible, time-sensitive need)
- Humility (the "po" density is off the charts)

But it also reads like a template. Fill in: [CHILD NAME], [AGE], [MEDICAL NEED], [EMOJI].

+ [Check the balance]
    -> satirist_balance
+ [Reply anyway — templates can be real too]
    -> satirist_engage
+ [Ask the family GC — outsource your moral crisis]
    -> satirist_family

= satirist_balance

# UI: GCASH_APP
# CONCEPT_SEED: appropriate_trust

**Balance:** PHP 2,341.17.

Maya scrolls. No five thousand. No incoming transfer. Nothing from Unknown, because Unknown is not a real person — Unknown is a push notification pretending to be money.

# FLAG: balance_checked

The notification was fake. The GCash app is real. The five thousand pesos never existed. But the guilt? The guilt is absolutely real, and it's free of charge.

+ [Confront the sender]
    **Maya:** Ate, I checked my GCash po. Walang pumasok.
    # BEAT: 3s
    **Unknown:** Baka delayed po ate. Ganyan talaga minsan. Pls po. Si Althea po.
    "Baka delayed." The universal Filipino explanation for anything that hasn't happened: maybe it's just delayed. Traffic. Rain. GCash. Justice. All delayed.
    -> satirist_informed
+ [Go to the family GC with evidence]
    -> satirist_family_evidence
+ [Google it]
    # UI: BROWSER
    # SEARCH: "GCash wrong send scam"
    The entire first page of results is warnings. It's not even ambiguous. This scam has its own Wikipedia energy.
    # CONCEPT_SEED: human_in_command
    -> satirist_informed

= satirist_family

# UI: CHATAPP_FAMILY_GC
# GC_NAME: Santos Fam 🏠

**Maya:** [screenshot]
**Maya:** Guys, scam ba to o what?

What follows is a masterclass in Filipino family dynamics compressed into a group chat:

# BEAT: 1s
**Tita Merly:** Kawawa naman! Ibalik mo na yan anak! 🙏 Sabi sa Bible, "give and it shall be given unto you." Basta ibalik mo.
# BEAT: 2s
**Cousin Jep:** TITA NO. Classic scam to. Don't send anything Maya!
# BEAT: 1s
**Tita Merly:** Jep, bakit ka ba laging ganyan? Hindi lahat masama sa mundo.
**Cousin Jep:** I'm not saying lahat masama, I'm saying THIS SPECIFIC TEXT is masama!!
# BEAT: 2s
**Mama Santos:** Mag-ingat ka Maya.
# BEAT: 1s
**Tita Merly:** True, mag-ingat ka. Pero ibalik mo pa rin.
**Cousin Jep:** TITA 😭😭😭

Tita Merly has spoken. Cousin Jep has screamed into the void. Mama Santos has contributed the Filipino mother's universal contribution to any crisis: a vague instruction to be careful. The Holy Trinity of family advice is complete.

+ [Side with Tita — send the money]
    -> satirist_choice
+ [Side with Jep — check the balance]
    -> satirist_balance
+ [Side with Mama — be vaguely careful]
    **Maya:** Sige, mag-iingat po ako.
    She puts the phone down. This resolves nothing, which is exactly what "mag-ingat" was designed to do.
    # BEAT: 5s
    # SOUND: sms_buzz
    **Unknown:** Po? 45 minutes na lang po. Pharmacy po.
    -> satirist_choice

= satirist_family_evidence

# UI: CHATAPP_FAMILY_GC

**Maya:** [screenshot of balance]
**Maya:** Checked GCash. Walang pumasok. Scam to diba?

# BEAT: 1s
**Cousin Jep:** TOLD. YOU. 🎯
# BEAT: 2s
**Tita Merly:** Ay... wala talagang pumasok? Hay naku. Ang dami talagang scammer ngayon. Kaya pala laging may segment sa Tulfo about this.
**Cousin Jep:** Tita, you watch Tulfo every day and you still almost fell for it??
**Tita Merly:** Iba kasi pag text, Jep. Parang personal.

That last line from Tita Merly is the most honest thing anyone has said today.

-> satirist_informed

= satirist_choice

+ [Send PHP 5,000 to 0918-XXX-7733]
    # FLAG: sent_money
    # OUTCOME: scammed
    She sends it. From her savings. Five thousand pesos to a number she's never seen, for a child she's never met, from a mother who doesn't exist.
    The confirmation screen displays: **Sent!**
    It's the most expensive exclamation point she'll see all year.
    # BEAT: 5s
    **Unknown:** God bless po 🙏
    # BEAT: 20s
    No further replies. The number goes offline. Aling Nena, mother of Althea, labandera from Antipolo, vanishes from existence like a character whose arc is complete.
    GCash balance: PHP 341.17.
    -> scene_2_end

+ [Check GCash balance first]
    -> satirist_balance
+ [Stall]
    **Maya:** Wait lang po ha.
    **Unknown:** Po pls mabilis lang po. Si Althea po. 🙏
    Urgency. The great closer. Second only to guilt in the Filipino emotional sales funnel.
    -> satirist_choice

= satirist_informed

+ [Tell them to go through GCash support]
    # OUTCOME: safe
    # CONCEPT_SEED: human_in_command
    **Maya:** Ate, if it's a real wrong send, GCash has a dispute process po. They can reverse it directly. That's the safest for both of us.
    # BEAT: 8s
    No reply.
    Of course not. GCash support can't reverse a transaction that never happened. And Aling Nena can't navigate a dispute process because Aling Nena is a text message, not a person.
    Maya closes the thread. Opens the project brief. Types a paragraph. It's fine. Everything is fine.
    -> scene_2_end

+ [Block the number]
    # OUTCOME: safe
    Block.
    The Santos Family GC moves on. Tita Merly shares a Tulfo clip about a different scam. Cousin Jep reacts with 😭. Mama Santos sends a random "Good morning" image with a Bible verse and a cup of coffee, twelve hours late.
    Normal programming resumes.
    -> scene_2_end

= scene_2_end
# TRANSITION: scene_3
-> END
```

---

# EDITOR'S RANKING

## Scoring Criteria (1-10)

| Criterion | W1: Minimalist | W2: Storyteller | W3: Thriller | W4: Empathist | W5: Satirist |
|---|---|---|---|---|---|
| **Emotional Hook** | 6 | 9 | 7 | 10 | 8 |
| **Mechanical Clarity** (Ink logic, branching) | 9 | 8 | 8 | 7 | 7 |
| **Red Flag Subtlety** (clues present but not obvious) | 8 | 8 | 7 | 7 | 6 |
| **Both-Choices-Hurt Principle** | 7 | 9 | 6 | 10 | 8 |
| **Filipino Authenticity** | 6 | 9 | 7 | 8 | 10 |
| **Replayability** (different paths feel distinct) | 8 | 8 | 7 | 6 | 7 |
| **Concept Seeding** (Appropriate Trust / Human-in-Command) | 7 | 8 | 8 | 9 | 7 |
| **Complicity-Before-Clarity Guardrail** | 8 | 9 | 8 | 10 | 7 |
| **TOTAL** | **59** | **68** | **58** | **67** | **60** |

## Rankings

### 1st Place: WRITER 2 — THE STORYTELLER (68/80)
The strongest all-around draft. Aling Nena's story is detailed enough to feel real, the family GC dynamics are pitch-perfect (Tita Merly quoting scripture vs. Jep's exasperation), and the branching covers all required exit points without feeling mechanical. The "amount reduction" moment (asking for 3,000 instead of 5,000) is a brilliant red flag that most players won't catch on the first pass. The consequences land hard: "Althea was never real" is a gut-punch closer.

### 2nd Place: WRITER 4 — THE EMPATHIST (67/80)
One point behind the Storyteller but arguably the most *important* draft. The internal monologue captures something no other draft attempts: the shame of being suspicious. The line "doubt would mean she's the kind of person who lets a child suffer over suspicion" is the single best sentence across all five drafts because it articulates why this scam works. The final line about guilt being "the trap" is the closest any draft comes to teaching the concept without lecturing. Weakness: slightly less mechanical variety in branching paths.

### 3rd Place: WRITER 5 — THE SATIRIST (60/80)
The most entertaining draft by far and the one with the strongest cultural voice. The family GC sequence is a standalone masterpiece of Filipino family dynamics. Tita Merly's "Iba kasi pag text, parang personal" is a thesis statement disguised as a chat message. However, the satirical distance works against the complicity-before-clarity guardrail — the narration occasionally tips the player off before they've made their choice. Needs tonal calibration: less editorial voice during decision moments, more during consequences.

### Not Recommended for Final: WRITER 1 (Minimalist) and WRITER 3 (Thriller)
**Writer 1** is mechanically clean but emotionally thin — the "three words from the sender" concept doesn't generate enough guilt to make the dilemma feel real. **Writer 3** leans too hard on pacing gimmicks (countdown timers, buzzing sounds) and not enough on the human element; the pressure feels gamey rather than genuine. Both could contribute elements to the final composite (W1's branching structure, W3's timing/sound design) but neither should anchor the scene.

## Recommended Composite Strategy
Use **Writer 2** as the structural backbone (Nena's story, family GC, branching logic). Layer in **Writer 4's** internal monologue at key decision points (the hovering thumb, the shame of suspicion, the weight of "doing the right thing"). Season with **Writer 5's** family GC dialogue and cultural observations where they don't break immersion. Borrow **Writer 3's** sound design and notification timing. Discard **Writer 1** except as a reference for clean Ink syntax.
