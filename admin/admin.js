const $ = (selector, root = document) => root.querySelector(selector);
const STATUS_OPTIONS = [
  ['unknown', 'Belum diperbarui'],
  ['normal', 'Normal'],
  ['gangguan', 'Gangguan'],
  ['pemeliharaan', 'Pemeliharaan']
];
const AREA_NAMES = ['Kalibendo', 'Bades', 'Gondoruso'];
const CATEGORY_LABELS = { gangguan: 'Gangguan', pemeliharaan: 'Pemeliharaan', informasi: 'Informasi', promo: 'Promo' };
let announcementItems = [];

async function api(path, options = {}) {
  const response = await fetch(path, {
    cache: 'no-store',
    credentials: 'same-origin',
    ...options,
    headers: { ...(options.body ? { 'Content-Type': 'application/json' } : {}), ...(options.headers || {}) }
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || data.message || `Permintaan gagal (${response.status}).`);
  return data;
}
function showFeedback(element, message, kind = 'error') {
  element.textContent = message || '';
  element.className = `form-feedback ${kind}`;
}
function formatDate(value) {
  if (!value) return 'Belum tersedia';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 'Belum tersedia' : new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' }).format(date);
}
function createStatusSelect(value) {
  const select = document.createElement('select');
  for (const [status, label] of STATUS_OPTIONS) {
    const option = document.createElement('option'); option.value = status; option.textContent = label; select.append(option);
  }
  select.value = STATUS_OPTIONS.some(([key]) => key === value) ? value : 'unknown';
  return select;
}
function renderAreaFields(areas = []) {
  const wrap = $('#areaFields'); wrap.replaceChildren();
  for (const name of AREA_NAMES) {
    const area = areas.find(item => item.name === name) || { name, status: 'unknown', note: `Belum ada pembaruan status untuk wilayah ${name}.` };
    const card = document.createElement('article'); card.className = 'area-edit-card';
    const heading = document.createElement('h4'); heading.textContent = name;
    const statusField = document.createElement('div'); statusField.className = 'field';
    const statusLabel = document.createElement('label'); statusLabel.textContent = 'Status wilayah';
    const statusSelect = createStatusSelect(area.status); statusSelect.dataset.areaStatus = name;
    statusField.append(statusLabel, statusSelect);
    const noteField = document.createElement('div'); noteField.className = 'field';
    const noteLabel = document.createElement('label'); noteLabel.textContent = 'Catatan untuk pelanggan';
    const note = document.createElement('textarea'); note.rows = 3; note.maxLength = 300; note.value = area.note || ''; note.dataset.areaNote = name;
    noteField.append(noteLabel, note);
    card.append(heading, statusField, noteField); wrap.append(card);
  }
}
function fillStatusForm(data) {
  $('#overallStatus').value = data.overallStatus || 'unknown';
  $('#summary').value = data.summary || '';
  renderAreaFields(data.areas || []);
  $('#lastUpdated').textContent = formatDate(data.updatedAt);
}
function showPanel(id) {
  document.querySelectorAll('.tab-button').forEach(button => button.classList.toggle('active', button.dataset.tab === id));
  document.querySelectorAll('.admin-panel').forEach(panel => {
    const active = panel.id === id;
    panel.classList.toggle('active', active);
    panel.hidden = !active;
  });
}
function clearAnnouncementForm() {
  $('#announcementForm').reset();
  $('#announcementId').value = '';
  $('#announcementFormTitle').textContent = 'Buat pengumuman baru';
  $('#announcementSubmitLabel').textContent = 'Terbitkan Pengumuman';
  $('#announcementEditHint').textContent = 'Pengumuman akan langsung tampil setelah disimpan.';
  $('#cancelEditButton').hidden = true;
  $('#announcementDate').value = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16);
}
function renderAnnouncementList() {
  const wrap = $('#adminAnnouncementList'); wrap.replaceChildren();
  $('#announcementCount').textContent = `${announcementItems.length} pengumuman`;
  $('#announcementPanelCount').textContent = `${announcementItems.length} item`;
  if (!announcementItems.length) {
    const empty = document.createElement('div'); empty.className = 'list-empty'; empty.textContent = 'Belum ada pengumuman. Buat pengumuman pertama melalui formulir di atas.'; wrap.append(empty); return;
  }
  const sorted = [...announcementItems].sort((a, b) => new Date(b.date) - new Date(a.date));
  for (const item of sorted) {
    const card = document.createElement('article'); card.className = 'admin-announcement';
    const info = document.createElement('div'); info.className = 'announcement-info';
    const meta = document.createElement('div'); meta.className = 'announcement-meta';
    const category = document.createElement('span'); category.className = `category-pill ${item.category}`; category.textContent = CATEGORY_LABELS[item.category] || 'Informasi';
    const date = document.createElement('time'); date.textContent = formatDate(item.date);
    meta.append(category, date);
    const title = document.createElement('h4'); title.textContent = item.title;
    const description = document.createElement('p'); description.textContent = `${item.area ? `${item.area} · ` : ''}${item.excerpt}`;
    info.append(meta, title, description);
    const actions = document.createElement('div'); actions.className = 'announcement-actions';
    const edit = document.createElement('button'); edit.className = 'mini-btn'; edit.type = 'button'; edit.textContent = 'Edit'; edit.addEventListener('click', () => editAnnouncement(item.id));
    const remove = document.createElement('button'); remove.className = 'mini-btn danger'; remove.type = 'button'; remove.textContent = 'Hapus'; remove.addEventListener('click', () => deleteAnnouncement(item.id));
    actions.append(edit, remove); card.append(info, actions); wrap.append(card);
  }
}
function editAnnouncement(id) {
  const item = announcementItems.find(entry => entry.id === id); if (!item) return;
  $('#announcementId').value = item.id;
  $('#announcementTitle').value = item.title;
  $('#announcementCategory').value = item.category;
  const date = new Date(item.date);
  $('#announcementDate').value = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  $('#announcementArea').value = item.area || '';
  $('#announcementExcerpt').value = item.excerpt;
  $('#announcementContent').value = item.content;
  $('#announcementFormTitle').textContent = 'Edit pengumuman';
  $('#announcementSubmitLabel').textContent = 'Simpan Perubahan';
  $('#announcementEditHint').textContent = 'Perubahan akan langsung tampil pada halaman publik setelah tersimpan.';
  $('#cancelEditButton').hidden = false;
  $('#announcementPanel').scrollIntoView({ behavior: 'smooth', block: 'start' });
  $('#announcementTitle').focus({ preventScroll: true });
}
async function deleteAnnouncement(id) {
  const item = announcementItems.find(entry => entry.id === id);
  if (!item || !window.confirm(`Hapus pengumuman “${item.title}”?`)) return;
  const feedback = $('#announcementFeedback');
  try {
    const next = announcementItems.filter(entry => entry.id !== id);
    const result = await api('/api/admin/announcements', { method: 'PUT', body: JSON.stringify({ items: next }) });
    announcementItems = result.data.items; renderAnnouncementList(); clearAnnouncementForm();
    showFeedback(feedback, 'Pengumuman berhasil dihapus.', 'success');
  } catch (error) { showFeedback(feedback, error.message); }
}
async function loadDashboard() {
  const [status, announcements] = await Promise.all([
    api('/api/admin/status'), api('/api/admin/announcements')
  ]);
  fillStatusForm(status); announcementItems = Array.isArray(announcements.items) ? announcements.items : [];
  renderAnnouncementList(); clearAnnouncementForm();
}

$('#loginForm').addEventListener('submit', async event => {
  event.preventDefault();
  const feedback = $('#loginFeedback'); showFeedback(feedback, 'Memeriksa akun admin…', 'info');
  try {
    await api('/api/admin/login', { method: 'POST', body: JSON.stringify({ password: $('#adminPassword').value }) });
    await showDashboard();
    $('#adminPassword').value = '';
  } catch (error) { showFeedback(feedback, error.message); }
});

async function showDashboard() {
  try {
    await loadDashboard();
    $('#setupWarning').hidden = true; $('#loginPanel').hidden = true; $('#dashboard').hidden = false;
    showPanel('statusPanel');
  } catch (error) {
    $('#loginPanel').hidden = true; $('#dashboard').hidden = true; $('#setupWarning').hidden = false;
    $('#setupWarning p').textContent = error.message.includes('penyimpanan') ? error.message : `${error.message} Pastikan KV ANANTA_DATA sudah terhubung.`;
  }
}

$('#statusForm').addEventListener('submit', async event => {
  event.preventDefault(); const feedback = $('#statusFeedback');
  const areas = AREA_NAMES.map(name => ({
    name,
    status: $(`[data-area-status="${name}"]`).value,
    note: $(`[data-area-note="${name}"]`).value.trim()
  }));
  const body = { overallStatus: $('#overallStatus').value, summary: $('#summary').value.trim(), areas };
  try {
    const result = await api('/api/admin/status', { method: 'PUT', body: JSON.stringify(body) });
    fillStatusForm(result.data); showFeedback(feedback, 'Status jaringan berhasil disimpan dan diterbitkan.', 'success');
  } catch (error) { showFeedback(feedback, error.message); }
});

$('#announcementForm').addEventListener('submit', async event => {
  event.preventDefault(); const feedback = $('#announcementFeedback');
  const editId = $('#announcementId').value;
  const date = new Date($('#announcementDate').value);
  if (Number.isNaN(date.getTime())) { showFeedback(feedback, 'Tanggal pengumuman belum valid.'); return; }
  const item = {
    id: editId || `info-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    date: date.toISOString(),
    category: $('#announcementCategory').value,
    title: $('#announcementTitle').value.trim(),
    area: $('#announcementArea').value.trim(),
    excerpt: $('#announcementExcerpt').value.trim(),
    content: $('#announcementContent').value.trim()
  };
  const next = editId ? announcementItems.map(old => old.id === editId ? item : old) : [item, ...announcementItems];
  try {
    const result = await api('/api/admin/announcements', { method: 'PUT', body: JSON.stringify({ items: next }) });
    announcementItems = result.data.items; renderAnnouncementList(); clearAnnouncementForm();
    showFeedback(feedback, editId ? 'Perubahan pengumuman berhasil disimpan.' : 'Pengumuman berhasil diterbitkan.', 'success');
  } catch (error) { showFeedback(feedback, error.message); }
});

$('#cancelEditButton').addEventListener('click', () => { clearAnnouncementForm(); showFeedback($('#announcementFeedback'), 'Mode edit dibatalkan.', 'info'); });
$('#logoutButton').addEventListener('click', async () => {
  try { await api('/api/admin/logout', { method: 'POST', body: '{}' }); } catch (error) { /* cookie will be cleared by next login check if endpoint is reachable */ }
  $('#dashboard').hidden = true; $('#loginPanel').hidden = false; $('#adminPassword').value = ''; $('#adminPassword').focus();
});
document.querySelectorAll('.tab-button').forEach(button => button.addEventListener('click', () => showPanel(button.dataset.tab)));

(async function init() {
  try {
    const session = await api('/api/admin/session');
    if (!session.configured) { $('#setupWarning').hidden = false; $('#loginPanel').hidden = true; return; }
    if (session.authenticated) { await showDashboard(); return; }
    $('#loginPanel').hidden = false;
  } catch (error) {
    $('#setupWarning').hidden = false; $('#loginPanel').hidden = true;
    $('#setupWarning p').textContent = error.message || 'API admin belum siap. Periksa konfigurasi Cloudflare.';
  }
})();

async function loadManagedContent(){
  const data = await api('/api/admin/content');
  $('#packagesJson').value = JSON.stringify(data.packages || [], null, 2);
  $('#areasJson').value = JSON.stringify(data.areas || [], null, 2);
  $('#faqsJson').value = JSON.stringify(data.faqs || [], null, 2);
}
$('#reloadContentButton')?.addEventListener('click', async () => {
  try { await loadManagedContent(); showFeedback($('#contentFeedback'),'Data berhasil dimuat ulang dari Cloudflare.','success'); }
  catch(error) { showFeedback($('#contentFeedback'),error.message); }
});
$('#saveContentButton')?.addEventListener('click', async () => {
  const feedback = $('#contentFeedback');
  try {
    const body = {
      packages: JSON.parse($('#packagesJson').value),
      areas: JSON.parse($('#areasJson').value),
      faqs: JSON.parse($('#faqsJson').value)
    };
    const result = await api('/api/admin/content',{method:'PUT',body:JSON.stringify(body)});
    $('#packagesJson').value = JSON.stringify(result.data.packages,null,2);
    $('#areasJson').value = JSON.stringify(result.data.areas,null,2);
    $('#faqsJson').value = JSON.stringify(result.data.faqs,null,2);
    showFeedback(feedback,'Paket, wilayah, dan FAQ berhasil disimpan ke Cloudflare KV.','success');
  } catch(error) {
    showFeedback(feedback,error instanceof SyntaxError ? 'Format JSON belum valid. Periksa tanda kurung, koma, dan tanda kutip.' : error.message);
  }
});
const originalLoadDashboard = loadDashboard;
loadDashboard = async function(){
  await originalLoadDashboard();
  await loadManagedContent();
};
