# GitHub Pages Deployment Guide


## Quick Setup

1. **Build the static site:**
   ```bash
   npm run build
   ```

2. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Add GitHub Pages deployment"
   git push origin brutalist
   ```

3. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click on "Settings" tab
   - Scroll down to "Pages" section
   - Under "Source", select "GitHub Actions"
   - The workflow will automatically deploy your site

## What happens during build:

- Converts all EJS templates to static HTML files
- Copies all assets (CSS, JS, images) to the `docs/` directory
- Creates a static-friendly version of main.js (removes server dependencies)
- Generates individual project pages
- Creates a CNAME file for custom domain

## Custom Domain Setup (Optional):

If you want to use your custom domain (www.enockmecheo.com):

1. **DNS Settings:**
   - Add a CNAME record pointing `www.enockmecheo.com` to `yourusername.github.io`
   - Or add A records pointing to GitHub Pages IP addresses

2. **GitHub Settings:**
   - Go to repository Settings > Pages
   - Enter your custom domain in the "Custom domain" field
   - Enable "Enforce HTTPS"

## File Structure After Build:

```
docs/
├── index.html          # Homepage
├── portfolio.html      # Portfolio page
├── photos.html         # Photos page
├── commlab.html        # Comm Lab projects
├── blog.html           # Blog page (static)
├── project/            # Individual project pages
│   ├── assignflow.html
│   ├── calmingspace.html
│   └── ...
├── assets/             # All CSS, JS, and images
│   ├── css/
│   ├── js/
│   └── img/
└── CNAME              # Custom domain file

```

## Differences from Server Version:

- **No dynamic content**: Blog posts are static, location API is replaced with static text
- **No server-side rendering**: All pages are pre-built HTML
- **Faster loading**: Static files are served directly by GitHub's CDN
- **Free hosting**: No server costs

## Troubleshooting:

- If deployment fails, check the Actions tab for error logs
- Make sure all dependencies are in package.json
- Verify that the build script runs successfully locally
- Check that all file paths are relative (no absolute paths)

## Benefits of GitHub Pages:

✅ **Free hosting**  
✅ **Automatic HTTPS**  
✅ **Global CDN**  
✅ **Custom domain support**  
✅ **Automatic deployments**  
✅ **No server maintenance**  

Your site will be available at:
- `https://yourusername.github.io/portfolioServer` (default)
- `https://www.enockmecheo.com` (with custom domain) 