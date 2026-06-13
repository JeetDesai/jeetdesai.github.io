# Portfolio Platform - Scaffold & Setup Commands

## Phase 1: Rails 7.1 Setup (45 minutes)

### Step 1: Create Rails App with PostgreSQL
```bash
cd /home/jeet/Rails_projects

# Create Rails 7.1 app (minimal, no CSS bundler, no JS bundler)
rails new profile \
  --database=postgresql \
  --skip-javascript \
  --skip-bundle \
  -c tailwind \
  --force

cd profile
```

### Step 2: Add Essential Gems
Update `Gemfile`:
```ruby
# Gemfile
source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.3.0'

gem 'rails', '~> 7.1.0'
gem 'pg', '~> 1.5'                         # PostgreSQL adapter
gem 'puma', '~> 6.4'                       # Web server
gem 'importmap-rails'                      # Asset management (minimal)
gem 'turbo-rails'                          # Turbo (optional, for forms)
gem 'stimulus-rails'                       # Stimulus.js

# Caching & Performance
gem 'redis', '~> 5.0'
gem 'redis-rails'

# Authorization (admin gating)
gem 'pundit'

# Forms (admin)
gem 'simple_form', '~> 5.3'

# Pagination
gem 'pagy', '~> 7.2'

# File storage
gem 'aws-sdk-s3', require: false          # Optional for production images

# Search & SEO
gem 'sitemap_generator'

# Email
gem 'sendgrid-ruby'

# Monitoring
gem 'sentry-ruby'
gem 'sentry-rails'

# Markdown support (optional for articles)
gem 'redcarpet'
gem 'rouge'

group :development, :test do
  gem 'debug', platforms: %i[mri mingw x64_mingw]
  gem 'rspec-rails', '~> 6.1'
  gem 'factory_bot_rails'
  gem 'faker'
end

group :test do
  gem 'database_cleaner-active_record'
  gem 'rspec-rails'
end

group :development do
  gem 'web-console'
  gem 'listen'
end
```

```bash
bundle install
```

### Step 3: Configure PostgreSQL & Redis
```bash
# Create database
bin/rails db:create

# Initialize Tailwind CSS
bin/rails tailwindcss:install

# Optional: Initialize RSpec
bin/rails generate rspec:install
```

### Step 4: Environment Variables
Create `.env.example`:
```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/profile_development

# Redis
REDIS_URL=redis://localhost:6379/1

# Email
SENDGRID_API_KEY=your_sendgrid_key

# Admin auth
ADMIN_USERNAME=admin
ADMIN_PASSWORD=secure_password

# Sentry (error tracking)
SENTRY_DSN=https://your_sentry_dsn

# AWS S3 (production images)
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_S3_BUCKET=your-portfolio-bucket
```

Copy to `.env`:
```bash
cp .env.example .env
```

---

## Phase 2: Database Schema (30 minutes)

### Generate Models
```bash
# Projects (portfolio items)
bin/rails generate model Project \
  title:string \
  slug:string:uniq \
  description:text \
  challenge:text \
  solution:text \
  results:jsonb \
  technologies:text \
  url:string \
  featured:boolean:indexed \
  published_at:datetime

# Articles (blog)
bin/rails generate model Article \
  title:string \
  slug:string:uniq \
  content:text \
  excerpt:string \
  tags:text \
  published_at:datetime

# Testimonials (social proof)
bin/rails generate model Testimonial \
  author_name:string \
  author_title:string \
  author_image_url:string \
  content:text \
  project:references \
  featured:boolean

# Contact form submissions
bin/rails generate model ContactMessage \
  name:string \
  email:string \
  subject:string \
  message:text \
  responded:boolean:indexed \
  notes:text

# Site configuration (cache versioning, SEO)
bin/rails generate model SiteConfig \
  key:string:uniq \
  value:jsonb
```

### Generate Active Storage Attachments
```bash
bin/rails active_storage:install

# Manual migration to add attachments to Project
# Create db/migrate/[timestamp]_add_attachments_to_projects.rb
```

### Run Migrations
```bash
bin/rails db:migrate
```

---

## Phase 3: Models & Associations (45 minutes)

### Project Model
Create `app/models/project.rb`:
```ruby
class Project < ApplicationRecord
  has_one_attached :thumbnail
  has_many_attached :images
  has_many :testimonials, dependent: :nullify

  validates :title, :slug, :description, presence: true
  validates :slug, uniqueness: true

  # Scopes
  scope :published, -> { where('published_at IS NOT NULL AND published_at <= ?', Time.current) }
  scope :featured, -> { where(featured: true).order(published_at: :desc) }

  # URL handling
  def to_param
    slug
  end

  # SEO slug generation
  before_save :generate_slug, if: :title_changed?

  private

  def generate_slug
    self.slug = title.parameterize if slug.blank?
  end
end
```

### Article Model
Create `app/models/article.rb`:
```ruby
class Article < ApplicationRecord
  has_one_attached :featured_image

  validates :title, :slug, :content, presence: true
  validates :slug, uniqueness: true

  # Scopes
  scope :published, -> { where('published_at IS NOT NULL').order(published_at: :desc) }
  scope :recent, -> { published.limit(5) }

  # Full-text search
  def self.search(query)
    return none if query.blank?
    
    where("to_tsvector('english', title || ' ' || coalesce(excerpt, '')) @@ plainto_tsquery('english', ?)", query)
      .order(Arel.sql("ts_rank(to_tsvector('english', title || ' ' || coalesce(excerpt, '')), plainto_tsquery('english', ?)) DESC"), query)
  end

  def to_param
    slug
  end

  before_save :generate_slug, if: :title_changed?

  private

  def generate_slug
    self.slug = title.parameterize if slug.blank?
  end
end
```

### Testimonial Model
Create `app/models/testimonial.rb`:
```ruby
class Testimonial < ApplicationRecord
  belongs_to :project, optional: true

  validates :author_name, :content, presence: true
  
  scope :featured, -> { where(featured: true) }
end
```

### ContactMessage Model
Create `app/models/contact_message.rb`:
```ruby
class ContactMessage < ApplicationRecord
  validates :name, :email, :message, presence: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }

  after_create :send_notification_email

  private

  def send_notification_email
    ContactNotificationJob.perform_later(self.id)
  end
end
```

### SiteConfig Model
Create `app/models/site_config.rb`:
```ruby
class SiteConfig < ApplicationRecord
  def self.get(key, default = nil)
    find_by(key: key)&.value || default
  end

  def self.set(key, value)
    find_or_create_by(key: key).update(value: value)
  end
end
```

---

## Phase 4: Scaffold Controllers & Views (60 minutes)

### Generate Public Controllers
```bash
# Public pages
bin/rails generate controller Pages home about --skip-routes

# Project portfolio
bin/rails generate controller Projects index show --skip-routes

# Blog articles
bin/rails generate controller Articles index show --skip-routes

# Search
bin/rails generate controller Search index --skip-routes

# Contact form
bin/rails generate controller Contacts new create --skip-routes
```

### Generate Admin Namespace Controllers
```bash
bin/rails generate controller Admin::Dashboard index --skip-routes
bin/rails generate controller Admin::Projects --skip-routes
bin/rails generate controller Admin::Articles --skip-routes
bin/rails generate controller Admin::Testimonials --skip-routes
bin/rails generate controller Admin::ContactMessages index show --skip-routes
```

### Configure Routes
Edit `config/routes.rb`:
```ruby
Rails.application.routes.draw do
  root 'pages#home'

  # Public pages
  get 'about', to: 'pages#about'
  
  # Portfolio
  resources :projects, only: [:index, :show]

  # Blog
  resources :articles, only: [:index, :show]

  # Search
  get 'search', to: 'search#index'

  # Contact form (no delete/update)
  resources :contacts, only: [:new, :create]

  # Admin namespace
  namespace :admin do
    root 'dashboard#index'
    resources :projects
    resources :articles
    resources :testimonials
    resources :contact_messages, only: [:index, :show]
  end
end
```

---

## Phase 5: Cache & Prerendering Setup (45 minutes)

### Redis Cache Configuration
Edit `config/environments/production.rb`:
```ruby
config.cache_store = :redis_cache_store,
  { url: ENV['REDIS_URL'], pool: { size: 5, timeout: 3 } }
```

Edit `config/environments/development.rb`:
```ruby
config.cache_store = :memory_store
```

### HTTP Caching Headers (Rack Middleware)
Create `app/middleware/cache_headers.rb`:
```ruby
class CacheHeaders
  def initialize(app)
    @app = app
  end

  def call(env)
    status, headers, body = @app.call(env)
    
    # Cache static pages for 24 hours
    if [
      '/about',
      '/projects',
      '/articles',
      '/search'
    ].any? { |path| env['PATH_INFO'].start_with?(path) }
      headers['Cache-Control'] = 'public, max-age=86400'
    end

    # Cache individual projects/articles for 7 days
    if env['PATH_INFO'].match?(%r{/projects/\w+|/articles/\w+})
      headers['Cache-Control'] = 'public, max-age=604800'
    end

    [status, headers, body]
  end
end
```

Add to `config/application.rb`:
```ruby
config.middleware.use CacheHeaders
```

### Prerendering Rake Tasks
Create `lib/tasks/prerender.rake`:
```ruby
namespace :prerender do
  desc 'Prerender all public pages to static HTML'
  task all: :environment do
    puts "🔨 Starting prerender..."
    
    prerender_paths = [
      { path: '/', filename: 'index.html' },
      { path: '/about', filename: 'about.html' },
      { path: '/projects', filename: 'projects.html' },
      { path: '/articles', filename: 'articles.html' },
      { path: '/search', filename: 'search.html' },
    ]

    # Add dynamic project pages
    Project.published.find_each do |project|
      prerender_paths << { path: "/projects/#{project.slug}", filename: "projects/#{project.slug}.html" }
    end

    # Add dynamic article pages
    Article.published.find_each do |article|
      prerender_paths << { path: "/articles/#{article.slug}", filename: "articles/#{article.slug}.html" }
    end

    client = Rack::Test::Session.new(Rack::MockSession.new(Rails.application))
    
    prerender_paths.each do |item|
      puts "  → #{item[:path]}"
      
      client.get(item[:path])
      
      if client.last_response.ok?
        filename = Rails.root.join('public', 'prerendered', item[:filename])
        FileUtils.mkdir_p(File.dirname(filename))
        File.write(filename, client.last_response.body)
      else
        puts "    ⚠️  Failed: #{client.last_response.status}"
      end
    end

    # Update cache version
    SiteConfig.set('prerender_timestamp', Time.current.to_i)
    puts "✅ Prerender complete!"
  end
end
```

### Sitemap Generation
Create `config/sitemap.rb`:
```ruby
SitemapGenerator::Sitemap.default_host = 'https://jeet-desai.dev'

SitemapGenerator::Sitemap.create do
  add root_path, changefreq: 'weekly', priority: 1.0
  add about_path, changefreq: 'monthly', priority: 0.8
  add projects_path, changefreq: 'weekly', priority: 0.9

  Project.published.each do |project|
    add project_path(project), 
        lastmod: project.updated_at,
        changefreq: 'weekly',
        priority: 0.8
  end

  Article.published.each do |article|
    add article_path(article),
        lastmod: article.updated_at,
        changefreq: 'monthly',
        priority: 0.7
  end
end
```

Run: `bin/rake sitemap:refresh:no_ping`

---

## Phase 6: First Controller Implementation

### Pages Controller (Home & About)
Create `app/controllers/pages_controller.rb`:
```ruby
class PagesController < ApplicationController
  def home
    @featured_projects = Rails.cache.fetch('featured_projects', expires_in: 1.day) do
      Project.published.featured.limit(3)
    end
    
    @recent_articles = Rails.cache.fetch('recent_articles', expires_in: 1.day) do
      Article.published.limit(5)
    end
    
    @testimonials = Rails.cache.fetch('testimonials', expires_in: 1.day) do
      Testimonial.featured
    end
  end

  def about
    # Static content—could load from SiteConfig if needed
  end
end
```

### Projects Controller
Create `app/controllers/projects_controller.rb`:
```ruby
class ProjectsController < ApplicationController
  def index
    @projects = Project.published.order(published_at: :desc)
  end

  def show
    @project = Project.published.find_by!(slug: params[:id])
    @testimonials = @project.testimonials
  end
end
```

### Articles Controller (with Pagination)
Create `app/controllers/articles_controller.rb`:
```ruby
class ArticlesController < ApplicationController
  def index
    @pagy, @articles = pagy(Article.published, items: 10)
  end

  def show
    @article = Article.published.find_by!(slug: params[:id])
    @related = Article.published.where("id != ?", @article.id).limit(3)
  end
end
```

### Search Controller (Full-Text)
Create `app/controllers/search_controller.rb`:
```ruby
class SearchController < ApplicationController
  def index
    @query = params[:q]&.strip
    
    if @query.present? && @query.length > 2
      @articles = Article.search(@query).limit(10)
      @projects = Project.published.where("title ILIKE ? OR description ILIKE ?", 
        "%#{@query}%", "%#{@query}%").limit(10)
    else
      @articles = []
      @projects = []
    end
  end
end
```

### Contacts Controller (Email Notifications)
Create `app/controllers/contacts_controller.rb`:
```ruby
class ContactsController < ApplicationController
  skip_forgery_protection only: [:create]  # CORS-safe, but validate origin

  def new
    @contact_message = ContactMessage.new
  end

  def create
    @contact_message = ContactMessage.new(contact_params)

    if @contact_message.save
      redirect_to root_path, notice: 'Message sent! I\'ll reply soon.'
    else
      render :new, status: :unprocessable_entity
    end
  end

  private

  def contact_params
    params.require(:contact_message).permit(:name, :email, :subject, :message)
  end
end
```

---

## Phase 7: Seed Data
Create `db/seeds.rb`:
```ruby
# Clear existing data
[Project, Article, Testimonial, ContactMessage].each(&:delete_all)

# Create projects
5.times do |i|
  Project.create!(
    title: "Project #{i + 1}",
    slug: "project-#{i + 1}",
    description: Faker::Lorem.paragraph(sentence_count: 3),
    challenge: "Challenge for project #{i + 1}",
    solution: "Solution implemented...",
    results: { users: rand(1000..50000), revenue: "$#{rand(10..500)}K", conversion: "#{rand(5..20)}%" },
    technologies: %w[Rails React PostgreSQL].sample(2),
    url: "https://example#{i}.com",
    featured: i < 3,
    published_at: (i + 1).days.ago
  )
end

# Create articles
10.times do |i|
  Article.create!(
    title: "Article: #{Faker::Lorem.sentence}",
    slug: "article-#{i + 1}",
    content: Faker::Lorem.paragraphs(number: 5).join("\n\n"),
    excerpt: Faker::Lorem.paragraph(sentence_count: 2),
    tags: %w[Rails Performance AI].sample(2).to_s,
    published_at: (i + 1).days.ago
  )
end

# Create testimonials
3.times do |i|
  Testimonial.create!(
    author_name: Faker::Name.name,
    author_title: "#{Faker::Job.title} @ #{Faker::Company.name}",
    content: Faker::Lorem.paragraph(sentence_count: 3),
    featured: true
  )
end

puts "✅ Seeded #{Project.count} projects, #{Article.count} articles, #{Testimonial.count} testimonials"
```

Run: `bin/rails db:seed`

---

## Next Steps

1. **Generate the scaffold**:
   ```bash
   bash setup.sh  # See SETUP_SCRIPT.md
   ```

2. **Create basic views** (see VIEWS_TEMPLATES.md)

3. **Test the app**:
   ```bash
   bin/rails server
   # Visit http://localhost:3000
   ```

4. **Run prerendering**:
   ```bash
   bin/rake prerender:all
   ```

5. **Deploy**:
   ```bash
   kamal setup
   kamal deploy
   ```

---

## Command Cheat Sheet

```bash
# Development
bin/rails server                    # Start Rails
bin/rails console                   # Ruby REPL

# Database
bin/rails db:create                 # Create DB
bin/rails db:migrate                # Run migrations
bin/rails db:seed                   # Populate test data

# Prerendering
bin/rake prerender:all              # Generate static HTML
bin/rake sitemap:refresh:no_ping    # Generate sitemap

# Testing
bin/rspec                           # Run specs
bundle audit                        # Security check

# Deployment
kamal setup                         # First deploy
kamal deploy                        # Deploy updates
```

---

**Estimated Time:** 4-5 hours for phases 1-7  
**Next:** See VIEWS_TEMPLATES.md for HTML templates
