import Layout from '../../components/Layout';
import { projects } from '../../data/projects';

export default function ProjectsPage() {
  return (
    <Layout 
      title="Projects"
      description="Portfolio of AI-augmented systems, scalable architectures, and high-impact projects"
    >
      {/* Header */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h1>
          <p className="text-lg text-gray-100">
            A showcase of AI-augmented systems, scalable architectures, and high-impact projects across FinTech, Healthcare, E-commerce, and SaaS.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <a
                key={project.id}
                href={project.externalUrl || `/projects/${project.slug}`}
                target={project.externalUrl ? '_blank' : undefined}
                rel={project.externalUrl ? 'noreferrer noopener' : undefined}
                className="group block cursor-pointer"
              >
                <div>
                  <div className="bg-light rounded-lg overflow-hidden mb-4 h-64 relative">
                    {project.image ? (
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary to-secondary" />
                    )}
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-primary bg-light px-3 py-1 rounded">
                      {project.year}
                    </span>
                    <span className="text-xs font-semibold text-accent">
                      {project.status}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{project.tagline}</p>
                  <p className="text-gray-700 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech, idx) => (
                      <span key={idx} className="text-xs bg-primary text-white px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="text-xs text-gray-600">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="bg-light py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Tech Stack & Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 text-center">
            {[
              { name: 'Ruby on Rails', icon: '🚂' },
              { name: 'React', icon: '⚛️' },
              { name: 'PostgreSQL', icon: '🐘' },
              { name: 'Microservices', icon: '🔗' },
              { name: 'AWS Lambda', icon: '⚡' },
              { name: 'Docker', icon: '🐳' },
              { name: 'Kafka', icon: '📨' },
              { name: 'Redis', icon: '🔴' },
              { name: 'ElasticSearch', icon: '🔍' },
              { name: 'GitHub Actions', icon: '🔄' },
              { name: 'AI/ML', icon: '🤖' },
              { name: 'Kubernetes', icon: '☸️' },
            ].map((tech, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg hover:shadow-lg transition">
                <div className="text-4xl mb-3">{tech.icon}</div>
                <p className="font-semibold text-sm">{tech.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
