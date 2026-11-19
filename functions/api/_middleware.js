const COOKIE_NAME = '__Host-ananta_admin';
const SESSION_SECONDS = 8 * 60 * 60;

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store, max-age=0',
      'X-Content-Type-Options': 'nosniff',
      ...extraHeaders
    }
  });
}

function base64url(bytes) {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function decodeBase64url(value) {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized + '='.repeat((4 - normalized.length % 4) % 4);
  const binary = atob(padded);
  return Uint8Array.from(binary, char => char.charCodeAt(0));
}

async function hmac(payload, secret) {
  const key = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload));
  return base64url(new Uint8Array(signature));
}

async function sha256(value) {
  return new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value)));
}

function constantTimeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

export function apiJson(data, status = 200, extraHeaders = {}) {
  return json(data, status, extraHeaders);
}

export function requireBackend(env) {
  if (!env.ANANTA_DATA) return json({ error: 'Penyimpanan belum terhubung. Admin perlu menyelesaikan pengaturan Cloudflare KV.' }, 503);
  return null;
}

export function sameOrigin(request) {
  const origin = request.headers.get('Origin');
  return Boolean(origin && origin === new URL(request.url).origin);
}

export async function readJsonBody(request, maxBytes = 65536) {
  const contentType = request.headers.get('Content-Type') || '';
  if (!contentType.toLowerCase().includes('application/json')) {
    throw new Error('Permintaan harus menggunakan application/json.');
  }
  const text = await request.text();
  if (new TextEncoder().encode(text).length > maxBytes) throw new Error('Ukuran data terlalu besar.');
  return JSON.parse(text);
}

export async function checkPassword(password, env) {
  if (!env.ADMIN_PASSWORD || !env.SESSION_SECRET || env.SESSION_SECRET.length < 32) return false;
  const [inputHash, storedHash] = await Promise.all([sha256(password), sha256(env.ADMIN_PASSWORD)]);
  return constantTimeEqual(inputHash, storedHash);
}

export async function createSessionCookie(env) {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_SECONDS;
  const payload = JSON.stringify({ exp: expiresAt, nonce: crypto.randomUUID() });
  const encodedPayload = base64url(new TextEncoder().encode(payload));
  const signature = await hmac(encodedPayload, env.SESSION_SECRET);
  const value = `${encodedPayload}.${signature}`;
  return `${COOKIE_NAME}=${value}; Path=/; Max-Age=${SESSION_SECONDS}; Secure; HttpOnly; SameSite=Strict`;
}

export async function hasAdminSession(request, env) {
  if (!env.SESSION_SECRET || env.SESSION_SECRET.length < 32) return false;
  const cookieHeader = request.headers.get('Cookie') || '';
  const cookie = cookieHeader.split(';').map(part => part.trim()).find(part => part.startsWith(`${COOKIE_NAME}=`));
  if (!cookie) return false;
  const value = cookie.slice(COOKIE_NAME.length + 1);
  const dot = value.lastIndexOf('.');
  if (dot <= 0) return false;
  const encodedPayload = value.slice(0, dot);
  const providedSignature = value.slice(dot + 1);
  try {
    const expectedSignature = await hmac(encodedPayload, env.SESSION_SECRET);
    if (!constantTimeEqual(new TextEncoder().encode(providedSignature), new TextEncoder().encode(expectedSignature))) return false;
    const payload = JSON.parse(new TextDecoder().decode(decodeBase64url(encodedPayload)));
    return Number.isInteger(payload.exp) && payload.exp > Math.floor(Date.now() / 1000) && typeof payload.nonce === 'string';
  } catch (error) {
    return false;
  }
}

export function clearSessionCookie() {
  return `${COOKIE_NAME}=; Path=/; Max-Age=0; Secure; HttpOnly; SameSite=Strict`;
}

export async function requireAdmin(context) {
  if (!context.env.ANANTA_DATA) return json({ error: 'Penyimpanan belum terhubung. Selesaikan pengaturan Cloudflare KV terlebih dahulu.' }, 503);
  if (!await hasAdminSession(context.request, context.env)) return json({ error: 'Sesi admin tidak berlaku. Silakan masuk kembali.' }, 401);
  return null;
}

export async function safeJsonFromKv(env, key, fallback) {
  if (!env.ANANTA_DATA) return fallback;
  try {
    return await env.ANANTA_DATA.get(key, 'json') || fallback;
  } catch (error) {
    throw new Error('Tidak dapat membaca penyimpanan ANANTA.NET.');
  }
}

// Pass through to the matched API endpoint. Shared helpers are imported by route modules.
export function onRequest(context) {
  return context.next();
}
