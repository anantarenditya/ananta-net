import { apiJson, safeJsonFromKv } from './_middleware.js';

const FALLBACK_STATUS = {
  updatedAt: null,
  overallStatus: 'unknown',
  summary: 'Status jaringan belum diperbarui oleh admin. Hubungi admin ANANTA.NET untuk memastikan kondisi terbaru.',
  areas: [
    { name: 'Kalibendo', status: 'unknown', note: 'Belum ada pembaruan status untuk wilayah Kalibendo.' },
    { name: 'Bades', status: 'unknown', note: 'Belum ada pembaruan status untuk wilayah Bades.' },
    { name: 'Gondoruso', status: 'unknown', note: 'Belum ada pembaruan status untuk wilayah Gondoruso.' }
  ]
};

export async function onRequestGet({ env }) {
  if (!env.ANANTA_DATA) return apiJson({ error: 'KV belum dikonfigurasi.' }, 503);
  try {
    const data = await safeJsonFromKv(env, 'public:status', FALLBACK_STATUS);
    return apiJson(data);
  } catch (error) {
    return apiJson(FALLBACK_STATUS, 200, { 'X-ANANTA-Data-Source': 'fallback' });
  }
}
