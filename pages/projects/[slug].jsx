import Layout from '../../components/Layout';
import Link from 'next/link';
import { projects, getProjectBySlug } from '../../data/projects';

export async function getStaticProps({ params }) {
  const project = getProjectBySlug(params.slug);
  
  if (!project) {
    return {
      notFound: true,
    };
  }

  return {
    props: { project },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  return {
    paths: projects.map(p => ({
      params: { slug: p.slug },
    })),
    fallback: false,
  };
}

export default function ProjectDetail({ project }) {
  const relatedProjects = projects.filter(p => p.id !== project.id).slice(0, 3);

  return (
    <Layout 
      title={project.title}
      description={project.description}
    >
      {/* Header */}
      <section className="bg-gradient-to-br from-primary to-secondary text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/projects" className="inline-flex items-center text-gray-100 hover:text-accent mb-4">
            <span className="mr-2">←</span> Back to Projects
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
          <p className="text-xl text-gray-100 mb-6">{project.tagline}</p>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech, idx) => (
              <span key={idx} className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Project Image */}
      {project.image && (
        <section className="py-12 bg-light">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </section>
      )}

      {/* Overview */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-light p-6 rounded-lg">
              <h3 className="text-sm font-semibold text-primary mb-2 uppercase">Year</h3>
              <p className="text-2xl font-bold">{project.year}</p>
            </div>
            <div className="bg-light p-6 rounded-lg">
              <h3 className="text-sm font-semibold text-primary mb-2 uppercase">Status</h3>
              <p className="text-2xl font-bold text-accent">{project.status}</p>
            </div>
            <div className="bg-light p-6 rounded-lg">
              <h3 className="text-sm font-semibold text-primary mb-2 uppercase">Tech Stack</h3>
              <p className="text-lg font-semibold">{project.technologies.length} Technologies</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Column */}
            <div>
              <h2 className="text-3xl font-bold mb-4">The Challenge</h2>
              <p className="text-gray-700 mb-8 leading-relaxed">{project.challenge}</p>

              <h2 className="text-3xl font-bold mb-4">Our Approach</h2>
              <p className="text-gray-700 mb-8 leading-relaxed">{project.solution}</p>
            </div>

            {/* Right Column */}
            <div>
              <h2 className="text-3xl font-bold mb-4">Key Highlights</h2>
              <ul className="space-y-3 mb-8">
                {project.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-accent mr-3 mt-1">✓</span>
                    <span className="text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>

              <h2 className="text-3xl font-bold mb-4">Key Metrics</h2>
              <div className="space-y-2">
                {Object.entries(project.metrics).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-light">
                    <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="font-semibold text-primary">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold my-8">Results & Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.results.map((result, idx) => (
              <div key={idx} className="bg-light p-6 rounded-lg border-l-4 border-accent">
                <p className="text-gray-700">{result}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-20 bg-light">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12">Related Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProjects.map((p) => (
                <Link key={p.id} href={`/projects/${p.slug}`}>
                  <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer h-full flex flex-col">
                    {p.image && (
                      <div className="w-full h-48 bg-gray-300 overflow-hidden">
                        <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-lg font-semibold mb-2 text-primary">{p.title}</h3>
                      <p className="text-sm text-gray-600 mb-4 flex-grow">{p.tagline}</p>
                      <div className="flex flex-wrap gap-2">
                        {p.technologies.slice(0, 3).map((tech, idx) => (
                          <span key={idx} className="text-xs bg-primary text-white px-2 py-1 rounded">
                            {tech}
                          </span>
                        ))}
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
          <h2 className="text-3xl font-bold mb-6">Interested in building something similar?</h2>
          <Link href="/contact" className="inline-block bg-accent text-dark font-semibold px-8 py-3 rounded-lg hover:bg-opacity-90 transition">
            Let's Talk
          </Link>
        </div>
      </section>
    </Layout>
  );
}
