# Jeet Desai - AI-Augmented Software Architect Portfolio

A **lightning-fast, static-first** Next.js portfolio website showcasing AI-augmented engineering expertise, featured projects, technical articles, and consulting services.

![Performance](https://img.shields.io/badge/FCP-%3C500ms-success)
![Performance](https://img.shields.io/badge/LCP-%3C1s-success)
![Lighthouse](https://img.shields.io/badge/Lighthouse-95%2B-brightgreen)
![Static](https://img.shields.io/badge/Type-Static%20Site-blue)

## ⚡ Performance Targets

- **First Contentful Paint (FCP):** <500ms
- **Largest Contentful Paint (LCP):** <1s
- **Page Load:** <1s (99th percentile)
- **Cumulative Layout Shift:** <0.1
- **Lighthouse Score:** >95/100

**Why static?** No server = no latency, infinitely scalable, zero maintenance, global CDN performance.

## 🎯 What's Inside

**Pages:**
- 🏠 **Home** — Hero section, featured projects, impact metrics, testimonials
- 📄 **About** — Experience, skills, education, certifications
- 🎯 **Projects** — Portfolio grid, case studies with metrics and results
- 📝 **Blog** — Technical articles with full-text search by title, excerpt, tags
- 📧 **Contact** — Contact form, FAQs, social links

**Features:**
- ✅ Zero database required (static content)
- ✅ SEO optimized (meta tags, Open Graph, schema markup)
- ✅ Mobile-responsive design
- ✅ Dark mode ready
- ✅ Image optimization
- ✅ Automatic sitemap
- ✅ Contact form with Formspree integration
- ✅ Article search and filtering

## 🏗 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 14 (App Router) |
| **Styling** | Tailwind CSS 3.3 |
| **Content** | JavaScript/JSON files |
| **Deployment** | Vercel / Netlify |
| **Hosting** | Global CDN (edge caching) |
| **SEO** | Built-in meta tags & Open Graph |

## 📁 Project Structure

```
profile/
├── pages/                    # Next.js pages (file-based routing)
│   ├── _app.jsx             # App wrapper with styles
│   ├── _document.jsx        # HTML document shell
│   ├── index.jsx            # Home page
│   ├── about.jsx            # About page
│   ├── contact.jsx          # Contact page
│   ├── projects/
│   │   ├── index.jsx       # Projects listing
│   │   └── [slug].jsx      # Dynamic project detail
│   └── blog/
│       ├── index.jsx       # Blog listing with search
│       └── [slug].jsx      # Dynamic article detail
├── components/
│   └── Layout.jsx           # Reusable page layout
├── data/                    # Content as JavaScript
│   ├── projects.js         # Project data
│   ├── articles.js         # Blog articles
│   └── testimonials.js     # Testimonials
├── styles/
│   └── globals.css         # Global Tailwind styles
├── public/                 # Static assets
│   ├── favicon.ico
│   ├── projects/          # Project images
│   └── testimonials/      # Testimonial images
├── utils/                 # Utility functions
├── package.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── jsconfig.json
```

## 🚀 Quick Start

### 1. Clone & Install

```bash
cd profile
npm install
```

### 2. Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — hot reload enabled!

### 3. Build for Production

```bash
npm run build
```

Generates static HTML in `out/` directory.

### 4. Preview Production Build

```bash
npm start
```

## 📝 Content Management

### Adding a Project

Edit `data/projects.js`:

```javascript
{
  id: 5,
  slug: 'unique-project-slug',
  title: 'Project Title',
  tagline: 'Category | Tagline',
  description: 'Short description...',
  image: '/projects/project-image.jpg',
  year: '2024',
  status: 'Live',
  technologies: ['React', 'Rails', 'PostgreSQL'],
  highlights: [
    'Key achievement 1',
    'Key achievement 2',
  ],
  metrics: {
    dataPoints: '10M+ records',
    uptime: '99%',
  },
  challenge: 'Problem statement...',
  solution: 'How we solved it...',
  results: [
    'Result 1',
    'Result 2',
  ],
}
```

Pages are automatically generated at `/projects/unique-project-slug`

### Adding a Blog Article

Edit `data/articles.js`:

```javascript
{
  id: 4,
  slug: 'article-title-slug',
  title: 'Full Article Title',
  excerpt: 'Short summary for listing...',
  content: `# Markdown Content

Full article content here with **bold**, *italic*, code blocks, etc.`,
  author: 'Jeet Desai',
  date: '2024-06-15',
  readTime: '10 min read',
  tags: ['Tag1', 'Tag2'],
}
```

Pages are automatically generated at `/blog/article-title-slug`

### Adding Testimonials

Edit `data/testimonials.js`:

```javascript
{
  id: 1,
  author: 'Client Name',
  role: 'Job Title',
  company: 'Company',
  content: 'Testimonial quote...',
  image: '/testimonials/client.jpg',
}
```

## 🚢 Deployment

### Vercel (Recommended)

```bash
# 1. Push to GitHub
git add .
git commit -m "Initial commit"
git push origin main

# 2. Import on Vercel
# - Go to vercel.com
# - Click "New Project"
# - Select your GitHub repo
# - Deploy (auto-detected Next.js)
```

Your site is live in seconds! 🎉

**Benefits:**
- Automatic deployments on push
- Preview deployments for PRs
- Global CDN
- Free HTTPS
- Zero configuration

### Netlify

1. Connect GitHub repository
2. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `out`
3. Deploy!

### GitHub Pages

```bash
npm run build
npx gh-pages -d out
```

## 🎨 Customization

### Brand Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: '#8B4513',      // Main brand color
  secondary: '#C85A17',    // Secondary color
  accent: '#FF6B35',       // Highlight/CTA color
  dark: '#1a1a1a',         // Dark background
  light: '#f5f5f5',        // Light background
}
```

### Fonts

Fonts are imported in `pages/_document.jsx`. To change:

1. Go to [Google Fonts](https://fonts.google.com)
2. Select fonts
3. Copy import link
4. Update `_document.jsx`

### Contact Form

By default, forms log to console. To enable email:

1. Sign up at [formspree.io](https://formspree.io) (free)
2. Create a form and get your endpoint
3. Update `pages/contact.jsx`:

```javascript
const formspreeEndpoint = 'https://formspree.io/f/YOUR_FORM_ID';
```

## 📊 Performance Monitoring

### Lighthouse Audit

```bash
npm run build && npm start
```

Then in Chrome DevTools → Lighthouse → Analyze page load.

**Target scores:**
- Performance: 95+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

### Web Vitals

Monitor Core Web Vitals in production:
- Install [web-vitals](https://www.npmjs.com/package/web-vitals)
- Send metrics to analytics provider

## 🔍 SEO

### Built-in Optimizations
- ✅ Meta tags on all pages
- ✅ Open Graph for social sharing
- ✅ Automatic sitemap at `/sitemap.xml`
- ✅ Robots.txt for search engines
- ✅ Canonical URLs
- ✅ Structured data ready

### Verify SEO

```bash
# Check meta tags
npm run build && npm start

# Test with Google Search Console
# Test with PageSpeed Insights
```

## 🛡️ Security

Static sites are inherently more secure:
- ✅ No server-side vulnerabilities
- ✅ No SQL injection (no database)
- ✅ No authentication bypass
- ✅ HTTPS enforced (Vercel/Netlify default)
- ✅ No sensitive data in code

## 📱 Responsive Design

All pages are mobile-first:

| Breakpoint | Width | Example |
|-----------|-------|---------|
| Mobile | 320px | iPhone SE |
| Tablet | 768px | iPad |
| Desktop | 1024px | MacBook |
| Wide | 1280px | Large monitors |

## 🔧 Development Workflow

### Add a New Page

1. Create file in `pages/` directory
2. Import `Layout` component
3. Wrap content

```jsx
import Layout from '@/components/Layout';

export default function NewPage() {
  return (
    <Layout title="Page Title" description="Page description">
      {/* Your content */}
    </Layout>
  );
}
```

### Add Dynamic Routes

For projects and articles, use `[slug].jsx`:

```jsx
export async function getStaticProps({ params }) {
  const item = getItemBySlug(params.slug);
  return { props: { item }, revalidate: 60 };
}

export async function getStaticPaths() {
  return {
    paths: items.map(i => ({ params: { slug: i.slug } })),
    fallback: false,
  };
}
```

### Update Navigation

Edit `components/Layout.jsx` to modify the main menu.

## 🐛 Troubleshooting

### Build fails
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Port 3000 in use
```bash
npm run dev -- -p 3001
```

### Images not loading
- Use paths like `/projects/image.jpg`
- Place images in `public/` folder
- Ensure no special characters in filenames

### Build is slow
```bash
npm run build -- --debug
```

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vercel Deployment](https://vercel.com/docs)
- [Web Vitals Guide](https://web.dev/vitals/)
- [Google Lighthouse](https://developers.google.com/web/tools/lighthouse)

## 📊 Analytics (Optional)

Add analytics to `_document.jsx`:

```jsx
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

## 🚀 Production Checklist

- [ ] Update `next.config.js` environment variables
- [ ] Configure contact form with Formspree
- [ ] Add Google Analytics (optional)
- [ ] Test all pages on mobile
- [ ] Run Lighthouse audit
- [ ] Set up Google Search Console
- [ ] Configure custom domain (optional)
- [ ] Enable analytics on Vercel/Netlify
- [ ] Test contact form
- [ ] Verify SEO meta tags

## 📄 License

© 2024 Jeet Desai. All rights reserved.

## 📧 Support

Questions? Reach out:
- Email: jeetdesai32800@gmail.com
- LinkedIn: [linkedin.com/in/jeethdesai](https://linkedin.com/in/jeethdesai)
- GitHub: [github.com/jeetdesai](https://github.com/jeetdesai)

---

**Built with ⚡ Next.js • Styled with 🎨 Tailwind CSS • Deployed on 🚀 Vercel**
