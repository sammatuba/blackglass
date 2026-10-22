import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ScrollProgress, ScrollySection } from './scrolly'
import {
  DEFAULT_DIAL,
  FEED_DAYS,
  capToHalveConflict,
  simulateFeed,
  type FeedDialInputs,
} from './feed-model'
import { CapStage, DialStage, FeedLineStage, WeeksStage } from './feed-stages'
import { formatPercent } from './format'

/* GLASSBOX 02 — the attention loop behind FIVE WEEKS.

   Bea's drift is not a scam and not a lie. It is a ranking system
   paying creators for what holds a thumb. The reader sets the weights,
   watches thirty-five days of supply adapt, then caps the winning genre
   and discovers that making room is not the same as paying for context. */

function SceneHead({
  index,
  kicker,
  title,
  id,
  children,
}: {
  index: string
  kicker: string
  title: string
  id: string
  children?: ReactNode
}) {
  return (
    <header className="scene-head">
      <p className="scene-kicker">
        <span>{index}</span> · {kicker}
      </p>
      <h2 id={id} className="scene-title">
        {title}
      </h2>
      {children && <p className="scene-intro">{children}</p>}
    </header>
  )
}

function PayoutSlip() {
  return (
    <div className="paper-slip hero-slip feed-slip">
      <div className="call-head">
        <p>Account · @beareyes.ph</p>
        <span className="paper-stamp">five weeks</span>
      </div>
      <p className="feed-slip-label">What the feed paid</p>
      <dl className="feed-slip-rows">
        <div>
          <dt>Followers</dt>
          <dd>1,247 → 2,547</dd>
        </div>
        <div>
          <dt>Engagement</dt>
          <dd>+52%</dd>
        </div>
        <div>
          <dt>One lie</dt>
          <dd>none</dd>
        </div>
      </dl>
      <p className="call-quote">“The careful version is true. The sharp version is shareable.”</p>
      <p className="call-note">No single week was a lie.</p>
    </div>
  )
}

export default function TheFeedDial() {
  const [inputs, setInputs] = useState<FeedDialInputs>(() => ({ ...DEFAULT_DIAL }))
  const result = useMemo(() => simulateFeed(inputs), [inputs])
  const capHalf = useMemo(() => capToHalveConflict(inputs), [inputs])

  useEffect(() => {
    document.title = 'The Feed Dial · Glassbox · BLACKGLASS'
  }, [])

  const update = (patch: Partial<FeedDialInputs>) => setInputs((current) => ({ ...current, ...patch }))

  const openFeed = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document
      .getElementById('feed')
      ?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <div className="desk-scene min-h-dvh">
      <ScrollProgress />
      <main className="relative z-10">
        <header className="hero-shell" data-od-id="feed-hero">
          <div className="hero-top">
            <Link to="/" className="text-sm text-ink-400 transition-colors hover:text-ink-100">
              ‹ Hub
            </Link>
            <p className="text-2xs font-semibold uppercase tracking-[0.25em] text-ink-400">
              Glassbox · LEARN
            </p>
          </div>

          <div className="hero-grid">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-learn">
                Glassbox 02 · take it apart
              </p>
              <h1 className="hero-title mt-4">The feed dial</h1>
              <p className="hero-deck">Five weeks. One feed. No lie.</p>
              <p className="hero-copy">
                Bea can name every mechanism of capture. She teaches them for a living. Then she opens
                her phone and scrolls the way she always does after a long document review.
              </p>
              <p className="hero-copy">
                The feed never argues with her. It pays her — a little — each time the sharp version
                beats the careful one. This is the dial behind the drift.
              </p>
              <ul className="hero-chips">
                <li>6 minutes</li>
                <li>No score</li>
                <li>Illustrative model</li>
              </ul>
            </div>
            <PayoutSlip />
          </div>

          <div className="hero-scroll">
            <button type="button" onClick={openFeed}>
              Scroll to open the feed <span aria-hidden="true">↓</span>
            </button>
          </div>
        </header>

        <ScrollySection
          id="feed"
          labelledBy="feed-title"
          header={
            <SceneHead index="01" kicker="The feed" title="A lineup, not an argument." id="feed-title">
              One Tuesday night in Bea&apos;s feed. Nothing here is false. The order is the argument.
            </SceneHead>
          }
          stage={(active) => <FeedLineStage active={active} />}
          steps={[
            <div key="lineup">
              <h3 className="step-title">The lineup</h3>
              <p className="step-copy">
                Four posts. A local follow-up, a careful thread, a demo, a quote-post. The feed
                does not show Bea everything. It shows her a ranking.
              </p>
            </div>,
            <div key="careful">
              <h3 className="step-title">The careful post</h3>
              <p className="step-copy">
                The reporter followed the number to its source. Bea kept the caveats in her thread.
                Six likes and twenty-three. They inform her; they do not move her thumb.
              </p>
              <p className="step-aside">The feed notices what she does, not what she values.</p>
            </div>,
            <div key="sharp">
              <h3 className="step-title">The sharp post</h3>
              <p className="step-copy">
                A quote-post calling someone a coward. Twelve hundred likes. It moves her, and it
                earns the next slot.
              </p>
            </div>,
            <div key="loop">
              <h3 className="step-title">The loop</h3>
              <p className="step-copy">
                A click is not a vote for this post. It is a vote for the next thousand like it. The
                feed is not persuading Bea. It is learning what persuasion pays.
              </p>
              <p className="step-aside">Nothing in the lineup is a lie. The ranking is the argument.</p>
            </div>,
          ]}
        />

        <ScrollySection
          id="dial"
          labelledBy="dial-title"
          header={
            <SceneHead index="02" kicker="The dial" title="What gets paid gets made." id="dial-title">
              Creators are not villains in this model. They are people watching the same numbers. Set
              the weights and the supply follows.
            </SceneHead>
          }
          stage={(active) => (
            <DialStage active={active} inputs={inputs} result={result} onChange={update} />
          )}
          steps={[
            <div key="conflict">
              <h3 className="step-title">Conflict</h3>
              <p className="step-copy">
                The strongest click. Not because it is true — because it is cheap to feel. The
                ranking sells reach; creators make more of what sells.
              </p>
              <p className="step-aside">Drag the dial. The week-five projection moves with it.</p>
            </div>,
            <div key="novelty">
              <h3 className="step-title">Novelty</h3>
              <p className="step-copy">
                The second strongest. New and strange buys attention. It does not buy the follow-up,
                the correction, or the part that makes the story usable.
              </p>
            </div>,
            <div key="context">
              <h3 className="step-title">Context</h3>
              <p className="step-copy">
                The weakest click. Verification, follow-up, the boring middle of the story. The feed
                will not make more of it unless someone pays.
              </p>
              <p className="step-aside">
                Awareness does not make context competitive. A different scoreboard might.
              </p>
            </div>,
            <div key="projection">
              <h3 className="step-title">The projection</h3>
              <p className="step-copy">
                These weights, held for five weeks, are the feed Bea gets. The dial is not a mood. It
                is an incentive, and it compounds.
              </p>
              <p className="step-aside">
                Set conflict to zero and watch novelty inherit the room. A vacuum is not a defense.
              </p>
            </div>,
          ]}
        />

        <ScrollySection
          id="weeks"
          labelledBy="weeks-title"
          header={
            <SceneHead index="03" kicker="Five weeks" title="The drift is the sum." id="weeks-title">
              No single day is the story. Watch what thirty-five days of the same incentive add up
              to.
            </SceneHead>
          }
          stage={(active) => <WeeksStage active={active} result={result} />}
          steps={[
            <div key="day-one">
              <h3 className="step-title">Day one</h3>
              <p className="step-copy">
                The feed starts mixed: about a third conflict, a third new, a third context. Nobody
                chooses the end state. Nobody has to.
              </p>
            </div>,
            <div key="week-two">
              <h3 className="step-title">Week two</h3>
              <p className="step-copy">
                The sharp posts get the clicks. Creators follow the clicks. The mix moves before Bea
                notices; nothing in her routine has changed.
              </p>
            </div>,
            <div key="week-four">
              <h3 className="step-title">Week four</h3>
              <p className="step-copy">
                The careful sources are still there, below the fold. The feed feels faster, clearer,
                more certain. It feels like her.
              </p>
            </div>,
            <div key="week-five">
              <h3 className="step-title">Week five</h3>
              <p className="step-copy">
                She teaches a room to distrust the sources that confirm them. She has spent five weeks
                trusting hers. No single week was a lie.
              </p>
              <p className="step-aside">The drift is the sum of small, rational choices.</p>
            </div>,
          ]}
        />

        <section className="interlude" aria-labelledby="interlude-title">
          <div className="interlude-dots" aria-hidden="true">
            <span className="interlude-paid" />
          </div>
          <div className="interlude-inner scroll-reveal">
            <p className="scene-kicker">What the feed pays</p>
            <h2 id="interlude-title" className="interlude-title">
              No step was a lie. The sum is a stranger.
            </h2>
            <p className="interlude-copy">
              The feed never argued with Bea. It paid her — a little — each time she chose the sharp
              version over the careful one, until sharp felt like clarity and clarity felt like her.
            </p>
            <p className="interlude-copy interlude-copy-short">
              Drift is not a moment. It is an interest rate.
            </p>
          </div>
        </section>

        <ScrollySection
          id="cap"
          labelledBy="cap-title"
          header={
            <SceneHead index="04" kicker="The defense" title="Change what the dial pays for." id="cap-title">
              You cannot out-scroll the loop. You can change its objective — and pay the price the
              scoreboard sees.
            </SceneHead>
          }
          stage={() => (
            <CapStage inputs={inputs} result={result} capHalf={capHalf} onChange={update} />
          )}
          steps={[
            <div key="cap">
              <h3 className="step-title">The cap</h3>
              <p className="step-copy">
                Limit the reach conflict can buy. The first thing you notice: conflict falls. The
                second: novelty takes the room.
              </p>
            </div>,
            <div key="missing-half">
              <h3 className="step-title">The missing half</h3>
              <p className="step-copy">
                A cap makes space. It does not pay for context. Turn on the context payment and watch
                what fills the room.
              </p>
              <p className="step-aside">Making room is not the same as paying for what you want.</p>
            </div>,
            <div key="trade">
              <h3 className="step-title">The trade</h3>
              <p className="step-copy">
                With both, the default dial turns context into the largest genre and conflict loses
                the week. Clicks fall. A feed can be better for Bea and worse for the number the
                platform reports.
              </p>
              <p className="step-aside">That is not a bug in the model. It is the choice.</p>
            </div>,
            <div key="limit">
              <h3 className="step-title">The limit</h3>
              <p className="step-copy">
                Bea cannot scroll her way out of a business model. The dial belongs to the platform.
                The defense is asking who sets it, and what it is paid to count.
              </p>
              <p className="step-aside">Awareness is not immunity. Neither is willpower.</p>
            </div>,
          ]}
        />

        <section className="close-shell" aria-labelledby="close-title" data-od-id="feed-debrief">
          <div className="scroll-reveal">
            <p className="scene-kicker">What the dial says</p>
            <h2 id="close-title" className="scene-title">
              The feed never argued. It paid.
            </h2>
          </div>

          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            <li className="scroll-reveal rounded-card border border-ink-700 bg-ink-800/60 p-4">
              <p className="text-sm font-semibold text-ink-200">No post had to be a lie.</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-400">
                Every item in Bea&apos;s feed was real. The mix was the message — and the mix was
                manufactured.
              </p>
            </li>
            <li className="scroll-reveal rounded-card border border-ink-700 bg-ink-800/60 p-4">
              <p className="text-sm font-semibold text-ink-200">A click is a vote for more.</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-400">
                The ranking does not learn what Bea believes. It learns what keeps her there — then
                pays creators to make more of it.
              </p>
            </li>
            <li className="scroll-reveal rounded-card border border-ink-700 bg-ink-800/60 p-4">
              <p className="text-sm font-semibold text-ink-200">
                You cannot scroll out of a business model.
              </p>
              <p className="mt-1 text-sm leading-relaxed text-ink-400">
                A cap changes what the feed sells. A reader&apos;s willpower does not. The dial has an
                owner.
              </p>
            </li>
          </ul>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Link
              to="/blackglass"
              className="scroll-reveal group rounded-card border border-ink-700 bg-ink-800/60 p-4 transition-colors hover:border-play/60"
            >
              <p className="text-sm font-semibold text-ink-100">
                Live five weeks on Bea&apos;s phone →
              </p>
              <p className="mt-1 text-sm leading-relaxed text-ink-400">
                Open the anthology and pick FIVE WEEKS / One Feed. The model is the part she never
                sees.
              </p>
            </Link>
            <Link
              to="/glassbox/one-in-a-thousand"
              className="scroll-reveal group rounded-card border border-ink-700 bg-ink-800/60 p-4 transition-colors hover:border-learn/60"
            >
              <p className="text-sm font-semibold text-ink-100">Run the scam ledger →</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-400">
                Glassbox 01: why a call that almost never works still pays for itself.
              </p>
            </Link>
          </div>

          <details className="mt-8 rounded-card border border-ink-700 bg-ink-800/60 p-5">
            <summary className="cursor-pointer text-sm font-semibold text-ink-200">Show the model</summary>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink-400">
              <p className="font-mono text-[12px] leading-relaxed break-words text-ink-300">
                clicks/day = 60 × Σ (supply share × click-through rate)
              </p>
              <p>
                Each genre&apos;s payoff is its click rate times its weight (conflict also times the
                cap). Creators target the softmax of four times those payoffs, and each day move{' '}
                {Math.round(0.12 * 100)}% of the way there. The feed runs for {FEED_DAYS} days.
              </p>
              <p>
                Click-through rates are round, illustrative figures: conflict{' '}
                {formatPercent(0.22, 0)}, novelty {formatPercent(0.13, 0)}, context{' '}
                {formatPercent(0.06, 0)}. They are not estimates of any real platform.
              </p>
              <p>
                The cap reduces conflict&apos;s ranking boost. It does not remove conflict. The
                context payment raises the context boost to 2.5× — a choice to pay for something the
                click does not reward.
              </p>
              <p>
                Not modeled: ad auctions, notifications, social pressure, creator costs, platform
                policy, offline context, or what Bea actually believes. This is a defense model, not
                a forecast.
              </p>
              <p>Fictional people and sources. No real targets, channels, scripts, or tools.</p>
            </div>
          </details>

          <footer className="mt-10 border-t border-ink-800 pt-5 text-2xs leading-relaxed text-ink-400">
            <p>Glassbox is a model, not a forecast. No real targets, channels, scripts, or tools.</p>
            <p className="mt-1">
              <span className="text-ink-300">BLACKGLASS</span> · Glassbox 02 · take it apart
            </p>
          </footer>
        </section>
      </main>
    </div>
  )
}
