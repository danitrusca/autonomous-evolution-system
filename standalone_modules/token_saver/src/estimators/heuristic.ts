const CHAR_PER_TOKEN: Record<string, number> = {
  "gpt-4o-mini": 4.0,
  "gpt-4.1": 3.7,
  "claude-3.5": 3.8,
  "gemini-1.5": 3.9,
  "generic": 4.0
};

export interface EstimateOptions {
  model?: string;
  diffHeuristicBump?: boolean; // +15% for symbol-dense diffs when true
}

export function estimateTokensHeuristic(text: string, opts: EstimateOptions = {}) {
  const model = opts.model && CHAR_PER_TOKEN[opts.model] ? opts.model : "generic";
  const chars = text.length;
  const ratio = CHAR_PER_TOKEN[model];
  let tokens = Math.ceil(chars / ratio);
  let note: string | undefined;
  if (opts.diffHeuristicBump) {
    tokens = Math.ceil(tokens * 1.15);
    note = "Heuristic – Code Context";
  }
  return { chars, tokens, model, note } as const;
}

