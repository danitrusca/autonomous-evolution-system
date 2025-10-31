#!/usr/bin/env node
import("../dist/cli.js").then(m => m.main?.() ?? 0).catch(err => {
  console.error(err?.message ?? String(err));
  process.exit(1);
});

