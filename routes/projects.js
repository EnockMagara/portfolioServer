const express = require('express');
const router = express.Router();

// Project data
const projects = [
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
