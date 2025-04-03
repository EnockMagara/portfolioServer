#!/bin/bash

# PortfolioServer Deployment Script
# This script sets up the PortfolioServer application on a production server

# Exit on error
set -e

# Configuration variables
APP_DIR="$PWD"
LOG_DIR="/var/log/portfolio"
SERVICE_NAME="portfolio"

echo "=== PortfolioServer Deployment ==="
echo "Deploying to: $APP_DIR"

# Create log directory if it doesn't exist
if [ ! -d "$LOG_DIR" ]; then
    echo "Creating log directory: $LOG_DIR"
    sudo mkdir -p $LOG_DIR
    sudo chown -R $(whoami):$(whoami) $LOG_DIR
fi

# Install dependencies
echo "Installing dependencies..."
npm install

# Create the systemd service file
echo "Creating systemd service file..."
cat > /tmp/portfolio.service << EOF
[Unit]
Description=PortfolioServer - Enock Mecheo's Portfolio Website
After=network.target

[Service]
User=$(whoami)
WorkingDirectory=$APP_DIR
ExecStart=/usr/bin/node $APP_DIR/server.js
Restart=always
RestartSec=10
StandardOutput=append:$LOG_DIR/stdout.log
StandardError=append:$LOG_DIR/stderr.log
Environment=PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

[Install]
WantedBy=multi-user.target
EOF

# Install the service file
echo "Installing systemd service..."
sudo mv /tmp/portfolio.service /etc/systemd/system/$SERVICE_NAME.service
sudo systemctl daemon-reload

# Configure Nginx as reverse proxy if installed
if command -v nginx &> /dev/null; then
    echo "Setting up Nginx reverse proxy..."
    cat > /tmp/portfolio_nginx << EOF
server {
    listen 80;
    server_name enockmecheo.com www.enockmecheo.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

    sudo mv /tmp/portfolio_nginx /etc/nginx/sites-available/portfolio

    # Enable the site if it's not already enabled
    if [ ! -f /etc/nginx/sites-enabled/portfolio ]; then
        sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
    fi

    # Test and reload nginx
    sudo nginx -t && sudo systemctl reload nginx
fi

# Restart the Portfolio service
echo "Restarting Portfolio service..."
sudo systemctl restart $SERVICE_NAME.service
sudo systemctl enable $SERVICE_NAME.service

# Check the service status
echo "Service status:"
sudo systemctl status $SERVICE_NAME.service --no-pager

echo ""
echo "=== Deployment Complete ==="
echo ""
echo "Access the application at:"
echo "  http://$(hostname -I | awk '{print $1}')/"
echo ""
echo "Check logs at:"
echo "  $LOG_DIR/stdout.log"
echo "  $LOG_DIR/stderr.log"
echo ""
echo "Service management commands:"
echo "  sudo systemctl status $SERVICE_NAME.service  # Check status"
echo "  sudo systemctl restart $SERVICE_NAME.service # Restart service"
echo "  sudo systemctl stop $SERVICE_NAME.service    # Stop service"
echo "  sudo journalctl -u $SERVICE_NAME.service     # View service logs"