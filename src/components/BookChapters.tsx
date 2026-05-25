import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { flushSync } from 'react-dom'
import gsap from 'gsap'
import { profile, projects, type Project } from '../projects'

type Chapter = {
  id: number
  label: string
  color: string
  accentColor: string
  title: string
  category: string
  description: string
  href: string
  linkLabel: string
}

const chapterSkins = [
  { label: 'ORANGE', color: '#1a0a2e', accentColor: '#b06dff' },
  { label: 'VOICE', color: '#0d1f0d', accentColor: '#4dff91' },
  { label: 'SAARTHI', color: '#071b1d', accentColor: '#59f0d5' },
  { label: 'NEXT READ', color: '#061329', accentColor: '#6ba8ff' },
  { label: 'MATIKS', color: '#1f1500', accentColor: '#ffbd48' },
  { label: 'POCKET TTS', color: '#210713', accentColor: '#ff6f9f' },
  { label: 'CMOE', color: '#101014', accentColor: '#e5e5e5' },
  { label: 'LORA', color: '#160a26', accentColor: '#b987ff' },
]

const css = `
#stage {
  position: fixed;
  inset: 0;
  overflow: hidden;
  background: #0a0a0a;
  color: #f9f6ee;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  isolation: isolate;
}

#backdrop,
#noise,
#curtain,
.chapter {
  position: absolute;
  inset: 0;
}

#backdrop {
  z-index: 0;
  background: #0a0a0a;
}

#backdrop::before,
.chapter::before {
  position: absolute;
  inset: -18%;
  content: "";
  background:
    radial-gradient(circle at 18% 20%, color-mix(in srgb, var(--accent-color) 26%, transparent), transparent 27rem),
    radial-gradient(circle at 78% 80%, rgba(255, 255, 255, 0.08), transparent 32rem);
  filter: blur(10px);
}

#noise {
  z-index: 4;
  pointer-events: none;
  opacity: 0.04;
  mix-blend-mode: screen;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 320 320' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='320' height='320' filter='url(%23noise)' opacity='.85'/%3E%3C/svg%3E");
  background-size: 210px 210px;
}

.chapter {
  --chapter-color: #0a0a0a;
  --accent-color: #ffffff;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: clamp(1.25rem, 3vw, 3rem);
  pointer-events: none;
  visibility: hidden;
  opacity: 0;
  background:
    linear-gradient(115deg, rgba(0, 0, 0, 0.18), transparent 42%),
    radial-gradient(circle at 70% 32%, color-mix(in srgb, var(--accent-color) 17%, transparent), transparent 25rem);
}

.chapter.is-active {
  pointer-events: auto;
  visibility: visible;
  opacity: 1;
}

.chapter-number {
  position: absolute;
  top: clamp(1.25rem, 3vw, 3rem);
  left: clamp(1.25rem, 3vw, 3rem);
  z-index: 2;
  color: color-mix(in srgb, var(--accent-color) 40%, transparent);
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
  font-size: 0.8rem;
  letter-spacing: 0.08em;
}

.chapter-inner {
  position: relative;
  z-index: 2;
  width: min(88rem, 100%);
  padding-bottom: clamp(3.2rem, 7vh, 5.8rem);
}

.chapter-kicker {
  margin: 0 0 1rem;
  color: color-mix(in srgb, var(--accent-color) 64%, white 8%);
  font-size: 0.76rem;
  font-weight: 780;
  letter-spacing: 0.3em;
  line-height: 1.45;
  text-transform: uppercase;
}

.chapter-title {
  display: flex;
  flex-wrap: wrap;
  gap: 0 0.22em;
  max-width: 11ch;
  margin: 0;
  color: #fffaf0;
  font-size: clamp(4.2rem, 11.5vw, 13.5rem);
  font-weight: 950;
  letter-spacing: 0;
  line-height: 0.82;
}

.title-word {
  display: inline-block;
  will-change: transform, opacity;
}

.chapter-desc {
  max-width: 38rem;
  margin: 1.2rem 0 0;
  color: rgba(255, 250, 240, 0.6);
  font-size: 1rem;
  font-weight: 620;
  line-height: 1.45;
  will-change: transform, opacity;
}

.chapter-link {
  position: absolute;
  right: clamp(1.25rem, 3vw, 3rem);
  bottom: clamp(4.6rem, 8vh, 6rem);
  z-index: 25;
  color: rgba(255, 250, 240, 0.82);
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
  font-size: 0.86rem;
  text-decoration: underline;
  text-decoration-color: color-mix(in srgb, var(--accent-color) 55%, transparent);
  text-underline-offset: 0.38rem;
  transition:
    color 180ms ease,
    text-decoration-color 180ms ease;
}

.chapter-link:hover {
  color: var(--accent-color);
  text-decoration-color: var(--accent-color);
}

#curtain {
  z-index: 50;
  transform: scaleX(0);
  transform-origin: right center;
  pointer-events: none;
  background: #0a0a0a;
  box-shadow:
    inset -5rem 0 6rem rgba(255, 255, 255, 0.12),
    inset 2rem 0 2.5rem rgba(0, 0, 0, 0.36);
  will-change: transform;
}

#curtain::before {
  position: absolute;
  inset: 0;
  content: "";
  background:
    linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.18) 46%, rgba(0, 0, 0, 0.38) 50%, transparent 56%),
    repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.08) 0 1px, transparent 1px 18px);
  opacity: 0.38;
}

#chapter-nav {
  position: absolute;
  right: clamp(1.25rem, 3vw, 3rem);
  bottom: clamp(1.25rem, 3vw, 3rem);
  z-index: 70;
  display: flex;
  align-items: center;
  gap: 0.85rem;
  color: rgba(255, 250, 240, 0.92);
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
  font-size: 0.82rem;
}

#chapter-nav button {
  display: grid;
  width: 1.9rem;
  height: 1.9rem;
  place-items: center;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  color: #fffaf0;
  line-height: 1;
  transition:
    border-color 180ms ease,
    color 180ms ease,
    opacity 180ms ease;
}

#chapter-nav button:not(:disabled):hover {
  border-color: currentColor;
  color: var(--active-accent, #ffffff);
}

#chapter-nav button:disabled {
  opacity: 0.2;
  cursor: default;
}

@media (max-width: 720px) {
  .chapter {
    padding: 1rem;
  }

  .chapter-number {
    top: 1rem;
    left: 1rem;
  }

  .chapter-inner {
    padding-bottom: 6.6rem;
  }

  .chapter-title {
    max-width: 8.5ch;
    font-size: clamp(3.4rem, 18vw, 5.4rem);
  }

  .chapter-link {
    right: 1rem;
    bottom: 5rem;
  }

  #chapter-nav {
    right: 1rem;
    bottom: 1rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  #curtain,
  .title-word,
  .chapter-desc {
    transition: none;
    animation: none;
  }
}
`

function shortDescription(project: Project) {
  return project.summary.split(/\s+/).slice(0, 10).join(' ').replace(/[.,;:]$/, '')
}

function words(title: string) {
  return title.split(/\s+/).filter(Boolean)
}

function buildChapters(): Chapter[] {
  return [
    {
      id: 0,
      label: 'INTRO',
      color: '#0a0a0a',
      accentColor: '#ffffff',
      title: profile.name,
      category: profile.bio,
      description: 'AI infrastructure, speech systems, recommender loops, model internals.',
      href: profile.github,
      linkLabel: 'GitHub',
    },
    ...projects.map((project, index) => {
      const skin = chapterSkins[index] ?? chapterSkins[chapterSkins.length - 1]
      return {
        id: index + 1,
        label: skin.label,
        color: skin.color,
        accentColor: skin.accentColor,
        title: project.title,
        category: project.domain,
        description: shortDescription(project),
        href: project.live ?? project.repo ?? profile.github,
        linkLabel: project.live ? 'View live' : project.repo ? 'View repo' : 'View',
      }
    }),
  ]
}

export function BookChapters() {
  const chapters = useMemo(() => buildChapters(), [])
  const currentIndex = useRef(0)
  const isAnimating = useRef(false)
  const lastTransitionAt = useRef(0)
  const [visibleIndex, setVisibleIndex] = useState(0)
  const backdropRef = useRef<HTMLDivElement | null>(null)
  const curtainRef = useRef<HTMLDivElement | null>(null)

  const resetChapterTextPositions = useCallback((index: number) => {
    gsap.set(`#chapter-${index} .title-word`, { y: 60, opacity: 0 })
    gsap.set(`#chapter-${index} .chapter-desc`, { y: 20, opacity: 0 })
  }, [])

  const animateChapterIn = useCallback((index: number) => {
    gsap.fromTo(
      `#chapter-${index} .title-word`,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power2.out' },
    )
    gsap.fromTo(
      `#chapter-${index} .chapter-desc`,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, delay: 0.3, ease: 'power2.out' },
    )
  }, [])

  const updateVisibleChapter = useCallback((nextIndex: number) => {
    flushSync(() => setVisibleIndex(nextIndex))
  }, [])

  const advance = useCallback((direction: 1 | -1) => {
    if (isAnimating.current) return

    const nextIndex = Math.min(Math.max(currentIndex.current + direction, 0), chapters.length - 1)
    if (nextIndex === currentIndex.current) return

    isAnimating.current = true
    lastTransitionAt.current = Date.now()

    const nextChapter = chapters[nextIndex]
    const curtain = curtainRef.current
    const backdrop = backdropRef.current
    if (!curtain || !backdrop) {
      isAnimating.current = false
      return
    }

    gsap.set(curtain, {
      backgroundColor: nextChapter.color,
      scaleX: 0,
      transformOrigin: 'right center',
    })

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false
      },
    })

    tl.fromTo(
      '#curtain',
      { scaleX: 0, transformOrigin: 'right center' },
      { scaleX: 1, duration: 0.55, ease: 'power3.inOut' },
    )

    tl.add(() => {
      currentIndex.current = nextIndex
      gsap.set('#backdrop', { backgroundColor: chapters[nextIndex].color })
      updateVisibleChapter(nextIndex)
      resetChapterTextPositions(nextIndex)
    }, '-=0.05')

    tl.to('#curtain', {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 0.55,
      ease: 'power3.inOut',
    })

    tl.add(() => animateChapterIn(nextIndex), '-=0.3')
  }, [animateChapterIn, chapters, resetChapterTextPositions, updateVisibleChapter])

  useEffect(() => {
    gsap.set('#backdrop', { backgroundColor: chapters[0].color })
    gsap.set('#curtain', { scaleX: 0, transformOrigin: 'right center' })
    resetChapterTextPositions(0)
    animateChapterIn(0)

    const onWheel = (event: WheelEvent) => {
      if (Date.now() - lastTransitionAt.current < 1200) return
      if (event.deltaY > 30) advance(1)
      if (event.deltaY < -30) advance(-1)
    }

    const onKeydown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') advance(1)
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') advance(-1)
    }

    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('keydown', onKeydown)

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKeydown)
      gsap.killTweensOf('#curtain')
      gsap.killTweensOf('.title-word')
      gsap.killTweensOf('.chapter-desc')
    }
  }, [advance, animateChapterIn, chapters, resetChapterTextPositions])

  const activeChapter = chapters[visibleIndex]

  return (
    <>
      <style>{css}</style>
      <div
        id="stage"
        style={{ '--active-accent': activeChapter.accentColor } as CSSProperties}
      >
        <div id="backdrop" ref={backdropRef} />
        <div id="noise" />

        {chapters.map((chapter, index) => (
          <section
            aria-hidden={visibleIndex !== index}
            className={`chapter ${visibleIndex === index ? 'is-active' : ''}`}
            data-chapter-label={chapter.label}
            id={`chapter-${index}`}
            key={chapter.id}
            style={
              {
                '--chapter-color': chapter.color,
                '--accent-color': chapter.accentColor,
              } as CSSProperties
            }
          >
            <div className="chapter-number">
              {String(index + 1).padStart(2, '0')} / {String(chapters.length).padStart(2, '0')}
            </div>

            <div className="chapter-inner">
              <p className="chapter-kicker">{chapter.category}</p>
              <h1 className="chapter-title" aria-label={chapter.title}>
                {words(chapter.title).map((word, wordIndex) => (
                  <span className="title-word" aria-hidden="true" key={`${word}-${wordIndex}`}>
                    {word}
                  </span>
                ))}
              </h1>
              <p className="chapter-desc">{chapter.description}</p>
            </div>

            <a className="chapter-link" href={chapter.href} target="_blank" rel="noreferrer">
              {chapter.linkLabel} →
            </a>
          </section>
        ))}

        <div id="curtain" ref={curtainRef} />

        <div id="chapter-nav" aria-label="Chapter navigation">
          <button
            aria-label="Previous chapter"
            disabled={visibleIndex === 0}
            onClick={() => advance(-1)}
            type="button"
          >
            ←
          </button>
          <span>
            {String(visibleIndex + 1).padStart(2, '0')} / {String(chapters.length).padStart(2, '0')}
          </span>
          <button
            aria-label="Next chapter"
            disabled={visibleIndex === chapters.length - 1}
            onClick={() => advance(1)}
            type="button"
          >
            →
          </button>
        </div>
      </div>
    </>
  )
}
