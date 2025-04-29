require('dotenv').config(); // Load environment variables

const express = require('express'); // Import Express
const path = require('path'); // Import path module for handling file paths
const bodyParser = require('body-parser'); // Import body-parser
const { router: projectsRouter } = require('./routes/projects'); // Import projects router
const blogRouter = require('./routes/blog'); // Import blog router

const app = express(); // Create an Express application
const PORT = process.env.PORT || 3000; // Define the port to run the server

// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files with proper MIME types
app.use(express.static('public', {
  setHeaders: (res, path) => {
    if (path.endsWith('.pdf')) {
      res.set('Content-Type', 'application/pdf');
    }
  }
}));

// Route for the homepage
app.get('/', (req, res) => {
  res.render('index');
});

// Use projects router for portfolio and project details routes
app.use('/portfolio', projectsRouter);
app.use('/project', projectsRouter);

// Use blog router for blog routes
app.use('/blog', blogRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`); // Log the server URL
});
