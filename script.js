/* THE KEY BALL — a ball of keycaps for Rajat. Vanilla JS + CSS 3D. No WebGL. */
(() => {
  "use strict";

  const EMAIL = "rajatrajput8119@gmail.com";
  const LINKEDIN = "https://www.linkedin.com/in/rajatttanwarr/";
  const GITHUB = "https://github.com/RaajatTanwar";

  const reduceQuery = matchMedia("(prefers-reduced-motion: reduce)");
  let reduce = reduceQuery.matches;
  reduceQuery.addEventListener("change", () => (reduce = reduceQuery.matches));

  /* ---------- palette: base / legend ---------- */
  const PAL = {
    pink: ["#ff4fa3", "#ffffff"], orange: ["#ff7a2e", "#ffffff"], yellow: ["#ffd23f", "#0b0c10"],
    mint: ["#3fe0a8", "#0a4a33"], sky: ["#38b6ff", "#ffffff"], lilac: ["#a77bff", "#ffffff"],
    red: ["#ff4646", "#ffffff"], lime: ["#c8f03c", "#0b0c10"], white: ["#f4f2f8", "#17171f"],
    black: ["#17171f", "#ffffff"], glass: ["#dfe5f2", "#0b0c10"],
  };

  /* ---------- simple stroked icons (24 × 24) ---------- */
  const ICONS = {
    pen: '<path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.6 7.6"/><circle cx="11" cy="11" r="2"/>',
    frame: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>',
    cube: '<path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7z"/><path d="M3.3 7L12 12l8.7-5M12 22V12"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-5-5"/>',
    bolt: '<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>',
    gear: '<circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="6.5"/><path d="M12 2v3.5M12 18.5V22M2 12h3.5M18.5 12H22M4.9 4.9l2.4 2.4M16.7 16.7l2.4 2.4M19.1 4.9l-2.4 2.4M7.3 16.7l-2.4 2.4"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    folder: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
    heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21.2l7.8-7.8 1-1.1a5.5 5.5 0 0 0 0-7.7z"/>',
  };
  const svg = (name) =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;

  /* ---------- the nine letters of PORTFOLIO (kicker / title / text) ---------- */
  const LETTERS = [
    { id: "p", ch: "P", c: "pink", k: "P · Projects", t: "Selected work",
      x: "ResearchGPT, UniWell, Galaxy Morphology Classification and Receipts-AI." },
    { id: "o1", ch: "O", c: "orange", k: "O · Origin", t: "Hi, I\u2019m Rajat",
      x: "An AI/ML engineer and full-stack developer turning complex problems into intelligent applications." },
    { id: "r", ch: "R", c: "yellow", k: "R · Results", t: "81.84% accuracy",
      x: "Best test accuracy in my galaxy-classification benchmark, from XGBoost. Macro F1 is lower (58.87%) because Irregular galaxies are hard to catch." },
    { id: "t", ch: "T", c: "mint", k: "T · Toolkit", t: "What I use",
      x: "Python, FastAPI, Next.js, LangGraph, Supabase and ChromaDB." },
    { id: "f", ch: "F", c: "sky", k: "F · Featured", t: "ResearchGPT",
      x: "A multi-agent research assistant: LangGraph agents, Gemini 2.5 Pro and a RAG pipeline that writes citation-backed reports.",
      links: [{ l: "Live demo", h: "https://research-gpt-sage.vercel.app/" }] },
    { id: "o2", ch: "O", c: "lilac", k: "O · Open", t: "Open to talk",
      x: "Roles, collaborations or just a good AI problem. My inbox is open." },
    { id: "l", ch: "L", c: "pink", k: "L · Lab", t: "Receipts-AI",
      x: "A local-first platform that checks whether an AI coding agent really finished the job, against actual test runs and repo state.",
      links: [{ l: "GitHub", h: GITHUB + "/receipts-ai" }] },
    { id: "i", ch: "I", c: "white", k: "I · Ideas", t: "How I think",
      x: "Start from the business problem, prototype the workflow, then test the edge cases." },
    { id: "o3", ch: "O", c: "orange", k: "O · Outreach", t: "Say hello",
      x: EMAIL, links: [{ l: "Email me", h: "mailto:" + EMAIL }] },
  ];
  const CHECK = {
    id: "check", ch: "\u2713", c: "lime", k: "Status", t: "Open to conversations",
    x: "Happy to talk about AI/ML roles and collaborations. Email me.",
    links: [{ l: "Email me", h: "mailto:" + EMAIL }],
  };

  /* ---------- 80 more keys: skills, tools, projects, path, contact ---------- */
  // [id, label | null, colour, kicker, title, text, options]
  const K = (id, label, c, k, t, x, o = {}) => ({ id, label, c, k, t, x, ...o });
  const OTHER = [
    // language
    K("python", "Python", "sky", "Language", "Python", "The language behind my ML pipelines, FastAPI backends and agent workflows."),
    K("cpp", "C++", "black", "Language", "C++", "One of my programming languages, alongside Python, JavaScript, TypeScript and SQL."),
    K("js", "JS", "yellow", "Language", "JavaScript", "Front-end and Node.js work for my web applications."),
    K("ts", "TS", "sky", "Language", "TypeScript", "Typed code for the Receipts-AI server and dashboard."),
    K("sql", "SQL", "lilac", "Language", "SQL", "Queries and schemas for PostgreSQL-backed products."),
    // AI / ML
    K("ml", "ML", "mint", "AI / ML", "Machine Learning", "Classical and deep models, benchmarked and evaluated on held-out data."),
    K("nlp", "NLP", "orange", "AI / ML", "Natural Language Processing", "Language understanding and generation for intelligent applications."),
    K("vision", "Vision", "pink", "AI / ML", "Computer Vision", "Galaxy image classification, with Grad-CAM to show what the model looks at."),
    K("genai", "GenAI", "red", "AI / ML", "Generative AI", "Applications that put large language models to work."),
    K("llm", "LLM", "black", "AI / ML", "LLM applications", "LLM-powered agents and solutions connected to real systems through tools and APIs."),
    K("rag", "RAG", "lime", "AI / ML", "Retrieval-Augmented Generation", "Source-grounded answers using embeddings, ChromaDB and semantic search."),
    K("prompt", null, "white", "AI / ML", "Prompt engineering", "Prompts and structured outputs that keep LLM behaviour dependable.", { icon: "pen" }),
    K("sklearn", "sklearn", "orange", "AI / ML", "Scikit-learn", "Classical baselines such as SVM and Random Forest."),
    K("pandas", "Pandas", "lilac", "AI / ML", "Pandas", "Data analysis and feature engineering, practised in IBM SkillsBuild."),
    K("numpy", "NumPy", "sky", "AI / ML", "NumPy", "The numerical computing underneath my data work."),
    K("plot", "Plot", "mint", "AI / ML", "Matplotlib", "Data visualization for exploring and explaining results."),
    K("xgboost", "XGBoost", "red", "AI / ML", "XGBoost", "The best model in my galaxy benchmark, at 81.84% test accuracy."),
    K("opencv", "OpenCV", "black", "AI / ML", "OpenCV", "Image processing for computer vision work."),
    // frameworks
    K("fastapi", "FastAPI", "mint", "Framework", "FastAPI", "Python APIs, including the prediction backend for the galaxy classifier."),
    K("flask", "Flask", "white", "Framework", "Flask", "Lightweight Python web services."),
    K("langchain", "LangChain", "lime", "Framework", "LangChain", "Building blocks for LLM applications and agents."),
    K("langgraph", "LangGraph", "lilac", "Framework", "LangGraph", "Orchestrating the planning, retrieval and analysis agents in ResearchGPT."),
    K("nextjs", "Next.js", "black", "Framework", "Next.js", "Front ends and full-stack apps, from ResearchGPT to the Receipts dashboard."),
    K("express", "Express", "yellow", "Framework", "Express.js", "The TypeScript verification server behind Receipts-AI."),
    K("tailwind", "Tailwind", "sky", "Framework", "Tailwind CSS", "Utility-first styling for fast, consistent interfaces."),
    K("react", "React", "pink", "Framework", "React", "Component-based interfaces for my web apps."),
    // data & tools
    K("postgres", "Postgres", "sky", "Data & tools", "PostgreSQL", "Relational data for UniWell and other full-stack products."),
    K("supabase", "Supabase", "mint", "Data & tools", "Supabase", "Authentication, database and role-based access control."),
    K("convex", "Convex", "orange", "Data & tools", "Convex", "A reactive backend for real-time apps."),
    K("sqlite", "SQLite", "lilac", "Data & tools", "SQLite", "Lightweight embedded storage."),
    K("chroma", "Chroma", "pink", "Data & tools", "ChromaDB", "The vector database behind ResearchGPT\u2019s semantic search."),
    K("git", "Git", "red", "Data & tools", "Git", "Receipts-AI fingerprints the exact repository state with Git."),
    K("github", null, "black", "Data & tools", "GitHub", "github.com/RaajatTanwar", { icon: "folder", links: [{ l: "Open GitHub", h: GITHUB }] }),
    K("rest", "REST", "yellow", "Data & tools", "REST APIs", "Connecting AI capabilities to business systems."),
    K("docker", null, "white", "Data & tools", "Docker", "Containers for repeatable environments.", { icon: "cube" }),
    // systems & process
    K("process", null, "lime", "Process", "How I build", "Turn business requirements into technical workflows, prototype with LLMs and tools, then test and refine for quality and edge cases.", { icon: "gear" }),
    K("events", "Events", "orange", "Systems", "Event-driven architectures", "Systems that react to events as they happen."),
    K("realtime", null, "yellow", "Systems", "Real-time systems", "Responsive systems that keep up with live data.", { icon: "bolt" }),
    K("auth", null, "pink", "Systems", "Authentication & RBAC", "Role-based access control and secure backends, as in UniWell.", { icon: "shield" }),
    K("stack", "Stack", "mint", "Systems", "Full-stack development", "From schema and API to the interface."),
    K("semantic", null, "lilac", "Systems", "Semantic search", "Finding the right sources by meaning rather than keywords.", { icon: "search" }),
    K("frontend", null, "sky", "Systems", "Front end", "Interfaces built with Next.js and Tailwind CSS.", { icon: "frame" }),
    K("agents", "Agents", "red", "Systems", "Agentic workflows", "Autonomous agents that plan, retrieve, analyse and report."),
    K("saas", "SaaS", "lilac", "Systems", "AI SaaS", "Scalable AI applications with Next.js, Supabase and Clerk."),
    // projects
    K("rgpt", "RGPT", "pink", "Project", "ResearchGPT", "A multi-agent AI research assistant that plans, retrieves, analyses and writes citation-backed reports.", { links: [{ l: "Live demo", h: "https://research-gpt-sage.vercel.app/" }] }),
    K("galaxy", "Galaxy", "sky", "Project", "Galaxy Morphology Classification", "Elliptical, Spiral and Irregular galaxies from the Galaxy10 DECaLS dataset: classical ML benchmarked against transfer learning.", { links: [{ l: "GitHub", h: GITHUB + "/Galaxy-Morphology-Classification" }] }),
    K("receipts", "Receipts", "red", "Project", "Receipts-AI", "A local-first verification platform that checks AI coding agents\u2019 completion claims against real test runs and Git state.", { links: [{ l: "GitHub", h: GITHUB + "/receipts-ai" }] }),
    K("uniwell", "UniWell", "mint", "Project", "UniWell", "A campus health platform with role-based portals for students, medical staff and administrators.", { links: [{ l: "Live demo", h: "https://uniwell-ind.vercel.app/" }] }),
    K("care", null, "lime", "Project", "UniWell features", "AI healthcare assistance, appointment scheduling and digital medical records workflows.", { icon: "heart" }),
    K("gemini", "Gemini", "white", "Project", "Gemini 2.5 Pro", "The model behind ResearchGPT\u2019s analysis and report writing."),
    K("clerk", "Clerk", "lilac", "Project", "Clerk", "Authentication for ResearchGPT."),
    K("zod", "Zod", "sky", "Project", "Zod", "Shared schemas across the Receipts-AI monorepo."),
    K("pnpm", "pnpm", "orange", "Project", "pnpm monorepo", "Receipts-AI is modular: a server, a dashboard, CLI tooling and shared schemas."),
    K("gradcam", "Grad-CAM", "red", "Project", "Grad-CAM", "Visual explanations for the galaxy classifier."),
    K("streamlit", "Streamlit", "pink", "Project", "Streamlit", "An interactive dashboard for the galaxy classifier."),
    K("resnet", "ResNet", "mint", "Project", "ResNet18", "A transfer-learning model in the galaxy benchmark."),
    K("effnet", "EffNet", "yellow", "Project", "EfficientNet-B0", "Another transfer-learning model in the galaxy benchmark."),
    K("mobilenet", "MobileNet", "lilac", "Project", "MobileNetV3-Small", "A lightweight transfer-learning model in the galaxy benchmark."),
    K("galaxy10", "Galaxy10", "glass", "Project", "Galaxy10 DECaLS", "The dataset: galaxy images sorted into Elliptical, Spiral and Irregular."),
    K("sos", "SOS", "red", "Project", "Emergency SOS", "UniWell broadcasts emergency alerts through its campus health system."),
    K("cites", "Cites", "yellow", "Project", "Citations", "ResearchGPT\u2019s reports are citation-backed."),
    K("embed", "Embed", "black", "Project", "Embeddings", "Document embeddings feed ResearchGPT\u2019s retrieval."),
    K("viz", "Viz", "mint", "Project", "Data visualization", "Interactive analytics inside ResearchGPT."),
    K("tamper", "Tamper", "red", "Project", "Tamper detection", "Receipts-AI flags skipped tests, weakened assertions and deleted test cases."),
    K("tests", "Tests", "mint", "Project", "Test verification", "Receipts-AI runs the tests itself rather than trusting an agent\u2019s claim."),
    K("hooks", "Hooks", "white", "Project", "Failproof hooks", "Policy hooks that connect Receipts-AI to Claude Code."),
    K("claude", "Claude", "orange", "Project", "Claude Code", "Receipts-AI verifies the completion claims of Claude Code agents."),
    K("cli", "CLI", "lilac", "Project", "CLI tooling", "Setup and control for Receipts-AI from the command line."),
    // process details
    K("json", "JSON", "sky", "Process", "Structured outputs", "Structured LLM outputs and tool calls for reliable integrations."),
    K("auto", "Auto", "lime", "Process", "Automation", "Finding where AI agents and automation can streamline operations."),
    K("edge", "Edge", "pink", "Process", "Edge cases", "Testing AI workflows for quality, reliability and edge cases."),
    K("bench", "Bench", "black", "Process", "Benchmarking", "Comparing classical ML with transfer learning, and reporting it honestly."),
    // path
    K("fokel", "Fokel", "orange", "Experience", "Fokel", "AI Solutions Engineer Intern, June \u2013 September 2026.", { links: [{ l: "fokelworks.com", h: "https://www.fokelworks.com/" }] }),
    K("ibm", "IBM", "sky", "Experience", "IBM SkillsBuild", "AI & Machine Learning Trainee, June \u2013 August 2025."),
    K("btech", "B.Tech", "lime", "Education", "B.Tech, AI & ML", "Guru Gobind Singh Indraprastha University, 2023 \u2013 present."),
    // contact
    K("delhi", "Delhi", "white", "Contact", "Delhi, India", "Where I\u2019m based."),
    K("in", "in", "sky", "Contact", "LinkedIn", "linkedin.com/in/rajatttanwarr", { links: [{ l: "Open LinkedIn", h: LINKEDIN }] }),
    K("cv", "CV", "glass", "Contact", "R\u00e9sum\u00e9", "My CV as a PDF.", { links: [{ l: "Download PDF", h: "Rajat_Resume.pdf", dl: true }] }),
    K("ai", "AI", "black", "About", "AI/ML Engineer & Full Stack Developer", "Machine learning, NLP and generative AI, plus the full-stack skills to ship them. B.Tech in AI & ML at GGSIPU, 2023 \u2013 present."),
    K("at", "@", "lime", "Contact", "Say hello", EMAIL, { links: [{ l: "Email", h: "mailto:" + EMAIL }, { l: "LinkedIn", h: LINKEDIN }, { l: "GitHub", h: GITHUB }] }),
  ];

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
    document.querySelectorAll(".links button").forEach((b) => b.setAttribute("aria-current", st.sel && b.dataset.key === st.sel.id ? "true" : "false"));
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
  function frame(now) {
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
  scene.addEventListener("pointerdown", (e) => {
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
      st.sel = st.sel === k ? null : k;
      refresh();
    });
  });
  window.addEventListener("keydown", (e) => { if (e.key === "Escape" && st.sel) { st.sel = null; refresh(); } });

  /* ---------- buttons, nav, chips ---------- */
  $("see").addEventListener("click", () => spinTo(byId.p));
  $("again").addEventListener("click", resetBall);
  document.querySelectorAll(".links button").forEach((b) => b.addEventListener("click", () => spinTo(byId[b.dataset.key])));

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
  requestAnimationFrame(frame);
})();
