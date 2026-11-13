/* АгроМаркет — спільний код сайту */
const PRODUCTS = [
  { id: 1, name: 'Помідори «Бичаче серце»', cat: 'vegetables', price: 25, unit: 'кг', min: 1, max: 50, emoji: '🍅', bg: '#F6E3DF', hit: true,
    desc: 'Великі м’ясисті помідори з теплиць Черкащини. Ідеальні для салатів і соусів.', origin: 'Черкаська обл.', weight: '250–400 г' },
  { id: 2, name: 'Помідори черрі', cat: 'vegetables', price: 60, unit: 'кг', min: 1, max: 50, emoji: '🍒', bg: '#F6E3DF',
    desc: 'Солодкі дрібні помідори. Смачні свіжими та для консервації.', origin: 'Київська обл.', weight: '15–25 г' },
  { id: 3, name: 'Помідори рожеві', cat: 'vegetables', price: 35, unit: 'кг', min: 1, max: 50, emoji: '🍅', bg: '#FBE6E6',
    desc: 'Рожеві помідори з ніжною шкіркою та яскравим смаком.', origin: 'Житомирська обл.', weight: '150–250 г' },
  { id: 4, name: 'Огірки ґрунтові', cat: 'vegetables', price: 30, unit: 'кг', min: 1, max: 50, emoji: '🥒', bg: '#E3EFE6',
    desc: 'Хрусткі огірки з відкритого ґрунту.', origin: 'Київська обл.', weight: '100–150 г' },
  { id: 5, name: 'Картопля молода', cat: 'vegetables', price: 15, unit: 'кг', min: 1, max: 50, emoji: '🥔', bg: '#FBEFD6',
    desc: 'Молода картопля нового врожаю.', origin: 'Житомирська обл.', weight: '—' },
  { id: 6, name: 'Перець солодкий', cat: 'vegetables', price: 55, unit: 'кг', min: 1, max: 50, emoji: '🫑', bg: '#E3EFE6',
    desc: 'Соковитий болгарський перець.', origin: 'Черкаська обл.', weight: '150–200 г' },
  { id: 7, name: 'Розсада помідорів', cat: 'seedlings', price: 15, wholesale: 12, wholesaleFrom: 100, unit: 'шт.', min: 10, max: 200, emoji: '🌱', bg: '#E3EFE6', hit: true,
    desc: 'Загартована розсада у касетах, 45–50 днів. Сорт «Бичаче серце».', origin: 'Київська обл.', weight: '—' },
  { id: 8, name: 'Розсада перцю', cat: 'seedlings', price: 14, wholesale: 11, wholesaleFrom: 100, unit: 'шт.', min: 10, max: 200, emoji: '🌿', bg: '#E3EFE6',
    desc: 'Розсада солодкого перцю у касетах.', origin: 'Київська обл.', weight: '—' },
  { id: 9, name: 'Мед гречаний', cat: 'other', price: 180, unit: 'кг', min: 1, max: 50, emoji: '🍯', bg: '#FBEFD6',
    desc: 'Натуральний гречаний мед з пасіки на Житомирщині.', origin: 'Житомирська обл.', weight: '—' },
];
const CATS = { vegetables: 'Овочі', seedlings: 'Розсада', other: 'Інше' };
const REGIONS = ['Київська', 'Житомирська', 'Черкаська', 'Львівська', 'Одеська'];
const DELIVERY_REGIONS = ['Київська', 'Житомирська', 'Черкаська'];
const STATUS = {
  new: { label: 'Нове', cls: 's-new' }, paid: { label: 'Оплачено', cls: 's-paid' }, packed: { label: 'Зібрано', cls: 's-packed' },
  shipped: { label: 'Відправлено', cls: 's-shipped' }, done: { label: 'Доставлено', cls: 's-done' }, cancel: { label: 'Скасовано', cls: 's-cancel' },
};

/* ---------- сховище ---------- */
const DB = {
  get(k, d) { try { const v = localStorage.getItem('am_' + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('am_' + k, JSON.stringify(v)); } catch (e) {} },
  del(k) { try { localStorage.removeItem('am_' + k); } catch (e) {} },
};

function seedData(force) {
  if (!force && DB.get('seeded', false)) return;
  DB.set('users', [
    { name: 'Оксана Коваль', email: 'oksana@agro.test', age: 52, password: 'Pomidor1', prevOrders: 0 },
    { name: 'Петро Шевчук', email: 'petro@agro.test', age: 58, password: 'Pomidor1', prevOrders: 2 },
    { name: 'Ганна Мельник', email: 'hanna@agro.test', age: 61, password: 'Pomidor1', prevOrders: 3 },
    { name: 'Іван Бондар', email: 'ivan@agro.test', age: 55, password: 'Pomidor1', prevOrders: 7 },
  ]);
  const it = (id, qty) => { const p = product(id); return { id, name: p.name, qty, unit: p.unit, price: p.price }; };
  DB.set('orders', [
    { id: 1005, email: 'ivan@agro.test', items: [it(1, 10)], goods: 250, disc: 5, delivery: 80, total: 317.5, status: 'done', region: 'Київська', date: dayISO(-40), time: '10:00', created: dayISO(-42) },
    { id: 1006, email: 'ivan@agro.test', items: [it(3, 8)], goods: 280, disc: 5, delivery: 80, total: 346, status: 'shipped', region: 'Київська', date: dayISO(1), time: '12:00', created: dayISO(-2) },
    { id: 1007, email: 'ivan@agro.test', items: [it(1, 30)], goods: 750, disc: 10, delivery: 0, total: 675, status: 'packed', region: 'Черкаська', date: dayISO(2), time: '09:30', created: dayISO(-1) },
    { id: 1008, email: 'ivan@agro.test', items: [it(4, 20)], goods: 600, disc: 10, delivery: 0, total: 540, status: 'paid', region: 'Житомирська', date: dayISO(3), time: '15:00', created: dayISO(-1) },
    { id: 1009, email: 'ivan@agro.test', items: [it(5, 10)], goods: 150, disc: 5, delivery: 80, total: 222.5, status: 'new', region: 'Київська', date: dayISO(4), time: '18:00', created: dayISO(0) },
  ]);
  DB.set('cart', []);
  DB.del('session');
  DB.set('seeded', true);
}
/* ---------- утиліти ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const money = n => (Math.round(n * 100) / 100).toFixed(2).replace('.', ',').replace(',00', '') + ' грн';
const product = id => PRODUCTS.find(p => p.id === +id);
const param = k => new URLSearchParams(location.search).get(k);
function dayISO(offset) { const d = new Date(); d.setHours(12, 0, 0, 0); d.setDate(d.getDate() + offset); return d.toISOString().slice(0, 10); }
function toast(t) { const el = document.createElement('div'); el.className = 'toast'; el.textContent = t; document.body.appendChild(el); setTimeout(() => el.remove(), 2600); }
function fieldErr(input, text) {
  const f = input.closest('.field'); if (!f) return !text;
  let e = $('.err-text', f); if (!e) { e = document.createElement('div'); e.className = 'err-text'; f.appendChild(e); }
  e.textContent = text || ''; f.classList.toggle('has-err', !!text); return !text;
}

/* ---------- користувачі ---------- */
const users = () => DB.get('users', []);
const currentUser = () => { const e = DB.get('session', null); return e ? users().find(u => u.email === e) || null : null; };
function deliveredCount(email) { return DB.get('orders', []).filter(o => o.email === email && o.status === 'done').length; }
function isRegular(u) { return !!u && (u.prevOrders + deliveredCount(u.email)) >= 3; }
function requireLogin() { if (!currentUser()) { location.href = 'login.html?next=' + encodeURIComponent(location.pathname.split('/').pop() + location.search); return false; } return true; }

/* ---------- кошик ---------- */
const cart = () => DB.get('cart', []);
function addToCart(id, qty) {
  const c = cart(); const line = c.find(l => l.id === id);
  if (line) line.qty += qty; else c.push({ id, qty });
  DB.set('cart', c); renderHeader();
}
function linePrice(p, qty) { return p.wholesale && qty > p.wholesaleFrom ? p.wholesale : p.price; }
function calcTotals(lines, user, promo) {
  const goods = lines.reduce((s, l) => { const p = product(l.id); return s + linePrice(p, l.qty) * l.qty; }, 0);
  const regular = isRegular(user);
  let disc = 0;
  if (regular) disc = 5;
  if (promo === 'SUMMER') disc += 7;
  const delivery = goods === 0 ? 0 : (goods > 500 ? 0 : 80);
  const discSum = Math.round(goods * disc) / 100;
  return { goods, disc, discSum, delivery, total: goods - discSum + delivery, regular };
}

/* ---------- шапка і підвал ---------- */
function renderHeader() {
  const u = currentUser(); const count = cart().length;
  const page = location.pathname.split('/').pop() || 'index.html';
  const nav = [['index.html', 'Головна'], ['catalog.html', 'Каталог'], ['fuel.html', 'Калькулятор пального'], ['delivery.html', 'Доставка і оплата'], ['contacts.html', 'Контакти']];
  const h = $('#site-header'); if (!h) return;
  h.innerHTML = `<div class="topbar"><div class="container"><span>📞 +380 44 000 00 00 · щодня 8:00–20:00</span><span class="lbl">Доставка по Київській, Житомирській і Черкаській областях</span></div></div>
  <header class="site-header"><div class="container">
    <a class="logo" href="index.html"><span class="m">🍅</span>АгроМаркет</a>
    <nav class="nav">${nav.map(([href, t]) => `<a href="${href}" class="${page === href ? 'active' : ''}">${t}</a>`).join('')}</nav>
    <div class="hdr-actions">
      <a class="icon-btn" href="cart.html">🛒 <span class="lbl">Кошик</span> <span class="count" id="cart-count">${count}</span></a>
      ${u ? `<a class="icon-btn" href="account.html">👤 ${esc(u.name.split(' ')[0])}</a>` : `<a class="icon-btn" href="login.html">Увійти</a>`}
    </div></div></header>`;
}
function renderFooter() {
  const f = $('#site-footer'); if (!f) return;
  f.innerHTML = `<footer class="site-footer"><div class="container"><div class="cols">
    <div><h4>🍅 АгроМаркет</h4><p>Фермерські овочі, розсада і мед з доставкою додому. Працюємо напряму з господарствами.</p></div>
    <div><h4>Покупцям</h4><a href="catalog.html">Каталог</a><a href="delivery.html">Доставка і оплата</a><a href="returns.html">Повернення</a><a href="account.html">Особистий кабінет</a></div>
    <div><h4>Фермерам</h4><a href="fuel.html">Калькулятор пального</a><a href="warehouse.html">Панель складу</a><a href="contacts.html">Контакти</a></div>
    <div><h4>Новини та акції</h4><p>Підпишіться — і першими дізнавайтеся про знижки.</p>
      <form id="subscribe"><input type="email" id="sub-email" placeholder="Ваш email"><button class="btn sm" type="submit">OK</button></form></div>
  </div><div class="copy">© 2026 АгроМаркет. Навчальний проєкт.</div></div></footer>`;
  $('#subscribe').addEventListener('submit', e => {
    e.preventDefault();
    const email = $('#sub-email').value.trim();
    const subs = DB.get('subscribers', []);
    subs.push(email.toLowerCase());
    DB.set('subscribers', subs);
    toast('Дякуємо! Ви підписалися на розсилку.');
    const form = document.getElementById('subscribe-form');
    form.reset();
  });
}
function productCard(p) {
  const pr = p.unit === 'кг' ? `${money(p.price)} / кг` : `${money(p.price)} / шт.`;
  return `<a class="product" href="product.html?id=${p.id}"><div class="pic" style="background:${p.bg}">${p.emoji}</div>
    <div class="body">${p.hit ? '<span><span class="tag hit">Хіт продажу</span></span>' : `<span><span class="tag">${CATS[p.cat]}</span></span>`}
    <div class="name">${esc(p.name)}</div><div class="hint">${esc(p.origin)}</div><div class="price">${pr}</div></div></a>`;
}
seedData(false);
document.addEventListener('DOMContentLoaded', () => { renderHeader(); renderFooter(); });
