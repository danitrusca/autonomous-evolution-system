/**
 * Content Type Detection
 * 
 * Detects the type of content to apply appropriate optimization strategies.
 */

export type ContentType = "code" | "prose" | "log" | "json" | "documentation" | "mixed";

export interface ContentTypeDetectionResult {
  type: ContentType;
  confidence: number;
  features: {
    codePercent: number;
    prosePercent: number;
    jsonPercent: number;
    logPatterns: number;
    docPatterns: number;
  };
}

/**
 * Detect content type based on patterns and structure
 */
export function detectContentType(input: string): ContentTypeDetectionResult {
  const features = analyzeContentFeatures(input);
  
  // Calculate percentages
  const total = features.codeChars + features.proseChars + features.jsonChars;
  const codePercent = total > 0 ? features.codeChars / total : 0;
  const prosePercent = total > 0 ? features.proseChars / total : 0;
  const jsonPercent = total > 0 ? features.jsonChars / total : 0;
  
  // Determine type
  let type: ContentType = "mixed";
  let confidence = 0.5;
  
  if (jsonPercent > 0.8) {
    type = "json";
    confidence = 0.9;
  } else if (features.logPatterns > 5) {
    type = "log";
    confidence = Math.min(0.9, 0.5 + features.logPatterns / 20);
  } else if (codePercent > 0.6) {
    type = "code";
    confidence = Math.min(0.9, 0.5 + codePercent);
  } else if (features.docPatterns > 3 && prosePercent > 0.7) {
    type = "documentation";
    confidence = Math.min(0.85, 0.5 + features.docPatterns / 10);
  } else if (prosePercent > 0.7) {
    type = "prose";
    confidence = Math.min(0.8, 0.5 + prosePercent);
  }
  
  return {
    type,
    confidence,
    features: {
      codePercent,
      prosePercent,
      jsonPercent,
      logPatterns: features.logPatterns,
      docPatterns: features.docPatterns
    }
  };
}

function analyzeContentFeatures(input: string): {
  codeChars: number;
  proseChars: number;
  jsonChars: number;
  logPatterns: number;
  docPatterns: number;
} {
  let codeChars = 0;
  let proseChars = 0;
  let jsonChars = 0;
  let logPatterns = 0;
  let docPatterns = 0;
  
  // Check for JSON
  const trimmed = input.trim();
  if ((trimmed.startsWith("{") || trimmed.startsWith("[")) && trimmed.endsWith("}") || trimmed.endsWith("]")) {
    try {
      JSON.parse(trimmed);
      jsonChars = input.length;
      return { codeChars: 0, proseChars: 0, jsonChars, logPatterns: 0, docPatterns: 0 };
    } catch {
      // Not valid JSON
    }
  }
  
  // Log patterns (timestamps, log levels, etc.)
  logPatterns += (input.match(/\d{4}-\d{2}-\d{2}[\sT]\d{2}:\d{2}:\d{2}/g) || []).length;
  logPatterns += (input.match(/\[(ERROR|WARN|INFO|DEBUG|TRACE)\]/gi) || []).length;
  logPatterns += (input.match(/ERROR|WARNING|INFO|DEBUG/gi) || []).length;
  
  // Documentation patterns
  docPatterns += (input.match(/^#{1,6}\s+/gm) || []).length; // Markdown headers
  docPatterns += (input.match(/```[\s\S]*?```/g) || []).length; // Code blocks
  docPatterns += (input.match(/^[\s]*[-*+]\s+/gm) || []).length; // Lists
  docPatterns += (input.match(/\[.*?\]\(.*?\)/g) || []).length; // Links
  
  // Analyze code vs prose
  const lines = input.split("\n");
  let inCodeBlock = false;
  
  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      if (inCodeBlock) codeChars += line.length;
      continue;
    }
    
    if (inCodeBlock) {
      codeChars += line.length;
      continue;
    }
    
    // Check for code patterns
    const codeIndicators = (line.match(/[{}();=<>[\]]/g) || []).length;
    const wordCount = (line.match(/\b\w+\b/g) || []).length;
    
    if (codeIndicators > wordCount * 0.3) {
      codeChars += line.length;
    } else {
      proseChars += line.length;
    }
  }
  
  return {
    codeChars,
    proseChars,
    jsonChars,
    logPatterns,
    docPatterns
  };
}

