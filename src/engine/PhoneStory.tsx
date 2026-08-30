import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import type { Beat, Choice, ChoiceOption, ChoiceValue, PhoneDef } from './types'
import {
  BeatView,
  ChoiceBlock,
  ChosenMarker,
  ContinueFooter,
  DeviceChip,
  EndFooter,
  FrameView,
  StatusBar,
} from './components'
import { isEndBeat, mergeSet, nextFrame, type StoryState } from './state'

/**
 * Drives one phone's `flow`: frames advance on Continue, choices reveal
 * their consequence beats inline, completion fires when the flow ends
 * or is exhausted. Pure presentation lives in components.tsx.
 */
export function PhoneStory({
  phone,
  state,
  onSet,
  onComplete,
  onBack,
  endLabel = 'Back',
}: {
  phone: PhoneDef
  state: StoryState
  /** record `set` values (frame or choice level) into story state */
  onSet?: (set: Record<string, ChoiceValue>) => void
  /** end beat reached or flow exhausted */
  onComplete: (phoneId: string) => void
  onBack?: () => void
  endLabel?: string
}) {
  const [frameIdx, setFrameIdx] = useState<number>(() => nextFrame(phone.flow, 0, state) ?? phone.flow.length)
  const [picked, setPicked] = useState<{ choice: Choice; option: ChoiceOption } | null>(null)
  const screenRef = useRef<HTMLDivElement>(null)

  const frame = phone.flow[frameIdx]
  const flowDone = frameIdx >= phone.flow.length
  const hasEnd = useMemo(
    () => !!frame?.beats.some((b) => isEndBeat(b as { t: string })),
    [frame],
  )

  // announce new message-like beats to screen readers
  const spoken = useMemo(() => {
    if (!frame) return ''
    const parts: string[] = []
    for (const b of frame.beats) {
      const bb = b as Beat & { text?: string; app?: string; who?: string }
      if (bb.t === 'msg' || bb.t === 'compose' || bb.t === 'narr') parts.push(bb.text?.toString() ?? '')
      if (bb.t === 'notif') parts.push(`${bb.app}: ${bb.text}`)
      if (bb.t === 'call') parts.push(`incoming call from ${bb.who}`)
    }
    return parts.join(' — ')
  }, [frame])

  // apply frame-level sets + reset scroll once per frame
  useEffect(() => {
    if (frame?.set) onSet?.(frame.set)
    screenRef.current?.scrollTo({ top: 0 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frameIdx])

  const finish = () => onComplete(phone.id)

  if (flowDone || !frame) {
    return (
      <DeviceShell phone={phone} onBack={onBack}>
        <EndFooter phone={phone} backLabel={endLabel} onBack={finish} />
      </DeviceShell>
    )
  }

  function advance() {
    setPicked(null)
    const next = nextFrame(phone.flow, frameIdx + 1, state)
    if (next == null) {
      setFrameIdx(phone.flow.length)
      finish()
    } else {
      setFrameIdx(next)
    }
  }

  return (
    <DeviceShell phone={phone} onBack={onBack}>
      <div ref={screenRef} className="min-h-0 flex-1 overflow-y-auto">
        <FrameView phone={phone} frame={frame}>
          {picked ? (
            <>
              <div className="pt-1">
                <ChosenMarker verb={picked.choice.verb} label={picked.option.label} />
              </div>
              {(picked.option.say ?? []).map((b, i) => (
                <BeatView key={i} beat={b} />
              ))}
              <ContinueFooter label="Continue" onNext={advance} />
            </>
          ) : frame.choice ? (
            <div className="pt-2">
              <ChoiceBlock
                choice={frame.choice}
                onChoose={(i) => {
                  const option = frame.choice!.options[i]
                  if (option.set) onSet?.(option.set)
                  setPicked({ choice: frame.choice!, option })
                }}
              />
            </div>
          ) : hasEnd ? (
            <EndFooter phone={phone} backLabel={endLabel} onBack={finish} />
          ) : (
            <ContinueFooter label={frame.continueLabel ?? 'Continue'} onNext={advance} />
          )}
        </FrameView>
      </div>
      <p aria-live="polite" className="sr-only">
        {spoken}
      </p>
    </DeviceShell>
  )
}

/** The phone device: status bar, chip, screen. */
export function DeviceShell({
  phone,
  onBack,
  children,
}: {
  phone: PhoneDef
  onBack?: () => void
  children: ReactNode
}) {
  const dim = phone.lock.brightness <= 30
  return (
    <div className="relative mx-auto w-full max-w-[400px] px-2 py-3">
      <div
        data-theme={phone.theme}
        className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b1220] shadow-[0_24px_80px_-24px_rgba(0,0,0,0.9)]"
      >
        <div className={dim ? 'opacity-90' : ''}>
          <StatusBar time={phone.lock.time} />
          <DeviceChip name={phone.name} verb={phone.verb} onBack={onBack} />
          <div className="flex h-[68dvh] min-h-[440px] flex-col">{children}</div>
        </div>
      </div>
    </div>
  )
}

// re-exported for convenience so games import one module
export { mergeSet }
