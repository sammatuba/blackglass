/* =====================================================================
   BLACKGLASS — Maya's Story
   Reading source: craft/maya/arc.md (full prose, 12 scenes)
   Build sources:  craft/maya/scenes/<scene>/script.ink (canonical Ink)
                   craft/maya/scenes/<scene>/handoff.md  (build notes)
   Structure: 12 scenes across 3 acts. Branches converge on the four
   endings (Protector / Withdrawn / Wounded / Realist) via flags.
   ===================================================================== */

const SCENES = {
    s1: { act: 1, num: 1, title: 'Lockscreen Morning', time: 'Saturday · 6:47 AM · Quezon City' },
    s2: { act: 1, num: 2, title: 'The GCash Wrong-Send', time: 'Saturday · 11:47 PM · bedroom' },
    s3: { act: 2, num: 3, title: 'The Feed Knows You', time: 'Monday · 8:47 AM · jeepney to BGC' },
    s4: { act: 2, num: 4, title: 'Family GC Pressure Cooker', time: 'Monday · 7:22 PM · bedroom' },
    s5: { act: 2, num: 5, title: 'The Voice That Sounds Right', time: 'Tuesday · 2:17 PM · the desk' },
    s6: { act: 2, num: 6, title: 'The Viral Truth', time: 'Wednesday · 8:52 PM · bedroom' },
    s7: { act: 2, num: 7, title: 'The Algorithm Knows', time: 'Thursday · 6:23 AM · bedroom' },
    s8: { act: 2, num: 8, title: 'The Invoice That Isn’t', time: 'Thursday · 3:47 PM · the desk · midpoint crisis' },
    s9: { act: 3, num: 9, title: 'The Conversation', time: 'Friday · 7:43 PM · the family table' },
    s10: { act: 3, num: 10, title: 'The Reckoning', time: 'Saturday · 9:14 AM · alone in her room' },
    s11: { act: 3, num: 11, title: 'The Echo', time: 'Saturday · 7:02 AM · one week later' },
    s12: { act: 3, num: 12, title: 'What You Carry Forward', time: 'Two weeks after the crisis' },
};

/* ---- builders ---- */
const p = (html) => ({ k: 'p', html });
const em = (html) => ({ k: 'em', html });
const aside = (html) => ({ k: 'aside', html });
const div = () => ({ k: 'div' });
const notif = (app, html) => ({ k: 'notif', app, html });
const chat = (title, rows) => ({ k: 'chat', title, rows });
const r = (from, html, time) => ({ from, html, time });
const tp = (note) => ({ typing: note || '' });
const callout = (tag, html) => ({ k: 'callout', tag, html });
const endhead = (tag, title) => ({ k: 'endhead', tag, title });
const final = () => ({ k: 'final' });

const PASSAGES = {};
const P = (id, def) => { PASSAGES[id] = { id, ...def }; };

/* =====================================================================
   ACT 1 — THE NORMAL DAY
   ===================================================================== */

/* ---------------------------------------------------------------------
   Scene 1 — Lockscreen Morning
--------------------------------------------------------------------- */

/* BEAT 1 — Phone Reach */
P('s1_morning', {
    scene: 's1',
    body: [
        p('Your hand finds the phone before your eyes are fully open.'),
        p('Wrist first, fingers across the sheet, thumb already knowing where the glass is. The muscle memory of every morning since you were fifteen.'),
        p('The screen glows. <strong>12 notifications.</strong> The number sits in your chest like a small obligation.'),
    ],
    next: 's1_notification_scan',
});

/* BEAT 2 — Notification Scan (3-way fork) */
P('s1_notification_scan', {
    body: [
        p('Saturday morning. Nowhere to be yet. But the phone has opinions about the morning before you do.'),
        notif('Lockscreen', `
            <div><strong>Santos Family GC 🏠</strong> · Tita Merly sent a photo · 6:02 AM</div>
            <div><strong>Santos Family GC 🏠</strong> · 4 more messages</div>
            <div><strong>PixelPush Projects</strong> · Jigs: "sis check mo brief" · 6:31 AM</div>
            <div><strong>Bea 💛</strong> sent a video · 6:40 AM</div>
            <div><strong>SMS · 09XX</strong> · "Congratulations! You have an unclaimed reward..." · 5:58 AM</div>
            <div><strong>SocMed</strong> · 3 new posts in your feed</div>`),
        p('Family. Work. Friends. Strangers offering gifts. The usual mix.'),
        p('You know you should check the work message first — Monday deadline, client revisions, the weekend disappearing already. You know you should delete the SMS without reading it. You know Bea’s video is probably a TikTok she watched at 2 AM.'),
        em('Knowing doesn’t change what you do.'),
    ],
    choices: [
        {
            label: 'Open Santos Family GC',
            target: 's1_family_gc_scroll',
            set: { s1_family_obligation: true, s1_contextual_blindness: true },
        },
        {
            label: 'Check the SMS — might be real',
            target: 's1_sms_exposure',
            set: { s1_scam_exposure: true },
        },
        {
            label: 'Bea’s video — smile first, obligations later',
            target: 's1_bea_video',
        },
    ],
});

/* BEAT 3 — Family GC Scroll */
P('s1_family_gc_scroll', {
    body: [
        p('The group chat loads. Warmth and mundane requests, threaded together.'),
        chat('Santos Family GC 🏠', [
            r('Tita Merly', 'Blessed Saturday po sa lahat!! 🌅🙏 Claim this blessing — type AMEN!', '6:02'),
        ]),
        em('The GIF is a sunrise over a beach with sparkles. She’s sent variations of this for 347 mornings in a row. Mama always responds. Papa never does. You’re somewhere in between.'),
        chat(null, [
            r('Mama', 'Amen 🙏 Good morning po Ate Merly', '6:08'),
        ]),
        em('The ☺️ emoji would come next if this were a weekday. Saturday gets 🙏 instead. You know your mother’s emoji grammar.'),
        chat(null, [
            r('Tita Peachy', 'Naku Merly ano na naman yan 😂 Pasabuy nga pala sa SM — yung Tide liquid na malaki, sale daw today', '6:09'),
            r('Kuya Renz', 'Ma need ko po yung lumpia recipe ni Lola later ha. For potluck sa work', '6:14'),
            r('Tita Merly', 'Mga pamangkin, look at this ha. Very important for your health. My officemate sent this, doctor daw ang source.', '6:03'),
        ]),
        callout('Link preview · healthtruthph.click', `
            <strong>"EXPOSED: The Vegetable They Don’t Want You to Eat — Filipino Doctors Are Staying Silent"</strong>`),
        p('There it is. Tucked between the blessed sunrise and the Tide detergent. The link sits in the thread looking like everything else — just another thing someone shared because they cared.'),
    ],
    next: 's1_tita_link_branch',
});

/* BEAT 4 — Awareness branch on whether the player saw the SMS first */
P('s1_tita_link_branch', {
    branch: { flag: 's1_noticed_sms_pattern', ifTrue: 's1_tita_link_aware', ifFalse: 's1_tita_link_unaware' },
});

P('s1_tita_link_aware', {
    body: [
        chat(null, [
            r('Mama', 'Salamat po Ate 🙏 Share ko rin sa bible study group. Sige anak Maya ikaw ba, gising ka na?', '6:15'),
        ]),
        p('Your mother has already thanked Tita Merly. Already said she’ll forward it. The link now has Mama’s endorsement before you’ve even read the headline.'),
        p('The headline structure feels familiar. <em>"EXPOSED" + "They Don’t Want You to Know" + urgency.</em> You saw this pattern twenty minutes ago in a text message from a stranger. Now it’s here, sent by family, vouched for by your mother.'),
        em('You see the pattern. The question is what you do with it.'),
    ],
    choices: [
        {
            label: 'Tap the link anyway — maybe you’re wrong',
            target: 's1_link_opened_aware',
            set: { s1_links_clicked: true, s1_automation_bias: true, s1_contextual_blindness: true },
        },
        {
            label: 'Type: "Tita, san niyo po nakuha yung link? 😊"',
            target: 's1_question_link_source',
            set: { s1_critical_thinking_penalized: true },
        },
        {
            label: 'Heart-react and scroll past',
            target: 's1_heart_react_aware',
            set: { s1_social_proof_reliance: true },
        },
        {
            label: 'Screenshot the link — ask Kuya Renz later',
            target: 's1_screenshot_for_later',
            set: { s1_messages_forwarded: true },
        },
    ],
});

P('s1_tita_link_unaware', {
    body: [
        chat(null, [
            r('Mama', 'Salamat po Ate 🙏 Share ko rin sa bible study group. Sige anak Maya ikaw ba, gising ka na?', '6:15'),
        ]),
        p('Your mother has already thanked Tita Merly. Already said she’ll forward it. The link now has Mama’s endorsement before you’ve even read the headline.'),
        p('<em>"Filipino Doctors Are Staying Silent"</em> — the headline is written to sound like a secret, like someone’s breaking rank to warn you. Tita’s officemate sent it. Doctor daw ang source. The vouching chain is already three people deep.'),
        em('It’s Tita Merly. It’s Mama vouching. It’s Saturday morning and you haven’t had coffee yet.'),
    ],
    choices: [
        {
            label: 'Tap the link — sounds important',
            target: 's1_link_opened_unaware',
            set: { s1_links_clicked: true, s1_automation_bias: true, s1_contextual_blindness: true },
        },
        {
            label: 'Heart-react — Tita loves when you engage',
            target: 's1_heart_react_unaware',
            set: { s1_social_proof_reliance: true },
        },
    ],
});

/* CONSEQUENCE — awareness + action = emotional truth */
P('s1_link_opened_aware', {
    body: [
        callout('Browser · healthtruthph.click', '<em>silent-doctors</em>'),
        p('The page loads slowly. Stock photos of worried doctors in white coats. Red headline text. <strong>"Big Pharma Doesn’t Want You to Know: KANGKONG Causes Silent Kidney Failure."</strong>'),
        p('You’re reading it even though you saw the pattern. Halfway down the page there’s a testimonial from "Dr. Garcia" — no first name, no hospital. At the bottom: a "natural supplement" for ₱1,299 + "FREE SHIPPING TODAY ONLY."'),
        em('You knew. You clicked anyway.'),
        p('The knowing doesn’t undo the clicking. But now you can’t unsee what this is.'),
    ],
    set: { s1_noticed_headline_pattern: true, s1_noticed_url_suspicious: true },
    next: 's1_aftermath_link',
});

P('s1_link_opened_unaware', {
    body: [
        callout('Browser · healthtruthph.click', '<em>silent-doctors</em>'),
        p('The page loads. It looks almost legitimate — medical imagery, concerned tone, a few scattered statistics. The article says kangkong causes kidney failure. The evidence is vague. The citations are missing.'),
        p('At the bottom: <strong>"PROTECT YOURSELF NOW"</strong> with a link to buy supplements for ₱1,299.'),
        p('You’ve already read half the article before you notice the domain: <em>healthtruthph.click.</em> Not .com. Not .ph. Click.'),
        em('Almost right. Almost.'),
    ],
    set: { s1_noticed_url_suspicious: true },
    next: 's1_aftermath_link',
});

P('s1_question_link_source', {
    body: [
        chat(null, [
            r('You', 'Tita, san niyo po nakuha yung link? 😊', '6:47'),
            r('Tita Merly', 'Ay anak, yung officemate ko, reliable naman yun. Nurse sya before e. Concern lang sya kasi daw yung hospital nila may mga cases na. Share mo na rin sa friends mo ha, para aware lahat 💕', '6:48'),
        ]),
        p('The vouching is instant. Sincere. <em>Nurse siya before</em> — that detail is supposed to transfer authority. The concern is real even if the link isn’t.'),
        chat(null, [
            r('Mama', 'Oo nga anak, salamat sa pag-check. Better safe talaga.', '6:49'),
        ]),
        p('Your mother thinks you were confirming, not questioning.'),
        em('To question the link was to question the friend. To question the friend was to question the care. You asked gently and got a vouching chain in return.'),
    ],
    set: { s1_family_obligation_weight: true, s1_contextual_blindness: true },
    next: 's1_aftermath_question',
});

P('s1_heart_react_aware', {
    body: [
        callout('Reaction', '❤️ added to Tita Merly’s message'),
        p('The ❤️ appears under Tita Merly’s message. <em>You just endorsed the link you doubted.</em>'),
        p('Mama will see your heart. Tita Peachy will see it. The next person scrolling will see that Maya reacted, and that makes it more real.'),
        em('You saw the pattern and you added your name to it anyway.'),
        p('The link sits in the chat now, wrapped in blessings and detergent requests and your small red heart.'),
    ],
    next: 's1_aftermath_silent',
});

P('s1_heart_react_unaware', {
    body: [
        callout('Reaction', '❤️ added to Tita Merly’s message'),
        p('The ❤️ is automatic. Tita shares things like this every week — turmeric miracles, alkaline water, detox juice. Mama always thanks her. You usually heart-react and move on.'),
        em('It’s just how the family chat works. Someone shares, someone thanks, someone reacts. Love distributed in taps.'),
    ],
    next: 's1_aftermath_silent',
});

P('s1_screenshot_for_later', {
    body: [
        p('You screenshot the link preview. The image saves: Tita Merly’s name, the headline, the click-bait thumbnail.'),
        p('You don’t reply to the thread. You open your DM with Kuya Renz and paste the screenshot with a one-word message.'),
        chat('Kuya Renz', [
            r('You', '<em>[screenshot]</em><br>legit?', '6:48'),
        ]),
        p('He’s probably still asleep. The message shows as delivered, not read.'),
        em('You’ve passed the question to someone who knows more than you. That feels safer than answering it yourself.'),
    ],
    next: 's1_aftermath_deferred',
});

/* AFTERMATH — converge on morning_continues */
P('s1_aftermath_link', {
    body: [
        p('You close the browser. The GC is still open.'),
        chat(null, [
            r('Mama', 'Maya anak kumain ka na', '6:50'),
        ]),
        em('The blessed morning continues. Pasabuy requests and lumpia recipes. The link is already five messages up, fading into the scroll.'),
    ],
    next: 's1_morning_continues',
});

P('s1_aftermath_question', {
    body: [
        p('You lock your phone. The coffee water is boiling.'),
        p('You asked the question. You got an answer that wasn’t an answer. <em>"Nurse siya before"</em> is a credential transferred across a friend-chain, not evidence. But the care in Tita’s "💕" is real.'),
        em('The link is still in the chat. Mama already said she’ll share it with her bible study group.'),
    ],
    next: 's1_morning_continues',
});

P('s1_aftermath_silent', {
    body: [
        p('You scroll past the link. Kuya Renz is asking about the lumpia recipe. Tita Peachy is negotiating the Tide pasabuy. The thread moves on.'),
        em('Your heart-react stays there, a small piece of social proof in the stream.'),
    ],
    next: 's1_morning_continues',
});

P('s1_aftermath_deferred', {
    body: [
        p('The screenshot is sent. The question is Kuya’s problem now.'),
        em('You swipe back to the notification screen. Ten more to go.'),
    ],
    next: 's1_morning_continues',
});

/* SMS-FIRST PATH — sets pattern awareness, then routes into the family arc */
P('s1_sms_exposure', {
    body: [
        notif('SMS · Unknown 0917-555-0188', `
            "Congratulations Ma’am/Sir! You have (1) unclaimed reward from GLife. To claim, visit: <strong>glife-rewards.ph.claim-now.click</strong>. Valid until today only po. Thank you and God bless!"`),
        p('That "God bless" at the end — somehow it makes the whole thing feel more human. Like someone actually typed it. Maybe someone did.'),
        p('"Unclaimed reward." "Today only." A domain wearing <em>.ph</em> like a costume: <em>claim-now.click.</em>'),
        em('You’ve seen this shape before. You’ll see it again before coffee’s ready — you just don’t know that yet.'),
    ],
    choices: [
        { label: 'Tap the link — you’ll figure out if it’s legit once you see the site', target: 's1_sms_aftermath', set: { s1_links_clicked: true, s1_noticed_sms_pattern: true } },
        { label: 'Delete the message', target: 's1_sms_aftermath', set: { s1_noticed_sms_pattern: true } },
        { label: 'Screenshot and send to Kuya Renz: "legit ba to?"', target: 's1_sms_aftermath', set: { s1_messages_forwarded: true, s1_noticed_sms_pattern: true } },
    ],
});

P('s1_sms_aftermath', {
    body: [
        p('You swipe back to the notifications. The Santos GC is still pulsing — four more messages. Mama will be wondering if you’re awake yet.'),
    ],
    next: 's1_family_gc_scroll',
});

/* BEA-FIRST PATH — small joy first, then routes into the family arc */
P('s1_bea_video', {
    body: [
        chat('Bea 💛', [
            r('Bea', 'maya bes panoorin mo ha 😭😭', '6:40'),
            r('Bea', '<em>[video]</em>', '6:40'),
        ]),
        p('A TikTok loads. A Pinay your age, sitting on a bed, deadpan to camera: <em>"My tito asked me again what I do for work. I said ‘I help companies tell stories.’ He said ‘so wala kang totoong work?’"</em>'),
        p('You laugh out loud. Once. Quietly. The sound surprises you.'),
        em('Bea always finds the ones that hit. That’s her whole thing.'),
    ],
    choices: [
        { label: 'Send back: "BES STOPPP 😭 LITERALLY ME"', target: 's1_bea_aftermath' },
        { label: 'Heart-react and move on', target: 's1_bea_aftermath' },
    ],
});

P('s1_bea_aftermath', {
    body: [
        p('You set the phone down for a second. The smile sits on your face longer than the joke earned.'),
        em('Then you pick it up again. The Santos GC is still pulsing. Mama will be wondering if you’re awake yet.'),
    ],
    next: 's1_family_gc_scroll',
});

/* CONVERGENCE — morning continues, remaining notifications, end */
P('s1_morning_continues', {
    body: [
        aside('6:52 AM'),
        p('The phone still has opinions about your morning. Work message from Jigs. Bea’s video. The SMS about unclaimed rewards.'),
        em('Saturday morning. Ordinary. That’s the thing about mornings — they always feel that way.'),
    ],
    next: 's1_remaining_notifications',
});

P('s1_remaining_notifications', {
    body: [
        p('You swipe back to the lockscreen. The notifications that are left.'),
    ],
    choices: [
        { label: 'Check the work message — get it over with', target: 's1_remaining_work' },
        { label: 'Watch Bea’s video', target: 's1_remaining_bea' },
        { label: 'Open the SMS', target: 's1_remaining_sms' },
        { label: 'Put the phone down — make coffee first', target: 's1_remaining_putdown' },
    ],
});

P('s1_remaining_work', {
    body: [
        chat('PixelPush Projects', [
            r('Jigs', 'sis check mo brief, client wants it "to pop" ✨', '6:31'),
            r('Jigs', 'Monday deadline pa rin 😅', '6:31'),
        ]),
        em('"Make it pop." Three words that cost you a weekend every other month. You’ll deal with it after coffee.'),
    ],
    next: 's1_morning_end',
});

P('s1_remaining_bea', {
    body: [
        p('Bea’s video — a TikTok about explaining freelancing to your tito. You laugh. Send a heart back. Move on.'),
    ],
    next: 's1_morning_end',
});

P('s1_remaining_sms', {
    body: [
        notif('SMS · Unknown', `
            "Congratulations Ma’am/Sir! You have (1) unclaimed reward from GLife..."`),
        em('Same shape as before. Same shape as the link Tita sent. You delete it without finishing.'),
    ],
    next: 's1_morning_end',
});

P('s1_remaining_putdown', {
    body: [
        p('You set the phone face-down on the counter. The kettle clicks. For ninety seconds you’re just a person in a kitchen — no notifications, no obligations.'),
        em('Then you pick it up again.'),
    ],
    next: 's1_morning_end',
});

P('s1_morning_end', {
    body: [
        p('Thirty-six minutes. Not bad. The coffee’s ready.'),
        em('The morning feels ordinary. That’s the thing about mornings — they always do.'),
        p('You lock the phone. You pour your coffee. You open your laptop because Monday’s deadline doesn’t care about Saturday.'),
    ],
    next: 's2_intro',
});

/* ---------------------------------------------------------------------
   Scene 2 — The GCash Wrong-Send
--------------------------------------------------------------------- */

P('s2_intro', {
    scene: 's2',
    body: [
        p('It’s 11:47 PM. You’re half-asleep, phone on the pillow beside you. Tomorrow is Monday. Your alarm is set for 5:30.'),
        p('Your phone lights up the ceiling.'),
        notif('GCash', '<strong>You received ₱5,000.00 from Unknown.</strong>'),
        p('You sit up. Blink at the screen.'),
        p('Five thousand pesos. From no one you know.'),
    ],
    choices: [
        { label: 'Check the notification', target: 's2_messages' },
        { label: 'Ignore it, go back to sleep', target: 's2_messages_late' },
    ],
});

P('s2_messages_late', {
    body: [
        p('You drop the phone face-down. Close your eyes.'),
        p('It buzzes again. Then again. Then again.'),
        p('Whoever it is, they aren’t waiting until morning.'),
    ],
    next: 's2_messages',
});

P('s2_messages', {
    body: [
        p('Three texts, rapid-fire, from an unknown number:'),
        chat('SMS · 0918-555-0144', [
            r('—', 'Ate please don’t spend it po 🙏 I sent to wrong number'),
            tp(),
            r('—', 'It’s for my daughter’s hospital bill po. She’s 7. Her name is Althea. Please ate, that’s all we have.'),
            tp('pause'),
            r('—', 'I’m a single mother po, I work as labandera. I’m begging you ate 🙏🙏🙏'),
        ]),
        p('You read it twice. Your chest tightens. You think of your own Mama, who raised three kids on a market vendor’s salary. You think of every time someone helped your family when no one had to.'),
        p('Not helping feels like becoming the kind of person you swore you’d never be.'),
    ],
    choices: [
        { label: 'Reply: "Don’t worry po, I’ll send it back"', target: 's2_negotiation' },
        { label: 'Reply: "Wait — let me check my account first"', target: 's2_balance_check' },
        { label: 'Screenshot the messages and send to the family GC', target: 's2_balance_check' },
        { label: 'Google "GCash wrong send scam"', target: 's2_balance_check' },
    ],
});

P('s2_balance_check', {
    body: [
        p('You open GCash. Stare at the balance.'),
        notif('GCash · Wallet', '<strong>Balance: ₱1,247.00</strong>'),
        p('Not ₱6,247. Not ₱1,247 plus five thousand. Just… what you had before.'),
        p('<em>The five thousand was never there.</em>'),
    ],
    choices: [
        { label: 'Confront the sender about the balance', target: 's2_mask_slips' },
        { label: 'Block the number and put the phone down', target: 's2_mask_slips_quiet' },
    ],
});

P('s2_negotiation', {
    body: [
        p('She takes a moment to reply. Then:'),
        chat('SMS · 0918-555-0144', [
            r('—', 'Thank you po ate, God bless you po 🙏😭 Please send to this number po — 0917-XXX-XXXX. Send ₱3,000 na lang po, keep ₱2,000 for your trouble.'),
        ]),
        p('Wait. A different number. And the amount changed. She sent five thousand but only wants three back? That should feel generous, but instead it lands wrong — like a price negotiated in advance. Like she already knew you’d say yes.'),
    ],
    choices: [
        { label: '"Wait, why a different number?"', target: 's2_mask_slips' },
        { label: '"Why only 3,000 if you sent 5,000?"', target: 's2_mask_slips' },
        { label: 'Just send the ₱3,000 — she’s suffering', target: 's2_sent', set: { s2_scammed: true } },
        { label: 'Check your GCash balance first', target: 's2_balance_check' },
    ],
});

P('s2_mask_slips', {
    body: [
        chat('SMS · 0918-555-0144', [
            tp('long pause'),
            r('—', 'Ate please po 😭 my daughter is in the hospital po'),
            r('—', 'Baka nag-error lang po yung app niyo'),
            r('—', 'Ate??'),
            tp('two-second pause'),
            r('—', 'Fine. Wag mo na ibalik. Sana masarap ulam mo.'),
        ]),
        p('The mask slips. Just like that. No more "po." No more crying emoji. The sick daughter, the labandera mother, the hospital — all of it, a script. Rehearsed and reused.'),
        p('<em>Althea was never real.</em>'),
    ],
    set: { s2_caught: true },
    next: 's2_end_saved',
});

P('s2_mask_slips_quiet', {
    body: [
        p('You don’t reply. You don’t engage. You just hold down on the contact and tap <strong>Block.</strong>'),
        p('The phone goes quiet. The labandera with the dying daughter goes quiet. Because she was never there to begin with.'),
        p('<em>Althea was never real.</em>'),
    ],
    set: { s2_caught: true },
    next: 's2_end_saved',
});

P('s2_sent', {
    body: [
        p('You enter the number. ₱3,000. You hit <strong>Send.</strong>'),
        notif('GCash', '<strong>You sent ₱3,000.00 to 0917-XXX-XXXX.</strong>'),
        p('She doesn’t reply right away. The typing indicator flickers. Then nothing.'),
        p('You wait a minute. Two. Five.'),
        p('Then you Google it. <em>GCash wrong send scam.</em>'),
        p('It’s the third result. The exact script. The same daughter’s name in some versions. The same labandera mother. The same shifting amount.'),
        p('Your stomach hollows out.'),
    ],
    next: 's2_end_scammed',
});

P('s2_end_saved', {
    body: [
        p('The ceiling is white and quiet and doesn’t want anything from you.'),
        p('You caught it. The balance that didn’t change. The number that didn’t match. The amount that shifted like a negotiation. <em>You caught it</em> — but it doesn’t feel like winning.'),
        p('You think of Aling Nena from your barangay, who lost ₱3,500 to this exact scam last month. How many Aling Nenas are out there right now, reading the same messages about the same daughter who doesn’t exist?'),
    ],
    next: 's2_concept',
});

P('s2_end_scammed', {
    body: [
        p('The ceiling is white and quiet and doesn’t want anything from you.'),
        p('You sit in the dark, stomach hollow. Three thousand pesos. Two weeks of packed lunches. Gone to someone who invented a daughter to steal from strangers.'),
        p('You don’t tell Mama. You eat less that week and say you’re dieting.'),
    ],
    next: 's2_concept',
});

P('s2_concept', {
    body: [
        callout('Concept · Appropriate Trust', 'Kindness and caution aren’t opposites. Verifying doesn’t make you cruel. The scammer weaponized your goodness — the instinct to help, the shame of suspicion. Real emergencies survive a five-second balance check.'),
        callout('Concept · Human in Command', 'You are always allowed to pause. To check. To ask someone. No legitimate request falls apart because you took thirty seconds to verify it. Urgency that punishes caution is a red flag, not a reason to rush.'),
    ],
    next: 's3_intro',
    nextLabel: 'Monday morning',
});

/* =====================================================================
   ACT 2 — THE TIGHTENING
   ===================================================================== */

/* ---------------------------------------------------------------------
   Scene 3 — The Feed Knows You
--------------------------------------------------------------------- */

P('s3_intro', {
    scene: 's3',
    body: [
        p('The jeepney lurches forward, then stops. Forward. Stop. Commonwealth Avenue traffic at 8:47 AM is a parking lot with aspirations. You stand near the back, one hand on the rail, the other already reaching for your phone.'),
        p('You have a client meeting at 10. BGC. The KAIZEN project. You should be reviewing the brief one more time, but your thumb knows a different path. Instagram opens before you decide to open it.'),
        p('The feed loads.'),
    ],
    next: 's3_feed',
});

P('s3_feed', {
    body: [
        p('<em>First post:</em> "Freelance designers — stop undercharging." The account is @hustlewise_ph. You’ve never followed it. You scroll.'),
        p('<em>Second post:</em> Sponsored. "QC freelancers: manage your irregular income without the stress." Quezon City. Your city. How does the algorithm know your city? You’ve never tagged it. You just… exist there.'),
        p('<em>Third:</em> A woman about your age holding her phone up. GCash screen showing ₱48,920. Caption: "One year ago, I was choosing between groceries and rent. Now I choose peace of mind."'),
        p('Your chest tightens. <em>Choosing between groceries and rent.</em> That was two months ago. That might be next week.'),
        p('<em>Fourth post:</em> A government ad. DOLE seal. "Earn stable ₱40K/month. Government-registered freelancer program. Limited slots, apply now."'),
        p('Your thumb hovers. <strong>Stable.</strong> The word does something to your breathing.'),
        p('The comments are full of hope: "Legit ba to?" / "I got in! Interview is next week!" / "My ate applied, she starts training in May."'),
        p('You want to believe them.'),
        p('Then: the quiz.'),
        notif('Sponsored · @sidehustleph', 'Pink gradient. Friendly font. <strong>"Find your perfect side hustle in 2 minutes! 🎯"</strong> · 847 people took it today.'),
        p('You tap it before you decide to.'),
    ],
    next: 's3_quiz',
});

P('s3_quiz', {
    body: [
        chat('Quiz · 8 questions', [
            r('Q1', 'What’s your name?'),
            r('You', 'Maya.'),
            r('Q2', 'Where are you based?'),
            r('You', 'Quezon City.'),
            r('Q3', 'What’s your current monthly income?'),
            r('You', '₱15,000–₱20,000. (a slider that feels like a confession)'),
            r('Q4', 'Do you financially support family members?'),
            r('You', 'Yes. Because you do.'),
            r('Q5', 'What skills do you have?'),
            r('You', 'Graphic Design. Social Media.'),
            r('Q6', 'How much can you invest to start?'),
            r('You', '₱1,000–₱5,000. (you can scrape that together. maybe.)'),
            r('Q7', 'How many hours per week can you commit?'),
            r('You', '10–15. (enough to matter. not enough to lose your current clients.)'),
            r('Q8', 'Describe your dream job in one sentence.'),
            r('You', 'Stable income, creative freedom, flexible hours.'),
        ]),
        p('You tap <strong>Submit.</strong>'),
    ],
    next: 's3_results',
});

P('s3_results', {
    body: [
        notif('Result', '<strong>You’re a STRATEGIC BUILDER! 🎯</strong>'),
        p('Below it, three programs:'),
        p('— <strong>Homebased Data Entry</strong> · ₱15,000–₱25,000/month, part-time flexible, no experience required.'),
        p('— <strong>Online English Teaching</strong> · ₱20,000–₱35,000/month, evenings available, training provided.'),
        p('— <strong>Freelance Virtual Assistant</strong> · ₱18,000–₱30,000/month, work-from-home, be your own boss.'),
        p('Each one has a "Learn More" button.'),
        p('Each one feels like it was written for you.'),
        p('Each one knows that you need <em>stable</em> more than you need big. That you need flexible more than glamorous. That you can invest a little but not a lot. That you have 10–15 hours, not 40.'),
        p('The quiz didn’t just ask questions. <strong>It listened.</strong>'),
        p('Or it felt like listening.'),
    ],
    next: 's3_step_down',
});

P('s3_step_down', {
    body: [
        p('The jeepney stops. <em>"BGC!"</em> the conductor shouts.'),
        p('You step down. The towers of Bonifacio Global City rise around you like a different world. The client meeting is in 12 minutes. You’re on time.'),
        p('You put your phone in your bag.'),
        p('But you’re still thinking about ₱25,000. About <em>stable.</em> About the quiz that knew you before you even opened it.'),
        p('About how good it felt to be seen.'),
        p('<em>Even if what saw you wasn’t human.</em>'),
    ],
    next: 's4_intro',
});

/* ---------------------------------------------------------------------
   Scene 4 — Family GC Pressure Cooker
--------------------------------------------------------------------- */

P('s4_intro', {
    scene: 's4',
    body: [
        p('The phone has been quiet for twenty minutes. A miracle.'),
        p('You lie on your bed, shoes still on, staring at the water stain on the ceiling that looks like a map of something.'),
        p('<em>Buzz.</em>'),
        p('<em>Buzz buzz.</em>'),
        p('<em>Buzz buzz buzz buzz buzz.</em>'),
        p('You don’t move. The buzzing continues. A swarm.'),
        p('You grab the phone.'),
        notif('Santos Family GC', '<strong>47 unread.</strong>'),
        p('Your stomach drops. Forty-seven messages in — you check the timestamp — eleven minutes.'),
        p('Someone is dead or someone is furious.'),
        p('You open it.'),
    ],
    next: 's4_video_text',
});

P('s4_video_text', {
    body: [
        p('A video. Senator Ramirez. Podium. Senate seal. Frozen mid-sentence, his face serious, official, <em>real.</em>'),
        p('You scroll to the beginning.'),
        chat('Santos Family GC', [
            r('Tita Merly', '[Video attached] · "NAKU!!! TRAYDOR!!! 😡😡😡"', '7:22'),
            r('Tita Merly', 'WATCH THIS NOW. Ramirez is cutting OFW protections!!!', '7:22'),
            r('Kuya Jep', 'Wow. Even him.', '7:24'),
            r('Mama', 'I can’t believe this.', '7:25'),
            r('Papa', 'Walang pagasa.', '7:31'),
        ]),
        p('Papa. <em>Papa never messages.</em> When he does, it’s the end of the conversation.'),
    ],
    next: 's4_watch',
});

P('s4_watch', {
    body: [
        p('You tap the video.'),
        p('Ramirez speaks directly into the camera. Professional. Polished. His voice is steady.'),
        em('"After careful consideration, I am announcing my support for Budget Reallocation Bill 2026, which will redirect OFW protection funding toward private sector partnerships. This is about fiscal responsibility and economic modernization."'),
        p('Thirty seconds. Clean cut. Over.'),
        p('Your skin prickles.'),
        p('You replay it.'),
        p('The audio is too perfect. No echo. No room noise. No microphone pop when he says "partnerships." Just his voice, clear and flat, like it was recorded in a studio.'),
        p('His mouth. You watch his mouth.'),
        p('The words come slightly <em>after</em> the lip movement. A fraction of a second. Not enough to be obvious. Just enough to feel wrong.'),
        p('His blinking. Robotic. Every four seconds. <em>Exactly.</em>'),
        p('Your heart starts to beat faster.'),
    ],
    next: 's4_pile_on',
});

P('s4_pile_on', {
    body: [
        p('The GC is moving.'),
        chat('Santos Family GC', [
            r('Tita Ching', 'My sister-in-law is an OFW. This is her life he’s destroying.', '7:33'),
            r('Cousin Mae', 'My officemate works in the senate daw. She said Chinese developers have been visiting him.', '7:33'),
            r('Tita Merly', 'SEE?? There’s proof. This is real.', '7:34'),
        ]),
        p('Proof. Proof made of hearsay and a too-perfect video.'),
        p('Your fingers hover over the keyboard.'),
        p('You could say something. Right now. Before this spreads further.'),
        p('But the GC is unanimous. Fifty-three messages of shared certainty. Everyone agrees. Ramirez is corrupt. The OFWs are betrayed. The evidence is clear.'),
        p('If you question it, you question all of them.'),
        p('You type: <strong>"Wait. I think this video might be edited."</strong>'),
        p('Your thumb hovers over the send button.'),
    ],
    choices: [
        { label: 'Send it', target: 's4_send', set: { s4_spoke: true } },
        { label: 'Delete it and stay silent', target: 's4_silent', set: { s4_silent: true } },
    ],
});

P('s4_send', {
    body: [
        p('You hit send.'),
        chat('Santos Family GC', [
            r('You', 'Wait. I think this video might be edited.', '7:35'),
        ]),
        p('The GC freezes. No messages for five seconds.'),
        p('Then:'),
        chat('Santos Family GC', [
            tp('Tita Merly is typing…'),
            tp('Tita Ching is typing…'),
            tp('Kuya Jep is typing…'),
            r('Tita Merly', 'Edited??? Maya this is NEWS. Thousands of people have shared this.', '7:36'),
            r('Tita Ching', 'Why do you always do this? Always doubting. Always negative.', '7:36'),
            r('Cousin Mae', 'I saw this on three different pages. Same exact video. How can they all be fake?', '7:36'),
        ]),
        chat('Kuya Jep · DM', [
            r('Kuya Jep', 'bro I think you’re right but there’s no way I’m saying that in the GC lmao you’re on your own', '7:37'),
        ]),
        p('Your ally just bailed.'),
        chat('Santos Family GC', [
            r('Mama', '…', '7:37'),
        ]),
        p('Mama said nothing. Didn’t back you up. Didn’t even react.'),
        chat('Santos Family GC', [
            r('Tito Boy', 'My friend in city council confirmed this. It’s real.', '7:38'),
            r('Tita Merly', 'See Maya? CONFIRMED. You need to stop being so suspicious of everything.', '7:38'),
            r('Ate from Canada', 'I’m sharing this to my OFW networks. This affects all of us.', '7:39'),
        ]),
        p('<em>"Sorry Maya."</em>'),
        p('The words hang there. An apology that isn’t one. A dismissal wrapped in politeness.'),
        p('The video hits 2,600 shares before you stop checking.'),
        p('You were right.'),
        p('<em>But right doesn’t stop a flood.</em>'),
    ],
    next: 's5_intro',
});

P('s4_silent', {
    body: [
        p('You delete the message.'),
        p('Watch the GC continue.'),
        chat('Santos Family GC', [
            r('Tita Merly', 'EVERYONE SHARE THIS. Church, barangay, office, alumni. PEOPLE NEED TO KNOW.', '7:35'),
            r('Tito Boy', 'Sent to barkada and city council.', '7:36'),
            r('Mama', 'Thank you Ate for keeping us informed 🙏', '7:37'),
            r('Ate from Canada', 'Sharing to: OFW Support Network, Pinoy Healthcare Workers Abroad, Canadian Filipino Families.', '7:39'),
        ]),
        p('You watch the spread in real time. Each message is a new vector. Each share spawns five more.'),
        p('You could have said something. Could have questioned it. Could have slowed the spread, even a little.'),
        p('You didn’t.'),
        p('You chose silence. You chose safety. You chose family harmony over truth.'),
        p('The video hits 4,500 shares by the time you close the app.'),
        p('Complicity feels like nothing. <em>That’s the problem.</em> It’s just silence. Just inaction.'),
        p('But silence is a choice.'),
        p('And you made it.'),
        p('How many people believe a lie tonight because you said nothing?'),
        p('You don’t sleep for a long time.'),
    ],
    next: 's5_intro',
});

/* ---------------------------------------------------------------------
   Scene 5 — The Voice That Sounds Right
--------------------------------------------------------------------- */

P('s5_intro', {
    scene: 's5',
    body: [
        p('Your hands know the rhythm. Select, duplicate, align, nudge. The KAIZEN revisions are finally cooperating, the design settling into the shape it was always supposed to be. Your headphones are in — just enough sound to drown out the world, not enough to distract.'),
        p('Your phone is face-down on the desk. Silent. Forgotten.'),
        p('Until it isn’t.'),
        p('The buzz is different. Not a notification. A call. The kind that breaks through silent mode because the system assumes it matters.'),
        p('You pick up the phone. Unknown number. <em>0917-XXX-XXXX.</em>'),
        p('You almost decline. But what if it’s the client? What if it’s money?'),
        p('You tap <strong>Answer.</strong>'),
    ],
    next: 's5_call',
});

P('s5_call', {
    body: [
        p('"Hi Maya?" The voice arrives like a familiar song. Warm. Slightly rushed. Apologetic. "It’s Jess. Jess from PixelPush."'),
        p('Your shoulders relax. "Oh, hey Jess. What’s up?"'),
        p('"So sorry to call you like this — I know you’re working. But I need to rush something and email’s taking forever."'),
        p('You pull one earbud out. "It’s okay. What do you need?"'),
        p('"The client wants to send your Milano payment directly to your GCash. They’re trying to close their books today. Can you just confirm your registered mobile number for me? They need it for processing."'),
        p('The words are reasonable. The tone is Jess — apologetic, slightly stressed, trying to keep everything moving. But something in your chest hesitates.'),
        p('Registered mobile number. Jess has your number. You text constantly. Why ask for it?'),
        p('"Wait, you already have my number. We literally messaged yesterday."'),
        p('"I know, but their finance system needs it entered exactly as it’s registered with GCash. You know how these things are — super specific."'),
        p('That makes sense. Bureaucracy is like that. But there’s something about the voice. It’s perfect. Too perfect. No breath sounds. No background noise. Just Jess’s voice, smooth and continuous.'),
        p('You look at your phone screen. <em>Unknown.</em> Where Jess’s name should be.'),
        p('"Why isn’t your name showing up? It just says ‘Unknown.’"'),
        p('A beat. Then: "I’m calling from the office landline. My phone died."'),
        p('Plausible. But Jess always texts first. <em>That’s the pattern.</em>'),
        p('"Can you just text me when your phone’s charged? I can wait."'),
        p('"Maya." The voice is patient. Kind. Still Jess. "The finance team is literally waiting. I just need your number. It’ll take five seconds."'),
        p('It’ll take five seconds. Such a small thing. Such a reasonable request. But the tightness in your chest won’t go away.'),
        p('Because Jess <em>knows</em> your number. And Jess would understand if you said no.'),
        p('"Let me call you back on your number," you say. "The one I have saved."'),
        p('Silence. Not the comfortable kind. The calculating kind.'),
        p('"My phone’s dead," the voice repeats. "That’s why I’m calling from the office."'),
        p('"Then I’ll text you and you can reply when it’s charged. This can wait ten minutes."'),
        p('Another pause. Then: "Sure. I’ll text you."'),
        p('The warmth has thinned. It’s still there, but it’s a layer now, not the whole thing.'),
        p('"Okay. Thanks, Jess."'),
        p('"Yeah."'),
        p('The call ends.'),
    ],
    next: 's5_real_jess',
});

P('s5_real_jess', {
    body: [
        p('You sit there, phone in hand. Your heart is beating faster than it should be. You feel absurd. It was Jess. The voice was Jess. Why are you panicking over a simple request?'),
        p('But your hands are already moving. You open your messages. Find Jess’s thread — the real one, with the contact photo and months of work banter.'),
        chat('Jess · Viber', [
            r('You', 'Hey, did you just call me?'),
            tp('typing… instant'),
            r('Jess', 'No? I’m in a meeting. My phone’s right here. Why?'),
        ]),
        p('The floor drops.'),
        chat('Jess · Viber', [
            r('You', 'Someone just called me. Said they were you. Asked for my GCash number.'),
            r('Jess', 'WHAT'),
            r('Jess', 'I didn’t call you.'),
            r('Jess', 'Did you give them anything?'),
            r('You', 'No. I said to text me instead. They hung up.'),
            r('Jess', 'Oh my god Maya.'),
            r('Jess', 'That’s so creepy.'),
            r('Jess', 'How did they sound like me???'),
        ]),
        p('You stare at the question. You don’t know how to answer. Because they didn’t just sound like Jess. <em>They were Jess.</em> The cadence. The warmth. The slight apologetic lilt. Every micro-pattern of speech that makes Jess Jess.'),
        p('You type: <em>"I don’t know. But they did. Exactly."</em>'),
        p('You send it. Then put the phone down.'),
    ],
    next: 's5_aftermath',
});

P('s5_aftermath', {
    body: [
        p('The KAIZEN design is still there, patient and unfinished. Nineteen hours until deadline.'),
        p('But you can’t focus.'),
        p('Because you’re thinking about every voice message you’ve ever sent. Every Zoom call. Every Instagram story where you talked to the camera. Every time you spoke out loud with your phone nearby.'),
        p('How much of your voice is out there? How easy would it be to copy you?'),
        p('You think: <em>If they can take Jess’s voice, they can take mine.</em>'),
        p('You think: <em>If they can take mine, they can call Mama. Or Jess. Or a client. And say anything.</em>'),
        p('You think: <em>How am I supposed to trust anything anymore?</em>'),
    ],
    next: 's6_intro',
});

/* ---------------------------------------------------------------------
   Scene 6 — The Viral Truth
--------------------------------------------------------------------- */

P('s6_intro', {
    scene: 's6',
    body: [
        p('Your Scroll of Destiny™ begins at 8:52 PM.'),
        p('The algorithm has been waiting for you.'),
        p('Feed loads. First post:'),
        notif('Manila Trending Now', 'Senator Ramirez looking absolutely guilty in a freeze-frame specifically chosen for maximum guilt. Share count: <strong>127,482.</strong> And climbing.'),
        p('Oh. <em>That</em> video. The video from the family GC. The Monday Night Massacre.'),
        p('It escaped.'),
        p('The family GC was Patient Zero and now it’s citywide.'),
        p('<strong>127,482 shares.</strong>'),
        p('You scroll.'),
        p('Three posts down: The video again. Different page. <strong>"CONCERNED CITIZENS OF MANILA."</strong> Same clip. Share count: <strong>43,921.</strong>'),
        p('Five posts down: A reaction video. An influencer doing the <em>surprised face thumbnail.</em> "I can’t believe this is real. This is why I don’t trust politicians." Share count: <strong>29,384.</strong>'),
        p('Eight posts down: A protest announcement. Real-world action. <strong>Friday, 3 PM, outside Ramirez’s office.</strong> "BRING YOUR ANGER. BRING YOUR SIGNS. BRING CHANGE."'),
        p('<em>The fake video is now organizing real protests.</em>'),
    ],
    next: 's6_barkada',
});

P('s6_barkada', {
    body: [
        p('Your barkada GC detonates.'),
        chat('Barkada GC', [
            r('Bea', 'WTF DID YOU GUYS SEE THIS [video link]'),
            r('Carlo', 'TRAYDOR TALAGA. Sharing to literally everyone I know.'),
            r('Jai', 'Bro my tita already sent this yesterday. It’s been TRENDING.'),
        ]),
        p('You remember yesterday. The family GC. The video. The chaos.'),
        p('Either you’d stayed silent, or you’d questioned it and got labeled <em>"nega"</em> and <em>"overthinker."</em>'),
        p('Either way: the video spread.'),
        p('Monday: 47 people.'),
        p('Wednesday: <strong>131,000 shares and climbing in real-time.</strong>'),
    ],
    next: 's6_search',
});

P('s6_search', {
    body: [
        p('You search: <em>"Ramirez video fact check."</em>'),
        p('Results appear.'),
        p('<strong>Vera Files:</strong> "FALSE: Ramirez bribery video is AI-generated deepfake. Here’s how we know." (Detailed, boring, thorough.) <strong>2,407 views.</strong>'),
        p('The fake video has <strong>139,492 shares.</strong>'),
        p('<em>The truth is getting ratioed by a factor of sixty.</em>'),
        p('Your barkada GC is still spiraling.'),
        chat('Barkada GC', [
            r('Carlo', 'Sent to my whole office. Everyone’s sharing.'),
            r('Bea', 'My ENTIRE feed is this. Nothing else exists.'),
            r('Jai', 'Good. He deserves to be exposed.'),
        ]),
        p('The typing indicator under your name blinks.'),
        p('You have options. None are good.'),
    ],
    choices: [
        { label: 'Share the Vera Files fact-check publicly', target: 's6_share', set: { s6_factcheck: true } },
        { label: 'Stay silent', target: 's6_silent', set: { s6_silent: true } },
    ],
});

P('s6_share', {
    body: [
        p('You copy the Vera Files link.'),
        p('Type: <strong>"Guys this video is actually a deepfake — here’s the fact-check with frame-by-frame proof: [link] 🙏"</strong>'),
        p('Send.'),
        p('The GC goes quiet for exactly four seconds.'),
        chat('Barkada GC', [
            r('Carlo', 'Vera Files and Rappler? SERIOUSLY? You know they’re biased.'),
            r('Jai', 'Even if the VIDEO is fake, Ramirez IS corrupt. Everyone knows it. This is just exposing the truth in a different format.'),
        ]),
        chat('Bea · DM', [
            r('Bea', 'Heyyy so I appreciate you checking but maybe the GC wasn’t the vibe for it? Everyone’s kinda awkward now. You’re prob right tho ❤️'),
        ]),
        p('Translation: <em>You’re correct but you’re also a problem.</em>'),
        p('You check your public timeline post. The fact-check link. <strong>58 views. 1 share. 5 comments.</strong>'),
        p('Comments: <em>"How much did Ramirez pay you?"</em> / <em>"Elitista."</em> / <em>"You’re what’s wrong with this country."</em> / <em>"Thanks for sharing. It won’t get traction but it’s important."</em> / <em>"Rappler HAHAHAHA."</em>'),
        p('The viral video: <strong>163,920 shares.</strong>'),
        p('Your fact-check: <strong>58 views.</strong>'),
        p('You did the right thing.'),
        p('<em>The right thing got 58 views.</em>'),
    ],
    next: 's7_intro',
});

P('s6_silent', {
    body: [
        p('You don’t type. You exit the GC.'),
        p('You scroll your feed.'),
        p('Every post: Ramirez. Every angle: guilty.'),
        p('The algorithm has decided what you should think about.'),
        p('You search for the fact-checks. Read them. Know the truth.'),
        p('You don’t share them.'),
        p('The lie is still there. Louder. Bigger.'),
        p('You refresh at 9:38 PM: <strong>149,203 shares.</strong>'),
        p('Open at 11:52 PM: <strong>172,938 shares.</strong>'),
        p('Open at 2:14 AM: <strong>194,028 shares.</strong>'),
        p('Open at 7:03 AM, before your brain is fully online: <strong>234,920 shares.</strong>'),
        p('The protest is scheduled. Real people. Real anger. Real-world consequences from a fake-world video.'),
        p('You said nothing on Monday when it was 47 people.'),
        p('You said nothing on Wednesday when it’s 234K people.'),
        p('Silence was easier. Silence was safer.'),
        p('<em>Silence was complicity with better sleep.</em>'),
        p('The number keeps climbing behind your eyelids.'),
    ],
    next: 's7_intro',
});

/* ---------------------------------------------------------------------
   Scene 7 — The Algorithm Knows
--------------------------------------------------------------------- */

P('s7_intro', {
    scene: 's7',
    body: [
        p('Your phone has opinions about your morning before you do.'),
        p('6:23 AM. Thursday. You’re not awake yet but your phone is very awake. <em>Aggressively awake.</em>'),
        p('<strong>23 notifications.</strong> An essay’s worth of demands.'),
        p('You unlock the phone. Your eyes are still half-closed. Your brain is still buffering. But your thumb? Your thumb is a professional.'),
        p('<em>Facebook: 14 notifications.</em>'),
        p('You open the app and immediately regret consciousness.'),
        p('The feed is no longer showing you the internet. The feed is showing you a personalized anxiety simulator, built from your own click history, optimized for engagement.'),
    ],
    next: 's7_feed',
});

P('s7_feed', {
    body: [
        notif('Sponsored', '<em>First post:</em> "10 Signs You’ve Been Scammed — Are You A Victim?" The irony is lost on the algorithm. 47 people have already shared it.'),
        notif('Manila News', '<em>Second post:</em> "BREAKING: Ramirez bribery scandal DEEPENS" — The same deepfake. <strong>342,000 views</strong> now.'),
        notif('Freelancer Daily', '<em>Third post:</em> "Freelancers — this is why you’re broke." The article promises "the one mindset shift." The shift is, inevitably, purchasing a ₱15K course.'),
        notif('GCash Security Tips PH', '<em>Fourth post:</em> "Protect your GCash: 5 things scammers don’t want you to know." Is this the real GCash page? You check. It’s… close. Not the official page. Not <em>not</em> the official page.'),
        p('Every. Single. Post. Is. Targeted.'),
        p('The algorithm has spent the week watching you. It watched you click the scam warning Monday. It watched you engage with political content Tuesday. It watched you read freelancer burnout articles Wednesday.'),
        p('It took notes. It built a profile. It learned your triggers.'),
        p('And now it’s serving you a feed that’s 100% your anxiety.'),
    ],
    next: 's7_friends',
});

P('s7_friends', {
    body: [
        p('You scroll to <strong>People You May Know.</strong>'),
        p('<strong>3 Friend Requests.</strong>'),
        p('<strong>Marlon Cruz.</strong> Freelance graphic designer, Manila. Profile photo: professional, warm, trustworthy smile. Timeline goes back eight months. Posts about design projects. Photos at coffee shops. Two mutual friends: Jigs and Anya.'),
        p('It’s perfect. <em>Which is the problem.</em> Real people’s profiles are a mess.'),
        p('<strong>Kaye Domingo.</strong> BPO / Part-time VA. K-dramas. Brunch. Motivational quotes. Three mutual friends: Bea, Mikko, someone from college.'),
        p('She looks exactly like every millennial Filipina freelancer you’ve ever met. Down to the latte art.'),
        p('Is she real or is she a template? You can’t tell.'),
        p('<strong>RJ Santos.</strong> Your last name. Marketing. Mutual friends: Jigs, Kuya Jep.'),
        p('He’s either your distant cousin trying to network or he’s a data scientist’s masterpiece.'),
        p('<em>You’re staring at three faces and you have no idea which ones are human.</em>'),
    ],
    next: 's7_webinar',
});

P('s7_webinar', {
    body: [
        notif('Push notification', '<strong>"Free Webinar for Freelancers: Managing Stress During Election Season. Register now!"</strong>'),
        p('The webinar is either: <em>(A)</em> Legitimate help, or <em>(B)</em> A funnel that ends with "Our coaching program is ₱12K."'),
        p('You can’t tell which. The legitimate help and the scam look identical.'),
        p('The form wants: Email, phone, industry, monthly income.'),
        p('If it’s real, that’s reasonable. If it’s a scam, you just handed them everything.'),
        p('<em>Schrödinger’s webinar.</em>'),
    ],
    next: 's7_outro',
});

P('s7_outro', {
    body: [
        p('You put the phone face-down.'),
        p('Mama is making coffee. The smell is the only real thing in the room.'),
        p('You stare at the phone.'),
        p('You pick it up. You put it down. You pick it up.'),
        p('The algorithm is very patient. It has time. It has data.'),
        p('It knows you’ll look. <em>You always look.</em>'),
        p('That’s the feedback loop. That’s the trap. That’s the architecture.'),
        p('<strong>You didn’t build the cage. But you live in it.</strong>'),
        p('And the algorithm knows exactly how to keep you here.'),
    ],
    next: 's8_intro',
});

/* ---------------------------------------------------------------------
   Scene 8 — The Invoice That Isn't (MIDPOINT CRISIS)
--------------------------------------------------------------------- */

P('s8_intro', {
    scene: 's8',
    body: [
        p('You click <strong>Send</strong> on the Milano project and allow yourself exactly ten (10) seconds of relief, as per the Freelancer’s Handbook, Chapter 7: "Dopamine Rationing for the Precariously Employed."'),
        p('You made it. Two weeks. Fourteen revisions. <em>It’s done.</em> You’re free.'),
        p('For ten seconds.'),
        p('Then you refresh your email.'),
    ],
    next: 's8_email',
});

P('s8_email', {
    body: [
        p('New message.'),
        notif('Mail · Inbox', `
            <div><strong>From:</strong> Jigs — PixelPush Projects</div>
            <div><strong>Subject:</strong> URGENT: Client invoice payment</div>`),
        p('<em>Oh thank god.</em> Fast payment. Rent is due in six days and you’ve been doing the mental math all week.'),
        p('You open the email.'),
        em('"Sis, client wants to pay you directly via GCash for the Milano revisions. Here’s the payment link: [LINK]. Click to confirm receipt so they can release the ₱8,500. Need this done by 5 PM or they’ll delay to next month. Thanks!"'),
        p('You read it.'),
        p('Everything checks out:'),
        p('✓ Sender: Jigs (your project contact)<br />✓ Amount: ₱8,500 (exactly what you invoiced)<br />✓ Client: Milano (correct project name)<br />✓ Urgency: 5 PM deadline (month-end accounting, makes sense)<br />✓ Payment method: GCash direct (unusual but plausible)'),
        p('Five out of five. <em>A perfect score.</em>'),
        p('Your thumb hovers over the link.'),
    ],
    choices: [
        { label: 'Click the link', target: 's8_click', set: { s8_scammed: true } },
        { label: 'Check the sender email address first', target: 's8_check', set: { s8_saved: true } },
    ],
});

P('s8_click', {
    body: [
        p('You click.'),
        p('The page loads.'),
        notif('GCash Payment Confirmation', 'Logo: present and correct. Color scheme: that exact shade of blue. Layout: familiar to the point of muscle memory.'),
        p('<strong>Enter your mobile number:</strong>'),
        p('You type it. Ten digits.'),
        p('<strong>Enter your MPIN:</strong>'),
        p('Six digits. The ones you use to buy groceries, send money to Mama, pay for everything in your digital life.'),
        p('Your fingers know the pattern. <em>Tap tap tap tap tap tap.</em>'),
        p('Submit.'),
        notif('Error', '<strong>Session expired.</strong> Please try again.'),
        p('You frown. Session expired? You literally just opened it.'),
        p('You try again. Mobile number. MPIN. Submit.'),
        notif('Error', '<strong>Session expired.</strong> Please try again.'),
        p('Wait.'),
        p('That feeling. The cold one.'),
        p('You swipe to your home screen. Open the real GCash app.'),
        notif('GCash · Security', '<strong>New device login from Quezon City.</strong>'),
        p('You don’t live in Quezon City.'),
        notif('GCash · Wallet', '<strong>Balance: ₱4,247</strong>'),
        p('The number is changing.'),
        notif('GCash', 'Sent ₱1,000 to 09XX-XXX-XXXX · Balance: ₱3,247'),
        p('What.'),
        notif('GCash', 'Sent ₱1,000 to 09XX-XXX-XXXX · Balance: ₱2,247'),
        p('No no no no —'),
        notif('GCash', 'Sent ₱1,200 to 09XX-XXX-XXXX · Balance: ₱1,047'),
        p('You’re watching your money leave. <em>In real time.</em> Transaction by transaction.'),
        p('38 seconds. From ₱4,247 to ₱1,047.'),
    ],
    next: 's8_aftermath_scammed',
});

P('s8_aftermath_scammed', {
    body: [
        p('You log out all devices. Change your MPIN.'),
        p('You text Jigs on Viber. <em>Real Jigs.</em>'),
        chat('Jigs · Viber', [
            r('You', 'DID YOU JUST EMAIL ME?'),
            tp(),
            r('Jigs', 'No? I’m in a meeting. What’s wrong?'),
            r('You', '[screenshot]'),
            r('Jigs', 'That’s not my email. Holy shit.'),
            r('Jigs', 'Maya are you okay??'),
        ]),
        p('You look at the email again.'),
        p('<strong>jigs.pixelpush@gmail.com</strong>'),
        p('Real email: <strong>jigs@pixelpushprojects.com</strong>'),
        p('One word different.'),
        p('"pixelpush" vs "pixelpushprojects."'),
        p('That’s it. <em>That’s the whole thing.</em>'),
        p('<strong>₱3,200 gone.</strong>'),
        p('Rent is ₱6,000. Due in six days. You were counting on the Milano payment.'),
        p('You sit on your bedroom floor.'),
        p('You think about the email. How perfect it was.'),
        p('How they knew:'),
        p('— The exact amount (₱8,500)<br />— The exact project (Milano)<br />— The exact contact (Jigs)<br />— The exact deadline pressure (5 PM)'),
        p('This wasn’t random. This was <em>researched.</em> Targeted. Timed.'),
        p('38 seconds. ₱3,200. One missing word.'),
        p('<em>How many more are coming?</em>'),
    ],
    next: 's9_intro',
});

P('s8_check', {
    body: [
        p('Your thumb hovers over the link.'),
        p('The paranoid voice gets louder: <em>check the sender.</em>'),
        p('You tap the sender name instead of the link.'),
        p('<strong>jigs.pixelpush@gmail.com</strong>'),
        p('Open Viber. Find Jigs.'),
        p('Contact info: <strong>jigs@pixelpushprojects.com</strong>'),
        p('They’re different.'),
        p('Wait. <em>One word different.</em>'),
        p('"pixelpush" vs "pixelpushprojects."'),
        p('Your stomach does the drop.'),
        chat('Jigs · Viber', [
            r('You', 'Did you just email me about payment?'),
            tp(),
            r('Jigs', 'No? What email?'),
            r('You', '[screenshot]'),
            r('Jigs', 'WTF'),
            r('Jigs', 'That’s not me'),
            r('Jigs', 'Someone spoofed my email'),
            r('Jigs', 'Maya don’t click anything'),
        ]),
        p('You open the link in incognito. <em>Just to see.</em>'),
        notif('GCash Payment Confirmation', 'Perfect clone. Logo, colors, layout, fields. Mobile number. MPIN.'),
        p('If you’d entered your information, they would have had everything.'),
        p('You close the browser. Delete the email. Block the sender.'),
    ],
    next: 's8_aftermath_saved',
});

P('s8_aftermath_saved', {
    body: [
        p('You sit at your desk. Hands shaking.'),
        p('You saved yourself. <em>Good job, Maya. Gold star.</em>'),
        p('The cost? The cost is knowing.'),
        p('They knew everything.'),
        p('₱8,500 — from the quiz on Monday. Milano — from your Instagram post last week. Jigs — from LinkedIn. 5 PM deadline — from pattern recognition.'),
        p('<em>This was a campaign.</em>'),
        p('The Monday quiz: data collection.<br />The Tuesday voice call: testing vectors.<br />The feed full of anxiety: psychological softening.<br />The webinar registration: more data.'),
        p('All leading here. To this email. This moment. This click.'),
        p('You didn’t click.'),
        p('<em>But they’ll try again.</em>'),
        p('Tomorrow. Next week. Next month.'),
        p('And eventually — not today, but eventually — you’ll be tired enough, or stressed enough, or relieved enough.'),
        p('And you’ll click.'),
        p('Because you can’t maintain perfect vigilance forever.'),
        p('They have infinite attempts. <em>You have finite attention.</em>'),
        p('How many more are coming?'),
        p('<strong>All of them.</strong>'),
    ],
    next: 's9_intro',
});

/* =====================================================================
   ACT 3 — THE RECKONING
   ===================================================================== */

/* ---------------------------------------------------------------------
   Scene 9 — The Conversation
--------------------------------------------------------------------- */

P('s9_intro', {
    scene: 's9',
    body: [
        p('The dishes are cleared. Mama’s tinola pot sits empty on the stove. The electric fan oscillates, the same rhythm it’s had for fifteen years.'),
        p('You haven’t moved from the table.'),
        p('"Can everyone stay for a minute?"'),
        p('Your hands are shaking. You press them flat against the wood.'),
        p('Mama sits back down, wiping her hands on her apron. Papa looks up from his phone. Kuya Renz pauses at the doorway, one hand on the frame.'),
        p('"I need to tell you something."'),
        p('You’ve been rehearsing this all afternoon. But now, with all three of them looking at you, the words feel heavier.'),
        p('Renz sits. The fan turns. No one speaks.'),
        p('"Something’s been happening this week. A few things, actually."'),
        p('Mama’s face shifts immediately. <em>"Are you okay? May problema ba?"</em>'),
        p('"I’m okay. But…" You open your phone. Pull up the Family GC. Scroll to Monday.'),
    ],
    next: 's9_video',
});

P('s9_video', {
    body: [
        p('"This video. The one Tita Merly shared. Senator Ramirez cutting OFW funding."'),
        p('Mama nods. <em>"Nakakagalit, diba?"</em>'),
        p('"It’s not real, Ma."'),
        p('The words land flat. Mama blinks.'),
        p('"What do you mean not real? We all saw it."'),
        p('"We saw a video. But it’s not him. It’s AI-generated. A deepfake. His face and voice, but the words — he never said those things."'),
        p('Kuya Renz leans back. "You’re saying someone faked a whole senator? Why?"'),
        p('"To make people angry. To spread it. To make us fight about it."'),
        p('Renz frowns. "That’s… elaborate."'),
        p('"It worked, though. The video got over 200,000 shares."'),
        p('Mama looks at the frozen frame on your phone. "How do you know it’s fake?"'),
        p('"I looked it up. Vera Files did a fact-check. Frame-by-frame breakdown. The audio’s too clean. His lip movements don’t match. His blinking pattern is robotic."'),
        p('Mama takes the phone. Replays the video. Watches closely this time.'),
        p('"I didn’t notice."'),
        p('"You weren’t supposed to. It’s designed to look real."'),
        p('Papa, who’d been silent, speaks. "What else?"'),
    ],
    next: 's9_email_branch',
});

P('s9_email_branch', {
    body: [
        p('You swallow. This part is harder.'),
        p('"Yesterday, someone emailed me pretending to be Jigs. They had all the right details — the project name, the payment amount, the deadline. They asked me to confirm my GCash info."'),
        p('Mama’s face shifts. "Did you —"'),
    ],
    branch: {
        flag: 's8_scammed',
        ifTrue: 's9_email_scammed',
        ifFalse: 's9_email_saved',
    },
});

P('s9_email_scammed', {
    body: [
        p('"I clicked. I gave them my MPIN. They drained ₱3,200 from my account in 38 seconds."'),
        p('Mama’s hand goes to her mouth. <em>"Diyos ko."</em>'),
    ],
    next: 's9_renz',
});

P('s9_email_saved', {
    body: [
        p('"I almost did. I was about to. But I checked the sender address first. One word different."'),
        p('You show them.'),
        p('"jigs.pixelpush@gmail.com. The real one is jigs@pixelpushprojects.com."'),
        p('Renz leans forward. Stares. "That’s… that’s really close."'),
        p('"That’s the point. If I’d clicked, they would’ve had my MPIN. They could’ve drained my account."'),
        p('Mama’s hand goes to her mouth. <em>"Diyos ko."</em>'),
    ],
    next: 's9_renz',
});

P('s9_renz', {
    body: [
        p('You look at Kuya Renz.'),
        p('"And the SIM registration advisory. The one you forwarded last week."'),
        p('Renz’s posture changes. Defensive. "What about it?"'),
        p('"It was fake. The logo, the language, the link — all designed to look official. But it wasn’t. It was phishing."'),
        p('"I checked that," Renz says, voice tight. "It had the government seal."'),
        p('"They copy those. It takes five minutes."'),
        p('Renz’s jaw clenches. "So you’re saying I’m stupid."'),
        p('"No." Your voice is firm. "I’m saying you were targeted. We all were. These aren’t random. Someone’s studying what we click, what we trust, who we listen to. And they’re using it against us."'),
        p('Silence.'),
        p('Renz speaks quietly. "I shared that SIM thing to three other group chats."'),
        p('"I know."'),
        p('"If it’s fake…" He trails off.'),
        p('"Then people believed it because you sent it. Because they trust you."'),
        p('He doesn’t look up.'),
        p('The fan hums. Outside, someone’s rooster crows even though it’s 8 PM.'),
        p('Papa finally speaks. <em>"So what do we do?"</em>'),
    ],
    next: 's9_papa',
});

P('s9_papa', {
    body: [
        p('You had been waiting for this question. Hoping for it. Dreading it.'),
        p('"I don’t have all the answers, Pa. I’m still learning. But I think… we start by checking before we share. We look at URLs. We ask each other when something feels off. We slow down."'),
        p('Mama: "But how do we know what to check? I don’t even know what a URL is, anak."'),
        p('And there it is. <em>The gap.</em>'),
        p('"I’ll show you. We can do it together."'),
        p('Mama nods slowly. "Okay."'),
        p('Renz is still staring at the table. Then: "I thought I was being careful. I don’t just click everything."'),
        p('"You are careful. That’s why it worked. They make it look like something a careful person would trust."'),
        p('He looks up. Meets your eyes.'),
        p('"I fell for it."'),
        p('"We all did. That’s how they win. They make it so good that falling for it doesn’t mean you’re careless. <em>It just means you’re human.</em>"'),
    ],
    next: 's9_show_us',
});

P('s9_show_us', {
    body: [
        p('Papa pushes his chair back. Stands.'),
        p('For a moment you think he’s leaving.'),
        p('But he doesn’t. He walks to the counter, picks up his phone, comes back.'),
        p('Sets it on the table. Face-up.'),
        p('<strong>"Show us."</strong>'),
        p('You blink. "Show you what?"'),
        p('"How you check. What you look for."'),
        p('Your chest tightens. "Okay."'),
        p('You pick up your phone. Open the fake email. Walk them through it — the sender address, the slight differences, the MPIN request buried mid-form.'),
        p('Mama asks questions. Renz listens. Papa watches.'),
        p('It’s not a solution. It’s just a start.'),
        p('But when Renz asks, "Can you send me that fact-check thing? The Vera Files one?" you feel something shift.'),
        p('Not hope, exactly. But something close.'),
        p('"Yeah, Kuya. I will."'),
        p('The dishes still need washing. The laundry still needs folding. The world outside is still full of fake videos and phishing emails and systems designed to manipulate them.'),
        p('But for now, at this table, they’re trying.'),
        p('<em>The fan keeps turning.</em>'),
        p('And maybe that’s enough.'),
    ],
    next: 's10_intro',
});

/* ---------------------------------------------------------------------
   Scene 10 — The Reckoning Call
--------------------------------------------------------------------- */

P('s10_intro', {
    scene: 's10',
    body: [
        p('Saturday morning. Your room is quiet.'),
        p('No crisis. No urgent message. No family waiting for you to explain something. Just you, the phone, and the weight of everything you learned this week.'),
        p('You sit on your bed, back against the wall, phone in your lap. The screen is open to your call history.'),
        p('<strong>Blocked numbers: 6.</strong> You scroll. Each one a small decision. Each one a moment where you chose to stop something from reaching you again.'),
        p('<strong>Deleted messages: 23.</strong> Spam, phishing, fake invoices, urgent requests from people who were never who they said they were.'),
        p('<strong>Reported posts: 4.</strong> The deepfake senator video. The SIM registration scam. The fake DOH advisory. The miracle cure Tita Merly shared with seven heart emojis.'),
        p('Four times you clicked <em>Report.</em> Four times the platform said <em>"Thank you for keeping Facebook safe."</em>'),
        p('You know nothing will happen.'),
    ],
    next: 's10_list',
});

P('s10_list', {
    body: [
        p('You open Notes. Your thumbs hover over the keyboard.'),
        p('You start typing.'),
        callout('Things I learned about scams this week', `
            1. If it’s urgent, it’s probably fake.<br />
            2. If it asks for personal info, pause.<br />
            3. Check the URL before clicking.<br />
            4. If the family GC agrees too quickly, someone should verify.<br />
            5. If a video makes me angry, that’s by design.<br />
            6. If my feed knows me too well, it’s using me.<br />
            7. If a voice sounds perfect, it might not be human.<br />
            8. If I feel stupid for questioning, that’s the manipulation working.`),
        p('You read it back. Eight rules. Eight things you didn’t know two weeks ago.'),
        p('<em>What do you do with this?</em>'),
    ],
    next: 's10_options',
});

P('s10_options', {
    body: [
        p('The list sits there on your screen. Private knowledge. <em>Hard-won.</em>'),
        p('You could keep it to yourself — a personal checklist. Safe. Silent.'),
        p('Or you could share it. Post it to Facebook. Make it public. Maybe someone else sees it and recognizes the shape of something they almost fell for.'),
        p('Or maybe people call you paranoid. Maybe your timeline fills with comments like <em>"Not everything is a scam, Maya."</em>'),
        p('You could send it to the family group chat. Keep them thinking about verification. Build on Mama’s question from last night.'),
        p('Or maybe they’re tired of your lessons. Maybe it becomes the thing your family jokes about.'),
        p('You could keep it private. Just for you. A reminder.'),
        p('But then what was the point of learning any of this if you’re the only one who knows?'),
    ],
    next: 's10_curate',
});

P('s10_curate', {
    body: [
        p('You open Instagram. Your feed is… quieter than it used to be. You unfollowed 40 accounts this week. Influencers who made you feel behind. Brands that knew too much. Pages that turned every scroll into an itch.'),
        p('What’s left: friends, family, three food bloggers, a cat account.'),
        p('But even that feels heavy. The pull to open the app. The muscle memory.'),
        p('You could delete everything. Instagram, Facebook, TikTok. Gone. Clean phone. No feed. No ads. No algorithm.'),
        p('Immediate relief. <em>And immediate isolation.</em>'),
        p('No more client leads — half your freelance work comes from Instagram DMs. No more family updates — your titas only post on Facebook. No more barkada memes.'),
        p('Or you could keep the accounts. Change your habits. Set screen time limits. Turn off notifications. Curate harder.'),
        p('That option sounds good in theory. In practice, it sounds <em>exhausting.</em>'),
        p('You open Screen Time. Set a 30-minute daily limit on Instagram. Turn off all notifications except DMs.'),
        p('It feels like putting a lock on a door you’ll just find the key to later.'),
        p('You save the note. Title it: <strong>For when I forget.</strong>'),
        p('You put the phone face-down.'),
        p('Then pick it up.'),
        p('You add one more line to the list:'),
        callout('Rule 9', '<strong>This is the work now. Forever.</strong>'),
        p('You lock the phone. Set it face-down.'),
        p('Doesn’t feel like winning.'),
        p('<em>Feels like knowing.</em>'),
        p('And knowing doesn’t fix anything. It just makes you responsible for what happens next.'),
    ],
    next: 's11_intro',
});

/* ---------------------------------------------------------------------
   Scene 11 — The Echo
--------------------------------------------------------------------- */

P('s11_intro', {
    scene: 's11',
    body: [
        p('You wake. Phone on nightstand. Screen dark.'),
        p('You reach for it. <em>Muscle memory.</em>'),
        p('Notifications: 3. Family GC, Family GC, Family GC.'),
        p('You unlock.'),
        notif('Tita Merly · 6:47 AM', '<strong>"BREAKING:</strong> New COVID variant detected in Metro Manila! DOH issues urgent advisory. Symptoms different from previous strains. Please read and share! 🙏🚨" · [link: doh-advisory-ph.com/covid-variant-alert]'),
        p('You stare at the message.'),
        p('You know this shape.'),
        p('Urgency: check. Authority invoked: check. Fear trigger: check. Tita Merly: check.'),
        p('One week ago, you sat with your family. Explained verification. Showed them the fact-check sites. Mama said she understood.'),
        p('<strong>Seven days.</strong>'),
        aside('The same morning, two possible weeks. Pick the one you want to live in.'),
    ],
    choices: [
        { label: 'It turns out to be fake', target: 's11_fake' },
        { label: 'It turns out to be real', target: 's11_real' },
    ],
});

P('s11_fake', {
    body: [
        p('You don’t click the link. You copy it. Open Chrome. Paste into Google.'),
        p('First result: <em>"doh-advisory-ph.com — FAKE SITE. Not affiliated with Department of Health."</em>'),
        p('Second result: Vera Files fact-check, posted 40 minutes ago. The variant story is fabricated.'),
        p('You screenshot the fact-check. Return to Family GC.'),
        chat('Santos Family GC', [
            r('You', 'This is fake po. The real DOH website is doh.gov.ph, not doh-advisory-ph.com. Here’s the fact-check. [screenshot]'),
        ]),
        p('You wait.'),
        chat('Santos Family GC', [
            r('Tita Merly', 'Maya naman. Why are you always so negative? I’m just trying to keep the family informed. You always think everything is fake.'),
            r('Tito Ben', 'Let’s not fight in the GC.'),
            r('Mama', '❤️'),
        ]),
        p('You lock your phone. Set it on the nightstand. Stare at the ceiling.'),
        p('You were right. <em>Again.</em>'),
        p('It doesn’t feel like winning.'),
        p('Tita Merly will share another link tomorrow. Or Monday. Or in three hours.'),
        p('<em>This is your life now: the checker. The skeptic. The negative one.</em>'),
    ],
    next: 's11_converge',
});

P('s11_real', {
    body: [
        p('You don’t click the link. You copy it. Open Chrome. Paste into Google.'),
        p('First result: Official Department of Health press release, doh.gov.ph, posted 6:30 AM.'),
        p('"New COVID-19 Variant of Interest Detected in NCR — Public Advisory."'),
        p('Second result: Rappler news article, 6:45 AM. AP newswire confirmation.'),
        p('Third result: WHO statement.'),
        p('Your stomach drops.'),
        p('<strong>It’s real.</strong>'),
        p('Your first instinct was to assume it was fake. You almost didn’t check. You almost scrolled past and let your family stay uninformed.'),
        p('What if it had been urgent? What if you’d dismissed it as noise?'),
        p('You return to the Family GC.'),
        chat('Santos Family GC', [
            r('You', 'I checked. This one is real. The link goes to a credible site and DOH confirmed it this morning. Good share, Tita.'),
            r('Tita Merly', 'See! I told you. You always doubt me.'),
        ]),
        p('You stare at that message.'),
        p('You want to say: <em>"Because you share fake things constantly."</em>'),
        p('You type: <em>"Not doubting you po, just being careful."</em>'),
        p('Delete it.'),
        p('Type: <em>"I’m just trying to verify before sharing further."</em>'),
        p('Delete it.'),
        p('Type nothing.'),
        p('Your skepticism almost made you miss a real public health alert. Your verification reflex now makes you second-guess actual truth.'),
        p('There’s no calibration that works.'),
        p('Trust everything: you get scammed.<br />Trust nothing: you miss reality.<br />Verify everything: you’re exhausted and relationships fray.'),
    ],
    next: 's11_converge',
});

P('s11_converge', {
    body: [
        p('You close the GC. Open it again. Three more messages appeared. Someone’s birthday. Tita Merly posting a prayer chain.'),
        p('You want to mute the group.'),
        p('You don’t.'),
        p('You put the phone down. Screen off.'),
        p('Seven seconds later: notification sound.'),
        p('You don’t look.'),
        p('Ten seconds: you look.'),
        p('It’s 7:14 AM.'),
        p('Twelve minutes since you woke up.'),
        p('You haven’t gotten out of bed.'),
        div(),
        p('This is the echo. The same scene, slightly different text, infinite loop.'),
        p('<em>The wheel turns.</em>'),
        p('Tita Merly shares.'),
        p('You verify.'),
        p('The family chat goes on.'),
        p('<strong>Forever.</strong>'),
    ],
    next: 's12_compute',
});

/* ---------------------------------------------------------------------
   Scene 12 — The Endings
--------------------------------------------------------------------- */

P('s12_compute', {
    branch: { compute: 'ending' },
});

P('s12_protector', {
    scene: 's12',
    body: [
        endhead('Ending A', 'The Protector'),
        p('Your phone: face-up on the desk. Six notifications. You don’t reach for it.'),
        p('Two weeks since everything happened. The family GC is quieter now. Not dead — just careful. Messages come slower. Questions get asked twice. Links get verified before anyone clicks.'),
        p('Last night, Kuya Renz sent you a screenshot in your private chat: <em>"Legit ba ‘to? May promo daw sa Mercury Drug."</em>'),
        p('You checked. It wasn’t.'),
        p('He sent back a thumbs-up emoji. No <em>"Thank you ate,"</em> no fuss. Just acknowledgment. <em>This is what protection looks like now</em> — small, constant, invisible.'),
        p('Your feed is empty most mornings. You unfollowed the accounts that made you feel like you were missing something. What’s left: three cousins who post baby photos. A college friend’s food blog. Silence.'),
        p('It feels like standing in a room after everyone left. Not lonely — just alone.'),
        p('Your mother texted this morning: <em>"Maya, pabili nga ng nescafe sa grabmart. Thank u anak. God bless."</em> Three messages. One request. The old Mama would’ve sent it as one long paragraph with five emojis.'),
        p('You taught her to text like this. <em>Clear. Intentional. Checkable.</em>'),
        p('The cost was speed. The gain was trust.'),
        p('Your cousin Jen sent a message yesterday: <em>"Ate, may nag-message sa akin from BDO daw. Nag-click na ba ako? Natatakot ako."</em> You walked her through it. Twenty minutes on voice call.'),
        p('You hung up and stared at your ceiling for an hour. <em>Proud. Tired. Alone.</em>'),
    ],
    next: 's12_final',
});

P('s12_withdrawn', {
    scene: 's12',
    body: [
        endhead('Ending B', 'The Withdrawn'),
        p('Your phone is a weapon you disarmed by removing all the bullets.'),
        p('No apps. No accounts. Just a device that makes calls and receives texts. The scammers can’t reach you here. <em>Neither can anyone else.</em>'),
        p('Two weeks since you left the family GC. No explanation. No goodbye. <em>Just gone.</em>'),
        p('Mama texts you every day. Inspirational quotes. Photos of food. <em>"Good morning anak."</em> Messages that don’t require responses. You wonder if Mama knows. If the one-way broadcasts are intentional.'),
        p('You don’t reply. Don’t know how to start.'),
        p('Your screen time is down to fifteen minutes a day. Mostly accidental. Checking the time. Declining spam calls.'),
        p('The silence is total. No notifications. No updates. No endless scroll. You used to think that would feel like peace.'),
        p('<em>It feels like a void.</em>'),
        p('You went to the grocery store yesterday. Stood in line behind a woman on a video call, laughing with someone far away. You felt like you were watching from outside a window. <em>Present but separate. Safe but severed.</em>'),
        p('You wonder if you went too far. If the cure was worse than the disease.'),
        p('But the alternative was chaos. Links that could ruin you. Messages that weaponized urgency. A family GC where every click was a gamble and you were the only one counting cards.'),
        p('You couldn’t do it anymore.'),
        p('So you left. <em>And now you’re safe.</em>'),
        p('And now you’re alone.'),
    ],
    next: 's12_final',
});

P('s12_wounded', {
    scene: 's12',
    body: [
        endhead('Ending C', 'The Wounded'),
        p('Your phone buzzes. <em>Your heart jumps.</em>'),
        p('Every time. Two weeks later. Still.'),
        p('Fourteen notifications. You’re afraid to check them. Afraid one of them is real. Afraid one of them isn’t.'),
        p('<strong>₱8,900.</strong> That’s what the scams cost you. Three separate traps. Three clicks you can’t take back.'),
        p('Mama lent you money to cover rent. Didn’t ask questions. Just transferred it with a message: <em>"Pay me back when you can, anak. No rush."</em>'),
        p('You cried for an hour.'),
        p('You’re more careful now. Check every link. Read every message twice. Hover your thumb over buttons and make yourself wait.'),
        p('But careful feels like fear. <em>And fear feels like drowning in shallow water.</em>'),
        p('Last night, your bank sent a legitimate security alert. You stared at it for ten minutes. Googled the number. Called the bank directly. Verified everything twice.'),
        p('It was real. <em>You still didn’t trust it.</em>'),
        p('Your phone used to be a door to the world. Now it’s a minefield. Every notification a potential trap. Every message a test you’ve already failed before.'),
        p('You remember the GCash scam. The racing heart. The sick certainty. The click.'),
        p('You remember all of them.'),
        p('<em>You’re still paying.</em>'),
    ],
    next: 's12_final',
});

P('s12_realist', {
    scene: 's12',
    body: [
        endhead('Ending D', 'The Realist'),
        p('Your phone: nine notifications. You check them over coffee.'),
        p('Two are real. Three are spam. Four are from the family GC — memes, sales, a prayer request.'),
        p('You caught the spam. Almost clicked one of the sales. Stopped yourself. Asked Kuya Renz to check it first.'),
        p('It was fake. <em>Close call.</em>'),
        p('Two weeks since everything shifted. You’re different now. Not perfect. Just… careful-er.'),
        p('The family GC is still chaos, but manageable chaos. Tita Carmen still forwards everything. But now, before anyone clicks, someone asks. Usually you. Sometimes Renz. Once, even Mama.'),
        p('Small progress. <em>Fragile.</em>'),
        p('Yesterday, a legitimate promo came through. You verified it, shared it, and three cousins bought stuff. Everyone saved money. No one got scammed.'),
        p('It felt like winning. <em>Tiny. Real.</em>'),
        p('Your feed is smaller now. You unfollowed the accounts that made you feel bad — the influencers selling urgency, the pages optimized for rage. Kept the ones that felt human.'),
        p('The difference is subtle. But it’s there.'),
        p('You still make mistakes. Last week, you almost clicked a phishing email. Caught it at the last second. Felt your heart race. Laughed at yourself after.'),
        p('Learning in real time. <em>No safety net.</em>'),
        p('The next scam is coming. You know that too. The game doesn’t end.'),
        p('<strong>But you’re playing now. Not just reacting.</strong>'),
    ],
    next: 's12_final',
});

P('s12_final', {
    body: [
        p('I used to think the internet was a tool. Then I thought it was a weapon. Now I know it’s both, and the difference depends on who’s holding it and what they know.'),
        p('I’m still figuring out what I know.'),
        p('My phone is in front of me. Some unread notifications. I’ll check them in a minute.'),
        p('Or maybe I won’t.'),
        p('That choice — that tiny, constant choice — is the only power I have.'),
        p('It’s not much.'),
        p('<em>But it’s mine.</em>'),
        final(),
    ],
});

/* ---- exports ---- */
window.BLACKGLASS = { SCENES, PASSAGES, START: 's1_morning' };
