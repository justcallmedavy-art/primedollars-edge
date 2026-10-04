/**
 * Local static dev server for the PrimeDollars Edge
 * production build (served exactly as built).
 *
 * - Serves files from this directory
 * - SPA fallback: any unknown path without a file extension returns index.html
 * - No application code is modified
 *
 * Usage: node serve.mjs [port]   (default 3000)
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.argv[2] || process.env.PORT || 3000);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.mp4': 'video/mp4',
  '.mp3': 'audio/mpeg',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

function send(res, status, body, headers = {}) {
  res.writeHead(status, { 'Cache-Control': 'no-cache', ...headers });
  res.end(body);
}

const server = http.createServer((req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    let pathname = decodeURIComponent(url.pathname);
    if (pathname.endsWith('/')) pathname += 'index.html';

    const filePath = path.join(ROOT, pathname);
    if (!filePath.startsWith(ROOT)) return send(res, 403, 'Forbidden');

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const data = fs.readFileSync(filePath);
      return send(res, 200, data, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    }

    // SPA fallback for client-side routes (only for extension-less paths)
    if (!path.extname(pathname)) {
      const html = fs.readFileSync(path.join(ROOT, 'index.html'));
      return send(res, 200, html, { 'Content-Type': MIME['.html'] });
    }

    return send(res, 404, 'Not Found', { 'Content-Type': 'text/plain' });
  } catch (err) {
    return send(res, 500, 'Server error: ' + err.message, { 'Content-Type': 'text/plain' });
  }
});

server.listen(PORT, () => {
  console.log(`PrimeDollars/local build server running at http://localhost:${PORT}`);
});
