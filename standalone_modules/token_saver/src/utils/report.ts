export interface Estimate {
  chars: number;
  tokens: number;
  model: string;
  note?: string;
}

export function percentSaved(before: number, after: number): number {
  if (before <= 0) return 0;
  return Math.max(0, Math.min(100, Number(((before - after) / before) * 100).valueOf()));
}

export function makeReport(before: Estimate, after: Estimate, rulesTriggered: string[] = []) {
  return {
    chars_before: before.chars,
    tokens_before: before.tokens,
    chars_after: after.chars,
    tokens_after: after.tokens,
    percent_saved: percentSaved(before.tokens, after.tokens),
    model: after.model,
    note: after.note || before.note,
    rules_triggered: rulesTriggered
  };
}

