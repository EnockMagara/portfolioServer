const express = require('express');
const router = express.Router();

// Project data
const projects = [
  {
    id: 'cloudtrace',
    title: 'CloudTrace - Cloud Provider Benchmark',
    description: 'CloudTrace is a high-performance network analysis tool leveraging raw ICMP sockets to benchmark connectivity metrics to major cloud providers. Built on Python/Flask with modular architecture, it performs multi-point traceroute analysis with precise RTT measurements and geospatial visualization.',
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
    date: 'March 2024',
    category: 'Network Analysis',
    liveUrl: 'https://cloudtrace.duckdns.org/',
    githubUrl: 'https://github.com/EnockMagara/CloudTrace-Benchmark'
  },
  {
    id: 'project1',
    title: 'Project 1',
    description: 'Detailed description of project 1. This is a comprehensive explanation of what the project does, how it works, and what technologies it uses.',
    challenges: 'Some of the challenges faced during development and how they were overcome.',
    image: '/assets/img/projects/project1.jpg',
    technologies: [
      { name: 'React', icon: 'fab fa-react' },
      { name: 'Node.js', icon: 'fab fa-node-js' },
      { name: 'MongoDB', icon: 'fab fa-mongodb' }
    ],
    date: 'January 2023',
    category: 'Web Development',
    liveUrl: 'https://example.com/project1',
    githubUrl: 'https://github.com/EnockMagara/project1'
  },
  {
    id: 'project2',
    title: 'Project 2',
    description: 'Detailed description of project 2. This is a comprehensive explanation of what the project does, how it works, and what technologies it uses.',
    challenges: 'Some of the challenges faced during development and how they were overcome.',
    image: '/assets/img/projects/project2.jpg',
    technologies: [
      { name: 'Python', icon: 'fab fa-python' },
      { name: 'Flask', icon: 'fab fa-flask' },
      { name: 'Docker', icon: 'fab fa-docker' }
    ],
    date: 'March 2023',
    category: 'Backend Development',
    liveUrl: 'https://example.com/project2',
    githubUrl: 'https://github.com/EnockMagara/project2'
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
