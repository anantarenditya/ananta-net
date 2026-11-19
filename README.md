ANANTA.NET website package.

Navigation active-state refinement:
- Highlights the current page in the mobile menu with a light teal background, visible teal left stripe, and “Halaman ini” label.
- Resolves the active route using pathname first, then canonical URL and page title/breadcrumb as fallbacks. Detail Paket maps to Paket Langganan.

Keep all files together when copying to the `ananta-net` repository. Do not replace or delete the repository's `.git` folder.


Active navigation fix: every HTML page now declares an explicit `data-page` identity. The shared navigation uses this identity first, then URL/canonical/breadcrumb fallback. The active menu uses a mint background, teal left accent, and “Halaman ini” pill on mobile; detail-paket maps to Paket Langganan. Cache-busting query parameters are applied to shared CSS and JS references so the latest nav logic is fetched after deployment.


Admin WhatsApp number update (2026-11-18):
- Display number: 0815 1377 1177.
- WhatsApp destination configured centrally as 6281513771177.
- Structured Organization and ContactPoint telephone metadata updated.
- Shared CSS/JS cache-busting references refreshed.


## Perbaikan header Home (18 November 2026)

- Mengubah `overflow-x` pada `body.home-page` dari `hidden` menjadi `clip`.
- `overflow-x: hidden` pada body membuat pasangan overflow vertikal yang `visible` dihitung menjadi `auto`, sehingga body menjadi scroll container terdekat dan `position: sticky` pada header tidak menempel ke viewport pada Home.
- `overflow-x: clip` tetap memotong limpahan horizontal tanpa membentuk scroll container, sehingga header Home mengikuti perilaku sticky halaman lain.
- Cache stylesheet diperbarui ke `home-sticky-20261118`.


## Status Jaringan dan Pengumuman Pelanggan (19 November 2026)

Dua halaman baru ditambahkan: `status-jaringan.html` dan `pengumuman.html`. Data awal/cadangan disimpan di folder `data/`. Setelah Admin Dashboard dan Cloudflare KV dikonfigurasi, data yang ditampilkan berasal dari API dashboard; JSON statis digunakan sebagai fallback sebelum backend diaktifkan.

### Metode cadangan: memperbarui status melalui JSON

Metode ini dapat dipakai sebelum KV dikonfigurasi. Setelah dashboard aktif, gunakan dashboard sebagai sumber utama. Jika memakai metode JSON, edit `data/status-jaringan.json`, lalu isi:
- `updatedAt`: waktu pembaruan ISO 8601 beserta zona waktu, misalnya `2026-11-19T09:30:00+07:00`.
- `overallStatus`: `normal`, `gangguan`, `pemeliharaan`, atau `unknown`.
- `summary`: ringkasan kondisi jaringan.
- `areas`: array wilayah dengan `name`, `status`, dan `note`. Nama area awal: Kalibendo, Bades, Gondoruso.

Contoh status normal setelah benar-benar dikonfirmasi:

```json
{
  "updatedAt": "2026-11-19T09:30:00+07:00",
  "overallStatus": "normal",
  "summary": "Jaringan terpantau normal berdasarkan pemeriksaan admin.",
  "areas": [
    {"name":"Kalibendo","status":"normal","note":"Tidak ada laporan gangguan yang diketahui saat pembaruan."},
    {"name":"Bades","status":"normal","note":"Tidak ada laporan gangguan yang diketahui saat pembaruan."},
    {"name":"Gondoruso","status":"normal","note":"Tidak ada laporan gangguan yang diketahui saat pembaruan."}
  ]
}
```

Jangan menandai status `normal` kecuali sudah diperiksa. Halaman ini **bukan monitoring otomatis** dari MikroTik/OLT; informasi hanya berubah setelah admin memperbarui JSON dan melakukan deployment.

### Metode cadangan: menambahkan pengumuman melalui JSON

Metode ini dapat dipakai sebelum KV dikonfigurasi. Setelah dashboard aktif, gunakan dashboard sebagai sumber utama. Jika memakai metode JSON, edit `data/pengumuman.json` dan tambahkan objek ke array `items`:

```json
{
  "updatedAt": "2026-11-19T09:30:00+07:00",
  "items": [
    {
      "id": "info-20261119-01",
      "date": "2026-11-19T09:30:00+07:00",
      "category": "informasi",
      "title": "Judul pengumuman",
      "area": "Kalibendo, Bades, dan Gondoruso",
      "excerpt": "Ringkasan singkat yang tampil di daftar pengumuman.",
      "content": "Informasi lengkap untuk pelanggan."
    }
  ]
}
```

Kategori yang didukung: `gangguan`, `pemeliharaan`, `informasi`, `promo`. Hapus objek pengumuman yang tidak lagi relevan atau tambahkan informasi penyelesaian dengan tanggal baru.

### Deployment untuk metode JSON cadangan

Jika mengedit file JSON secara manual, jalankan `git add .`, `git commit -m "Update network status and customer announcements"`, lalu `git push origin main`. Tunggu Cloudflare Pages berstatus Success. Untuk metode dashboard (KV), perubahan isi tidak memerlukan Git Push atau deployment ulang.

Nomor admin WhatsApp tetap menggunakan `0815 1377 1177` (tujuan WhatsApp `6281513771177`).


## Penyegaran halaman Status Jaringan dan Pengumuman (19 November 2026)

- Hero kedua halaman kini memakai pola judul, animasi per huruf, breadcrumb, pill ikon, font, dan latar titik yang sama dengan halaman Paket, Area, dan FAQ.
- Area konten menggunakan latar lembut berpola, kartu dengan radius/border/shadow yang konsisten, tipografi Inter dari stylesheet utama, dan jarak responsif untuk HP.
- Ringkasan status dan CTA memakai panel navy-teal, sementara kartu area dan pengumuman tetap terang agar informasi mudah dibaca.
- Navigasi desktop disetel agar 11 tautan satu baris dan tidak terpotong menjadi dua baris pada lebar desktop. Pada layar lebih kecil, navigasi tetap menggunakan hamburger.
- Setelah Admin Dashboard aktif, halaman publik membaca `/api/status` dan `/api/announcements` dari KV. Sebelum KV dikonfigurasi, halaman memakai `data/status-jaringan.json` dan `data/pengumuman.json` sebagai fallback.


## Admin Dashboard ANANTA.NET (19 November 2026)

Website kini memiliki dashboard admin di `/admin/` untuk mengelola Status Jaringan dan Pengumuman dari HP atau laptop. Halaman publik tetap berada di URL biasa dan membaca data terbaru dari API Pages Functions. File JSON pada `data/` tetap dipertahankan sebagai cadangan/fallback statis.

### Fitur dashboard
- Login admin dengan cookie sesi bertanda tangan HMAC, `HttpOnly`, `Secure`, dan `SameSite=Strict` (masa sesi 8 jam).
- Proteksi endpoint tulis dengan pemeriksaan `Origin` dan pembatasan percobaan login sederhana berbasis IP.
- Mengubah status keseluruhan dan status Kalibendo, Bades, serta Gondoruso.
- Membuat, mengedit, dan menghapus pengumuman Gangguan, Pemeliharaan, Informasi, dan Promo.
- Data disimpan di Cloudflare Workers KV; halaman publik membaca `/api/status` dan `/api/announcements` tanpa cache.
- Tidak ada kata sandi atau secret yang disimpan di repository.

### Pengaturan Cloudflare yang wajib dilakukan satu kali

> Dashboard tidak akan dapat login/simpan data sampai KV dan secrets dikonfigurasi. Jangan membuat kata sandi di file HTML atau commit ke Git.

1. Buka Cloudflare Dashboard → **Workers & Pages** → **KV** (atau menu Storage & Databases → KV) → buat namespace, misalnya `ananta-net-content`.
2. Buka project Pages **ananta-net** → **Settings → Bindings → Add → KV namespace**. Isi **Variable name** persis `ANANTA_DATA`, pilih namespace yang baru dibuat, lalu simpan. Lakukan untuk environment Production; Preview boleh menggunakan namespace terpisah. Redeploy agar binding aktif.
3. Masih di project Pages, buka **Settings → Variables and Secrets**. Tambahkan dua nilai dengan tipe **Secret** pada Production:
   - `ADMIN_PASSWORD`: buat kata sandi admin yang kuat dan unik. Jangan gunakan nomor telepon atau kata sandi yang dipakai di layanan lain.
   - `SESSION_SECRET`: string acak minimal 32 karakter. Contoh membuatnya di terminal Node.js: `node -e "console.log(require('crypto').randomBytes(48).toString('base64'))"`. Salin hasilnya sebagai secret, jangan tulis ke Git.
4. Simpan pengaturan dan lakukan deployment ulang. Pastikan binding `ANANTA_DATA` dan kedua secrets berada di environment Production yang sama.
5. Buka `https://ananta-net.pages.dev/admin/`, login menggunakan `ADMIN_PASSWORD`, lalu kelola Status Jaringan atau Pengumuman.

Cloudflare Pages Functions memakai folder `functions/` di root dan `_routes.json` membatasi eksekusi Function hanya untuk `/api/*`, sehingga halaman dan aset statis lainnya tetap disajikan sebagai aset statis. Dokumentasi resmi: https://developers.cloudflare.com/pages/functions/routing/ ; https://developers.cloudflare.com/pages/functions/bindings/ ; https://developers.cloudflare.com/pages/functions/bindings/#secrets

### Cara menggunakan dashboard
- **Status Jaringan:** pilih status keseluruhan, tulis ringkasan, atur status dan catatan masing-masing wilayah, lalu klik Simpan Status Jaringan. Waktu pembaruan terisi otomatis.
- **Pengumuman:** isi judul, kategori, tanggal/waktu, area, ringkasan, dan isi lengkap. Klik Terbitkan Pengumuman. Untuk mengubah atau menghapus pengumuman, gunakan tombol Edit atau Hapus pada daftar.
- Setelah berhasil disimpan, API publik akan menyajikan data dari KV. Tidak perlu Git Push lagi untuk setiap perubahan isi status/pengumuman. Perubahan kode atau desain tetap memerlukan deployment.

### Catatan operasional dan keamanan
- Status jaringan tetap merupakan pembaruan manual admin; dashboard tidak membaca MikroTik atau OLT secara otomatis.
- Simpan `ADMIN_PASSWORD` dan `SESSION_SECRET` secara aman. Jika `SESSION_SECRET` diganti, semua sesi login sebelumnya otomatis tidak berlaku.
- Untuk logout, gunakan tombol Keluar di dashboard. Sesi juga berakhir otomatis setelah 8 jam.
- Login dibatasi setelah 8 percobaan gagal dalam jendela 10 menit per IP. Untuk penggunaan produksi yang lebih luas, aktifkan juga aturan keamanan/rate limiting di Cloudflare.
- Workers KV bersifat eventually consistent; setelah simpan, perubahan publik dapat membutuhkan waktu singkat untuk tersebar di edge Cloudflare.
- Dashboard belum mengelola paket/harga, galeri, atau data pelanggan; hanya Status Jaringan dan Pengumuman sesuai tahap ini.
