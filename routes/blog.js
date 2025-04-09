const express = require('express');
const router = express.Router();
const RSSParser = require('rss-parser');
const parser = new RSSParser();

// Cache configuration
const CACHE_TTL = 60 * 60 * 1000; // 1 hour in milliseconds
const blogPostsCache = {
  data: null,
  timestamp: null
};


// Route to fetch and display Medium blog posts
router.get('/', async (req, res) => {
  try {
    // Check if cache exists and is still valid
    const now = Date.now();
    if (blogPostsCache.data && blogPostsCache.timestamp && (now - blogPostsCache.timestamp < CACHE_TTL)) {
      console.log('Serving blog posts from cache');
      return res.render('blog', { posts: blogPostsCache.data });
    }

    // Cache expired or doesn't exist, fetch from Medium
    console.log('Fetching blog posts from Medium');
    const feed = await parser.parseURL('https://medium.com/feed/@emm10042');
    
    // Process all posts
    const postsToDisplay = feed.items.map(post => {
      // Extract a snippet from the content
      const content = post['content:encoded'] || '';
      const snippet = content.replace(/<[^>]+>/g, '').substring(0, 500); // Remove HTML tags and get first 500 chars
      
      return {
        ...post,
        snippet
      };
    });
    
    // Update cache
    blogPostsCache.data = postsToDisplay;
    blogPostsCache.timestamp = now;
    
    // Render the blog page with the fetched posts
    res.render('blog', { posts: postsToDisplay });
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    
    // If there's cached data available, use it even if expired
    if (blogPostsCache.data) {
      console.log('Falling back to cached data due to fetch error');
      return res.render('blog', { posts: blogPostsCache.data });
    }
    
    res.status(500).send('Error fetching blog posts');
  }
});

// Route for individual blog post (if needed in the future)
router.get('/:id', (req, res) => {
  // This can be implemented later if you want to show full blog posts
  res.redirect('https://medium.com/@emm10042/' + req.params.id);
});

module.exports = router; 