#!/bin/bash

# PortfolioServer HTTPS Setup Script
# This script sets up HTTPS for enockmecheo.com using Let's Encrypt

# Exit on error
set -e

# Set domains to include both www and non-www versions
PRIMARY_DOMAIN="enockmecheo.com"
WWW_DOMAIN="www.enockmecheo.com"
EMAIL="your-email@example.com"  # Placeholder - real email is set via GitHub secrets

echo "=== Setting up HTTPS for $PRIMARY_DOMAIN and $WWW_DOMAIN ==="

# Check if running as root
if [ "$(id -u)" -ne 0 ]; then
    echo "This script must be run as root or with sudo"
    exit 1
fi

# Install Certbot if not already installed
if ! command -v certbot &> /dev/null; then
    echo "Installing Certbot..."
    apt-get update
    apt-get install -y certbot python3-certbot-nginx
fi

# Ensure Nginx is installed
if ! command -v nginx &> /dev/null; then
    echo "Installing Nginx..."
    apt-get install -y nginx
fi

# Create Nginx configuration for both domains
echo "Creating Nginx configuration for $PRIMARY_DOMAIN and $WWW_DOMAIN..."
cat > /etc/nginx/sites-available/$PRIMARY_DOMAIN << EOF
server {
    listen 80;
    server_name $PRIMARY_DOMAIN $WWW_DOMAIN;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

# Enable the site
if [ ! -f /etc/nginx/sites-enabled/$PRIMARY_DOMAIN ]; then
    ln -s /etc/nginx/sites-available/$PRIMARY_DOMAIN /etc/nginx/sites-enabled/
fi

# Test Nginx configuration
nginx -t

# Restart Nginx
systemctl restart nginx

# Obtain SSL certificate for both domains
echo "Obtaining SSL certificate from Let's Encrypt..."
certbot --nginx -d $PRIMARY_DOMAIN -d $WWW_DOMAIN --non-interactive --agree-tos --email $EMAIL

# Check if certificate was installed successfully
if [ -d "/etc/letsencrypt/live/$PRIMARY_DOMAIN" ]; then
    echo "SSL certificate installed successfully!"
else
    echo "Failed to install SSL certificate. Check the certbot logs."
    exit 1
fi

# Add cron job for auto-renewal if not already added
if ! crontab -l | grep -q 'certbot renew'; then
    (crontab -l 2>/dev/null; echo "0 3 * * * certbot renew --quiet") | crontab -
    echo "Added automatic renewal cron job"
fi

echo "=== HTTPS Setup Complete ==="
echo "Your site should now be accessible at:"
echo "  https://$PRIMARY_DOMAIN"
echo "  https://$WWW_DOMAIN"
echo ""
echo "To check the status of your SSL certificate:"
echo "  certbot certificates"
echo ""
echo "To test auto-renewal:"
echo "  certbot renew --dry-run"