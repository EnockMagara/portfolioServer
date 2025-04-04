const express = require('express');
const router = express.Router();

// Project data
const projects = [
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
