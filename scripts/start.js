/**
 * Ontech - Local Dev Server Starter
 * Starts a simple HTTP server for ES module support
 * With caching, compression, and proper headers
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const PORT = 3000;
const ROOT = path.resolve(__dirname, '..');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.json': 'application/json',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

// Cache durations (seconds)
const CACHE = {
  '.css': 31536000,
  '.js': 31536000,
  '.mjs': 31536000,
  '.webp': 31536000,
  '.svg': 31536000,
  '.png': 31536000,
  '.jpg': 31536000,
  '.woff': 31536000,
  '.woff2': 31536000,
  '.html': 0,
  '.json': 0,
};

const server = http.createServer((req, res) => {
  let filePath = path.join(ROOT, req.url === '/' ? '/index.html' : req.url);
  const ext = path.extname(filePath);

  // Security check
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end('403 Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('404 Not Found');
      return;
    }

    const mime = MIME[ext] || 'application/octet-stream';
    const cacheMaxAge = CACHE[ext] || 0;

    const headers = {
      'Content-Type': mime,
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    };

    // Cache headers
    if (cacheMaxAge > 0) {
      headers['Cache-Control'] = `public, max-age=${cacheMaxAge}, immutable`;
    } else {
      headers['Cache-Control'] = 'no-cache';
    }

    // Gzip compression
    const acceptEncoding = req.headers['accept-encoding'] || '';
    const shouldCompress = ['.html', '.css', '.js', '.mjs', '.svg', '.json'].includes(ext);

    if (shouldCompress && acceptEncoding.includes('gzip')) {
      zlib.gzip(data, (err, compressed) => {
        if (err) {
          res.writeHead(200, headers);
          res.end(data);
          return;
        }
        headers['Content-Encoding'] = 'gzip';
        headers['Content-Length'] = compressed.length;
        res.writeHead(200, headers);
        res.end(compressed);
      });
    } else {
      headers['Content-Length'] = data.length;
      res.writeHead(200, headers);
      res.end(data);
    }
  });
});

server.listen(PORT, () => {
  console.log(`\n  Ontech Dev Server\n`);
  console.log(`  Local:   http://localhost:${PORT}\n`);
  console.log(`  Features: gzip, caching, immutable assets`);
  console.log(`  Press Ctrl+C to stop\n`);

  const { exec } = require('child_process');
  exec('start http://localhost:' + PORT);
});
