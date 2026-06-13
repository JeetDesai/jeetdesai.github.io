# Portfolio Platform - Deployment & Docker Configuration

## Dockerfile (Multi-stage Build)
Create `Dockerfile`:

```dockerfile
# Stage 1: Builder
FROM ruby:3.3-slim as builder

# Install build dependencies
RUN apt-get update && apt-get install -y \
  build-essential \
  git \
  postgresql-client \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy Gemfile
COPY Gemfile Gemfile.lock ./

# Bundle gems
RUN bundle install --without development test --deployment

# Stage 2: Runtime
FROM ruby:3.3-slim

# Install runtime dependencies
RUN apt-get update && apt-get install -y \
  postgresql-client \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy bundled gems from builder
COPY --from=builder /usr/local/bundle /usr/local/bundle

# Copy application code
COPY . .

# Set environment
ENV RAILS_ENV=production \
    RAILS_LOG_TO_STDOUT=true \
    BUNDLE_DEPLOYMENT=true

# Precompile assets
RUN bundle exec rake assets:precompile

# Create non-root user
RUN useradd -m -u 1000 appuser && chown -R appuser:appuser /app
USER appuser

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

EXPOSE 3000

CMD ["bundle", "exec", "puma"]
```

---

## Docker Compose (Local Development)
Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  # PostgreSQL Database
  postgres:
    image: postgres:16-alpine
    container_name: portfolio-postgres
    environment:
      POSTGRES_USER: portfolio_user
      POSTGRES_PASSWORD: portfolio_password
      POSTGRES_DB: portfolio_development
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U portfolio_user"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Redis Cache
  redis:
    image: redis:7-alpine
    container_name: portfolio-redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Rails Application
  web:
    build: .
    container_name: portfolio-web
    command: bundle exec puma -b 0.0.0.0
    environment:
      DATABASE_URL: postgresql://portfolio_user:portfolio_password@postgres:5432/portfolio_development
      REDIS_URL: redis://redis:6379/1
      RAILS_ENV: development
      RAILS_LOG_TO_STDOUT: "true"
    volumes:
      - .:/app
      - /app/node_modules
    ports:
      - "3000:3000"
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 3s
      retries: 3

volumes:
  postgres_data:
  redis_data:
```

**Start locally:**
```bash
docker-compose up -d
docker-compose exec web bin/rails db:create db:migrate db:seed
# Visit http://localhost:3000
```

---

## Kamal Deployment Configuration
Create `config/deploy.yml`:

```yaml
# Kamal configuration for portfolio deployment

service: portfolio
image: jeet-desai/portfolio

# Docker registry (Docker Hub)
registry:
  server: docker.io
  username: <%= ENV['REGISTRY_USERNAME'] %>
  password: <%= ENV['REGISTRY_PASSWORD'] %>

# Production server
servers:
  web:
    hosts:
      - 1.2.3.4  # Replace with your server IP
    options:
      network: bridge

# Environment variables
env:
  clear:
    RAILS_ENV: production
    RAILS_LOG_TO_STDOUT: "true"
    RAILS_MASTER_KEY: <%= ENV['RAILS_MASTER_KEY'] %>
  
  secret:
    - DATABASE_URL
    - REDIS_URL
    - SENDGRID_API_KEY
    - SENTRY_DSN
    - ADMIN_USERNAME
    - ADMIN_PASSWORD

# Docker build settings
builder:
  args:
    RUBY_VERSION: 3.3.0
    RAILS_ENV: production
  cache:
    type: gha  # GitHub Actions cache

# Container configuration
volumes:
  - "/data/portfolio/public/prerendered:/app/public/prerendered"
  - "/data/portfolio/storage:/app/storage"

# Sidekiq background jobs (optional)
accessories:
  redis:
    image: redis:7-alpine
    server: 1.2.3.4
    port: 6379
    env:
      clear:
        - REDIS_REPLICATION_MODE=master

# Pre-deploy hooks
hooks:
  pre-deploy:
    - hook: cmd
      cmd: "echo 'Starting deployment...'"

# Post-deploy hooks
hooks:
  post-deploy:
    - hook: cmd
      cmd: "bin/rails db:migrate"
    - hook: cmd
      cmd: "bin/rake prerender:all"

# SSH key for deployment
ssh:
  user: deploy

# Rollback configuration
boot:
  limit: 5  # Keep last 5 images for quick rollback
```

**Setup & Deploy:**
```bash
# First-time setup
kamal setup

# Deploy application
kamal deploy

# View logs
kamal app logs -f

# SSH into server
kamal app exec -i bash

# Rollback to previous version
kamal rollback

# Stop application
kamal stop
```

---

## GitHub Actions CI/CD

### Workflow 1: Test & Lint
Create `.github/workflows/test.yml`:

```yaml
name: Test & Lint

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:16-alpine
        env:
          POSTGRES_USER: portfolio_user
          POSTGRES_PASSWORD: portfolio_password
          POSTGRES_DB: portfolio_test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432
      
      redis:
        image: redis:7-alpine
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 6379:6379

    steps:
      - uses: actions/checkout@v4

      - name: Set up Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: 3.3.0
          bundler-cache: true

      - name: Setup test database
        env:
          DATABASE_URL: postgresql://portfolio_user:portfolio_password@localhost:5432/portfolio_test
          REDIS_URL: redis://localhost:6379
        run: |
          bin/rails db:create db:migrate

      - name: Run RSpec
        env:
          DATABASE_URL: postgresql://portfolio_user:portfolio_password@localhost:5432/portfolio_test
          REDIS_URL: redis://localhost:6379
        run: bundle exec rspec

      - name: Run Rubocop
        run: bundle exec rubocop

      - name: Security audit
        run: bundle audit

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/.resultset.json
```

### Workflow 2: Deploy to Production
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]
  workflow_dispatch:  # Manual trigger

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4

      - name: Set up Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: 3.3.0

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2

      - name: Log in to Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.REGISTRY_USERNAME }}
          password: ${{ secrets.REGISTRY_PASSWORD }}

      - name: Build and push Docker image
        uses: docker/build-push-action@v4
        with:
          context: .
          push: true
          tags: |
            ${{ secrets.REGISTRY_USERNAME }}/portfolio:latest
            ${{ secrets.REGISTRY_USERNAME }}/portfolio:${{ github.sha }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

      - name: Deploy with Kamal
        env:
          KAMAL_REGISTRY_PASSWORD: ${{ secrets.REGISTRY_PASSWORD }}
          RAILS_MASTER_KEY: ${{ secrets.RAILS_MASTER_KEY }}
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          REDIS_URL: ${{ secrets.REDIS_URL }}
          SENDGRID_API_KEY: ${{ secrets.SENDGRID_API_KEY }}
          SENTRY_DSN: ${{ secrets.SENTRY_DSN }}
        run: |
          gem install kamal
          kamal deploy

      - name: Notify Slack on success
        uses: 8398a7/action-slack@v3
        if: success()
        with:
          status: ${{ job.status }}
          text: "✅ Portfolio deployed successfully!"
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}

      - name: Notify Slack on failure
        uses: 8398a7/action-slack@v3
        if: failure()
        with:
          status: ${{ job.status }}
          text: "❌ Portfolio deployment failed!"
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

---

## GitHub Actions Secrets Setup

Add these secrets to your GitHub repository (Settings → Secrets → Actions):

```yaml
REGISTRY_USERNAME=jeet-desai
REGISTRY_PASSWORD=***your_docker_hub_token***

RAILS_MASTER_KEY=***run: bin/rails secret***

DATABASE_URL=postgresql://user:pass@host:5432/production_db
REDIS_URL=redis://redis-host:6379

SENDGRID_API_KEY=***your_sendgrid_key***
SENTRY_DSN=https://***your_sentry_dsn***

ADMIN_USERNAME=admin
ADMIN_PASSWORD=***strong_password***

SLACK_WEBHOOK=https://hooks.slack.com/services/***your_webhook***
```

---

## Production Server Setup (DigitalOcean/Linode)

### Initial Setup Script
Create `scripts/setup_server.sh`:

```bash
#!/bin/bash
set -e

# Update system
apt-get update && apt-get upgrade -y

# Install Docker
apt-get install -y docker.io docker-compose-v2 git curl

# Create deploy user
useradd -m -s /bin/bash deploy || true
usermod -aG docker deploy

# Create data directories
mkdir -p /data/portfolio/{public/prerendered,storage,postgres,redis}
chown -R deploy:deploy /data/portfolio

# Install Kamal
apt-get install -y ruby ruby-dev
gem install kamal --no-document

# Setup firewall
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable

# Install SSL certificate (Let's Encrypt)
apt-get install -y certbot python3-certbot-nginx
certbot certonly --standalone -d jeet-desai.dev

echo "✅ Server setup complete!"
echo "Next: Configure DNS and deploy with: kamal setup && kamal deploy"
```

**Run:**
```bash
ssh root@your_server_ip < scripts/setup_server.sh
```

---

## Nginx Reverse Proxy (Optional, if not using Kamal's built-in)
Create `/etc/nginx/sites-available/portfolio`:

```nginx
upstream portfolio {
  server 127.0.0.1:3000 max_fails=3 fail_timeout=30s;
  keepalive 32;
}

server {
  listen 80;
  server_name jeet-desai.dev www.jeet-desai.dev;
  
  # Redirect HTTP to HTTPS
  return 301 https://$server_name$request_uri;
}

server {
  listen 443 ssl http2;
  server_name jeet-desai.dev www.jeet-desai.dev;
  
  # SSL Certificate (Let's Encrypt)
  ssl_certificate /etc/letsencrypt/live/jeet-desai.dev/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/jeet-desai.dev/privkey.pem;
  ssl_protocols TLSv1.2 TLSv1.3;
  ssl_ciphers HIGH:!aNULL:!MD5;
  
  # Security Headers
  add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
  add_header X-Content-Type-Options "nosniff" always;
  add_header X-Frame-Options "SAMEORIGIN" always;
  add_header X-XSS-Protection "1; mode=block" always;
  add_header Referrer-Policy "strict-origin-when-cross-origin" always;
  
  # Gzip compression
  gzip on;
  gzip_types text/plain text/css text/xml text/javascript 
             application/x-javascript application/xml+rss application/javascript;
  gzip_min_length 1000;
  
  # Cache static assets (1 year)
  location ~* ^/assets/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }
  
  # Prerendered static pages (24 hours)
  location / {
    expires 24h;
    add_header Cache-Control "public, max-age=86400";
    proxy_pass http://portfolio;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_http_version 1.1;
    proxy_set_header Connection "";
  }
  
  # Admin (no cache)
  location /admin {
    expires -1;
    add_header Cache-Control "no-store, no-cache, must-revalidate, proxy-revalidate";
    proxy_pass http://portfolio;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

**Enable:**
```bash
ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
nginx -t && systemctl restart nginx
```

---

## Environment Variables Template
Create `.env.example`:

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/portfolio_production

# Redis Cache
REDIS_URL=redis://localhost:6379/1

# Rails
RAILS_ENV=production
RAILS_LOG_TO_STDOUT=true
RAILS_MASTER_KEY=<generate with: bin/rails secret>

# Admin Authentication
ADMIN_USERNAME=admin
ADMIN_PASSWORD=<secure password>

# Email (SendGrid)
SENDGRID_API_KEY=<your_sendgrid_api_key>
SENDGRID_FROM_EMAIL=hello@jeet-desai.dev

# Error Tracking (Sentry)
SENTRY_DSN=<your_sentry_dsn>

# AWS S3 (for images, optional)
AWS_ACCESS_KEY_ID=<your_aws_key>
AWS_SECRET_ACCESS_KEY=<your_aws_secret>
AWS_S3_BUCKET=portfolio-bucket
AWS_REGION=us-east-1
```

**Setup:**
```bash
cp .env.example .env
# Edit .env with your actual values
# Never commit .env to git (should be in .gitignore)
```

---

## Production Health Check
Create `app/controllers/health_controller.rb`:

```ruby
class HealthController < ApplicationController
  skip_forgery_protection

  def status
    render json: {
      status: 'ok',
      timestamp: Time.current.iso8601,
      rails_env: Rails.env,
      database: check_database,
      redis: check_redis
    }
  end

  private

  def check_database
    ActiveRecord::Base.connection.execute('SELECT 1')
    'connected'
  rescue
    'error'
  end

  def check_redis
    Rails.cache.write('health_check', 'ok', expires_in: 1.second)
    Rails.cache.read('health_check') == 'ok' ? 'connected' : 'error'
  rescue
    'error'
  end
end
```

Add to `config/routes.rb`:
```ruby
get '/health', to: 'health#status'
```

---

## Monitoring Setup (Cloudflare)

### Cloudflare Configuration
```yaml
# Caching Rules
Rule 1:
  Path: /
  TTL: 24 hours
  Cache Level: Cache Everything
  
Rule 2:
  Path: /projects/*
  TTL: 7 days
  
Rule 3:
  Path: /articles/*
  TTL: 7 days
  
Rule 4:
  Path: /admin/*
  TTL: 0 (Bypass)
  
# Security
  DDoS Protection: Enabled
  WAF: Enabled
  Bot Management: Enabled (Free tier)
```

### Cache Purge Webhook (Optional)
Trigger from Rails after content updates:
```ruby
# app/models/article.rb
after_save :purge_cloudflare_cache

private

def purge_cloudflare_cache
  CloudflareService.purge_cache([
    "/articles/#{slug}",
    "/search"
  ])
end
```

---

## Makefile (Quick Commands)
Create `Makefile`:

```makefile
.PHONY: help setup dev test deploy clean

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

setup: ## Setup development environment
	docker-compose up -d
	docker-compose exec web bin/rails db:create db:migrate db:seed

dev: ## Start development server
	docker-compose up

test: ## Run tests
	docker-compose exec web bin/rspec

deploy: ## Deploy to production
	kamal deploy

logs: ## View application logs
	kamal app logs -f

clean: ## Clean up Docker containers and volumes
	docker-compose down -v

console: ## Rails console
	docker-compose exec web bin/rails console

migrate: ## Run pending migrations
	docker-compose exec web bin/rails db:migrate

seed: ## Seed test data
	docker-compose exec web bin/rails db:seed

prerender: ## Prerender all static pages
	docker-compose exec web bin/rake prerender:all

ssh: ## SSH into production server
	kamal app exec -i bash

rollback: ## Rollback to previous deployment
	kamal rollback
```

**Usage:**
```bash
make help      # Show all commands
make setup     # Setup environment
make dev       # Start dev server
make test      # Run tests
make deploy    # Deploy to production
```

---

## Quick Start Script
Create `scripts/quickstart.sh`:

```bash
#!/bin/bash
set -e

echo "🚀 Portfolio Platform - Quick Start"
echo "===================================="

# Step 1: Create Rails app
if [ ! -d "config" ]; then
  echo "📦 Creating Rails 7.1 application..."
  rails new . \
    --database=postgresql \
    --skip-javascript \
    --skip-bundle \
    --css=tailwind \
    --force
fi

# Step 2: Update Gemfile
echo "📦 Updating Gemfile..."
bundle install

# Step 3: Setup database
echo "🗄️  Setting up database..."
bin/rails db:create

# Step 4: Copy configuration files
echo "⚙️  Copying configuration files..."
cp SCAFFOLD_COMMANDS.md docs/
cp VIEWS_TEMPLATES.md docs/

# Step 5: Generate models
echo "📋 Generating models..."
bin/rails generate model Project \
  title:string slug:string:uniq description:text challenge:text solution:text \
  results:jsonb technologies:text url:string featured:boolean:indexed published_at:datetime
  
bin/rails generate model Article \
  title:string slug:string:uniq content:text excerpt:string tags:text published_at:datetime

bin/rails generate model Testimonial \
  author_name:string author_title:string author_image_url:string content:text project:references featured:boolean

bin/rails generate model ContactMessage \
  name:string email:string subject:string message:text responded:boolean:indexed notes:text

# Step 6: Run migrations
echo "⚠️  Running migrations..."
bin/rails db:migrate

# Step 7: Seed data
echo "🌱 Seeding test data..."
bin/rails db:seed

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Start development server: bin/rails server"
echo "  2. Visit http://localhost:3000"
echo "  3. Read ARCHITECTURE.md for detailed information"
echo ""
```

**Run:**
```bash
bash scripts/quickstart.sh
```

---

**Next:** Follow the Implementation Roadmap in `IMPLEMENTATION_ROADMAP.md` to build your portfolio!
