import { apiJson, safeJsonFromKv } from './_middleware.js';

const FALLBACK_ANNOUNCEMENTS = { updatedAt: null, items: [] };

export async function onRequestGet({ env }) {
  if (!env.ANANTA_DATA) return apiJson({ error: 'KV belum dikonfigurasi.' }, 503);
  try {
    const data = await safeJsonFromKv(env, 'public:announcements', FALLBACK_ANNOUNCEMENTS);
    return apiJson(data);
  } catch (error) {
    return apiJson(FALLBACK_ANNOUNCEMENTS, 200, { 'X-ANANTA-Data-Source': 'fallback' });
  }
}
