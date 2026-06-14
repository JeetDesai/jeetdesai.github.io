import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

export default function Layout({ children, title, description }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const siteTitle = `${title ? title + ' - ' : ''}Jeet Desai - AI-Augmented Software Architect`;
  const siteDescription = description || 'Building intelligent systems that automate, scale & drive business impact.';

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jeetdesai.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:description" content={siteDescription} />
      </Head>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between gap-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-sm shadow-primary/20">
                <span className="text-white font-bold text-lg">JD</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Jeet Desai</p>
                <p className="text-xs text-slate-500">AI-Augmented Architect</p>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
              <Link href="/" className="text-slate-950 border-b-2 border-orange-600 pb-1 transition">Home</Link>
              <Link href="/about" className="hover:text-orange-600 transition">About</Link>
              <Link href="/expertise" className="hover:text-orange-600 transition">Expertise</Link>
              <Link href="/projects" className="hover:text-orange-600 transition">Case Studies</Link>
              <Link href="/articles" className="hover:text-orange-600 transition">Articles</Link>
              <Link href="/tools" className="hover:text-orange-600 transition">Tools</Link>
              <Link href="/contact" className="hover:text-orange-600 transition">Contact</Link>
            </div>

            <div className="hidden md:flex items-center">
              <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-200/40 transition hover:bg-orange-700">
                Let's Connect
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-slate-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden pt-4 space-y-2 border-t border-gray-200 mt-4">
              <Link href="/" className="block py-2 text-slate-700 hover:text-orange-600 transition">Home</Link>
              <Link href="/about" className="block py-2 text-slate-700 hover:text-orange-600 transition">About</Link>
              <Link href="/expertise" className="block py-2 text-slate-700 hover:text-orange-600 transition">Expertise</Link>
              <Link href="/projects" className="block py-2 text-slate-700 hover:text-orange-600 transition">Case Studies</Link>
              <Link href="/articles" className="block py-2 text-slate-700 hover:text-orange-600 transition">Articles</Link>
              <Link href="/tools" className="block py-2 text-slate-700 hover:text-orange-600 transition">Tools</Link>
              <Link href="/contact" className="block py-2 text-slate-700 hover:text-orange-600 transition">Contact</Link>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="min-h-screen">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            <div>
              <h3 className="text-lg font-semibold mb-4">Jeet Desai</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                AI-Augmented Software Architect building intelligent systems, automation, and scalable software platforms.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><Link href="/about" className="hover:text-white transition">About</Link></li>
                <li><Link href="/projects" className="hover:text-white transition">Projects</Link></li>
                <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><a href="mailto:jeetdesai32800@gmail.com" className="hover:text-white transition">jeetdesai32800@gmail.com</a></li>
                <li><a href="https://linkedin.com/in/jeethdesai" className="hover:text-white transition">LinkedIn</a></li>
                <li><a href="https://github.com/jeetdesai" className="hover:text-white transition">GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col lg:flex-row justify-between gap-4 text-sm text-slate-500">
            <p>© 2024 Jeet Desai. All rights reserved.</p>
            <p>Built with Next.js & Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </>
  );
}
