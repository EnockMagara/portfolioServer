const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const { projects } = require('./routes/projects');

// Create docs directory for GitHub Pages
const docsDir = path.join(__dirname, 'docs');
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir);
}

// Copy public assets to docs
const publicDir = path.join(__dirname, 'public');
const docsAssetsDir = path.join(docsDir, 'assets');

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const files = fs.readdirSync(src);
  files.forEach(file => {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);
    
    if (fs.statSync(srcFile).isDirectory()) {
      copyDir(srcFile, destFile);
    } else {
      fs.copyFileSync(srcFile, destFile);
    }
  });
}

// Copy assets
copyDir(path.join(publicDir, 'assets'), docsAssetsDir);

// Create static-friendly main.js (remove server dependencies)
const mainJsPath = path.join(__dirname, 'public', 'assets', 'js', 'main.js');
const staticMainJsPath = path.join(docsAssetsDir, 'js', 'main.js');

let mainJsContent = fs.readFileSync(mainJsPath, 'utf8');

// Replace the location display function with a dynamic worldwide locations version
const staticLocationFunction = `
  /**
   * Initialize location display (dynamic worldwide locations)
   */
  function initLocationDisplay() {
    const locationElement = document.getElementById('location-text');
    if (!locationElement) return;

    // Check if we're on the homepage (index page)
    if (!document.body.classList.contains('index-page')) return;

    // Array of 20 worldwide locations
    const worldwideLocations = [
      'San Francisco, California, USA',
      'Tokyo, Japan',
      'London, England, UK',
      'Sydney, Australia',
      'Dubai, UAE',
      'Singapore',
      'New York, NY, USA',
      'Paris, France',
      'Mumbai, India',
      'São Paulo, Brazil',
      'Toronto, Canada',
      'Berlin, Germany',
      'Seoul, South Korea',
      'Lagos, Nigeria',
      'Mexico City, Mexico',
      'Stockholm, Sweden',
      'Cairo, Egypt',
      'Bangkok, Thailand',
      'Amsterdam, Netherlands',
      'Cape Town, South Africa'
    ];

    function updateLocation() {
      // Get current minute to determine which location to show
      const now = new Date();
      const currentMinute = now.getMinutes();
      
      // Cycle through locations based on current minute
      const locationIndex = currentMinute % worldwideLocations.length;
      const currentLocation = worldwideLocations[locationIndex];
      
      const timeString = now.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      
      locationElement.textContent = \`Last visit from \${currentLocation} at \${timeString}\`;
    }

    // Update location immediately
    updateLocation();
    
    // Update location every minute (60000 milliseconds)
    setInterval(updateLocation, 60000);
  }`;

// Replace the server-dependent location function
mainJsContent = mainJsContent.replace(
  /\/\*\*\s+\* Initialize location display\s+\*\/[\s\S]*?fetchLocation\(\);\s+}/,
  staticLocationFunction
);

// Fix navigation paths in main.js for GitHub Pages
mainJsContent = mainJsContent
  .replace(/window\.location\.href = '\/portfolio'/g, "window.location.href = 'portfolio.html'")
  .replace(/href === '\/'/g, "href === 'index.html'")
  .replace(/href === '\/portfolio'/g, "href === 'portfolio.html'")
  .replace(/href === '\/commlab'/g, "href === 'commlab.html'")
  .replace(/href === '\/photos'/g, "href === 'photos.html'")
  .replace(/currentPath === '\/'/g, "currentPath.includes('index.html') || currentPath.endsWith('/')")
  .replace(/currentPath\.startsWith\('\/portfolio'\)/g, "currentPath.includes('portfolio.html')")
  .replace(/currentPath\.startsWith\('\/commlab'\)/g, "currentPath.includes('commlab.html')")
  .replace(/currentPath\.startsWith\('\/photos'\)/g, "currentPath.includes('photos.html')");

// Write the modified main.js
fs.writeFileSync(staticMainJsPath, mainJsContent);

// Function to render EJS template to HTML
function renderTemplate(templateName, data = {}, outputName = templateName) {
  const templatePath = path.join(__dirname, 'views', `${templateName}.ejs`);
  const outputPath = path.join(docsDir, `${outputName}.html`);
  
  const template = fs.readFileSync(templatePath, 'utf8');
  const html = ejs.render(template, data);
  
  // Fix paths for GitHub Pages deployment
  let fixedHtml = html
    // Fix navigation links
    .replace(/href="\/"/g, 'href="index.html"')
    .replace(/href="\/portfolio"/g, 'href="portfolio.html"')
    .replace(/href="\/commlab"/g, 'href="commlab.html"')
    .replace(/href="\/photos"/g, 'href="photos.html"')
    .replace(/href="\/blog"/g, 'href="blog.html"')
    // Fix project links
    .replace(/href="\/project\//g, 'href="project/')
    // Fix asset paths
    .replace(/href="\/assets\//g, 'href="assets/')
    .replace(/src="\/assets\//g, 'src="assets/')
    // Fix other absolute paths
    .replace(/window\.location\.href = '\/portfolio'/g, "window.location.href = 'portfolio.html'");
  
  fs.writeFileSync(outputPath, fixedHtml);
  console.log(`Generated: ${outputName}.html`);
}

// Render homepage
renderTemplate('index', {}, 'index');

// Render portfolio page
renderTemplate('portfolio', { projects }, 'portfolio');

// Render photos page
renderTemplate('photos', {}, 'photos');

// Render comm lab page
renderTemplate('commlab', {}, 'commlab');

// Render individual project pages
projects.forEach(project => {
  const projectDir = path.join(docsDir, 'project');
  if (!fs.existsSync(projectDir)) {
    fs.mkdirSync(projectDir);
  }
  
  const outputPath = path.join(projectDir, `${project.id}.html`);
  const templatePath = path.join(__dirname, 'views', 'project-detail.ejs');
  
  const template = fs.readFileSync(templatePath, 'utf8');
  const html = ejs.render(template, { project });
  
  // Fix paths for project detail pages (they're in a subdirectory)
  let fixedHtml = html
    // Fix navigation links (project pages are in subdirectory, so need ../)
    .replace(/href="\/"/g, 'href="../index.html"')
    .replace(/href="\/portfolio"/g, 'href="../portfolio.html"')
    .replace(/href="\/commlab"/g, 'href="../commlab.html"')
    .replace(/href="\/photos"/g, 'href="../photos.html"')
    .replace(/href="\/blog"/g, 'href="../blog.html"')
    // Fix back button
    .replace(/href="\/portfolio"/g, 'href="../portfolio.html"')
    // Fix asset paths (project pages need ../ to go up one level)
    .replace(/href="\/assets\//g, 'href="../assets/')
    .replace(/src="\/assets\//g, 'src="../assets/')
    // Fix other absolute paths
    .replace(/window\.location\.href = '\/portfolio'/g, "window.location.href = '../portfolio.html'");
  
  fs.writeFileSync(outputPath, fixedHtml);
  console.log(`Generated: project/${project.id}.html`);
});

// Create a simple blog page without RSS (since GitHub Pages can't run server-side code)
const staticBlogData = {
  posts: [
    {
      title: "Welcome to My Blog",
      snippet: "Check out my latest posts on Medium",
      link: "https://medium.com/@enockmecheo"
    }
  ]
};
renderTemplate('blog', staticBlogData, 'blog');

// Create CNAME file for custom domain (if needed)
// Commented out to avoid conflicts - uncomment and set up DNS if you want custom domain
// fs.writeFileSync(path.join(docsDir, 'CNAME'), 'www.enockmecheo.com');

console.log('Static site generated successfully in docs/ directory!');
console.log('You can now deploy the docs/ directory to GitHub Pages.'); 