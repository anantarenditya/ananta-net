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

Dua halaman baru ditambahkan: `status-jaringan.html` dan `pengumuman.html`. Keduanya memakai data JSON statis di folder `data/` agar admin dapat memperbarui informasi tanpa mengubah HTML atau JavaScript.

### Memperbarui status jaringan

Edit `data/status-jaringan.json`, lalu isi:
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

### Menambahkan pengumuman

Edit `data/pengumuman.json`. Tambahkan objek ke array `items`:

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

### Deployment

Setelah mengubah JSON, jalankan `git add .`, `git commit -m "Update network status and customer announcements"`, lalu `git push origin main`. Tunggu Cloudflare Pages berstatus Success. Berkas `/data/*` diberi header `Cache-Control: no-store` supaya pembaruan tidak tertahan cache browser/CDN.

Nomor admin WhatsApp tetap menggunakan `0815 1377 1177` (tujuan WhatsApp `6281513771177`).
