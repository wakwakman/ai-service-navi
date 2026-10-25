/* ui-core.js — AIサービスナビ・求人サイトナビ 共通のふるまい（アイコン・ダイアログ・テーマ・ナビ・コピー・履歴）
   両サイトで同じファイルを使う。各サイトの index.html のスクリプトより先に読み込む。 */
const IC = {
  search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  grid:'<rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"/>',
  list:'<path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01"/>',
  x:'<path d="M18 6 6 18M6 6l12 12"/>',
  chevL:'<path d="m15 18-6-6 6-6"/>', chevR:'<path d="m9 18 6-6-6-6"/>', chevD:'<path d="m6 9 6 6 6-6"/>',
  arrowR:'<path d="M5 12h14M13 6l6 6-6 6"/>',
  yen:'<path d="M6 4l6 8 6-8M12 12v8M7.5 13h9M7.5 16.5h9"/>',
  building:'<path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M16 9h2a2 2 0 0 1 2 2v10M8 7h4M8 11h4M8 15h4M3 21h18"/>',
  layers:'<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/>',
  home:'<path d="M3.5 11 12 4l8.5 7"/><path d="M5.5 9.5V20h13V9.5"/>',
  split:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M12 4v16"/>',
  map:'<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z"/><path d="M9 4v14M15 6v14"/>',
  file:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
  users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.6a3.5 3.5 0 0 1 0 6.8M21.5 20a6.5 6.5 0 0 0-4-6"/>',
  calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  compass:'<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z"/>',
  book:'<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5Z"/><path d="M4 19a2 2 0 0 1 2-2h13"/>',
  check:'<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  columns:'<rect x="3" y="4" width="7" height="16" rx="1.5"/><rect x="14" y="4" width="7" height="16" rx="1.5"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  ext:'<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  filter:'<path d="M4 5h16l-6 8v5l-4 2v-7L4 5Z"/>',
  userCheck:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 11.5l2 2 4-4"/>',
  repeat:'<path d="M4 12a8 8 0 0 1 14-5.3L20 9M20 4v5h-5M20 12a8 8 0 0 1-14 5.3L4 15M4 20v-5h5"/>',
  cursor:'<path d="m5 3 14 7-6 2-2 6L5 3Z"/>',
  db:'<ellipse cx="12" cy="5.5" rx="7.5" ry="2.8"/><path d="M4.5 5.5v13c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8v-13M4.5 12c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8"/>',
  megaphone:'<path d="M3 10.5v3a1 1 0 0 0 1 1h3l7 4.5V5L7 9.5H4a1 1 0 0 0-1 1Z"/><path d="M18 9a4 4 0 0 1 0 6"/>',
  tag:'<path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9-9-9Z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
  sparkle:'<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/>',
  news:'<path d="M4 5h13v14H6a2 2 0 0 1-2-2V5Z"/><path d="M17 8h3v9a2 2 0 0 1-2 2M7.5 9h6M7.5 12.5h6M7.5 16h4"/>',
  send:'<path d="M21 3 3 10.5l7 2.5 2.5 7L21 3Z"/><path d="m10 13 4-4"/>',
  calc:'<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8.5 7h7M8.5 11h.01M12 11h.01M15.5 11h.01M8.5 14.5h.01M12 14.5h.01M15.5 14.5h.01M8.5 18h.01M12 18h.01M15.5 18h.01"/>'
};
// AIサービスナビ側で使う追加アイコン（同じ線の太さ・24px グリッドでそろえる）
Object.assign(IC, {
  menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4"/>',
  moon:'<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/>',
  copy:'<rect x="8.5" y="8.5" width="11.5" height="11.5" rx="2"/><path d="M15.5 8.5V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7.5a2 2 0 0 0 2 2h2.5"/>',
  chat:'<path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.1A8 8 0 1 1 20 12Z"/>',
  wand:'<path d="m4 20 11-11M14 4l1 2.5L17.5 7.5 15 8.5 14 11l-1-2.5L10.5 7.5 13 6.5 14 4ZM19 12l.6 1.4L21 14l-1.4.6L19 16l-.6-1.4L17 14l1.4-.6L19 12Z"/>',
  image:'<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="9.5" r="1.8"/><path d="m21 16-5-5-9 9"/>',
  video:'<rect x="3" y="6" width="13" height="12" rx="2"/><path d="m16 10.5 5-3v9l-5-3"/>',
  code:'<path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/>',
  pen:'<path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4Z"/><path d="m13.5 6.5 4 4"/>',
  bulb:'<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.8.6 1.1 1.4 1.1 2.2h5c0-.8.3-1.6 1.1-2.2A6 6 0 0 0 12 3Z"/>',
  shield:'<path d="M12 3 5 6v5c0 4.5 3 8.2 7 10 4-1.8 7-5.5 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-4"/>',
  history:'<path d="M3.5 12a8.5 8.5 0 1 0 2.5-6L3.5 8.5"/><path d="M3.5 4v4.5H8M12 7.5V12l3 2"/>',
  download:'<path d="M12 4v11M7 10.5l5 5 5-5M4.5 20h15"/>',
  flask:'<path d="M9 3h6M10 3v6L4.5 18.5A1.7 1.7 0 0 0 6 21h12a1.7 1.7 0 0 0 1.5-2.5L14 9V3"/><path d="M7.5 15h9"/>',
  star:'<path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.1 5.9-.8L12 3.5Z"/>',
  trash:'<path d="M4 7h16M10 11v6M14 11v6M5.5 7l1 12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2l1-12M9 7V4h6v3"/>',
  alert:'<path d="M12 4 2.5 20h19L12 4Z"/><path d="M12 10v4.5M12 17.5h.01"/>',
  globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.7 5.6 3.7 9s-1.2 6.4-3.7 9c-2.5-2.6-3.7-5.6-3.7-9S9.5 5.6 12 3Z"/>',
  graduation:'<path d="M2.5 9.5 12 5l9.5 4.5L12 14 2.5 9.5Z"/><path d="M6.5 11.5V16c1.5 1.4 3.4 2 5.5 2s4-.6 5.5-2v-4.5M21.5 9.5V15"/>',
  briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8.5 7V5a1.5 1.5 0 0 1 1.5-1.5h4A1.5 1.5 0 0 1 15.5 5v2M3 12.5h18"/>',
  heart:'<path d="M12 20s-7.5-4.6-7.5-10A4.2 4.2 0 0 1 12 7.5 4.2 4.2 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10Z"/>',
  zap:'<path d="M13 3 4.5 13.5H12L11 21l8.5-10.5H12L13 3Z"/>'
});
const ic = (n, s = 16, cls = "") => `<svg class="ic${cls ? " " + cls : ""}" width="${s}" height="${s}" viewBox="0 0 24 24" aria-hidden="true">${IC[n] || ""}</svg>`;
function hydrateIcons(root){
  root.querySelectorAll("[data-ic]").forEach(el => {
    const t = document.createElement("template");
    t.innerHTML = ic(el.dataset.ic, +el.dataset.s || 16, el.dataset.cls || "");
    const svg = t.content.firstChild;
    if (el.getAttribute("style")) svg.setAttribute("style", el.getAttribute("style"));
    el.replaceWith(svg);
  });
}
hydrateIcons(document);

/* ---------- 基本の小道具 ---------- */
const $ = id => document.getElementById(id);
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
document.querySelectorAll("[data-kbd]").forEach(el => el.textContent = isMac ? "⌘K" : "Ctrl K");
let toastT;
function toast(msg){ const t = $("toast"); if (!t) return; t.textContent = msg; t.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => t.hidden = true, 2400); }

/* ---------- ダイアログ（ドロワー・検索・比較・メニュー）：開いた要素へフォーカスを戻す ---------- */
const lastFocus = {};
const syncLock = () => document.documentElement.classList.toggle("modal-open", !!document.querySelector("dialog[open]"));
function showDlg(id){
  const d = $(id); if (!d) return;
  if (!d.open) { lastFocus[id] = document.activeElement; try { d.showModal(); } catch(_) { d.setAttribute("open", ""); } }
  syncLock();
}
function closeDlg(id){
  const d = $(id); if (!d || !d.open) { syncLock(); return; }
  try { d.close(); } catch(_) { d.removeAttribute("open"); }
  syncLock();
}
document.querySelectorAll("dialog").forEach(d => d.addEventListener("close", () => {
  syncLock();
  const el = lastFocus[d.id];
  if (el && document.contains(el) && typeof el.focus === "function" && !document.querySelector("dialog[open]")) el.focus({preventScroll: true});
  lastFocus[d.id] = null;
}));

/* ---------- ライト・ダーク切り替え（端末の設定 → 手動の順。手動の選択はこの端末にだけ保存） ---------- */
const THEME_KEY = "ui-theme";
function applyTheme(t){ if (t === "light" || t === "dark") document.documentElement.dataset.theme = t; else delete document.documentElement.dataset.theme; }
try { applyTheme(localStorage.getItem(THEME_KEY)); } catch(_) {}
function toggleTheme(){
  const sysDark = matchMedia("(prefers-color-scheme: dark)").matches;
  const cur = document.documentElement.dataset.theme || (sysDark ? "dark" : "light");
  const next = cur === "dark" ? "light" : "dark";
  applyTheme(next === (sysDark ? "dark" : "light") ? null : next);
  try { if (document.documentElement.dataset.theme) localStorage.setItem(THEME_KEY, next); else localStorage.removeItem(THEME_KEY); } catch(_) {}
  toast(next === "dark" ? "ダークモードにしました" : "ライトモードにしました");
}
document.addEventListener("click", e => { if (e.target.closest("[data-theme-toggle]")) toggleTheme(); });

/* ---------- ナビ：PCは左サイド、スマホは左から開くメニュー。どちらも同じ項目・同じ並び ---------- */
function navHTML(groups, page, counts = {}){
  return groups.map(g => `<nav class="nav-g"${g.g ? ` aria-label="${esc(g.g)}"` : ""}>${g.g ? `<div class="gl">${esc(g.g)}</div>` : ""}${g.items.map(id => { const p = page[id]; return `<a href="#${id}" data-view="${id}" data-sec="${id}">${ic(p.i, 16)}<span>${esc(p.l)}</span>${counts[id] ? `<span class="cnt">${counts[id]}</span>` : ""}</a>`; }).join("")}</nav>`).join("");
}
function markHere(groups, page, id){
  document.querySelectorAll("[data-sec]").forEach(a => {
    const on = a.dataset.sec === id;
    a.classList.toggle("on", on);
    if (on) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
  });
  const here = $("here");
  if (here) {
    const g = groups.find(x => x.items.includes(id));
    here.innerHTML = `${g && g.g ? `<span class="gl">${esc(g.g)} ›</span>` : ""}<b>${esc(page[id] ? page[id].l : "")}</b>`;
  }
}
document.addEventListener("click", e => {
  if (e.target.closest("[data-menu]")) { showDlg("msheet"); return; }
  if ($("msheet") && $("msheet").open && e.target.closest("#msheet [data-view], #msheet a[href^='#']")) closeDlg("msheet");
});

/* ---------- コピー（失敗したら false を返す。呼び出し側で手動コピーを案内する） ---------- */
async function copyText(text){
  try { await navigator.clipboard.writeText(text); return true; } catch(_) {}
  try {
    const ta = document.createElement("textarea"); ta.value = text; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.append(ta); ta.select(); const ok = document.execCommand("copy"); ta.remove(); return ok;
  } catch(_) { return false; }
}
function selectText(el){ try { const r = document.createRange(); r.selectNodeContents(el); const s = getSelection(); s.removeAllRanges(); s.addRange(r); } catch(_) {} }

/* ---------- 戻る・進む：表示の切り替えをブラウザの履歴に残す ---------- */
function pushHash(h){
  const next = "#" + h;
  if (location.hash === next) return false;
  try { history.pushState(null, "", next); } catch(_) { location.hash = next; }
  return true;
}
