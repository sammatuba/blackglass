// ============================================================
// Act 1, Scene 1: "Normal Day" — REVISED OPENING
// Implements: 4-beat compressed structure, automatic interiority, awareness-gated consequences
// ============================================================

// --- VARIABLE DECLARATIONS ---
VAR trust_score = 50
VAR links_clicked = 0
VAR messages_forwarded = 0
VAR scam_exposure = 0

// Awareness tracking
VAR noticed_sms_pattern = false
VAR noticed_headline_pattern = false
VAR noticed_url_suspicious = false
VAR family_obligation_weight = 0
VAR critical_thinking_penalized = false

// Bias seeds (for Act 3 reflection)
VAR automation_bias_seeds = 0
VAR contextual_blindness_seeds = 0
VAR social_proof_reliance = 0

// --- ACT 1: NORMAL DAY ---

// ============================================================
// BEAT 1: Phone Reach (establishes muscle-memory dependence)
// ============================================================

=== lockscreen ===
# UI: lockscreen
# TIMESTAMP: 6:47 AM — Saturday

Your hand finds the phone before your eyes are fully open.

Wrist first, fingers across the sheet, thumb already knowing where the glass is. The muscle memory of every morning since you were fifteen.

The screen glows. 12 notifications. The number sits in your chest like a small obligation.

-> notification_scan

// ============================================================
// BEAT 2: Notification Scan (establishes the "small obligation" feeling)
// ============================================================

=== notification_scan ===
# UI: notification_stack

Saturday morning. Nowhere to be yet. But the phone has opinions about the morning before you do.

# NOTIF: Santos Family GC 🏠 — Tita Merly sent a photo (6:02 AM)
# NOTIF: Santos Family GC 🏠 — 4 more messages
# NOTIF: PixelPush Projects — Jigs: "sis check mo brief" (6:31 AM)
# NOTIF: Bea 💛 — sent a video (6:40 AM)
# NOTIF: SMS — 09XX: "Congratulations! You have an unclaimed reward..." (5:58 AM)
# NOTIF: SocMed — 3 new posts in your feed

Family. Work. Friends. Strangers offering gifts. The usual mix.

You know you should check the work message first — Monday deadline, client revisions, the weekend disappearing already. You know you should delete the SMS without reading it. You know Bea's video is probably a TikTok she watched at 2 AM.

Knowing doesn't change what you do.

+ [Open Santos Family GC]
    ~ family_obligation_weight++
    ~ contextual_blindness_seeds++
    The family comes first. It always does.
    -> family_gc_scroll
+ [Check the SMS — might be real]
    ~ scam_exposure++
    Probably spam. But "probably" isn't certainty, and what if it's not?
    -> sms_exposure
+ [Bea's video — smile first, obligations later]
    Friends before duty. That's the kind of Saturday you're trying to have.
    -> bea_video

// ============================================================
// BEAT 3: Family GC Scroll (shows context-mixing, blessed GIF → pasabuy → health link)
// ============================================================

=== family_gc_scroll ===
# UI: groupchat
# CHAT: Santos Family GC 🏠
# MEMBERS: Mama, Papa, Kuya Renz, Tita Merly, Tita Peachy, You

The group chat loads. Warmth and mundane requests, threaded together.

# SENDER: Tita Merly
# TIMESTAMP: 6:02 AM
# TYPE: image
Blessed Saturday po sa lahat!! 🌅🙏 Claim this blessing — type AMEN!

The GIF is a sunrise over a beach with sparkles. She's sent variations of this for 347 mornings in a row. Mama always responds. Papa never does. You're somewhere in between.

# SENDER: Mama
# TIMESTAMP: 6:08 AM
Amen 🙏 Good morning po Ate Merly

The ☺️ emoji would come next if this were a weekday. Saturday gets 🙏 instead. You know your mother's emoji grammar.

# SENDER: Tita Peachy
# TIMESTAMP: 6:09 AM
Naku Merly ano na naman yan 😂 Pasabuy nga pala sa SM — yung Tide liquid na malaki, sale daw today

# SENDER: Kuya Renz
# TIMESTAMP: 6:14 AM
Ma need ko po yung lumpia recipe ni Lola later ha. For potluck sa work

# SENDER: Tita Merly
# TIMESTAMP: 6:03 AM
Mga pamangkin, look at this ha. Very important for your health. My officemate sent this, doctor daw ang source.

# TYPE: link_preview
# LINK_TITLE: "EXPOSED: The Vegetable They Don't Want You to Eat — Filipino Doctors Are Staying Silent"
# LINK_URL: healthtruthph.click/silent-doctors
# LINK_IMAGE: thumbnail_clickbait_vegetables.jpg

There it is. Tucked between the blessed sunrise and the Tide detergent. The link sits in the thread looking like everything else — just another thing someone shared because they cared.

-> tita_link_notice

// ============================================================
// BEAT 4: Tita Link Appears (Maya notices Mama already thanked it)
// ============================================================

=== tita_link_notice ===

# SENDER: Mama
# TIMESTAMP: 6:15 AM
Salamat po Ate 🙏 Share ko rin sa bible study group. Sige anak Maya ikaw ba, gising ka na?

Your mother has already thanked Tita Merly. Already said she'll forward it. The link now has Mama's endorsement before you've even read the headline.

{noticed_sms_pattern: The headline structure feels familiar. "EXPOSED" + "They Don't Want You to Know" + urgency. You saw this pattern twenty minutes ago in a text message from a stranger. Now it's here, sent by family, vouched for by your mother.}

{not noticed_sms_pattern: "Filipino Doctors Are Staying Silent" — the headline is written to sound like a secret, like someone's breaking rank to warn you. Tita's officemate sent it. Doctor daw ang source. The vouching chain is already three people deep.}

-> tita_link_choice

// ============================================================
// BEAT 5: CHOICE (consequential, awareness-gated)
// ============================================================

=== tita_link_choice ===
# UI: groupchat_decision

{noticed_sms_pattern:
    You see the pattern. The question is what you do with it.

    + [Tap the link anyway — maybe you're wrong]
        ~ links_clicked++
        ~ automation_bias_seeds++
        ~ contextual_blindness_seeds++
        You saw it. You're tapping anyway. Maybe the SMS was a scam and this is real. Maybe coincidence isn't pattern. Feeling is faster than checking.
        -> link_opened_aware

    + [Type: "Tita, san niyo po nakuha yung link? 😊"]
        ~ critical_thinking_penalized = true
        The emoji is doing a lot of work. You're softening the question so it doesn't sound like doubt.
        -> question_link_source

    + [Heart-react and scroll past]
        ~ social_proof_reliance++
        You saw something off. You reacted with ❤️ anyway. The link now has your endorsement. Complicity feels like love.
        -> heart_react_aware

    + [Screenshot the link — ask Kuya Renz later]
        ~ messages_forwarded++
        You're not confronting it now, but you're not letting it go. Kuya will know. He always knows about these things.
        -> screenshot_for_later
}

{not noticed_sms_pattern:
    It's Tita Merly. It's Mama vouching. It's Saturday morning and you haven't had coffee yet.

    + [Tap the link — sounds important]
        ~ links_clicked++
        ~ automation_bias_seeds++
        ~ contextual_blindness_seeds++
        If doctors are staying silent about something, maybe people should know.
        -> link_opened_unaware

    + [Heart-react — Tita loves when you engage]
        ~ social_proof_reliance++
        The ❤️ is automatic. She sent it with care, you receive it with acknowledgment. That's how this works.
        -> heart_react_unaware
}

// ============================================================
// CONSEQUENCE BRANCHES — Awareness + Action = Emotional Truth
// ============================================================

=== link_opened_aware ===
# UI: browser
# URL: healthtruthph.click/silent-doctors

The page loads slowly. Stock photos of worried doctors in white coats. Red headline text. "Big Pharma Doesn't Want You to Know: KANGKONG Causes Silent Kidney Failure."

You're reading it even though you saw the pattern. Halfway down the page there's a testimonial from "Dr. Garcia" with no first name, no hospital. At the bottom: a "natural supplement" for ₱1,299 + "FREE SHIPPING TODAY ONLY."

You knew. You clicked anyway.

~ noticed_headline_pattern = true
~ noticed_url_suspicious = true

The knowing doesn't undo the clicking. But now you can't unsee what this is.

-> aftermath_link

=== link_opened_unaware ===
# UI: browser
# URL: healthtruthph.click/silent-doctors

The page loads. It looks almost legitimate — medical imagery, concerned tone, a few scattered statistics. The article says kangkong causes kidney failure. The evidence is vague. The citations are missing.

At the bottom: "PROTECT YOURSELF NOW" with a link to buy supplements for ₱1,299.

You've already read half the article before you notice the domain: healthtruthph.click. Not .com. Not .ph. Click.

~ noticed_url_suspicious = true

Almost right. Almost.

-> aftermath_link

=== question_link_source ===
# SENDER: You
# TIMESTAMP: 6:47 AM
Tita, san niyo po nakuha yung link? 😊

# SENDER: Tita Merly
# TIMESTAMP: 6:48 AM
Ay anak, yung officemate ko, reliable naman yun. Nurse sya before e. Concern lang sya kasi daw yung hospital nila may mga cases na. Share mo na rin sa friends mo ha, para aware lahat 💕

The vouching is instant. Sincere. Nurse siya before — that detail is supposed to transfer authority. The concern is real even if the link isn't.

# SENDER: Mama
# TIMESTAMP: 6:49 AM
Oo nga anak, salamat sa pag-check. Better safe talaga.

Your mother thinks you were confirming, not questioning.

~ family_obligation_weight++
~ contextual_blindness_seeds++

To question the link was to question the friend. To question the friend was to question the care. You asked gently and got a vouching chain in return.

-> aftermath_question

=== heart_react_aware ===
# SENDER: You (heart reaction)

The ❤️ appears under Tita Merly's message. You just endorsed the link you doubted.

Mama will see your heart. Tita Peachy will see it. The next person scrolling will see that Maya reacted, and that makes it more real.

You saw the pattern and you added your name to it anyway.

~ social_proof_reliance++

The link sits in the chat now, wrapped in blessings and detergent requests and your small red heart.

-> aftermath_silent

=== heart_react_unaware ===
# SENDER: You (heart reaction)

The ❤️ is automatic. Tita shares things like this every week — turmeric miracles, alkaline water, detox juice. Mama always thanks her. You usually heart-react and move on.

It's just how the family chat works. Someone shares, someone thanks, someone reacts. Love distributed in taps.

~ social_proof_reliance++

-> aftermath_silent

=== screenshot_for_later ===

You screenshot the link preview. The image saves: Tita Merly's name, the headline, the click-bait thumbnail.

You don't reply to the thread. You open your DM with Kuya Renz and paste the screenshot with a one-word message: "legit?"

# CHAT: Kuya Renz
# SENDER: You
# TYPE: image + text
legit?

He's probably still asleep. The message shows as delivered, not read.

You've passed the question to someone who knows more than you. That feels safer than answering it yourself.

~ messages_forwarded++

-> aftermath_deferred

// ============================================================
// AFTERMATH PASSAGES — Set up Scene 2
// ============================================================

=== aftermath_link ===
You close the browser. The GC is still open.

# SENDER: Mama
# TIMESTAMP: 6:50 AM
Maya anak kumain ka na

The blessed morning continues. Pasabuy requests and lumpia recipes. The link is already five messages up, fading into the scroll.

-> morning_continues

=== aftermath_question ===
You lock your phone. The coffee water is boiling.

You asked the question. You got an answer that wasn't an answer. "Nurse siya before" is a credential transferred across a friend-chain, not evidence. But the care in Tita's "💕" is real.

The link is still in the chat. Mama already said she'll share it with her bible study group.

-> morning_continues

=== aftermath_silent ===
You scroll past the link. Kuya Renz is asking about the lumpia recipe. Tita Peachy is negotiating the Tide pasabuy. The thread moves on.

Your heart-react stays there, a small piece of social proof in the stream.

-> morning_continues

=== aftermath_deferred ===
The screenshot is sent. The question is Kuya's problem now.

You swipe back to the notification screen. Ten more to go.

-> morning_continues

// ============================================================
// TRANSITION TO REMAINING NOTIFICATIONS
// ============================================================

=== morning_continues ===
# UI: lockscreen_return
# TIMESTAMP: 6:52 AM

{links_clicked > 0: You've been on your phone for five minutes. It feels like thirty seconds.}
{links_clicked == 0: Five minutes. The coffee's ready.}

The phone still has opinions about your morning. Work message from Jigs. Bea's video. The SMS about unclaimed rewards.

{noticed_headline_pattern: The SMS is still there: "Congratulations! You have an unclaimed reward..." Same structure as the health link. Same urgency. Different sender, same shape.}

Saturday morning. Ordinary. That's the thing about mornings — they always feel that way.

-> remaining_notifications

=== remaining_notifications ===
# UI: notification_hub

+ [Check work message — get it over with]
    -> work_message
+ [Watch Bea's video — you need to smile first]
    -> bea_video
+ [Open the SMS]
    -> sms_exposure
+ [Put the phone down — make coffee first]
    You set it face-down on the counter. The kettle clicks. For ninety seconds you're just a person in a kitchen, no notifications, no obligations.
    Then you pick it up again.
    -> work_message

// ============================================================
// [Remaining scenes continue from here...]
// ============================================================

=== work_message ===
// [Work GC with Jigs, brief download, "make it pop" client feedback]
-> END

=== bea_video ===
// [TikTok about explaining freelancing to your tito, relatable humor]
-> END

=== sms_exposure ===
// [GLife rewards scam, asks for GCash PIN, pattern recognition opportunity]
-> END
