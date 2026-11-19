import { apiJson, safeJsonFromKv } from './_middleware.js';

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

export async function onRequestGet({env}) {
  if (!env.ANANTA_DATA) return apiJson(DEFAULT_CONTENT, 200, {'X-ANANTA-Data-Source':'fallback'});
  try {
    const data = await safeJsonFromKv(env, 'public:content', DEFAULT_CONTENT);
    return apiJson({...DEFAULT_CONTENT, ...data});
  } catch (error) {
    return apiJson(DEFAULT_CONTENT, 200, {'X-ANANTA-Data-Source':'fallback'});
  }
}
