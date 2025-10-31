#!/usr/bin/env node
import { readFileText, readStdinSync, writeFileText } from "./utils/io.js";
import { estimateTokensHeuristic } from "./estimators/heuristic.js";
import { jsonMinify } from "./json-minify.js";
import { unifiedDiff } from "./diff.js";
import { stripFillers } from "./strip-fillers/engine.js";

function parseArgs(argv: string[]) {
  const opts: Record<string, string | boolean> = {};
  const args: string[] = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) {
      const [k, v] = a.slice(2).split("=");
      opts[k] = v ?? true;
    } else if (a.startsWith("-")) {
      opts[a.slice(1)] = true;
    } else {
      args.push(a);
    }
  }
  return { cmd: args.shift() || "", args, opts } as const;
}

function outOrStdout(text: string, out?: string) {
  if (out && typeof out === "string") writeFileText(out, text);
  else process.stdout.write(text);
}

export async function main(argv: string[] = process.argv.slice(2)) {
  const { cmd, args, opts } = parseArgs(argv);
  if (opts.v || opts.version) {
    const pkg = await import("../package.json", { with: { type: "json" } } as any).catch(() => ({ default: { version: "0.0.0" } }));
    console.log(pkg.default.version);
    return 0;
  }

  try {
    if (cmd === "json-minify") {
      const input = args[0] ? readFileText(args[0]) : readStdinSync();
      const res = jsonMinify(input, { keepEol: !!opts["keep-eol"], maxBytes: undefined });
      outOrStdout(res.output + "\n", opts.out as string | undefined);
      if (opts.report) {
        const before = estimateTokensHeuristic(input);
        const after = estimateTokensHeuristic(res.output);
        console.error(JSON.stringify({ mode: "json-minify", before, after }));
      }
      return 0;
    }
    if (cmd === "diff") {
      const before = args[0] ? readFileText(args[0]) : readStdinSync();
      const after = args[1] ? readFileText(args[1]) : "";
      const patch = unifiedDiff("before", before, "after", after, { keepEol: !!opts["keep-eol"] });
      outOrStdout(patch, opts.out as string | undefined);
      if (opts.report) {
        const b = estimateTokensHeuristic(before, { diffHeuristicBump: true });
        const a = estimateTokensHeuristic(after, { diffHeuristicBump: true });
        console.error(JSON.stringify({ mode: "diff", before: b, after: a }));
      }
      return 0;
    }
    if (cmd === "strip-fillers") {
      const input = args[0] ? readFileText(args[0]) : readStdinSync();
      const preset = (opts.preset as string) || "conservative";
      const res = stripFillers(input, { preset: preset as any, keepEol: !!opts["keep-eol"] });
      outOrStdout(res.output + "\n", opts.out as string | undefined);
      if (opts.report) {
        const before = estimateTokensHeuristic(input);
        const after = estimateTokensHeuristic(res.output);
        console.error(JSON.stringify({ mode: "strip-fillers", before, after }));
      }
      return 0;
    }
    console.error("Usage: token-saver <json-minify|diff|strip-fillers> [args] [--report --model --keep-eol --out]");
    return 1;
  } catch (e) {
    const msg = (e as Error).message || String(e);
    const code = (e as any)?.code === 2 ? 2 : 1;
    console.error(msg);
    return code;
  }
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith("/bin/token-saver.js")) {
  // eslint-disable-next-line unicorn/prefer-top-level-await
  main().then((code) => process.exit(code)).catch((err) => {
    console.error(err?.message ?? String(err));
    process.exit(1);
  });
}

