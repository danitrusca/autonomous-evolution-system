export interface BridgeResult {
  chars: number;
  tokens: number;
  model: string;
}

export async function estimateWithTokenizer(text: string, model: string): Promise<BridgeResult | null> {
  try {
    // Lazy import; tolerate absence
    // @ts-ignore
    const mod = await import("tiktoken").catch(() => null);
    if (!mod) return null;
    const { encodingForModel } = mod as any;
    const enc = encodingForModel ? encodingForModel(model) : null;
    if (!enc) return null;
    const tokensArr = enc.encode(text);
    const tokens = tokensArr.length;
    enc.free?.();
    return { chars: text.length, tokens, model };
  } catch {
    return null;
  }
}

