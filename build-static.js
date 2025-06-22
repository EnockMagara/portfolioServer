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

// Replace the location display function with a static version
const staticLocationFunction = `
  /**
   * Initialize location display (static version)
   */
  function initLocationDisplay() {
    const locationElement = document.getElementById('location-text');
    if (!locationElement) return;

    // Check if we're on the homepage (index page)
    if (!document.body.classList.contains('index-page')) return;

    // Static location display
    const now = new Date();
    const timeString = now.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    
    locationElement.textContent = \`Portfolio deployed via GitHub Pages at \${timeString}\`;
  }`;

// Replace the server-dependent location function
mainJsContent = mainJsContent.replace(
  /\/\*\*\s+\* Initialize location display\s+\*\/[\s\S]*?fetchLocation\(\);\s+}/,
  staticLocationFunction
);

// Write the modified main.js
fs.writeFileSync(staticMainJsPath, mainJsContent);

// Function to render EJS template to HTML
function renderTemplate(templateName, data = {}, outputName = templateName) {
  const templatePath = path.join(__dirname, 'views', `${templateName}.ejs`);
  const outputPath = path.join(docsDir, `${outputName}.html`);
  
  const template = fs.readFileSync(templatePath, 'utf8');
  const html = ejs.render(template, data);
  
  fs.writeFileSync(outputPath, html);
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
  
  fs.writeFileSync(outputPath, html);
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
fs.writeFileSync(path.join(docsDir, 'CNAME'), 'www.enockmecheo.com');

console.log('Static site generated successfully in docs/ directory!');
console.log('You can now deploy the docs/ directory to GitHub Pages.'); 