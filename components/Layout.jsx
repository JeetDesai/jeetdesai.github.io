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
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">JD</span>
              </div>
              <span className="font-semibold text-primary hidden sm:inline">Jeet Desai</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="hover:text-primary transition">Home</Link>
              <Link href="/about" className="hover:text-primary transition">About</Link>
              <Link href="/projects" className="hover:text-primary transition">Projects</Link>
              <Link href="/blog" className="hover:text-primary transition">Blog</Link>
              <Link href="/contact" className="hover:text-primary transition">Contact</Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
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
            <div className="md:hidden pt-4 space-y-2 border-t mt-4">
              <Link href="/" className="block py-2 hover:text-primary transition">Home</Link>
              <Link href="/about" className="block py-2 hover:text-primary transition">About</Link>
              <Link href="/projects" className="block py-2 hover:text-primary transition">Projects</Link>
              <Link href="/blog" className="block py-2 hover:text-primary transition">Blog</Link>
              <Link href="/contact" className="block py-2 hover:text-primary transition">Contact</Link>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="min-h-screen">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-dark text-light py-12 mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4">About</h3>
              <p className="text-sm text-gray-400">
                Building intelligent systems that automate, scale & drive business impact.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Links</h3>
              <ul className="text-sm text-gray-400 space-y-2">
                <li><Link href="/about" className="hover:text-primary transition">About</Link></li>
                <li><Link href="/projects" className="hover:text-primary transition">Projects</Link></li>
                <li><Link href="/blog" className="hover:text-primary transition">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="text-sm text-gray-400 space-y-2">
                <li><a href="mailto:jeetdesai32800@gmail.com" className="hover:text-primary transition">Email</a></li>
                <li><a href="https://linkedin.com/in/jeethdesai" className="hover:text-primary transition">LinkedIn</a></li>
                <li><a href="https://github.com/jeetdesai" className="hover:text-primary transition">GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 flex justify-between items-center">
            <p className="text-sm text-gray-400">&copy; 2024 Jeet Desai. All rights reserved.</p>
            <p className="text-sm text-gray-400">Built with Next.js & Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </>
  );
}
