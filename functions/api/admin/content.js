import { apiJson, requireAdmin, safeJsonFromKv, readJsonBody, sameOrigin } from '../_middleware.js';

const DEFAULT_CONTENT = {
  packages: [
    {id:'hemat',name:'Home',speed:20,price:115000,devices:'3–5 perangkat terhubung',activeDevices:'sekitar 2–3 aktif bersamaan',description:'Cocok untuk kebutuhan internet sehari-hari.',popular:false,active:true},
    {id:'normal',name:'Family',speed:35,price:165000,devices:'5–8 perangkat terhubung',activeDevices:'sekitar 3–4 aktif bersamaan',description:'Cocok untuk kebutuhan keluarga.',popular:true,active:true},
    {id:'premium',name:'Pro',speed:50,price:225000,devices:'8–12 perangkat terhubung',activeDevices:'sekitar 4–6 aktif bersamaan',description:'Cocok untuk kebutuhan internet aktif tinggi.',popular:false,active:true},
    {id:'pro',name:'Promax',speed:100,price:335000,devices:'12–20 perangkat terhubung',activeDevices:'sekitar 6–10 aktif bersamaan',description:'Cocok untuk usaha rumahan, WFH, dan online shop.',popular:false,active:true}
  ],
  areas: [
    {id:'kalibendo',name:'Kalibendo',label:'Desa Kalibendo',lat:-8.2288,lng:113.1021,status:'covered',note:'Hubungi admin untuk memastikan ketersediaan di titik rumah.'},
    {id:'bades',name:'Bades',label:'Desa Bades',lat:-8.2342,lng:113.1095,status:'covered',note:'Hubungi admin untuk memastikan ketersediaan di titik rumah.'},
    {id:'gondoruso',name:'Gondoruso',label:'Desa Gondoruso',lat:-8.2423,lng:113.0714,status:'covered',note:'Hubungi admin untuk memastikan ketersediaan di titik rumah.'}
  ],
  faqs: [
    {id:'faq-los',category:'Gangguan',question:'Apa yang harus dilakukan jika lampu LOS menyala merah?',answer:'Periksa kabel fiber optik yang terlihat di dalam rumah dan pastikan tidak tertekuk atau terlepas. Jangan melihat langsung ke ujung konektor fiber. Hubungi admin ANANTA.NET agar teknisi dapat melakukan pemeriksaan.'},
    {id:'faq-slow',category:'Koneksi',question:'Kenapa internet terasa lambat?',answer:'Coba dekatkan perangkat ke router, putuskan perangkat yang tidak digunakan, lalu mulai ulang router. Jika masih lambat, hubungi admin dan sertakan waktu kejadian serta indikator lampu modem.'},
    {id:'faq-pay',category:'Pembayaran',question:'Bagaimana cara membayar tagihan?',answer:'Hubungi admin ANANTA.NET untuk memperoleh informasi metode pembayaran dan konfirmasi pembayaran yang berlaku.'},
    {id:'faq-install',category:'Pemasangan',question:'Bagaimana cara memasang WiFi ANANTA.NET?',answer:'Pilih paket, kirim lokasi rumah kepada admin, tunggu konfirmasi jangkauan dan survei, lalu jadwalkan pemasangan.'}
  ],
  updatedAt:null
};
const validId = value => /^[a-z0-9][a-z0-9_-]{1,59}$/i.test(value);
export async function onRequestGet(context) {
  const denied = await requireAdmin(context); if (denied) return denied;
  try { return apiJson(await safeJsonFromKv(context.env, 'public:content', DEFAULT_CONTENT)); }
  catch { return apiJson({error:'Gagal membaca data konten.'},500); }
}
export async function onRequestPut(context) {
  const denied = await requireAdmin(context); if (denied) return denied;
  if (!sameOrigin(context.request)) return apiJson({error:'Asal permintaan tidak diizinkan.'},403);
  let body; try { body = await readJsonBody(context.request, 100000); }
  catch { return apiJson({error:'Format data tidak valid atau terlalu besar.'},400); }
  if (!body || !Array.isArray(body.packages) || !Array.isArray(body.areas) || !Array.isArray(body.faqs)) return apiJson({error:'Data paket, wilayah, dan FAQ wajib berupa daftar.'},400);
  if (body.packages.length > 30 || body.areas.length > 100 || body.faqs.length > 100) return apiJson({error:'Batas data terlampaui.'},400);
  const ids = new Set();
  for (const p of body.packages) {
    if (!validId(String(p?.id||'')) || ids.has(p.id) || !String(p.name||'').trim() || String(p.name).length>60 || !Number.isFinite(Number(p.speed)) || Number(p.speed)<1 || Number(p.speed)>10000 || !Number.isFinite(Number(p.price)) || Number(p.price)<0 || Number(p.price)>100000000 || !String(p.description||'').trim()) return apiJson({error:'Data paket tidak valid. Periksa ID, nama, kecepatan, harga, dan deskripsi.'},400);
    ids.add(p.id);
  }
  ids.clear();
  for (const a of body.areas) {
    if (!validId(String(a?.id||'')) || ids.has(a.id) || !String(a.name||'').trim() || String(a.name).length>80 || !Number.isFinite(Number(a.lat)) || Math.abs(Number(a.lat))>90 || !Number.isFinite(Number(a.lng)) || Math.abs(Number(a.lng))>180 || !['covered','planned','unavailable'].includes(a.status)) return apiJson({error:'Data wilayah tidak valid. Periksa ID, nama, koordinat, dan status.'},400);
    ids.add(a.id);
  }
  ids.clear();
  for (const f of body.faqs) {
    if (!validId(String(f?.id||'')) || ids.has(f.id) || !String(f.category||'').trim() || String(f.category).length>50 || !String(f.question||'').trim() || String(f.question).length>220 || !String(f.answer||'').trim() || String(f.answer).length>5000) return apiJson({error:'Data FAQ tidak valid. Lengkapi kategori, pertanyaan, dan jawaban.'},400);
    ids.add(f.id);
  }
  const saved = {
    packages: body.packages.map(p=>({id:String(p.id),name:String(p.name).trim(),speed:Number(p.speed),price:Number(p.price),devices:String(p.devices||''),activeDevices:String(p.activeDevices||''),description:String(p.description).trim(),popular:Boolean(p.popular),active:p.active!==false})),
    areas: body.areas.map(a=>({id:String(a.id),name:String(a.name).trim(),label:String(a.label||`Desa ${a.name}`).trim(),lat:Number(a.lat),lng:Number(a.lng),status:a.status,note:String(a.note||'').slice(0,500)})),
    faqs: body.faqs.map(f=>({id:String(f.id),category:String(f.category).trim(),question:String(f.question).trim(),answer:String(f.answer).trim(),active:f.active!==false})),
    updatedAt:new Date().toISOString()
  };
  await context.env.ANANTA_DATA.put('public:content',JSON.stringify(saved),{metadata:{updatedAt:saved.updatedAt,packages:saved.packages.length,areas:saved.areas.length,faqs:saved.faqs.length}});
  return apiJson({ok:true,data:saved});
}
