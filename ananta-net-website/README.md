# ANANTA.NET Website

Website katalog multi-page untuk ANANTA.NET.

## Teknologi
- HTML5
- CSS3
- JavaScript vanilla
- Tanpa database/backend
- Siap untuk GitHub Pages atau Cloudflare Pages

## Halaman
- Home
- Tentang Kami
- Paket Internet
- Detail Paket
- Area Layanan
- Keunggulan Layanan
- Cara Berlangganan
- Galeri
- FAQ
- Syarat & Ketentuan
- Kontak

## Aset
- `assets/logo-ananta.png` = logo usaha yang dikirim pengguna
- `assets/logo-chayo.png` = logo ISP yang dikirim pengguna
- `assets/gallery/` = foto perangkat dan dokumentasi instalasi lapangan

## Deploy online
1. Upload seluruh folder ke GitHub sebagai repository baru.
2. Untuk GitHub Pages: Settings → Pages → Deploy from branch → pilih branch `main` dan folder `/ (root)`.
3. Untuk Cloudflare Pages: buat project baru dari repository GitHub dan gunakan framework preset `None` / static site.
4. Setelah deploy, hosting akan memberi URL publik `https://...` yang dapat dibagikan.

Map area layanan menggunakan Leaflet + OpenStreetMap dengan penanda Kalibendo, Bades, dan Gondoruso. Peta membutuhkan koneksi internet saat halaman dibuka.

Versi ini merapikan halaman Tentang Kami: logo dipadatkan, komitmen dibuat grid yang lebih ringkas, ditambah highlight komitmen dan CTA WhatsApp sebelum footer.
