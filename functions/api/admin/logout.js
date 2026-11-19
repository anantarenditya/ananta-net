import { apiJson, clearSessionCookie, sameOrigin } from '../_middleware.js';

export async function onRequestPost({ request }) {
  if (!sameOrigin(request)) return apiJson({ error: 'Asal permintaan tidak diizinkan.' }, 403);
  return apiJson({ ok: true }, 200, { 'Set-Cookie': clearSessionCookie() });
}
