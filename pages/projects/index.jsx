import Link from 'next/link';
import {
  BiLogoPostgresql,
  BiLogoReact,
  BiLogoJavascript,
  BiLogoDocker,
  BiLogoKubernetes,
  BiLogoAws,
  BiLogoGit,
} from 'react-icons/bi';
import {
  SiRubyonrails,
  SiSidekiq,
  SiRedis,
  SiNextdotjs,
  SiTailwindcss,
  SiOpenai,
  SiClaude,
  SiApachekafka,
  SiElasticsearch,
  SiGithubactions,
  SiJenkins,
  SiGrafana,
  SiHeroku,
  SiGoogle,
} from 'react-icons/si';
import { TbTopologyStar3, TbBrandDatabricks, TbRouteAltLeft } from 'react-icons/tb';
import { FaJava, FaNodeJs, FaHtml5 } from 'react-icons/fa';
import { RiRobot2Line, RiSearchEyeLine, RiPlugLine, RiLineChartLine } from 'react-icons/ri';
import { MdOutlineScience, MdOutlineSpeed } from 'react-icons/md';
import Layout from '../../components/Layout';
import { projects } from '../../data/projects';

const heroMetrics = [
  { value: '13+', label: 'Years building production-grade software systems' },
  { value: '25+', label: 'Microservices shaped across AI and FinTech stacks' },
  { value: '5+', label: 'Industries spanning FinTech, Publishing, Pet Tech, Retail, and Support' },
  { value: '99%', label: 'Reliability target across automation-heavy platforms' },
  { value: 'Millions+', label: 'Records, events, and requests handled at scale' },
];

const capabilityPills = [
  'Document Processing',
  'Workflow Automation',
  'AI Agents',
  'RAG Systems',
  'Backend APIs',
  'Microservices',
  'Data Pipelines',
];

const metricIcons = [
  'M12 6v12m-6-6h12',
  'M4 7h16M7 4v16M17 4v16',
  'M12 4 4 8v4c0 4 4 8 8 8s8-4 8-8V8l-8-4Z',
  'M5 13l4 4L19 7',
  'M6 18V9m6 9V6m6 12v-7',
];

const capabilityIcons = [
  'M7 12h10M12 7v10',
  'M5 12h14M12 5l7 7-7 7',
  'M12 3v4m0 10v4M3 12h4m10 0h4',
  'M4 6h16M4 12h10M4 18h7',
  'M5 7h14v10H5z',
  'M8 8h8v8H8z',
  'M6 17 12 7l6 10',
];

const techItemIcons = {
  'Ruby on Rails': { icon: SiRubyonrails, color: 'text-[#d34b35]', bg: 'bg-[#fff1ed]' },
  Java: { icon: FaJava, color: 'text-[#d97706]', bg: 'bg-[#fff6e8]' },
  'Node.js': { icon: FaNodeJs, color: 'text-[#4b8f4f]', bg: 'bg-[#eef9ee]' },
  PostgreSQL: { icon: BiLogoPostgresql, color: 'text-[#4f8dd8]', bg: 'bg-[#eef5ff]' },
  Sidekiq: { icon: SiSidekiq, color: 'text-[#e95454]', bg: 'bg-[#fff0f0]' },
  Redis: { icon: SiRedis, color: 'text-[#dc4c43]', bg: 'bg-[#fff1f0]' },
  React: { icon: BiLogoReact, color: 'text-[#6c63ff]', bg: 'bg-[#f2f0ff]' },
  'Next.js': { icon: SiNextdotjs, color: 'text-[#6a63ff]', bg: 'bg-[#f4f2ff]' },
  'Tailwind CSS': { icon: SiTailwindcss, color: 'text-[#2aa7df]', bg: 'bg-[#eefaff]' },
  'HTML/CSS': { icon: FaHtml5, color: 'text-[#ef6b3b]', bg: 'bg-[#fff3ed]' },
  JavaScript: { icon: BiLogoJavascript, color: 'text-[#f59e0b]', bg: 'bg-[#fff8e8]' },
  'OpenAI / GPT-4': { icon: SiOpenai, color: 'text-[#3f7a57]', bg: 'bg-[#edf8f1]' },
  Claude: { icon: SiClaude, color: 'text-[#b9723c]', bg: 'bg-[#fff4eb]' },
  'Google Gemini': { icon: SiGoogle, color: 'text-[#4285f4]', bg: 'bg-[#eef5ff]' },
  RAG: { icon: TbTopologyStar3, color: 'text-[#9c5b2d]', bg: 'bg-[#fff4ea]' },
  Agents: { icon: RiRobot2Line, color: 'text-[#8f5b4d]', bg: 'bg-[#faf1ee]' },
  'AI Agents': { icon: TbBrandDatabricks, color: 'text-[#8f5b4d]', bg: 'bg-[#faf1ee]' },
  AWS: { icon: BiLogoAws, color: 'text-[#f59e0b]', bg: 'bg-[#fff8e8]' },
  'AWS (EC2, RDS, S3)': { icon: BiLogoAws, color: 'text-[#f59e0b]', bg: 'bg-[#fff8e8]' },
  Docker: { icon: BiLogoDocker, color: 'text-[#4a90e2]', bg: 'bg-[#eef5ff]' },
  Kubernetes: { icon: BiLogoKubernetes, color: 'text-[#4f7de8]', bg: 'bg-[#eef2ff]' },
  'AWS Lambda': { icon: BiLogoAws, color: 'text-[#ff9b21]', bg: 'bg-[#fff6e9]' },
  Kafka: { icon: SiApachekafka, color: 'text-[#f59e0b]', bg: 'bg-[#fff8e8]' },
  'Redis Streams': { icon: SiRedis, color: 'text-[#e04f44]', bg: 'bg-[#fff1f0]' },
  ElasticSearch: { icon: SiElasticsearch, color: 'text-[#46a6d9]', bg: 'bg-[#edf9ff]' },
  Elasticsearch: { icon: SiElasticsearch, color: 'text-[#46a6d9]', bg: 'bg-[#edf9ff]' },
  Heroku: { icon: SiHeroku, color: 'text-[#7c5cff]', bg: 'bg-[#f3efff]' },
  'Event Streams': { icon: SiApachekafka, color: 'text-[#f59e0b]', bg: 'bg-[#fff8e8]' },
  'Search Indexing': { icon: RiSearchEyeLine, color: 'text-[#46a6d9]', bg: 'bg-[#edf9ff]' },
  'Data Pipelines': { icon: TbRouteAltLeft, color: 'text-[#8f5b4d]', bg: 'bg-[#faf1ee]' },
  'API Integrations': { icon: RiPlugLine, color: 'text-[#b9723c]', bg: 'bg-[#fff4eb]' },
  'GitHub Actions': { icon: SiGithubactions, color: 'text-[#3b82f6]', bg: 'bg-[#eef5ff]' },
  Git: { icon: BiLogoGit, color: 'text-[#ef4444]', bg: 'bg-[#fff1f0]' },
  Jenkins: { icon: SiJenkins, color: 'text-[#8f5b4d]', bg: 'bg-[#faf1ee]' },
  Testing: { icon: MdOutlineScience, color: 'text-[#3b82f6]', bg: 'bg-[#eef5ff]' },
  Observability: { icon: RiLineChartLine, color: 'text-[#f97316]', bg: 'bg-[#fff3eb]' },
  'Performance Tuning': { icon: MdOutlineSpeed, color: 'text-[#d97706]', bg: 'bg-[#fff6e8]' },
  'Monitoring (Grafana)': { icon: SiGrafana, color: 'text-[#f97316]', bg: 'bg-[#fff3eb]' },
};

const techGroups = [
  { name: 'Backend', items: ['Ruby on Rails', 'Java', 'Node.js', 'PostgreSQL', 'Redis'] },
  { name: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS', 'HTML/CSS'] },
  { name: 'AI Automation', items: ['OpenAI / GPT-4', 'Claude', 'Google Gemini', 'RAG', 'Agents'] },
  { name: 'Infrastructure', items: ['AWS', 'Docker', 'Kafka', 'ElasticSearch', 'Heroku'] },
  { name: 'Messaging Data', items: ['Event Streams', 'Search Indexing', 'Data Pipelines', 'API Integrations'] },
  { name: 'Delivery', items: ['GitHub Actions', 'Testing', 'Observability', 'Performance Tuning'] },
];

const projectDisplay = {
  'accounting-automation-platform': {
    number: '01',
    impact: ['99% accuracy', '500K+ transactions', 'Near 100% reconciliation', '5x faster operations'],
  },
  'beehive-illustration-platform': {
    number: '02',
    impact: ['150+ illustrators', '10K+ illustrations', '40% faster publishing', 'Global marketplace'],
  },
  'ai-recipe-platform': {
    number: '03',
    impact: ['20K+ recipes generated', '95% owner satisfaction', '3x engagement', 'AI personalization'],
  },
  'product-management-suite': {
    number: '04',
    impact: ['50% faster time to market', 'Multi-channel distribution', '99.8% data accuracy', 'Scalable architecture'],
  },
  'yestrak-customer-support-platform': {
    number: '05',
    impact: ['Automated call support', 'Reduced missed calls', 'Improved after-hours conversion', 'Faster response routing'],
  },
};

const timeline = [
  { year: '2017 - 2021', title: 'E-commerce Product Suite', detail: 'Multiple retail solutions' },
  { year: '2022', title: 'YesTrak Support System', detail: 'Call automation platform' },
  { year: '2023', title: 'Beehive Illustration Platform', detail: 'Illustrator marketplace' },
  { year: '2023', title: 'AI-Powered Recipe Platform', detail: 'Pet nutrition platform' },
  { year: '2024', title: 'Accounting Automation Platform', detail: 'AI bookkeeping system' },
  { year: '2026', title: 'AI Automation Systems', detail: 'Building intelligent solutions' },
];

function getDomain(project) {
  return project.tagline.split('|')[0].trim();
}

function Icon({ path, className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d={path} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BrowserFrame({ project, href }) {
  return (
    <a
      href={href}
      target={project.externalUrl ? '_blank' : undefined}
      rel={project.externalUrl ? 'noreferrer noopener' : undefined}
      className="group relative block h-full [perspective:2200px]"
    >
      <div className="absolute inset-0 translate-x-6 translate-y-6 rounded-[2.4rem] bg-gradient-to-br from-orange-300/30 via-orange-100/15 to-transparent blur-3xl transition duration-700 group-hover:translate-x-3 group-hover:translate-y-3 group-hover:blur-[72px]" />
      <div className="relative flex h-full min-h-[290px] flex-col overflow-hidden rounded-[2.2rem] border border-white/70 bg-white/90 p-3 shadow-[0_36px_100px_rgba(130,74,30,0.16)] ring-1 ring-orange-100/80 backdrop-blur-sm transition duration-700 [transform:rotateY(-6deg)_rotateX(2deg)_translateZ(0)] group-hover:[transform:rotateY(-2deg)_rotateX(1deg)_translateY(-8px)] group-hover:shadow-[0_48px_140px_rgba(130,74,30,0.24)]">
        <div className="mb-4 flex items-center justify-between rounded-[1.7rem] border border-orange-100/90 bg-[#fff7f1]/90 px-5 py-3.5 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#f97316]" />
            <span className="h-3 w-3 rounded-full bg-[#fdba74]" />
            <span className="h-3 w-3 rounded-full bg-[#fed7aa]" />
          </div>
          <div className="w-1/2 rounded-full border border-orange-100 bg-white/95 px-4 py-1.5 text-center text-[11px] font-medium text-slate-400 shadow-sm">
            {project.externalUrl ? 'Live product view' : 'Case study preview'}
          </div>
        </div>

        <div className="relative flex-1 overflow-hidden rounded-[1.65rem] border border-orange-100 bg-[#fffaf5]">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.045]"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/72 via-slate-950/10 to-orange-100/20 opacity-0 transition duration-500 group-hover:opacity-100" />
          <div className="absolute inset-x-4 bottom-4 flex flex-wrap gap-2 opacity-0 transition duration-500 group-hover:opacity-100">
            <span className="rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-slate-900 shadow-lg backdrop-blur">
              View Snapshot
            </span>
            <span className="rounded-full bg-white/15 px-4 py-2 text-xs font-semibold text-white backdrop-blur">
              View Case Study
            </span>
            <span className="rounded-full bg-white/15 px-4 py-2 text-xs font-semibold text-white backdrop-blur">
              View Architecture
            </span>
            <span className="rounded-full bg-white/15 px-4 py-2 text-xs font-semibold text-white backdrop-blur">
              Tech Stack
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

export default function ProjectsPage() {
  return (
    <Layout
      title="Projects"
      description="Premium AI-focused case studies covering automation, scalable systems, and high-impact delivery."
    >
      <div className="bg-[#f8f1e8] text-slate-900">
        <section className="projects-hero relative overflow-hidden border-b border-orange-100">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_84%_24%,_rgba(249,115,22,0.17),_transparent_20%),linear-gradient(135deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_32%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(139,69,19,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(139,69,19,0.45)_1px,transparent_1px)] [background-size:36px_36px]" />
          <div className="pointer-events-none absolute inset-y-0 right-[10%] w-[36rem] rounded-full bg-orange-200/20 blur-3xl" />

          <div className="relative mx-auto flex min-h-[720px] max-w-[1320px] items-center px-4 py-16 sm:px-6 lg:px-10">
            <div className="hero-copy w-full max-w-[650px] lg:w-[45%]">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/78 px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.22em] text-orange-700 shadow-[0_12px_30px_rgba(249,115,22,0.08)] backdrop-blur-sm">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#fff2e8] text-orange-600">
                  <Icon path="M12 4 4 8l8 4 8-4-8-4Zm-8 8 8 4 8-4M4 16l8 4 8-4" className="h-3 w-3" />
                </span>
                AI Automation • Backend Architecture • Scalable Systems
              </div>

              <h1 className="max-w-[650px] text-[44px] font-extrabold leading-[1.05] tracking-[-0.04em] text-slate-950 sm:text-[56px] lg:text-[72px]">
                Featured AI Systems & <span className="text-orange-600">Case Studies</span>
              </h1>

              <p className="mt-8 max-w-[580px] text-lg leading-8 text-slate-600 sm:text-xl lg:text-[22px] lg:leading-[1.6]">
                A showcase of AI-augmented systems, scalable architectures, and measurable business outcomes across
                FinTech, Healthcare, E-commerce, Publishing, and SaaS.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#case-studies"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-7 py-4 text-base font-semibold text-white shadow-[0_22px_50px_rgba(249,115,22,0.26)] transition duration-300 hover:-translate-y-1 hover:bg-orange-700 hover:shadow-[0_28px_70px_rgba(249,115,22,0.34)]"
                >
                  <Icon path="M5 12h14M12 5l7 7-7 7" className="h-5 w-5" />
                  Explore Projects
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-orange-200 bg-white/82 px-7 py-4 text-base font-semibold text-slate-700 shadow-[0_12px_28px_rgba(139,69,19,0.08)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-orange-300 hover:text-orange-700 hover:shadow-[0_18px_36px_rgba(139,69,19,0.14)]"
                >
                  <Icon path="M4 12h16M12 4v16" className="h-5 w-5" />
                  View Architecture Approach
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold text-slate-700">
                {['13+ Years Experience', '25+ Microservices', '5+ Industries'].map((item) => (
                  <div key={item} className="inline-flex items-center gap-2">
                    <span className="text-orange-600">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative mx-auto max-w-[1320px] px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
          <div className="absolute inset-x-20 top-6 h-28 rounded-full bg-orange-200/20 blur-3xl" />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {heroMetrics.map((metric, index) => (
              <div
                key={metric.label}
                className="metric-card group rounded-[2rem] border border-white/80 bg-white/88 p-6 shadow-[0_24px_70px_rgba(130,74,30,0.10)] ring-1 ring-orange-100/80 backdrop-blur-sm transition duration-300 hover:-translate-y-2 hover:shadow-[0_34px_90px_rgba(130,74,30,0.16)]"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-orange-100 bg-[#fff7f1] text-orange-600">
                    <Icon path={metricIcons[index]} className="h-5 w-5" />
                  </span>
                </div>
                <div className="metric-value text-3xl font-black leading-none tracking-[-0.03em] text-orange-600 md:text-[2.65rem]">{metric.value}</div>
                <p className="mt-3 text-xs leading-5 text-slate-600 md:text-[13px]">{metric.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1320px] px-4 pb-2 sm:px-6 lg:px-10 lg:pb-3">
          <div className="rounded-[2.2rem] border border-white/80 bg-white/72 px-6 py-7 shadow-[0_24px_60px_rgba(130,74,30,0.08)] ring-1 ring-orange-100/80 backdrop-blur-sm">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-orange-700">AI-Powered Capabilities</p>
                <p className="mt-2 text-sm text-slate-600">Core patterns used across intelligent products, automation platforms, and operational systems.</p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-7">
              {capabilityPills.map((pill, index) => (
                <span
                  key={pill}
                  className="inline-flex items-center gap-3 rounded-2xl border border-orange-100 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-300 hover:bg-[#fffaf6] hover:shadow-md"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#fff5ec] text-orange-600">
                    <Icon path={capabilityIcons[index]} className="h-4 w-4" />
                  </span>
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="case-studies" className="relative mx-auto max-w-[1320px] px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
          <div className="absolute right-0 top-28 h-64 w-64 rounded-full bg-orange-200/15 blur-3xl" />
          <div className="mb-14">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-orange-700">Premium Case Studies</p>
            <h2 className="mt-3 text-3xl font-black text-slate-950 md:text-4xl">Projects built for scale, automation, and measurable impact.</h2>
          </div>

          <div className="space-y-14 lg:space-y-20">
            {projects.map((project, index) => {
              const isEven = index % 2 === 0;
              const href = project.externalUrl || `/projects/${project.slug}`;
              const display = projectDisplay[project.slug];
              return (
                <article
                  key={project.id}
                  className="group overflow-hidden rounded-[2.4rem] border border-white/85 bg-white/92 p-5 shadow-[0_30px_90px_rgba(130,74,30,0.11)] ring-1 ring-orange-100/80 backdrop-blur-sm transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_40px_120px_rgba(130,74,30,0.16)] lg:p-6"
                >
                  <div className="grid items-stretch gap-5 lg:min-h-[290px] lg:grid-cols-12">
                    <div className={`${isEven ? 'lg:order-1 lg:col-span-5' : 'lg:order-2 lg:col-span-5'} flex flex-col justify-center`}>
                      <div className="mb-4 flex flex-wrap items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-orange-600 text-xs font-bold text-white shadow-md">
                          {display?.number || `0${index + 1}`}
                        </span>
                        <span className="rounded-full bg-[#fff5ec] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-orange-700">
                          {getDomain(project)}
                        </span>
                        <span className="rounded-full border border-orange-100 px-3 py-1 text-xs font-semibold text-slate-500">
                          {project.year}
                        </span>
                        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                          {project.status}
                        </span>
                      </div>

                      <h3 className="text-[2rem] font-black leading-[1.02] tracking-[-0.03em] text-slate-950">{project.title}</h3>
                      <p className="mt-1.5 text-sm font-medium text-slate-500">{project.tagline}</p>
                      <div className="mt-4 space-y-2.5 text-[14px] leading-6 text-slate-600">
                        <p><span className="font-semibold text-slate-700">Challenge:</span> {project.challenge}</p>
                        <p><span className="font-semibold text-slate-700">Solution:</span> {project.solution}</p>
                      </div>

                      <div className="mt-5">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700">Impact</p>
                        <div className="mt-3 grid gap-x-3 gap-y-2 sm:grid-cols-2">
                          {display?.impact.map((item) => (
                            <div key={item} className="flex items-center gap-2 rounded-[1rem] border border-orange-100 bg-[#fffaf6] px-3 py-2 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md">
                              <span className="text-orange-500">
                                <Icon path="M12 5v14M5 12h14" className="h-3.5 w-3.5" />
                              </span>
                              <p className="text-xs font-semibold leading-4 text-slate-700">{item}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700">Tech Stack</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {project.technologies.slice(0, 4).map((tech) => (
                            <span key={tech} className="rounded-full border border-orange-100 bg-[#fffaf6] px-3 py-1.5 text-xs font-semibold text-slate-700">
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 4 && (
                            <span className="rounded-full border border-orange-100 bg-white px-3 py-1.5 text-xs font-semibold text-slate-500">
                              +{project.technologies.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                        <a
                          href={href}
                          target={project.externalUrl ? '_blank' : undefined}
                          rel={project.externalUrl ? 'noreferrer noopener' : undefined}
                          className="inline-flex items-center justify-center rounded-full bg-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(249,115,22,0.22)] transition duration-300 hover:-translate-y-1 hover:bg-orange-700 hover:shadow-[0_24px_50px_rgba(249,115,22,0.28)]"
                        >
                          View Case Study
                        </a>
                        <Link
                          href="/contact"
                          className="inline-flex items-center justify-center rounded-full border border-orange-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition duration-300 hover:-translate-y-1 hover:border-orange-300 hover:text-orange-700 hover:shadow-md"
                        >
                          Discuss Similar Build
                        </Link>
                      </div>
                    </div>

                    <div className={`${isEven ? 'lg:order-2 lg:col-span-7' : 'lg:order-1 lg:col-span-7'}`}>
                      <BrowserFrame project={project} href={href} />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-[1320px] px-4 pt-4 pb-8 sm:px-6 lg:px-10 lg:pt-4 lg:pb-10">
          <div className="mb-5">
            <h2 className="text-[1.7rem] font-black text-slate-950">Project Journey & Growth</h2>
          </div>

          <div className="overflow-x-auto pb-2">
            <div className="min-w-[1120px]">
              <div className="relative mb-5 h-8">
                <div className="absolute left-0 right-4 top-1/2 h-[2px] -translate-y-1/2 bg-orange-500" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 text-lg text-orange-600">→</div>
                <div className="grid grid-cols-6">
                  {timeline.map((item, index) => (
                    <div key={`${item.year}-${item.title}`} className="relative flex h-8 items-center justify-center">
                      <span className={`relative z-10 inline-flex h-4 w-4 rounded-full border-2 border-[#f8f1e8] ${index === timeline.length - 1 ? 'bg-[#c25b1c]' : 'bg-orange-500'} shadow-[0_0_0_4px_rgba(249,115,22,0.14)]`} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3">
                {timeline.map((item) => (
                  <div key={`${item.year}-${item.title}-meta`} className="text-center">
                    <p className="text-sm font-bold text-slate-800">{item.year}</p>
                    <h3 className="mt-1 text-[11px] font-bold leading-4 text-slate-800">{item.title}</h3>
                    <p className="mt-1 text-[11px] leading-4 text-slate-500">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1320px] px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
          <div className="mb-10">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-orange-700">Tech Stack & Tools</p>
            <h2 className="mt-3 text-3xl font-black text-slate-950">Grouped by the systems they power.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {techGroups.map((group) => (
              <div
                key={group.name}
                className="rounded-[2rem] border border-white/85 bg-white/90 p-6 shadow-[0_18px_45px_rgba(130,74,30,0.09)] ring-1 ring-orange-100/80 backdrop-blur-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(130,74,30,0.14)]"
              >
                <h3 className="text-lg font-black text-slate-900">{group.name}</h3>
                <div className="mt-4 space-y-2">
                  {group.items.map((item) => {
                    const iconConfig = techItemIcons[item];
                    const TechIcon = iconConfig?.icon;

                    return (
                    <div key={item} className="flex items-center gap-3 rounded-2xl border border-orange-100 bg-[#fff8f3] px-3 py-2.5 text-sm font-semibold text-slate-700">
                      <span className={`flex h-7 w-7 items-center justify-center rounded-full ${iconConfig?.bg || 'bg-[#fff1ed]'} ${iconConfig?.color || 'text-orange-600'}`}>
                        {TechIcon ? <TechIcon className="h-4 w-4" /> : <span className="text-xs font-bold">•</span>}
                      </span>
                      {item}
                    </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="relative mx-auto max-w-[1320px] px-4 pb-20 sm:px-6 lg:px-10 lg:pb-28">
          <div className="relative overflow-hidden rounded-[2.4rem] border border-orange-300/40 bg-[linear-gradient(135deg,#4a250d_0%,#2b1608_55%,#1a0f09_100%)] px-6 py-9 text-white shadow-[0_28px_80px_rgba(74,37,13,0.35)] lg:px-10 lg:py-12">
            <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:34px_34px]" />
            <div className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-orange-500/20 blur-3xl" />
            <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-orange-300/10 blur-3xl" />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex max-w-3xl items-start gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-orange-500/16 text-orange-300 shadow-[0_0_0_12px_rgba(249,115,22,0.08)]">
                  <Icon path="M12 4 4 8v5c0 4 3.5 6.5 8 7 4.5-.5 8-3 8-7V8l-8-4Z" className="h-8 w-8" />
                </div>
                <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-orange-200">Build the next system</p>
                <h2 className="mt-3 text-3xl font-black leading-tight md:text-4xl">Have a manual process that should be automated?</h2>
                <p className="mt-4 text-base leading-7 text-orange-50/85">
                  Let&apos;s design an AI-powered workflow that saves time, reduces repetitive work, and scales with your business.
                </p>
                </div>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-1 hover:bg-orange-400"
              >
                Let&apos;s Build Together
              </Link>
            </div>
          </div>
        </section>
      </div>
      <style jsx>{`
        .projects-hero {
          background-color: #f8f1e8;
          background-image: url('/projects-hero-command-center.png');
          background-position: center bottom;
          background-size: 150% auto;
          background-repeat: no-repeat;
        }

        .hero-copy {
          text-align: center;
          margin-left: auto;
          margin-right: auto;
        }

        .metric-card {
          animation: metricFloat 5.5s ease-in-out infinite;
        }

        .metric-value {
          animation: metricPulse 2.6s ease-in-out infinite;
        }

        @keyframes metricFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        @keyframes metricPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.03);
            opacity: 0.94;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .metric-card,
          .metric-value {
            animation: none;
          }
        }

        @media (min-width: 768px) {
          .projects-hero {
            background-size: 125% auto;
            background-position: 72% center;
          }

          .hero-copy {
            text-align: left;
            margin-left: 0;
            margin-right: 0;
          }
        }

        @media (min-width: 1024px) {
          .projects-hero {
            background-size: cover;
            background-position: center right;
          }
        }

        @media (max-width: 767px) {
          .projects-hero {
            min-height: 980px;
            background-size: 135% auto;
            background-position: center bottom;
          }
        }
      `}</style>
    </Layout>
  );
}
