export type Preset = "conservative" | "standard" | "aggressive" | "ultra";

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
  const ultra: Array<[RegExp, string]> = [
    [/\bwhat I mean is\b/gi, ""],
    [/\bthe thing is\b/gi, ""],
    [/\bwhat I'm saying is\b/gi, ""],
    [/\bif you will\b/gi, ""],
    [/\bas it were\b/gi, ""],
    [/\byou know\b/gi, ""],
    [/\bI mean\b/gi, ""],
    [/\byou see\b/gi, ""],
    [/\bof course\b/gi, ""],
    [/\bas you know\b/gi, ""],
    [/\bit likely that\b/gi, "likely"],
    [/\bfor all intents and purposes\b/gi, ""],
    [/\bmake sure to\b/gi, "must"],
    [/\bkeep in mind that\b/gi, ""],
    [/\bwhen it comes to\b/gi, "for"],
    [/\bprior to\b/gi, "before"],
    [/\bsubsequent to\b/gi, "after"],
    [/\bin the event that\b/gi, "if"],
    [/\bwith regard to\b/gi, "about"],
    [/\bin terms of\b/gi, "for"],
    [/\bin the case of\b/gi, "for"],
    [/\bin the context of\b/gi, "in"],
    [/\bwith respect to\b/gi, "for"],
    [/\bin relation to\b/gi, "about"],
    [/\bas far as\b/gi, "for"],
    [/\bmore often than not\b/gi, "usually"],
    [/\bat this point in time\b/gi, "now"],
    [/\bin the near future\b/gi, "soon"],
    [/\bat the present time\b/gi, "now"],
  ];
  if (preset === "conservative") return base;
  if (preset === "standard") return base.concat(standard);
  if (preset === "aggressive") return base.concat(standard, aggressive);
  return base.concat(standard, aggressive, ultra);
}

