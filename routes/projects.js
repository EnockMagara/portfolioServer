const express = require('express');
const router = express.Router();

// Project data
const projects = [
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
    id: 'jegededge',
    title: 'JegedEdge Hair Care - Professional Grooming Services',
    description: 'Designed and developed a professional website for JegedEdge Hair Care, a specialized grooming service for clients in rehab/nursing homes and group homes. The website showcases their premium services while emphasizing their mission to enhance well-being and self-esteem through professional grooming experiences.',
    challenges: 'The main challenge was creating a website that would appeal to both institutional clients (nursing homes, rehabilitation centers) and individual customers, while effectively communicating the specialized nature of their services. I focused on an accessible design with clear service descriptions and compelling visuals to bridge this gap.',
    image: '/assets/img/projects/jegededge.jpg',
    technologies: [
      { name: 'HTML5', icon: 'fab fa-html5' },
      { name: 'CSS3', icon: 'fab fa-css3-alt' },
      { name: 'JavaScript', icon: 'fab fa-js' },
      { name: 'Responsive Design', icon: 'fas fa-mobile-alt' }
    ],
    date: 'November 2024',
    category: 'Business Website',
    liveUrl: 'https://jegededgehaircare.com/'
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
    id: 'project3',
    title: 'Project 3',
    description: 'Detailed description of project 3. This is a comprehensive explanation of what the project does, how it works, and what technologies it uses.',
    challenges: 'Some of the challenges faced during development and how they were overcome.',
    image: '/assets/img/projects/project3.jpg',
    technologies: [
      { name: 'Vue.js', icon: 'fab fa-vuejs' },
      { name: 'Node.js', icon: 'fab fa-node-js' },
      { name: 'AWS', icon: 'fab fa-aws' }
    ],
    date: 'June 2023',
    client: 'Client Name',
    category: 'Full Stack Development',
    liveUrl: 'https://example.com/project3',
    githubUrl: 'https://github.com/EnockMagara/project3'
  }
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
