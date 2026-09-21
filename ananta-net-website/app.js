const WA_NUMBER = '6285803004649';
const WA_BASE = `https://wa.me/${WA_NUMBER}`;

const packages = [
  {id:'hemat',name:'Hemat',speed:10,price:100000,devices:'1–3 perangkat',description:'Cocok untuk browsing, media sosial, belajar, dan streaming ringan.'},
  {id:'normal',name:'Normal',speed:15,price:125000,devices:'3–5 perangkat',description:'Cocok untuk browsing, media sosial, YouTube, video call, dan game online ringan.'},
  {id:'premium',name:'Premium',speed:20,price:150000,devices:'4–7 perangkat',description:'Cocok untuk keluarga dengan penggunaan internet lebih aktif, seperti streaming, meeting online, dan bermain game.'},
  {id:'pro',name:'Pro',speed:30,price:200000,devices:'6–10 perangkat',description:'Cocok untuk penggunaan bersama dengan banyak perangkat, seperti streaming, gaming, kerja, dan aktivitas online sehari-hari.'}
];

function money(n){return new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(n)}
function waLink(message='Halo Admin ANANTA.NET, saya ingin bertanya tentang layanan WiFi.'){
  return `${WA_BASE}?text=${encodeURIComponent(message)}`;
}

function injectHeader(){
  const el=document.querySelector('[data-site-header]');
  if(!el) return;
  el.innerHTML=`
    <div class="topbar"><div class="container inner"><span>ANANTA.NET — WiFi Hemat, Koneksi Mantap.</span><span>Internet rumahan lokal untuk Kalibendo, Bades, Gondoruso & sekitarnya.</span></div></div>
    <header class="navbar">
      <div class="container nav-inner">
        <a class="brand" href="index.html" aria-label="ANANTA.NET"><img src="assets/logo-ananta.png" alt="Logo ANANTA.NET"><span>ANANTA.NET</span></a>
        <nav class="nav-links" aria-label="Navigasi utama">
          <a href="index.html" data-nav="index.html">Home</a>
          <a href="tentang.html" data-nav="tentang.html">Tentang Kami</a>
          <a href="paket.html" data-nav="paket.html">Paket</a>
          <a href="area.html" data-nav="area.html">Area Layanan</a>
          <a href="berlangganan.html" data-nav="berlangganan.html">Cara Berlangganan</a>
          <a href="galeri.html" data-nav="galeri.html">Galeri</a>
          <a href="faq.html" data-nav="faq.html">FAQ</a>
          <a href="syarat-ketentuan.html" data-nav="syarat-ketentuan.html">S&K</a>
          <a href="kontak.html" data-nav="kontak.html">Kontak</a>
        </nav>
        <div class="actions"><button class="icon-btn" id="themeToggle" aria-label="Ubah tema">◐</button><button class="menu-btn" id="menuToggle" aria-label="Buka menu">☰</button></div>
      </div>
      <div class="container nav-mobile" id="mobileNav">
        <a href="index.html">Home</a><a href="tentang.html">Tentang Kami</a><a href="paket.html">Paket</a><a href="area.html">Area Layanan</a><a href="berlangganan.html">Cara Berlangganan</a><a href="galeri.html">Galeri</a><a href="faq.html">FAQ</a><a href="syarat-ketentuan.html">S&K</a><a href="kontak.html">Kontak</a>
      </div>
    </header>`;
  const path=location.pathname.split('/').pop()||'index.html';
  el.querySelectorAll('[data-nav]').forEach(a=>{ if(a.getAttribute('data-nav')===path) a.classList.add('active'); });
  document.getElementById('menuToggle')?.addEventListener('click',()=>document.getElementById('mobileNav').classList.toggle('open')); document.querySelectorAll('#mobileNav a').forEach(a=>a.addEventListener('click',()=>document.getElementById('mobileNav').classList.remove('open')));
  document.getElementById('themeToggle')?.addEventListener('click',()=>{document.body.classList.toggle('dark-mode');localStorage.setItem('ananta-theme',document.body.classList.contains('dark-mode')?'dark':'light')});
  if(localStorage.getItem('ananta-theme')==='dark') document.body.classList.add('dark-mode');
}
function injectFooter(){
  const el=document.querySelector('[data-site-footer]'); if(!el) return;
  el.innerHTML=`<footer><div class="container"><div class="footer-grid">
    <div><div class="footer-brand"><img src="assets/logo-ananta.png" alt="ANANTA.NET"><div><h4>ANANTA.NET</h4><div>WiFi Hemat, Koneksi Mantap.</div><p style="margin:8px 0 0;color:#b7c9d5">Layanan internet rumahan dengan pelayanan yang ramah, responsif, dan dukungan teknis.</p></div></div></div>
    <div><h4>Menu</h4><div class="footer-links"><a href="index.html">Home</a><a href="tentang.html">Tentang Kami</a><a href="paket.html">Paket Internet</a><a href="area.html">Area Layanan</a><a href="berlangganan.html">Cara Berlangganan</a><a href="galeri.html">Galeri</a><a href="faq.html">FAQ</a><a href="syarat-ketentuan.html">S&K</a><a href="kontak.html">Kontak</a></div></div>
    <div><h4>Didukung oleh</h4><div class="powered"><img src="assets/logo-chayo.png" alt="Logo CHAYO"><div><strong style="color:#fff">PT Chayo Anugrah Teknologi</strong><div>Internet powered by PT Chayo Anugrah Teknologi</div></div></div></div>
  </div><div class="footer-bottom"><span>© 2026 ANANTA.NET. Seluruh hak dilindungi.</span><span>WiFi Hemat, Koneksi Mantap.</span></div></div></footer>`;
}
function initWhatsApp(){
  document.querySelectorAll('[data-wa]').forEach(btn=>btn.addEventListener('click',()=>{const msg=btn.dataset.wa || 'Halo Admin ANANTA.NET, saya ingin bertanya tentang layanan WiFi.'; window.open(waLink(msg),'_blank','noopener');}));
  const float=document.querySelector('[data-float-wa]'); if(float) float.addEventListener('click',()=>window.open(waLink(),'_blank','noopener'));
}
function renderPackages(){
  const wraps=document.querySelectorAll('[data-package-grid]'); if(!wraps.length) return;
  wraps.forEach(wrap=>{
    const compact=wrap.dataset.compact==='true';
    const catalog=wrap.dataset.catalog==='true';
    wrap.innerHTML=packages.map((p)=>{
      const summary=p.description.split(/,(?=\s)|\.(?=\s|$)/)[0].trim();
      const list=compact
        ? `<ul><li>${p.devices}</li><li>${summary}.</li></ul>`
        : catalog
          ? `<ul><li>Biaya pemasangan: Rp100.000</li><li>${p.devices}</li><li>${summary}.</li></ul>`
          : `<ul><li>Biaya pemasangan: Rp100.000</li><li>${p.devices}</li><li>${p.description}</li></ul>`;
      return `<article class="card package-card ${p.id==='premium'?'featured':''} ${compact?'package-card-compact':''}">
        ${p.id==='premium'?'<span class="ribbon">Pilihan Populer</span>':''}
        <h3>Paket ${p.name}</h3><div class="speed">${p.speed} Mbps</div><div class="price">${money(p.price)}<small>/bulan</small></div>
        ${list}
        <div class="card-actions"><a class="btn btn-ghost" href="detail-paket.html?plan=${p.id}">Lihat Detail</a><button class="btn btn-primary" data-wa="Halo Admin ANANTA.NET, saya ingin berlangganan Paket ${p.name} ${p.speed} Mbps seharga ${money(p.price)}/bulan.">Berlangganan</button></div>
      </article>`;
    }).join('');
  });
  initWhatsApp();
}
function renderDetail(){
  const mount=document.querySelector('[data-package-detail]'); if(!mount) return;
  const id=new URLSearchParams(location.search).get('plan')||'hemat'; const p=packages.find(x=>x.id===id)||packages[0];
  mount.innerHTML=`<div class="two-col"><div class="card content-card"><span class="badge" style="background:var(--surface-2);color:var(--primary-dark);border-color:var(--border)">Paket Internet</span><h2 style="font-size:2.2rem;margin:16px 0 4px">Paket ${p.name}</h2><div class="speed">${p.speed} Mbps</div><div class="price" style="font-size:1.55rem">${money(p.price)}<small>/bulan</small></div><p style="color:var(--muted)">${p.description}</p><ul class="list-check"><li>✓ Biaya pemasangan Rp100.000</li><li>✓ Cocok untuk ${p.devices}</li><li>✓ Kecepatan mengikuti paket yang dipilih</li></ul><div class="btns"><button class="btn btn-primary" data-wa="Halo Admin ANANTA.NET, saya tertarik Paket ${p.name} ${p.speed} Mbps seharga ${money(p.price)}/bulan. Saya ingin mengetahui ketersediaan pemasangan.">Berlangganan via WhatsApp</button><a class="btn btn-ghost" href="paket.html">Kembali ke Paket</a></div></div><div class="card content-card"><h3>Keterangan</h3><p class="prose">${p.description}</p><div style="margin-top:28px;padding:18px;border-radius:16px;background:var(--surface-2)"><strong>Catatan kecepatan</strong><p style="margin:6px 0 0;color:var(--muted)">Kecepatan layanan dapat dipengaruhi kondisi jaringan, perangkat pelanggan, jumlah perangkat yang terhubung, dan kondisi penggunaan.</p></div></div></div>`;
  initWhatsApp();
}
function initFAQ(){document.querySelectorAll('[data-faq-item]').forEach(item=>item.querySelector('.faq-q')?.addEventListener('click',()=>item.classList.toggle('open')))}
function initTerms(){document.querySelectorAll('[data-term-item]').forEach(item=>item.querySelector('.term-head')?.addEventListener('click',()=>item.classList.toggle('open')))}
function initGallery(){
  const buttons=document.querySelectorAll('[data-filter]'); const items=document.querySelectorAll('[data-gallery-item]');
  buttons.forEach(b=>b.addEventListener('click',()=>{buttons.forEach(x=>x.classList.remove('active'));b.classList.add('active'); const f=b.dataset.filter; items.forEach(i=>{i.style.display=(f==='all'||i.dataset.cat===f)?'block':'none'})}));
}
function initCalculator(){
  const count=document.querySelector('#deviceCount'); const use=document.querySelector('#useType'); const result=document.querySelector('[data-calc-result]'); if(!count||!use||!result) return;
  function calc(){
    const n=Number(count.value)||1; const u=use.value;
    let p=packages[0];
    if(n>=4) p=packages[2]; else if(n>=3) p=packages[1];
    if(u==='gaming' && n>=6) p=packages[3]; else if(u==='streaming' && n>=4) p=packages[2]; else if(u==='kerja' && n>=5) p=packages[2];
    result.innerHTML=`<div class="plan-name">Rekomendasi: Paket ${p.name}</div><div class="result-speed">${p.speed} Mbps</div><div style="font-size:1.2rem;font-weight:850">${money(p.price)}/bulan</div><p class="result-note">Perkiraan berdasarkan jumlah perangkat dan kebutuhan yang dipilih. Ketersediaan pemasangan tetap perlu dikonfirmasi ke admin.</p><a class="btn btn-primary" href="detail-paket.html?plan=${p.id}">Lihat Detail Paket</a>`;
  }
  count.addEventListener('input',calc); use.addEventListener('change',calc); calc();
}
function initAreaChecker(){
  const select=document.querySelector('#areaSelect'); const result=document.querySelector('[data-area-result]'); if(!select||!result) return;
  select.addEventListener('change',()=>{const v=select.value; result.textContent=v==='Lainnya'?'Silakan hubungi admin untuk pengecekan titik pemasangan di area Anda.':`Area ${v} tercantum dalam wilayah layanan ANANTA.NET. Ketersediaan pemasangan tetap perlu dikonfirmasi melalui WhatsApp.`;});
}

injectHeader(); injectFooter(); renderPackages(); renderDetail(); initFAQ(); initTerms(); initGallery(); initCalculator(); initAreaChecker(); initWhatsApp();
