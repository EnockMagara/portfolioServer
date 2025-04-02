require('dotenv').config(); // Load environment variables

const express = require('express'); // Import Express
const path = require('path'); // Import path module for handling file paths
const RSSParser = require('rss-parser'); // Import RSS parser
const bodyParser = require('body-parser'); // Import body-parser

const app = express(); // Create an Express application
const PORT = process.env.PORT || 3000; // Define the port to run the server
const parser = new RSSParser(); // Create a new RSS parser instance

// Cache configuration
const CACHE_TTL = 60 * 60 * 1000; // 1 hour in milliseconds
const blogPostsCache = {
  data: null,
  timestamp: null
};

// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for the homepage
app.get('/', (req, res) => {
  res.render('index');
});

// Route for the portfolio details page
app.get('/portfolio', (req, res) => {
  res.render('portfolio');
});

// Route to fetch and display Medium blog posts
app.get('/blog', async (req, res) => {
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
    
    // Start displaying posts from the third one
    const postsToDisplay = feed.items.slice(2, 5).map(post => {
      // Extract a snippet from the content
      const content = post['content:encoded'] || '';
      const snippet = content.replace(/<[^>]+>/g, '').substring(0, 500); // Remove HTML tags and get first 100 chars
      
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`); // Log the server URL
});
