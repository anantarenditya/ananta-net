import { apiJson, requireAdmin, safeJsonFromKv, readJsonBody, sameOrigin } from '../_middleware.js';

const DEFAULT_ANNOUNCEMENTS = { updatedAt: null, items: [] };
const CATEGORIES = new Set(['gangguan', 'pemeliharaan', 'informasi', 'promo']);

export async function onRequestGet(context) {
  const denied = await requireAdmin(context);
  if (denied) return denied;
  try {
    return apiJson(await safeJsonFromKv(context.env, 'public:announcements', DEFAULT_ANNOUNCEMENTS));
  } catch (error) {
    return apiJson({ error: 'Gagal membaca pengumuman.' }, 500);
  }
}

export async function onRequestPut(context) {
  const denied = await requireAdmin(context);
  if (denied) return denied;
  if (!sameOrigin(context.request)) return apiJson({ error: 'Asal permintaan tidak diizinkan.' }, 403);
  let body;
  try { body = await readJsonBody(context.request, 60000); }
  catch (error) { return apiJson({ error: 'Data pengumuman tidak valid atau terlalu besar.' }, 400); }
  if (!body || !Array.isArray(body.items) || body.items.length > 50) {
    return apiJson({ error: 'Daftar pengumuman harus berupa array dengan maksimal 50 item.' }, 400);
  }
  const ids = new Set();
  const items = [];
  for (const item of body.items) {
    const id = String(item?.id || '').trim();
    const date = String(item?.date || '').trim();
    const category = String(item?.category || '').trim();
    const title = String(item?.title || '').trim();
    const area = String(item?.area || '').trim();
    const excerpt = String(item?.excerpt || '').trim();
    const content = String(item?.content || '').trim();
    if (!/^[a-zA-Z0-9_-]{3,80}$/.test(id) || ids.has(id)) return apiJson({ error: 'ID pengumuman tidak valid atau duplikat.' }, 400);
    if (Number.isNaN(Date.parse(date))) return apiJson({ error: `Tanggal pengumuman ${title || id} tidak valid.` }, 400);
    if (!CATEGORIES.has(category)) return apiJson({ error: `Kategori pengumuman ${title || id} tidak valid.` }, 400);
    if (!title || title.length > 120 || area.length > 140 || !excerpt || excerpt.length > 320 || !content || content.length > 5000) {
      return apiJson({ error: `Lengkapi judul, ringkasan, dan isi. Batas judul 120, wilayah 140, ringkasan 320, isi 5.000 karakter.` }, 400);
    }
    ids.add(id);
    items.push({ id, date, category, title, area, excerpt, content });
  }
  items.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  const saved = { updatedAt: new Date().toISOString(), items };
  await context.env.ANANTA_DATA.put('public:announcements', JSON.stringify(saved), { metadata: { updatedAt: saved.updatedAt, count: items.length } });
  return apiJson({ ok: true, data: saved });
}
