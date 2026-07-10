import { useEffect } from 'react'
import {
  ArrowDown,
  ArrowUpRight,
  Braces,
  CodeXml,
  Cpu,
  Mail,
  MapPin,
  Mic2,
  Network,
} from 'lucide-react'
import './App.css'

const profile = {
  name: 'Rana Harshraj Singh',
  location: 'Bengaluru, India',
  email: 'ranaharshraj3@gmail.com',
  github: 'https://github.com/harsh-raj-singh',
  linkedin: 'https://www.linkedin.com/in/ranaharshrajsingh/',
}

const saarthiOrigin = (import.meta.env.VITE_SAARTHI_ORIGIN || 'https://saarthi-kappa-flame.vercel.app').replace(
  /\/$/,
  '',
)

type ProjectLink = {
  label: string
  href: string
}

type Project = {
  number: string
  category: string
  name: string
  headline: string
  description: string
  impact: string[]
  stack: string[]
  links: ProjectLink[]
  tone: 'blue' | 'lime' | 'violet'
}

const projects: Project[] = [
  {
    number: '01',
    category: 'Agent memory',
    name: 'Orange',
    headline: 'Memory that survives the session.',
    description:
      'A persistent memory layer that turns debugging sessions into reusable engineering context across PostgreSQL, Neo4j, and ChromaDB.',
    impact: ['Top 5 infra project at South Park Commons', 'Private + organisation-scoped MCP recall'],
    stack: ['Neo4j', 'ChromaDB', 'PostgreSQL', 'FastAPI', 'MCP'],
    links: [
      { label: 'GitHub', href: 'https://github.com/harsh-raj-singh/orange' },
      { label: 'Live', href: 'https://site-sage-eta-18.vercel.app' },
    ],
    tone: 'blue',
  },
  {
    number: '02',
    category: 'Production speech',
    name: 'Voice pipeline',
    headline: 'Voice AI at production speed.',
    description:
      'An in-house speech loop for EMI reminders and customer upselling, spanning ASR, LLM routing, synthesis, and telephony handoff.',
    impact: ['Sub-800ms end-to-end latency', '₹2.6M lower annual operating cost'],
    stack: ['Whisper', 'TTS', 'Telephony', 'Python', 'ONNX'],
    links: [],
    tone: 'lime',
  },
  {
    number: '03',
    category: 'Voice interface',
    name: 'Saarthi',
    headline: 'The page that listens back.',
    description:
      'An embeddable voice guide that can explain, highlight, fill, and click website interfaces while keeping the user in control.',
    impact: ['English, Hindi, and Hinglish', 'One-script embed with live UI sync'],
    stack: ['Next.js', 'OpenAI Speech', 'TypeScript', 'Vercel'],
    links: [
      { label: 'GitHub', href: 'https://github.com/harsh-raj-singh/saarthi' },
      { label: 'Live', href: saarthiOrigin },
    ],
    tone: 'violet',
  },
]

const experience = [
  {
    company: 'Kisetsu Saison Finance',
    role: 'Data Scientist',
    dates: '2025 — now',
    proof: 'ML systems for voice, address intelligence, and KYC across 2M+ customers.',
  },
  {
    company: 'Commerce Robotics, Japan',
    role: 'AI Development Intern · Meetgram',
    dates: '2024',
    proof: 'Duplex transcription architecture supporting 1,200+ concurrent sessions.',
  },
  {
    company: 'AGC Group',
    role: 'AI Engineer Intern',
    dates: '2024',
    proof: 'Document translation with 97% extraction accuracy and 98% layout fidelity.',
  },
]

const capabilities = [
  {
    icon: Network,
    title: 'Agent systems',
    text: 'Orchestration, tool use, context boundaries, and the infrastructure that keeps agents dependable.',
  },
  {
    icon: Mic2,
    title: 'Voice & speech',
    text: 'Streaming ASR, low-latency speech loops, multilingual audio, and production telephony.',
  },
  {
    icon: Braces,
    title: 'Memory infrastructure',
    text: 'Graph, vector, and relational storage shaped into useful long-term recall for machines.',
  },
]

const writing = [
  {
    title: "Quantization's hidden cost",
    topic: 'Whisper · systems',
    url: 'https://www.linkedin.com/posts/ranaharshrajsingh_i-spent-valentines-day-profiling-whisper-activity-7428423682819104768-B2RQ?utm_source=share&utm_medium=member_desktop&rcm=ACoAADj-Q4cBrlCzPYb76OShoTnGE2s7QlWbSJI',
  },
  {
    title: 'Inside Arcee Trinity Large',
    topic: 'Open models · research',
    url: 'https://www.linkedin.com/posts/ranaharshrajsingh_research-paper-3-arcee-trinity-large-technical-activity-7447444356220948480-1e__?utm_source=share&utm_medium=member_desktop&rcm=ACoAADj-Q4cBrlCzPYb76OShoTnGE2s7QlWbSJI',
  },
  {
    title: 'Why audio-native transformers matter',
    topic: 'Speech · architecture',
    url: 'https://www.linkedin.com/posts/ranaharshrajsingh_ive-always-wondered-what-happens-if-we-activity-7419790526926888960-zgSj?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAADj-Q4cBrlCzPYb76OShoTnGE2s7QlWbSJI',
  },
]

function useRevealOnScroll() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))

    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])
}

function SaarthiAgent() {
  useEffect(() => {
    if (document.querySelector('script[data-saarthi-agent="portfolio"]')) return

    const script = document.createElement('script')
    script.src = `${saarthiOrigin}/widget.js`
    script.async = true
    script.dataset.saarthiAgent = 'portfolio'
    script.dataset.siteId = 'harsh-portfolio'
    script.dataset.apiBase = saarthiOrigin
    document.body.appendChild(script)
  }, [])

  return null
}

function SectionIntro({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return (
    <div className="section-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {copy ? <p className="section-copy">{copy}</p> : null}
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={`project-card project-card--${project.tone}`}>
      <div className="project-meta">
        <span>{project.number}</span>
        <span>{project.category}</span>
      </div>
      <div className="project-title">
        <p>{project.name}</p>
        <h3>{project.headline}</h3>
      </div>
      <p className="project-description">{project.description}</p>
      <ul className="impact-list">
        {project.impact.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className="tag-row" aria-label={`${project.name} technology stack`}>
        {project.stack.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <div className="project-links">
        {project.links.length ? (
          project.links.map((link) => (
            <a href={link.href} key={link.label} target="_blank" rel="noreferrer">
              {link.label}
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          ))
        ) : (
          <span>Private production system</span>
        )}
      </div>
    </article>
  )
}

export default function App() {
  useRevealOnScroll()

  return (
    <div className="portfolio-site">
      <header className="site-header">
        <div className="shell header-inner">
          <a className="wordmark" href="#top" aria-label="Rana Harshraj Singh, back to top">
            <span>RH</span>
            <strong>Rana Harshraj</strong>
          </a>
          <nav aria-label="Primary navigation">
            <a href="#work">Work</a>
            <a href="#experience">Experience</a>
            <a href="#thinking">Thinking</a>
          </nav>
          <a className="github-link" href={profile.github} target="_blank" rel="noreferrer">
            <CodeXml size={18} aria-hidden="true" />
            GitHub
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      </header>

      <main id="top">
        <section className="hero shell">
          <div className="hero-orbit hero-orbit--one" aria-hidden="true" />
          <div className="hero-orbit hero-orbit--two" aria-hidden="true" />
          <div className="availability-pill">
            <span /> Building AI systems in Bengaluru
          </div>
          <p className="hero-kicker">AI everything engineer</p>
          <h1>
            I build the systems
            <span>that make AI useful.</span>
          </h1>
          <p className="hero-copy">
            Memory for agents. Voice pipelines that respond in real time. Infrastructure that stays
            dependable after the demo ends.
          </p>
          <div className="hero-actions">
            <a className="button button--primary" href="#work">
              Selected work
              <ArrowDown size={17} aria-hidden="true" />
            </a>
            <a className="button button--ghost" href={profile.github} target="_blank" rel="noreferrer">
              <CodeXml size={18} aria-hidden="true" />
              github.com/harsh-raj-singh
            </a>
          </div>
          <div className="proof-grid" aria-label="Selected impact">
            <div>
              <strong>2M+</strong>
              <span>customers served by systems I’ve worked on</span>
            </div>
            <div>
              <strong>&lt;800ms</strong>
              <span>production voice pipeline latency</span>
            </div>
            <div>
              <strong>Top 5</strong>
              <span>infrastructure project at SPC</span>
            </div>
          </div>
        </section>

        <section className="section section--work" id="work">
          <div className="shell" data-reveal>
            <SectionIntro
              eyebrow="Selected work · 03"
              title="A small set of systems with real weight."
              copy="Three projects that best represent how I think: durable memory, low-latency speech, and interfaces that can act with you."
            />
            <div className="project-grid">
              {projects.map((project) => (
                <ProjectCard project={project} key={project.name} />
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="experience">
          <div className="shell" data-reveal>
            <SectionIntro eyebrow="Experience" title="Built close to the problem." />
            <div className="experience-grid">
              {experience.map((entry, index) => (
                <article className="experience-card" key={entry.company}>
                  <div className="experience-index">0{index + 1}</div>
                  <p className="experience-date">{entry.dates}</p>
                  <h3>{entry.company}</h3>
                  <p className="experience-role">{entry.role}</p>
                  <p className="experience-proof">{entry.proof}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--dark">
          <div className="shell" data-reveal>
            <SectionIntro
              eyebrow="What I’m good at"
              title="Infrastructure below the intelligence."
            />
            <div className="capability-grid">
              {capabilities.map(({ icon: Icon, title, text }) => (
                <article key={title}>
                  <div className="capability-icon">
                    <Icon size={22} aria-hidden="true" />
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="thinking">
          <div className="shell" data-reveal>
            <SectionIntro eyebrow="Notes in public" title="Thinking through the work." />
            <div className="writing-grid">
              {writing.map((post, index) => (
                <a href={post.url} key={post.title} target="_blank" rel="noreferrer">
                  <span className="writing-index">0{index + 1}</span>
                  <span className="writing-topic">{post.topic}</span>
                  <h3>{post.title}</h3>
                  <span className="writing-cta">
                    Read on LinkedIn <ArrowUpRight size={15} aria-hidden="true" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="shell contact-inner" data-reveal>
            <div>
              <p className="eyebrow">Open to ambitious problems</p>
              <h2>Let’s build what comes after the prototype.</h2>
            </div>
            <div className="contact-actions">
              <a className="button button--light" href={`mailto:${profile.email}`}>
                <Mail size={18} aria-hidden="true" />
                Email me
              </a>
              <a className="button button--outline" href={profile.github} target="_blank" rel="noreferrer">
                <CodeXml size={18} aria-hidden="true" />
                GitHub
              </a>
              <a className="button button--outline" href={profile.linkedin} target="_blank" rel="noreferrer">
                <Network size={18} aria-hidden="true" />
                LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="shell footer-inner">
          <span>
            <Cpu size={14} aria-hidden="true" /> {profile.name}
          </span>
          <span>
            <MapPin size={14} aria-hidden="true" /> {profile.location}
          </span>
          <span>Memory · Agents · Speech</span>
        </div>
      </footer>
      <SaarthiAgent />
    </div>
  )
}
