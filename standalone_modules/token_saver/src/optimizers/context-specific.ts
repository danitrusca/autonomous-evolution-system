/**
 * Context-Specific Optimizers
 * 
 * Specialized optimizers for different content types:
 * - Log optimization
 * - Documentation optimization
 * - Code comment optimization
 */

export interface ContextOptimizationResult {
  output: string;
  originalTokens: number;
  optimizedTokens: number;
  savingsPercent: number;
}

/**
 * Optimize log files by removing timestamps and compressing repeated patterns
 */
export function optimizeLogs(logText: string): ContextOptimizationResult {
  const originalTokens = Math.ceil(logText.length / 4); // Simple heuristic
  
  let optimized = logText;
  
  // Remove timestamps (various formats)
  optimized = optimized.replace(/\d{4}-\d{2}-\d{2}[\sT]\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?/g, "");
  optimized = optimized.replace(/\[\d{4}-\d{2}-\d{2}[\sT]\d{2}:\d{2}:\d{2}\]/g, "");
  optimized = optimized.replace(/\d{2}\/\d{2}\/\d{4}\s+\d{2}:\d{2}:\d{2}/g, "");
  
  // Remove log level prefixes if repeated
  optimized = optimized.replace(/\[(ERROR|WARN|INFO|DEBUG|TRACE)\]\s*/gi, "");
  
  // Compress repeated error messages
  const lines = optimized.split("\n");
  const seenMessages = new Map<string, number>();
  const compressed: string[] = [];
  
  for (const line of lines) {
    const normalized = line.toLowerCase().trim();
    if (normalized.length > 10) {
      const count = seenMessages.get(normalized) || 0;
      seenMessages.set(normalized, count + 1);
      
      if (count === 0) {
        compressed.push(line);
      } else if (count === 1) {
        compressed.push(`[Repeated ${count + 1}x] ${line}`);
      } else {
        // Update count in previous line
        const lastIdx = compressed.length - 1;
        if (compressed[lastIdx].startsWith("[Repeated")) {
          compressed[lastIdx] = `[Repeated ${count + 1}x] ${line}`;
        }
      }
    } else {
      compressed.push(line);
    }
  }
  
  optimized = compressed.join("\n");
  
  // Remove excessive whitespace
  optimized = optimized.replace(/\n{3,}/g, "\n\n");
  
  const optimizedTokens = Math.ceil(optimized.length / 4);
  const savingsPercent = originalTokens > 0
    ? ((originalTokens - optimizedTokens) / originalTokens) * 100
    : 0;
  
  return {
    output: optimized,
    originalTokens,
    optimizedTokens,
    savingsPercent: Math.round(savingsPercent * 100) / 100
  };
}

/**
 * Optimize documentation by removing redundant explanations
 */
export function optimizeDocumentation(docText: string): ContextOptimizationResult {
  const originalTokens = Math.ceil(docText.length / 4);
  
  let optimized = docText;
  
  // Remove "As mentioned above/below" references
  optimized = optimized.replace(/\bas mentioned (above|below|earlier|previously)\b/gi, "");
  optimized = optimized.replace(/\bas (discussed|stated|noted) (above|below|earlier)\b/gi, "");
  
  // Remove redundant "Note:" sections if they're obvious
  optimized = optimized.replace(/Note:\s*(It is important to|Remember that|Keep in mind that)/gi, "Note:");
  
  // Compress repeated examples
  optimized = optimized.replace(/Example \d+:\s*/gi, "Example: ");
  
  // Remove excessive "See also" references if many
  const seeAlsoMatches = optimized.match(/See (also|above|below)/gi);
  if (seeAlsoMatches && seeAlsoMatches.length > 3) {
    optimized = optimized.replace(/See (also|above|below)[^.]*\./gi, "");
  }
  
  // Compress whitespace but preserve structure
  optimized = optimized.replace(/\n{4,}/g, "\n\n\n");
  
  const optimizedTokens = Math.ceil(optimized.length / 4);
  const savingsPercent = originalTokens > 0
    ? ((originalTokens - optimizedTokens) / originalTokens) * 100
    : 0;
  
  return {
    output: optimized,
    originalTokens,
    optimizedTokens,
    savingsPercent: Math.round(savingsPercent * 100) / 100
  };
}

/**
 * Optimize code comments by removing obvious comments
 */
export function optimizeCodeComments(codeText: string): ContextOptimizationResult {
  const originalTokens = Math.ceil(codeText.length / 4);
  
  let optimized = codeText;
  const lines = optimized.split("\n");
  const result: string[] = [];
  
  for (const line of lines) {
    // Check if line is a comment
    const trimmed = line.trim();
    const isComment = trimmed.startsWith("//") || trimmed.startsWith("/*") || trimmed.startsWith("*");
    
    if (!isComment) {
      result.push(line);
      continue;
    }
    
    // Remove obvious comments
    const commentText = trimmed.replace(/^\/\/\s*|\/\*\s*|\*\s*|\*\/\s*$/g, "").toLowerCase();
    
    // Patterns that indicate obvious/redundant comments
    const obviousPatterns = [
      /^(set|get|assign|return|create|initialize|define|declare)\s+\w+/i,
      /^(this|the|a|an)\s+\w+\s+(is|does|returns|sets|gets)/i,
      /^(variable|function|method|class|object)\s+\w+/i,
      /^\/\/\s*$/, // Empty comment
    ];
    
    const isObvious = obviousPatterns.some(pattern => pattern.test(commentText));
    
    if (!isObvious || commentText.length > 50) {
      // Keep non-obvious or detailed comments
      result.push(line);
    }
    // Otherwise, remove the comment
  }
  
  optimized = result.join("\n");
  
  // Remove excessive blank lines
  optimized = optimized.replace(/\n{3,}/g, "\n\n");
  
  const optimizedTokens = Math.ceil(optimized.length / 4);
  const savingsPercent = originalTokens > 0
    ? ((originalTokens - optimizedTokens) / originalTokens) * 100
    : 0;
  
  return {
    output: optimized,
    originalTokens,
    optimizedTokens,
    savingsPercent: Math.round(savingsPercent * 100) / 100
  };
}

