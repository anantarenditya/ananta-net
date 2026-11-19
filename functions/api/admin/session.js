import { apiJson, hasAdminSession } from '../_middleware.js';

export async function onRequestGet({ request, env }) {
  if (!env.ANANTA_DATA) return apiJson({ authenticated: false, configured: false, message: 'Penyimpanan admin belum dikonfigurasi.' }, 503);
  const configured = Boolean(env.ADMIN_PASSWORD && env.SESSION_SECRET && env.SESSION_SECRET.length >= 32);
  return apiJson({ authenticated: configured && await hasAdminSession(request, env), configured });
}
