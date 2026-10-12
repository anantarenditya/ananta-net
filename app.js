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
  // Reuse the same per-letter animation on the Home and Paket Internet headings.
  document.querySelectorAll('.hero-title-motion').forEach((heading) => {
    if (heading.dataset.letterAnimationReady === 'true') return;
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
      // Leave a small timing gap between lines while retaining their original layout.
      if (wordIndex < words.length - 1) characterIndex += 1;
    });
  });
}

function injectHeader(){
  const el=document.querySelector('[data-site-header]');
  if(!el) return;
  el.classList.add('site-header-shell');
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
        <div class="actions"><button class="menu-btn" id="menuToggle" aria-label="Buka menu" aria-expanded="false">☰</button></div>
      </div>
      <div class="container nav-mobile" id="mobileNav">
        <a href="index.html">Home</a><a href="tentang.html">Tentang Kami</a><a href="paket.html">Paket</a><a href="area.html">Area Layanan</a><a href="berlangganan.html">Cara Berlangganan</a><a href="galeri.html">Galeri</a><a href="faq.html">FAQ</a><a href="syarat-ketentuan.html">S&K</a><a href="kontak.html">Kontak</a>
      </div>
    </header>`;
  const path=location.pathname.split('/').pop()||'index.html';
  el.querySelectorAll('[data-nav]').forEach(a=>{ if(a.getAttribute('data-nav')===path) a.classList.add('active'); });
  const menuToggle=document.getElementById('menuToggle');
  const mobileNav=document.getElementById('mobileNav');
  menuToggle?.addEventListener('click',()=>{
    const isOpen=mobileNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded',String(isOpen));
  });
  document.querySelectorAll('#mobileNav a').forEach(a=>a.addEventListener('click',()=>{
    mobileNav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded','false');
  }));
  // Keep the brand/navigation visible while scrolling. Collapse the utility topbar after scroll.
  const updateStickyHeader=()=>el.classList.toggle('is-scrolled',window.scrollY>28);
  updateStickyHeader();
  window.addEventListener('scroll',updateStickyHeader,{passive:true});
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
  document.querySelectorAll('[data-wa]').forEach(btn=>{
    if(btn.dataset.waReady==='true') return;
    btn.dataset.waReady='true';
    btn.addEventListener('click',()=>{const msg=btn.dataset.wa || 'Halo Admin ANANTA.NET, saya ingin bertanya tentang layanan WiFi.'; window.open(waLink(msg),'_blank','noopener');});
  });
  const float=document.querySelector('[data-float-wa]');
  if(float && float.dataset.floatWaReady!=='true'){
    float.dataset.floatWaReady='true';
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
    const carousel=wrap.dataset.carousel==='true';
    const renderCard=(p,index)=>{
      const isPopular=p.id==='normal';
      const features=compact
        ? [`Paket ${p.speed} Mbps`,p.devices, p.description]
        : [`Kecepatan paket ${p.speed} Mbps`,`${p.devices} (perkiraan)`,`${p.activeDevices} (perkiraan)`,p.description];
      const list=features.map((item)=>`<li><span class="plan-check" aria-hidden="true">✓</span><span>${item}</span></li>`).join('');
      const message=`Halo Admin ANANTA.NET, saya ingin berlangganan Paket ${p.name} ${p.speed} Mbps seharga ${money(p.price)}/bulan. Saya ingin mengecek ketersediaan pemasangan.`;
      return `<article class="card package-card plan-carousel-card ${isPopular?'featured is-popular':''} ${compact?'package-card-compact':''}" data-plan-slide aria-label="Paket ${p.name}">
        <div class="plan-card-topline"><span class="plan-card-brand">ANANTA.NET <span>· PAKET INTERNET</span></span><span class="plan-card-number">${String(index+1).padStart(2,'0')}</span></div>
        ${isPopular?'<span class="ribbon">Pilihan Populer</span>':''}
        <h3>Paket ${p.name}</h3>
        <div class="plan-price-layout"><div class="speed">${p.speed} <small>Mbps</small></div><div class="price">${money(p.price)}<small>/bulan</small></div></div>
        <p class="plan-card-description">${p.description}</p>
        <div class="plan-card-divider"></div>
        <ul class="plan-feature-list">${list}</ul>
        <div class="card-actions plan-card-actions"><a class="btn btn-ghost" href="detail-paket.html?plan=${p.id}">Lihat Detail</a><button class="btn btn-primary" data-wa="${message}">Berlangganan</button></div>
      </article>`;
    };
    if(carousel){
      wrap.classList.add('plan-carousel-mount',compact?'plan-carousel-home':'plan-carousel-catalog');
      wrap.innerHTML=`<div class="plan-carousel" data-plan-carousel><div class="plan-carousel-viewport"><div class="plan-carousel-track" data-plan-track>${packages.map((p,i)=>`<div class="plan-slide">${renderCard(p,i)}</div>`).join('')}</div></div><div class="plan-carousel-navigation"><div class="plan-carousel-arrows"><button type="button" class="plan-arrow" data-plan-prev aria-label="Paket sebelumnya">←</button><div class="plan-carousel-dots" aria-label="Pilih paket">${packages.map((p,i)=>`<button type="button" class="plan-dot ${i===0?'active':''}" data-plan-index="${i}" aria-label="Paket ${p.name}" aria-current="${i===0?'true':'false'}"></button>`).join('')}</div><button type="button" class="plan-arrow" data-plan-next aria-label="Paket berikutnya">→</button></div><span class="plan-carousel-count" data-plan-count>01 / ${String(packages.length).padStart(2,'0')}</span></div></div>`;
      initPlanCarousel(wrap);
    } else {
      wrap.innerHTML=packages.map((p,i)=>renderCard(p,i)).join('');
    }
  });
  initWhatsApp();
}
function initPlanCarousel(wrap){
  const carousel=wrap.querySelector('[data-plan-carousel]'); if(!carousel) return;
  const track=carousel.querySelector('[data-plan-track]');
  const slides=Array.from(carousel.querySelectorAll('[data-plan-slide]'));
  const dots=Array.from(carousel.querySelectorAll('[data-plan-index]'));
  const count=carousel.querySelector('[data-plan-count]');
  let current=0;
  const go=(index)=>{
    current=(index+slides.length)%slides.length;
    track.style.transform=`translateX(-${current*100}%)`;
    slides.forEach((slide,i)=>{slide.setAttribute('aria-hidden',i===current?'false':'true');slide.querySelectorAll('a,button').forEach(el=>{el.tabIndex=i===current?0:-1;});});
    dots.forEach((dot,i)=>{dot.classList.toggle('active',i===current);dot.setAttribute('aria-current',i===current?'true':'false');});
    if(count) count.textContent=`${String(current+1).padStart(2,'0')} / ${String(slides.length).padStart(2,'0')}`;
  };
  carousel.querySelector('[data-plan-prev]')?.addEventListener('click',()=>go(current-1));
  carousel.querySelector('[data-plan-next]')?.addEventListener('click',()=>go(current+1));
  dots.forEach(dot=>dot.addEventListener('click',()=>go(Number(dot.dataset.planIndex))));
  let startX=0,startY=0;
  const viewport=carousel.querySelector('.plan-carousel-viewport');
  viewport?.addEventListener('touchstart',e=>{startX=e.changedTouches[0].clientX;startY=e.changedTouches[0].clientY;},{passive:true});
  viewport?.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-startX;const dy=e.changedTouches[0].clientY-startY;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.2)go(current+(dx<0?1:-1));},{passive:true});
  viewport?.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();go(current+1);}if(e.key==='ArrowLeft'){e.preventDefault();go(current-1);}});
  go(0);
}
function renderDetail(){
  const mount=document.querySelector('[data-package-detail]'); if(!mount) return;
  const id=new URLSearchParams(location.search).get('plan')||'hemat';
  const selectedIndex=Math.max(0,packages.findIndex(x=>x.id===id));
  const p=packages[selectedIndex]||packages[0];
  const popular=p.id==='normal';
  const nextPlans=packages.filter(x=>x.id!==p.id);
  const features=[
    `Paket kecepatan ${p.speed} Mbps`,
    `${p.devices} (perkiraan)`,
    `${p.activeDevices} untuk penggunaan umum (perkiraan)`,
    'Biaya pemasangan Rp100.000 di awal',
    'Pembayaran bulanan dimulai bulan berikutnya'
  ];
  const message=`Halo Admin ANANTA.NET, saya tertarik Paket ${p.name} ${p.speed} Mbps seharga ${money(p.price)}/bulan. Saya ingin mengecek ketersediaan pemasangan di lokasi saya.`;
  mount.innerHTML=`
    <div class="package-detail-layout">
      <article class="package-detail-card ${popular?'is-popular':''}">
        <div class="plan-card-topline"><span class="plan-card-brand">ANANTA.NET <span>· DETAIL PAKET</span></span><span class="plan-card-number">${String(selectedIndex+1).padStart(2,'0')}</span></div>
        ${popular?'<span class="detail-popular-tag">Pilihan Populer</span>':''}
        <div class="package-detail-heading"><div><span class="detail-package-label">PAKET INTERNET</span><h2>Paket ${p.name}</h2><p>${p.description}</p></div><div class="detail-speed-badge"><strong>${p.speed}</strong><span>Mbps</span></div></div>
        <div class="detail-price-block"><strong>${money(p.price)}</strong><span>/bulan</span></div>
        <div class="plan-card-divider"></div>
        <ul class="plan-feature-list detail-feature-list">${features.map(item=>`<li><span class="plan-check" aria-hidden="true">✓</span><span>${item}</span></li>`).join('')}</ul>
        <div class="package-detail-actions"><button class="btn btn-primary" data-wa="${message}">Berlangganan via WhatsApp</button><a class="btn btn-ghost" href="paket.html">Lihat Paket Lain</a></div>
      </article>
      <aside class="package-detail-aside card">
        <span class="eyebrow">SESUAIKAN DENGAN KEBUTUHAN</span><h3>Apakah paket ini cocok untuk Anda?</h3>
        <p>${p.description} Paket ini dapat menjadi pilihan awal berdasarkan jumlah perangkat dan aktivitas internet di rumah.</p>
        <div class="detail-aside-stat"><span class="detail-aside-icon">⌁</span><div><small>Perangkat terhubung</small><strong>${p.devices}</strong></div></div>
        <div class="detail-aside-stat"><span class="detail-aside-icon">◷</span><div><small>Aktif bersamaan</small><strong>${p.activeDevices}</strong></div></div>
        <div class="detail-note"><strong>Catatan</strong><p>Jumlah perangkat adalah perkiraan, bukan jaminan performa. Hasil dipengaruhi aktivitas bersamaan, router, jangkauan WiFi, dan kondisi jaringan. Ketersediaan pemasangan tetap perlu dikonfirmasi oleh admin.</p></div>
      </aside>
    </div>
    <section class="other-plans"><div class="other-plans-heading"><div><span class="eyebrow">BANDINGKAN</span><h3>Paket lainnya</h3></div><a href="paket.html">Lihat semua paket →</a></div><div class="other-plan-links">${nextPlans.map(x=>`<a class="other-plan-link" href="detail-paket.html?plan=${x.id}"><span><strong>${x.name}</strong><small>${x.speed} Mbps</small></span><b>${money(x.price)}<small>/bulan</small></b><span class="other-plan-arrow">→</span></a>`).join('')}</div></section>`;
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
