/**
 * Whitespace Compression
 * 
 * Intelligently compresses whitespace while preserving readability and code structure.
 * Protects code blocks and inline code from compression.
 */

export interface WhitespaceCompressionResult {
  output: string;
  compressed: boolean;
}

/**
 * Compress whitespace while protecting code blocks and inline code
 */
export function compressWhitespace(input: string, protectCode: boolean = true): WhitespaceCompressionResult {
  if (!protectCode) {
    // Simple compression: remove excessive whitespace
    const compressed = input
      .replace(/\n{3,}/g, "\n\n")  // Max 2 consecutive newlines
      .replace(/[ \t]{2,}/g, " ")   // Max 1 space/tab
      .replace(/[ \t]+\n/g, "\n")  // Remove trailing spaces
      .replace(/\n[ \t]+/g, "\n");  // Remove leading spaces after newline
    
    return {
      output: compressed,
      compressed: compressed !== input
    };
  }
  
  // Protect code blocks
  const lines = input.split("\n");
  const result: string[] = [];
  let inFence = false;
  let fenceStart = -1;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    if (trimmed.startsWith("```")) {
      if (!inFence) {
        // Starting a code block - compress everything before it
        if (result.length > 0) {
          const last = result[result.length - 1];
          result[result.length - 1] = compressLineWhitespace(last);
        }
        fenceStart = result.length;
      }
      inFence = !inFence;
      result.push(line);
      continue;
    }
    
    if (inFence) {
      // Inside code block - preserve exactly
      result.push(line);
      continue;
    }
    
    // Regular text - compress whitespace
    const compressed = compressLineWhitespace(line);
    
    // Protect inline code: `code`
    const protectedLine = protectInlineCode(compressed);
    result.push(protectedLine);
  }
  
  // Compress multiple consecutive newlines (but preserve code blocks)
  const final: string[] = [];
  let lastWasEmpty = false;
  
  for (let i = 0; i < result.length; i++) {
    const line = result[i];
    const isEmpty = line.trim().length === 0;
    
    if (isEmpty && lastWasEmpty) {
      continue; // Skip consecutive empty lines
    }
    
    final.push(line);
    lastWasEmpty = isEmpty;
  }
  
  const output = final.join("\n");
  return {
    output,
    compressed: output !== input
  };
}

function compressLineWhitespace(line: string): string {
  return line
    .replace(/[ \t]{2,}/g, " ")  // Multiple spaces/tabs -> single space
    .replace(/^[ \t]+/, "")      // Remove leading whitespace
    .replace(/[ \t]+$/, "");     // Remove trailing whitespace
}

function protectInlineCode(line: string): string {
  // Split by inline code markers
  const parts = line.split(/(`[^`]*`)/g);
  const result: string[] = [];
  
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (part.startsWith("`") && part.endsWith("`")) {
      // Inline code - preserve exactly
      result.push(part);
    } else {
      // Regular text - compress
      result.push(compressLineWhitespace(part));
    }
  }
  
  return result.join("");
}

