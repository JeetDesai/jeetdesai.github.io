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
      <section className="relative overflow-hidden bg-white pt-14 pb-24 lg:pt-16 lg:pb-28">
        <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-white to-transparent" />
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="relative isolate overflow-hidden rounded-[40px] bg-[#fffaf4] shadow-[0_30px_70px_rgba(232,179,125,0.16)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,210,160,0.18),transparent_18%),radial-gradient(circle_at_78%_50%,rgba(255,196,122,0.2),transparent_18%)]" />
            <img
              src="/hero-banner.png"
              alt="AI workflow banner showing inputs, AI logic, automation, and results"
              className="block min-h-[720px] w-full object-cover object-center lg:min-h-[760px]"
            />

            <div className="absolute inset-0 z-10 px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
              <div className="flex h-full max-w-full flex-col justify-start lg:max-w-[56%]">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-orange-300 bg-white/86 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#8c633d] shadow-[0_12px_30px_rgba(255,255,255,0.45)] backdrop-blur-[4px]">
                  <span className="text-orange-500">✦</span>
                  AI + Automation + Backend Systems
                </div>
                <h1 className="mt-8 max-w-[14ch] text-[3rem] font-extrabold leading-[0.96] tracking-[-0.05em] text-slate-900 sm:text-[4.25rem] lg:text-[4.9rem]">
                  I build AI powered
                  <br />
                  <span className="text-orange-500">automation systems</span>
                  <br />
                  that run your business
                  <br />
                  smarter
                </h1>
                <p className="mt-7 max-w-[31rem] text-lg leading-8 text-slate-600">
                  I help businesses transform manual operations into intelligent, scalable systems by combining AI, automation, and robust software engineering. From document processing and workflow automation to backend platforms and AI-powered applications, I build solutions that reduce operational overhead, improve efficiency, and deliver measurable business outcomes.
                </p>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Link href="/contact" className="inline-flex min-w-[176px] items-center justify-center gap-3 rounded-2xl bg-orange-500 px-8 py-4 text-base font-semibold text-white shadow-[0_20px_40px_rgba(249,115,22,0.26)] transition hover:bg-orange-600">
                    Work With Me
                    <span aria-hidden="true">→</span>
                  </Link>
                  <Link href="/projects" className="inline-flex min-w-[176px] items-center justify-center gap-3 rounded-2xl border border-[#e9d4bf] bg-white/88 px-8 py-4 text-base font-semibold text-slate-700 transition hover:bg-white">
                    View My Work
                    <span aria-hidden="true" className="text-orange-500">&lt;/&gt;</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-8 z-10 px-4 sm:px-6 lg:bottom-6 lg:px-8">
              <div className="ml-auto w-full max-w-[28rem] text-center lg:mr-8">
                <p className="text-sm font-medium uppercase tracking-[0.45em] text-slate-700">
                  Automate <span className="mx-3 text-orange-400">•</span> Optimize <span className="mx-3 text-orange-400">•</span> Scale
                </p>
                <p className="mt-2 text-sm font-medium uppercase tracking-[0.38em] text-orange-500">
                  Build Smarter. Grow Faster.
                </p>
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
      <section className="py-20 bg-[#fcf7f2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-primary font-semibold">Problems I Solve</p>
            <h2 className="text-3xl md:text-4xl font-bold mt-4">Engineering outcomes that matter</h2>
            <p className="max-w-3xl mx-auto text-slate-600 mt-4">
              I design solutions that create measurable impact across engineering and business.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5">
            {[
              {
                icon: '⚡',
                title: 'Engineering Velocity',
                desc: 'Accelerate development with AI-assisted workflows, automation and reusable architectures.'
              },
              {
                icon: '🧩',
                title: 'Business Automation',
                desc: 'Automate repetitive workflows, approvals, data processing and operational tasks.'
              },
              {
                icon: '☁️',
                title: 'System Scalability',
                desc: 'Design systems that handle millions of records and concurrent users with confidence.'
              },
              {
                icon: '🛡️',
                title: 'Reliability & Observability',
                desc: 'Improve system reliability with proactive monitoring, logging, and fast incident response.'
              },
              {
                icon: '☁️',
                title: 'Cost Optimization',
                desc: 'Reduce infrastructure and operational costs through better architecture and automation.'
              },
            ].map((problem, idx) => (
              <div key={idx} className="rounded-[10px] border border-slate-200 bg-white p-6 text-center shadow-sm shadow-slate-100">
                <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-2xl text-orange-600">{problem.icon}</div>
                <h3 className="text-base md:text-lg font-semibold mb-3 text-slate-950">{problem.title}</h3>
                <p className="text-sm leading-6 text-slate-600">{problem.desc}</p>
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
              <a
                key={project.id}
                href={project.externalUrl || `/projects/${project.slug}`}
                target={project.externalUrl ? '_blank' : undefined}
                rel={project.externalUrl ? 'noreferrer noopener' : undefined}
                className="block"
              >
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
              </a>
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
