# Portfolio Platform - Architecture & Design Document

**Project:** Jeet Desai - Portfolio/CMS  
**Date:** June 13, 2026  
**Target:** <1s load time, SSG-friendly, minimal JS  

---

## 1. SOLUTION OVERVIEW

### Architecture Pattern: Rails CMS + Static Pre-rendering
```
Admin Backend (Rails) → Content Management
     ↓
Prerendering Pipeline (Rake tasks + jbuilder)
     ↓
Static HTML/JSON Files → CDN (Cloudflare)
     ↓
Visitor → CDN Edge → Static HTML (<100ms)
```

### Key Architectural Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Framework** | Rails 7.x | Native SSR, modern conventions, security batteries |
| **Rendering Strategy** | Prerendering + Redis Cache | Static HTML for 99% of traffic; Cache for admin edits |
| **Database** | PostgreSQL | Proven reliability, JSON support for flexible config, simple queries |
| **JavaScript** | Stimulus.js (minimal) | Progressive enhancement—search, form validation, no React bloat |
| **Caching** | Multi-layer: HTTP (CDN) + Redis (app) | Edge caching for <100ms delivery |
| **Prerendering** | Custom Rake tasks + jbuilder | Full control, no external dependencies, <30s build |
| **Deployment** | Docker + Kamal | Container-native, reproducible, easy rollback |
| **CDN** | Cloudflare Free Tier | DDoS protection, edge caching, minification |

### Performance Targets
- **First Contentful Paint (FCP):** <500ms
- **Largest Contentful Paint (LCP):** <1s
- **Page Load:** <1s (99th percentile)
- **Time to Interactive:** <1.5s
- **Cumulative Layout Shift:** <0.1

---

## 2. PROJECT STRUCTURE

```
profile/
├── app/
│   ├── models/
│   │   ├── project.rb              # Portfolio projects
│   │   ├── article.rb              # Blog posts with full-text search
│   │   ├── testimonial.rb          # Social proof
│   │   ├── contact_message.rb      # Form submissions
│   │   └── site_config.rb          # Cache invalidation, SEO metadata
│   │
│   ├── controllers/
│   │   ├── pages_controller.rb     # Home, About (public/cached)
│   │   ├── projects_controller.rb  # Portfolio detail pages
│   │   ├── articles_controller.rb  # Blog index + detail
│   │   ├── search_controller.rb    # Full-text search (articles, projects)
│   │   ├── contacts_controller.rb  # Contact form (no JS required)
│   │   └── admin/
│   │       ├── dashboard_controller.rb
│   │       ├── projects_controller.rb
│   │       ├── articles_controller.rb
│   │       ├── testimonials_controller.rb
│   │       └── contact_messages_controller.rb
│   │
│   ├── views/
│   │   ├── layouts/application.html.erb  # Minimal base layout
│   │   ├── pages/
│   │   │   ├── home.html.erb             # Hero + featured projects
│   │   │   └── about.html.erb            # Experience, skills, tech stack
│   │   ├── projects/
│   │   │   ├── index.html.erb            # Portfolio grid
│   │   │   └── show.html.erb             # Project detail + case study
│   │   ├── articles/
│   │   │   ├── index.html.erb            # Blog listing (paginated)
│   │   │   └── show.html.erb             # Article detail (optimized for reading)
│   │   ├── search/
│   │   │   └── results.html.erb          # Search results (Stimulus.js filter)
│   │   ├── contacts/
│   │   │   └── new.html.erb              # Contact form (no JS for submission)
│   │   └── admin/
│   │       └── [...CRUD views]
│   │
│   ├── services/
│   │   ├── prerender_service.rb          # Orchestrate prerendering
│   │   ├── search_service.rb             # Full-text search logic
│   │   └── cache_invalidation_service.rb # Smart cache busting
│   │
│   ├── jobs/
│   │   ├── prerender_job.rb              # Async prerendering on content update
│   │   └── send_contact_notification_job.rb
│   │
│   └── javascript/
│       └── controllers/
│           ├── search_controller.js      # Real-time search filtering
│           └── form_controller.js        # Form validation, submission states
│
├── db/
│   ├── migrate/
│   │   ├── [timestamp]_create_projects.rb
│   │   ├── [timestamp]_create_articles.rb
│   │   ├── [timestamp]_create_testimonials.rb
│   │   ├── [timestamp]_create_contact_messages.rb
│   │   └── [timestamp]_create_site_configs.rb
│   ├── seeds.rb                          # Seed data (projects, articles, testimonials)
│   └── schema.rb
│
├── lib/
│   ├── tasks/
│   │   ├── prerender.rake                # Prerender all public pages to static HTML
│   │   ├── search_index.rake             # Generate full-text search indexes
│   │   └── sitemap.rake                  # Generate sitemap.xml for SEO
│   └── prerenderer.rb                    # Core prerendering logic
│
├── public/
│   ├── prerendered/                      # Pre-rendered HTML output
│   │   ├── index.html
│   │   ├── about.html
│   │   ├── projects/
│   │   ├── articles/
│   │   └── search.html
│   ├── assets/                           # CSS, minimal JS
│   │   ├── stylesheets/
│   │   │   ├── application.css           # Tailwind or custom minimal CSS
│   │   │   ├── _hero.css
│   │   │   ├── _portfolio.css
│   │   │   └── _blog.css
│   │   └── images/
│   │
│   └── sitemap.xml                       # Auto-generated
│
├── config/
│   ├── database.yml                      # PostgreSQL config
│   ├── storage.yml                       # Active Storage for project images
│   ├── puma.rb                           # 3 workers, 5 threads (lightweight)
│   ├── environments/
│   │   ├── production.rb                 # HTTP caching headers, compression
│   │   ├── staging.rb
│   │   └── development.rb
│   └── routes.rb                         # RESTful routes + admin namespace
│
├── docker/
│   ├── Dockerfile                        # Multi-stage Rails build
│   ├── compose.yml                       # Postgres + Redis locally
│   └── entrypoint.sh
│
├── Gemfile                               # Minimal, focused dependencies
├── Gemfile.lock
├── .env.example
├── Kamal.yml                             # Deployment config
├── Makefile                              # Common tasks
└── README.md                             # Setup & deployment guide
```

---

## 3. DATABASE SCHEMA

### Models & Relationships

**Projects** (Portfolio Items)
```ruby
class Project < ApplicationRecord
  has_one_attached :thumbnail
  has_many_attached :images
  has_many :testimonials, dependent: :nullify
  
  validates :title, :slug, :description, presence: true
  validates :slug, uniqueness: true
  
  # Columns:
  # - title (string)
  # - slug (string, indexed)
  # - description (text)
  # - challenge (text)             # Case study: problem statement
  # - solution (text)              # Case study: approach
  # - results (jsonb)              # Metrics: { users: 50000, revenue: '$2M', conversion: '12%' }
  # - technologies (text[])        # ['Rails', 'React', 'PostgreSQL']
  # - url (string)                 # Live link
  # - featured (boolean, indexed)  # Homepage showcase
  # - published_at (datetime)      # Soft publish control
  # - created_at, updated_at
  
  scope :published, -> { where('published_at IS NOT NULL AND published_at <= ?', Time.current) }
  scope :featured, -> { where(featured: true).order(published_at: :desc) }
  
  def to_param; slug; end
end
```

**Articles** (Blog/Insights)
```ruby
class Article < ApplicationRecord
  has_one_attached :featured_image
  has_many :article_tags, dependent: :destroy
  has_many :tags, through: :article_tags
  
  validates :title, :slug, :content, presence: true
  validates :slug, uniqueness: true
  
  # Columns:
  # - title (string)
  # - slug (string, indexed)
  # - content (text)               # Markdown or HTML
  # - excerpt (string)             # For SEO meta description
  # - featured_image (attachment)
  # - tags (text[])                # ['Rails', 'Performance', 'AI']
  # - published_at (datetime)
  # - created_at, updated_at
  # - tsv (tsvector)               # PostgreSQL full-text search column
  
  scope :published, -> { where('published_at IS NOT NULL').order(published_at: :desc) }
  
  def self.search(query)
    where("tsv @@ plainto_tsquery('english', ?)", query)
      .order("ts_rank(tsv, plainto_tsquery('english', ?)) DESC", query)
  end
end
```

**Testimonials** (Social Proof)
```ruby
class Testimonial < ApplicationRecord
  belongs_to :project, optional: true
  
  # Columns:
  # - author_name (string)
  # - author_title (string)         # e.g., "VP Engineering @ TechCo"
  # - author_image_url (string)
  # - content (text)
  # - project_id (integer, foreign_key)
  # - featured (boolean)
  # - created_at, updated_at
end
```

**ContactMessages** (Form Submissions)
```ruby
class ContactMessage < ApplicationRecord
  # Columns:
  # - name (string)
  # - email (string)
  # - message (text)
  # - subject (string)
  # - responded (boolean, default: false)
  # - notes (text)                  # Admin notes on response
  # - created_at, updated_at
  
  validates :name, :email, :message, presence: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
end
```

**SiteConfig** (Cache Invalidation & SEO)
```ruby
class SiteConfig < ApplicationRecord
  # Columns:
  # - key (string, unique)          # e.g., 'homepage_title', 'prerender_timestamp'
  # - value (jsonb)
  # - updated_at
  
  def self.get(key, default = nil)
    find_by(key: key)&.value || default
  end
  
  def self.set(key, value)
    find_or_create_by(key: key).update(value: value)
  end
end
```

**Migrations Summary:**
1. Projects + rich metadata (results as JSONB)
2. Articles + full-text search (PostgreSQL tsvector)
3. Testimonials
4. ContactMessages
5. SiteConfig (cache versioning)
6. ActiveStorage (images)

---

## 4. GEM RECOMMENDATIONS

### Core Dependencies (Minimal Set)

```ruby
# Gemfile

# Rails & Core
gem 'rails', '~> 7.1'
gem 'pg', '~> 1.5'                    # PostgreSQL adapter
gem 'puma', '~> 6.0'                  # Fast, lightweight web server

# Caching & Performance
gem 'redis', '~> 5.0'                 # Cache store, session store
gem 'redis-rails'                     # Rails cache integration

# Admin & Content Management
gem 'pundit'                          # Authorization for admin views
gem 'pagy'                            # Fast pagination (blog, projects)

# Forms & Validation
gem 'simple_form', '~> 5.0'          # Clean form helpers (admin only)

# Search & Indexing
# PostgreSQL tsvector built-in (no gem needed)

# File Storage
gem 'aws-sdk-s3'                      # S3 for project images (optional production)

# SEO & Sitemap
gem 'sitemap_generator'               # Auto-generate sitemap.xml

# Email & Notifications
gem 'sendgrid-ruby'                   # SendGrid email (production)

# Monitoring & Logging
gem 'sentry-ruby'                     # Error tracking
gem 'sentry-rails'

# Admin Dashboard (minimal)
gem 'rails-admin'                     # Lightweight admin interface (optional)

# Development & Testing
group :development, :test do
  gem 'rspec-rails'                   # Testing framework
  gem 'factory_bot_rails'             # Test fixtures
  gem 'faker'                         # Generate fake data
end

group :development do
  gem 'web-console'
  gem 'listen'
end

group :test do
  gem 'database_cleaner-active_record'
end
```

### Why These Gems?

| Gem | Purpose | Alternative | Why Chosen |
|-----|---------|-------------|-----------|
| `redis` | Multi-layer caching | Memcached | Redis supports more data types, better for sessions |
| `pagy` | Pagination | Kaminari | 40x faster, lower memory, metadata included |
| `pundit` | Authorization | CanCan | Lightweight, policy-based (no role inflation) |
| `sitemap_generator` | SEO sitemap | Manual Rake | Automatic refresh, search engine friendly |
| `sentry-ruby` | Error tracking | Rollbar | Fast, generous free tier, excellent Rails support |

### Gems We **Deliberately Avoided**:
- ❌ `Webpacker`/`esbuild` - Too heavy; use import maps or simple sprockets
- ❌ `Devise` - Overkill; no user auth needed (admin via IP/env var gating)
- ❌ `ActiveAdmin` - Bloated; simple admin views suffice
- ❌ `React`, `Vue` - Prerendered static HTML + minimal Stimulus.js only
- ❌ `Elasticsearch` - PostgreSQL full-text search is sufficient for <10k articles

---

## 5. PERFORMANCE OPTIMIZATION STRATEGY

### Layer 1: Edge Caching (Cloudflare)
```
HTTP Cache-Control Headers (set in Rails):
- Home, About, Projects: max-age=86400 (24h, revalidate on publish)
- Articles: max-age=604800 (7 days)
- Search results: max-age=3600 (1h, dynamic)

Cloudflare Rules:
- Cache Everything for *.jeet-desai.dev (except /admin)
- Browser Cache TTL: 1 day
- Purge cache on content update (webhook)
```

### Layer 2: Application Caching (Redis)
```ruby
# Cache rendered partials and expensive queries
Rails.cache.fetch('projects_featured', expires_in: 1.day) do
  Project.published.featured.limit(3)
end

# Search index (updated on article save)
Rails.cache.write('search_index', Article.published.pluck(:title, :slug, :excerpt))
```

### Layer 3: Prerendering (Static HTML)
```
Build Process (CI/CD):
1. Run Rake task: bin/rake prerender:all
2. Generates: /public/prerendered/{index, about, projects/*, articles/*, search}.html
3. Served via CDN (~50ms latency globally)
4. Fallback to Rails for dynamic content (contact form, search filters)

Prerender Triggers:
- On-demand: Admin publishes project/article
- Daily cron: Full rebuild (cache freshness)
- Deployment: Full rebuild (new feature)
```

### Layer 4: Database Query Optimization
```
Indexes (PostgreSQL):
- articles.slug (unique)
- articles.published_at (for ordering)
- articles.tsv (for full-text search)
- projects.featured, projects.published_at
- contact_messages.created_at (for admin)

Query Patterns (N+1 Prevention):
- Load projects.includes(:articles_tags, :testimonials)
- Use select() to load only needed columns
- Pagination: Pagy.new(count: 100, page: 1, items: 20)
```

### Layer 5: Static Asset Optimization
```
CSS:
- Tailwind CSS (purged to ~15KB production)
- Or custom minimal CSS (~10KB)
- Minified + gzipped via Rails asset pipeline

JavaScript (Minimal):
- Stimulus.js (~12KB gzipped) for search filtering, form validation
- HTMX (~14KB) for real-time search preview (optional)
- Total JS budget: <30KB gzipped

Images:
- WebP format + JPEG fallback
- Responsive images (srcset)
- Lazy loading (native browser)
- Max resolution: 1200px (portfolio items)
```

### Layer 6: CDN Strategy
```
Cloudflare Free Tier:
- Global edge caching (200+ locations)
- Automatic HTTPS, minification
- DDoS protection
- Cache purge on publish via API

Production Delivery:
- assets.jeet-desai.dev → Cached 1 year (fingerprinted)
- www.jeet-desai.dev → Cached 24h (prerendered)
```

---

## 6. SECURITY CHECKLIST (OWASP)

| Risk | Mitigation | Implementation |
|------|-----------|-----------------|
| **SQL Injection** | Use Rails ORM exclusively | No raw queries; `Article.search(query)` via prepared statements |
| **CSRF** | CSRF token on all forms | `protect_from_forgery with: :exception` (default Rails) |
| **XSS** | HTML escaping, CSP | All ERB output auto-escaped; CSP headers set |
| **Sensitive Data** | No hardcoding secrets | `.env` file, ENV vars in production (Kamal secrets) |
| **Authentication** | Admin panel gating | HTTP Basic Auth or IP whitelisting for /admin |
| **Rate Limiting** | Protect contact form | Rack::Attack (max 5 submissions/hour per IP) |
| **Email Validation** | Form validation | `email_validator` gem or regex + real delivery test |
| **Clickjacking** | X-Frame-Options header | `config.action_dispatch.default_headers` |
| **Dependencies** | Keep gems updated | `bundle audit` in CI; automated updates (Dependabot) |

---

## 7. DEPLOYMENT ARCHITECTURE

### Docker Build (Multi-stage)
```dockerfile
# Stage 1: Builder
FROM ruby:3.3-slim as builder
RUN apt-get install -y build-essential postgresql-client
COPY Gemfile Gemfile.lock /app/
WORKDIR /app
RUN bundle install --without development test

# Stage 2: Runtime
FROM ruby:3.3-slim
RUN apt-get install -y postgresql-client
COPY --from=builder /usr/local/bundle /usr/local/bundle
COPY . /app
WORKDIR /app
ENV RAILS_ENV=production RAILS_LOG_TO_STDOUT=true
EXPOSE 3000
CMD ["bundle", "exec", "puma"]
```

### Deployment (Kamal)
```yaml
# kamal.yml
service: portfolio
image: jeet-desai/portfolio
registry:
  username: <%= ENV['REGISTRY_USERNAME'] %>
  password: <%= ENV['REGISTRY_PASSWORD'] %>

servers:
  web:
    hosts: [1.2.3.4]
    options:
      network: bridge

env:
  RAILS_ENV: production
  DATABASE_URL: postgresql://...
  REDIS_URL: redis://redis:6379

volumes:
  - "/data/public/prerendered:/app/public/prerendered"
```

### Continuous Deployment (GitHub Actions)
```yaml
# .github/workflows/deploy.yml
on: [push: main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: bin/rake prerender:all
      - run: kamal deploy
```

---

## 8. MONITORING & OBSERVABILITY

### Key Metrics
- **Page Load Time (p50, p95, p99)** — Target <1s
- **Cache Hit Ratio** — Target >95%
- **Error Rate** — Alert if >1%
- **Search Latency** — Track PostgreSQL FTS performance
- **Prerender Duration** — Alert if >60s

### Logging
- **Rails** → Structured JSON to stdout (Kamal captures)
- **Sentry** → Error tracking + performance monitoring
- **Cloudflare Analytics** — Real user monitoring (RUM)

---

## 9. IMPLEMENTATION PHASES

### Phase 1 (Week 1): Core Scaffold
- [ ] Rails 7.1 scaffold with PostgreSQL
- [ ] Models: Project, Article, Testimonial, ContactMessage
- [ ] Database migrations & seed data
- [ ] Basic CRUD for admin

### Phase 2 (Week 1-2): Public Pages
- [ ] Home hero + featured projects
- [ ] About page (experience, tech stack)
- [ ] Project detail pages (case studies with metrics)
- [ ] Blog index + article detail

### Phase 3 (Week 2): Search & UX
- [ ] Full-text search (articles, projects)
- [ ] Stimulus.js real-time filtering
- [ ] Contact form with email notifications
- [ ] Testimonials carousel (optional JS)

### Phase 4 (Week 3): Prerendering & Caching
- [ ] Rake task: prerender all public pages
- [ ] Redis cache layer
- [ ] HTTP caching headers
- [ ] Sitemap + robots.txt generation

### Phase 5 (Week 3-4): Deployment
- [ ] Docker containerization
- [ ] Kamal deployment setup
- [ ] GitHub Actions CI/CD
- [ ] Cloudflare CDN configuration

### Phase 6 (Week 4): Optimization & Monitoring
- [ ] Performance testing (Lighthouse)
- [ ] Sentry error tracking
- [ ] Database indexing review
- [ ] Production hardening

---

## Next Steps

1. **Generate Rails 7.1 app** → See `SCAFFOLD_COMMANDS.md`
2. **Database design** → Run migrations
3. **Admin interfaces** → Simple CRUD views
4. **Public pages** → Template design with Tailwind
5. **Performance tuning** → Prerendering + caching
6. **Deployment** → Docker + Kamal + GitHub Actions

---

**Estimated Effort:** 80-100 hours (1 developer, 4 weeks)  
**Maintenance:** <5 hours/month (automated CI/CD, monitoring)  
**Cost:** ~$20/month (Render/Heroku) + $0 (Cloudflare free tier)
