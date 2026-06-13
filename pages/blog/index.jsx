import Layout from '../../components/Layout';
import Link from 'next/link';
import { articles } from '../../data/articles';
import { useState } from 'react';

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <Layout 
      title="Blog"
      description="Articles on AI-augmented engineering, system architecture, database optimization, and scalable software development."
    >
      {/* Header */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Articles & Insights</h1>
          <p className="text-lg text-gray-100">
            Thoughts on AI-augmented engineering, system architecture, database optimization, and building scalable software.
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="py-12 bg-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <input
              type="search"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20"
            />
            <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredArticles.length > 0 ? (
            <div className="space-y-12">
              {filteredArticles.map((article) => (
                <article key={article.id} className="border-b pb-12 last:border-b-0">
                  <Link href={`/blog/${article.slug}`} className="group">
                    <h2 className="text-3xl font-bold mb-3 group-hover:text-primary transition">
                      {article.title}
                    </h2>
                  </Link>

                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <span>{new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                    <span>•</span>
                    <span>By {article.author}</span>
                  </div>

                  <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag, idx) => (
                        <span key={idx} className="text-xs bg-light text-primary px-3 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link href={`/blog/${article.slug}`} className="inline-flex items-center text-primary font-semibold group hover:gap-2 transition-all">
                      Read More
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No articles found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Topics */}
      <section className="py-20 bg-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Topics</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {['AI', 'Engineering', 'Development', 'Rails', 'Performance', 'Database', 'Architecture', 'Microservices', 'System Design', 'DevOps', 'Security', 'Scaling'].map((topic) => (
              <button
                key={topic}
                onClick={() => setSearchQuery(topic)}
                className="px-4 py-2 bg-white rounded-lg border border-gray-200 hover:border-primary hover:text-primary transition text-center text-sm font-medium"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
