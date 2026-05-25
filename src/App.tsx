import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import { ArrowUpRight, GitBranch, MapPin, Menu, Radio, Sparkles, X } from 'lucide-react'
import './App.css'
import { BookChapters } from './components/BookChapters'
import { CuriosityScene } from './CuriosityScene'
import { profile, projects, type Project } from './projects'

function projectStyle(project: Project) {
  return { '--accent': project.accent } as CSSProperties
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="project-links" aria-label={`${project.title} links`}>
      {project.live ? (
        <a className="link-button primary" href={project.live} target="_blank" rel="noreferrer">
          <ArrowUpRight size={17} aria-hidden="true" />
          Live
        </a>
      ) : (
        <span className="link-button unavailable">
          <Radio size={16} aria-hidden="true" />
          No live link yet
        </span>
      )}

      {project.repo ? (
        <a className="link-button" href={project.repo} target="_blank" rel="noreferrer">
          <GitBranch size={17} aria-hidden="true" />
          GitHub
        </a>
      ) : (
        <span className="link-button unavailable">
          <GitBranch size={16} aria-hidden="true" />
          Private build
        </span>
      )}
    </div>
  )
}

function LegacyPortfolio() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [introDone, setIntroDone] = useState(false)
  const activeProject = projects[activeIndex]

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroDone(true), 1100)
    return () => window.clearTimeout(timer)
  }, [])

  const proofPoints = useMemo(
    () => [
      ['₹2.6M', 'annual ops savings'],
      ['<800ms', 'voice loop latency'],
      ['99.4%', 'LoRA FT quality recovered'],
      ['6.4%', 'CMoE perplexity drop'],
      ['2.5-4x', 'local TTS real-time factor'],
    ],
    [],
  )

  return (
    <div className="portfolio-shell" style={projectStyle(activeProject)}>
      <CuriosityScene activeColor={activeProject.accent} activeIndex={activeIndex} />

      <div className={`intro ${introDone ? 'is-done' : ''}`} aria-hidden={introDone}>
        <p>Loading</p>
        <div className="intro-bars">
          <span />
          <span />
          <span />
        </div>
      </div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Go to top">
          RHS
        </a>
        <nav className="site-nav" aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#proof">Proof</a>
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </nav>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero-copy">
            <div className="profile-pill">
              <img src={profile.avatar} alt={profile.name} />
              <span>{profile.handle}</span>
              <span className="pill-dot" />
              <MapPin size={15} aria-hidden="true" />
              <span>{profile.location}</span>
            </div>

            <p className="eyebrow">{profile.bio}</p>
            <h1>
              Curiosity builds memory systems, voice agents, recommender loops, and model internals.
            </h1>
            <p className="lede">
              I make infrastructure-flavored AI products: graph memory for agents, low-latency speech
              pipelines, local TTS, sparse transformers, and efficient fine-tuning experiments.
            </p>

            <div className="hero-actions">
              <a className="link-button primary" href="#work">
                <Sparkles size={17} aria-hidden="true" />
                Explore work
              </a>
              <a className="link-button" href={profile.github} target="_blank" rel="noreferrer">
                <GitBranch size={17} aria-hidden="true" />
                GitHub profile
              </a>
            </div>
          </div>

          <button
            className={`launch-disc ${menuOpen ? 'is-open' : ''}`}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="project-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={28} aria-hidden="true" /> : <Menu size={28} aria-hidden="true" />}
            <span>
              Harsh's
              <br />
              Diverse Builds
            </span>
          </button>

          <div className={`project-menu ${menuOpen ? 'is-open' : ''}`} id="project-menu">
            {projects.map((project, index) => (
              <button
                className={index === activeIndex ? 'is-active' : ''}
                type="button"
                key={project.title}
                style={projectStyle(project)}
                onClick={() => {
                  setActiveIndex(index)
                  setMenuOpen(false)
                }}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                {project.shortTitle}
              </button>
            ))}
          </div>
        </section>

        <section className="work-zone" id="work">
          <div className="section-kicker">
            <span>Selected work</span>
            <span>{String(activeIndex + 1).padStart(2, '0')} / {projects.length}</span>
          </div>

          <article className="project-focus" style={projectStyle(activeProject)}>
            <div className="focus-index">{String(activeIndex + 1).padStart(2, '0')}</div>
            <div className="focus-body">
              <p className="eyebrow">{activeProject.domain} / {activeProject.year}</p>
              <h2>{activeProject.title}</h2>
              <p className="project-summary">{activeProject.summary}</p>
              <p className="impact">{activeProject.impact}</p>

              <ul className="fact-list">
                {activeProject.facts.map((fact) => (
                  <li key={fact}>{fact}</li>
                ))}
              </ul>

              <div className="stack-list" aria-label={`${activeProject.title} stack`}>
                {activeProject.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>

              <ProjectLinks project={activeProject} />
            </div>
          </article>

          <div className="project-strip" role="tablist" aria-label="Projects">
            {projects.map((project, index) => (
              <button
                className={index === activeIndex ? 'is-active' : ''}
                type="button"
                key={project.title}
                style={projectStyle(project)}
                onClick={() => setActiveIndex(index)}
                role="tab"
                aria-selected={index === activeIndex}
              >
                <span>{project.shortTitle}</span>
                <small>{project.domain}</small>
              </button>
            ))}
          </div>
        </section>

        <section className="proof-band" id="proof">
          <div>
            <p className="eyebrow">Proof points</p>
            <h2>Numbers from shipped demos, local READMEs, and production-ish experiments.</h2>
          </div>
          <div className="proof-grid">
            {proofPoints.map(([value, label]) => (
              <div className="proof-card" key={value}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>{profile.name}</span>
        <a href={profile.github} target="_blank" rel="noreferrer">
          github.com/{profile.handle}
        </a>
      </footer>
    </div>
  )
}

export default function App() {
  const normalizedPath = window.location.pathname.replace(/\/+$/, '')

  if (normalizedPath === '/v1') {
    return <LegacyPortfolio />
  }

  return <BookChapters />
}
