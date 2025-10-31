export type Preset = "conservative" | "standard" | "aggressive";

// Patterns as tuples: [regex, replacement]
// Ordered from specific to general.
export function getPresetPatterns(preset: Preset): Array<[RegExp, string]> {
  const base: Array<[RegExp, string]> = [
    [/\bin order to\b/gi, "to"],
    [/\bdue to the fact that\b/gi, "because"],
    [/\bit'?s important to note( that)?\b/gi, ""],
    [/\bat the end of the day\b/gi, ""],
    [/^\s*I(?:\s+personally)?\s+think(?:\s+that)?\b/gi, ""],
  ];
  const standard: Array<[RegExp, string]> = [
    [/\bbasically\b,?\s*/gi, ""],
    [/\bactually\b,?\s*/gi, ""],
    [/\bsimply\b,?\s*/gi, ""],
    [/\bin fact\b,?\s*/gi, ""],
    [/\bneedless to say\b,?\s*/gi, ""],
    [/\bas you can see\b,?\s*/gi, ""],
    [/\bin a nutshell\b,?\s*/gi, ""],
    [/\bfor the most part\b,?\s*/gi, ""],
    [/\bthe truth is(?: that)?\b,?\s*/gi, ""],
    [/\bkind of\b\s*/gi, ""],
    [/\bsort of\b\s*/gi, ""],
  ];
  const aggressive: Array<[RegExp, string]> = [
    [/\bobviously\b,?\s*/gi, ""],
    [/\bliterally\b,?\s*/gi, ""],
    [/\bin my opinion\b,?\s*/gi, ""],
    [/\bto be honest\b,?\s*/gi, ""],
    [/\bIMO\b,?\s*/g, ""],
    [/\bTBH\b,?\s*/g, ""],
  ];
  if (preset === "conservative") return base;
  if (preset === "standard") return base.concat(standard);
  return base.concat(standard, aggressive);
}

