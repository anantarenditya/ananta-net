ANANTA.NET — Modern Home Refresh

Isi paket ini adalah website ANANTA.NET lengkap, dengan penyegaran visual pada halaman Home.

Yang berubah pada Home:
- Hero section menjadi layout dua kolom di desktop dan susunan vertikal di HP.
- Menggunakan foto dokumentasi teknisi ANANTA.NET yang sudah ada di assets/hero-instalasi.jpg.
- Tombol Lihat Paket dan Hubungi Admin lebih jelas.
- Ringkasan 250+ pelanggan, empat pilihan paket, dan wilayah layanan ditata ulang.
- Empat kartu keunggulan dirapikan menjadi satu baris pada desktop dan dua kolom pada HP.

Yang dipertahankan:
- Logo ANANTA.NET asli.
- Warna utama navy dan teal.
- Animasi judul per huruf.
- Header sticky Home dan menu aktif.
- Nomor admin WhatsApp 0815 1377 1177.
- Harga dan rincian empat paket.
- Peta Leaflet, halaman Area Layanan, dan halaman lain.
- Informasi dukungan PT Chayo Anugrah Teknologi di footer.

Cara memasang:
1. Ekstrak ZIP.
2. Buka folder ananta-net-website di dalam hasil ekstrak.
3. Salin seluruh isi folder tersebut ke folder repository ananta-net di komputer Anda.
4. Pilih Replace bila diminta. Jangan hapus folder .git milik repository.
5. Jalankan:
   git add .
   git commit -m "Refresh ANANTA.NET home design"
   git push origin main
6. Tunggu deployment Cloudflare Pages berstatus Success.
7. Buka https://ananta-net.pages.dev/ lalu lakukan hard refresh.

Catatan: perubahan tampilan Home baru akan terlihat di website publik setelah file di-push ke GitHub dan deployment Cloudflare berhasil.
