# Anchor 2 — "It's Me" — raw verbatim drafts

Full beat-level output from the three parallel `blackglass-writer` agents (2026-06-02), preserved verbatim. The editorial reading layer is in [`drafts.md`](drafts.md). Promote to `script.ink` at polish; reconcile the timeline per drafts.md before locking.

---

## A. TITA MERLY — FORWARD

```
=== tita_kitchen_evening ===
# PHONE: TITA MERLY
# UI: home_screen_light_mode, font_size_max, viber_badge_23
# TIMESTAMP: Tuesday, 8:02 PM
# SOUND: TV_news_distant, low

The phone chimes — not the message sound, the voice-note sound. The one that's a little longer, a little rounder. Your hands are still damp from the dishrag.

# NOTIF: Viber — Kuya Renz: sent a voice message (0:34)

Renz.

You dry your hands on your apron and pick up the phone. Renz doesn't send voice notes often — he's the type who texts in full sentences, who uses periods. When he sends voice, it means he's in the car, or walking, or something he needs to say fast.

You open Viber.

# SENDER: Kuya Renz   [8:02 PM]
# TYPE: voice_message
# LENGTH: 0:34 seconds
# DISPLAY: blue waveform, play button, timestamp

You tap play before you even think about it. You hold the phone close.

# SOUND: voice_note_plays

"Tita, hi — naku, sorry ha, I know this is out of nowhere. I'm — okay, so, I got into a fender-bender kanina, like, nothing serious, I'm fine, pero the other driver is making it a whole thing. Sabi niya he's gonna press charges kung hindi kami mag-settle ngayon, tonight pa daw, kasi raw if it goes on record bukas his insurance goes up or something — I don't even know, he's — anyway. I need to settle with him, ₱18,500, I know, ang laki, pero if I don't pay tonight he said he's taking it to the barangay and then it's gonna be a whole — listen, I'll pay you back agad, I promise, I just — my phone is dying, I'm at like 3%, and I can't get to a charger right now, and I just need to close this tonight. Can you GCash me? I'll send you the number in a sec. Wag muna sabihin kay Mama, please, ayoko silang mag-alala. I'll explain everything bukas, I promise, I just — thank you, Tita, thank you, I'm sorry, I'll fix this —"

# SOUND: voice_note_ends

You play it again.

His voice. The way he says *naku* at the start — that's Renz, that's the little laugh-sigh he does when something goes wrong. The breathing. The talking-fast thing he does when he's stressed. You've known this boy since he was ten. You've heard him explain himself at the dinner table a hundred times.

It's him.

Your chest goes tight. Fender-bender. The other driver pressing charges. ₱18,500. Tonight.

You think: where is he? Is he okay? Why didn't he call Mama?

Then you remember: *wag muna sabihin kay Mama.* He doesn't want to worry her. He called you because you're the one who doesn't panic. You're the one who helps quietly.

# SENDER: Kuya Renz   [8:03 PM]
# TYPE: typing_indicator
# DISPLAY: "Kuya Renz is typing..."

# SENDER: Kuya Renz   [8:03 PM]
Tita sorry, here's the number. GCash lang po. 0915-•••-••••. Yung ₱18,500. I'll send it back this week, swear.

# SENDER: Kuya Renz   [8:04 PM]
Please po. I'm really sorry. Nag-aalala na ako dito.

You read the messages twice. You play the voice note a third time, just to hear his voice again. To make sure.

It's him.

# CHOICE_HUB: tita_renz_voicenote

+ [Call Mama — she should know about this]
    → tita_tries_to_call_mama
    You press the phone icon next to Mama's name. It rings twice. Then:

    # SOUND: incoming_call_interrupt
    # DISPLAY: incoming_call_screen — "Kuya Renz" calling

    He's calling. He's calling you.

    You answer.

    # SOUND: call_connects

    "Tita — thank God — did you get my message? I'm so sorry, I know this is—"

    It's his voice. Live. Talking to you.

    "Renz, anak, okay ka lang? Nasaan ka? What happened—"

    "I'm okay, I'm okay, I just — Tita, the guy is here, he's saying if I don't settle by 8:30 he's calling the barangay, and I can't — I don't have cash, my cards are maxed this month, I just need the GCash, please, I'll explain everything tomorrow, I swear, I just need to close this tonight—"

    "Renz, wait, let me talk to—"

    "Tita I have 1% battery, please, the number is 0915-•••-••••, ₱18,500, I'll send it back Friday, I promise, thank you, Tita, thank you—"

    # SOUND: call_drops

    The line goes dead.

    You stare at the phone. Your hands are shaking.

    He called you. You heard him. He's in trouble and he called you and now his phone is dead and you're the only one who can help.

    → tita_opens_gcash

+ [Type a reply — ask him where exactly he is]
    → tita_asks_location
    # COMPOSE: "Renz anak where are you? Sino kasama mo? Are you safe?"
    # SENT: 8:04 PM

    You send it. You watch the screen.

    # SENDER: Kuya Renz   [8:04 PM]
    # TYPE: typing_indicator

    # SENDER: Kuya Renz   [8:05 PM]
    I'm near — look, I can't explain right now, Tita, the guy is literally standing here, I just need the money, please, I'll tell you everything bukas, I promise, my phone is about to die, please lang po, I'm begging you

    # SOUND: incoming_call_interrupt
    # DISPLAY: incoming_call_screen — "Kuya Renz" calling

    He's calling. You answer before the second ring.

    # SOUND: call_connects

    "Tita, thank you for answering, I'm so sorry, I just — the guy is here, he's getting angry, I just need to send him the money now, please, 0915-•••-••••, GCash, ₱18,500, I swear I'll pay you back this week, I just need to close this tonight before it gets worse—"

    "Renz, anak, sino kasama mo, I need to know you're—"

    "Tita, please, I'm running out of battery, just trust me, please, I'll explain everything tomorrow, I have to go, thank you, Tita, thank you—"

    # SOUND: call_drops

    The line cuts.

    You are holding the phone and your hands are shaking and the last thing you heard was *please trust me.*

    → tita_opens_gcash

+ [Open GCash — send it now before his phone dies]
    → tita_opens_gcash
    # SET: tita_didnt_question = true

    You don't wait. His phone is dying. The other driver is pressing charges. ₱18,500 tonight or it goes on record.

    You open GCash. Your hands know the way.

=== tita_opens_gcash ===
# UI: gcash_app_open
# BALANCE: ₱24,180.50 (last week's remittance from your daughter in the US, meant for Papa's check-up and the quarterly bills)

You type the number: 0915-•••-••••.

The app asks you to confirm. You type ₱18,500.

The app asks you again: "Send ₱18,500.00 to 0915-•••-••••?"

You think about Renz's voice. The stress. The breathing. The way he said *please trust me.*

You think about the money — your daughter sent this for Papa's doctor, for the water bill, for the electric. But Renz said he'll pay you back this week. He's never lied to you. Not once.

You think about Mama. He said *wag muna sabihin kay Mama.* He doesn't want her to worry. You are protecting her by helping him quietly.

# CHOICE_HUB: tita_final_send

+ [Send the money — he needs you right now]
    → tita_sends_money
    # SET: tita_sent_money = true

    You press SEND.

    # SOUND: gcash_send_chime
    # DISPLAY: "Successfully sent ₱18,500.00 to 0915-•••-••••"
    # BALANCE: ₱5,680.50

    Your balance blinks down. ₱5,680.50.

    You stare at it. Then you go back to Viber.

    # COMPOSE: "Sent na po, anak. Ingat ka. Call me when your phone is charged."
    # SENT: 8:06 PM

    You put the phone down on the counter. Your hands are still shaking.

    Papa calls from the living room: "Merly, sino kausap mo?"

    "Walang sino," you call back. "Prayer group lang."

    You don't sit down. You stand there, holding the edge of the counter, waiting for Renz to message back and say thank you, say he's okay, say it's over.

    The phone doesn't chime.

    → tita_waiting

+ [Wait — call Renz one more time first]
    → tita_tries_renz_again

    You press the call button next to his name.

    It rings. Once. Twice. Three times.

    # SOUND: voicemail_beep

    "Hi, this is Renz, I can't pick up right now, leave a message—"

    You hang up. His phone is dead. Just like he said.

    You go back to GCash. You type the number. 0915-•••-••••. ₱18,500.

    You press SEND.

    # SOUND: gcash_send_chime
    # DISPLAY: "Successfully sent ₱18,500.00 to 0915-•••-••••"
    # BALANCE: ₱5,680.50

    It's done.

    You send him a message.

    # COMPOSE: "Sent na po, anak. Call me when you can. Nag-aalala ako."
    # SENT: 8:07 PM

    You wait.

    → tita_waiting

=== tita_waiting ===
# UI: viber_open, chat_with_renz
# TIMESTAMP: 8:08 PM

The message sits there. Sent. Two check marks. Read.

He read it.

You wait for him to type. The typing indicator doesn't come.

# TIMESTAMP: 8:10 PM

You play the voice note again. You listen to the part where he says *I'll send it back this week, swear.*

You put the phone down. You pick it up. You check if the GCash went through. It did. Successfully sent.

# TIMESTAMP: 8:14 PM

You open the Santos Family GC. Mama posted a photo of the sinigang two hours ago. Tita Peachy reacted with a heart. Kuya Jep hasn't been online since this morning.

You think about typing: "Has anyone heard from Renz tonight?"

You don't type it. He said *wag sabihin kay Mama.* You are keeping his secret because that's what he asked you to do. You are protecting him.

# NOTIF: Santos Family GC — Maya: "has anyone talked to kuya renz today? he's not answering my texts"

Your chest tightens.

# SENDER: Mama   [8:15 PM]
Bakit anak? May nangyari ba?

# SENDER: Maya   [8:16 PM]
probably nothing, i just wanted to ask him something and he's not replying

You stare at the screen. You think about the voice note. You think about the ₱18,500 you just sent.

You think: should I tell them?

# NOTIF: Santos Family GC — Kuya Renz: "?? naglalaro lang ako ng badminton, anong nangyayari"

The world stops.

You read it again.

*naglalaro lang ako ng badminton.*

# SENDER: Maya   [8:17 PM]
oh ok false alarm haha sorry

# SENDER: Mama   [8:17 PM]
Naku. Kala ko may emergency 😅

You stare at Renz's message.

He's. Playing badminton.

You scroll up. You play the voice note again.

"Tita, hi — naku, sorry ha, I know this is out of nowhere. I'm — okay, so, I got into a fender-bender kanina—"

That was his voice.

You go back to the family GC. Renz is typing.

# SENDER: Kuya Renz   [8:18 PM]
Wait bakit, sino nagtanong? I've been here since 7, phone was in my bag. May kailangan ba kayo?

You can't breathe.

You open the GCash app. You check the transaction.

Successfully sent ₱18,500.00 to 0915-•••-••••.

8:06 PM.

Your hands are shaking so hard you almost drop the phone.

# CHOICE_HUB: tita_realization

+ [Tell the family GC what happened]
+ [Call Renz directly — the real Renz — right now]
+ [Sit down]

// [SCENE ENDS — anchor epilogue takes over]
```

---

## B. MAYA — DECIDE

```
=== maya_lockscreen_evening ===
# UI: lockscreen, dark mode, wallpaper: Mt. Pulag fog and grass
# TIMESTAMP: 8:11 PM — Tuesday
# BRIGHTNESS: 15%
# SOUND: low_buzz_multiple, wood_surface

Your phone is face-down on the table. You left it there after work — a small quiet act of wanting to be done with screens for a few hours. It did not work. The table is making a sound like bees trapped in glass.

You flip it.

# NOTIF: Santos Family GC 🏠 — 18 new messages (time range: 8:02–8:11 PM)
# NOTIF: Kuya Renz — message sent (8:07 PM, undelivered) — "read" receipt missing
# NOTIF: Bea 💛 — 1 message (8:10 PM)

Eighteen messages in nine minutes is not normal. Eighteen messages in nine minutes is someone dying, or someone about to ask for money, or Tita Merly forwarding something she believes is both.

You open the GC.

=== family_gc_explosion ===
# UI: Messenger, Santos Family GC 🏠, scrolled to earliest unread

# SENDER: Tita Merly   [8:02 PM]
Ate Lydia. Ate Lydia tatawag ka
# TYPE: voice_note, 0:34, played once already (waveform cached)

# SENDER: Mama   [8:04 PM]
Ano yun Ate??? Anong nangyari

# SENDER: Tita Merly   [8:05 PM]
Si Renz daw. Aksidente. Kelangan daw niya ng pera ngayon ASAP

# SENDER: Tita Peachy   [8:06 PM]
ANONG AKSIDENTE??? Nasaan siya???

# SENDER: Mama   [8:06 PM]
Kakatext ko lang kanina wala naman syang sinabing pupunta sya kahit saan

# SENDER: Tita Merly   [8:07 PM]
Tumawag sya sakin. Yung boses niya. Iyak sya. Sabi niya may nabangga daw siya tapos yung tao gusto daw kasuhan kaya kailangan niya settlement ngayon bago dalhin sa presinto

# SENDER: Mama   [8:08 PM]
BAKIT HINDI KO ALAM TO

# SENDER: Tita Merly   [8:09 PM]
Sabi niya wag muna daw sabihin sayo kasi ayaw ka daw niya paalahanin. Pero Ate alam mo naman ako di ako pwedeng magtago sayo

# SENDER: Tita Peachy   [8:09 PM]
Ilang pera??? Nasaan ba sya talaga

# SENDER: Tita Merly   [8:10 PM]
18,500 daw. May number siya for Gcash. Ate mag-send na ba ako? Natatakot ako baka makulong sya

# SENDER: Mama   [8:11 PM]
MAYA GISING KA BA

You are reading this the way you read a deck when a client has already decided and the deck is pretending to ask. You already know what this is.

Kuya Renz does not get into accidents. Kuya Renz is the person who says "CHECK. THE. BALANCE." in all caps when Tita Merly forwards something. Kuya Renz is the last person who would call Tita first. Kuya Renz would call Mama. Or you. Not Tita.

And yet.

The voice note is there. 0:34. Tita has already played it. The waveform is cached in Messenger's memory like evidence. Tita Merly heard his voice. You know what Tita Merly's verification standard is: a voice she loves.

You thumb back to your DMs. You sent Renz a message at 8:07 — "kuya okay ka lang??? tita says may aksidente" — and the read receipt is missing. Sent, not delivered. His phone is off, or out of range, or face-down somewhere he can't hear it.

The gap between what you know and what you can prove is nine minutes wide and getting wider.

+ [Text Renz again — "KUYA PLEASE REPLY"]
    You send it. The message sits under the last one like a second witness to his silence. Sent. Not delivered. The phone offers no explanation. You refresh. Nothing changes.

    The GC is still climbing. Tita Peachy is asking where the hospital is. Mama is saying she'll send the money herself if no one else will. The clock is moving faster than verification can.

+ [Open Bea's message — "is this a voice clone?? it's renz's actual voice"]
    # SENDER: You → Bea 💛   [8:12 PM]
    is this a voice clone?? it's renz's actual voice
    [screenshot — Tita's messages, the voice note preview]

    # SENDER: You   [8:12 PM]
    like i KNOW what this sounds like but she played the voice note and said it's him. his voice. how would they clone his voice

    You are doing what you always do: asking someone else to tell you what you already know. You are doing this because being right alone is worse than being wrong together.

+ [Type in the GC: "WAIT. Everyone wait. This might not be real."]
    You type it. Your thumb hovers over send.

    What you are about to do is tell a panicking mother that her son might not be in danger. What she will hear is: you don't care enough to be sure. What you are offering is doubt. What she needs is certainty. You have none.

    The message sits in the compose field like a sentence you can't finish.

+ [Call the number Tita mentioned — just to check, just to hear]
    You are doing the thing everyone says to do. Call to verify. You are doing the responsible thing. The smart thing. The thing Kuya Renz himself would do.

    You don't have the number yet. Tita said "may number" but hasn't posted it. You scroll back up. She said she'd send it. You wait. The GC climbs.

=== bea_replies ===
# TIMESTAMP: 8:13 PM
# SENDER: Bea 💛   [8:13 PM]
ok i need you to listen. this is almost definitely a voice clone.

# SENDER: Bea 💛   [8:13 PM]
they've been doing this with uploaded videos. if renz has ANY video online where he talks — birthdays, zoom calls, whatever — they can clone it. i'm like 90% sure.

# SENDER: Bea 💛   [8:14 PM]
i'm screenshotting this for the council but real talk: do not send money. tell tita DO NOT SEND.

You read it twice.

Bea is right. You know Bea is right. Bea has given a webinar on this. Bea is the person you ask when you need to know if something is real.

And still.

What if the 10% is real. What if Kuya Renz is in a police station right now, or a hospital, or the side of the road with someone threatening him, and you told Tita Merly to stop, and she stopped, and they took him in because ₱18,500 was the difference between a settlement and a case, and you were the one who said wait.

Knowledge is not speed. You know it's fake and the knowing has bought you nothing. Mama is already saying she'll send the money. Tita Merly is already asking for the GCash number. The scam has already moved faster than your suspicion.

The responsible thing — wait for Renz to reply, verify, don't act under pressure — takes time the scam stole in advance.

+ [Tell the GC what Bea said: "Guys this is a voice cloning scam"]
    # SENDER: You → Santos Family GC 🏠   [8:15 PM]
    Guys this is a voice cloning scam. They clone voices from videos. Kuya Renz has videos online. This is not him.

    # SENDER: Mama   [8:15 PM]
    Maya how do you KNOW

    # SENDER: Tita Merly   [8:15 PM]
    Anak I heard his voice. Yung boses niya. I know my nephew's voice.

    # SENDER: You   [8:16 PM]
    Tita that's the point. They CLONED it. Please don't send anything until Kuya replies.

    # SENDER: Mama   [8:16 PM]
    And if he can't reply??? If his phone is really dying???

    You are right and it is not enough. You are right and they are not stopping.

+ [Send a holding message: "Give me 10 minutes to verify"]
    # SENDER: You → Santos Family GC 🏠   [8:15 PM]
    Give me 10 minutes to verify. Please don't send anything yet.

    # SENDER: Tita Merly   [8:15 PM]
    Anak what if we don't have 10 minutes

    Ten minutes is forever when someone you love is in danger. Ten minutes is nothing when you're trying to prove a negative. You are asking them to wait in a burning room because you think the fire might be fake.

+ [Say nothing — let them decide, you can't prove it either way]
    You lock the phone. You put it face-down. You are not going to be the one who stopped them and you are not going to be the one who helped. You are going to be the one who wasn't sure.

    The table starts buzzing again immediately.

=== renz_surfaces ===
# TIMESTAMP: 8:24 PM
# SENDER: Kuya Renz   [8:24 PM]
?? naglalaro lang ako ng badminton anong nangyayari

# SENDER: Kuya Renz   [8:24 PM]
14 MISSED CALLS??? MAYA??? MA???

The relief is physical. Then the dread.

You scroll the GC. Tita Merly sent ₱18,500 to 0915-•••-•••• at 8:21 PM. Three minutes ago. She wrote "Renz anak here na, please confirm okay ka na."

Mama thanked her. Tita Peachy asked if Renz confirmed receipt. No one answered.

Kuya Renz is reading the thread in real time now. You watch the "seen by" list update.

# SENDER: Kuya Renz   [8:25 PM]
Tita.

# SENDER: Kuya Renz   [8:25 PM]
Tita anong number yan.

# SENDER: Tita Merly   [8:25 PM]
Yung binigay mo sakin. Sa phone.

# SENDER: Kuya Renz   [8:25 PM]
I DIDN'T CALL YOU. I'VE BEEN AT BADMINTON SINCE 7.

The GC goes quiet.

Then Mama starts typing. Then stops. Then Tita Peachy starts. Then stops. No one wants to be the first person to say it.

You were right. You were right the whole time. You are still the person who watched someone you love send ₱18,500 to a number that will never reply.

=== maya_reflection ===

You lock your phone. You don't put it down. You just sit there holding it, the screen dark, the glass warm from your hand.

Bea messages you: "did they send it."

You don't reply. You don't know what the reply is. "Yes but I told them not to" sounds like I tried. "Yes and I didn't stop them" sounds like I didn't care. Both are true. Neither is the whole sentence.

Kuya Renz is texting in all caps now. Tita Merly is apologizing in broken sentences. Mama is silent. You know that silence. That's the silence of someone trying not to cry in a way that makes sound.

You knew it was fake. You knew it immediately. You are media-aware, you have read the news, you have seen the warnings, and your knowledge was permission to watch in real time as the knowing failed to matter.

Awareness is not speed. Suspicion is not proof. And being right about what happened does not mean you stopped it from happening.

The scam was not built to fool you. It was built to move faster than you could verify. And it did.
```

---

## C. BEA — CONSULT

```
=== bea_couch ===
# UI: phone_home_screen, light_mode
# TIMESTAMP: 8:16 PM — Tuesday
# SOUND: distant_traffic, low; laptop_fan_hum

You're on the couch. Laptop open, three tabs, a Spotify playlist you're not
really hearing. The council GC is mid-thread — Janine just dropped a link,
you've screenshotted it, you're waiting for someone to confirm what you already
suspect. This is the texture of Tuesday evening: low-urgency everything,
pleasant and a little numb.

# NOTIF: maya 4ever 💛 — voice note (0:34) + text

The banner drops at the top of the screen. You tap it before you've finished
reading.

# SENDER: Maya 💛   [8:16 PM]
[voice note: 0:34]
is this a voice clone?? it's renz's actual voice

You sit up.

Not because you don't know the answer — you do, you know it in under five
seconds — but because Maya doesn't ask you things like this unless it's
already moving. Maya doesn't panic. If she's asking, the family is already
in it.

You press play on the voice note.

# AUDIO: voice_note_renz_clone
# LENGTH: 0:34
# TRANSCRIPT (as Bea hears it):
"Tita, it's me — Renz — naku, I'm so sorry to bother you like this but —
there was an accident, a fender-bender, the other guy is saying he'll press
charges if I don't settle right now, his bumper is — look I don't have time,
my phone is dying, I just need you to send money to this number, I'll explain
everything later, please lang, wag muna sabihin kay Mama, I don't want her
to worry, I'll call you back I promise —"

[SOUND: voice cuts mid-word, abrupt]

You replay it.

The second time through, you're not listening to what he's saying. You're
listening to *how* he's saying it. The cadence. The breathing. The "naku."
The micro-pause before "Tita." The way the panic sits in his voice — high
but controlled, the way Renz actually sounds when he's stressed.

It's him.

It's not him.

It's both.

You know this. You have a *slide* about this. Slide 7: "Why your brain will
believe it — voice triggers trust faster than text. Cloning tech has gotten
so good that even people who know the person will hesitate. Do not trust
voice alone."

You open your Messages and start typing to Maya.

# SENDER: You   [8:17 PM]
ok first: yes almost certainly a clone
second: do NOT send money do NOT call that number
third: is your tita about to send money right now?? where is the real renz

# SENDER: Maya 💛   [8:17 PM]
we texted him no reply
tita merly got a CALL from "him" like two minutes ago with a gcash number
she's shaking maya i don't know if we can stop her

Your chest does the thing it does when the case study becomes a person you know.

You open a new note. You start typing — not to Maya, to yourself, the same
way you always process:

- Voice: 0:34, panic register, authentic cadence
- Renz doesn't reply (classic — real person is unreachable, window of
  confusion is the attack vector)
- Follow-up CALL escalates urgency (cloner is adapting, this is
  SOPHISTICATED)
- Tita Merly is the target (softest, most likely to act without verification,
  they PROFILED the family)

You're doing the thing you do. The thing you're good at. Narrating the
mechanism. Labeling the parts. The satisfaction is clean and small and you
don't notice it.

You screenshot the voice note waveform. You open the council GC.

# SENDER: You   [council]   [8:18 PM]
[screenshot: voice note waveform + maya's text]
live one. voice clone targeting a family i know. 34-second sample, follow-up
live call, gcash scam. WATCH THIS SPACE might need this for the next webinar

# SENDER: Janine   [council]   [8:18 PM]
oh FUCK that's clean. you recording the call if she picks up?

# SENDER: You   [council]   [8:18 PM]
not my call to record but i'm documenting. this is the evolution — they're
not doing one-and-done voice notes anymore, they're doing MULTI-CONTACT. the
call is the closer.

You feel it — the small warm weight of being useful. Of being the person who
can name the thing while it's happening.

You go back to Maya.

# SENDER: You   [8:18 PM]
ok here's what's happening: the clone was made from renz's videos. they
scraped his voice — probably his insta or tiktok, he posts a lot right? —
and fed it into a voice cloning tool. there are free ones now. you can make
a convincing clone from like 10 seconds of clean audio.

# SENDER: You   [8:18 PM]
the CALL is the evolution. they know people are getting wise to voice notes
so now they're doing live calls. the voice on the line is still the clone but
it FEELS more real because it's synchronous. it's so fucking smart and evil.

# SENDER: You   [8:19 PM]
tell your tita: if it's really him he will be able to answer a question only
the real renz knows. ask her something specific. where did the family eat
last christmas. what's mama's middle name. the clone can't improvise.

You send it and then you open your Canva tab.

Slide 12 — the one you haven't finished — is titled "What to do if you
receive a cloned call." You've had the bullet points for weeks:
- Do not send money
- Verify through a separate channel
- Ask a question only the real person would know

You add a new bullet: *"Remember: urgency is the weapon. Real emergencies
survive a 60-second verification call."*

You look at it. It's good. It's correct. You are thinking about whether to
move it higher in the deck when your phone buzzes.

# SENDER: Maya 💛   [8:20 PM]
she's sending it
i don't think we can stop her
she's crying maya i don't know what to do

You stare at the message.

You stare at your slide deck. The slide that is correct. The bullet point
that is true. The webinar you gave four months ago to seventy people who
nodded and took notes and said *thank you, this was so informative.*

You don't know what to do either.

You type:

# SENDER: You   [8:20 PM]
fuck
ok
call her RIGHT NOW. you call her. use a different device if you have to.
tell her the real renz is at badminton. tell her you KNOW it's a clone.
tell her i said so and i literally do this for a living.

# SENDER: You   [8:20 PM]
and maya i'm so sorry. i should have said that first. is she ok. are YOU ok.

You send it.

You sit on your couch. The council GC is lighting up — Janine has shared the
screenshot with commentary, two other people are chiming in with their own
clone stories, someone is asking if you have a link to the webinar recording.

Your laptop is still open. Slide 12 is still unfinished. The Canva tab is
still there, sitting next to the council GC tab, sitting next to the research
doc you were reading about voice-cloning detection tools.

You were in the right place. You said the right things. You explained the
mechanism perfectly.

And you don't know if it helped.

You don't know if it mattered.

You don't know if being right is the same as being there.

# CHOICE: what do you do now?

+ [Stay on the couch and wait for Maya to update you]
   → You tell yourself you've done what you can. You've given her the tools.
      You've explained the mechanism. The rest is up to them. You refresh the
      council GC. Someone has already made a threaded breakdown of voice-
      cloning vectors. You read it.
   → set: {stayed_in_expert_mode}
   → say: narr "You are still on the couch. You are still correct. The
            distance between here and two suburbs over is the same distance
            it always was."

+ [Open your Canva deck and finish Slide 12 while you wait]
   → This is what you do. This is what you're good at. You take the thing
      that's happening and you turn it into a resource. You will make this
      useful. You will make sure the next person has the slide you wish you'd
      had tonight. You add a new case study section: "Real-world example:
      voice clone targeting a family member, multi-contact escalation."
   → set: {converted_to_content}
   → say: narr "The deck is better now. It's clearer. It's more specific.
            You have turned the night into a teaching moment. You do not
            notice that you have also turned a family's terror into a bullet
            point."

+ [Call Maya yourself — not to explain, just to be there]
   → You don't have anything new to say. You don't have a better slide. You
      don't have a forensic insight that will change the outcome. You just
      call her. You say: *"I'm here. What do you need."* You stop narrating
      the mechanism. You stop screenshotting for the council. You stop being
      the person who explains and you start being the person who sits in it
      with her.
   → set: {called_to_be_present}
   → say: narr "You are not an expert right now. You are not producing
            anything. You are just a voice on the line, breathing with your
            best friend while her family falls apart two suburbs over. It is
            the first thing you have done tonight that feels like enough."
```
