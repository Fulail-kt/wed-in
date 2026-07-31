import fs from 'node:fs';
import path from 'node:path';

let cached: Record<string, string> | null = null;

/** Read project .env into a map (SSR-safe, no Vite import). */
export function readProjectEnv(): Record<string, string> {
  if (cached) return cached;
  const out: Record<string, string> = {};
  try {
    const raw = fs.readFileSync(path.join(process.cwd(), '.env'), 'utf8');
    for (const line of raw.split(/\r?\n/)) {
      const t = line.trim();
      if (!t || t.startsWith('#')) continue;
      const i = t.indexOf('=');
      if (i < 0) continue;
      const key = t.slice(0, i).trim();
      let val = t.slice(i + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      out[key] = val;
    }
  } catch {
    // no .env — rely on process env
  }
  cached = out;
  return out;
}

export function envGet(name: string, fallback = ''): string {
  // Vercel / serverless inject vars into process.env — prefer that in production
  if (process.env[name]) return process.env[name]!;

  const file = readProjectEnv();
  return (
    file[name] ||
    (typeof import.meta !== 'undefined' ? String(import.meta.env[name] ?? '') : '') ||
    fallback
  );
}
