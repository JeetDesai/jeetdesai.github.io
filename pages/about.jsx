import Layout from '../components/Layout';
import Link from 'next/link';

export default function AboutPage() {
  const experiences = [
    {
      company: 'Docyt India Pvt. Ltd.',
      role: 'Senior Member of Technical Staff - FullStack',
      period: 'July 2024 – Present',
      highlights: [
        'AI-powered accounting automation platform with 25+ microservices',
        'Secured FinTech product with cybersecurity best practices',
        'Enhanced service architecture and database performance',
      ],
    },
    {
      company: 'Codecimal Software Developers Pvt. Ltd.',
      role: 'Team Lead (Balance It) / Principal Engineer (Vet Assistant AI)',
      period: 'Dec 2022 – June 2024',
      highlights: [
        'Pet nutrition platform with AI-driven recipe generation',
        'Veterinary platform with 5K daily active users',
        'Integrated GPT-4, Claude 3, Google Gemini',
        'Achieved 99% uptime and 20% faster integration',
      ],
    },
    {
      company: 'PlumSlice Labs Pvt. Ltd.',
      role: 'Senior Ruby on Rails Engineer',
      period: 'May 2017 – April 2021',
      highlights: [
        'E-commerce PIM/PMDM/DAM suite for retailers and brands',
        'Improved database performance by 20%+',
        'OWASP security compliance implementation',
      ],
    },
  ];

  const skills = [
    {
      category: 'Programming & Frameworks',
      items: ['Ruby on Rails', 'Ruby', 'React', 'JavaScript', 'TypeScript', 'APIs'],
    },
    {
      category: 'Databases & Caching',
      items: ['PostgreSQL', 'MySQL', 'Redis', 'MongoDB', 'Query Optimization', 'Database Design'],
    },
    {
      category: 'Architecture & Scaling',
      items: ['Microservices', 'System Design', 'Database Optimization', 'Caching Strategies', 'High Availability'],
    },
    {
      category: 'Security & DevOps',
      items: ['OWASP', 'Docker', 'Kubernetes', 'GitHub Actions', 'CI/CD', 'AWS Lambda'],
    },
    {
      category: 'AI & Automation',
      items: ['GPT-4', 'Claude 3', 'Google Gemini', 'MCP', 'Prompt Engineering', 'Automation Workflows'],
    },
    {
      category: 'Testing & Quality',
      items: ['RSpec', 'Minitest', 'Clean Code', 'Code Review', 'Performance Testing'],
    },
  ];

  return (
    <Layout 
      title="About"
      description="Jeet Desai - 12+ years building scalable systems with AI-augmented engineering and security-first practices"
    >
      {/* Hero */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Me</h1>
          <p className="text-xl text-gray-100">
            Seasoned Full Stack Engineer with 12+ years building secure, scalable systems across FinTech, Healthcare, E-commerce, and SaaS. Specializing in AI-augmented engineering, system optimization, and security-first development.
          </p>
        </div>
      </section>

      {/* Bio */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              I'm an AI-Augmented Software Architect specializing in building intelligent systems that automate manual work, accelerate engineering delivery, and drive business impact.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              With 12+ years of hands-on experience across FinTech, Healthcare, E-commerce, and Telecom, I've architected and scaled microservices platforms, optimized databases to handle 10M+ records, implemented OWASP security standards, and leveraged AI (GPT-4, Claude 3, Google Gemini) to automate complex engineering tasks.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              I combine deep technical expertise with a business-first mindset—always focusing on measurable impact: faster deployments, improved system reliability, reduced infrastructure costs, and enhanced security.
            </p>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-16 bg-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12">Experience</h2>
          <div className="space-y-8">
            {experiences.map((exp, idx) => (
              <div key={idx} className="bg-white p-8 rounded-lg border-l-4 border-primary">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-primary">{exp.role}</h3>
                  <p className="text-lg text-gray-600">{exp.company}</p>
                  <p className="text-sm text-gray-500">{exp.period}</p>
                </div>
                <ul className="space-y-2">
                  {exp.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start text-gray-700">
                      <span className="text-accent mr-3">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12">Skills & Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skillGroup, idx) => (
              <div key={idx} className="bg-light p-6 rounded-lg">
                <h3 className="text-lg font-bold text-primary mb-4">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, i) => (
                    <span key={i} className="bg-primary text-white px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-gradient-to-br from-primary to-secondary text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Impact by the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8 text-center">
            {[
              { num: '13+', label: 'Years Experience' },
              { num: '25+', label: 'Microservices' },
              { num: '10M+', label: 'Records at Scale' },
              { num: '99%', label: 'System Reliability' },
              { num: '20%', label: 'Avg Performance Gain' },
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.num}</div>
                <p className="text-sm md:text-base text-gray-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Certs */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Education</h2>
          <div className="space-y-6">
            <div className="bg-light p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Master of Technology in Web Technologies</h3>
              <p className="text-gray-600">Gujarat University, Ahmedabad • Completed 2012</p>
            </div>
            <div className="bg-light p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Bachelor of Engineering in Information Technology</h3>
              <p className="text-gray-600">Sankalchand Patel College Of Engg, Visnagar • Completed 2010</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-8">Certifications</h2>
          <div className="space-y-3">
            <p className="text-gray-700">✓ VSkill Software Security Certified</p>
            <p className="text-gray-700">✓ US Business Visa (B1) Holder</p>
            <p className="text-gray-700">✓ Available for short-term onsite travel</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Let's work together</h2>
          <p className="text-lg mb-8 text-gray-100">
            Available for consulting, architecture reviews, and full-time opportunities.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact" className="inline-block bg-accent text-dark font-semibold px-8 py-3 rounded-lg hover:bg-opacity-90 transition">
              Schedule a Call
            </Link>
            <a href="https://linkedin.com/in/jeethdesai" className="inline-block bg-white text-primary font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition">
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
