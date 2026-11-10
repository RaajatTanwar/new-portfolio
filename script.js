/* THE KEY BALL — a ball of keycaps for Rajat. Vanilla JS + CSS 3D. No WebGL. */
(() => {
  "use strict";

  const { PAL, svg, LETTERS, CHECK, OTHER, routeOf } = window.SITE;

  const reduceQuery = matchMedia("(prefers-reduced-motion: reduce)");
  let reduce = reduceQuery.matches;
  reduceQuery.addEventListener("change", () => (reduce = reduceQuery.matches));

  /* ---------- sphere layout: rings of latitude, offset like bricks ---------- */
  const RINGS = [[0, 16, 0], [21, 15, 0.5], [-21, 15, 0.5], [42, 12, 0], [-42, 12, 0], [63, 7, 0.5], [-63, 7, 0.5], [82, 3, 0], [-82, 3, 0]];
  const norm = (d) => ((((d + 180) % 360) + 360) % 360) - 180;
  const slots = [];
  RINGS.forEach(([lat, n, off]) => { for (let i = 0; i < n; i++) slots.push({ lat, lon: norm(((i + off) / n) * 360) }); });

  const near = (a, b) => Math.abs(norm(a - b)) < 0.01;
  const front = [
    ...[-36, -12, 12, 36].map((lon, i) => ({ lat: 21, lon, L: LETTERS[i] })),
    ...[-45, -22.5, 0, 22.5, 45].map((lon, i) => ({ lat: 0, lon, L: LETTERS[4 + i] })),
  ];
  const checkSlot = { lat: -21, lon: 12 };

  // seeded random so the cluster looks loose but is the same every visit
  let seed = 7;
  const rnd = () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const shuffled = OTHER.slice();
  for (let i = shuffled.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; }

  /* ---------- build the keys ---------- */
  const ball = document.getElementById("ball");
  const wrap = document.getElementById("wrap");
  const scene = ball.parentElement;
  const keys = [];
  const byId = {};
  let pool = 0;

  slots.forEach((s) => {
    let info, letter = false;
    const f = front.find((q) => q.lat === s.lat && near(q.lon, s.lon));
    if (f) { info = f.L; letter = true; }
    else if (s.lat === checkSlot.lat && near(s.lon, checkSlot.lon)) { info = CHECK; letter = true; }
    else info = shuffled[pool++];
    if (!info) return;

    const [base, legend] = PAL[info.c];
    const isGlass = info.c === "glass";
    const label = info.ch || info.label;
    const len = label ? label.length : 0;
    const fs = letter ? 0.5 : len <= 2 ? 0.4 : len === 3 ? 0.31 : len === 4 ? 0.27 : len === 5 ? 0.24 : len === 6 ? 0.21 : len === 7 ? 0.19 : 0.165;
    const twist = letter ? 0 : (rnd() * 2 - 1) * 5;
    const dz = (rnd() * 2 - 1) * 7;
    const la = (s.lat * Math.PI) / 180, lo = (s.lon * Math.PI) / 180;

    const el = document.createElement("div");
    el.className = "key" + (isGlass ? " glass" : "");
    el.style.cssText = `--k:${base};--kt:${legend};--fs:${fs};transform:rotateY(${s.lon}deg) rotateX(${s.lat}deg) translateZ(calc(var(--R) + ${dz.toFixed(2)}px)) rotateZ(${twist.toFixed(2)}deg)`;
    const face = info.icon ? svg(info.icon) : `<span>${label}</span>`;
    const shownTitle = info.t;
    el.innerHTML =
      `<div class="cap"><div class="body"><i class="s n"></i><i class="s s"></i><i class="s w"></i><i class="s e"></i></div><div class="top">${face}</div></div>` +
      `<button class="hit" type="button" tabindex="-1" aria-label="${shownTitle.replace(/"/g, "&quot;")}"></button>`;
    ball.appendChild(el);

    const key = {
      id: info.id, el, hit: el.querySelector(".hit"), info, lat: s.lat, lon: s.lon,
      n: [Math.sin(lo) * Math.cos(la), -Math.sin(la), Math.cos(lo) * Math.cos(la)], d: -1,
      base, legend, face, glass: isGlass,
    };
    keys.push(key);
    byId[key.id] = key;
  });

  /* ---------- sizing: R = 34% of the smaller side (38% on phones) ---------- */
  function size() {
    const w = wrap.clientWidth, h = wrap.clientHeight;
    const phone = matchMedia("(max-width: 640px)").matches;
    const R = (phone ? 0.38 : 0.34) * Math.min(w, h);
    const ks = 0.36 * R, kd = 0.2 * R;
    ball.style.setProperty("--R", R.toFixed(1) + "px");
    ball.style.setProperty("--ks", ks.toFixed(1) + "px");
    ball.style.setProperty("--kd", kd.toFixed(1) + "px");
  }
  new ResizeObserver(size).observe(wrap);
  size();

  /* ---------- the info card ---------- */
  const $ = (id) => document.getElementById(id);
  const mini = $("mini"), kicker = $("kicker"), title = $("title"), text = $("text"), clinks = $("clinks");
  let shownId = null;
  function showCard(key) {
    if (shownId === key.id) return;
    shownId = key.id;
    mini.style.setProperty("--k", key.base);
    mini.style.setProperty("--kt", key.legend);
    mini.innerHTML = key.info.icon ? svg(key.info.icon) : (key.info.ch || key.info.label);
    mini.style.fontSize = (key.info.ch || (key.info.label || "").length <= 2) ? "22px" : "13px";
    kicker.textContent = key.info.k;
    title.textContent = key.info.t;
    text.textContent = key.info.x;
    clinks.innerHTML = "";
    const route = routeOf(key.info);
    if (route) {
      const a = document.createElement("a");
      a.href = "#/" + route; a.className = "go";
      a.innerHTML = 'Open page <span aria-hidden="true">&rarr;</span>';
      clinks.appendChild(a);
    }
    (key.info.links || []).forEach((l) => {
      const a = document.createElement("a");
      a.href = l.h; a.textContent = l.l;
      if (/^https?:/.test(l.h)) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
      if (l.dl) a.setAttribute("download", "Rajat_Resume.pdf");
      clinks.appendChild(a);
    });
  }

  /* ---------- state ---------- */
  const TILT = -12; // top of the ball leans toward the viewer so both letter rows face you
  const REST = { rx: TILT, ry: 0 };
  const st = {
    rx: REST.rx, ry: 0, vx: 0, vy: 0, amp: 1,
    dragging: false, pending: false, moved: false, sx: 0, sy: 0, lx: 0, ly: 0,
    release: 0, tween: null, hover: null, sel: null,
  };
  const clampRx = (v) => { const lim = Math.max(55, Math.abs(st.rx)); return Math.max(-lim, Math.min(lim, v)); };
  const homeOf = (k) => (k ? { rx: -k.lat, ry: -k.lon } : REST);

  function refresh() {
    keys.forEach((k) => k.el.classList.toggle("hot", k === st.hover || k === st.sel));
    showCard(st.hover || st.sel || byId.o1);
  }

  function tweenTo(to, dur, done) {
    const ry = st.ry + norm(to.ry - st.ry); // shortest way round
    st.vx = st.vy = 0;
    if (reduce) { st.rx = to.rx; st.ry = ry; st.tween = null; done && done(); return; }
    st.tween = { f: { rx: st.rx, ry: st.ry }, t: { rx: to.rx, ry }, t0: performance.now(), dur, done };
  }

  function spinTo(key) {
    st.sel = null; st.hover = null;
    showCard(key);
    tweenTo(homeOf(key), 900, () => { st.sel = key; refresh(); });
    refresh();
    showCard(key);
  }
  function resetBall() {
    st.sel = null; st.hover = null; shownId = null;
    tweenTo(REST, 900, refresh);
    refresh();
  }

  /* ---------- lighting: darken keys facing away (up to ~70%) ---------- */
  function light(rx, ry) {
    const cy = Math.cos((ry * Math.PI) / 180), sy = Math.sin((ry * Math.PI) / 180);
    const cx = Math.cos((rx * Math.PI) / 180), sx = Math.sin((rx * Math.PI) / 180);
    for (const k of keys) {
      const [x, y, z] = k.n;
      const z1 = -x * sy + z * cy;
      const z2 = y * sx + z1 * cx;
      const d = Math.max(0, Math.min(0.7, 0.7 * (1 - z2)));
      if (Math.abs(d - k.d) > 0.008) { k.d = d; k.el.style.setProperty("--d", d.toFixed(3)); }
    }
  }

  /* ---------- animation loop ---------- */
  // the loop sleeps while a page covers the ball, and wakes on the way home
  const onPage = () => /^#\/./.test(location.hash);
  let running = false;
  function start() { if (!running && !onPage()) { running = true; requestAnimationFrame(frame); } }
  window.addEventListener("hashchange", () => {
    if (onPage()) return;
    st.sel = null; st.hover = null; shownId = null;
    keys.forEach((k) => k.el.classList.remove("press"));
    refresh(); start();
  });

  function frame(now) {
    if (onPage()) { running = false; return; }
    if (st.tween) {
      const p = Math.min(1, (now - st.tween.t0) / st.tween.dur);
      const e = 1 - Math.pow(1 - p, 3);
      st.rx = st.tween.f.rx + (st.tween.t.rx - st.tween.f.rx) * e;
      st.ry = st.tween.f.ry + (st.tween.t.ry - st.tween.f.ry) * e;
      if (p >= 1) { const d = st.tween.done; st.tween = null; d && d(); }
    } else if (!st.dragging) {
      if (Math.abs(st.vx) > 0.01 || Math.abs(st.vy) > 0.01) {
        st.ry += st.vy; st.rx = clampRx(st.rx + st.vx); st.vx *= 0.94; st.vy *= 0.94;
      } else if (st.release && now - st.release > 3500 && !st.hover && !st.pending) {
        st.release = 0; tweenTo(homeOf(st.sel), 1100);
      }
    }
    const want = reduce || st.hover || st.dragging || st.tween || st.sel || st.pending ? 0 : 1;
    st.amp += (want - st.amp) * 0.06;
    const sway = reduce ? 0 : st.amp * 18 * Math.sin(now * 0.00062);
    const ry = st.ry + sway;
    ball.style.transform = `rotateX(${st.rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
    light(st.rx, ry);
    requestAnimationFrame(frame);
  }

  /* ---------- pointer: drag to spin, hover to pop ---------- */
  let lastPointer = "mouse";
  scene.addEventListener("pointerdown", (e) => {
    lastPointer = e.pointerType;
    st.pending = true; st.moved = false; st.sx = st.lx = e.clientX; st.sy = st.ly = e.clientY;
  });
  scene.addEventListener("pointermove", (e) => {
    if (!st.pending) return;
    if (!st.dragging) {
      if (Math.hypot(e.clientX - st.sx, e.clientY - st.sy) < 5) return;
      st.dragging = true; st.moved = true; st.tween = null;
      scene.classList.add("dragging");
      scene.setPointerCapture(e.pointerId);
    }
    const dx = e.clientX - st.lx, dy = e.clientY - st.ly;
    st.lx = e.clientX; st.ly = e.clientY;
    st.ry += dx * 0.35;
    st.rx = clampRx(st.rx - dy * 0.3);
    st.vy = dx * 0.35; st.vx = -dy * 0.3;
  });
  const endDrag = (e) => {
    st.pending = false;
    if (st.dragging) {
      st.dragging = false; scene.classList.remove("dragging");
      st.release = performance.now();
      if (reduce) st.vx = st.vy = 0;
      try { scene.releasePointerCapture(e.pointerId); } catch (_) { /* already released */ }
    }
  };
  scene.addEventListener("pointerup", endDrag);
  scene.addEventListener("pointercancel", endDrag);

  keys.forEach((k) => {
    k.hit.addEventListener("pointerenter", (e) => { if (e.pointerType === "touch" || st.dragging) return; st.hover = k; refresh(); });
    k.hit.addEventListener("pointerleave", () => { if (st.hover === k) { st.hover = null; st.release = st.release || performance.now(); refresh(); } });
    k.hit.addEventListener("click", () => {
      if (st.moved) return;
      const route = routeOf(k.info);
      // mouse: click opens the page. touch: first tap previews, second tap opens.
      if (route && (lastPointer !== "touch" || st.sel === k)) { press(k, route); return; }
      st.sel = st.sel === k ? null : k;
      refresh();
    });
  });

  function press(k, route) {
    st.sel = k; refresh();
    k.el.classList.add("press");
    setTimeout(() => { location.hash = "#/" + route; }, reduce ? 0 : 170);
  }
  window.addEventListener("keydown", (e) => { if (e.key === "Escape" && st.sel) { st.sel = null; refresh(); } });

  /* ---------- buttons, nav, chips ---------- */
  $("again").addEventListener("click", resetBall);

  const CHIPS = [["ai", "AI"], ["ml", "ML"], ["rag", "RAG"], ["langgraph", "LangGraph"], ["python", "Python"], ["fastapi", "FastAPI"], ["nextjs", "Next.js"], ["supabase", "Supabase"]];
  const chips = $("chips");
  CHIPS.forEach(([id, label]) => {
    const li = document.createElement("li");
    const b = document.createElement("button");
    b.type = "button"; b.textContent = label;
    b.addEventListener("click", () => spinTo(byId[id]));
    li.appendChild(b); chips.appendChild(li);
  });

  refresh();
  start();
})();
