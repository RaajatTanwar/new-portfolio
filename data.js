/* SITE DATA — shared by the key ball (script.js) and the pages (pages.js).
   Edit copy here; both the ball and the pages update. */
(() => {
  "use strict";

  const EMAIL = "rajatrajput8119@gmail.com";
  const LINKEDIN = "https://www.linkedin.com/in/rajatttanwarr/";
  const GITHUB = "https://github.com/RaajatTanwar";

  /* ---------- contact form delivery ----------
     Get a free access key at https://web3forms.com (enter your email; the key
     arrives in your inbox) and paste it below. Messages then land in that inbox.
     The key is safe to publish: it can only send mail to you. */
  const WEB3FORMS_KEY = "af966c1e-6af7-4d76-9be2-ab7415d9d719";

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
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/>',
    pin: '<path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M12 18v-6M9 15l3 3 3-3"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
    check: '<path d="M20 6L9 17l-5-5"/>',
    copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    cap: '<path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/>',
    brief: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>',
  };
  const svg = (name) =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;

  /* ---------- the nine letters of PORTFOLIO (kicker / title / text / page) ---------- */
  const LETTERS = [
    { id: "p", ch: "P", c: "pink", k: "P · Projects", t: "Selected work", go: "work",
      x: "ResearchGPT, UniWell, Galaxy Morphology Classification and Receipts-AI." },
    { id: "o1", ch: "O", c: "orange", k: "O · Origin", t: "Hi, I’m Rajat", go: "about",
      x: "An AI/ML engineer and full-stack developer turning complex problems into intelligent applications." },
    { id: "r", ch: "R", c: "yellow", k: "R · Results", t: "81.84% accuracy", go: "work/galaxy-morphology",
      x: "Best test accuracy in my galaxy-classification benchmark, from XGBoost. Macro F1 is lower (58.87%) because Irregular galaxies are hard to catch." },
    { id: "t", ch: "T", c: "mint", k: "T · Toolkit", t: "What I use", go: "skills",
      x: "Python, FastAPI, Next.js, LangGraph, Supabase and ChromaDB." },
    { id: "f", ch: "F", c: "sky", k: "F · Featured", t: "ResearchGPT", go: "work/researchgpt",
      x: "A multi-agent research assistant: LangGraph agents, Gemini 2.5 Pro and a RAG pipeline that writes citation-backed reports.",
      links: [{ l: "Live demo", h: "https://research-gpt-sage.vercel.app/" }] },
    { id: "o2", ch: "O", c: "lilac", k: "O · Open", t: "Open to talk", go: "contact",
      x: "Roles, collaborations or just a good AI problem. My inbox is open." },
    { id: "l", ch: "L", c: "pink", k: "L · Lab", t: "Receipts-AI", go: "work/receipts-ai",
      x: "A local-first platform that checks whether an AI coding agent really finished the job, against actual test runs and repo state.",
      links: [{ l: "GitHub", h: GITHUB + "/receipts-ai" }] },
    { id: "i", ch: "I", c: "white", k: "I · Ideas", t: "How I think", go: "about/process",
      x: "Start from the business problem, prototype the workflow, then test the edge cases." },
    { id: "o3", ch: "O", c: "orange", k: "O · Outreach", t: "Say hello", go: "contact",
      x: "Send me a message right from this site." },
  ];
  const CHECK = {
    id: "check", ch: "✓", c: "lime", k: "Status", t: "Open to conversations", go: "contact",
    x: "Happy to talk about AI/ML roles and collaborations. Drop me a message.",
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
    K("chroma", "Chroma", "pink", "Data & tools", "ChromaDB", "The vector database behind ResearchGPT’s semantic search."),
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
    K("receipts", "Receipts", "red", "Project", "Receipts-AI", "A local-first verification platform that checks AI coding agents’ completion claims against real test runs and Git state.", { links: [{ l: "GitHub", h: GITHUB + "/receipts-ai" }] }),
    K("uniwell", "UniWell", "mint", "Project", "UniWell", "A campus health platform with role-based portals for students, medical staff and administrators.", { links: [{ l: "Live demo", h: "https://uniwell-ind.vercel.app/" }] }),
    K("care", null, "lime", "Project", "UniWell features", "AI healthcare assistance, appointment scheduling and digital medical records workflows.", { icon: "heart" }),
    K("gemini", "Gemini", "white", "Project", "Gemini 2.5 Pro", "The model behind ResearchGPT’s analysis and report writing."),
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
    K("cites", "Cites", "yellow", "Project", "Citations", "ResearchGPT’s reports are citation-backed."),
    K("embed", "Embed", "black", "Project", "Embeddings", "Document embeddings feed ResearchGPT’s retrieval."),
    K("viz", "Viz", "mint", "Project", "Data visualization", "Interactive analytics inside ResearchGPT."),
    K("tamper", "Tamper", "red", "Project", "Tamper detection", "Receipts-AI flags skipped tests, weakened assertions and deleted test cases."),
    K("tests", "Tests", "mint", "Project", "Test verification", "Receipts-AI runs the tests itself rather than trusting an agent’s claim."),
    K("hooks", "Hooks", "white", "Project", "Failproof hooks", "Policy hooks that connect Receipts-AI to Claude Code."),
    K("claude", "Claude", "orange", "Project", "Claude Code", "Receipts-AI verifies the completion claims of Claude Code agents."),
    K("cli", "CLI", "lilac", "Project", "CLI tooling", "Setup and control for Receipts-AI from the command line."),
    // process details
    K("json", "JSON", "sky", "Process", "Structured outputs", "Structured LLM outputs and tool calls for reliable integrations."),
    K("auto", "Auto", "lime", "Process", "Automation", "Finding where AI agents and automation can streamline operations."),
    K("edge", "Edge", "pink", "Process", "Edge cases", "Testing AI workflows for quality, reliability and edge cases."),
    K("bench", "Bench", "black", "Process", "Benchmarking", "Comparing classical ML with transfer learning, and reporting it honestly."),
    // path
    K("fokel", "Fokel", "orange", "Experience", "Fokel", "AI Solutions Engineer Intern, June – September 2026.", { links: [{ l: "fokelworks.com", h: "https://www.fokelworks.com/" }] }),
    K("ibm", "IBM", "sky", "Experience", "IBM SkillsBuild", "AI & Machine Learning Trainee, June – August 2025."),
    K("btech", "B.Tech", "lime", "Education", "B.Tech, AI & ML", "Guru Gobind Singh Indraprastha University, 2023 – present."),
    // contact
    K("delhi", "Delhi", "white", "Contact", "Delhi, India", "Where I’m based.", { go: "contact" }),
    K("in", "in", "sky", "Contact", "LinkedIn", "linkedin.com/in/rajatttanwarr", { links: [{ l: "Open LinkedIn", h: LINKEDIN }] }),
    K("cv", "CV", "glass", "Contact", "Résumé", "My CV as a PDF.", { links: [{ l: "Download PDF", h: "Rajat_Resume.pdf", dl: true }] }),
    K("ai", "AI", "black", "About", "AI/ML Engineer & Full Stack Developer", "Machine learning, NLP and generative AI, plus the full-stack skills to ship them. B.Tech in AI & ML at GGSIPU, 2023 – present.", { go: "about" }),
    K("at", "@", "lime", "Contact", "Say hello", "Send me a message right from this site.", { go: "contact" }),
  ];

  /* =====================================================================
     PAGES
     ===================================================================== */

  /* ---------- projects (case studies) ---------- */
  const PROJECTS = [
    {
      slug: "researchgpt", key: "rgpt", label: "RGPT", c: "pink",
      name: "ResearchGPT", kicker: "Agentic AI · RAG · SaaS",
      tagline: "A multi-agent AI research assistant that plans, retrieves, analyses and writes citation-backed reports.",
      meta: [["Type", "AI SaaS application"], ["Core", "LangGraph + Gemini 2.5 Pro"], ["Status", "Live"]],
      links: [{ l: "Live demo", h: "https://research-gpt-sage.vercel.app/" }],
      metrics: [["5", "agent roles working together"], ["RAG", "source-grounded answers"], ["Cited", "reports backed by their sources"]],
      overview: "ResearchGPT turns a research question into a structured, cited report. Instead of a single prompt to a single model, a team of specialised agents splits the work: one plans, one gathers sources, one analyses, one writes and one builds charts. Every claim in the final report points back to where it came from.",
      problem: "Chatbots answer fast, but they often sound confident without showing their sources, and long research questions overflow a single prompt. Researchers need answers they can verify, broken into steps they can follow.",
      field: {
        title: "Multi-agent systems & retrieval-augmented generation",
        text: "Agentic AI splits a big task across several LLM-driven agents, each with a narrow job and its own tools, coordinated by a graph or planner. Retrieval-augmented generation (RAG) grounds those agents in real documents: text is converted to embeddings, stored in a vector database and fetched by meaning at question time, so the model writes from evidence instead of memory.",
      },
      built: [
        "Engineered a multi-agent system with LangGraph and Gemini 2.5 Pro, orchestrating agents for planning, information retrieval, analysis, report generation and data visualization.",
        "Designed a RAG knowledge pipeline with ChromaDB, document embeddings and semantic search for source-grounded responses.",
        "Shipped it as a scalable AI SaaS app on Next.js, Supabase and Clerk authentication, with research automation, citation-backed reports and interactive analytics.",
      ],
      flow: [["Plan", "Break the question into sub-tasks"], ["Retrieve", "Embed, search ChromaDB, collect sources"], ["Analyse", "Gemini 2.5 Pro reasons over evidence"], ["Write", "Draft the report with citations"], ["Visualise", "Charts and interactive analytics"]],
      stack: ["langgraph", "gemini", "rag", "chroma", "semantic", "nextjs", "supabase", "clerk", "agents", "python"],
    },
    {
      slug: "receipts-ai", key: "receipts", label: "Receipts", c: "red",
      name: "Receipts-AI", kicker: "AI agent verification · Dev tools",
      tagline: "A local-first platform that checks whether an AI coding agent really finished the job, against actual test runs and repo state.",
      meta: [["Type", "Developer tooling"], ["Core", "TypeScript monorepo"], ["Runs", "Locally, next to Claude Code"]],
      links: [{ l: "GitHub", h: GITHUB + "/receipts-ai" }],
      metrics: [["3", "kinds of test tampering detected"], ["5", "modules in one pnpm monorepo"], ["Local", "first: runs on your own machine"]],
      overview: "AI coding agents say “all tests pass” a lot. Receipts-AI asks for the receipt. It re-runs the tests itself, fingerprints the exact Git state they ran against, and compares the agent’s claim with what really happened. If tests were skipped, assertions were weakened or test cases quietly deleted, it flags them.",
      problem: "As coding agents take on bigger tasks, the riskiest failure isn’t a crash. It’s a confident “done” on work that isn’t done. Reviewing every diff by hand doesn’t scale, so the check has to be automatic and hard to game.",
      field: {
        title: "AI agent reliability & verification",
        text: "Autonomous coding agents such as Claude Code can edit files, run commands and report results. Verification is the emerging discipline of independently checking those reports: re-executing tests, tying results to a specific code state, and spotting shortcuts an agent might take to make a task look finished. It’s the “trust, but verify” layer that makes agents safe to use on real codebases.",
      },
      built: [
        "Built a local-first verification system for Claude Code that validates agents’ completion claims against real test execution and the current Git repository state.",
        "Implemented Git fingerprint-based test verification and automated detection of tampering: skipped tests, weakened assertions and deleted test cases.",
        "Structured it as a modular pnpm monorepo: an Express.js + TypeScript verification server, a Next.js dashboard, shared Zod schemas, CLI tooling and Failproof policy hooks.",
      ],
      flow: [["Claim", "Agent reports the task is complete"], ["Fingerprint", "Hash the exact Git state"], ["Re-run", "Execute the tests independently"], ["Diff", "Check for skipped or weakened tests"], ["Verdict", "Pass, or flag with evidence"]],
      stack: ["ts", "express", "nextjs", "zod", "pnpm", "git", "claude", "hooks", "cli", "tests"],
    },
    {
      slug: "uniwell", key: "uniwell", label: "UniWell", c: "mint",
      name: "UniWell", kicker: "Health tech · Full stack",
      tagline: "Campus Health Sanctuary: a healthcare platform with secure portals for students, medical staff and administrators.",
      meta: [["Type", "Full-stack web platform"], ["Core", "Supabase + RBAC"], ["Status", "Live preview"]],
      links: [{ l: "Live demo", h: "https://uniwell-ind.vercel.app/" }],
      metrics: [["3", "role-based portals"], ["SOS", "emergency broadcasting"], ["AI", "healthcare assistance"]],
      overview: "UniWell brings a university’s health services into one place. Students book appointments, get AI-assisted guidance and raise an emergency SOS; medical staff manage schedules and records; administrators oversee it all. Each role sees only what it should.",
      problem: "Campus health services often run on paper, phone calls and scattered spreadsheets. That slows down routine care and, worse, emergencies. Health data is also sensitive, so access has to be locked down by role from day one.",
      field: {
        title: "Digital health & secure access control",
        text: "Digital health platforms move clinical workflows such as booking, triage and records online. Because medical data is highly sensitive, they rely on role-based access control (RBAC): every user gets a role, and every row of data is only readable by roles that need it. AI assistants are increasingly used for first-line guidance, pointing people to the right care faster.",
      },
      built: [
        "Built a full-stack healthcare management platform with secure, role-based portals for students, medical staff and administrators.",
        "Implemented AI-powered healthcare assistance, emergency SOS broadcasting, appointment scheduling and digital medical-records workflows.",
        "Designed scalable authentication and a secure backend on Supabase with RBAC-based access control.",
      ],
      flow: [["Sign in", "Supabase auth assigns a role"], ["Portal", "Student, staff or admin view"], ["Act", "Book, consult the AI assistant, or SOS"], ["Records", "Digital records, scoped by role"]],
      stack: ["supabase", "postgres", "auth", "stack", "nextjs", "react", "tailwind", "realtime", "genai"],
    },
    {
      slug: "galaxy-morphology", key: "galaxy", label: "Galaxy", c: "sky",
      name: "Galaxy Morphology Classification", kicker: "Computer vision · Explainable AI",
      tagline: "Classifying galaxies as Elliptical, Spiral or Irregular, benchmarking classical ML against transfer learning, and showing what the model looks at.",
      meta: [["Type", "ML research pipeline"], ["Data", "Galaxy10 DECaLS"], ["Serving", "FastAPI + Streamlit"]],
      links: [{ l: "GitHub", h: GITHUB + "/Galaxy-Morphology-Classification" }],
      metrics: [["81.84%", "best test accuracy (XGBoost)"], ["58.87%", "macro F1, reported honestly"], ["6", "models benchmarked"]],
      overview: "An end-to-end pipeline that takes galaxy images from the Galaxy10 DECaLS survey and sorts them into three morphological classes. I benchmarked classical models against pretrained CNNs, added Grad-CAM so you can see which pixels drive each prediction, and wrapped it in a FastAPI backend with a Streamlit dashboard.",
      problem: "Sky surveys produce far more galaxy images than astronomers can label by eye. Automated classification helps, but only if it’s honest about where it fails. Irregular galaxies are rare and messy, so a high accuracy number alone can hide poor performance on them.",
      field: {
        title: "Computer vision for astronomy",
        text: "Galaxy morphology, a galaxy’s shape, tells astronomers about its history: smooth ellipticals are often old and merged, spirals are still forming stars, and irregulars are frequently disturbed by collisions. Computer vision models learn these shapes from labelled survey images. Transfer learning reuses networks pretrained on everyday photos, and explainability tools such as Grad-CAM highlight the regions a model relied on.",
      },
      built: [
        "Developed an end-to-end image classification pipeline on Galaxy10 DECaLS for Elliptical, Spiral and Irregular galaxies.",
        "Benchmarked SVM, Random Forest and XGBoost against ResNet18, EfficientNet-B0 and MobileNetV3-Small; XGBoost reached the best test accuracy at 81.84%.",
        "Added explainable AI with Grad-CAM and served predictions through a FastAPI backend and an interactive Streamlit dashboard.",
      ],
      flow: [["Data", "Galaxy10 DECaLS images, 3 classes"], ["Features", "Preprocess with OpenCV & NumPy"], ["Benchmark", "3 classical + 3 transfer models"], ["Explain", "Grad-CAM heatmaps"], ["Serve", "FastAPI API + Streamlit UI"]],
      stack: ["vision", "xgboost", "sklearn", "resnet", "effnet", "mobilenet", "gradcam", "opencv", "fastapi", "streamlit", "galaxy10", "bench"],
    },
  ];

  /* ---------- experience & education ---------- */
  const EXPERIENCE = [
    {
      id: "fokel", c: "orange", label: "Fokel", org: "Fokel", role: "AI Solutions Engineer Intern",
      when: "June 2026 – September 2026", href: "https://www.fokelworks.com/", hrefLabel: "fokelworks.com",
      points: [
        "Translated business requirements into technical workflows, identifying where AI agents and automation could streamline operations.",
        "Designed and prototyped LLM-powered solutions using prompt engineering, structured outputs and API/tool integrations that connect AI to business systems.",
        "Tested and refined AI workflows for response quality, reliability and edge cases, supporting iterative improvements in performance and usability.",
      ],
      field: "AI solutions engineering sits between a business and its models: understanding the real workflow, choosing where an LLM or agent adds value, and wiring it safely into existing tools.",
      skills: ["llm", "prompt", "json", "rest", "agents", "auto", "edge"],
    },
    {
      id: "ibm", c: "sky", label: "IBM", org: "IBM SkillsBuild Training Program", role: "AI & Machine Learning Trainee",
      when: "June 2025 – August 2025",
      points: [
        "Completed an intensive two-month industry training programme in AI, machine learning, data science and Python.",
        "Gained hands-on experience with Python, Pandas, NumPy, Scikit-learn, Matplotlib and Jupyter for data analysis and predictive modelling.",
        "Strengthened supervised learning, feature engineering and data visualization through practical assignments.",
      ],
      field: "Applied machine learning is the craft of turning raw data into reliable predictions: cleaning it, engineering features, picking a model and measuring it on data it has never seen.",
      skills: ["python", "pandas", "numpy", "sklearn", "plot", "ml"],
    },
  ];
  const EDUCATION = [
    { id: "btech", c: "lime", label: "B.Tech", org: "Guru Gobind Singh Indraprastha University", role: "Bachelor of Technology, AI & ML", when: "2023 – present" },
  ];

  /* ---------- skill groups (with a short intro to each field) ---------- */
  const SKILL_GROUPS = [
    { id: "Language", c: "sky", title: "Languages",
      intro: "The languages I think in. Python for data, models and APIs; TypeScript and JavaScript for the web; SQL for data that has to stay correct; C++ for fundamentals and speed." },
    { id: "AI / ML", c: "mint", title: "AI & machine learning",
      intro: "Machine learning finds patterns in data; deep learning and generative AI extend that to images and language. My work spans classical models on tabular data, computer vision, and LLM applications grounded with retrieval." },
    { id: "Framework", c: "lilac", title: "Frameworks & backend",
      intro: "Frameworks turn ideas into products. LangChain and LangGraph orchestrate LLM agents, FastAPI and Express serve models and data, and Next.js with Tailwind ships the interface." },
    { id: "Data & tools", c: "orange", title: "Databases & tools",
      intro: "Every AI system is a data system first. Relational databases hold the truth, vector databases make text searchable by meaning, and Git and Docker keep work reproducible." },
    { id: "Systems", c: "pink", title: "Systems & workflows",
      intro: "The architecture around the model: agents that plan and act, events and real-time updates, secure authentication, and the full-stack glue that holds a product together." },
    { id: "Toolbox", c: "yellow", title: "Models & libraries from my projects",
      ids: ["gemini", "claude", "resnet", "effnet", "mobilenet", "gradcam", "streamlit", "clerk", "zod", "pnpm"],
      intro: "Specific models and libraries I’ve put to work inside projects, from foundation models to pretrained vision networks and developer tooling." },
  ];

  /* ---------- how I build ---------- */
  const PROCESS = [
    ["01", "Start with the problem", "Translate business requirements into a technical workflow, and find where AI actually helps rather than where it just sounds good."],
    ["02", "Prototype fast", "Wire up LLMs, tools and APIs with prompt engineering and structured outputs, so integrations are reliable, not lucky."],
    ["03", "Test the edges", "Measure response quality, reliability and edge cases, benchmark honestly, and iterate until it holds up."],
  ];

  /* ---------- where each ball key leads ---------- */
  const SKILL_KICKERS = new Set(["Language", "AI / ML", "Framework", "Data & tools", "Systems"]);
  const TOOLBOX = new Set(SKILL_GROUPS.find((g) => g.id === "Toolbox").ids);
  const PROJECT_KEY = {
    rgpt: "researchgpt", cites: "researchgpt", embed: "researchgpt", viz: "researchgpt",
    receipts: "receipts-ai", tamper: "receipts-ai", tests: "receipts-ai", hooks: "receipts-ai", cli: "receipts-ai",
    uniwell: "uniwell", care: "uniwell", sos: "uniwell",
    galaxy: "galaxy-morphology", galaxy10: "galaxy-morphology",
  };
  const NO_PAGE = new Set(["github", "in", "cv"]); // these keep their direct links

  function routeOf(info) {
    if (info.go) return info.go;
    if (NO_PAGE.has(info.id)) return null;
    if (SKILL_KICKERS.has(info.k) || TOOLBOX.has(info.id)) return "skills/" + info.id;
    if (PROJECT_KEY[info.id]) return "work/" + PROJECT_KEY[info.id];
    if (info.k === "Process") return "about/process";
    if (info.k === "Experience" || info.k === "Education") return "experience/" + info.id;
    return null;
  }

  window.SITE = {
    EMAIL, LINKEDIN, GITHUB, WEB3FORMS_KEY, PAL, ICONS, svg,
    LETTERS, CHECK, OTHER, PROJECTS, EXPERIENCE, EDUCATION, SKILL_GROUPS, PROCESS, routeOf,
  };
})();
