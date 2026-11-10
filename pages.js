/* PAGES — hash-routed sections that slide over the key ball.
   Routes: #/work  #/work/<slug>  #/experience[/<id>]  #/skills[/<id>]  #/about[/process]  #/contact */
(() => {
  "use strict";

  const S = window.SITE;
  const { svg, PAL } = S;
  const $ = (id) => document.getElementById(id);
  const root = document.documentElement;
  const page = $("page"), inner = $("pageInner"), toastEl = $("toast");
  const header = document.querySelector(".nav"), hero = document.querySelector(".hero");
  const HOME_TITLE = document.title;

  const reduceQuery = matchMedia("(prefers-reduced-motion: reduce)");
  const reduce = () => reduceQuery.matches;

  const ALL = [...S.LETTERS, S.CHECK, ...S.OTHER];
  const KEY = Object.fromEntries(ALL.map((k) => [k.id, k]));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const ext = (h) => (/^https?:/.test(h) ? ' target="_blank" rel="noopener noreferrer"' : "");

  /* ---------- small building blocks ---------- */
  // a keycap badge: kc({ c, label | icon }, "sm" | "lg")
  function kc(o, size = "") {
    const [base, legend] = PAL[o.c] || PAL.black;
    const label = o.ch || o.label || "";
    const len = o.icon ? "" : label.length <= 2 ? "l1" : label.length <= 5 ? "l2" : "l3";
    const face = o.icon ? svg(o.icon) : esc(label);
    return `<span class="kc ${size} ${len}" style="--k:${base};--kt:${legend}" aria-hidden="true">${face}</span>`;
  }
  // a skill chip; links to the key's page when it has one
  function chip(id, self) {
    const k = KEY[id];
    if (!k) return "";
    let r = S.routeOf(k);
    if (r === self) r = null;
    const inside = `${kc(k, "xs")}<span>${esc(k.t)}</span>`;
    return r ? `<a class="chip" href="#/${r}">${inside}</a>` : `<span class="chip">${inside}</span>`;
  }
  const head = (eyebrow, title, lead) => `
    <header class="phead">
      <p class="eyebrow rv"><i class="dot" aria-hidden="true"></i>${eyebrow}</p>
      <h1 class="ptitle rv" style="--i:1" tabindex="-1">${title}</h1>
      ${lead ? `<p class="lead rv" style="--i:2">${lead}</p>` : ""}
    </header>`;
  const cta = () => `
    <section class="cta rv">
      <div>
        <p class="kick">Got a role, a project or an idea?</p>
        <h2>Let&rsquo;s build something <em>intelligent.</em></h2>
      </div>
      <a class="keycap white" href="#/contact">Send me a message<span class="legend" aria-hidden="true">@</span></a>
    </section>`;
  const foot = () => `
    <footer class="pfoot">
      <a href="#/" class="home-link"><span aria-hidden="true">&larr;</span> Back to the key ball</a>
      <span class="pfoot-links">
        <a href="${S.LINKEDIN}"${ext(S.LINKEDIN)}>LinkedIn</a>
        <a href="${S.GITHUB}"${ext(S.GITHUB)}>GitHub</a>
        <a href="Rajat_Resume.pdf" download="Rajat_Resume.pdf">R&eacute;sum&eacute;</a>
      </span>
      <span class="muted">&copy; ${new Date().getFullYear()} Rajat</span>
    </footer>`;

  /* ---------- WORK ---------- */
  function renderWork() {
    const cards = S.PROJECTS.map((p, i) => `
      <a class="pcard rv" style="--i:${i % 2};--k:${PAL[p.c][0]}" href="#/work/${p.slug}">
        <span class="pcard-glow" aria-hidden="true"></span>
        <span class="pcard-top">${kc(p, "md")}<span class="pcard-kick">${esc(p.kicker)}</span></span>
        <h3>${esc(p.name)}</h3>
        <p>${esc(p.tagline)}</p>
        <span class="pcard-metric"><b>${esc(p.metrics[0][0])}</b> ${esc(p.metrics[0][1])}</span>
        <span class="tags">${p.stack.slice(0, 4).map((id) => `<span>${esc(KEY[id] ? KEY[id].t : id)}</span>`).join("")}</span>
        <span class="pcard-go">Read the case study <span aria-hidden="true">&rarr;</span></span>
      </a>`).join("");
    return head("P &middot; PROJECTS", "Selected <em>work</em>",
      "Four builds across agentic AI, developer tooling, health tech and computer vision. Each one has a short case study: the problem, the field it lives in, what I built and how it works.") +
      `<div class="pgrid">${cards}</div>` + cta() + foot();
  }

  function renderProject(slug) {
    const i = S.PROJECTS.findIndex((p) => p.slug === slug);
    if (i < 0) return renderMissing();
    const p = S.PROJECTS[i];
    const prev = S.PROJECTS[(i - 1 + S.PROJECTS.length) % S.PROJECTS.length];
    const next = S.PROJECTS[(i + 1) % S.PROJECTS.length];
    const toc = [["overview", "Overview"], ["problem", "The problem"], ["field", "The field"], ["built", "What I built"], ["flow", "How it works"], ["stack", "Stack"]];
    const links = p.links.map((l, j) =>
      `<a class="keycap ${j ? "white" : "black"}" href="${l.h}"${ext(l.h)}>${esc(l.l)}&nbsp;&#8599;</a>`).join("");

    return `
      <a class="back rv" href="#/work"><span aria-hidden="true">&larr;</span> All work</a>
      <header class="cs-head" style="--k:${PAL[p.c][0]}">
        <div class="cs-badge rv">${kc(p, "lg")}</div>
        <p class="eyebrow rv" style="--i:1">${esc(p.kicker)}</p>
        <h1 class="ptitle rv" style="--i:1" tabindex="-1">${esc(p.name)}</h1>
        <p class="lead rv" style="--i:2">${esc(p.tagline)}</p>
        <dl class="meta rv" style="--i:3">${p.meta.map(([a, b]) => `<div><dt>${esc(a)}</dt><dd>${esc(b)}</dd></div>`).join("")}</dl>
        <div class="cs-actions rv" style="--i:3">${links}<a class="keycap white" href="#/contact">Ask me about it</a></div>
      </header>

      <section class="metrics">${p.metrics.map(([n, l], j) =>
        `<div class="metric rv" style="--i:${j}"><b>${esc(n)}</b><span>${esc(l)}</span></div>`).join("")}</section>

      <div class="cs">
        <nav class="toc" aria-label="On this page">
          <p class="kick">On this page</p>
          ${toc.map(([id, t]) => `<button type="button" data-to="cs-${id}">${t}</button>`).join("")}
        </nav>
        <div class="cs-body">
          <section id="cs-overview" class="rv"><h2>Overview</h2><p>${esc(p.overview)}</p></section>
          <section id="cs-problem" class="rv"><h2>The problem</h2><p>${esc(p.problem)}</p></section>
          <section id="cs-field" class="field rv" style="--k:${PAL[p.c][0]}">
            <p class="kick">About the field</p>
            <h3>${esc(p.field.title)}</h3>
            <p>${esc(p.field.text)}</p>
          </section>
          <section id="cs-built" class="rv"><h2>What I built</h2>
            <ul class="built">${p.built.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
          </section>
          <section id="cs-flow" class="rv"><h2>How it works</h2>
            <ol class="flow" style="--k:${PAL[p.c][0]}">${p.flow.map(([t, d], j) =>
              `<li style="--i:${j}"><span class="n">${String(j + 1).padStart(2, "0")}</span><b>${esc(t)}</b><span>${esc(d)}</span></li>`).join("")}</ol>
          </section>
          <section id="cs-stack" class="rv"><h2>Stack</h2>
            <p class="hint">Tap a skill to see where else I&rsquo;ve used it.</p>
            <div class="chips-row">${p.stack.map((id) => chip(id, "work/" + p.slug)).join("")}</div>
          </section>
        </div>
      </div>

      <nav class="pn" aria-label="More projects">
        <a class="pn-card rv" href="#/work/${prev.slug}"><span class="kick">&larr; Previous</span>${kc(prev, "sm")}<b>${esc(prev.name)}</b></a>
        <a class="pn-card next rv" style="--i:1" href="#/work/${next.slug}"><span class="kick">Next &rarr;</span>${kc(next, "sm")}<b>${esc(next.name)}</b></a>
      </nav>` + cta() + foot();
  }

  /* ---------- EXPERIENCE ---------- */
  function renderExperience() {
    const job = (e, i) => `
      <article class="tl-item rv" id="x-${e.id}" style="--i:${i % 2}">
        <div class="tl-when">${esc(e.when)}</div>
        <div class="tl-dot">${kc(e, "md")}</div>
        <div class="tl-card">
          <h3>${esc(e.role)}</h3>
          <p class="tl-org">${e.href ? `<a href="${e.href}"${ext(e.href)}>${esc(e.org)} &#8599;</a>` : esc(e.org)}</p>
          <ul class="built">${e.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
          <div class="field mini-field" style="--k:${PAL[e.c][0]}"><p class="kick">About the field</p><p>${esc(e.field)}</p></div>
          <div class="chips-row">${e.skills.map((id) => chip(id)).join("")}</div>
        </div>
      </article>`;
    const edu = (e, i) => `
      <article class="tl-item rv" id="x-${e.id}" style="--i:${i % 2}">
        <div class="tl-when">${esc(e.when)}</div>
        <div class="tl-dot">${kc(e, "md")}</div>
        <div class="tl-card slim">
          <h3>${esc(e.role)}</h3>
          <p class="tl-org">${esc(e.org)}</p>
        </div>
      </article>`;
    return head("EXPERIENCE &middot; EDUCATION", "Where I&rsquo;ve <em>worked</em> and learned",
      "Industry work building LLM solutions, structured ML training, and a degree focused on artificial intelligence and machine learning.") +
      `<div class="tl">${S.EXPERIENCE.map(job).join("")}</div>
       <h2 class="sub-h rv">Education</h2>
       <div class="tl">${S.EDUCATION.map(edu).join("")}</div>` + cta() + foot();
  }

  /* ---------- SKILLS ---------- */
  function groupKeys(g) {
    return g.ids ? g.ids.map((id) => KEY[id]).filter(Boolean) : S.OTHER.filter((k) => k.k === g.id);
  }
  const groupOf = {};
  S.SKILL_GROUPS.forEach((g, gi) => groupKeys(g).forEach((k) => (groupOf[k.id] = gi)));

  function renderSkills() {
    const total = Object.keys(groupOf).length;
    const pills = S.SKILL_GROUPS.map((g, gi) => `<button type="button" data-to="g-${gi}">${esc(g.title)}</button>`).join("");
    const groups = S.SKILL_GROUPS.map((g, gi) => `
      <section class="sk-group rv" id="g-${gi}">
        <div class="sk-intro">
          ${kc({ c: g.c, label: String(groupKeys(g).length) }, "md")}
          <div><h2>${esc(g.title)}</h2><p>${esc(g.intro)}</p></div>
        </div>
        <div class="sk-grid">${groupKeys(g).map((k) =>
          `<button type="button" class="sk" data-id="${k.id}" aria-expanded="false" aria-controls="skd-${gi}">${kc(k, "sm")}<span>${esc(k.t)}</span></button>`).join("")}
        </div>
        <div class="sk-detail" id="skd-${gi}" aria-live="polite"></div>
      </section>`).join("");
    return head("T &middot; TOOLKIT", "What I <em>use</em>",
      `${total} skills and tools, grouped by field. Each group starts with a short intro to the field; pick a key to see what I&rsquo;ve done with it.`) +
      `<div class="jump rv" style="--i:3">${pills}</div>${groups}` + cta() + foot();
  }

  function usedIn(id) {
    const out = [];
    S.PROJECTS.forEach((p) => p.stack.includes(id) && out.push(`<a href="#/work/${p.slug}">${kc(p, "xs")}${esc(p.name)}</a>`));
    S.EXPERIENCE.forEach((e) => e.skills.includes(id) && out.push(`<a href="#/experience/${e.id}">${kc(e, "xs")}${esc(e.org)}</a>`));
    return out;
  }

  function selectSkill(id, scroll) {
    const gi = groupOf[id];
    if (gi === undefined) return;
    const k = KEY[id];
    inner.querySelectorAll(".sk").forEach((b) => {
      const on = b.dataset.id === id;
      b.classList.toggle("on", on);
      b.setAttribute("aria-expanded", on ? "true" : "false");
    });
    inner.querySelectorAll(".sk-detail").forEach((d) => { if (d.id !== "skd-" + gi) { d.classList.remove("open"); d.innerHTML = ""; } });
    const d = $("skd-" + gi);
    const uses = usedIn(id);
    const links = (k.links || []).map((l) => `<a href="${l.h}"${ext(l.h)}${l.dl ? ' download="Rajat_Resume.pdf"' : ""}>${esc(l.l)} &#8599;</a>`).join("");
    d.innerHTML = `
      <div class="skd">
        ${kc(k, "lg")}
        <div class="skd-body">
          <p class="kick">${esc(k.k)}</p>
          <h3>${esc(k.t)}</h3>
          <p>${esc(k.x)}</p>
          ${uses.length ? `<p class="kick used">Used in</p><div class="used-row">${uses.join("")}</div>` : ""}
          ${links ? `<div class="used-row">${links}</div>` : ""}
        </div>
        <button type="button" class="skd-x" aria-label="Close">&times;</button>
      </div>`;
    requestAnimationFrame(() => d.classList.add("open"));
    if (scroll) scrollToEl(inner.querySelector(`.sk[data-id="${id}"]`), 120);
  }
  function clearSkill() {
    inner.querySelectorAll(".sk").forEach((b) => { b.classList.remove("on"); b.setAttribute("aria-expanded", "false"); });
    inner.querySelectorAll(".sk-detail").forEach((d) => { d.classList.remove("open"); d.innerHTML = ""; });
  }

  /* ---------- ABOUT ---------- */
  function renderAbout() {
    const facts = [
      ["pin", "white", "Based in", "Delhi, India"],
      ["cap", "lime", "Studying", "B.Tech, AI & ML · GGSIPU"],
      ["brief", "orange", "Most recently", "AI Solutions Engineer Intern, Fokel"],
      ["bolt", "yellow", "Focus", "ML · NLP · Generative AI · Full stack"],
    ];
    const focus = [
      ["agents", "Agentic AI & RAG", "Multi-agent systems that plan, retrieve and report, grounded in real sources.", "work/researchgpt"],
      ["ml", "Machine learning", "Models benchmarked honestly and explained, from XGBoost to transfer learning.", "work/galaxy-morphology"],
      ["stack", "Full-stack products", "The APIs, auth, data and interface that turn a model into something people use.", "work/uniwell"],
    ];
    return head("O &middot; ORIGIN", "Hi, I&rsquo;m <em>Rajat.</em>",
      "An AI/ML engineer and full-stack developer specialising in machine learning, NLP, generative AI and intelligent applications. I build end-to-end AI solutions, from LLM-powered agents and retrieval systems to predictive models and the scalable web apps around them.") + `
      <div class="facts">${facts.map(([ic, c, a, b], i) =>
        `<div class="fact rv" style="--i:${i}">${kc({ c, icon: ic }, "sm")}<div><p class="kick">${a}</p><p>${esc(b)}</p></div></div>`).join("")}</div>

      <section class="prose rv">
        <h2>What drives me</h2>
        <p>I&rsquo;m most interested in applying AI-driven automation to real-world problems, and in turning complex data into insights people can act on. I like systems that show their work: reports with citations, models with explanations, agents whose claims get verified.</p>
      </section>

      <div class="focus">${focus.map(([id, t, d, r], i) =>
        `<a class="focus-card rv" style="--i:${i}" href="#/${r}">${kc(KEY[id], "md")}<h3>${t}</h3><p>${d}</p><span class="pcard-go">See an example <span aria-hidden="true">&rarr;</span></span></a>`).join("")}</div>

      <section class="process" id="about-process">
        <p class="eyebrow rv"><i class="dot" aria-hidden="true"></i>I &middot; IDEAS</p>
        <h2 class="rv">How I <em>build</em></h2>
        <ol class="steps">${S.PROCESS.map(([n, t, d], i) =>
          `<li class="rv" style="--i:${i}"><span class="n">${n}</span><h3>${t}</h3><p>${d}</p></li>`).join("")}</ol>
      </section>

      <div class="about-actions rv">
        <a class="keycap black" href="Rajat_Resume.pdf" download="Rajat_Resume.pdf">Download r&eacute;sum&eacute;&nbsp;&darr;</a>
        <a class="keycap white" href="#/experience">See my experience</a>
      </div>` + cta() + foot();
  }

  /* ---------- CONTACT ---------- */
  const TOPICS = ["Job opportunity", "Collaboration", "Freelance project", "Just saying hi"];
  function renderContact() {
    const channels = [
      ["mail", "lime", "Email", S.EMAIL, null, true],
      ["link", "sky", "LinkedIn", "linkedin.com/in/rajatttanwarr", S.LINKEDIN],
      ["folder", "black", "GitHub", "github.com/RaajatTanwar", S.GITHUB],
      ["file", "glass", "Résumé", "Download PDF", "Rajat_Resume.pdf"],
      ["pin", "white", "Location", "Delhi, India", null],
    ];
    const ch = channels.map(([ic, c, t, v, h, copy], i) => {
      const body = `${kc({ c, icon: ic }, "sm")}<span><span class="kick">${t}</span><b>${esc(v)}</b></span>`;
      if (copy) return `<button type="button" class="channel rv" style="--i:${i}" data-copy="${esc(v)}">${body}<span class="ch-act">${svg("copy")}<span>Copy</span></span></button>`;
      if (h) return `<a class="channel rv" style="--i:${i}" href="${h}"${ext(h)}${h.endsWith(".pdf") ? ' download="Rajat_Resume.pdf"' : ""}>${body}<span class="ch-act">&#8599;</span></a>`;
      return `<div class="channel rv" style="--i:${i}">${body}</div>`;
    }).join("");

    const d = draft.get();
    return `
      <div class="contact">
        <div class="contact-side">
          ${head("@ &middot; CONTACT", "Let&rsquo;s <em>talk.</em>",
            "Tell me about a role, a project or an idea. This form sends straight to my inbox, no email app needed.")}
          <div class="channels">${ch}</div>
        </div>

        <div class="form-card rv" style="--i:2">
          <form id="cform" novalidate>
            <fieldset class="topics">
              <legend>What&rsquo;s it about?</legend>
              ${TOPICS.map((t, i) => `<label class="topic"><input type="radio" name="topic" value="${t}"${(d.topic ? d.topic === t : i === 0) ? " checked" : ""}><span>${t}</span></label>`).join("")}
            </fieldset>
            <div class="row2">
              <label class="fld"><span>Your name</span>
                <input name="name" autocomplete="name" maxlength="100" required placeholder="Ada Lovelace" value="${esc(d.name || "")}" aria-describedby="err-name">
                <em class="err" id="err-name"></em></label>
              <label class="fld"><span>Your email</span>
                <input name="email" type="email" autocomplete="email" maxlength="160" required placeholder="you@company.com" value="${esc(d.email || "")}" aria-describedby="err-email">
                <em class="err" id="err-email"></em></label>
            </div>
            <label class="fld"><span>Message</span>
              <textarea name="message" rows="6" maxlength="4000" required placeholder="Hi Rajat, I&rsquo;d love to chat about&hellip;" aria-describedby="err-message">${esc(d.message || "")}</textarea>
              <span class="count" id="count">0 / 4000</span>
              <em class="err" id="err-message"></em></label>
            <label class="hp" aria-hidden="true">Leave this empty<input type="text" name="company_site" tabindex="-1" autocomplete="off"></label>
            <div class="form-foot">
              <button class="keycap black send" type="submit"><span class="lbl">Send message</span><span class="spin" aria-hidden="true"></span><span class="legend" aria-hidden="true">&#9166;</span></button>
              <p class="fine">or press <kbd>Ctrl</kbd> + <kbd>Enter</kbd></p>
            </div>
            <p class="form-status" id="fstatus" role="status"></p>
          </form>
          <div class="sent" id="sent" hidden>
            ${kc({ c: "lime", icon: "check" }, "lg")}
            <h2 tabindex="-1">Message sent.</h2>
            <p>Thanks for reaching out. I&rsquo;ll get back to you at <b id="sentTo"></b>.</p>
            <div class="sent-actions">
              <button type="button" class="keycap white" id="again2">Send another</button>
              <a class="keycap black" href="#/">Back to the ball</a>
            </div>
          </div>
        </div>
      </div>` + foot();
  }

  // keep a half-written message if the visitor wanders off and comes back
  const draft = {
    get() { try { return JSON.parse(sessionStorage.getItem("contact-draft")) || {}; } catch (_) { return {}; } },
    set(v) { try { sessionStorage.setItem("contact-draft", JSON.stringify(v)); } catch (_) { /* private mode */ } },
    clear() { try { sessionStorage.removeItem("contact-draft"); } catch (_) { /* private mode */ } },
  };

  function wireContact() {
    const form = $("cform");
    if (!form) return;
    const f = form.elements, count = $("count"), status = $("fstatus"), btn = form.querySelector(".send");
    const values = () => ({ topic: f.topic.value, name: f.name.value.trim(), email: f.email.value.trim(), message: f.message.value.trim() });
    const upd = () => { count.textContent = `${f.message.value.length} / 4000`; draft.set(values()); };
    upd();
    form.addEventListener("input", (e) => { upd(); if (e.target.name) setErr(e.target.name, ""); });

    function setErr(name, msg) {
      const el = $("err-" + name);
      if (!el) return;
      el.textContent = msg;
      f[name].classList.toggle("bad", !!msg);
      f[name].setAttribute("aria-invalid", msg ? "true" : "false");
    }
    function validate(v) {
      const errs = {};
      if (v.name.length < 2) errs.name = "Please tell me your name.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email)) errs.email = "That email doesn’t look right.";
      if (v.message.length < 10) errs.message = "A little more detail, please (10+ characters).";
      ["name", "email", "message"].forEach((n) => setErr(n, errs[n] || ""));
      const first = Object.keys(errs)[0];
      if (first) f[first].focus();
      return !first;
    }

    f.message.addEventListener("keydown", (e) => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) form.requestSubmit(); });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (btn.disabled) return;
      const v = values();
      status.textContent = ""; status.className = "form-status";
      if (!validate(v)) return;
      if (f.company_site.value) { done(v); return; } // bot filled the honeypot: pretend it worked

      btn.disabled = true; btn.classList.add("busy");
      btn.querySelector(".lbl").textContent = "Sending…";
      try {
        await send(v);
        done(v);
      } catch (err) {
        status.className = "form-status error";
        status.innerHTML = `${esc(err.message || "Something went wrong.")} You can also email me at <a href="mailto:${S.EMAIL}">${S.EMAIL}</a>.`;
      } finally {
        btn.disabled = false; btn.classList.remove("busy");
        btn.querySelector(".lbl").textContent = "Send message";
      }
    });

    function done(v) {
      draft.clear();
      form.hidden = true;
      $("sentTo").textContent = v.email;
      const sent = $("sent");
      sent.hidden = false;
      requestAnimationFrame(() => sent.classList.add("in"));
      sent.querySelector("h2").focus({ preventScroll: true });
    }
    $("again2").addEventListener("click", () => {
      form.reset(); f.topic[0].checked = true; upd();
      $("sent").hidden = true; $("sent").classList.remove("in");
      form.hidden = false; f.name.focus();
    });
  }

  async function send(v) {
    const subject = `Portfolio: ${v.topic} from ${v.name}`;
    if (!S.WEB3FORMS_KEY) throw new Error("The contact form isn’t switched on yet.");
    const url = "https://api.web3forms.com/submit";
    const body = { access_key: S.WEB3FORMS_KEY, subject, from_name: "Portfolio contact form", replyto: v.email, ...v };
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), 15000);
    let res, json = {};
    try {
      // FormData + Accept are CORS-safelisted, so the browser skips the preflight request
      const fd = new FormData();
      Object.entries(body).forEach(([k, v]) => fd.append(k, v));
      res = await fetch(url, { method: "POST", headers: { Accept: "application/json" }, body: fd, signal: ctl.signal });
      json = await res.json().catch(() => ({}));
    } catch (err) {
      throw new Error(err.name === "AbortError" ? "The request timed out." : "Couldn’t reach the mail service. Check your connection.");
    } finally { clearTimeout(timer); }
    if (!res.ok || !(json.success === true || json.success === "true")) {
      throw new Error(json.message ? `The mail service said: “${json.message}”` : "The message didn’t go through.");
    }
  }

  /* ---------- 404 ---------- */
  function renderMissing() {
    return head("404", "That key <em>isn&rsquo;t</em> on the ball.", "The page you were looking for doesn&rsquo;t exist.") +
      `<div class="about-actions rv"><a class="keycap black" href="#/">Back to the ball</a><a class="keycap white" href="#/work">See my work</a></div>` + foot();
  }

  /* =====================================================================
     ROUTER
     ===================================================================== */
  const TITLES = { work: "Work", experience: "Experience", skills: "Skills", about: "About", contact: "Contact" };
  let current = null, isOpen = false, token = 0, closeTimer = 0;

  function parse() {
    const h = location.hash.replace(/^#\/?/, "");
    if (!h || h === "top") return null;
    const [sec, sub] = h.split("/");
    return { sec, sub: sub ? decodeURIComponent(sub) : "" };
  }
  function render(r) {
    switch (r.sec) {
      case "work": return r.sub ? renderProject(r.sub) : renderWork();
      case "experience": return renderExperience();
      case "skills": return renderSkills();
      case "about": return renderAbout();
      case "contact": return renderContact();
      default: return renderMissing();
    }
  }
  const pageKey = (r) => (r.sec === "work" ? "work/" + r.sub : r.sec);

  function route() {
    const r = parse();
    document.querySelectorAll(".nav [data-sec]").forEach((a) =>
      a.setAttribute("aria-current", r && a.dataset.sec === r.sec ? "page" : "false"));
    if (!r) { close(); return; }

    const proj = r.sec === "work" && r.sub && S.PROJECTS.find((p) => p.slug === r.sub);
    document.title = `${proj ? proj.name : TITLES[r.sec] || "Not found"} · Rajat`;

    const key = pageKey(r);
    if (isOpen && key === current) { after(r, false); return; }
    const my = ++token;
    if (!isOpen) {
      inner.innerHTML = render(r); current = key;
      open(); page.scrollTop = 0; after(r, true);
    } else {
      inner.classList.add("out");
      setTimeout(() => {
        if (my !== token) return;
        inner.innerHTML = render(r); current = key;
        page.scrollTop = 0;
        inner.classList.remove("out");
        after(r, true);
      }, reduce() ? 0 : 200);
    }
  }

  function open() {
    clearTimeout(closeTimer);
    isOpen = true;
    root.classList.add("on-page");
    page.setAttribute("aria-hidden", "false");
    hero.inert = true;
  }
  function close() {
    if (!isOpen) return;
    isOpen = false; current = null; token++;
    document.title = HOME_TITLE;
    root.classList.remove("on-page");
    page.setAttribute("aria-hidden", "true");
    hero.inert = false;
    closeTimer = setTimeout(() => { if (!isOpen) inner.innerHTML = ""; }, 600);
  }

  // after a page is drawn (fresh) or its sub-route changes
  function after(r, fresh) {
    if (fresh) {
      reveal();
      wire();
      const h1 = inner.querySelector(".ptitle");
      if (h1) h1.focus({ preventScroll: true });
    }
    const delay = fresh ? 260 : 0;
    if (r.sec === "skills") { if (r.sub) setTimeout(() => selectSkill(r.sub, true), delay); else if (!fresh) clearSkill(); }
    if (r.sec === "experience" && r.sub) setTimeout(() => flash($("x-" + r.sub)), delay);
    if (r.sec === "about" && r.sub === "process") setTimeout(() => scrollToEl($("about-process")), delay);
  }

  function flash(el) {
    if (!el) return;
    scrollToEl(el, 30);
    el.classList.remove("flash"); void el.offsetWidth; el.classList.add("flash");
  }
  function scrollToEl(el, offset = 24) {
    if (!el) return;
    const top = el.getBoundingClientRect().top - page.getBoundingClientRect().top + page.scrollTop - offset;
    page.scrollTo({ top, behavior: reduce() ? "auto" : "smooth" });
  }

  /* ---------- page interactions ---------- */
  function wire() {
    // in-page jumps (table of contents, skill-group pills)
    inner.querySelectorAll("[data-to]").forEach((b) => b.addEventListener("click", () => scrollToEl($(b.dataset.to))));

    // highlight the current section in the case-study TOC
    const toc = inner.querySelector(".toc");
    if (toc) {
      const btns = [...toc.querySelectorAll("button")];
      const io = new IntersectionObserver((ents) => {
        ents.forEach((en) => { if (en.isIntersecting) btns.forEach((b) => b.classList.toggle("on", b.dataset.to === en.target.id)); });
      }, { root: page, rootMargin: "-30% 0px -60% 0px" });
      btns.forEach((b) => { const s = $(b.dataset.to); if (s) io.observe(s); });
    }

    // skills: open a key's detail without stacking history entries
    inner.querySelectorAll(".sk").forEach((b) => b.addEventListener("click", () => {
      const id = b.dataset.id;
      if (b.classList.contains("on")) { clearSkill(); history.replaceState(null, "", "#/skills"); return; }
      history.replaceState(null, "", "#/skills/" + id);
      selectSkill(id, false);
    }));

    // copy email
    inner.querySelectorAll("[data-copy]").forEach((b) => b.addEventListener("click", async () => {
      try { await navigator.clipboard.writeText(b.dataset.copy); toast("Email copied to clipboard"); }
      catch (_) { toast(b.dataset.copy); }
    }));

    wireContact();
  }

  // staggered fade-up as sections scroll into view
  let revealIO = null;
  function reveal() {
    if (revealIO) revealIO.disconnect();
    const els = inner.querySelectorAll(".rv");
    if (reduce() || !("IntersectionObserver" in window)) { els.forEach((el) => el.classList.add("in")); return; }
    revealIO = new IntersectionObserver((ents) => {
      ents.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target;
        el.classList.add("in"); revealIO.unobserve(el);
        el.addEventListener("transitionend", function done(e) {
          if (e.target === el && e.propertyName === "transform") { el.classList.remove("rv", "in"); el.removeEventListener("transitionend", done); }
        });
      });
    }, { root: page, threshold: 0.08, rootMargin: "0px 0px -6% 0px" });
    els.forEach((el) => revealIO.observe(el));
  }

  let toastTimer = 0;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2200);
  }

  /* ---------- light / dark theme ---------- */
  const themeBtn = $("themeToggle");
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const sysDark = matchMedia("(prefers-color-scheme: dark)");
  const savedTheme = () => { try { return localStorage.getItem("theme"); } catch (_) { return null; } };

  function setTheme(t) {
    root.dataset.theme = t;
    themeBtn.setAttribute("aria-label", t === "dark" ? "Switch to light theme" : "Switch to dark theme");
    themeBtn.setAttribute("aria-pressed", t === "dark" ? "true" : "false");
    themeMeta.setAttribute("content", t === "dark" ? "#12131a" : "#ffffff");
  }
  setTheme(root.dataset.theme === "dark" ? "dark" : "light");

  themeBtn.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    try { localStorage.setItem("theme", next); } catch (_) { /* private mode */ }
    if (!document.startViewTransition || reduce()) { setTheme(next); return; }
    // grow the new theme out of the button in a circle
    const r = themeBtn.getBoundingClientRect();
    const x = r.left + r.width / 2, y = r.top + r.height / 2;
    root.style.setProperty("--tx", x + "px");
    root.style.setProperty("--ty", y + "px");
    root.style.setProperty("--tr", Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y)) + "px");
    document.startViewTransition(() => setTheme(next));
  });
  // follow the system setting until the visitor picks one
  sysDark.addEventListener("change", (e) => { if (!savedTheme()) setTheme(e.matches ? "dark" : "light"); });

  /* ---------- global ---------- */
  // pages sit below the nav, so track its height
  new ResizeObserver(() => root.style.setProperty("--navh", header.offsetHeight + "px")).observe(header);
  root.style.setProperty("--navh", header.offsetHeight + "px");

  // Esc goes up one level: case study → all work → home
  window.addEventListener("keydown", (e) => {
    if (e.key !== "Escape" || !isOpen) return;
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)) { document.activeElement.blur(); return; }
    const r = parse();
    location.hash = r && r.sec === "work" && r.sub ? "#/work" : "#/";
  });

  inner.addEventListener("click", (e) => {
    if (e.target.closest(".skd-x")) { clearSkill(); history.replaceState(null, "", "#/skills"); }
  });

  window.addEventListener("hashchange", route);
  route();
})();
