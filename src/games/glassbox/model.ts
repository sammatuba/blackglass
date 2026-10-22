/* Glassbox 01 — the expected-value model behind the ledger.
   Illustrative rates, not a forecast. The shape is the lesson. */

export const PAYMENT_RATE = 0.1
export const VERIFY_BLOCK_RATE = 0.99

export interface ScamInputs {
  reach: number
  costPerMessage: number
  replyRate: number
  averageTake: number
  verifyShare: number
}

export interface ScamResult {
  replies: number
  payments: number
  gross: number
  cost: number
  profit: number
  paymentRate: number
  messagesPerPayment: number
  effectivePaymentRate: number
  breakEvenVerifyShare: number | null
}

export type PresetId = 'ai' | 'human'

export const PRESETS: Record<PresetId, ScamInputs> = {
  ai: { reach: 25_000, costPerMessage: 0.5, replyRate: 0.01, averageTake: 18_500, verifyShare: 0 },
  human: { reach: 400, costPerMessage: 8, replyRate: 0.005, averageTake: 18_500, verifyShare: 0 },
}

export function computeScam(input: ScamInputs): ScamResult {
  const replies = input.reach * input.replyRate
  const effectivePaymentRate = PAYMENT_RATE * (1 - input.verifyShare * VERIFY_BLOCK_RATE)
  const payments = replies * effectivePaymentRate
  const gross = payments * input.averageTake
  const cost = input.reach * input.costPerMessage
  const profit = gross - cost
  const paymentRate = input.replyRate * effectivePaymentRate
  const messagesPerPayment = paymentRate > 0 ? 1 / paymentRate : Number.POSITIVE_INFINITY

  let breakEvenVerifyShare: number | null
  if (input.replyRate <= 0 || input.averageTake <= 0) {
    breakEvenVerifyShare = 0
  } else if (input.replyRate * PAYMENT_RATE * input.averageTake <= input.costPerMessage) {
    breakEvenVerifyShare = 0
  } else {
    // profit = reach × (replyRate × PAYMENT_RATE × (1 − v·block) × take − cost)
    const allowedEffectiveRate = input.costPerMessage / (input.replyRate * input.averageTake)
    const v = (1 - allowedEffectiveRate / PAYMENT_RATE) / VERIFY_BLOCK_RATE
    breakEvenVerifyShare = v <= 1 ? Math.max(0, v) : null
  }

  return {
    replies,
    payments,
    gross,
    cost,
    profit,
    paymentRate,
    messagesPerPayment,
    effectivePaymentRate,
    breakEvenVerifyShare,
  }
}

/** A preset describes the machine, not the defense lever — verification can move freely. */
export function matchesPreset(input: ScamInputs, preset: ScamInputs): boolean {
  return (
    input.reach === preset.reach &&
    input.costPerMessage === preset.costPerMessage &&
    input.replyRate === preset.replyRate &&
    input.averageTake === preset.averageTake
  )
}
