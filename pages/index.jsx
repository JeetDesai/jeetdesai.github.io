import Layout from '../components/Layout';
import Link from 'next/link';
import { projects } from '../data/projects';
import { testimonials } from '../data/testimonials';

const trustedBrands = [
  { name: 'Docyt', logo: '/logos/docyt.png' },
  { name: 'Plumslice Labs / Digital Wave', logo: '/logos/PlumSlice.png' },
  { name: 'Atharva System', logo: '/logos/atharva_system.png' },
  { name: 'Priya Softweb Solutions', logo: '/logos/softweb_solutions_pvt_ltd.png' },
  { name: 'Rainstream Web Pvt Ltd', logo: '/logos/rainstreamweb.png' },
];

export default function Home() {
  const featuredProjects = projects.slice(0, 3);

  return (
    <Layout 
      title="Home"
      description="AI-Augmented Software Architect building intelligent systems that automate, scale & drive business impact"
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#fcf6f0] py-24 lg:py-32">
        <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-white to-transparent" />
        <div className="absolute right-0 top-24 hidden xl:block h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute left-0 top-40 hidden xl:block h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-primary shadow-sm shadow-slate-900/5">
                AI-Augmented Engineering Leader
              </span>
              <h1 className="mt-8 text-4xl md:text-6xl font-extrabold tracking-[-0.04em] leading-tight text-slate-950">
                Building Intelligent Systems
                <br />
                <span className="text-accent">That Automate, Scale &</span>
                <br />
                Drive Business Impact.
              </h1>
              <p className="mt-8 text-lg md:text-xl text-slate-700 max-w-xl leading-relaxed">
                I help businesses eliminate manual work, accelerate engineering delivery, and build scalable software systems using AI-driven automation, clean architecture, and modern DevOps practices.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link href="/projects" className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition">
                  View Case Studies
                </Link>
                <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-4 text-base font-semibold text-slate-950 shadow-sm hover:shadow-md transition">
                  Let's Connect
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[40px] border border-slate-200 bg-white p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Automate. Scale. Optimize.</p>
                    <p className="mt-3 text-xl font-semibold text-slate-950">Intelligent workflow engine</p>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    Live Preview
                  </div>
                </div>
                <div className="rounded-[32px] bg-slate-950 text-white p-6 mb-6 shadow-lg shadow-slate-950/10">
                  <pre className="text-sm leading-6 overflow-x-auto font-mono text-slate-100">
{`def intelligent_system(workflow):
  ai_agent = Agent(workflow)
  result = ai_agent.execute()
  return result`}
                  </pre>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-primary">AI Agent</p>
                    <p className="mt-2 text-sm text-slate-500">Autonomous execution</p>
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-primary">Workflow</p>
                    <p className="mt-2 text-sm text-slate-500">Automated orchestration</p>
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-primary">Notify</p>
                    <p className="mt-2 text-sm text-slate-500">Real-time feedback</p>
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-primary">Store</p>
                    <p className="mt-2 text-sm text-slate-500">Persistent insights</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14">
            <p className="text-center text-xs uppercase tracking-[0.3em] text-slate-500">
              Trusted by organizations across engineering, product, and digital transformation.
            </p>
            <div className="mt-6 overflow-hidden">
              <div className="flex min-w-max items-center gap-10 animate-marquee">
                {trustedBrands.concat(trustedBrands).map((brand, index) => (
                  <div key={`${brand.name}-${index}`} className="flex h-20 w-44 items-center justify-center">
                    <img src={brand.logo} alt={brand.name} className="max-h-14 object-contain" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problems Solved */}
      <section className="py-20 bg-[#f8f4ef]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-primary font-semibold">Problems I Solve</p>
            <h2 className="text-3xl md:text-4xl font-bold mt-4">Engineering outcomes that matter</h2>
            <p className="max-w-3xl mx-auto text-gray-600 mt-4">
              I focus on solving the most critical product and platform challenges that slow engineering velocity, reduce reliability, and block growth.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
            {[
              {
                icon: '⚡',
                title: 'Engineering Velocity',
                desc: 'Accelerate development with AI-assisted workflows, automation and reusable architectures.'
              },
              {
                icon: '🔒',
                title: 'Security & Compliance',
                desc: 'Enforce secure coding standards, OWASP practices and operational controls.'
              },
              {
                icon: '☁️',
                title: 'System Scalability',
                desc: 'Design systems that handle high throughput, concurrency, and large data volumes.'
              },
              {
                icon: '🤖',
                title: 'AI Integration',
                desc: 'Leverage GPT, Claude, and Gemini for intelligent automation and decision workflows.'
              },
              {
                icon: '🚀',
                title: 'DevOps & CI/CD',
                desc: 'Streamline releases with Docker, GitHub Actions, and infrastructure-as-code.'
              },
            ].map((problem, idx) => (
              <div key={idx} className="bg-white rounded-[32px] border border-gray-200 p-8 shadow-sm hover:shadow-lg transition">
                <div className="text-4xl mb-4">{problem.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-primary">{problem.title}</h3>
                <p className="text-gray-600 leading-relaxed">{problem.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-primary font-semibold">Featured Case Studies</p>
            <h2 className="text-3xl md:text-4xl font-bold mt-4">Featured Projects</h2>
            <p className="max-w-3xl mx-auto text-gray-600 mt-4">
              Real systems built for performance, automation, and scale.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {featuredProjects.map((project, idx) => (
              <Link key={project.id} href={`/projects/${project.slug}`}>
                <div className="group rounded-[32px] overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-xl transition h-full">
                  <div className="p-8 h-full flex flex-col">
                    <div className="inline-flex items-center justify-center rounded-full bg-primary/10 text-primary w-12 h-12 mb-5 text-xl font-semibold">
                      {idx + 1}
                    </div>
                    <p className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-3">{project.tagline}</p>
                    <h3 className="text-2xl font-semibold mb-4 text-primary">{project.title}</h3>
                    <p className="text-gray-600 mb-6 flex-grow leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech, techIdx) => (
                        <span key={techIdx} className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/projects" className="inline-flex items-center justify-center rounded-full border border-primary bg-primary text-white font-semibold px-8 py-4 hover:bg-primary/90 transition">
              View All Case Studies
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Delivered */}
      <section className="py-20 bg-[#f8f4ef]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[32px] bg-white border border-gray-200 p-8 shadow-sm">
            <div className="text-center mb-10">
              <p className="text-sm uppercase tracking-[0.3em] text-primary font-semibold">Impact Delivered</p>
              <h2 className="text-3xl md:text-4xl font-bold mt-4">Business outcomes you can measure</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
              {[
                { num: '13+', label: 'Years Experience' },
                { num: '25+', label: 'Microservices Deployed' },
                { num: '10M+', label: 'Records at Scale' },
                { num: '5K+', label: 'Daily Active Users' },
                { num: '99%', label: 'System Reliability' },
              ].map((stat, idx) => (
                <div key={idx} className="rounded-3xl border border-gray-100 bg-white p-6">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.num}</div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-primary font-semibold">LinkedIn Recommendations</p>
            <h2 className="text-3xl md:text-4xl font-bold mt-4">What my clients say</h2>
            <p className="max-w-3xl mx-auto text-gray-600 mt-4">
              Verified recommendations from LinkedIn, shared by people I have worked closely with across engineering and product teams.
            </p>
            <div className="mt-6">
              <a href="https://www.linkedin.com/in/jeethdesai/details/recommendations/?detailScreenTabIndex=0" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border border-primary bg-white px-6 py-3 text-sm font-semibold text-primary shadow-sm transition hover:bg-primary hover:text-white">
                View more recommendations on LinkedIn
              </a>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="rounded-[32px] border border-gray-200 bg-white p-8 shadow-sm transition hover:shadow-xl">
                <div className="flex items-center mb-5">
                  {testimonial.image && (
                    <img src={testimonial.image} alt={testimonial.author} className="w-14 h-14 rounded-full mr-4 object-cover" />
                  )}
                  <div>
                    <p className="font-semibold text-lg text-primary">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                    <p className="text-xs text-gray-400 mt-1 uppercase tracking-[0.2em]">{testimonial.company}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic leading-relaxed">“{testimonial.content}”</p>
                <div className="mt-6 text-sm text-gray-400 uppercase tracking-[0.18em]">Source: LinkedIn</div>
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
          <p className="text-lg mb-8 text-white/85">
            Available for consulting, architecture reviews and full-time opportunities.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center justify-center bg-accent text-dark font-semibold px-8 py-4 rounded-full hover:bg-orange-500 transition">
              Schedule a Call
            </Link>
            <Link href="mailto:jeetdesai32800@gmail.com" className="inline-flex items-center justify-center border border-white/30 bg-white/10 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/20 transition">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
