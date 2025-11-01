/**
 * Semantic Compression
 * 
 * Replaces verbose phrases with concise equivalents while preserving meaning.
 * This provides significant token savings on formal or verbose text.
 */

export interface SemanticCompressionResult {
  output: string;
  replacements: number;
}

const semanticReplacements: Array<[RegExp, string]> = [
  // Verb replacements
  [/\bperform an analysis of\b/gi, "analyze"],
  [/\bconduct a review of\b/gi, "review"],
  [/\bcarry out an examination of\b/gi, "examine"],
  [/\bundertake a study of\b/gi, "study"],
  [/\bcarry out\b/gi, "do"],
  [/\bperform\b/gi, "do"],
  [/\bconduct\b/gi, "do"],
  
  // Ability phrases
  [/\bhave the ability to\b/gi, "can"],
  [/\bis able to\b/gi, "can"],
  [/\bis capable of\b/gi, "can"],
  [/\bis in a position to\b/gi, "can"],
  [/\bhas the capacity to\b/gi, "can"],
  
  // Time phrases
  [/\bin the process of\b/gi, ""],
  [/\bat this point in time\b/gi, "now"],
  [/\bat the present time\b/gi, "now"],
  [/\bat this moment in time\b/gi, "now"],
  [/\bin the near future\b/gi, "soon"],
  [/\bat a later date\b/gi, "later"],
  
  // Prepositional phrases
  [/\bby means of\b/gi, "via"],
  [/\bin the vicinity of\b/gi, "near"],
  [/\bfor the purpose of\b/gi, "for"],
  [/\bin a timely manner\b/gi, "quickly"],
  [/\bwith the exception of\b/gi, "except"],
  [/\bin the case of\b/gi, "for"],
  [/\bin the context of\b/gi, "in"],
  [/\bwith respect to\b/gi, "for"],
  [/\bin relation to\b/gi, "about"],
  [/\bas far as\b/gi, "for"],
  
  // Redundant phrases
  [/\bmore often than not\b/gi, "usually"],
  [/\bthe majority of\b/gi, "most"],
  [/\ba number of\b/gi, "many"],
  [/\ba lot of\b/gi, "many"],
  [/\ba great deal of\b/gi, "much"],
  [/\ba large amount of\b/gi, "much"],
  [/\ba small number of\b/gi, "few"],
  
  // Unnecessary qualifiers
  [/\bvery much\b/gi, "much"],
  [/\bquite a lot\b/gi, "many"],
  [/\brather than\b/gi, "than"],
  
  // Common verbose constructions
  [/\bit is worth noting that\b/gi, ""],
  [/\bit should be noted that\b/gi, ""],
  [/\bit is important to remember that\b/gi, ""],
  [/\bit is essential to\b/gi, "must"],
  [/\bit is necessary to\b/gi, "must"],
  [/\bit is required to\b/gi, "must"],
];

export function applySemanticCompression(input: string): SemanticCompressionResult {
  let output = input;
  let replacements = 0;
  
  for (const [pattern, replacement] of semanticReplacements) {
    const before = output;
    output = output.replace(pattern, replacement);
    if (output !== before) {
      replacements++;
    }
  }
  
  return {
    output,
    replacements
  };
}

