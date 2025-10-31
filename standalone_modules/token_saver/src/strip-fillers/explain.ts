import { Preset, getPresetPatterns } from "./presets.js";

export function explainMatches(input: string, preset: Preset = "conservative") {
  const patterns = getPresetPatterns(preset);
  const matches: Array<{ pattern: string; count: number }> = [];
  for (const [re] of patterns) {
    const m = input.match(new RegExp(re.source, re.flags)) || [];
    if (m.length) matches.push({ pattern: re.source, count: m.length });
  }
  return matches;
}

