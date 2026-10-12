const WA_NUMBER = '6285803004649';
const WA_BASE = `https://wa.me/${WA_NUMBER}`;

const packages = [
  {id:'hemat',name:'Hemat',speed:20,price:115000,devices:'3–5 perangkat terhubung',activeDevices:'sekitar 2–3 aktif bersamaan',description:'Cocok untuk kebutuhan internet sehari-hari.'},
  {id:'normal',name:'Normal',speed:35,price:165000,devices:'5–8 perangkat terhubung',activeDevices:'sekitar 3–4 aktif bersamaan',description:'Cocok untuk kebutuhan keluarga.'},
  {id:'premium',name:'Premium',speed:50,price:225000,devices:'8–12 perangkat terhubung',activeDevices:'sekitar 4–6 aktif bersamaan',description:'Cocok untuk kebutuhan internet aktif tinggi.'},
  {id:'pro',name:'Pro',speed:100,price:335000,devices:'12–20 perangkat terhubung',activeDevices:'sekitar 6–10 aktif bersamaan',description:'Cocok untuk usaha rumahan, WFH, dan online shop.'}
];

function money(n){return new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(n)}
function waLink(message='Halo Admin ANANTA.NET, saya ingin bertanya tentang layanan WiFi.'){
  return `${WA_BASE}?text=${encodeURIComponent(message)}`;
}

function initHeroLetterAnimation(){
  const heading = document.querySelector('.hero-home .hero-title-motion');
  if (!heading || heading.dataset.letterAnimationReady === 'true') return;
  heading.dataset.letterAnimationReady = 'true';

  const words = Array.from(heading.querySelectorAll('.hero-word'));
  let characterIndex = 0;
  const staggerSeconds = 0.04;

  words.forEach((word, wordIndex) => {
    const text = word.textContent || '';
    word.textContent = '';
    Array.from(text).forEach((character) => {
      const letter = document.createElement('span');
      letter.className = 'hero-char';
      letter.textContent = character;
      letter.style.setProperty('--char-delay', `${(characterIndex * staggerSeconds).toFixed(3)}s`);
      letter.setAttribute('aria-hidden', 'true');
      word.appendChild(letter);
      characterIndex += 1;
    });
    // Leave a small timing gap between words while retaining their original layout.
    if (wordIndex < words.length - 1) characterIndex += 1;
  });
}

function injectHeader(){
  const el=document.querySelector('[data-site-header]');
  if(!el) return;
  el.innerHTML=`
    <div class="topbar"><div class="container inner"><span>ANANTA.NET — WiFi Hemat Koneksi Mantap</span><span>Internet rumahan lokal untuk Kalibendo, Bades, Gondoruso & sekitarnya.</span></div></div>
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
    <div><div class="footer-brand"><img src="assets/logo-ananta.png" alt="ANANTA.NET"><div><h4>ANANTA.NET</h4><div>WiFi Hemat Koneksi Mantap</div><p style="margin:8px 0 0;color:#b7c9d5">Layanan internet rumahan dengan pelayanan yang ramah, responsif, dan dukungan teknis.</p></div></div></div>
    <div><h4>Menu</h4><div class="footer-links"><a href="index.html">Home</a><a href="tentang.html">Tentang Kami</a><a href="paket.html">Paket Internet</a><a href="area.html">Area Layanan</a><a href="berlangganan.html">Cara Berlangganan</a><a href="galeri.html">Galeri</a><a href="faq.html">FAQ</a><a href="syarat-ketentuan.html">S&K</a><a href="kontak.html">Kontak</a></div></div>
    <div><h4>Didukung oleh</h4><div class="powered"><img src="assets/logo-chayo.png" alt="Logo CHAYO"><div><strong style="color:#fff">PT Chayo Anugrah Teknologi</strong><div>Internet powered by PT Chayo Anugrah Teknologi</div></div></div></div>
  </div><div class="footer-bottom"><span>© 2026 ANANTA.NET. Seluruh hak dilindungi.</span><span>WiFi Hemat Koneksi Mantap</span></div></div></footer>`;
}
function initWhatsApp(){
  document.querySelectorAll('[data-wa]').forEach(btn=>btn.addEventListener('click',()=>{const msg=btn.dataset.wa || 'Halo Admin ANANTA.NET, saya ingin bertanya tentang layanan WiFi.'; window.open(waLink(msg),'_blank','noopener');}));
  const float=document.querySelector('[data-float-wa]');
  if(float){
    float.innerHTML = `<svg viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false"><path class="wa-bubble" d="M20.45 11.62a8.37 8.37 0 0 1-12.36 7.31l-4.2 1.12 1.12-4.1a8.37 8.37 0 1 1 15.44-4.33Z"/><path class="wa-handset" d="M8.14 6.6c-.23-.5-.48-.51-.7-.52h-.6c-.21 0-.55.08-.83.39-.28.31-1.08 1.06-1.08 2.58s1.11 2.99 1.26 3.2c.16.2 2.18 3.5 5.38 4.77 2.66 1.05 3.2.84 3.78.79.58-.06 1.87-.76 2.13-1.49.27-.73.27-1.36.19-1.49-.08-.13-.28-.2-.58-.35l-2.03-.96c-.27-.1-.46-.15-.65.15-.19.29-.74.95-.9 1.15-.17.2-.33.22-.6.08-.28-.15-1.17-.43-2.23-1.37-.82-.73-1.38-1.63-1.54-1.91-.16-.29-.02-.44.12-.58.12-.12.28-.32.42-.48.14-.16.19-.28.28-.47.09-.19.05-.36-.02-.51L8.14 6.6Z"/></svg>`;
    float.setAttribute('aria-label','Hubungi ANANTA.NET melalui WhatsApp');
    float.setAttribute('title','Hubungi melalui WhatsApp');
    float.addEventListener('click',()=>window.open(waLink(),'_blank','noopener'));
  }
}
function renderPackages(){
  const wraps=document.querySelectorAll('[data-package-grid]'); if(!wraps.length) return;
  wraps.forEach(wrap=>{
    const compact=wrap.dataset.compact==='true';
    const catalog=wrap.dataset.catalog==='true';
    wrap.innerHTML=packages.map((p)=>{
      const summary=p.description.split(/,(?=\s)|\.(?=\s|$)/)[0].trim();
      const list=compact
        ? `<ul><li>${p.devices} · ${p.activeDevices}</li><li>${summary}</li></ul>`
        : catalog
          ? `<ul><li>Biaya pemasangan: Rp100.000</li><li>${p.devices} (perkiraan)</li><li>${p.activeDevices} (perkiraan)</li><li>${p.description}</li></ul>`
          : `<ul><li>Biaya pemasangan: Rp100.000</li><li>${p.devices} (perkiraan)</li><li>${p.activeDevices} (perkiraan)</li><li>${p.description}</li></ul>`;
      return `<article class="card package-card ${p.id==='normal'?'featured':''} ${compact?'package-card-compact':''}">
        ${p.id==='normal'?'<span class="ribbon">Pilihan Populer</span>':''}
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
  mount.innerHTML=`<div class="two-col"><div class="card content-card"><span class="badge" style="background:var(--surface-2);color:var(--primary-dark);border-color:var(--border)">Paket Internet</span><h2 style="font-size:2.2rem;margin:16px 0 4px">Paket ${p.name}</h2><div class="speed">${p.speed} Mbps</div><div class="price" style="font-size:1.55rem">${money(p.price)}<small>/bulan</small></div><p style="color:var(--muted)">${p.description}</p><ul class="list-check"><li>✓ Biaya pemasangan Rp100.000</li><li>✓ Perkiraan ${p.devices}</li><li>✓ ${p.activeDevices} untuk penggunaan umum</li><li>✓ Kecepatan mengikuti paket yang dipilih</li></ul><div class="btns"><button class="btn btn-primary" data-wa="Halo Admin ANANTA.NET, saya tertarik Paket ${p.name} ${p.speed} Mbps seharga ${money(p.price)}/bulan. Saya ingin mengetahui ketersediaan pemasangan.">Berlangganan via WhatsApp</button><a class="btn btn-ghost" href="paket.html">Kembali ke Paket</a></div></div><div class="card content-card"><h3>Keterangan</h3><p class="prose">${p.description}</p><div style="margin-top:28px;padding:18px;border-radius:16px;background:var(--surface-2)"><strong>Catatan kecepatan</strong><p style="margin:6px 0 0;color:var(--muted)">Kecepatan layanan dapat dipengaruhi kondisi jaringan, perangkat pelanggan, jumlah perangkat yang terhubung, dan kondisi penggunaan.</p></div></div></div>`;
  initWhatsApp();
}
function initFAQ(){document.querySelectorAll('[data-faq-item]').forEach(item=>item.querySelector('.faq-q')?.addEventListener('click',()=>item.classList.toggle('open')))}
function initTerms(){document.querySelectorAll('[data-term-item]').forEach(item=>item.querySelector('.term-head')?.addEventListener('click',()=>item.classList.toggle('open')))}
function initGallery(){
  const buttons=document.querySelectorAll('[data-filter]');
  const items=document.querySelectorAll('[data-gallery-item]');
  buttons.forEach(b=>b.addEventListener('click',()=>{
    buttons.forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    const f=b.dataset.filter;
    items.forEach(i=>{
      const show=f==='all'||i.dataset.cat===f;
      i.style.display=show?'block':'none';
    });
  }));

  if(!items.length) return;

  const lightbox=document.createElement('div');
  lightbox.className='gallery-lightbox';
  lightbox.innerHTML=`<div class="gallery-lightbox-inner" role="dialog" aria-modal="true" aria-label="Pratinjau foto galeri"><button class="gallery-lightbox-close" aria-label="Tutup">×</button><img alt=""><div class="gallery-lightbox-title"></div></div>`;
  document.body.appendChild(lightbox);
  const img=lightbox.querySelector('img');
  const title=lightbox.querySelector('.gallery-lightbox-title');
  const closeBtn=lightbox.querySelector('.gallery-lightbox-close');

  function open(item){
    const source=item.querySelector('[data-gallery-src]');
    if(!source) return;
    img.src=source.dataset.gallerySrc;
    img.alt=source.alt||'';
    title.textContent=source.dataset.galleryTitle||'';
    lightbox.classList.add('open');
    document.body.classList.add('no-scroll');
    closeBtn.focus();
  }
  function close(){
    lightbox.classList.remove('open');
    document.body.classList.remove('no-scroll');
    img.src='';
  }

  items.forEach(item=>{
    item.addEventListener('click',()=>open(item));
    item.addEventListener('keydown',(e)=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open(item);}});
  });
  closeBtn.addEventListener('click',close);
  lightbox.addEventListener('click',e=>{if(e.target===lightbox) close();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&lightbox.classList.contains('open')) close();});
}
function initCalculator(){
  const count=document.querySelector('#deviceCount'); const use=document.querySelector('#useType'); const result=document.querySelector('[data-calc-result]'); if(!count||!use||!result) return;
  function calc(){
    const n=Math.min(20,Math.max(1,Number(count.value)||1));
    const u=use.value;
    let index = n<=5 ? 0 : n<=8 ? 1 : n<=12 ? 2 : 3;
    // Streaming, gaming, and remote work may benefit from one tier higher
    // when several devices share the connection at the same time.
    if((u==='streaming'||u==='gaming'||u==='kerja') && n>=5) index=Math.min(3,index+1);
    const p=packages[index];
    result.innerHTML=`<div class="plan-name">Rekomendasi: Paket ${p.name}</div><div class="result-speed">${p.speed} Mbps</div><div style="font-size:1.2rem;font-weight:850">${money(p.price)}/bulan</div><p class="result-note">Panduan awal: ${p.devices} dan ${p.activeDevices}. Jumlah ini perkiraan, bukan jaminan; kelancaran bergantung pada aktivitas bersamaan, router, jangkauan WiFi, dan kondisi jaringan.</p><a class="btn btn-primary" href="detail-paket.html?plan=${p.id}">Lihat Detail Paket</a>`;
  }
  count.addEventListener('input',calc); use.addEventListener('change',calc); calc();
}
function initAreaChecker(){
  const select=document.querySelector('#areaSelect'); const result=document.querySelector('[data-area-result]'); if(!select||!result) return;
  select.addEventListener('change',()=>{const v=select.value; result.textContent=v==='Lainnya'?'Silakan hubungi admin untuk pengecekan titik pemasangan di area Anda.':`Area ${v} tercantum dalam wilayah layanan ANANTA.NET. Ketersediaan pemasangan tetap perlu dikonfirmasi melalui WhatsApp.`;});
}

initHeroLetterAnimation(); injectHeader(); injectFooter(); renderPackages(); renderDetail(); initFAQ(); initTerms(); initGallery(); initCalculator(); initAreaChecker(); initWhatsApp();
