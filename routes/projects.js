const express = require('express');
const router = express.Router();

// Project data
const projects = [
  {
    id: 'mybizna',
    title: 'Mybizna — Commerce Platform for Small Businesses in Kenya',
    description: 'Mybizna is a multi-tenant commerce platform I build and run as the only engineer, live at mybizna.com and on the App Store and Google Play. A seller signs up, gets a website on their own domain, takes orders and bookings, and is paid to M-Pesa or a bank through Paystack split settlement. One deployment serves every seller: an Express and Mongoose API, a Next.js 16 dashboard with host-routed storefronts, a Flutter seller app, and Zod schemas shared as one OpenAPI spec. In its first 65 days: 3,043 commits, 554 reviewed pull requests, about 10,000 automated tests, 43 numbered design documents and more than 130 logged deploys. Every figure here was counted in the repository on 23 November 2026.',
    challenges: 'The problem that shapes everything is that one process serves every shop, so a query that forgets the shop does not return slightly wrong data: it returns another business\'s data. Convention had already failed at this once, on the restaurant platform, where a review found 37 unguarded endpoints. So the boundary is held in three places. One middleware resolves the shop from the signed-in user\'s memberships and nothing else reads the header; an ESLint rule fails any other read. The verified shop enters an AsyncLocalStorage context. A Mongoose plugin registered before any model hooks every query, aggregate, save and bulk write, and refuses a filter whose tenant names another shop; the only way past is a crossTenant call that must carry a reason string, so every exception is one grep away. The second problem was money. Ledger rows are never edited; a scheduler polls Paystack settlements and matches them to sales, payouts are verified against the processor\'s own records, and a failed settlement is a named state rather than a silent skip. The open items are written down too: a sale on a failed settlement still stalls the matcher, found on 20 November and not yet fixed.',
    image: '/assets/img/projects/mybizna.jpg',
    technologies: [
      { name: 'TypeScript', icon: 'fas fa-code' },
      { name: 'Express · Mongoose', icon: 'fab fa-node-js' },
      { name: 'Next.js 16', icon: 'fab fa-react' },
      { name: 'Flutter', icon: 'fas fa-mobile-alt' },
      { name: 'MongoDB', icon: 'fas fa-database' },
      { name: 'Paystack · M-Pesa', icon: 'fas fa-money-bill-wave' },
      { name: 'Cloudflare for SaaS', icon: 'fas fa-cloud' },
      { name: 'Railway', icon: 'fas fa-train' },
      { name: 'Valhalla routing', icon: 'fas fa-route' },
      { name: 'Claude · OpenAI', icon: 'fas fa-brain' }
    ],
    date: 'Sept 2026 – present',
    category: 'Commerce · Payments · Multi-tenant',
    liveUrl: 'https://mybizna.com',
    technicalAchievements: [
      'Tenancy enforced by the runtime, not remembered by the author: a verified tenant context, a global Mongoose guard that refuses a filter naming another shop and refuses unscoped queries in staging, and a static ratchet in CI (193 sites across 37 models on 25 September, falling since)',
      'Eleven architecture ratchets in CI, each with a baseline file that can only fall: tenancy, layering, structured logging, silent failures, native writes, secrets, typed environment, generated feature flags, country seam, one-off design values and helper copy length',
      'Money that is append-only, then reconciled: Paystack split settlement to M-Pesa or bank, settlements polled and matched to sales, payouts verified against the processor, the money model written as a document before it was code',
      'Observability before the second seller: one pino logger with ECS fields shared by API and web, a request id carried through every log line and returned in every response, liveness and readiness checks, graceful shutdown, Prometheus metrics behind a token',
      'A security review of 135 findings, each with a status line a later reader can verify a fix against, and a launch review recording the delta after 293 further commits',
      'Sellers\' own domains through Cloudflare for SaaS with one Worker, because Railway caps custom domains at 20 per service and would have made every seller edit DNS on any move',
      'Delivery priced by road distance from a private Valhalla router built from Kenya\'s OpenStreetMap roads, answering in under 1.5 seconds for a flat monthly cost; pins never reach a log',
      'One door for every model call: Cloudflare AI Gateway, Claude Haiku first with the feature\'s OpenAI model as fallback, a budget per prompt, and a help assistant that answers only from written articles and prepares changes the seller confirms',
      'Shipped on three surfaces: 104 API models, 118 web pages and 61 Flutter screens, with about 9,000 API test cases across 680 files and 1,600 on the web'
    ]
  },
  {
    id: 'safisend',
    title: 'SafiSend — Restaurant Platform with an AI Layer That Acts Through Typed Tools',
    description: 'SafiSend is a restaurant operations platform for Kenya, live at safisend.com: QR and WhatsApp ordering, split bills, M-Pesa and card payments, inventory and analytics. I led its engineering from August 2025 to September 2026, when Mybizna was forked from it. The part worth a reviewer\'s time is how a model was allowed to act on a real business without being trusted: a typed registry of 30 tools, each with a risk tier, behind nine fail-closed gates. Measured in the repository on 23 November 2026: 1,320 commits over 132 active days, 2,100+ test cases in 163 files plus Playwright, Selenium and JMeter suites, 80 models, 90 services and 68 route files.',
    challenges: 'The governing rule is that numbers are computed, never generated. A model chooses which tools to call and how to phrase the answer; every figure it reports came back from a tool result and is cited to the rows that produced it, because prose from a model reads as equally confident whether or not it is grounded. The restaurant id is never a tool parameter: it is bound from the actor and injected, and the registry asserts that at boot, so nothing a model emits can redirect a call to another restaurant. Two agents run on schedulers and neither can apply anything itself. The 86 agent proposes taking a dish off the menu when stock cannot cover the rest of service, and only ever undoes its own snooze; the margin agent proposes prices but holds the analytics permission and not the menu-update permission, so it cannot change a price even if its own code asked. Tenant scoping was the other hard problem: roughly 1,300 query sites each had to remember the tenant filter, and a review found the same failure in several places, including two menu routes with no middleware at all. The fix was structural, and the same design, hardened, became Mybizna\'s.',
    image: '/assets/img/projects/safisend.jpg',
    technologies: [
      { name: 'TypeScript', icon: 'fas fa-code' },
      { name: 'Node 20 · Express', icon: 'fab fa-node-js' },
      { name: 'React · Capacitor', icon: 'fab fa-react' },
      { name: 'MongoDB', icon: 'fas fa-database' },
      { name: 'OpenAI', icon: 'fas fa-brain' },
      { name: 'Paystack · M-Pesa', icon: 'fas fa-money-bill-wave' },
      { name: 'WhatsApp API', icon: 'fab fa-whatsapp' },
      { name: 'Playwright · Selenium', icon: 'fas fa-robot' },
      { name: 'JMeter', icon: 'fas fa-chart-bar' },
      { name: 'Docker · Nginx', icon: 'fab fa-docker' }
    ],
    date: 'Aug 2025 – Sept 2026',
    category: 'Restaurant platform · AI tools · Payments',
    liveUrl: 'https://safisend.com',
    technicalAchievements: [
      'Typed tool registry of 30 tools (25 read, 2 low-risk, 3 high-risk) behind nine fail-closed gates: resolve, actor kind, tenant bound from the actor, the actor\'s own permissions, per-restaurant feature flags, strict schema validation, ownership, risk routing and audited dispatch',
      'Agents propose, people decide: high-risk actions file a proposal and wait for a person, who applies it under their own authority; the agents\' decision arithmetic lives in pure modules with no I/O, clock or database, so it is exhaustively tested',
      'Ask-your-data copilot as a bounded multi-turn tool loop, capped at 5 iterations and 30 seconds, every call audited under one run id, with the tool catalogue narrowed twice: to read-only tools, and to what that person\'s permissions allow',
      'Tenant scoping moved from convention to three layers: membership verified before any handler runs, a Mongoose plugin that reports or rejects a query that does not constrain the tenant, and a static ratchet that blocks new unscoped sites in CI; 37 unguarded endpoints found and fixed on the way',
      'Hash-chained financial audit log with atomic sequence allocation and tamper detection; every payment\'s ledger entry carries device, touchpoint, channel, method and origin',
      'JMeter fintech runs followed by an invariant check: totals balance, no order paid twice, no orphaned ledger row',
      'Everything ships dark: the registry, copilot and proposal routes mount only behind flags, each agent needs its own flag, and tools work with no model key at all',
      'A menu recommender over OpenAI embeddings, collaborative filtering and FP-Growth basket mining written from the paper, with a five-tier cold-start ladder for anonymous diners and a cross-restaurant taste profile gated on history and opt-out',
      'Menu onboarding from a photograph with a second pass over low-confidence items and human review before a price is published; QR-to-order with no app install; split billing across several diners at one table'
    ]
  },
  {
    id: 'kaizen',
    title: 'Kaizen — AI-Native Personal Operating System',
    description: 'Kaizen is an AI-native personal operating system for habits, goals, journaling, and reviews, built around a Coach that acts on the user\'s data rather than merely discussing it. Ask it to "add a habit to read every morning and create a goal to run a 5K next month" and it creates both — reload the page and the rows are genuinely there. It does this through a streaming tool-use loop exposing 12 tools, each bound to the same service-layer functions the REST API calls, so the agent writes through identical validated code paths as the UI. Built on FastAPI and SQLAlchemy 2.0 with Postgres/pgvector and a Next.js App Router frontend.',
    challenges: 'The core design problem was making an LLM a trustworthy actor on real user data rather than a chat surface bolted onto a CRUD app. The governing decision was to give the model no privileged write path: its tools dispatch to the very same service functions the UI calls, so the agent cannot bypass validation or drift from application invariants. Beyond that the model had to stay grounded — it is instructed to read current dashboard state before offering progress advice, and the system prompt injects the user\'s real timezone and current datetime so relative expressions like "tomorrow at 7am" resolve to correct ISO datetimes instead of plausible-looking guesses. Multi-round tool use streams to the client over SSE, so the user watches tool activity unfold rather than waiting through a silent pause. A secondary goal was avoiding vendor lock-in: a single provider interface that both Anthropic Claude and OpenAI implement against the same streaming contract, with every AI path degrading gracefully when no key is configured at all.',
    image: '/assets/img/projects/project-cover.svg',
    technologies: [
      { name: 'Anthropic Claude', icon: 'fas fa-brain' },
      { name: 'Python', icon: 'fab fa-python' },
      { name: 'FastAPI', icon: 'fas fa-bolt' },
      { name: 'SQLAlchemy', icon: 'fas fa-database' },
      { name: 'Postgres + pgvector', icon: 'fas fa-vector-square' },
      { name: 'Next.js', icon: 'fab fa-react' },
      { name: 'Tailwind CSS', icon: 'fab fa-css3-alt' },
      { name: 'Docker', icon: 'fab fa-docker' }
    ],
    date: '2026',
    category: 'AI Engineering · Agentic Systems',
    technicalAchievements: [
      'Agentic tool-use loop exposing 12 tools — create_goal, log_habit, add_journal_entry, generate_review, query_knowledge, schedule_event, send_email and others — each dispatched against the same service layer the REST API uses, so the agent has no separate, less-validated route into the database',
      'Provider-neutral LLM abstraction: a single stream_agent contract implemented by both an Anthropic provider (streaming with adaptive thinking, preserving thinking and redacted_thinking blocks across tool rounds) and an OpenAI provider (function calling), selected at runtime by a factory based on whichever key is available',
      'Server-Sent Events streaming of both tokens and tool invocations, so a multi-round agent turn renders as visible, legible activity rather than a long silent wait',
      'Prompt grounding for correctness: the system prompt injects the user\'s real timezone and current datetime so relative scheduling resolves to exact ISO datetimes, and requires the model to read dashboard state before giving progress advice — keeping it anchored to actual data instead of plausible invention',
      'Semantic knowledge search over pgvector with a pluggable embedding backend (Voyage AI or OpenAI, both normalized to 1024 dimensions so the vector column stays provider-agnostic) and automatic keyword fallback when embeddings are unavailable',
      'Natural-language capture: a structured-output call converts a single free-form sentence into a typed goal, habit, or journal draft returned as strict JSON, surfaced as an editable confirmation card rather than written blindly',
      'Bounded, resilient execution: the tool loop is iteration-capped, and every AI path degrades to a clear message when no API key is present while the rest of the application remains fully usable',
      'Google Calendar OAuth (read and write) with tokens encrypted at rest via Fernet, making the Coach schedule-aware and able to create real calendar events',
      'Full-stack delivery: a 14-table relational model, roughly 7,500 lines across a FastAPI backend and Next.js App Router frontend, with Dockerized Postgres and pgvector'
    ]
  },
  {
    id: 'takeyourvitamins',
    title: 'TakeYourVitamins - Health Management API',
    description: 'TakeYourVitamins is a comprehensive Flask-based API for managing vitamin information with MongoDB integration. The system features a robust RESTful API with Swagger documentation, automated testing with Selenium for end-to-end testing, load testing with JMeter supporting up to 1000 concurrent users, and a complete CI/CD pipeline with GitHub Actions. The project includes comprehensive data models for vitamins, supplements, and user interactions with detailed intake practices and interaction warnings.',
    challenges: 'Key challenges included implementing comprehensive automated testing with Selenium for browser-based end-to-end testing, designing efficient MongoDB data models for complex vitamin interaction data, creating a robust CI/CD pipeline with multiple testing stages, and implementing load testing capabilities to ensure system scalability. The project required careful API design to handle complex supplement interaction data and user intake tracking while maintaining performance under high load.',
    image: '/assets/img/projects/takeyourvitamins.jpg',
    technologies: [
      { name: 'Python', icon: 'fab fa-python' },
      { name: 'Flask', icon: 'fas fa-flask' },
      { name: 'MongoDB', icon: 'fas fa-database' },
      { name: 'Selenium', icon: 'fas fa-robot' },
      { name: 'JMeter', icon: 'fas fa-chart-bar' },
      { name: 'GitHub Actions', icon: 'fab fa-github' },
      { name: 'Swagger', icon: 'fas fa-book' },
      { name: 'pytest', icon: 'fas fa-vial' },
      { name: 'TypeScript', icon: 'fab fa-js-square' }
    ],
    date: 'December 2024',
    category: 'Backend API & Testing',
    githubUrl: 'https://github.com/EnockMagara/TakeYourVitamins',
    technicalAchievements: [
      'Comprehensive API Design: Built RESTful API with full CRUD operations for vitamin management with Swagger documentation',
      'Automated Testing Suite: Implemented Selenium-based end-to-end testing with screenshot capture for debugging',
      'Load Testing Infrastructure: Configured JMeter for performance testing supporting up to 1000 concurrent users',
      'CI/CD Pipeline: Established GitHub Actions workflow with automated testing, linting, formatting, and coverage reporting',
      'Data Modeling: Designed complex MongoDB schemas for vitamins, supplements, interactions, and intake practices',
      'Test Automation: Created comprehensive test suite with unit tests, integration tests, and system tests',
      'Documentation: Implemented Swagger UI for interactive API documentation and testing',
      'Performance Optimization: Achieved high performance and scalability through efficient database design and caching strategies'
    ]
  },
  {
    id: 'safipoints',
    title: 'SafiPoints — Blockchain Loyalty Rewards on XRPL',
    description: 'Blockchain-powered loyalty and cashback system for restaurants, built on the XRP Ledger. Customers earn SAFI tokens automatically when they pay via SafiSend, store them on-chain, and redeem for discounts at checkout. Extended with SafiScore — a verifiable on-chain credit profile built from retail spending history. Selected as 1 of 15 fellows at the Ripple XRPL Builder Residency; presented at Ripple Demo Day, London.',
    challenges: 'Designing a seamless token mint-and-redeem flow that works invisibly inside a real restaurant ordering session, handling XRPL testnet latency, SMS OTP claim for first-time users, and building a verifiable on-chain credit score from spend history using Solidity on the XRPL EVM Sidechain.',
    image: '/assets/img/projects/safipoints.jpg',
    technologies: [
      { name: 'React', icon: 'fab fa-react' },
      { name: 'Node.js', icon: 'fab fa-node-js' },
      { name: 'XRPL', icon: 'fas fa-link' },
      { name: 'Solidity', icon: 'fas fa-file-code' },
      { name: 'MongoDB', icon: 'fas fa-database' },
      { name: 'Docker', icon: 'fab fa-docker' },
      { name: 'Nginx', icon: 'fas fa-cloud' }
    ],
    date: 'Mar – Apr 2026',
    category: 'Blockchain · Fintech · DeFi',
    githubUrl: 'https://github.com/EnockMagara/SAFIPOINTS',
    technicalAchievements: [
      'SAFI token minted on XRPL Testnet as IOU: 10% cashback auto-minted on every qualifying payment',
      'SMS OTP claim flow for first-time users; returning customers get auto-minted tokens',
      'SafiScore: verifiable on-chain credit profile built from retail spend history, using Solidity smart contracts on XRPL EVM Sidechain',
      'Full React SPA with Framer Motion animations, custom CSS, connected to Express/MongoDB backend',
      'Dockerized deployment behind Nginx with SSL; seed scripts to bootstrap XRPL wallets and demo data',
      'Selected as 1 of 15 XRPL Builder Residency fellows; presented live at Ripple Demo Day, London'
    ]
  },
  {
    id: 'quantopt',
    title: 'QuantOpt - AI Portfolio Optimization',
    description: 'A comprehensive machine learning system for portfolio optimization using PySpark and PyTorch. Implements Modern Portfolio Theory optimizers, Deep Reinforcement Learning (DDPG/PPO) for dynamic rebalancing, and Monte Carlo risk simulations with robust backtesting and evaluation.',
    challenges: 'Designing a unified pipeline that scales from classical optimization to deep RL while ensuring reproducibility, robust feature engineering, and realistic backtesting with transaction costs and stress scenarios.',
    image: '/assets/img/projects/project-cover.svg',
    technologies: [
      { name: 'Python', icon: 'fab fa-python' },
      { name: 'PySpark', icon: 'fas fa-bolt' },
      { name: 'PyTorch', icon: 'fas fa-fire' },
      { name: 'CVXPY', icon: 'fas fa-calculator' },
      { name: 'Reinforcement Learning', icon: 'fas fa-brain' }
    ],
    date: '2025',
    category: 'Quant Finance & ML',
    githubUrl: 'https://github.com/EnockMagara/QuantOpt',
    technicalAchievements: [
      'End-to-end pipeline: preprocessing, feature engineering, modeling, and evaluation with PySpark + PyTorch',
      'Multiple optimizers: MPT (max Sharpe, min variance), Deep RL rebalancing (DDPG/PPO), and Monte Carlo risk',
      'Backtesting framework with stress testing (e.g., 2008-like crash scenarios) and rich metrics',
      'Config-driven architecture with reproducible runs and scalable data handling',
      'Extensible module layout with unit tests and results reporting'
    ]
  },
  {
    id: 'mapreducemlops',
    title: 'Movie Review Sentiment Analysis (MapReduce + ML)',
    description: 'A comprehensive MLOps project for sentiment analysis of movie reviews using Apache Spark MapReduce and machine learning. Includes Spark-based TF-IDF feature extraction, MLlib models (Naive Bayes, Logistic Regression, Random Forest), PyTorch deep learning variants (LSTM/Transformer/BERT), MLflow tracking, Docker, and Makefile-driven workflows.',
    challenges: 'Designing a unified pipeline supporting both Spark MLlib and PyTorch while maintaining reproducibility and comparability. Implementing TF-IDF at scale, robust experiment tracking with MLflow, and containerized, repeatable training/inference flows. Balancing performance and resource usage across distributed and GPU workloads.',
    image: '/assets/img/projects/mlops.png',
    technologies: [
      { name: 'Apache Spark', icon: 'fas fa-bolt' },
      { name: 'Python', icon: 'fab fa-python' },
      { name: 'PyTorch', icon: 'fas fa-fire' },
      { name: 'MLflow', icon: 'fas fa-chart-line' },
      { name: 'Docker', icon: 'fab fa-docker' },
      { name: 'Make', icon: 'fas fa-cogs' }
    ],
    date: '2025',
    category: 'MLOps & Distributed ML',
    githubUrl: 'https://github.com/EnockMagara/MapReduceMLOps',
    technicalAchievements: [
      'Hybrid Pipeline: Unified Spark MapReduce feature engineering with parallel PyTorch deep learning path',
      'Model Zoo: Implemented Naive Bayes, Logistic Regression, Random Forest, plus LSTM/Transformer/BERT variants',
      'Experiment Tracking: Full MLflow integration with metrics, params, and artifact logging',
      'Reproducibility: Makefile + Docker workflows for install, train, evaluate, and predict',
      'Scalability: Distributed TF-IDF and training with Spark, GPU-ready PyTorch training scripts',
      'CI-ready Structure: Config-driven scripts, tests, and modular code layout for extension'
    ]
  },
  {
    id: 'jobboard',
    title: 'JobBoard - Full-Stack Job Platform',
    description: 'JobBoard is a comprehensive full-stack job platform built with Python/Flask backend and Next.js frontend, featuring dual user authentication for companies and job seekers. The platform includes advanced A/B testing capabilities using LLM-enhanced job descriptions, comprehensive API endpoints for job management, and automated CI/CD pipeline with Docker containerization. The system implements sophisticated analytics and conversion tracking to optimize job posting effectiveness.',
    challenges: 'Key challenges included implementing a robust dual authentication system for different user types, creating an efficient A/B testing framework for job descriptions using Together.ai LLM integration, and developing a comprehensive API with proper authorization and data validation. The project required complex database design to handle job applications, user management, and analytics tracking while maintaining performance and scalability.',
    image: '/assets/img/projects/jobboard.jpg',
    technologies: [
      { name: 'Python', icon: 'fab fa-python' },
      { name: 'Flask', icon: 'fas fa-flask' },
      { name: 'Next.js', icon: 'fab fa-react' },
      { name: 'MongoDB', icon: 'fas fa-database' },
      { name: 'Docker', icon: 'fab fa-docker' },
      { name: 'GitHub Actions', icon: 'fab fa-github' },
      { name: 'Together.ai', icon: 'fas fa-robot' },
      { name: 'JWT', icon: 'fas fa-lock' },
      { name: 'RESTful API', icon: 'fas fa-server' }
    ],
    date: 'January 2025',
    category: 'Full-stack Web Application',
    githubUrl: 'https://github.com/EnockMagara/jobboard-public',
    technicalAchievements: [
      'Dual Authentication System: Implemented separate authentication flows for companies and job seekers with role-based access control',
      'A/B Testing Framework: Built comprehensive A/B testing system comparing original vs LLM-enhanced job descriptions with conversion tracking',
      'RESTful API Design: Created 20+ API endpoints with proper HTTP methods, status codes, and comprehensive error handling',
      'LLM Integration: Integrated Together.ai for automated job description enhancement and optimization',
      'Analytics Dashboard: Developed conversion tracking and visualization system with charts and statistical analysis',
      'Docker Containerization: Implemented containerized deployment with proper environment configuration and dependency management',
      'CI/CD Pipeline: Established automated testing, building, and deployment workflow using GitHub Actions',
      'Database Design: Created optimized MongoDB schemas for companies, job seekers, job posts, and applications with proper indexing'
    ]
  },
  {
    id: 'cloudtrace',
    title: 'CloudTrace - Cloud Provider Benchmark',
    description: 'CloudTrace is a high-performance network analysis tool leveraging raw ICMP sockets to benchmark connectivity metrics to major cloud providers. Built on Python/Flask with modular architecture, it performs multi-point traceroute analysis with precise RTT measurements and geospatial visualization. I implement a comprehensive CI/CD pipeline for automated testing and deployment, along with extensive unit testing to ensure reliability.',
    challenges: 'One of the key challenges was implementing a custom socket-level ICMP implementation with packet crafting while ensuring proper privilege escalation handling and fallback visualization for permission-restricted environments. The project also required complex statistical aggregation with outlier identification and geographic path visualization with cross-border transit detection.',
    image: '/assets/img/projects/cloudtrace.png',
    technologies: [
      { name: 'Python', icon: 'fab fa-python' },
      { name: 'Flask', icon: 'fas fa-flask' },
      { name: 'JavaScript', icon: 'fab fa-js-square' },
      { name: 'SQLite', icon: 'fas fa-database' },
      { name: 'AJAX', icon: 'fas fa-sync-alt' },
      { name: 'Plotly.js', icon: 'fas fa-chart-line' }
    ],
    date: 'March 2025',
    category: 'Network Analysis',
    liveUrl: 'https://cloudtrace.duckdns.org/',
    githubUrl: 'https://github.com/EnockMagara/CloudTrace-Benchmark'
  },
  {
    id: 'hackheist',
    title: 'AYN - AI-Powered Visual Assistant',
    description: 'AYN is an advanced visual assistance application designed to help visually impaired users navigate and understand their surroundings. This full-stack application combines machine learning-based object detection with natural language processing to provide real-time audio descriptions of environments captured by the camera. The system features a Flask backend that integrates YOLOv5 for object detection and MiDaS for depth estimation, along with a sleek Next.js frontend with responsive design and accessible UI.',
    challenges: 'Key challenges included implementing robust real-time object detection with spatial awareness, creating an accessible and intuitive UI for visually impaired users, and developing an efficient pipeline for processing video frames and generating meaningful audio descriptions. The project required integrating multiple machine learning models and ensuring they worked together seamlessly while maintaining low latency for real-time feedback.',
    image: '/assets/img/projects/hackheist.jpg',
    technologies: [
      { name: 'Python', icon: 'fab fa-python' },
      { name: 'Flask', icon: 'fas fa-flask' },
      { name: 'PyTorch', icon: 'fas fa-fire' },
      { name: 'Next.js', icon: 'fab fa-react' },
      { name: 'React', icon: 'fab fa-react' },
      { name: 'Tailwind CSS', icon: 'fab fa-css3-alt' },
      { name: 'OpenAI API', icon: 'fas fa-robot' },
      { name: 'YOLOv5', icon: 'fas fa-eye' },
      { name: 'MiDaS', icon: 'fas fa-mountain' }
    ],
    date: 'February 2025',
    category: 'AI & Accessibility',
    liveUrl: 'https://drive.google.com/file/d/1Wl9L5GRE-5ZyQLFlioMG-RcnTCGqplIT/view?usp=share_link',
    githubUrl: 'https://github.com/Danjari/hackheist',
    technicalAchievements: [
      'Multi-Model AI System: Integrated YOLOv5 for object detection and MiDaS for depth estimation to create comprehensive spatial awareness',
      'Real-time Processing: Implemented efficient video frame processing with WebRTC for camera access and canvas manipulation',
      'Depth-Based Object Prioritization: Created an algorithm to identify and prioritize nearby objects based on depth estimation',
      'Natural Language Generation: Used GPT-4o to translate technical object data into natural, helpful descriptions for users',
      'Text-to-Speech Integration: Implemented OpenAI\'s TTS API to convert descriptions into clear audio feedback',
      'Accessibility-First Design: Built a UI specifically optimized for users with visual impairments, featuring large buttons and voice feedback',
      'Cross-Platform Compatibility: Ensured the application works across different devices and browsers with responsive design'
    ]
  },
  {
    id: 'mapjournal',
    title: 'MapJournal - iOS Location Sharing App',
    description: 'MapJournal is an iOS application built with SwiftUI that allows users to discover, save, and share their favorite places. The app features interactive mapping with MapKit and CoreLocation, secure user authentication via Google Sign-In, and real-time data synchronization using Firebase. Users can add detailed information to saved locations including tags, descriptions, and images, then easily share these locations with others.',
    challenges: 'Key challenges included implementing a complete location services system with proper permission handling, designing an efficient data structure for storing location data in Firestore, creating a seamless authentication flow with Google Sign-In, and building an intuitive UI for map interaction. The project required careful planning to ensure smooth integration between multiple frameworks while maintaining excellent performance.',
    image: '/assets/img/projects/mapjournal.jpg',
    technologies: [
      { name: 'Swift', icon: 'fab fa-swift' },
      { name: 'SwiftUI', icon: 'fab fa-apple' },
      { name: 'CoreLocation', icon: 'fas fa-map-marker-alt' },
      { name: 'MapKit', icon: 'fas fa-map' },
      { name: 'Firebase', icon: 'fas fa-database' },
      { name: 'Google Sign-In', icon: 'fab fa-google' },
      { name: 'Xcode', icon: 'fas fa-code' }
    ],
    date: 'November 2024',
    category: 'Mobile Development',
    liveUrl: 'https://drive.google.com/file/d/1QkNvNutOjk3Q9SezRdckK_e_FsCcYred/view?usp=sharing',
    githubUrl: 'https://github.com/EnockMagara/molab-2024-09-Enock/tree/main/WEEK10',
    technicalAchievements: [
      'Location Services: Implemented comprehensive location tracking and region monitoring using CoreLocation with user privacy considerations',
      'Map Integration: Designed an interactive map interface with custom annotations, location selection, and geocoding functionality',
      'Cloud Integration: Set up Firestore database with optimized data models for efficient querying and real-time updates',
      'Authentication System: Integrated Google Sign-In for secure user authentication and profile management',
      'Photo Management: Implemented photo selection, storage, and retrieval system with Firebase Storage',
      'Sharing Features: Created a flexible sharing system allowing users to share locations across multiple platforms',
      'MVVM Architecture: Structured the app following MVVM design pattern for better separation of concerns and maintainability'
    ]
  },
  {
    id: 'assignflow',
    title: 'AssignFlow - Task Management System',
    description: 'AssignFlow is a robust task management platform built with a modern Node.js/Express stack and MongoDB integration. This application leverages a comprehensive MVC architecture to provide dynamic task allocation, intuitive project management, and real-time notification systems. The platform features a RESTful API backend with JWT authentication, efficient in-memory caching for performance optimization, and a responsive EJS-powered templating system with modular component architecture. The deployment infrastructure utilizes a fully automated CI/CD pipeline through GitHub Actions with seamless integration for continuous deployment to production servers.',
    challenges: 'One significant challenge was implementing an intelligent task prioritization algorithm that balances workload distribution while respecting user-specified dependencies and deadlines. The system also required creating a sophisticated notification engine with multiple delivery channels and customizable triggers based on task state transitions.',
    image: '/assets/img/projects/assignflow.png',
    technologies: [
      { name: 'Node.js', icon: 'fab fa-node-js' },
      { name: 'Express', icon: 'fas fa-server' },
      { name: 'MongoDB', icon: 'fas fa-database' },
      { name: 'EJS', icon: 'fas fa-file-code' },
      { name: 'GitHub Actions', icon: 'fab fa-github' },
      { name: 'Nginx', icon: 'fas fa-cloud' }
    ],
    date: 'December 2024',
    category: 'Full-stack web development',
    liveUrl: 'https://assignflow.duckdns.org/'
  },
  {
    id: 'calmingspace',
    title: 'Calming Space - Meditation & Relaxation App',
    description: 'Calming Space is a full-stack meditation and relaxation application designed to create a personalized sanctuary for mindfulness. It features ambient sound mixing, a mindfulness timer, user authentication, and Spotify integration. Users can mix different ambient sounds (rain, forest, ocean), use a meditation timer, and play music from a curated collection or their Spotify playlists.',
    challenges: 'The key challenges included implementing a responsive audio mixing interface with precise volume controls, setting up secure authentication with both local and OAuth strategies for Spotify, and developing a CI/CD pipeline for automated testing and deployment. I also had to ensure the audio synchronization worked flawlessly across different devices and browsers.',
    image: '/assets/img/projects/calmingspace.jpg',
    technologies: [
      { name: 'Node.js', icon: 'fab fa-node-js' },
      { name: 'Express', icon: 'fas fa-server' },
      { name: 'MongoDB', icon: 'fas fa-database' },
      { name: 'JavaScript', icon: 'fab fa-js-square' },
      { name: 'CSS3', icon: 'fab fa-css3-alt' },
      { name: 'EJS', icon: 'fas fa-file-code' },
      { name: 'Passport.js', icon: 'fas fa-passport' },
      { name: 'Spotify API', icon: 'fab fa-spotify' },
      { name: 'WebAudio API', icon: 'fas fa-volume-up' },
      { name: 'OAuth2', icon: 'fas fa-lock' },
      { name: 'GitHub Actions', icon: 'fab fa-github' }
    ],
    date: 'October 2024',
    category: 'Full-stack Web Application',
    liveUrl: 'https://calmingspace.duckdns.org/dashboard',
    githubUrl: 'https://github.com/EnockMagara/calming_space',
    technicalAchievements: [
      'Custom Audio Engine: Implemented a WebAudio API-based system that allows users to mix and control multiple audio sources simultaneously with volume adjustment',
      'OAuth Integration: Securely implemented Spotify OAuth2 authentication flow, enabling users to access and play their personal music library',
      'Responsive UI/UX: Created an intuitive interface with CSS animations and responsive design principles that works across all devices',
      'Session Management: Built a robust user authentication system using Passport.js with secure cookie handling and MongoDB session storage',
      'CI/CD Pipeline: Established a GitHub Actions workflow for automated testing and deployment to a Digital Ocean cloud server',
      'HTTPS Security: Configured SSL/TLS with automatic certificate renewal via Let\'s Encrypt for secure HTTPS connections',
      'API Integration: Developed RESTful endpoints to interact with Spotify\'s Web API and WebPlayback SDK for music streaming functionality'
    ]
  },
  {
    id: 'moraamema',
    title: 'MoraaMema Initiative - Non-Profit Website',
    description: 'Designed and developed the official website for MoraaMema Initiative Inc., a non-profit organization dedicated to improving the lives of underprivileged children in Kenya through educational initiatives. The website serves as the organization\'s primary online presence, providing information about their mission, vision, projects, and facilitating donations.',
    challenges: 'The key challenge was creating a visually engaging yet lightweight website that would function well in regions with limited internet connectivity. I implemented progressive loading techniques and optimized media assets while maintaining a professional aesthetic that effectively communicates the organization\'s mission and impact.',
    image: '/assets/img/projects/moraamema.jpg',
    technologies: [
      { name: 'HTML5', icon: 'fab fa-html5' },
      { name: 'CSS3', icon: 'fab fa-css3-alt' },
      { name: 'JavaScript', icon: 'fab fa-js' },
      { name: 'Bootstrap', icon: 'fab fa-bootstrap' },
      { name: 'Responsive Design', icon: 'fas fa-mobile-alt' }
    ],
    date: 'July 2024',
    category: 'web development',
    liveUrl: 'https://moraamema.org/'
  },
];

// Route for portfolio page (projects listing)
router.get('/', (req, res) => {
  res.render('portfolio', { projects });
});

// Route for individual project details
router.get('/:id', (req, res) => {
  const projectId = req.params.id;
  const project = projects.find(p => p.id === projectId);
  
  if (!project) {
    return res.status(404).send('Project not found');
  }
  
  res.render('project-detail', { project });
});

// Export projects data for use in other files if needed
module.exports = {
  router,
  projects
};
