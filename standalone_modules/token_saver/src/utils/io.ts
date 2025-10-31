import fs from "node:fs";
import path from "node:path";

export function readStdinSync(): string {
  const fd = 0; // stdin
  try {
    if (fs.fstatSync(fd).isFIFO() || fs.fstatSync(fd).isFile()) {
      return fs.readFileSync(fd, "utf8");
    }
  } catch {}
  return "";
}

export function readFileText(p: string): string {
  return fs.readFileSync(p, "utf8");
}

export function writeFileText(p: string, data: string): void {
  const dir = path.dirname(p);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(p, data, "utf8");
}

