# Portfolio Platform - Implementation Roadmap & Performance Checklist

## Implementation Timeline

### Week 1: Core Rails Setup & Database (20 hours)
- [ ] **Day 1** (4h): Rails scaffold, PostgreSQL setup, gems installed
  - Run scaffold commands from `SCAFFOLD_COMMANDS.md` phases 1-2
  - Verify: `bin/rails db:create && bin/rails db:migrate`
  
- [ ] **Day 2** (4h): Models & associations
  - Implement models from `SCAFFOLD_COMMANDS.md` Phase 3
  - Test: `bin/rails console` → Create test data
  - Verify: All associations load without N+1 errors
  
- [ ] **Day 3** (4h): Admin controllers & views
  - Generate admin namespace controllers
  - Simple CRUD forms using simple_form
  - Basic authentication (HTTP Basic Auth for /admin)
  
- [ ] **Day 4** (4h): Seed data & testing
  - Populate `db/seeds.rb` with sample data
  - Run `bin/rails db:seed`
  - Test admin interface locally
  
- [ ] **Day 5** (4h): Public pages (home, about)
  - Implement `pages_controller.rb`
  - Build home and about views from `VIEWS_TEMPLATES.md`
  - Test responsive layout with browser devtools

---

### Week 2: Public Features & Search (20 hours)
- [ ] **Day 1** (4h): Projects portfolio
  - Implement `projects_controller.rb` (index + show)
  - Build views from templates
  - Add project image uploading (Active Storage)
  
- [ ] **Day 2** (4h): Blog articles & pagination
  - Implement `articles_controller.rb` with Pagy pagination
  - Build article views
  - Test: Load 100 articles, verify pagination performance
  
- [ ] **Day 3** (4h): Full-text search
  - Add PostgreSQL migration for article text search (tsvector)
  - Implement search service from `ARCHITECTURE.md`
  - Build search controller & results view
  
- [ ] **Day 4** (4h): Contact form & notifications
  - Implement `contacts_controller.rb`
  - Build contact form view
  - Setup email job + SendGrid integration
  
- [ ] **Day 5** (4h): Testimonials & social proof
  - Add testimonials to project/homepage
  - Style testimonial components
  - Optional: Simple carousel with Stimulus.js

---

### Week 3: Performance Optimization & Caching (20 hours)
- [ ] **Day 1** (4h): Redis caching layer
  - Configure Redis in `config/environments/production.rb`
  - Implement cache invalidation on model saves
  - Test cache hit ratio: `redis-cli info stats`
  
- [ ] **Day 2** (4h): HTTP caching headers
  - Implement `CacheHeaders` middleware
  - Set Cache-Control headers for each route
  - Test with browser devtools (Network tab)
  
- [ ] **Day 3** (4h): Prerendering pipeline
  - Implement Rake task: `bin/rake prerender:all`
  - Generate static HTML files to `/public/prerendered/`
  - Verify: All pages generate in <30 seconds
  
- [ ] **Day 4** (4h): Database optimization
  - Add PostgreSQL indexes (slug, published_at, featured)
  - Analyze queries: `EXPLAIN ANALYZE`
  - Verify: No N+1 queries in controllers
  
- [ ] **Day 5** (4h): Static assets & minification
  - Configure Tailwind for production (purge unused CSS)
  - Minimize JavaScript (Stimulus only, ~12KB)
  - Test bundle sizes: `gzip -9 < app.js | wc -c`

---

### Week 4: Deployment & Monitoring (20 hours)
- [ ] **Day 1** (4h): Docker containerization
  - Create `Dockerfile` (multi-stage build)
  - Create `docker-compose.yml` for local dev
  - Test: `docker build -t portfolio . && docker run -p 3000:3000 portfolio`
  
- [ ] **Day 2** (4h): Kamal deployment
  - Setup `config/deploy.yml` (Kamal)
  - Configure secrets (API keys, database URL)
  - Test: `kamal setup` on staging server
  
- [ ] **Day 3** (4h): GitHub Actions CI/CD
  - Create `.github/workflows/test.yml` (RSpec + linting)
  - Create `.github/workflows/deploy.yml` (automatic deploy on main)
  - Test: Push to main branch, verify deployment
  
- [ ] **Day 4** (4h): Cloudflare CDN
  - Register domain on Cloudflare
  - Configure DNS records
  - Setup cache rules + purge on content update
  
- [ ] **Day 5** (4h): Monitoring & alerts
  - Setup Sentry error tracking
  - Configure Cloudflare analytics
  - Setup uptime monitoring (UptimeRobot)
  - Create monitoring dashboard

---

## Performance Checklist (Pre-Launch)

### PageSpeed & Core Web Vitals
- [ ] **First Contentful Paint (FCP):** <500ms
- [ ] **Largest Contentful Paint (LCP):** <1s
- [ ] **Cumulative Layout Shift (CLS):** <0.1
- [ ] **Time to Interactive (TTI):** <1.5s

**Test with:**
```bash
# Lighthouse CLI
npm install -g lighthouse
lighthouse https://jeet-desai.dev --output=json --chromeFlags="--headless"

# WebPageTest (free)
# https://webpagetest.org/
```

### Browser DevTools Verification
- [ ] Home page loads in <1s (Network tab)
- [ ] CSS bundle: <20KB (minified + gzipped)
- [ ] JavaScript bundle: <30KB (Stimulus only)
- [ ] No unused CSS (Tailwind purge verified)
- [ ] Images: All < 200KB (WebP + JPEG fallback)

### SEO Checklist
- [ ] Sitemap.xml generated and submitted to Google Search Console
- [ ] robots.txt correctly configured
- [ ] Meta descriptions on all pages
- [ ] Open Graph tags present
- [ ] Twitter Card tags present
- [ ] Mobile responsive (tested on iPhone/Android)
- [ ] Page titles unique and descriptive
- [ ] H1 tags present on all pages
- [ ] Alt text on all images

**Test with:**
```bash
# Site audit
npm install -g lighthouse
lighthouse https://jeet-desai.dev --audit-type=seo

# Rich snippets validation
# https://search.google.com/test/rich-results
```

### Database Performance
- [ ] All queries complete in <100ms
- [ ] No N+1 queries (use .includes() + bullet gem)
- [ ] Indexes present on: slug, published_at, featured
- [ ] Full-text search working (articles)

**Test with:**
```bash
# RSpec + performance specs
bin/rspec --profile

# Query logging
tail -f log/development.log | grep "SELECT"
```

### Caching Metrics
- [ ] Redis cache hit ratio: >95%
- [ ] Page cache: 24h for static pages, 1h for dynamic
- [ ] CDN cache: Cloudflare edge caching enabled
- [ ] Browser cache: assets cached 1 year

**Monitor:**
```ruby
# In Rails console
Rails.cache.fetch_hit_rate  # Should be >95%
```

### Security Checklist
- [ ] CSRF protection enabled (default Rails)
- [ ] No hardcoded secrets (.env file used)
- [ ] Security headers set (X-Frame-Options, CSP, etc.)
- [ ] Contact form rate-limited (max 5/hour per IP)
- [ ] Email validation on contact form
- [ ] Dependency audit passed (`bundle audit`)
- [ ] SQL injection: No raw queries (all use ORM)
- [ ] XSS protection: All ERB output auto-escaped

**Test with:**
```bash
# Security headers
curl -I https://jeet-desai.dev | grep "X-"

# Dependency audit
bundle audit

# OWASP ZAP scan (optional)
# docker run owasp/zap2docker-stable scan -u https://jeet-desai.dev
```

### Lighthouse Score Targets
- [ ] **Performance:** >90/100
- [ ] **Accessibility:** >90/100
- [ ] **Best Practices:** >90/100
- [ ] **SEO:** 100/100

---

## Monitoring Dashboard (Post-Launch)

### Key Metrics to Track

**Real User Monitoring (RUM):**
```yaml
Metric            Target    Current   Status
─────────────────────────────────────────────
FCP              <500ms     ___ms     
LCP              <1s        ___ms     
CLS              <0.1       ___       
TTI              <1.5s      ___ms     
Cache Hit %      >95%       ___%      
Avg Req Time     <100ms     ___ms     
Error Rate       <1%        ___%      
```

**Monitoring Tools:**
- **Google Analytics 4** - User behavior, conversion tracking
- **Sentry** - Error tracking + performance monitoring
- **Cloudflare Analytics** - CDN performance, bot traffic
- **UptimeRobot** - Uptime monitoring (SLA: 99.9%)
- **New Relic** (optional) - Full APM monitoring

### Alerts Configuration

**Critical (PagerDuty):**
- Site down (HTTP 500 errors > 1%)
- Error rate spike (>5% within 5 min)
- Database connection pool exhausted

**Warning (Slack):**
- Page load time >2s (p95)
- Cache hit ratio <80%
- Memory usage >85%

---

## Admin Features Checklist

### Dashboard View
- [ ] Content overview (projects count, articles count)
- [ ] Recent submissions (contact form)
- [ ] Unresponded messages count
- [ ] Last prerender timestamp
- [ ] System health (Redis, DB connection status)

### Content Management
- [ ] Create/edit/delete projects
  - [ ] Thumbnail + gallery images upload
  - [ ] Publish scheduling (published_at)
  - [ ] SEO fields (slug, meta description)
  
- [ ] Create/edit/delete articles
  - [ ] Markdown or HTML editor
  - [ ] Featured image upload
  - [ ] Tag management
  - [ ] Publish scheduling
  
- [ ] Testimonials management
  - [ ] Create/edit/delete testimonials
  - [ ] Assign to projects
  - [ ] Feature/unfeature for homepage
  
- [ ] Contact messages
  - [ ] View inbox with pagination
  - [ ] Mark as responded
  - [ ] Reply to messages (email)
  - [ ] Export CSV (optional)

### Admin Authentication
- [ ] HTTP Basic Auth (for small team) OR
- [ ] Session-based auth with IP whitelist OR
- [ ] OAuth2 integration (GitHub, Google)

---

## Performance Optimization Techniques

### 1. Prerendering Triggers
```ruby
# app/models/project.rb
after_save :queue_prerender_job

private

def queue_prerender_job
  PrerenederJob.perform_later(self.id)
end
```

### 2. Smart Cache Invalidation
```ruby
# app/models/article.rb
after_save :invalidate_caches

private

def invalidate_caches
  Rails.cache.delete('recent_articles')
  Rails.cache.delete('search_index')
  SiteConfig.set('cache_version', SecureRandom.hex)
end
```

### 3. Query Optimization Example
```ruby
# BAD: N+1 queries
articles = Article.published
articles.each { |a| a.tags }  # Runs query per article

# GOOD: Use includes() or select()
articles = Article.published.select(:id, :title, :tags)

# BETTER: Optimize the query itself
articles = Article.published.pluck(:id, :title, :tags)
```

### 4. Image Optimization
```erb
<!-- Responsive images with WebP + JPEG fallback -->
<picture>
  <source srcset="<%= cdn_url(project.thumbnail, format: :webp) %>" type="image/webp">
  <img src="<%= cdn_url(project.thumbnail) %>" alt="<%= project.title %>" loading="lazy">
</picture>
```

### 5. CSS Purging (Tailwind)
```javascript
// tailwind.config.js
module.exports = {
  content: [
    './app/views/**/*.html.erb',
    './app/components/**/*.html.erb',
  ],
  theme: { /* ... */ },
}
```

---

## Troubleshooting Common Issues

### Issue: Pages load slowly
**Solution:**
1. Check `log/development.log` for slow queries
2. Run `EXPLAIN ANALYZE` on slow SQL
3. Verify indexes present: `\d projects` (psql)
4. Add `.includes()` to prevent N+1 queries

### Issue: Cache not working
**Solution:**
```bash
# Check Redis connection
redis-cli ping  # Should return "PONG"

# Clear cache
bin/rails cache:clear

# Verify cache store config
bin/rails console
Rails.cache.class  # Should be Redis
```

### Issue: Prerendering fails
**Solution:**
```bash
# Run prerender manually with verbose output
bin/rake prerender:all VERBOSE=true

# Check for template syntax errors
bin/rails render --help
```

### Issue: Images not loading on production
**Solution:**
1. Verify Active Storage config (S3 or local)
2. Check IAM permissions (if using AWS S3)
3. Verify CDN purge on image upload
4. Test image URL directly in browser

### Issue: Contact form emails not sent
**Solution:**
```bash
# Check SendGrid config
echo $SENDGRID_API_KEY

# Test email sending in console
ContactMessage.last.send_notification_email

# Check job queue
bin/rails jobs:work  # Start Sidekiq worker locally
```

---

## Deployment Troubleshooting

### Kamal Deployment Issues
```bash
# SSH into production server
kamal app exec -i bash

# Check Rails logs
tail -f log/production.log

# Inspect environment variables
printenv | grep RAILS

# Verify Redis connection
redis-cli -u $REDIS_URL ping

# Database connection
psql $DATABASE_URL -c "SELECT 1"
```

### Cloudflare Cache Issues
```bash
# Purge all cache via API
curl -X POST "https://api.cloudflare.com/client/v4/zones/{zone_id}/purge_cache" \
  -H "Authorization: Bearer {token}" \
  -d '{"purge_everything":true}'

# Check cache status in headers
curl -I https://jeet-desai.dev | grep "cf-cache"
# Should show: cf-cache-status: HIT (after second visit)
```

---

## Performance Budget

**Page Load Budget (99th percentile):**
- Home: <1.2s
- Articles: <1.0s
- Projects: <1.0s
- Search: <1.5s (depends on query)
- Admin: <2s (uncached)

**Resource Budget:**
- CSS: <20KB (minified + gzipped)
- JS: <30KB (Stimulus.js only)
- Images: <500KB total per page
- Fonts: <50KB (system fonts preferred)

**Monitoring:**
```ruby
# Add performance specs (RSpec)
describe 'Page performance', :performance do
  it 'loads home page in < 1 second' do
    expect(page_load_time('/')).to be < 1000  # ms
  end
end
```

---

## Post-Launch Optimization (Continuous)

### Monthly Tasks
- [ ] Review Lighthouse scores
- [ ] Check error rate (Sentry)
- [ ] Monitor cache hit ratio
- [ ] Update gems (`bundle update`)
- [ ] Run security audit (`bundle audit`)

### Quarterly Tasks
- [ ] Performance profiling (Ruby-Prof)
- [ ] Database query audit
- [ ] CDN cache analysis
- [ ] User feedback review
- [ ] SEO position tracking

### Annual Tasks
- [ ] Architecture review
- [ ] Security audit (OWASP)
- [ ] Scalability assessment
- [ ] Technology stack refresh

---

**Next Step:** Run the scaffold commands in `SCAFFOLD_COMMANDS.md` Phase 1-2 to create your Rails app!
