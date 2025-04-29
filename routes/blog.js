const express = require('express');
const router = express.Router();
const RSSParser = require('rss-parser');
const parser = new RSSParser();
const path = require('path');

// Cache configuration
const CACHE_TTL = 60 * 60 * 1000; // 1 hour in milliseconds
const blogPostsCache = {
  data: null,
  timestamp: null
};

// Research papers data
const researchPapers = [
  {
    id: 'research-paper-1',
    title: "Research Paper 1",
    abstract: "A comprehensive study on modern software development practices and their impact on system architecture.",
    date: "March 2024",
    type: "Technical Paper",
    pdfUrl: "/assets/pdf/Enock_Mecheo_Resume.pdf",
    tags: ["Software Architecture", "Development Practices"]
  }
];

// Function to determine post category based on content
function determineCategory(post) {
  const title = post.title.toLowerCase();
  const content = post['content:encoded'] ? post['content:encoded'].toLowerCase() : '';
  
  // Special case for the configuration-driven development post
  if (title.includes('unlocking flexibility with configuration-driven development')) {
    return 'databases';
  }
  
  if (title.includes('database') || content.includes('sql') || content.includes('nosql') || 
      title.includes('configuration') || content.includes('data store') || 
      content.includes('data management')) {
    return 'databases';
  } else if (title.includes('machine learning') || title.includes('deep learning') || 
             content.includes('neural network')) {
    return 'deeplearning';
  } else if (title.includes('web') || content.includes('javascript') || 
             content.includes('html') || content.includes('css')) {
    return 'webdev';
  } else if (title.includes('app') || content.includes('mobile') || 
             content.includes('ios') || content.includes('android')) {
    return 'appdev';
  } else if (title.includes('devops') || content.includes('ci/cd') || 
             content.includes('docker') || content.includes('kubernetes')) {
    return 'devops';
  }
  return 'general';
}

// Route to fetch and display Medium blog posts and research papers
router.get('/', async (req, res) => {
  try {
    // Check if cache exists and is still valid
    const now = Date.now();
    if (blogPostsCache.data && blogPostsCache.timestamp && (now - blogPostsCache.timestamp < CACHE_TTL)) {
      console.log('Serving blog posts from cache');
      return res.render('blog', { 
        posts: blogPostsCache.data,
        research: researchPapers
      });
    }

    // Cache expired or doesn't exist, fetch from Medium
    console.log('Fetching blog posts from Medium');
    const feed = await parser.parseURL('https://medium.com/feed/@enockmecheo');
    
    // Process all posts
    const postsToDisplay = feed.items.map(post => {
      // Extract a snippet from the content
      const content = post['content:encoded'] || '';
      const snippet = content.replace(/<[^>]+>/g, '').substring(0, 500); // Remove HTML tags and get first 500 chars
      
      // Determine category
      const category = determineCategory(post);
      
      // Get Medium link
      const link = post.link || '';
      
      return {
        title: post.title,
        excerpt: snippet,
        date: new Date(post.pubDate).toLocaleDateString(),
        category: category,
        link: link,
        tags: [category] // Add the category as a tag
      };
    });
    
    // Update cache
    blogPostsCache.data = postsToDisplay;
    blogPostsCache.timestamp = now;
    
    // Render the blog page with the fetched posts and research papers
    res.render('blog', { 
      posts: postsToDisplay,
      research: researchPapers
    });
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    
    // If there's cached data available, use it even if expired
    if (blogPostsCache.data) {
      console.log('Falling back to cached data due to fetch error');
      return res.render('blog', { 
        posts: blogPostsCache.data,
        research: researchPapers
      });
    }
    
    res.status(500).send('Error fetching blog posts');
  }
});

// Route for individual blog post - redirect to Medium
router.get('/post/:slug', (req, res) => {
  const posts = blogPostsCache.data;
  if (posts) {
    const post = posts.find(p => p.link.includes(req.params.slug));
    if (post) {
      return res.redirect(post.link);
    }
  }
  res.redirect('https://medium.com/@enockmecheo');
});

// Route for viewing individual research papers
router.get('/research/:id', (req, res) => {
  const paper = researchPapers.find(p => p.id === req.params.id);
  if (!paper) {
    return res.status(404).send('Research paper not found');
  }
  res.render('research-detail', { paper });
});

module.exports = router; 