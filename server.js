require('dotenv').config(); // Load environment variables

const express = require('express'); // Import Express
const path = require('path'); // Import path module for handling file paths
const bodyParser = require('body-parser'); // Import body-parser
const { router: projectsRouter } = require('./routes/projects'); // Import projects router
const blogRouter = require('./routes/blog'); // Import blog router
const axios = require('axios'); // Import axios for HTTP requests

const app = express(); // Create an Express application
const PORT = process.env.PORT || 3000; // Define the port to run the server

// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Also serve assets from 'docs/assets' so images like /assets/img/projects/mlops.png are available
app.use('/assets', express.static(path.join(__dirname, 'docs/assets')));

// Route for the homepage
app.get('/', (req, res) => {
  res.render('index');
});

// Route for the ML projects page
app.get('/ml-projects', (req, res) => {
  res.render('ml-projects');
});

// Route for the comm lab projects page
app.get('/commlab', (req, res) => {
  res.render('commlab');
});

// Use projects router for portfolio and project details routes
app.use('/portfolio', projectsRouter);
app.use('/project', projectsRouter);

// Use blog router for blog routes
app.use('/blog', blogRouter);

// API endpoint to get user's location based on IP
app.get('/api/location', async (req, res) => {
  try {
    // Get the client's IP address
    let clientIP = req.headers['x-forwarded-for'] || 
                   req.connection.remoteAddress || 
                   req.socket.remoteAddress ||
                   (req.connection.socket ? req.connection.socket.remoteAddress : null);
    
    // Handle IPv6 localhost
    if (clientIP === '::1' || clientIP === '127.0.0.1' || clientIP === '::ffff:127.0.0.1') {
      // For local development, use a sample IP or return default location
      clientIP = '8.8.8.8'; // Google's DNS IP for testing
    }
    
    // Clean up the IP address (remove ::ffff: prefix if present)
    if (clientIP && clientIP.startsWith('::ffff:')) {
      clientIP = clientIP.substring(7);
    }
    
    // Make request to ipinfo.io API
    const response = await axios.get(`https://ipinfo.io/${clientIP}/json`);
    const locationData = response.data;
    
    // Format the location string
    const city = locationData.city || 'Unknown City';
    const region = locationData.region || '';
    const country = locationData.country || 'Unknown Country';
    
    
    let locationString = city;
    if (region && region !== city) {
      locationString += `, ${region}`;
    }
    if (country) {
      locationString += `, ${country}`;
    }
    
    res.json({
      success: true,
      location: locationString,
      ip: clientIP,
      city: city,
      region: region,
      country: country,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error fetching location:', error);
    res.json({
      success: false,
      location: 'Unknown Location',
      error: 'Unable to fetch location'
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`); // Log the server URL
});
