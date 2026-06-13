# Portfolio Platform - View Templates & Frontend

## Base Layout
Create `app/views/layouts/application.html.erb`:

```erb
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="<%= page_description %>">
    <meta name="keywords" content="Rails, AI, Full-Stack Engineering">
    
    <!-- SEO -->
    <title><%= page_title %></title>
    <link rel="canonical" href="<%= request.url %>">
    <link rel="icon" href="/favicon.ico">
    
    <!-- Open Graph (Social Media) -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="<%= page_title %>">
    <meta property="og:description" content="<%= page_description %>">
    <meta property="og:image" content="<%= asset_pack_path 'og-image.png' %>">
    <meta property="og:url" content="<%= request.url %>">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="<%= page_title %>">
    <meta name="twitter:description" content="<%= page_description %>">
    
    <!-- Stylesheets -->
    <%= csrf_meta_tags %>
    <%= csp_meta_tag %>
    <%= stylesheet_link_tag "application", "data-turbo-track": "reload" %>
    <%= javascript_importmap_tags %>
  </head>

  <body class="bg-white text-gray-900 font-sans">
    <!-- Navigation -->
    <nav class="border-b border-gray-200 sticky top-0 bg-white z-50">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div class="text-2xl font-bold text-gray-900">
          <%= link_to 'Jeet Desai', root_path, class: 'hover:text-blue-600 transition' %>
        </div>
        
        <ul class="flex gap-6 text-sm font-medium">
          <li><%= nav_link 'About', about_path %></li>
          <li><%= nav_link 'Projects', projects_path %></li>
          <li><%= nav_link 'Articles', articles_path %></li>
          <li><%= nav_link 'Contact', new_contact_path %></li>
        </ul>
      </div>
    </nav>

    <!-- Flash Messages -->
    <% if notice %>
      <div class="bg-green-50 border border-green-200 text-green-800 px-4 py-3">
        <%= notice %>
      </div>
    <% end %>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <%= yield %>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white mt-20 py-8">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-3 gap-8 mb-8">
          <div>
            <h3 class="font-bold mb-4">Links</h3>
            <ul class="space-y-2 text-gray-400 text-sm">
              <li><a href="/" class="hover:text-white">Home</a></li>
              <li><a href="/about" class="hover:text-white">About</a></li>
              <li><a href="/projects" class="hover:text-white">Projects</a></li>
            </ul>
          </div>
          
          <div>
            <h3 class="font-bold mb-4">Social</h3>
            <ul class="space-y-2 text-gray-400 text-sm">
              <li><a href="https://github.com/jeetdesai" class="hover:text-white">GitHub</a></li>
              <li><a href="https://linkedin.com/in/jeetdesai" class="hover:text-white">LinkedIn</a></li>
              <li><a href="https://twitter.com/jeetdesai" class="hover:text-white">Twitter</a></li>
            </ul>
          </div>
          
          <div>
            <h3 class="font-bold mb-4">Contact</h3>
            <p class="text-gray-400 text-sm">hello@jeet-desai.dev</p>
          </div>
        </div>
        
        <div class="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          © <%= Date.today.year %> Jeet Desai. Built with Rails & performance in mind.
        </div>
      </div>
    </footer>
  </body>
</html>
```

Create `app/helpers/layout_helper.rb`:
```ruby
module LayoutHelper
  def page_title
    case request.path
    when '/'
      "Jeet Desai | Full-Stack Engineer & AI Architect"
    when '/about'
      "About | Jeet Desai"
    when '/projects'
      "Portfolio | Jeet Desai"
    when '/articles'
      "Articles & Insights | Jeet Desai"
    else
      "Jeet Desai"
    end
  end

  def page_description
    case request.path
    when '/'
      "Full-stack engineer, AI architect. Building high-performance systems with Rails, React, and AI/ML."
    when '/about'
      "12+ years of experience in FinTech, E-commerce, and scalable systems."
    when '/projects'
      "Featured portfolio projects and case studies."
    when '/articles'
      "Technical articles on Rails, performance optimization, and AI integration."
    else
      "Jeet Desai - Full-stack engineer and AI architect"
    end
  end

  def nav_link(text, path, options = {})
    link_to text, path, 
      class: "#{current_page?(path) ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600'} transition"
  end
end
```

---

## Home Page
Create `app/views/pages/home.html.erb`:

```erb
<!-- Hero Section -->
<section class="py-20 text-center">
  <h1 class="text-5xl font-bold text-gray-900 mb-4">
    Building high-performance systems
  </h1>
  <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
    Full-stack engineer, AI architect. Specializing in Rails, scalable architecture, and AI-augmented development.
  </p>
  <div class="flex gap-4 justify-center">
    <%= link_to 'View My Work', projects_path, class: 'px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition' %>
    <%= link_to 'Get in Touch', new_contact_path, class: 'px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition' %>
  </div>
</section>

<!-- Featured Projects -->
<section class="py-12 border-t border-b border-gray-200">
  <h2 class="text-3xl font-bold mb-8">Featured Projects</h2>
  
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <% @featured_projects.each do |project| %>
      <div class="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
        <% if project.thumbnail.attached? %>
          <div class="aspect-video bg-gray-100 overflow-hidden">
            <%= image_tag project.thumbnail, class: 'w-full h-full object-cover', alt: project.title %>
          </div>
        <% end %>
        
        <div class="p-4">
          <h3 class="font-bold text-lg mb-2">
            <%= link_to project.title, project_path(project), class: 'hover:text-blue-600' %>
          </h3>
          <p class="text-gray-600 text-sm mb-4"><%= truncate(project.description, length: 100) %></p>
          
          <div class="mb-4">
            <div class="flex flex-wrap gap-1">
              <% project.technologies.each do |tech| %>
                <span class="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                  <%= tech %>
                </span>
              <% end %>
            </div>
          </div>
          
          <% if project.results.present? %>
            <div class="text-sm text-gray-600 space-y-1">
              <% project.results.each do |key, value| %>
                <p><strong><%= key.titleize %>:</strong> <%= value %></p>
              <% end %>
            </div>
          <% end %>
        </div>
      </div>
    <% end %>
  </div>
  
  <%= link_to 'View All Projects →', projects_path, class: 'text-blue-600 font-semibold mt-8 inline-block hover:underline' %>
</section>

<!-- Recent Articles -->
<section class="py-12">
  <h2 class="text-3xl font-bold mb-8">Latest Articles</h2>
  
  <div class="space-y-6">
    <% @recent_articles.each do |article| %>
      <div class="border-b border-gray-200 pb-6 last:border-b-0">
        <h3 class="text-xl font-bold mb-2">
          <%= link_to article.title, article_path(article), class: 'hover:text-blue-600' %>
        </h3>
        <p class="text-gray-600 text-sm mb-3">
          <%= time_tag article.published_at, format: :long %>
        </p>
        <p class="text-gray-700 mb-3"><%= truncate(article.excerpt, length: 200) %></p>
        <%= link_to 'Read More →', article_path(article), class: 'text-blue-600 font-semibold hover:underline' %>
      </div>
    <% end %>
  </div>
  
  <%= link_to 'View All Articles →', articles_path, class: 'text-blue-600 font-semibold mt-8 inline-block hover:underline' %>
</section>

<!-- Testimonials -->
<% if @testimonials.any? %>
  <section class="py-12 bg-gray-50 rounded-lg p-8 mt-12">
    <h2 class="text-3xl font-bold mb-8 text-center">What Others Say</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <% @testimonials.each do |testimonial| %>
        <blockquote class="border-l-4 border-blue-600 pl-4">
          <p class="text-gray-700 mb-4 italic">"<%= testimonial.content %>"</p>
          <footer class="text-gray-600 text-sm">
            <strong><%= testimonial.author_name %></strong>
            <br>
            <%= testimonial.author_title %>
          </footer>
        </blockquote>
      <% end %>
    </div>
  </section>
<% end %>

<!-- CTA Section -->
<section class="py-12 text-center border-t border-gray-200 mt-12">
  <h2 class="text-3xl font-bold mb-4">Let's Work Together</h2>
  <p class="text-gray-600 mb-6">Have a project in mind or want to discuss ideas?</p>
  <%= link_to 'Send Me a Message →', new_contact_path, class: 'px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition' %>
</section>
```

---

## About Page
Create `app/views/pages/about.html.erb`:

```erb
<div class="prose max-w-none">
  <h1>About Me</h1>
  
  <section class="mb-12">
    <h2>Jeet Desai</h2>
    <p class="lead">
      Full-stack engineer and AI architect with 12+ years of experience building high-performance systems. 
      Specializing in Rails, microservices architecture, and AI-augmented development workflows.
    </p>
  </section>

  <!-- Experience -->
  <section class="mb-12">
    <h2>Experience</h2>
    
    <div class="space-y-6">
      <div class="border-l-4 border-blue-600 pl-4">
        <h3>Principal Engineer (AI & Architecture)</h3>
        <p class="text-gray-600">TechCorp Inc. | 2021 - Present</p>
        <ul class="list-disc pl-5 text-gray-700">
          <li>Designed and built microservices architecture supporting 10M+ users</li>
          <li>Integrated AI/ML models into production Rails applications (GPT-4, Claude)</li>
          <li>Led performance optimization initiatives (40% latency reduction)</li>
          <li>Mentored 8 engineers in advanced Rails and architecture patterns</li>
        </ul>
      </div>

      <div class="border-l-4 border-blue-600 pl-4">
        <h3>Senior Full-Stack Engineer</h3>
        <p class="text-gray-600">FinTech Innovations | 2017 - 2021</p>
        <ul class="list-disc pl-5 text-gray-700">
          <li>Built real-time payment processing system (5M+ transactions/day)</li>
          <li>Implemented Redis caching strategy (70% cache hit rate)</li>
          <li>Designed PostgreSQL sharding for $100M+ financial data</li>
        </ul>
      </div>

      <div class="border-l-4 border-blue-600 pl-4">
        <h3>Full-Stack Developer</h3>
        <p class="text-gray-600">E-commerce Startup | 2013 - 2017</p>
        <ul class="list-disc pl-5 text-gray-700">
          <li>Scaled Rails application from 10k to 1M daily users</li>
          <li>Optimized database queries (N+1 elimination)</li>
          <li>Built React components for dynamic UX</li>
        </ul>
      </div>
    </div>
  </section>

  <!-- Technical Skills -->
  <section class="mb-12">
    <h2>Technical Stack</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 class="font-bold mb-3">Backend</h3>
        <ul class="space-y-2">
          <li><strong>Languages:</strong> Ruby, Python, JavaScript</li>
          <li><strong>Frameworks:</strong> Rails, Django, FastAPI</li>
          <li><strong>Databases:</strong> PostgreSQL, MySQL, MongoDB</li>
          <li><strong>Caching:</strong> Redis, Memcached</li>
          <li><strong>Queues:</strong> Sidekiq, Resque, Celery</li>
        </ul>
      </div>

      <div>
        <h3 class="font-bold mb-3">Frontend & DevOps</h3>
        <ul class="space-y-2">
          <li><strong>Frontend:</strong> React, Vue.js, Stimulus.js</li>
          <li><strong>CSS:</strong> Tailwind CSS, Sass, PostCSS</li>
          <li><strong>DevOps:</strong> Docker, Kubernetes, GitHub Actions</li>
          <li><strong>Cloud:</strong> AWS, GCP, Heroku, Render</li>
          <li><strong>AI/ML:</strong> GPT-4, Claude, OpenAI, Anthropic APIs</li>
        </ul>
      </div>
    </div>
  </section>

  <!-- Core Competencies -->
  <section class="mb-12">
    <h2>Core Competencies</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <% competencies = [
        'Microservices Architecture',
        'Database Optimization',
        'Performance Tuning',
        'AI Integration',
        'Security (OWASP)',
        'Scalability Design',
        'Caching Strategies',
        'API Design (REST/GraphQL)',
        'Team Leadership'
      ] %>
      
      <% competencies.each do |comp| %>
        <div class="p-3 bg-blue-50 rounded-lg border border-blue-200">
          <%= comp %>
        </div>
      <% end %>
    </div>
  </section>

  <!-- CTA -->
  <section class="text-center py-12 border-t border-gray-200">
    <p class="mb-6">Interested in collaboration or have questions?</p>
    <%= link_to 'Get in Touch', new_contact_path, class: 'px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition' %>
  </section>
</div>
```

---

## Projects Index
Create `app/views/projects/index.html.erb`:

```erb
<h1 class="text-4xl font-bold mb-8">Portfolio</h1>

<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
  <% @projects.each do |project| %>
    <div class="border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition group">
      <% if project.thumbnail.attached? %>
        <div class="aspect-video bg-gray-100 overflow-hidden">
          <%= image_tag project.thumbnail, class: 'w-full h-full object-cover group-hover:scale-105 transition duration-300', alt: project.title %>
        </div>
      <% end %>
      
      <div class="p-6">
        <h2 class="text-2xl font-bold mb-2">
          <%= link_to project.title, project_path(project), class: 'hover:text-blue-600' %>
        </h2>
        
        <p class="text-gray-600 mb-4"><%= project.description %></p>
        
        <div class="mb-4">
          <div class="flex flex-wrap gap-2 mb-4">
            <% project.technologies.each do |tech| %>
              <span class="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                <%= tech %>
              </span>
            <% end %>
          </div>
        </div>
        
        <% if project.results.present? %>
          <div class="bg-gray-50 p-4 rounded mb-4">
            <p class="text-sm font-bold text-gray-700 mb-2">Impact & Metrics</p>
            <% project.results.each do |key, value| %>
              <div class="text-sm text-gray-600 flex justify-between">
                <span><%= key.titleize %>:</span>
                <strong><%= value %></strong>
              </div>
            <% end %>
          </div>
        <% end %>
        
        <div class="flex gap-3">
          <%= link_to 'View Case Study →', project_path(project), class: 'text-blue-600 font-semibold hover:underline' %>
          <% if project.url.present? %>
            <%= link_to 'Live Site ↗', project.url, target: '_blank', rel: 'noopener', class: 'text-gray-600 hover:text-gray-900' %>
          <% end %>
        </div>
      </div>
    </div>
  <% end %>
</div>
```

---

## Project Detail
Create `app/views/projects/show.html.erb`:

```erb
<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
  <!-- Main Content -->
  <div class="md:col-span-2">
    <h1 class="text-4xl font-bold mb-4"><%= @project.title %></h1>
    
    <% if @project.thumbnail.attached? %>
      <div class="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-8">
        <%= image_tag @project.thumbnail, class: 'w-full h-full object-cover', alt: @project.title %>
      </div>
    <% end %>

    <!-- Case Study Sections -->
    <div class="prose prose-lg max-w-none mb-12">
      <h2>Overview</h2>
      <p><%= @project.description %></p>

      <h2>The Challenge</h2>
      <p><%= simple_format(@project.challenge) %></p>

      <h2>The Solution</h2>
      <p><%= simple_format(@project.solution) %></p>

      <h2>Results & Impact</h2>
      <% if @project.results.present? %>
        <ul>
          <% @project.results.each do |key, value| %>
            <li><strong><%= key.titleize %>:</strong> <%= value %></li>
          <% end %>
        </ul>
      <% end %>
    </div>

    <!-- Testimonials -->
    <% if @testimonials.any? %>
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-8 mb-12">
        <h3 class="text-xl font-bold mb-6">Client Feedback</h3>
        <% @testimonials.each do |testimonial| %>
          <blockquote class="mb-6 last:mb-0 border-l-4 border-blue-600 pl-4">
            <p class="text-gray-700 italic mb-2">"<%= testimonial.content %>"</p>
            <footer class="text-gray-600 text-sm">
              <strong><%= testimonial.author_name %></strong> – <%= testimonial.author_title %>
            </footer>
          </blockquote>
        <% end %>
      </div>
    <% end %>
  </div>

  <!-- Sidebar -->
  <aside>
    <!-- Technologies -->
    <div class="bg-gray-50 rounded-lg p-6 mb-6">
      <h3 class="font-bold text-lg mb-4">Technologies</h3>
      <div class="flex flex-wrap gap-2">
        <% @project.technologies.each do |tech| %>
          <span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
            <%= tech %>
          </span>
        <% end %>
      </div>
    </div>

    <!-- Links -->
    <div class="bg-gray-50 rounded-lg p-6">
      <h3 class="font-bold text-lg mb-4">Links</h3>
      <% if @project.url.present? %>
        <a href="<%= @project.url %>" target="_blank" rel="noopener" class="block text-blue-600 hover:underline mb-3">
          Visit Live Site ↗
        </a>
      <% end %>
      <%= link_to '← Back to Projects', projects_path, class: 'text-gray-600 hover:text-gray-900' %>
    </div>
  </aside>
</div>
```

---

## Contact Form
Create `app/views/contacts/new.html.erb`:

```erb
<h1 class="text-4xl font-bold mb-8">Get in Touch</h1>

<div class="max-w-2xl">
  <p class="text-gray-600 mb-8">
    Have a question or project idea? Drop me a message and I'll get back to you as soon as possible.
  </p>

  <%= form_with model: @contact_message, local: true, class: 'space-y-6' do |f| %>
    <% if @contact_message.errors.any? %>
      <div class="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
        <h2 class="font-bold mb-2"><%= pluralize(@contact_message.errors.count, "error") %> prohibited this message:</h2>
        <ul class="list-disc pl-5">
          <% @contact_message.errors.full_messages.each do |message| %>
            <li><%= message %></li>
          <% end %>
        </ul>
      </div>
    <% end %>

    <div>
      <%= f.label :name, 'Name', class: 'block font-semibold mb-2' %>
      <%= f.text_field :name, placeholder: 'John Doe', class: 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' %>
    </div>

    <div>
      <%= f.label :email, 'Email', class: 'block font-semibold mb-2' %>
      <%= f.email_field :email, placeholder: 'you@example.com', class: 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' %>
    </div>

    <div>
      <%= f.label :subject, 'Subject', class: 'block font-semibold mb-2' %>
      <%= f.text_field :subject, placeholder: 'What is this about?', class: 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' %>
    </div>

    <div>
      <%= f.label :message, 'Message', class: 'block font-semibold mb-2' %>
      <%= f.text_area :message, placeholder: 'Tell me about your project...', rows: 6, class: 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' %>
    </div>

    <div>
      <%= f.submit 'Send Message', class: 'w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition' %>
    </div>
  <% end %>
</div>
```

---

## Articles Index
Create `app/views/articles/index.html.erb`:

```erb
<h1 class="text-4xl font-bold mb-8">Articles & Insights</h1>

<div class="max-w-2xl">
  <div class="space-y-8">
    <% @articles.each do |article| %>
      <article class="border-b border-gray-200 pb-8 last:border-b-0">
        <time datetime="<%= article.published_at.iso8601 %>" class="text-gray-600 text-sm">
          <%= article.published_at.strftime('%B %d, %Y') %>
        </time>
        
        <h2 class="text-2xl font-bold my-2">
          <%= link_to article.title, article_path(article), class: 'hover:text-blue-600' %>
        </h2>
        
        <p class="text-gray-700 mb-4"><%= article.excerpt %></p>
        
        <% if article.tags.present? %>
          <div class="flex flex-wrap gap-2 mb-4">
            <% article.tags.split(',').map(&:strip).each do |tag| %>
              <span class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                <%= tag %>
              </span>
            <% end %>
          </div>
        <% end %>
        
        <%= link_to 'Read More →', article_path(article), class: 'text-blue-600 font-semibold hover:underline' %>
      </article>
    <% end %>
  </div>

  <!-- Pagination -->
  <% if @pagy %>
    <div class="mt-12 flex justify-center gap-2">
      <%== pagy_nav(@pagy) %>
    </div>
  <% end %>
</div>
```

---

## Search Results
Create `app/views/search/index.html.erb`:

```erb
<h1 class="text-4xl font-bold mb-8">Search</h1>

<div class="max-w-2xl mb-8">
  <form action="/search" method="get" class="flex gap-2">
    <input 
      type="text" 
      name="q" 
      value="<%= @query %>" 
      placeholder="Search articles & projects..." 
      class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      autocomplete="off"
    >
    <button type="submit" class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
      Search
    </button>
  </form>
</div>

<% if @query.blank? %>
  <p class="text-gray-600">Enter a search term to find articles and projects.</p>
<% elsif @articles.blank? && @projects.blank? %>
  <p class="text-gray-600">No results found for "<%= @query %>". Try different keywords.</p>
<% else %>
  <div class="space-y-12">
    <!-- Articles Results -->
    <% if @articles.any? %>
      <section>
        <h2 class="text-2xl font-bold mb-6">Articles</h2>
        <div class="space-y-4">
          <% @articles.each do |article| %>
            <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
              <h3 class="font-bold mb-2">
                <%= link_to article.title, article_path(article), class: 'hover:text-blue-600' %>
              </h3>
              <p class="text-gray-600 text-sm"><%= truncate(article.excerpt, length: 150) %></p>
            </div>
          <% end %>
        </div>
      </section>
    <% end %>

    <!-- Projects Results -->
    <% if @projects.any? %>
      <section>
        <h2 class="text-2xl font-bold mb-6">Projects</h2>
        <div class="space-y-4">
          <% @projects.each do |project| %>
            <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
              <h3 class="font-bold mb-2">
                <%= link_to project.title, project_path(project), class: 'hover:text-blue-600' %>
              </h3>
              <p class="text-gray-600 text-sm"><%= truncate(project.description, length: 150) %></p>
            </div>
          <% end %>
        </div>
      </section>
    <% end %>
  </div>
<% end %>
```

---

## CSS/Tailwind Configuration

Create `app/assets/stylesheets/application.tailwind.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Prose enhancements */
@layer components {
  .prose {
    @apply max-w-none;
  }
  
  .prose h2 {
    @apply text-2xl font-bold mt-8 mb-4;
  }
  
  .prose h3 {
    @apply text-xl font-bold mt-6 mb-3;
  }
  
  .prose p {
    @apply text-gray-700 mb-4;
  }
  
  .prose ul, .prose ol {
    @apply pl-6 mb-4 space-y-2;
  }
  
  .prose li {
    @apply text-gray-700;
  }
  
  .prose a {
    @apply text-blue-600 hover:underline;
  }
  
  .prose blockquote {
    @apply border-l-4 border-blue-600 pl-4 italic text-gray-600 my-4;
  }
}
```

---

**Next:** Implement search functionality and email notifications in `IMPLEMENTATION_NEXT_STEPS.md`
