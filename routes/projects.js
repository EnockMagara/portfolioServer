const express = require('express');
const router = express.Router();

// Project data
const projects = [
  {
    id: 'safisend',
    title: 'SafiSend — Restaurant Ordering Platform with a Personalized Menu',
    description: 'SafiSend is a restaurant platform I founded and lead, live in production at www.safisend.com. Diners scan a QR code at the table to browse the menu, order, and pay from their phone. The part I am most proud of is the machine learning layer underneath: instead of showing everyone the same menu, SafiSend learns what each person likes and reorders the menu for them. It also lets a restaurant join by simply photographing its paper menu — an AI vision model reads the photo and builds the digital menu automatically. The platform is roughly 144,000 lines of code with 859 commits and 68 test suites.',
    challenges: 'The hardest problem was making recommendations useful for someone the system has never seen before. A diner scans a QR code, is often anonymous, has no order history, and will leave in twenty minutes — so there is no time to learn their taste the usual way. My solution was a ladder of five strategies that falls back gracefully, so there is always a sensible answer: use their history if we have it, otherwise learn from what they are clicking right now, otherwise borrow the taste profile they built at other SafiSend restaurants, and only then fall back to general popularity. The borrowing step is the interesting one. Because every restaurant describes its food to the same AI model, "spicy chicken" at one restaurant sits close to "fiery wings" at another, so preferences carry across. That had to be done carefully: restaurants can never see where else a customer eats, the transfer only kicks in once there is enough history to trust, its influence fades as the customer builds a local history, and diners can opt out. The second challenge was menu onboarding — restaurants show up with a photo or a PDF, and the extraction had to be accurate enough that nobody wants to retype it by hand.',
    image: '/assets/img/projects/safisend.jpg',
    technologies: [
      { name: 'OpenAI Embeddings', icon: 'fas fa-brain' },
      { name: 'GPT-4o Vision', icon: 'fas fa-eye' },
      { name: 'FP-Growth', icon: 'fas fa-project-diagram' },
      { name: 'React', icon: 'fab fa-react' },
      { name: 'Node.js', icon: 'fab fa-node-js' },
      { name: 'MongoDB', icon: 'fas fa-database' },
      { name: 'WhatsApp API', icon: 'fab fa-whatsapp' },
      { name: 'M-Pesa', icon: 'fas fa-mobile-alt' },
      { name: 'Docker', icon: 'fab fa-docker' },
      { name: 'Nginx', icon: 'fas fa-cloud' },
      { name: 'JMeter', icon: 'fas fa-chart-bar' }
    ],
    date: 'Aug 2025 – May 2026',
    category: 'AI/ML · Recommender Systems · Product',
    liveUrl: 'https://www.safisend.com',
    technicalAchievements: [
      'Personalized menu ranking: every item is scored on five signals — how well it matches the diner\'s taste, what similar customers ordered, their own past behaviour, what is popular right now, and what they ordered recently. The strongest signal is taste matching, and the final list is checked for variety so it does not return five near-identical dishes',
      'A five-step fallback ladder for new customers, so someone the system has never seen still gets a thoughtfully ordered menu rather than a default list: known history first, then live browsing behaviour, then their profile from other SafiSend restaurants, then general popularity',
      'Cross-restaurant taste transfer: a customer\'s preferences from restaurants they have visited before carry over to a new one. It only activates once there is enough history to be confident, starts as a light nudge rather than a takeover, fades out as the customer builds history at the new restaurant, and never reveals to a restaurant where else that person eats',
      'A "goes well together" engine built on FP-Growth, a classic market-basket algorithm I implemented from scratch in plain JavaScript and unit tested. It reads past orders to find combinations that genuinely go together, ranked by how often the pattern holds and how much stronger it is than chance — the difference between a real pairing and two items that are simply both popular',
      'Taste profiles built with OpenAI embeddings, which turn each dish and each customer into a list of numbers capturing meaning rather than keywords. That is what lets the system see that "spicy chicken" and "fiery wings" are close, and it works across restaurants because every menu is described by the same model',
      'Live session learning: recommendations adjust to what the diner is browsing during this visit, blended with their longer-term profile so a single curious tap does not overwrite months of history',
      'Menu onboarding from a photo using GPT-4o Vision. Images are cleaned up first, then read in two passes — a full pass, followed by a focused second look at only the items the model was unsure about. Every item carries a confidence score, so anything doubtful is flagged for a human to confirm instead of silently going live wrong. It also detects currency, sorts items into categories, and infers dietary tags',
      'Tracking that closes the loop: every recommendation shown, clicked, and added to cart is logged along with which strategy produced it, so we can measure which approaches actually lead to orders rather than guessing',
      'Upsell suggestions that distinguish genuine upgrades, add-ons, and meal completers, scored mainly on how related the items are, plus price step-up and how often the pair is actually bought together. These are precomputed on a schedule so they are instant at order time',
      'The production platform underneath: QR ordering with no app install, real-time split billing, WhatsApp order notifications, M-Pesa payments with reconciliation, a live kitchen dashboard, containerized deployment, and load testing to 500+ concurrent users'
    ]
  },
  {
    id: 'kaizen',
    title: 'Kaizen — AI-Native Personal Operating System',
    description: 'Kaizen is a personal operating system for habits, goals, journaling, and weekly reviews, built around an AI Coach. What makes it different is that the Coach actually does things rather than just talking about them. Ask it to "add a habit to read every morning and set a goal to run a 5K next month" and it creates them — reload the page and they are really there. It does this through 12 tools wired to the same internal functions the rest of the app uses, so the AI cannot take shortcuts or corrupt data in ways the normal interface would not allow.',
    challenges: 'The real problem was trust: letting an AI write to someone\'s actual data, not just chat beside it. My approach was to give the model no special privileges. Its tools call exactly the same validated functions the buttons in the UI call, so there is no separate, less careful path into the database. Beyond that, the model had to be kept honest about reality — it reads the user\'s current state before giving advice, and it is told the real date and timezone so "tomorrow at 7am" becomes an actual correct time instead of a guessed one. Its actions stream to the screen as they happen, so the user watches what it is doing rather than waiting on a silent pause and hoping. A second goal was avoiding lock-in to one AI vendor, so I designed a single interface that both Claude and OpenAI plug into, and the app still works normally if no AI key is configured at all.',
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
      'An AI Coach with 12 real abilities — create goals, log habits, write journal entries, generate reviews, schedule calendar events, send email — each one wired to the same internal function the app\'s own buttons use, so the AI writes data through the same safe, validated path as a normal user action',
      'Works with either Claude or OpenAI behind one shared interface, chosen automatically based on which key is available. Swapping AI providers does not touch the rest of the app',
      'The Coach\'s work streams to the screen live: you see it thinking, calling each tool, and reporting back, instead of staring at a spinner during a long multi-step task',
      'Grounded in reality rather than guessing: the AI is given the user\'s real date and timezone so "tomorrow at 7am" becomes a genuinely correct calendar time, and it is required to check the user\'s current progress before offering advice',
      'Semantic search across saved notes, so searching for an idea finds related entries by meaning rather than exact wording, with a plain keyword search as an automatic fallback',
      'Quick capture: type or speak one ordinary sentence and the AI turns it into a properly structured goal, habit, or journal entry, shown as an editable card to confirm before saving',
      'Built to fail safely: the AI is capped on how many steps it can take in one turn, and if no AI key is configured every AI feature explains itself politely while the rest of the app keeps working normally',
      'Google Calendar integration for reading and creating real events, with access tokens encrypted before they are stored',
      'Full-stack build: a 14-table database, roughly 7,500 lines across a Python FastAPI backend and a Next.js frontend, with containerized setup'
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
