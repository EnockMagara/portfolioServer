require('dotenv').config(); // Load environment variables

const express = require('express'); // Import Express
const path = require('path'); // Import path module for handling file paths
const RSSParser = require('rss-parser'); // Import RSS parser
const nodemailer = require('nodemailer'); // Import nodemailer for email sending
const bodyParser = require('body-parser'); // Import body-parser

const app = express(); // Create an Express application
const PORT = process.env.PORT || 3000; // Define the port to run the server
const parser = new RSSParser(); // Create a new RSS parser instance

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
app.get('/portfolio-details', (req, res) => {
  res.render('portfolio-details');
});

// Route to fetch and display Medium blog posts
app.get('/blog', async (req, res) => {
  try {
    // Fetch the RSS feed from Medium using the new URL
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
    
    // Render the blog page with the fetched posts
    res.render('blog', { posts: postsToDisplay });
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    res.status(500).send('Error fetching blog posts');
  }
});

// Route to send a message
app.post('/send-message', (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: email,
    to: 'enockmecheo@nyu.edu',
    subject: `New message from ${name}`,
    text: `You have received a new message from ${name} (${email}):\n\n${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Error sending message' }); // Send JSON response
    } else {
      console.log('Email sent:', info.response);
      res.json({ message: 'Thank you. Your Message has been received!' }); // Send JSON response
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`); // Log the server URL
});
