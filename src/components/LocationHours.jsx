import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import useVendors from '../hooks/useVendors'

export default function LocationHours() {
  const containerRef = useRef(null)
  const leftRef      = useRef(null)
  const rightRef     = useRef(null)

  const { fishFryInfo } = useVendors()

  useGSAP(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo(leftRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
            refreshPriority: -1,
          }
        }
      )

      gsap.fromTo(rightRef.current,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
            refreshPriority: -1,
          }
        }
      )

    }, containerRef)

    return () => ctx.revert()

  }, { scope: containerRef })

  if (!fishFryInfo) return null

  const hours = [
    { day: 'Monday — Thursday', time: fishFryInfo.hours.weekdays },
    { day: 'Friday',            time: fishFryInfo.hours.friday   },
    { day: 'Saturday',          time: fishFryInfo.hours.saturday },
    { day: 'Sunday',            time: fishFryInfo.hours.sunday   },
  ]

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-night-800 py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-8">

        <p className="font-body text-sm tracking-widest uppercase mb-12 accent-text">
          Find Us
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">

          {/* Left — Location */}
          <div ref={leftRef}>
            <h2 className="font-display text-white text-4xl md:text-6xl tracking-wider mb-8 leading-none">
              ARAWAK CAY
            </h2>

            <div className="mb-10">
              <p className="font-body text-white/25 text-xs tracking-widest uppercase mb-3">
                Address
              </p>
              <p className="font-body text-white/70 text-base leading-relaxed">
                {fishFryInfo.location.address}
              </p>
              <p className="font-body text-white/70 text-base">
                {fishFryInfo.location.city}, {fishFryInfo.location.island}
              </p>
              <p className="font-body text-white/40 text-sm mt-1">
                {fishFryInfo.location.country}
              </p>
            </div>

            <div className="mb-10">
              <p className="font-body text-white/25 text-xs tracking-widest uppercase mb-3">
                Getting There
              </p>
              <p className="font-body text-white/40 text-sm leading-relaxed">
                Located along West Bay Street on the western waterfront
                of Nassau. Easily accessible by taxi, bus, or on foot
                from Cable Beach and downtown Nassau.
              </p>
            </div>

            {/* Map Placeholder */}
            <div className="relative w-full h-48 bg-night-700 rounded-2xl overflow-hidden border border-white/5">
              <div className="absolute inset-0 bg-gradient-to-br from-night-700 to-night-900" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div
                  className="w-8 h-8 rounded-full border-2 flex items-center justify-center"
                  style={{ borderColor: 'var(--accent-border)' }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: 'var(--accent)' }}
                  />
                </div>
                <p className="font-body text-white/25 text-xs tracking-widest uppercase">
                  Arawak Cay, Nassau
                </p>
                
                 <a href={`https://maps.google.com/?q=${fishFryInfo.location.coordinates.lat},${fishFryInfo.location.coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-xs tracking-widest uppercase px-4 py-2 rounded-full border transition-colors duration-200 accent-text"
                  style={{ borderColor: 'var(--accent-border)' }}
                >
                  Open in Maps
                </a>
              </div>
            </div>

          </div>

          {/* Right — Hours */}
          <div ref={rightRef}>
            <h2 className="font-display text-white text-4xl md:text-6xl tracking-wider mb-8 leading-none">
              HOURS
            </h2>

            <div className="flex flex-col gap-0 mb-10">
              {hours.map((row, index) => (
                <div
                  key={row.day}
                  className={`flex items-center justify-between py-4 ${
                    index !== hours.length - 1 ? 'border-b border-white/5' : ''
                  }`}
                >
                  <span className="font-body text-white/50 text-sm">
                    {row.day}
                  </span>
                  <span
                    className="font-body text-sm font-medium"
                    style={{
                      color: row.day === 'Friday' || row.day === 'Saturday'
                        ? 'var(--accent)'
                        : 'rgba(255,255,255,0.70)'
                    }}
                  >
                    {row.time}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-night-700/50 border border-white/5 rounded-2xl p-6 mb-10">
              <p className="font-body text-white/25 text-xs tracking-widest uppercase mb-2">
                Good to Know
              </p>
              <p className="font-body text-white/40 text-sm leading-relaxed">
                Friday and Saturday nights are the most vibrant times
                to visit. Expect larger crowds, live music, and the
                full energy of the Fish Fry experience. Individual
                vendor hours may vary.
              </p>
            </div>

            <div
              className="border-l-2 pl-6"
              style={{ borderColor: 'var(--accent-border)' }}
            >
              <p className="font-body text-white/25 text-xs tracking-widest uppercase mb-2">
                Note
              </p>
              <p className="font-body text-white/40 text-sm leading-relaxed">
                Hours and wait times shown in this application reflect
                general operating hours. Live status is updated in
                real time by each vendor.
              </p>
            </div>

          </div>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

    </section>
  )
}