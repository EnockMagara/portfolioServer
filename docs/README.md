# Portfolio Site - GitHub Pages Deployment

This directory contains the static files for the portfolio website, optimized for GitHub Pages deployment with clean URLs.

## Clean URL System

The site uses a custom 404.html page to handle clean URLs without `.html` extensions. Here's how it works:

### How Clean URLs Work

1. **Direct Access**: When someone visits `/portfolio`, GitHub Pages looks for `portfolio.html`
2. **404 Fallback**: If the file doesn't exist, GitHub Pages serves the `404.html` page
3. **JavaScript Redirect**: The 404.html page contains JavaScript that redirects to the correct `.html` file
4. **Seamless Experience**: Users see clean URLs in their browser, but the site works with `.html` files

### Supported Clean URLs

- `/` → `/index.html`
- `/portfolio` → `/portfolio.html`
- `/commlab` → `/commlab.html`
- `/photos` → `/photos.html`
- `/blog` → `/blog.html`
- `/project/[project-id]` → `/project/[project-id].html`

### Navigation Links

All navigation links in the site use clean URLs (without `.html` extensions). The JavaScript in `main.js` handles the conversion automatically.

### Deployment

1. Push the `docs/` directory to your GitHub repository
2. Enable GitHub Pages in your repository settings
3. Set the source to the `docs/` folder
4. Your site will be available at `https://[username].github.io/[repository-name]/`

### Custom Domain

To use a custom domain:
1. Uncomment the CNAME line in `build-static.js`
2. Set up DNS records pointing to your GitHub Pages site
3. Configure the custom domain in GitHub repository settings

## File Structure

```
docs/
├── index.html          # Homepage
├── portfolio.html      # Projects page
├── commlab.html        # Communication Lab page
├── photos.html         # Photos page
├── blog.html           # Blog page
├── 404.html            # Clean URL handler
├── _config.yml         # GitHub Pages configuration
├── assets/             # CSS, JS, images
└── project/            # Individual project pages
    ├── cloudtrace.html
    ├── hackheist.html
    └── ...
```

## Building the Site

To rebuild the static site:

```bash
node build-static.js
```

This will:
1. Copy all assets to the `docs/` directory
2. Generate HTML files from EJS templates
3. Create the 404.html file for clean URL handling
4. Update all navigation links to use clean URLs 