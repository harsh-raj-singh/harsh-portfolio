import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { ArrowUpRight, GitBranch } from 'lucide-react'
import './App.css'
import { LegacyPortfolio } from './LegacyPortfolio'
import { profile, projects, type Project } from './projects'

type ProjectTheme = {
  a: string
  b: string
  c: string
  glow: string
  muted: string
}

const projectThemes: ProjectTheme[] = [
  { a: '#090b25', b: '#111a4f', c: '#ff5a1f', glow: 'rgba(255, 90, 31, 0.34)', muted: '#b8c0ff' },
  { a: '#031514', b: '#062b2b', c: '#0bb7ff', glow: 'rgba(11, 183, 255, 0.28)', muted: '#9de7ee' },
  { a: '#071b13', b: '#102f24', c: '#38c172', glow: 'rgba(56, 193, 114, 0.28)', muted: '#b9f6d0' },
  { a: '#08112e', b: '#162a68', c: '#5e7cff', glow: 'rgba(33, 85, 255, 0.34)', muted: '#c2ceff' },
  { a: '#171406', b: '#3b310d', c: '#f2c94c', glow: 'rgba(242, 201, 76, 0.28)', muted: '#f5e5a9' },
  { a: '#1b0711', b: '#461528', c: '#e94b7a', glow: 'rgba(233, 75, 122, 0.3)', muted: '#ffc0d2' },
  { a: '#0a0a0d', b: '#23202b', c: '#d3d3d3', glow: 'rgba(255, 255, 255, 0.16)', muted: '#b8b8c7' },
  { a: '#12091f', b: '#2a164b', c: '#a978ff', glow: 'rgba(124, 58, 237, 0.34)', muted: '#d8c4ff' },
]

function themeStyle(theme: ProjectTheme): CSSProperties {
  return {
    '--bg-a': theme.a,
    '--bg-b': theme.b,
    '--section-accent': theme.c,
    '--section-glow': theme.glow,
    '--section-muted': theme.muted,
  } as CSSProperties
}

function descriptor(project: Project) {
  return project.summary.split(/\s+/).slice(0, 10).join(' ').replace(/[.,;:]$/, '')
}

function ProjectActions({ project }: { project: Project }) {
  return (
    <div className="immersive-actions" aria-label={`${project.title} links`}>
      {project.live ? (
        <a href={project.live} target="_blank" rel="noreferrer">
          <ArrowUpRight size={17} aria-hidden="true" />
          Live
        </a>
      ) : null}

      {project.repo ? (
        <a href={project.repo} target="_blank" rel="noreferrer">
          <GitBranch size={17} aria-hidden="true" />
          GitHub
        </a>
      ) : null}
    </div>
  )
}

function ImmersivePortfolio() {
  const sectionRefs = useRef<Array<HTMLElement | null>>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [visibleSections, setVisibleSections] = useState<Set<number>>(() => new Set([0]))

  const sections = useMemo(
    () => [
      {
        id: 'hero',
        label: 'Hero',
      },
      ...projects.map((project) => ({
        id: project.shortTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        label: project.title,
      })),
    ],
    [],
  )

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const indexValue = entry.target.getAttribute('data-section-index')
          if (!indexValue) return

          const index = Number(indexValue)
          if (entry.isIntersecting) {
            setActiveIndex(index)
            setVisibleSections((current) => {
              if (current.has(index)) return current
              const next = new Set(current)
              next.add(index)
              return next
            })
          }
        })
      },
      { threshold: 0.4 },
    )

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="immersive-shell">
      <main className="snap-container" aria-label="Immersive portfolio sections">
        <section
          ref={(node) => {
            sectionRefs.current[0] = node
          }}
          className={`snap-section hero-section ${visibleSections.has(0) ? 'is-visible' : ''}`}
          data-section-index="0"
          id="hero"
        >
          <div className="hero-breath" aria-hidden="true" />
          <div className="section-grain" aria-hidden="true" />
          <div className="section-content hero-content">
            <p className="section-label">{profile.bio}</p>
            <h1>{profile.name}</h1>
            <p className="section-descriptor">
              AI infrastructure, speech systems, recommender loops, and model internals.
            </p>
          </div>
        </section>

        {projects.map((project, index) => {
          const sectionIndex = index + 1
          const theme = projectThemes[index % projectThemes.length]

          return (
            <section
              ref={(node) => {
                sectionRefs.current[sectionIndex] = node
              }}
              className={`snap-section project-section ${visibleSections.has(sectionIndex) ? 'is-visible' : ''}`}
              data-section-index={sectionIndex}
              id={sections[sectionIndex].id}
              key={project.title}
              style={themeStyle(theme)}
            >
              <div className="section-atmosphere" aria-hidden="true" />
              <div className="section-grain" aria-hidden="true" />
              <div className="section-content project-content">
                <p className="section-label">
                  {project.domain} / {project.year}
                </p>
                <h2>{project.title}</h2>
                <p className="section-descriptor">{descriptor(project)}</p>
                <ProjectActions project={project} />
              </div>
            </section>
          )
        })}
      </main>

      <nav className="dot-nav" aria-label="Section navigation">
        {sections.map((section, index) => (
          <button
            aria-label={`Go to ${section.label}`}
            aria-current={activeIndex === index ? 'true' : undefined}
            className={activeIndex === index ? 'is-active' : ''}
            key={section.id}
            onClick={() => scrollToSection(index)}
            type="button"
          />
        ))}
      </nav>
    </div>
  )
}

export default function App() {
  const normalizedPath = window.location.pathname.replace(/\/+$/, '')

  if (normalizedPath === '/v1') {
    return <LegacyPortfolio />
  }

  return <ImmersivePortfolio />
}
