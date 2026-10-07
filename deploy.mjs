#!/usr/bin/env node
/**
 * PrimeDollars Edge — production deploy.
 *
 * Runs `vercel deploy --prod`, then re-points the canonical alias at the fresh
 * deployment. Vercel only auto-promotes machine-generated aliases such as
 * `<project>-<team>.vercel.app`, so without this step the clean
 * `primedollars-edge.vercel.app` hostname would stay pinned to an old build.
 *
 * Usage: npm run deploy
 */
import { spawnSync } from 'node:child_process';

const VERCEL = 'vercel@62.7.0';
const ALIAS = 'primedollars-edge.vercel.app';

/**
 * Run a command, inheriting stdio, and return its stdout.
 *
 * The whole command is passed as one string so Windows can resolve `npx.cmd`
 * through cmd.exe without Node's shell+args-array deprecation warning. None of
 * the arguments we pass contain whitespace or shell metacharacters.
 */
function run(args, { capture = false } = {}) {
  const res = spawnSync(['npx', ...args].join(' '), {
    encoding: 'utf8',
    maxBuffer: 32 * 1024 * 1024,
    shell: true,
    stdio: capture ? ['inherit', 'pipe', 'inherit'] : 'inherit',
  });
  if (res.error) throw res.error;
  if (res.status !== 0) process.exit(res.status ?? 1);
  return res.stdout ?? '';
}

console.log(`> Deploying PrimeDollars Edge to Vercel (production)`);
const raw = run(['--yes', VERCEL, 'deploy', '--prod', '--yes', '--json'], {
  capture: true,
});
process.stdout.write(raw);

// The CLI prints progress noise around the JSON payload — pull the object out.
const start = raw.indexOf('{') === -1 ? raw.indexOf('[') : raw.indexOf('{');
const end = Math.max(raw.lastIndexOf('}'), raw.lastIndexOf(']'));
let deployment;
try {
  const parsed = JSON.parse(raw.slice(start, end + 1));
  deployment = Array.isArray(parsed) ? parsed[0] : parsed;
} catch {
  console.error('\n! Deploy finished, but its output was not valid JSON.');
  console.error('! Alias not updated — run: npx vercel alias set <url> ' + ALIAS);
  process.exit(1);
}

const url = (deployment.url || deployment.inspectorUrl || '').replace(
  /^https?:\/\//,
  ''
);
if (!url || !url.includes('vercel.app')) {
  console.error('\n! Deploy finished, but no deployment URL was returned.');
  console.error('! Alias not updated — run: npx vercel alias set <url> ' + ALIAS);
  process.exit(1);
}

console.log(`\n> Pointing ${ALIAS} at ${url}`);
run(['--yes', VERCEL, 'alias', 'set', url, ALIAS]);

console.log(`\n✔ Live: https://${ALIAS}`);
console.log(`  Deployment: https://${url}`);
