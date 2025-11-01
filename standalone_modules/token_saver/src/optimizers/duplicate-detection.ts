/**
 * Duplicate Detection and Removal
 * 
 * Identifies and removes duplicate sentences and paragraphs while preserving structure.
 * Useful for verbose text with repeated explanations.
 */

export interface DuplicateDetectionResult {
  output: string;
  duplicatesRemoved: number;
}

/**
 * Remove duplicate sentences while preserving document structure
 */
export function removeDuplicateSentences(input: string): DuplicateDetectionResult {
  // Split into paragraphs first
  const paragraphs = input.split(/\n\s*\n/);
  const seenSentences = new Set<string>();
  const uniqueParagraphs: string[] = [];
  let duplicatesRemoved = 0;
  
  for (const paragraph of paragraphs) {
    // Split paragraph into sentences
    const sentences = paragraph.split(/([.!?]+[\s\n])/);
    const uniqueSentences: string[] = [];
    
    for (let i = 0; i < sentences.length; i += 2) {
      const sentence = sentences[i];
      const punctuation = sentences[i + 1] || "";
      
      if (!sentence || sentence.trim().length === 0) {
        if (punctuation) uniqueSentences.push(punctuation);
        continue;
      }
      
      // Normalize sentence for comparison
      const normalized = normalizeSentence(sentence);
      
      // Only keep if meaningful (length > 10 chars) and not seen before
      if (normalized.length > 10 && !seenSentences.has(normalized)) {
        seenSentences.add(normalized);
        uniqueSentences.push(sentence + punctuation);
      } else if (normalized.length > 10) {
        duplicatesRemoved++;
      }
    }
    
    const uniqueParagraph = uniqueSentences.join("");
    if (uniqueParagraph.trim().length > 0) {
      uniqueParagraphs.push(uniqueParagraph);
    }
  }
  
  return {
    output: uniqueParagraphs.join("\n\n"),
    duplicatesRemoved
  };
}

/**
 * Remove duplicate paragraphs
 */
export function removeDuplicateParagraphs(input: string): DuplicateDetectionResult {
  const paragraphs = input.split(/\n\s*\n/);
  const seen = new Set<string>();
  const unique: string[] = [];
  let duplicatesRemoved = 0;
  
  for (const paragraph of paragraphs) {
    const normalized = normalizeParagraph(paragraph);
    
    if (normalized.length > 20 && !seen.has(normalized)) {
      seen.add(normalized);
      unique.push(paragraph);
    } else if (normalized.length > 20) {
      duplicatesRemoved++;
    } else {
      // Keep short paragraphs (might be headers, lists, etc.)
      unique.push(paragraph);
    }
  }
  
  return {
    output: unique.join("\n\n"),
    duplicatesRemoved
  };
}

/**
 * Remove both duplicate sentences and paragraphs
 */
export function removeDuplicates(input: string): DuplicateDetectionResult {
  // First remove duplicate paragraphs
  const paragraphResult = removeDuplicateParagraphs(input);
  
  // Then remove duplicate sentences within remaining paragraphs
  const sentenceResult = removeDuplicateSentences(paragraphResult.output);
  
  return {
    output: sentenceResult.output,
    duplicatesRemoved: paragraphResult.duplicatesRemoved + sentenceResult.duplicatesRemoved
  };
}

function normalizeSentence(sentence: string): string {
  return sentence
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, "")  // Remove punctuation
    .replace(/\s+/g, " ");   // Normalize whitespace
}

function normalizeParagraph(paragraph: string): string {
  return paragraph
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ")   // Normalize whitespace
    .replace(/\n+/g, " ");  // Remove newlines
}

