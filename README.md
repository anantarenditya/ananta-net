ANANTA.NET — Perbaikan Scroll Home dan Visibilitas Footer

Yang diperbaiki:
- Memastikan halaman Home dan footer tetap berada di alur dokumen normal dan dapat digulir di browser HP.
- Menghapus status scroll terkunci yang tertinggal pada Home jika tidak ada pratinjau foto terbuka.
- Memberi ruang bawah tambahan agar akhir footer tidak terlalu mepet bilah navigasi HP.
- Pada layar HP, informasi "Didukung oleh PT Chayo Anugrah Teknologi" ditampilkan sebelum daftar menu yang lebih panjang. Pada desktop, urutan footer tidak berubah.
- Logo ANANTA.NET, tombol admin, dan isi website lainnya dipertahankan.

Cara memperbarui:
1. Extract ZIP dan salin seluruh isinya ke repository ananta-net tanpa menghapus folder .git.
2. Jalankan: git add .
3. Jalankan: git commit -m "Fix home page scroll and footer visibility"
4. Jalankan: git push origin main
5. Tunggu deployment Cloudflare Pages berstatus Success.
