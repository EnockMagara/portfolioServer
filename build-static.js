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
  .replace(/window\.location\.href = '\/portfolio'/g, "window.location.href = '/portfolio'")
  .replace(/href === '\/'/g, "href === '/' || href === '/index'")
  .replace(/href === '\/portfolio'/g, "href === '/portfolio'")
  .replace(/href === '\/commlab'/g, "href === '/commlab'")
  .replace(/href === '\/photos'/g, "href === '/photos'")
  .replace(/currentPath === '\/'/g, "currentPath === '/' || currentPath.endsWith('/') || currentPath.endsWith('/index')")
  .replace(/currentPath\.startsWith\('\/portfolio'\)/g, "currentPath.startsWith('/portfolio')")
  .replace(/currentPath\.startsWith\('\/commlab'\)/g, "currentPath.startsWith('/commlab')")
  .replace(/currentPath\.startsWith\('\/photos'\)/g, "currentPath.startsWith('/photos')");

// Add clean URL handling for GitHub Pages
const cleanUrlScript = `
  // Clean URL handling for GitHub Pages
  (function() {
    // Function to handle clean URLs
    function handleCleanUrls() {
      const currentPath = window.location.pathname;
      
      // If we're on a clean URL (no .html), we need to handle navigation differently
      if (!currentPath.includes('.html')) {
        // Update all internal links to use clean URLs
        document.querySelectorAll('a[href]').forEach(link => {
          const href = link.getAttribute('href');
          
          // Convert .html links to clean URLs
          if (href.endsWith('.html')) {
            const cleanHref = href.replace('.html', '');
            link.setAttribute('href', cleanHref);
          }
          
          // Handle relative links from project pages
          if (href.startsWith('../') && href.includes('.html')) {
            const cleanHref = href.replace('.html', '');
            link.setAttribute('href', cleanHref);
          }
        });
        
        // Handle form submissions and programmatic navigation
        const originalPushState = history.pushState;
        history.pushState = function(state, title, url) {
          if (url && url.endsWith('.html')) {
            url = url.replace('.html', '');
          }
          return originalPushState.call(this, state, title, url);
        };
      }
    }
    
    // Run on page load
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', handleCleanUrls);
    } else {
      handleCleanUrls();
    }
  })();
`;

// Insert the clean URL script at the beginning of main.js
mainJsContent = cleanUrlScript + '\n' + mainJsContent;

// Write the modified main.js
fs.writeFileSync(staticMainJsPath, mainJsContent);

// Helper to write HTML to subfolder as index.html
function writeToSubfolderIndex(outputDir, html) {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  fs.writeFileSync(path.join(outputDir, 'index.html'), html);
}

// Function to render EJS template to HTML (now outputs to subfolder/index.html)
function renderTemplateToSubfolder(templateName, data = {}, outputSubfolder = templateName) {
  const templatePath = path.join(__dirname, 'views', `${templateName}.ejs`);
  const outputDir = path.join(docsDir, outputSubfolder);
  const template = fs.readFileSync(templatePath, 'utf8');
  const html = ejs.render(template, data);

  // Fix paths for GitHub Pages deployment (use trailing slashes)
  let fixedHtml = html
    .replace(/href="\/(?!assets|project|blog|photos|portfolio|commlab|index)/g, 'href="/')
    .replace(/href="\/portfolio"/g, 'href="/portfolio/"')
    .replace(/href="\/commlab"/g, 'href="/commlab/"')
    .replace(/href="\/photos"/g, 'href="/photos/"')
    .replace(/href="\/blog"/g, 'href="/blog/"')
    .replace(/href="\/project\//g, 'href="/project/')
    .replace(/window\.location\.href = '\/portfolio'/g, "window.location.href = '/portfolio/'");

  // Fix asset paths based on subfolder depth
  if (outputSubfolder === '') {
    // Root level - keep assets paths as is
    fixedHtml = fixedHtml
      .replace(/href="\/assets\//g, 'href="assets/')
      .replace(/src="\/assets\//g, 'src="assets/')
      .replace(/url\('\/assets\//g, "url('assets/");
  } else {
    // Subfolder level - use ../ for assets
    fixedHtml = fixedHtml
      .replace(/href="\/assets\//g, 'href="../assets/')
      .replace(/src="\/assets\//g, 'src="../assets/')
      .replace(/url\('\/assets\//g, "url('../assets/");
  }

  writeToSubfolderIndex(outputDir, fixedHtml);
  console.log(`Generated: ${outputSubfolder}/index.html`);
}

// Render homepage
renderTemplateToSubfolder('index', {}, '');

// Render portfolio page
renderTemplateToSubfolder('portfolio', { projects }, 'portfolio');

// Render photos page
renderTemplateToSubfolder('photos', {}, 'photos');

// Render comm lab page
renderTemplateToSubfolder('commlab', {}, 'commlab');

// Render individual project pages (as /project/[id]/index.html)
projects.forEach(project => {
  const projectDir = path.join(docsDir, 'project', project.id);
  const templatePath = path.join(__dirname, 'views', 'project-detail.ejs');
  const template = fs.readFileSync(templatePath, 'utf8');
  const html = ejs.render(template, { project });

  // Fix paths for project detail pages (they're in a subdirectory)
  let fixedHtml = html
    .replace(/href="\/(?!assets|project|blog|photos|portfolio|commlab|index)/g, 'href="/')
    .replace(/href="\/portfolio"/g, 'href="/portfolio/"')
    .replace(/href="\/commlab"/g, 'href="/commlab/"')
    .replace(/href="\/photos"/g, 'href="/photos/"')
    .replace(/href="\/blog"/g, 'href="/blog/"')
    .replace(/href="\/project\//g, 'href="/project/')
    .replace(/window\.location\.href = '\/portfolio'/g, "window.location.href = '/portfolio/'");

  // Fix asset paths for project pages (two levels deep: /project/[id]/)
  fixedHtml = fixedHtml
    .replace(/href="\/assets\//g, 'href="../../assets/')
    .replace(/src="\/assets\//g, 'src="../../assets/')
    .replace(/url\('\/assets\//g, "url('../../assets/");

  writeToSubfolderIndex(projectDir, fixedHtml);
  console.log(`Generated: project/${project.id}/index.html`);
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
renderTemplateToSubfolder('blog', staticBlogData, 'blog');

// Update 404.html to redirect to subfolder URLs
const fourOhFourHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redirecting...</title>
    <script>
        // Clean URL handling for GitHub Pages (subfolder version)
        (function() {
            const path = window.location.pathname;
            // Map clean URLs to their subfolder equivalents
            const urlMap = {
                '/': '/index.html',
                '/portfolio': '/portfolio/',
                '/portfolio/': '/portfolio/',
                '/commlab': '/commlab/',
                '/commlab/': '/commlab/',
                '/photos': '/photos/',
                '/photos/': '/photos/',
                '/blog': '/blog/',
                '/blog/': '/blog/'
            };
            // Check if this is a project page
            if (path.startsWith('/project/')) {
                const parts = path.split('/').filter(Boolean);
                if (parts.length === 2) {
                    window.location.href = '/project/' + parts[1] + '/';
                    return;
                }
            }
            // Check if we have a direct mapping
            if (urlMap[path]) {
                window.location.href = urlMap[path];
                return;
            }
            // If no mapping found, try adding trailing slash
            if (!path.endsWith('/')) {
                window.location.href = path + '/';
                return;
            }
            // If still no match, redirect to home
            window.location.href = '/';
        })();
    </script>
</head>
<body>
    <p>Redirecting...</p>
</body>
</html>`;

fs.writeFileSync(path.join(docsDir, '404.html'), fourOhFourHtml);
console.log('Generated: 404.html (for clean URL handling)');

// Create CNAME file for custom domain (if needed)
// Commented out to avoid conflicts - uncomment and set up DNS if you want custom domain
// fs.writeFileSync(path.join(docsDir, 'CNAME'), 'www.enockmecheo.com');

console.log('Static site generated successfully in docs/ directory!');
console.log('You can now deploy the docs/ directory to GitHub Pages.');
console.log('Clean URLs will work automatically (e.g., /portfolio instead of /portfolio.html)'); 