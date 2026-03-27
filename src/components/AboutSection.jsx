import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import useVendors from '../hooks/useVendors'

export default function AboutSection() {
  const containerRef = useRef(null)
  const headlineRef  = useRef(null)
  const bodyRef      = useRef(null)
  const statsRef     = useRef([])
  const accentRef    = useRef(null)

  const { fishFryInfo } = useVendors()

  useGSAP(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo(accentRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: accentRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
            refreshPriority: -1,
          }
        }
      )

      gsap.fromTo(headlineRef.current,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
            refreshPriority: -1,
          }
        }
      )

      gsap.fromTo(bodyRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: bodyRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
            refreshPriority: -1,
          }
        }
      )

      gsap.fromTo(statsRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: statsRef.current[0],
            start: 'top 85%',
            toggleActions: 'play none none reverse',
            refreshPriority: -1,
          }
        }
      )

    }, containerRef)

    return () => ctx.revert()

  }, { scope: containerRef })

  const stats = [
    { value: '1980s', label: 'Est. on the waterfront' },
    { value: '20+',   label: 'Shacks on the strip'    },
    { value: '40yrs', label: 'Of Bahamian tradition'  },
    { value: '24/7',  label: 'Friday nights'          },
  ]

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-night-900 py-24 md:py-32 overflow-hidden"
    >
      {/* Decorative background text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none"
        aria-hidden="true"
      >
        <span style={{
          opacity: 0.018,
          fontSize: '20vw',
          fontFamily: "'Bebas Neue', sans-serif",
          letterSpacing: '0.1em',
          color: 'white',
          whiteSpace: 'nowrap'
        }}>
          NASSAU
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-8">

        {/* Accent line */}
        <div
          ref={accentRef}
          className="w-16 h-px mb-8 accent-line"
          style={{ transformOrigin: 'left center' }}
        />

        {/* Section Label */}
        <p className="font-body text-sm tracking-widest uppercase mb-6 accent-text">
          Our Story
        </p>

        {/* Headline */}
        <div ref={headlineRef}>
          <h2 className="font-display text-white text-5xl md:text-7xl lg:text-8xl tracking-wider leading-none mb-4">
            THE SOUL OF
          </h2>
          <h2 className="font-display text-sunset-500 text-5xl md:text-7xl lg:text-8xl tracking-wider leading-none mb-12">
            NASSAU.
          </h2>
        </div>

        {/* Two Column Layout */}
        <div
          ref={bodyRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-20"
        >
          <div>
            <p className="font-accent text-white/80 text-lg md:text-xl leading-relaxed italic mb-6">
              "{fishFryInfo?.description}"
            </p>
            <p className="font-body text-white/40 text-sm leading-relaxed">
              What began as a handful of wooden shacks serving fresh catch
              to local fishermen has grown into Nassau's most beloved
              culinary institution. Every Friday and Saturday night, the
              strip comes alive with the smell of frying fish, the sound
              of rake and scrape, and the spirit of people deeply proud
              of their food and their culture.
            </p>
          </div>

          <div className="flex flex-col justify-between">
            <p className="font-body text-white/40 text-sm leading-relaxed mb-8">
              Arawak Cay is more than a place to eat. It is a living
              record of Bahamian identity — where grandmothers pass
              recipes to granddaughters, where the conch salad is made
              fresh in front of you, and where the only reservation you
              need is an appetite.
            </p>

            <div className="border-l-2 pl-6" style={{ borderColor: 'var(--accent-border)' }}>
              <p className="font-body text-white/25 text-xs tracking-widest uppercase mb-2">
                Location
              </p>
              <p className="font-body text-white/60 text-sm mb-1">
                {fishFryInfo?.location.address}
              </p>
              <p className="font-body text-white/40 text-sm">
                {fishFryInfo?.location.city}, {fishFryInfo?.location.island}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 pb-8 border-t border-white/5">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              ref={el => statsRef.current[index] = el}
              className="flex flex-col gap-2"
            >
              <span className="font-display text-4xl md:text-5xl tracking-wider accent-text">
                {stat.value}
              </span>
              <span className="font-body text-white/30 text-xs tracking-widest uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}