import { useEffect, useMemo, useState, type CSSProperties } from 'react'
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

const beliefs = [
  'Memory is the missing primitive in most AI systems.',
  'Agents fail at the infrastructure level, not the model level.',
  'The best systems are boring in prod and interesting in design.',
  'Distributed thinking: build for eventual consistency, not perfection.',
]

const experience = [
  {
    company: 'Current role - Bangalore',
    role: 'AI/Data Engineer',
    dates: 'Current',
    bullets: [
      'Building data and AI infrastructure for production workflows where retrieval, latency, and reliability matter.',
      'Designing agent-facing systems around durable state, observability, and controlled automation.',
      'Working close to the metal of applied AI: data contracts, pipeline reliability, and model integration.',
    ],
    stack: ['Python', 'PostgreSQL', 'LLM APIs', 'Docker', 'Linux'],
  },
  {
    company: 'Kisetsu Saison',
    role: 'Speech pipeline work',
    dates: 'Past',
    bullets: [
      'Built low-latency voice and collections automation flows for outbound financial operations.',
      'Optimized the speech loop across ASR, reasoning, TTS, and telephony handoff.',
      'Reduced operating cost through task-specific automation and tighter pipeline orchestration.',
    ],
    stack: ['ASR', 'TTS', 'Python', 'Telephony', 'Latency engineering'],
  },
  {
    company: 'Meetgram',
    role: 'Speech / voice agent work',
    dates: 'Past',
    bullets: [
      'Shipped voice-agent workflows that turned raw speech into structured product actions.',
      'Worked on real-time conversation flows, transcription reliability, and agent handoff behavior.',
      'Built practical speech tooling where latency and transcript quality controlled the UX.',
    ],
    stack: ['Whisper', 'Speech AI', 'FastAPI', 'Agent UX'],
  },
  {
    company: 'South Park Commons',
    role: 'Orange / Memory Fabric',
    dates: '2024',
    bullets: [
      'Built a persistent memory layer for LLM agents using graph, vector, and relational storage.',
      'Extracted structured knowledge from debugging sessions through LLM-driven analysis.',
      'Recognized as a top-5 infrastructure team project.',
    ],
    stack: ['Neo4j', 'ChromaDB', 'PostgreSQL', 'Agents', 'Memory'],
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
  featured?: boolean
}

const projects: Project[] = [
  {
    name: 'Orange / Memory Fabric',
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
    featured: true,
  },
  {
    name: 'Speech Pipeline System',
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
    name: 'Sarathi',
    kicker: 'Voice UX for visual assistance',
    description: 'A drop-in website assistant that calls users and explains confusing UI with page context.',
    problem: 'Users get stuck in product UI, but support teams rarely know what the user is seeing.',
    solution: 'Capture viewport context on demand, redact sensitive fields, and explain the screen over voice.',
    outcome: 'A phone-first support loop that keeps secrets server-side and avoids continuous screen streaming.',
    stack: ['Next.js', 'ElevenLabs', 'OpenAI Vision', 'TypeScript'],
    filters: ['Voice/Speech', 'Agent Infra'],
    github: 'https://github.com/harsh-raj-singh/saarthi',
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
    title: 'Human expertise still supervises AI',
    date: 'LinkedIn note',
    teaser: 'The .apply vs vectorized operations anecdote: why knowing the substrate still matters.',
  },
  {
    title: 'Netflix VOID, builder tools, and product memory',
    date: 'Essay seed',
    teaser: 'Notes on how evaluation loops and product context shape AI systems that survive contact with users.',
  },
  {
    title: 'Google Builder Day Bengaluru field notes',
    date: 'Event note',
    teaser: 'What local builder energy says about the next layer of AI infrastructure.',
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
                Previously at Kisetsu Saison and Meetgram. Recognized by South Park Commons as a
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
            <h2>Systems that make agents useful after the demo.</h2>
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
              <a className="writing-card" href={profile.linkedin} key={post.title} target="_blank" rel="noreferrer">
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

        <section className="proof-section reveal" id="recognition">
          <div>
            <p>South Park Commons</p>
            <h2>Top 5 Infrastructure Team · 2024</h2>
          </div>
          <p>
            Exploring AI infra and distributed systems for autonomous agent applications.
          </p>
          <div className="signal-row" aria-hidden="true">
            {Array.from({ length: 24 }).map((_, index) => (
              <span key={index} style={{ '--level': String((index % 7) + 1) } as CSSProperties} />
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
    </div>
  )
}
