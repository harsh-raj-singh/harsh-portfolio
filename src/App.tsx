import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  Cpu,
  ExternalLink,
  GitBranch,
  MapPin,
  Mic2,
  Network,
  Terminal,
} from 'lucide-react'
import './App.css'

const profile = {
  name: 'Rana Harshraj Singh',
  location: 'Bangalore',
  email: 'ranaharshraj3@gmail.com',
  github: 'https://github.com/harsh-raj-singh',
  linkedin: 'https://www.linkedin.com/in/ranaharshrajsingh/',
  twitter: 'https://x.com/ranaharshraj7',
}

const heroPhrases = [
  'Building memory into machines.',
  'Orchestrating agents that think.',
  'Infrastructure for the post-LLM stack.',
]

const techTicker = ['Neo4j', 'ChromaDB', 'PostgreSQL', 'Go', 'Python', 'LangChain', 'Whisper', 'FastAPI']
const saarthiOrigin = (import.meta.env.VITE_SAARTHI_ORIGIN || 'https://saarthi-kappa-flame.vercel.app').replace(
  /\/$/,
  '',
)

const beliefs = [
  'Memory is the missing primitive in most AI systems.',
  'Agents fail at the infrastructure level, not the model level.',
  'The best systems are boring in prod and interesting in design.',
  'Distributed thinking: build for eventual consistency, not perfection.',
]

const experience = [
  {
    company: 'Kisetsu Saison Finance Ltd',
    role: 'Data Scientist',
    dates: 'Jun 2025 - Present',
    bullets: [
      'Built production ML systems across voice agents, address intelligence, and KYC automation serving 2 million+ customers.',
      'Engineered an end-to-end speech pipeline for upsell and EMI reminder workflows, reducing annual operating cost by Rs 2.6M with sub-800ms latency.',
      'Fine-tuned BERT address NER to 94.2% F1 and orchestrated OCR-based KYC verification for 80K+ documents/month at 96% accuracy.',
    ],
    stack: ['Speech AI', 'BERT', 'OCR', 'Python', 'ML systems'],
  },
  {
    company: 'Commerce Robotics, Japan',
    role: 'AI Development Intern - Meetgram',
    dates: 'May 2024 - Jul 2024',
    bullets: [
      'Engineered Meetgram, an AI meeting management tool with real-time transcription and translation for SaaS teams.',
      'Built a duplex STT architecture using Whisper Tiny for streaming and Whisper Large for batch processing, supporting 1,200+ concurrent sessions.',
      'Fine-tuned Whisper on 12K+ medical transcripts and reduced CPU overhead through async processing and GPU offload.',
    ],
    stack: ['Whisper', 'Streaming STT', 'GPU offload', 'Translation', 'SaaS'],
  },
  {
    company: 'AGC Group',
    role: 'AI Engineer Intern',
    dates: 'Sep 2024 - Nov 2024',
    bullets: [
      'Architected a multilingual document translation pipeline for cross-language business communication.',
      'Reduced translation turnaround by 90% and improved extraction accuracy from 85% to 97% with custom OCR.',
      'Built layout preservation logic that maintained 98% visual fidelity across translated documents.',
    ],
    stack: ['OCR', 'Document AI', 'Translation', 'Layout analysis', 'Python'],
  },
  {
    company: 'Predixion AI',
    role: 'AI Intern',
    dates: 'Mar 2024 - Apr 2024',
    bullets: [
      'Built NLP pipelines with open-source LLMs to extract structured insights from Indian financial reports.',
      'Focused on images, graphs, and tabular signals inside unstructured reports.',
      'Integrated OCR to process reports and reach 92% extraction accuracy.',
    ],
    stack: ['Open-source LLMs', 'OCR', 'NLP', 'Financial reports', 'Computer vision'],
  },
]

const filters = ['All', 'Agent Infra', 'Voice/Speech', 'Memory Systems', 'Distributed Systems']

type Project = {
  name: string
  kicker: string
  description: string
  problem: string
  solution: string
  outcome: string
  stack: string[]
  filters: string[]
  github?: string
  live?: string
  post?: string
  featured?: boolean
}

const projects: Project[] = [
  {
    name: 'Orange',
    kicker: 'Persistent memory for agentic engineering',
    description:
      'A persistent memory layer for LLM agents using Neo4j, ChromaDB, and PostgreSQL. Extracts structured knowledge from debugging sessions via LLM agents. Recognized by South Park Commons.',
    problem: 'Agents lose task history, architectural decisions, and debugging context between sessions.',
    solution: 'Capture sessions, extract durable insights, and recall them through graph + vector memory.',
    outcome: 'Reusable agent memory with private user scope, shared org scope, and MCP recall tools.',
    stack: ['Neo4j', 'ChromaDB', 'PostgreSQL', 'FastAPI', 'Next.js', 'MCP'],
    filters: ['Agent Infra', 'Memory Systems', 'Distributed Systems'],
    github: 'https://github.com/harsh-raj-singh/orange',
    live: 'https://site-sage-eta-18.vercel.app',
    post: 'https://www.linkedin.com/posts/ranaharshrajsingh_incredibly-proud-to-share-that-orange1-was-activity-7433318778253352960-Fu_u?utm_source=share&utm_medium=member_desktop&rcm=ACoAADj-Q4cBrlCzPYb76OShoTnGE2s7QlWbSJI',
    featured: true,
  },
  {
    name: 'Speech Pipeline',
    kicker: 'Real-time voice automation',
    description:
      'A production speech loop for customer calls and operational workflows, tuned across recognition, reasoning, synthesis, and telephony handoff.',
    problem: 'Voice agents break when latency, transcript quality, and handoff state drift apart.',
    solution: 'Own the full speech loop end to end: ASR, orchestration, TTS, routing, and failure handling.',
    outcome: 'Sub-800ms interaction loop and meaningful operating-cost reduction in collections workflows.',
    stack: ['Whisper', 'TTS', 'Telephony', 'Python', 'Latency engineering'],
    filters: ['Voice/Speech', 'Agent Infra'],
    featured: true,
  },
  {
    name: 'Saarthi',
    kicker: 'In-page voice guide for websites',
    description:
      'An embeddable voice assistant that lets users ask what something on a page means and hear a clear answer without leaving the site.',
    problem: 'Users get stuck inside unfamiliar product UI, especially when page language or controls are unclear.',
    solution: 'Embed a privacy-minded widget that records only on press, sends safe page context, and replies in English, Hindi, or Hinglish.',
    outcome: 'A live voice guide on this portfolio powered by OpenAI transcription, reasoning, and text-to-speech.',
    stack: ['Next.js', 'OpenAI Speech', 'TypeScript', 'Vercel'],
    filters: ['Voice/Speech', 'Agent Infra'],
    github: 'https://github.com/harsh-raj-singh/saarthi',
    live: saarthiOrigin,
  },
  {
    name: 'NextRead',
    kicker: 'Recommendation loop with user feedback',
    description: 'An article recommender that learns from reading behavior and ranks a personalized feed.',
    problem: 'Feeds get stale when they rank only by global popularity and ignore reader-specific signal.',
    solution: 'Track views, likes, dislikes, and ratings, then rank with TF-IDF plus exploration slots.',
    outcome: 'A deployed recommender with protected ingestion, auth, and cold-start fallback behavior.',
    stack: ['Next.js', 'Supabase', 'TF-IDF', 'TypeScript', 'Vercel'],
    filters: ['Distributed Systems'],
    github: 'https://github.com/harsh-raj-singh/next-read',
    live: 'https://next-read-theta.vercel.app',
  },
  {
    name: 'MatExprint',
    kicker: 'Low-latency product loop',
    description: 'A 60-second mental math sprint with local-first gameplay and persistent leaderboard writes.',
    problem: 'Small interactive products feel broken when network writes sit inside the active user loop.',
    solution: 'Keep the round fully local, then persist completed attempts lazily through Supabase.',
    outcome: 'Fast input feel, production deployment, and optional offline leaderboard behavior.',
    stack: ['React', 'Next.js', 'Supabase', 'TypeScript'],
    filters: ['Distributed Systems'],
    github: 'https://github.com/harsh-raj-singh/matiks-sprint',
    live: 'https://matiks-sprint.vercel.app',
  },
]

const writing = [
  {
    title: "Quantization's Hidden Cost: CPU-GPU Bottleneck and Batching Tradeoffs",
    date: 'LinkedIn note',
    teaser: 'What profiling Whisper reveals about quantization, CPU-GPU transfer, and batching tradeoffs.',
    url: 'https://www.linkedin.com/posts/ranaharshrajsingh_i-spent-valentines-day-profiling-whisper-activity-7428423682819104768-B2RQ?utm_source=share&utm_medium=member_desktop&rcm=ACoAADj-Q4cBrlCzPYb76OShoTnGE2s7QlWbSJI',
  },
  {
    title: 'Arcee Trinity Large Technical Report Summary',
    date: 'LinkedIn note',
    teaser: 'Notes on Arcee Trinity Large and the system choices behind efficient open model design.',
    url: 'https://www.linkedin.com/posts/ranaharshrajsingh_research-paper-3-arcee-trinity-large-technical-activity-7447444356220948480-1e__?utm_source=share&utm_medium=member_desktop&rcm=ACoAADj-Q4cBrlCzPYb76OShoTnGE2s7QlWbSJI',
  },
  {
    title: 'Transformers for Audio: Speech-Native AI Breakthrough',
    date: 'LinkedIn note',
    teaser: 'Why audio-native transformer architectures matter for the next generation of speech systems.',
    url: 'https://www.linkedin.com/posts/ranaharshrajsingh_ive-always-wondered-what-happens-if-we-activity-7419790526926888960-zgSj?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAADj-Q4cBrlCzPYb76OShoTnGE2s7QlWbSJI',
  },
]

const stackGroups: Array<[string, string[]]> = [
  ['Infrastructure', ['Neo4j', 'ChromaDB', 'PostgreSQL', 'Redis']],
  ['Languages', ['Python', 'Go', 'C/C++']],
  ['AI/ML', ['LangChain', 'Whisper', 'LLM APIs', 'NeMo', 'ONNX']],
  ['Systems', ['Docker', 'Linux', 'Kafka', 'gRPC']],
  ['Agent Frameworks', ['LangGraph', 'Custom orchestration', 'MCP']],
]

function useTypewriter(phrases: string[]) {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const phrase = phrases[phraseIndex]
    const atEnd = charIndex === phrase.length
    const atStart = charIndex === 0
    const delay = atEnd && !deleting ? 1500 : deleting ? 34 : 58

    const timer = window.setTimeout(() => {
      if (atEnd && !deleting) {
        setDeleting(true)
        return
      }

      if (atStart && deleting) {
        setDeleting(false)
        setPhraseIndex((index) => (index + 1) % phrases.length)
        return
      }

      setCharIndex((index) => index + (deleting ? -1 : 1))
    }, delay)

    return () => window.clearTimeout(timer)
  }, [charIndex, deleting, phraseIndex, phrases])

  return phrases[phraseIndex].slice(0, charIndex)
}

function useRevealOnScroll() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))

    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])
}

function SaarthiAgent() {
  useEffect(() => {
    if (document.querySelector('script[data-saarthi-agent="portfolio"]')) {
      return
    }

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

function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="section-label">
      <span>{index}</span>
      <p>{title}</p>
    </div>
  )
}

function Tags({ items }: { items: string[] }) {
  return (
    <div className="tag-row">
      {items.map((item) => (
        <span className="tag" key={item}>
          {item}
        </span>
      ))}
    </div>
  )
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="project-links" aria-label={`${project.name} links`}>
      {project.github ? (
        <a href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.name} GitHub`}>
          <GitBranch size={16} aria-hidden="true" />
          GitHub
        </a>
      ) : null}
      {project.live ? (
        <a href={project.live} target="_blank" rel="noreferrer" aria-label={`${project.name} live demo`}>
          <ExternalLink size={16} aria-hidden="true" />
          Live
        </a>
      ) : null}
      {project.post ? (
        <a href={project.post} target="_blank" rel="noreferrer" aria-label={`${project.name} LinkedIn post`}>
          <ExternalLink size={16} aria-hidden="true" />
          LinkedIn
        </a>
      ) : null}
    </div>
  )
}

export default function App() {
  const [activeFilter, setActiveFilter] = useState(filters[0])
  const typedHeadline = useTypewriter(heroPhrases)
  useRevealOnScroll()

  const featuredProjects = useMemo(() => projects.filter((project) => project.featured), [])
  const filteredProjects = useMemo(() => {
    const remaining = projects.filter((project) => !project.featured)
    if (activeFilter === 'All') return remaining
    return remaining.filter((project) => project.filters.includes(activeFilter))
  }, [activeFilter])

  return (
    <div className="terminal-site">
      <header className="topbar">
        <a className="brand-path" href="#hero" aria-label="Go to top">
          ~/rana-harshraj-singh
        </a>
        <nav aria-label="Primary navigation">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section className="hero-section" id="hero">
          <div className="hero-grid">
            <div className="hero-copy reveal is-visible">
              <p className="file-label">
                <Terminal size={15} aria-hidden="true" />
                {profile.name}
              </p>
              <h1 aria-label={heroPhrases.join(' ')}>
                <span>{typedHeadline}</span>
                <span className="cursor" aria-hidden="true" />
              </h1>
              <p className="hero-desc">
                AI infrastructure engineer. I build the systems underneath the AI - memory layers,
                agent orchestration, voice pipelines, and the scaffolding that makes autonomous
                systems actually work in production.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#projects">
                  See my work
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
                <a className="button" href="#contact">
                  Get in touch
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
              </div>
            </div>

            <aside className="system-card reveal is-visible" aria-label="System status">
              <div className="status-line">
                <span className="status-dot" />
                prod-ready systems
              </div>
              <dl>
                <div>
                  <dt>focus</dt>
                  <dd>memory / agents / speech</dd>
                </div>
                <div>
                  <dt>base</dt>
                  <dd>
                    <MapPin size={14} aria-hidden="true" />
                    Bangalore
                  </dd>
                </div>
                <div>
                  <dt>bias</dt>
                  <dd>boring infra, sharp interfaces</dd>
                </div>
              </dl>
            </aside>
          </div>

          <div className="tech-ticker" aria-label="Technology stack">
            {techTicker.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </section>

        <section className="panel-section reveal" id="about">
          <SectionLabel index="01" title="about / philosophy" />
          <div className="about-grid">
            <div className="terminal-panel bio-panel">
              <p>
                I'm a builder focused on the infrastructure layer of AI systems - the part that
                makes agents actually remember, coordinate, and reason reliably. I've built graph
                memory systems, real-time speech pipelines, and multi-agent orchestration
                frameworks.
              </p>
              <p>
                Previously at Kisetsu Saison and Commerce Robotics. Recognized by South Park Commons as a
                top-5 infrastructure team project.
              </p>
            </div>
            <div className="terminal-panel belief-panel">
              {beliefs.map((belief, index) => (
                <p key={belief}>
                  <code>$ {String(index + 1).padStart(2, '0')}</code>
                  {belief}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="panel-section reveal" id="experience">
          <SectionLabel index="02" title="experience" />
          <div className="timeline">
            {experience.map((entry) => (
              <article className="timeline-card" key={entry.company}>
                <div className="timeline-head">
                  <div>
                    <h2>{entry.company}</h2>
                    <p>{entry.role}</p>
                  </div>
                  <span>{entry.dates}</span>
                </div>
                <ul>
                  {entry.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <Tags items={entry.stack} />
              </article>
            ))}
          </div>
        </section>

        <section className="panel-section reveal" id="projects">
          <SectionLabel index="03" title="projects" />
          <div className="section-heading">
            <h2>Systems that make agents useful.</h2>
            <p>
              Memory, orchestration, speech loops, and small production surfaces where state and
              latency decide whether the system survives.
            </p>
          </div>

          <div className="featured-grid">
            {featuredProjects.map((project) => (
              <article className="project-card featured-card" key={project.name}>
                <div className="project-topline">
                  <p>{project.kicker}</p>
                  <ProjectLinks project={project} />
                </div>
                <h3>{project.name}</h3>
                <p className="project-desc">{project.description}</p>
                <div className="chain">
                  <p>
                    <span>Problem</span>
                    {project.problem}
                  </p>
                  <p>
                    <span>Solution</span>
                    {project.solution}
                  </p>
                  <p>
                    <span>Outcome</span>
                    {project.outcome}
                  </p>
                </div>
                <Tags items={project.stack} />
              </article>
            ))}
          </div>

          <div className="filter-row" aria-label="Filter projects by tag">
            {filters.map((filter) => (
              <button
                className={filter === activeFilter ? 'is-active' : ''}
                key={filter}
                onClick={() => setActiveFilter(filter)}
                type="button"
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="project-grid">
            {filteredProjects.map((project) => (
              <article className="project-card" key={project.name}>
                <div className="project-topline">
                  <p>{project.kicker}</p>
                  <ProjectLinks project={project} />
                </div>
                <h3>{project.name}</h3>
                <p className="project-desc">{project.description}</p>
                <div className="chain compact">
                  <p>
                    <span>Problem</span>
                    {project.problem}
                  </p>
                  <p>
                    <span>Solution</span>
                    {project.solution}
                  </p>
                  <p>
                    <span>Outcome</span>
                    {project.outcome}
                  </p>
                </div>
                <Tags items={project.stack} />
              </article>
            ))}
          </div>
        </section>

        <section className="panel-section reveal" id="writing">
          <SectionLabel index="04" title="writing / thinking" />
          <div className="section-heading">
            <h2>What I think about</h2>
            <p>Occasional writing on agent infrastructure, LLM systems, and distributed design.</p>
          </div>
          <div className="writing-grid">
            {writing.map((post) => (
              <a className="writing-card" href={post.url} key={post.title} target="_blank" rel="noreferrer">
                <span>{post.date}</span>
                <h3>{post.title}</h3>
                <p>{post.teaser}</p>
                <strong>Read on LinkedIn {'->'}</strong>
              </a>
            ))}
          </div>
        </section>

        <section className="panel-section reveal" id="stack">
          <SectionLabel index="05" title="skills / stack" />
          <div className="section-heading">
            <h2>What I build with</h2>
            <p>No progress bars. Just tools that have been near real systems.</p>
          </div>
          <div className="stack-grid">
            {stackGroups.map(([group, items]) => (
              <div className="stack-card" key={group}>
                <h3>{group}</h3>
                <Tags items={items} />
              </div>
            ))}
          </div>
        </section>

        <section className="contact-section reveal" id="contact">
          <div className="contact-panel">
            <p className="file-label">
              <Network size={15} aria-hidden="true" />
              contact.sock
            </p>
            <h2>Let's build something.</h2>
            <a className="email-link" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <div className="social-row">
              <a href={profile.github} target="_blank" rel="noreferrer">
                <GitBranch size={18} aria-hidden="true" />
                GitHub
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                <Network size={18} aria-hidden="true" />
                LinkedIn
              </a>
              <a href={profile.twitter} target="_blank" rel="noreferrer">
                <ExternalLink size={18} aria-hidden="true" />
                Twitter/X
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>
          <Cpu size={14} aria-hidden="true" />
          Built from Bangalore
        </span>
        <span>
          <Mic2 size={14} aria-hidden="true" />
          memory / agents / speech
        </span>
      </footer>
      <SaarthiAgent />
    </div>
  )
}
