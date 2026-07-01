/**
 * Cloudflare Worker — Unique Visitor Counter
 * GDPR-compliant: IP addresses are hashed with SHA-256, raw IPs are never stored.
 *
 * DEPLOY INSTRUCTIONS:
 * 1. npm install -g wrangler
 * 2. wrangler login
 * 3. wrangler kv:namespace create VISITORS
 *    → Copy the "id" value from the output
 * 4. Edit wrangler.toml and paste the id under [[kv_namespaces]]
 * 5. wrangler deploy
 * 6. Copy your worker URL (e.g. https://visitor-counter.YOUR_SUBDOMAIN.workers.dev)
 *    and paste it as WORKER_URL in script.js
 */

const ALLOWED_ORIGIN = 'https://ahmettcetinn.github.io';

async function hashString(str) {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    const corsHeaders = {
      'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    // GET /count — return current unique visitor count
    if (url.pathname === '/count' && request.method === 'GET') {
      const count = parseInt(await env.VISITORS.get('total_count') || '0');
      return new Response(JSON.stringify({ count }), { headers: corsHeaders });
    }

    // POST /visit — register a visit, return updated count
    if (url.pathname === '/visit' && request.method === 'POST') {
      const body = await request.json().catch(() => ({}));
      const token = typeof body.token === 'string' ? body.token.slice(0, 64) : null;

      // Hash IP for GDPR compliance — raw IP is never stored or logged
      const ip =
        request.headers.get('CF-Connecting-IP') ||
        request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() ||
        'unknown';
      const hashedIp = await hashString(ip + ':portfolio-visitor-salt-2026');

      let isNew = false;

      if (token) {
        const tokenKey = `tok:${token}`;
        const tokenSeen = await env.VISITORS.get(tokenKey);

        if (tokenSeen) {
          // Returning visitor identified by token — no increment
          const count = parseInt(await env.VISITORS.get('total_count') || '0');
          return new Response(JSON.stringify({ count, isNew: false }), { headers: corsHeaders });
        }

        // Token not seen — use IP as secondary dedup (catches cleared localStorage)
        const ipKey = `ip:${hashedIp}`;
        const ipSeen = await env.VISITORS.get(ipKey);

        // Always record the new token (1-year TTL)
        await env.VISITORS.put(tokenKey, '1', { expirationTtl: 365 * 24 * 3600 });

        if (!ipSeen) {
          // Truly new visitor — record hashed IP (30-day TTL) and increment
          await env.VISITORS.put(ipKey, '1', { expirationTtl: 30 * 24 * 3600 });
          isNew = true;
        }
        // If IP was already seen but token wasn't: same person cleared storage, don't increment
      } else {
        // No token provided — fall back to IP-only check
        const ipKey = `ip:${hashedIp}`;
        const ipSeen = await env.VISITORS.get(ipKey);
        if (!ipSeen) {
          await env.VISITORS.put(ipKey, '1', { expirationTtl: 30 * 24 * 3600 });
          isNew = true;
        }
      }

      let count = parseInt(await env.VISITORS.get('total_count') || '0');
      if (isNew) {
        count++;
        await env.VISITORS.put('total_count', count.toString());
      }

      return new Response(JSON.stringify({ count, isNew }), { headers: corsHeaders });
    }

    return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers: corsHeaders });
  },
};
