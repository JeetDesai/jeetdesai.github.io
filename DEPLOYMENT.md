# 🚀 Deployment Guide

Quick-start guide for deploying your Next.js portfolio to the world.

## Option 1: Vercel (Recommended) ⭐

Vercel is optimized for Next.js and offers the best experience.

### Step 1: Push to GitHub

```bash
cd ~/Rails_projects/profile

# Initialize Git (if not already done)
git init
git add .
git commit -m "Initial portfolio commit"

# Add remote and push
git remote add origin https://github.com/YOUR_USERNAME/profile.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"New Project"**
3. Select your GitHub repository
4. Click **"Import"**
5. Vercel auto-detects Next.js configuration
6. Click **"Deploy"**

Your site is live! 🎉

### Step 3: Custom Domain (Optional)

In Vercel dashboard:
1. Go to **Settings → Domains**
2. Add your custom domain
3. Follow DNS configuration instructions
4. HTTPS is automatic

## Option 2: Netlify

Works great for static Next.js sites.

### Step 1: Build Static Site

```bash
npm run build
```

This creates an `out/` folder with static HTML.

### Step 2: Deploy to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Click **"New site from Git"**
3. Select your GitHub repository
4. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `out`
5. Click **"Deploy site"**

Your site is live! 🎉

### Step 3: Custom Domain

In Netlify dashboard:
1. Go to **Settings → Domain management**
2. Add your custom domain
3. Update DNS records as instructed

## Option 3: GitHub Pages (Free)

Simple but requires manual deployment.

### Step 1: Install GitHub Pages Deployer

```bash
npm install --save-dev gh-pages
```

### Step 2: Build & Deploy

```bash
npm run build
npx gh-pages -d out
```

### Step 3: Enable Pages

On GitHub:
1. Go to repository **Settings → Pages**
2. Select **"gh-pages"** branch
3. Your site is live at `https://USERNAME.github.io/profile`

## Performance Tips

After deployment:

### 1. Enable Caching

**Vercel:** Automatic  
**Netlify:** Set headers in `netlify.toml`:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    Cache-Control = "public, max-age=3600"
```

### 2. Monitor Performance

- **Vercel:** Built-in analytics
- **Netlify:** Analytics in dashboard
- **Manual:** Use [PageSpeed Insights](https://pagespeed.web.dev/)

### 3. Set Up Analytics (Optional)

Add Google Analytics:

```jsx
// pages/_document.jsx
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXX');
</script>
```

## Continuous Deployment

### Automatic Deploys

Once connected to GitHub, every push triggers a deployment:

```bash
git add .
git commit -m "Update portfolio"
git push origin main
```

Your site updates automatically! ✨

### Preview Deployments

Create a pull request → Vercel/Netlify creates a preview URL → Share with team for feedback.

## Custom Domain Setup

### Step 1: Buy a Domain

Popular registrars:
- Namecheap
- GoDaddy
- Google Domains
- Route53

### Step 2: Point to Vercel/Netlify

**Vercel:**
1. Add domain in dashboard
2. Copy nameservers
3. Update at your registrar

**Netlify:**
1. Add domain in dashboard
2. Update DNS records (CNAME, A, etc.)
3. Follow their specific instructions

### Step 3: Wait for DNS

DNS propagation takes 24-48 hours but usually faster.

## Troubleshooting

### Build fails on Vercel/Netlify

Check build logs, usually due to:
- Missing environment variables
- Node version mismatch
- Missing dependencies

Fix:
```bash
npm install
npm run build
```

### Site is blank

Check:
- Output directory is `out/` for static export
- All image paths start with `/`
- No absolute file paths in code

### Domain not connecting

1. Wait for DNS propagation (24-48 hours)
2. Verify DNS records at [MXToolbox](https://mxtoolbox.com/mxtoolbox/checkmx)
3. Check domain configuration in dashboard

## Environment Variables (If Needed)

For contact form with Formspree:

**Vercel:**
1. Go to **Settings → Environment Variables**
2. Add `NEXT_PUBLIC_FORMSPREE_ID=xxxxx`
3. Redeploy

**Netlify:**
1. Go to **Site settings → Build & deploy → Environment**
2. Add `NEXT_PUBLIC_FORMSPREE_ID=xxxxx`
3. Redeploy

## Rollback to Previous Deployment

**Vercel:** Dashboard → Deployments → Click previous → Redeploy  
**Netlify:** Dashboard → Deploys → Click previous → Publish

## Monitoring & Analytics

### Vercel Analytics

- Go to **Analytics** tab
- Monitor Web Vitals in real-time
- View traffic patterns

### Netlify Analytics

- Go to **Analytics** tab
- Track visitors, bandwidth usage
- Monitor build times

### Google Search Console

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add your domain
3. Submit sitemap (`/sitemap.xml`)
4. Monitor search performance

## What's Next?

- ✅ Site deployed and live
- ✅ Custom domain configured
- ✅ Analytics tracking traffic
- ✅ Continuous deployment enabled

Consider:
- [ ] Add Google Analytics
- [ ] Submit to search engines
- [ ] Set up contact form emails
- [ ] Monitor performance metrics
- [ ] Plan content updates

---

**Your portfolio is now live to the world! 🌍**

Share the link with your network and start getting noticed.
