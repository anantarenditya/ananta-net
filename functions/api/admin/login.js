import { apiJson, checkPassword, createSessionCookie, readJsonBody, sameOrigin } from '../_middleware.js';

export async function onRequestPost(context) {
  const { request, env } = context;
  if (!sameOrigin(request)) return apiJson({ error: 'Asal permintaan tidak diizinkan.' }, 403);
  if (!env.ANANTA_DATA) return apiJson({ error: 'Penyimpanan belum dikonfigurasi. Ikuti panduan README.' }, 503);
  if (!env.ADMIN_PASSWORD || !env.SESSION_SECRET || env.SESSION_SECRET.length < 32) {
    return apiJson({ error: 'Rahasia ADMIN_PASSWORD dan SESSION_SECRET belum disetel di Cloudflare.' }, 503);
  }
  let body;
  try { body = await readJsonBody(request, 4096); }
  catch (error) { return apiJson({ error: 'Format permintaan tidak valid.' }, 400); }
  const password = typeof body.password === 'string' ? body.password : '';
  if (!password || password.length > 200) return apiJson({ error: 'Masukkan kata sandi admin.' }, 400);

  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const rateKey = `security:login:${ip}`;
  const attempts = Number(await env.ANANTA_DATA.get(rateKey) || 0);
  if (attempts >= 8) return apiJson({ error: 'Terlalu banyak percobaan. Coba kembali sekitar 10 menit lagi.' }, 429);

  if (!await checkPassword(password, env)) {
    await env.ANANTA_DATA.put(rateKey, String(attempts + 1), { expirationTtl: 600 });
    return apiJson({ error: 'Kata sandi tidak cocok.' }, 401);
  }

  await env.ANANTA_DATA.delete(rateKey);
  return apiJson({ ok: true }, 200, { 'Set-Cookie': await createSessionCookie(env) });
}
