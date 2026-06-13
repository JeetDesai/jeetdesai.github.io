# Jeet Desai - Portfolio Platform

A high-performance, production-ready Rails portfolio/CMS website with SSG prerendering, minimal JS, and <1s page loads.

**Live:** [jeet-desai.dev](https://jeet-desai.dev)  
**Target:** <1s load time, 99.9% uptime, OWASP security

---

## 🎯 Quick Overview

### Architecture
```
Rails CMS Backend → PostgreSQL + Redis
         ↓
   Prerendering Engine
         ↓
  Static HTML CDN (Cloudflare)
         ↓
    Visitor (50-100ms latency)
```

### Key Features
- ✅ **Featured Projects** — Portfolio showcase with case study metrics
- ✅ **Blog/Articles** — Full-text search with PostgreSQL tsvector
- ✅ **Testimonials** — Social proof with project associations
- ✅ **Contact Form** — Email notifications, rate-limiting, validation
- ✅ **Tech Stack Viz** — Dynamic skills display
- ✅ **SEO Optimized** — Sitemap, meta tags, structured data
- ✅ **Mobile-First** — Responsive design, zero layout shift
- ✅ **Admin CMS** — Simple content management without auth complexity

### Performance Targets
| Metric | Target | Current |
|--------|--------|---------|
| FCP | <500ms | __ |
| LCP | <1s | __ |
| Lighthouse | >90/100 | __ |
| Cache Hit % | >95% | __ |

---

## 📚 Documentation

Start here based on your goal:

### For Architects & Designers
- **[ARCHITECTURE.md](ARCHITECTURE.md)** — Design decisions, trade-offs, system diagram, scaling strategy
- **[PERFORMANCE_CHECKLIST.md](IMPLEMENTATION_ROADMAP.md#performance-checklist)** — Web vitals, optimization techniques

### For Developers
- **[SCAFFOLD_COMMANDS.md](SCAFFOLD_COMMANDS.md)** — Step-by-step Rails setup (phases 1-7)
- **[VIEWS_TEMPLATES.md](VIEWS_TEMPLATES.md)** — HTML/ERB templates for all pages
- **[IMPLEMENTATION_ROADMAP.md](IMPLEMENTATION_ROADMAP.md)** — 4-week timeline with checkpoints

### For DevOps/Deployment
- **[DEPLOYMENT_CONFIG.md](DEPLOYMENT_CONFIG.md)** — Docker, Kamal, GitHub Actions, Nginx
- **[.env.example](.env.example)** — Environment variable template

---

## 🚀 Quick Start (5 minutes)

### Prerequisites
- Ruby 3.3+
- PostgreSQL 16+
- Redis 7+
- Docker (optional, recommended)

### Option 1: Docker (Recommended)
```bash
# Clone & setup
git clone <repo> && cd profile
docker-compose up -d

# Initialize
docker-compose exec web bin/rails db:create db:migrate db:seed

# Visit http://localhost:3000
```

### Option 2: Local Development
```bash
# Install dependencies
bundle install
bin/rails db:create db:migrate db:seed

# Start server
bin/rails server

# In another terminal, start background jobs
bundle exec sidekiq

# Visit http://localhost:3000
```

### Admin Access
- URL: `http://localhost:3000/admin`
- Default: HTTP Basic Auth (username/password in `.env`)

---

## 📋 Project Structure

```
app/
├── models/               # Project, Article, Testimonial, ContactMessage
├── controllers/
│   ├── pages_controller.rb          # Home, About
│   ├── projects_controller.rb       # Portfolio
│   ├── articles_controller.rb       # Blog + search
│   ├── contacts_controller.rb       # Contact form
│   └── admin/                       # Admin CRUD
├── views/                           # ERB templates (Tailwind CSS)
├── jobs/                            # Async jobs (email, prerender)
└── services/                        # Business logic (search, cache)

config/
├── database.yml          # PostgreSQL
├── puma.rb              # 3 workers, 5 threads
└── routes.rb            # RESTful endpoints

lib/tasks/
├── prerender.rake       # Generate static HTML
├── search_index.rake    # Full-text indexing
└── sitemap.rake         # SEO sitemap

db/
├── migrate/             # Schema migrations
├── seeds.rb             # Test data
└── schema.rb            # Current schema

public/
├── prerendered/         # Static HTML output (generated)
└── assets/              # CSS, minimal JS

docker/
├── Dockerfile           # Multi-stage build
├── compose.yml          # Postgres + Redis
└── entrypoint.sh
```

---

## 🛠️ Development Workflow

### 1. Run Tests
```bash
# Test suite (RSpec)
bin/rspec

# View coverage
open coverage/index.html
```

### 2. Database Migrations
```bash
# Create migration
bin/rails generate migration AddFieldToProjects

# Run migrations
bin/rails db:migrate
```

### 3. Add New Feature
```bash
# Generate controller
bin/rails generate controller Projects

# Generate model
bin/rails generate model Article title:string

# Create job
bin/rails generate job SendEmailNotification
```

### 4. Prerender & Cache
```bash
# Prerender all pages to static HTML
bin/rake prerender:all

# Clear cache
bin/rails cache:clear

# Regenerate sitemap
bin/rake sitemap:refresh:no_ping
```

---

## 📊 Database Schema

### Projects
```sql
CREATE TABLE projects (
  id BIGINT PRIMARY KEY,
  title VARCHAR NOT NULL,
  slug VARCHAR UNIQUE NOT NULL,
  description TEXT,
  challenge TEXT,
  solution TEXT,
  results JSONB,
  technologies TEXT[],
  url VARCHAR,
  featured BOOLEAN,
  published_at TIMESTAMP,
  created_at TIMESTAMP
);
CREATE INDEX projects_featured ON projects(featured);
CREATE INDEX projects_published_at ON projects(published_at);
```

### Articles (with Full-Text Search)
```sql
CREATE TABLE articles (
  id BIGINT PRIMARY KEY,
  title VARCHAR NOT NULL,
  slug VARCHAR UNIQUE NOT NULL,
  content TEXT,
  excerpt VARCHAR,
  tags TEXT[],
  published_at TIMESTAMP,
  tsv TSVECTOR,  -- PostgreSQL full-text search
  created_at TIMESTAMP
);
CREATE INDEX articles_tsv ON articles USING GIN(tsv);
```

### ContactMessages
```sql
CREATE TABLE contact_messages (
  id BIGINT PRIMARY KEY,
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  subject VARCHAR,
  message TEXT NOT NULL,
  responded BOOLEAN,
  notes TEXT,
  created_at TIMESTAMP
);
CREATE INDEX contact_messages_responded ON contact_messages(responded);
```

See [ARCHITECTURE.md](ARCHITECTURE.md) for full schema design.

---

## 🚀 Deployment

### To Staging (First Deploy)
```bash
# Setup server (first time)
kamal setup

# View logs
kamal app logs -f

# SSH into server
kamal app exec -i bash
```

### To Production (CI/CD Automated)
```bash
# Push to main branch (GitHub Actions handles it)
git push origin main

# Monitor deployment
kamal app logs -f

# Rollback if needed
kamal rollback
```

### Configuration Files
- **[Dockerfile](Dockerfile)** — Container build
- **[config/deploy.yml](config/deploy.yml)** — Kamal deployment
- **.github/workflows/deploy.yml** — Auto-deploy on push
- **[Nginx config](DEPLOYMENT_CONFIG.md#nginx-reverse-proxy)** — Reverse proxy + SSL

See [DEPLOYMENT_CONFIG.md](DEPLOYMENT_CONFIG.md) for complete setup.

---

## 🔒 Security

### OWASP Checklist
- ✅ **SQL Injection:** Rails ORM + parameterized queries
- ✅ **CSRF:** Default Rails CSRF protection
- ✅ **XSS:** HTML auto-escaping in ERB templates
- ✅ **Authentication:** HTTP Basic Auth for /admin (IP whitelist optional)
- ✅ **Rate Limiting:** Rack::Attack (contact form: 5/hour per IP)
- ✅ **Dependencies:** bundle audit (automated via CI)
- ✅ **Secrets:** .env file (never commit to git)
- ✅ **HTTPS:** Let's Encrypt SSL (free)

### Environment Variables
Never hardcode secrets. Use `.env`:
```bash
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
SENDGRID_API_KEY=...
SENTRY_DSN=...
ADMIN_USERNAME=...
ADMIN_PASSWORD=...
```

See [.env.example](.env.example) for template.

---

## 📈 Monitoring & Observability

### Real-Time Metrics
- **Sentry** — Error tracking + performance monitoring
- **Cloudflare Analytics** — CDN performance, bot traffic
- **UptimeRobot** — Uptime monitoring
- **New Relic** (optional) — Full APM

### Health Check Endpoint
```bash
curl https://jeet-desai.dev/health
# {"status":"ok","database":"connected","redis":"connected"}
```

### Check Cache Performance
```bash
# SSH into server
kamal app exec -i bash
redis-cli info stats
# Confirms >95% cache hit ratio
```

---

## 📚 Gems & Dependencies

### Core Stack
| Gem | Purpose | Alternative |
|-----|---------|-------------|
| `rails` | Web framework | None (best-in-class) |
| `pg` | PostgreSQL adapter | mysql2, sqlite3 |
| `puma` | Web server | WEBrick, Passenger |
| `redis` | Caching | Memcached |
| `stimulus-rails` | Minimal JS | React, Vue (too heavy) |
| `pagy` | Pagination | Kaminari (slower) |
| `pundit` | Authorization | CanCan (overkill) |
| `sitemap_generator` | SEO sitemap | Manual Rake task |
| `sendgrid-ruby` | Email service | Mailgun, AWS SES |
| `sentry-ruby` | Error tracking | Rollbar, Bugsnag |

### Development/Testing
- `rspec-rails` — Testing framework
- `factory_bot_rails` — Test fixtures
- `faker` — Fake data generation

---

## 📝 Admin Features

### Content Management
- **Projects** — CRUD with thumbnail + gallery images
- **Articles** — CRUD with Markdown editor, tags, scheduling
- **Testimonials** — CRUD with project assignment
- **Contact Messages** — Inbox view, reply functionality

### Dashboard
- Overview: projects count, recent articles, contact inbox
- System health: Redis, database connection status
- Last prerender timestamp

### Access Control
```bash
# HTTP Basic Auth (username/password in .env)
curl -u $ADMIN_USERNAME:$ADMIN_PASSWORD http://localhost:3000/admin

# Optional: IP whitelist
config.admin_ip_whitelist = ['192.168.1.1']
```

---

## 🎯 Performance Optimization

### 1. Prerendering
```bash
# Generates static HTML for all pages
bin/rake prerender:all

# Output: /public/prerendered/{index,about,projects/*,articles/*}.html
```

### 2. Caching Layers
```ruby
# Application cache (Redis)
Rails.cache.fetch('featured_projects', expires_in: 1.day) do
  Project.published.featured
end

# HTTP cache headers (CDN)
Cache-Control: public, max-age=86400
```

### 3. Database Optimization
- Indexes on `slug`, `published_at`, `featured`
- PostgreSQL full-text search for articles
- Eager loading: `.includes(:projects, :tags)`

### 4. Asset Optimization
- CSS: Tailwind purged to ~15KB
- JS: Stimulus.js (~12KB)
- Images: WebP + JPEG, lazy loading

---

## 🐛 Troubleshooting

### Pages load slowly
```bash
# Check slow queries in logs
tail -f log/development.log | grep "SELECT"

# Profile with RSpec
bin/rspec --profile

# Add indexes
bin/rails db:index
```

### Cache not working
```bash
# Verify Redis connection
redis-cli ping  # Should return PONG

# Clear cache
bin/rails cache:clear

# Check Rails cache configuration
bin/rails console > Rails.cache.class
```

### Prerender fails
```bash
# Run with verbose output
bin/rake prerender:all VERBOSE=true

# Check for template errors
bin/rails render template_path
```

### Contact form emails not sending
```bash
# Check SendGrid config
echo $SENDGRID_API_KEY

# Test email in console
ContactMessage.last.send_notification_email

# Start background job worker
bundle exec sidekiq
```

See [IMPLEMENTATION_ROADMAP.md](IMPLEMENTATION_ROADMAP.md#troubleshooting-common-issues) for more.

---

## 📞 Support & Contributing

### Questions?
Open an issue on GitHub or check documentation files.

### Contributing
1. Fork repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Run tests: `bin/rspec`
4. Commit changes: `git commit -m "Add new feature"`
5. Push: `git push origin feature/new-feature`
6. Open Pull Request

---

## 📄 License

This project is open-source under the MIT License. See `LICENSE` for details.

---

## 🎓 Learning Resources

### Rails Best Practices
- [The Rails Way](https://pragprog.com/titles/rails61/agile-web-development-with-rails-6-1/)
- [Rails API Documentation](https://guides.rubyonrails.org/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

### Performance Optimization
- [Rails Performance Guide](https://guides.rubyonrails.org/performance_testing.html)
- [Web Vitals](https://web.dev/vitals/)
- [Cloudflare Performance](https://www.cloudflare.com/learning/performance/)

### Security
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Rails Security Guide](https://guides.rubyonrails.org/security.html)

---

## 🗺️ Next Steps

1. **Read the documentation:**
   - [ ] [ARCHITECTURE.md](ARCHITECTURE.md) — Understand the design
   - [ ] [SCAFFOLD_COMMANDS.md](SCAFFOLD_COMMANDS.md) — Build the app
   - [ ] [VIEWS_TEMPLATES.md](VIEWS_TEMPLATES.md) — Implement views

2. **Build locally:**
   ```bash
   docker-compose up -d
   docker-compose exec web bin/rails db:seed
   # Visit http://localhost:3000
   ```

3. **Customize content:**
   - Add your projects to `/admin/projects`
   - Write articles in `/admin/articles`
   - Configure testimonials in `/admin/testimonials`

4. **Deploy to production:**
   - Follow [DEPLOYMENT_CONFIG.md](DEPLOYMENT_CONFIG.md)
   - Setup Kamal, GitHub Actions, Cloudflare
   - Monitor with Sentry, UptimeRobot

---

**Built with Rails 7.1, PostgreSQL, Redis, Tailwind CSS, and ❤️ by Jeet Desai**
