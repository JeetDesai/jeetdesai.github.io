import Layout from '../../components/Layout';
import Link from 'next/link';
import { articles, getArticleBySlug } from '../../data/articles';

export async function getStaticProps({ params }) {
  const article = getArticleBySlug(params.slug);
  
  if (!article) {
    return {
      notFound: true,
    };
  }

  return {
    props: { article },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  return {
    paths: articles.map(a => ({
      params: { slug: a.slug },
    })),
    fallback: false,
  };
}

export default function ArticleDetail({ article }) {
  const relatedArticles = articles.filter(a => a.id !== article.id).slice(0, 3);

  return (
    <Layout 
      title={article.title}
      description={article.excerpt}
    >
      {/* Article Header */}
      <article className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center text-primary hover:text-accent mb-6">
            <span className="mr-2">←</span> Back to Articles
          </Link>

          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{article.title}</h1>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <span>By {article.author}</span>
              </div>
              <span className="hidden sm:inline">•</span>
              <span>{new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, idx) => (
                <span key={idx} className="inline-block bg-light text-primary px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none prose-headings:text-primary prose-a:text-primary prose-a:hover:text-accent prose-strong:text-dark prose-code:text-accent prose-pre:bg-dark prose-pre:text-light">
            {/* Render markdown content as HTML */}
            <div className="space-y-6">
              {article.content.split('\n\n').map((paragraph, idx) => {
                if (paragraph.startsWith('# ')) {
                  return <h1 key={idx} className="text-3xl font-bold mt-8 mb-4">{paragraph.slice(2)}</h1>;
                }
                if (paragraph.startsWith('## ')) {
                  return <h2 key={idx} className="text-2xl font-bold mt-8 mb-4">{paragraph.slice(3)}</h2>;
                }
                if (paragraph.startsWith('### ')) {
                  return <h3 key={idx} className="text-xl font-bold mt-6 mb-3">{paragraph.slice(4)}</h3>;
                }
                if (paragraph.startsWith('```')) {
                  const lines = paragraph.split('\n');
                  const code = lines.slice(1, -1).join('\n');
                  return (
                    <pre key={idx} className="overflow-x-auto">
                      <code>{code}</code>
                    </pre>
                  );
                }
                if (paragraph.startsWith('- ')) {
                  const items = paragraph.split('\n');
                  return (
                    <ul key={idx} className="list-disc list-inside space-y-2">
                      {items.map((item, i) => (
                        <li key={i} className="text-gray-700">{item.slice(2)}</li>
                      ))}
                    </ul>
                  );
                }
                if (paragraph.match(/^\d+\./)) {
                  const items = paragraph.split('\n');
                  return (
                    <ol key={idx} className="list-decimal list-inside space-y-2">
                      {items.map((item, i) => {
                        const match = item.match(/^\d+\.\s*(.*)/);
                        return match ? <li key={i} className="text-gray-700">{match[1]}</li> : null;
                      })}
                    </ol>
                  );
                }
                return <p key={idx} className="text-gray-700 leading-relaxed">{paragraph}</p>;
              })}
            </div>
          </div>

          {/* Author Bio */}
          <div className="mt-16 pt-8 border-t border-light">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-primary rounded-full flex-shrink-0"></div>
              <div>
                <h3 className="font-bold text-lg">{article.author}</h3>
                <p className="text-gray-600">AI-Augmented Software Architect. Building intelligent systems that automate, scale & drive business impact.</p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-20 bg-light">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map((related) => (
                <Link key={related.id} href={`/blog/${related.slug}`}>
                  <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer h-full flex flex-col">
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-lg font-bold mb-2 text-primary hover:text-accent transition">{related.title}</h3>
                      <p className="text-sm text-gray-600 mb-4 flex-grow">{related.excerpt}</p>
                      <div className="text-xs text-gray-500">
                        {new Date(related.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • {related.readTime}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Have thoughts on this topic?</h2>
          <p className="text-lg mb-8 text-gray-100">
            Let's discuss this further. I'm always interested in technical conversations.
          </p>
          <Link href="/contact" className="inline-block bg-accent text-dark font-semibold px-8 py-3 rounded-lg hover:bg-opacity-90 transition">
            Get in Touch
          </Link>
        </div>
      </section>
    </Layout>
  );
}
