import { apiJson, requireAdmin, safeJsonFromKv, readJsonBody, sameOrigin } from '../_middleware.js';

const DEFAULT_STATUS = {
  updatedAt: null,
  overallStatus: 'unknown',
  summary: 'Status jaringan belum diperbarui oleh admin. Hubungi admin ANANTA.NET untuk memastikan kondisi terbaru.',
  areas: [
    { name: 'Kalibendo', status: 'unknown', note: 'Belum ada pembaruan status untuk wilayah Kalibendo.' },
    { name: 'Bades', status: 'unknown', note: 'Belum ada pembaruan status untuk wilayah Bades.' },
    { name: 'Gondoruso', status: 'unknown', note: 'Belum ada pembaruan status untuk wilayah Gondoruso.' }
  ]
};
const ALLOWED = new Set(['normal', 'gangguan', 'pemeliharaan', 'unknown']);

export async function onRequestGet(context) {
  const denied = await requireAdmin(context);
  if (denied) return denied;
  try {
    return apiJson(await safeJsonFromKv(context.env, 'public:status', DEFAULT_STATUS));
  } catch (error) {
    return apiJson({ error: 'Gagal membaca status jaringan.' }, 500);
  }
}

export async function onRequestPut(context) {
  const denied = await requireAdmin(context);
  if (denied) return denied;
  if (!sameOrigin(context.request)) return apiJson({ error: 'Asal permintaan tidak diizinkan.' }, 403);
  let body;
  try { body = await readJsonBody(context.request, 12000); }
  catch (error) { return apiJson({ error: 'Data status tidak valid atau terlalu besar.' }, 400); }

  if (!body || !ALLOWED.has(body.overallStatus) || typeof body.summary !== 'string' || body.summary.trim().length < 3 || body.summary.length > 500) {
    return apiJson({ error: 'Ringkasan atau status keseluruhan tidak valid.' }, 400);
  }
  if (!Array.isArray(body.areas) || body.areas.length !== 3) return apiJson({ error: 'Status harus berisi Kalibendo, Bades, dan Gondoruso.' }, 400);
  const expected = ['Kalibendo', 'Bades', 'Gondoruso'];
  const areas = [];
  for (const name of expected) {
    const area = body.areas.find(item => item?.name === name);
    if (!area || !ALLOWED.has(area.status) || typeof area.note !== 'string' || area.note.length > 300) {
      return apiJson({ error: `Data status ${name} tidak valid.` }, 400);
    }
    areas.push({ name, status: area.status, note: area.note.trim() });
  }

  const saved = {
    updatedAt: new Date().toISOString(),
    overallStatus: body.overallStatus,
    summary: body.summary.trim(),
    areas
  };
  await context.env.ANANTA_DATA.put('public:status', JSON.stringify(saved), { metadata: { updatedAt: saved.updatedAt } });
  return apiJson({ ok: true, data: saved });
}
