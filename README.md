# ANANTA.NET — Premium Dark Home

Pembaruan ini menerapkan konsep visual **Premium Dark** pada halaman Home saja.

## Perubahan
- Palet Home menjadi charcoal, midnight navy, electric blue, dan ice blue.
- Header Home memakai efek dark glass dan tetap sticky.
- Hero, foto dokumentasi, tombol, panel 250+ pelanggan, kartu keunggulan, paket, area layanan, cara berlangganan, galeri, FAQ, CTA, dan footer Home disesuaikan dengan tema baru.
- Logo asli ANANTA.NET, foto dokumentasi yang sudah ada, nomor admin, harga paket, tautan, peta, dan fungsi interaktif dipertahankan.
- Halaman selain Home tidak menggunakan tema Premium Dark.

## Pemasangan
Salin seluruh isi folder `phone-update-work` ke root repository `ananta-net` di VS Code. Pilih Replace jika diminta, tetapi jangan hapus folder `.git`.

Lalu jalankan:

```bash
git add .
git commit -m "Apply Premium Dark theme to Home"
git push origin main
```

Tunggu Cloudflare Pages berstatus Success, kemudian muat ulang website. Bila browser masih menampilkan CSS lama, lakukan hard refresh.
