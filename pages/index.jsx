import Layout from '@/components/Layout';
import Link from 'next/link';
import { projects } from '@/data/projects';
import { testimonials } from '@/data/testimonials';

export default function Home() {
  const featuredProjects = projects.slice(0, 3);

  return (
    <Layout 
      title="Home"
      description="AI-Augmented Software Architect building intelligent systems that automate, scale & drive business impact"
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary text-white py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block bg-white bg-opacity-20 text-sm font-semibold px-4 py-2 rounded-full mb-4">
              AI-AUGMENTED ENGINEERING LEADER
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Building Intelligent Systems
              <br />
              <span className="text-accent">That Automate, Scale &</span>
              <br />
              Drive Business Impact.
            </h1>
            <p className="text-xl text-gray-100 mb-8 max-w-2xl leading-relaxed">
              I help businesses eliminate manual work, accelerate engineering delivery and build scalable software systems using AI-driven automation, clean architecture and modern DevOps practices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/projects" className="inline-block bg-accent text-dark font-semibold px-8 py-3 rounded-lg hover:bg-opacity-90 transition text-center">
                View Case Studies
              </Link>
              <Link href="/contact" className="inline-block bg-white text-primary font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition text-center">
                Let's Connect
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problems Solved */}
      <section className="py-20 bg-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Problems I Solve</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '⚡',
                title: 'Engineering Velocity',
                desc: 'Accelerate development with AI-powered workflows, automation and intelligent scaffolding.'
              },
              {
                icon: '📊',
                title: 'System Scalability',
                desc: 'Design and optimize systems to handle growth through smart architectures and database optimization.'
              },
              {
                icon: '🛡️',
                title: 'Security & Compliance',
                desc: 'Enforce OWASP best practices, secure coding patterns and industry compliance standards.'
              },
              {
                icon: '🤖',
                title: 'AI Integration',
                desc: 'Leverage GPT-4, Claude & Gemini to build intelligent automation and MCP workflows.'
              },
              {
                icon: '🔍',
                title: 'Performance Optimization',
                desc: 'Eliminate N+1 queries, optimize databases and reduce latency through strategic caching.'
              },
              {
                icon: '🚀',
                title: 'DevOps & CI/CD',
                desc: 'Streamline deployments with Docker, GitHub Actions and infrastructure-as-code practices.'
              },
            ].map((problem, idx) => (
              <div key={idx} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-lg transition">
                <div className="text-4xl mb-4">{problem.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-primary">{problem.title}</h3>
                <p className="text-gray-600">{problem.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {featuredProjects.map((project) => (
              <Link key={project.id} href={`/projects/${project.slug}`}>
                <div className="bg-light rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer h-full flex flex-col">
                  {project.image && (
                    <div className="w-full h-48 bg-gray-300 overflow-hidden">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold mb-2 text-primary">{project.title}</h3>
                    <p className="text-gray-600 mb-4 flex-grow">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech, idx) => (
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
          <div className="text-center">
            <Link href="/projects" className="inline-block bg-primary text-white font-semibold px-8 py-3 rounded-lg hover:bg-opacity-90 transition">
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Delivered */}
      <section className="py-20 bg-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Impact Delivered</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8 text-center">
            {[
              { num: '13+', label: 'Years Experience' },
              { num: '25+', label: 'Microservices Deployed' },
              { num: '10M+', label: 'Records at Scale' },
              { num: '5K+', label: 'Daily Active Users' },
              { num: '99%', label: 'System Reliability' },
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.num}</div>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">What Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.slice(0, 2).map((testimonial) => (
              <div key={testimonial.id} className="bg-light p-8 rounded-lg">
                <div className="flex items-center mb-4">
                  {testimonial.image && (
                    <img src={testimonial.image} alt={testimonial.author} className="w-12 h-12 rounded-full mr-4" />
                  )}
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Let's build intelligent systems that automate and scale your business.
          </h2>
          <p className="text-lg mb-8 text-gray-100">
            Available for consulting, architecture reviews and full-time opportunities.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact" className="inline-block bg-accent text-dark font-semibold px-8 py-3 rounded-lg hover:bg-opacity-90 transition">
              Schedule a Call
            </Link>
            <Link href="mailto:jeetdesai32800@gmail.com" className="inline-block bg-white text-primary font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
