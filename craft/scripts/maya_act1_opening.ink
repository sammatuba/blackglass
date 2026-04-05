// ============================================================
// DISINFO: The Game — Act 1, Scene 1: "Normal Day"
// Persona: Maya Santos, 24, Freelance Graphic Designer, QC
// Composite Draft (Backbone: Empathist / Family GC: Storyteller / Feed: Satirist)
// ============================================================

// --- VARIABLE DECLARATIONS ---
VAR trust_score = 50
VAR links_clicked = 0
VAR messages_forwarded = 0
VAR scam_exposure = 0
VAR tita_merly_link = false
VAR reward_sms_opened = false
VAR deepfake_watched = false
VAR automation_bias_seeds = 0
VAR contextual_blindness_seeds = 0

// --- ACT 1: NORMAL DAY ---

=== lockscreen ===
# UI: lockscreen
# TIMESTAMP: 6:47 AM — Saturday

The screen glows before your eyes are fully open.

You reach for it the way you always do — wrist first, fingers dragging across the sheet, thumb already knowing where the glass is. The muscle memory of every morning since you were fifteen.

12 notifications. The number sits in your chest like a small obligation.

# UI: notification_stack
# NOTIF: Santos Family GC — Tita Merly sent a photo (6:02 AM)
# NOTIF: Santos Family GC — 4 more messages
# NOTIF: PixelPush Projects — Jigs: "sis check mo brief" (6:31 AM)
# NOTIF: Bea 💛 — sent a video (6:40 AM)
# NOTIF: SMS — 09XX: "Congratulations! You have an unclaimed reward..." (5:58 AM)
# NOTIF: SocMed — 3 new posts in your feed

Your thumb hovers. Saturday morning. Nowhere to be yet.

+ [Open Santos Family GC first]
    ~ contextual_blindness_seeds++
    The family comes first. It always does.
    -> family_gc
+ [Clear the work message — get it over with]
    ~ automation_bias_seeds++
    Better to know now than worry about it later.
    -> work_gc
+ [Check Bea's video — you need to smile first]
    Start soft. The rest can wait.
    -> bea_dm

=== family_gc ===
# UI: groupchat
# CHAT: Santos Family GC 🏠
# MEMBERS: Mama, Papa, Kuya Renz, Tita Merly, Tita Peachy, You

# SENDER: Tita Merly
# TIMESTAMP: 6:02 AM
# TYPE: image
Blessed Saturday po sa lahat!! 🌅🙏 Claim this blessing — type AMEN!

# SENDER: Tita Merly
# TIMESTAMP: 6:03 AM
Mga pamangkin, look at this ha. Very important for your health. My officemate sent this, doctor daw ang source.
# TYPE: link_preview
# LINK_TITLE: "EXPOSED: The Vegetable They Don't Want You to Eat — Filipino Doctors Are Staying Silent"
# LINK_URL: healthtruthph.click/silent-doctors
# LINK_IMAGE: thumbnail_clickbait_vegetables.jpg

# SENDER: Mama
# TIMESTAMP: 6:08 AM
Amen 🙏 Good morning po Ate Merly

# SENDER: Tita Peachy
# TIMESTAMP: 6:09 AM
Naku Merly ano na naman yan 😂 Pasabuy nga pala sa SM — yung Tide liquid na malaki, sale daw today

# SENDER: Kuya Renz
# TIMESTAMP: 6:14 AM
Ma need ko po yung lumpia recipe ni Lola later ha. For potluck sa work

# SENDER: Mama
# TIMESTAMP: 6:15 AM
Sige anak. Maya ikaw ba, gising ka na?

The chat is warm and ordinary. Tita Merly's link sits there between the blessed-morning image and the pasabuy request, looking like everything else — just another thing someone shared because they cared.

+ [Tap Tita Merly's health link]
    ~ tita_merly_link = true
    ~ links_clicked++
    ~ contextual_blindness_seeds++
    It loads slowly. The site has a medical-looking header, stock photos of worried doctors, and a headline in bold red. The article says kangkong causes kidney failure. It cites no actual study. At the bottom: a "natural supplement" for ₱1,299.
    You've already read half of it.
    # FLAG: tita_link_clicked
    -> family_gc_reply
+ [Reply to Mama — ignore the link]
    -> family_gc_reply
+ [Send a reaction to Tita Peachy's pasabuy and move on]
    You heart-react the Tide message. Normal. Easy.
    -> notification_hub

=== family_gc_reply ===
# UI: groupchat_compose

+ [Type: "Good morning po! 😊 Gising na"]
    # SENDER: You
    Good morning po! 😊 Gising na
    # SENDER: Mama
    Kumain ka na anak
    -> notification_hub
+ [Type: "Morning po! Tita Merly, san mo nakuha yung link?"]
    # SENDER: You
    Morning po! Tita Merly, san mo nakuha yung link?
    # SENDER: Tita Merly
    Ay anak, yung officemate ko, reliable naman yun. Nurse sya before. Share mo na rin sa friends mo ha, para aware lahat 💕
    ~ contextual_blindness_seeds++
    The vouching is instant. Sincere. That's what makes it stick.
    -> notification_hub

=== work_gc ===
# UI: groupchat
# CHAT: PixelPush Projects 💻
# MEMBERS: Jigs, Anya, Mikko, You

# SENDER: Jigs
# TIMESTAMP: 6:31 AM
sis check mo brief. client wants revisions by monday. sorry sa saturday ha 😭

# SENDER: Anya
# TIMESTAMP: 6:33 AM
F

# SENDER: Mikko
# TIMESTAMP: 6:34 AM
sending coffee emoji as emotional support ☕☕☕

# SENDER: Jigs
# TIMESTAMP: 6:35 AM
# TYPE: file
RevBrief_CaféMilano_v3.pdf

+ [Download and scan the brief now]
    ~ automation_bias_seeds++
    You open the PDF. Three pages of vague client feedback that boils down to "make it pop more." Monday suddenly feels close.
    -> notification_hub
+ [React with 👍 and deal with it after coffee]
    # SENDER: You
    👍
    The brief can wait. Your brain can't do "make it pop" at 6 AM.
    -> notification_hub

=== bea_dm ===
# UI: dm
# CHAT: Bea 💛
# TIMESTAMP: 6:40 AM

# SENDER: Bea
MAYA. MAYA. Watch this before it gets taken down I'm CRYING 😂😂😂
# TYPE: video_link
# VIDEO_TITLE: "POV: explaining freelancing to your tito at Noche Buena"
# VIDEO_SOURCE: TokTok

# SENDER: Bea
also r u free later? Need advice about something

+ [Watch the video, reply with laughing emojis]
    It's a guy in a barong doing an impression of every tito who asks "so ano ba talaga trabaho mo." You've lived this. You send 😂😂😂 and "LITERALLY ME."
    -> notification_hub
+ [Skip the video, ask what she needs advice about]
    # SENDER: You
    Haha later ko na papanoorin! What's up?
    # SENDER: Bea
    Later na lang, chill lang naman. Watch mo muna promise worth it 😂
    -> notification_hub

=== notification_hub ===
# UI: lockscreen_return

Your thumb scrolls back to the remaining notifications. Two left: the SMS from the unknown number, and the social media feed.

+ [Check the SMS]
    -> unknown_sms
+ [Open Social Media feed]
    -> social_feed
+ [Put the phone down. Make coffee first.]
    You set the phone on the counter, screen down. The kettle clicks on. For ninety seconds, you're just a person in a kitchen.
    Then you pick it up again.
    -> unknown_sms

=== unknown_sms ===
# UI: sms
# SENDER: 09171234567
# TIMESTAMP: 5:58 AM

Congratulations Ma'am/Sir! You have (1) unclaimed reward from GLife. To claim, visit: glife-rewards.ph.claim-now.click. Valid until today only po. Thank you and God bless!

That "God bless" at the end — somehow it makes the whole thing feel more human. Like someone actually typed it. Maybe someone did.

~ scam_exposure++
~ reward_sms_opened = true

+ [Tap the link — you'll figure out if it's legit once you see the site]
    ~ links_clicked++
    ~ automation_bias_seeds++
    # FLAG: sms_link_clicked
    The page loads. It looks almost right — the GLife logo, the green, the layout. A form asks for your name, phone number, and GCash PIN "for verification."
    Almost right. Almost.
    -> social_feed
+ [Delete the message]
    Your thumb presses delete. Gone. You don't think about it again.
    Well — you think about it a little.
    -> social_feed
+ [Screenshot and send to Kuya Renz: "legit ba to?"]
    ~ messages_forwarded++
    # FLAG: sms_forwarded
    You screenshot it and fire it to Kuya Renz. He'll know. He always knows about these things.
    He hasn't replied yet. He's probably still asleep.
    -> social_feed

=== social_feed ===
# UI: socialmedia
# APP: FeedLife

# POST: 1
# POSTER: Philippine Daily Mirror ☑️
# TYPE: news_article
# TIMESTAMP: 2h ago
BREAKING: New satisfactory ratings for administration reach historic highs, according to latest survey
# ENGAGEMENT: 12.4K reacts · 3.1K comments · 892 shares
The comments are a warzone. You can feel the heat without scrolling down.

# POST: 2
# POSTER: @ChelsVibes_
# TYPE: lifestyle_post
# TIMESTAMP: 4h ago
6 months ago I was BROKE broke. Now I make 6 figures from my phone 📱✨ DM me "GROW" and I'll show you how. Not a scam, just a system. God is good!! 🙏💸
# ENGAGEMENT: 8.7K reacts · 1.2K comments

# POST: 3
# POSTER: Entertainment Hub PH
# TYPE: video
# TIMESTAMP: 1h ago
# VIDEO_LABEL: [VIRAL] Famous actor endorses new crypto investment — "Pinoy pride!" Watch full video ➡️
# ENGAGEMENT: 45K views · 6.2K shares
The actor's mouth moves. The voice sounds right. The lighting looks like a press conference. Something about the jaw is wrong — but only if you're looking for it. You're not looking for it.

+ [Scroll past everything — it's too early for this]
    You keep scrolling until the posts blur together. Nothing sticks. Everything sticks.
    ~ contextual_blindness_seeds++
    -> morning_end
+ [Watch the actor's crypto video]
    ~ deepfake_watched = true
    ~ links_clicked++
    ~ automation_bias_seeds++
    # FLAG: deepfake_engaged
    The video is two minutes long. It's convincing. The comments are full of people tagging friends and saying "told you so." A pinned comment has a sign-up link.
    -> morning_end
+ [Tap on @ChelsVibes_ profile]
    ~ scam_exposure++
    Her grid is all beach photos and motivational quotes overlaid on sunsets. Her bio says "CEO | Mompreneur | DM for collabs." There is no indication of what she actually sells.
    You close the app.
    -> morning_end

=== morning_end ===
# UI: lockscreen
# TIMESTAMP: 7:23 AM

{links_clicked > 1:You've been on your phone for thirty-six minutes. You've clicked {links_clicked} links without thinking about any of them too hard.}
{links_clicked <= 1:Thirty-six minutes. Not bad. The coffee's ready.}

The morning feels ordinary. That's the thing about mornings — they always do.

You lock the phone. You pour your coffee. You open your laptop because Monday's deadline doesn't care about Saturday.

// --- SCENE 2 TEASER ---

-> scene2_hook

=== scene2_hook ===
# UI: notification_popup
# TIMESTAMP: 9:14 AM
# APP: GCash
# TYPE: push_notification

Your phone buzzes on the desk, one sharp vibration against wood.

# NOTIF: "You received ₱2,500.00 from MERLY SANTOS. Message: 'Pang-grocery mo anak, wag ka mag-skip ng meals ha 🙏'"

You didn't ask for this. It's just love, arriving the way it always does — in transfers and reminders to eat. Your thumb moves toward the notification.

What you don't know yet: the link Tita Merly shared this morning came from somewhere. And that somewhere knows her GCash sends money to you.

-> END
