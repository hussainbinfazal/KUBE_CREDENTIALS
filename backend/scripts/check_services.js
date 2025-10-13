const https = require('https');
const http = require('http');

const timeout = 5000;

function fetch(url) {
  return new Promise((resolve) => {
    const lib = url.startsWith('https') ? https : http;
    const req = lib.get(url, { timeout }, (res) => {
      const { statusCode } = res;
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        resolve({ ok: statusCode >= 200 && statusCode < 300, status: statusCode, body });
      });
    });
    req.on('error', (e) => resolve({ ok: false, status: 0, error: e.message }));
    req.on('timeout', () => {
      req.destroy();
      resolve({ ok: false, status: 0, error: 'timeout' });
    });
  });
}

async function check() {
  const gateway = process.env.GATEWAY_URL || 'https://kube-credentials-op82.onrender.com';
  const issue = process.env.ISSUE_URL || `${gateway}/api/issue/health`;
  const verify = process.env.VERIFY_URL || `${gateway}/api/verify/health`;

  const endpoints = [
    { name: 'gateway', url: `${gateway}/health` },
    { name: 'issue', url: issue },
    { name: 'verify', url: verify },
  ];

  for (const ep of endpoints) {
    process.stdout.write(`Checking ${ep.name} at ${ep.url} ... `);
    // ensure full URL
    const url = ep.url.startsWith('http') ? ep.url : `${gateway}${ep.url}`;
    const res = await fetch(url);
    if (res.ok) {
      console.log(`OK (${res.status})`);
    } else {
      console.log(`FAIL (${res.status}) ${res.error || ''}`);
      if (res.body) console.log('  body:', res.body);
    }
  }
}

check().catch((e) => {
  console.error('Error checking services:', e);
  process.exit(2);
});
