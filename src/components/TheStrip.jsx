import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useVendors from '../hooks/useVendors'

export default function TheStrip() {
  const containerRef = useRef(null)
  const stripRef     = useRef(null)
  const titleRef     = useRef(null)
  const cardsRef     = useRef([])
  const navigate     = useNavigate()
  const { vendors, loading } = useVendors()

  useGSAP(() => {
    if (loading || vendors.length === 0) return

    // Pin the section and scrub the horizontal scroll
    // as the user scrolls vertically down the page.
    const pinTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: () => `+=${vendors.length * 300}`,
      pin: true,
      anticipatePin: 1,
    })

    // Title animates in when the section enters the viewport.
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      }
    )

    // Each card animates in with a stagger as the user scrolls.
    gsap.fromTo(cardsRef.current,
      { opacity: 0, x: 80, scale: 0.95 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        }
      }
    )

    return () => {
      pinTrigger.kill()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }

  }, { scope: containerRef, dependencies: [loading, vendors] })

  if (loading) return null

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-night-800 overflow-hidden flex flex-col justify-center"
    >
      {/* Section Header */}
      <div ref={titleRef} style={{ opacity: 0 }} className="px-8 md:px-16 pt-16 pb-8">
        <p className="font-body text-bimini-500 text-sm tracking-widest uppercase mb-2">
          The Strip
        </p>
        <h2 className="font-display text-white text-5xl md:text-7xl tracking-wider">
          ARAWAK CAY
        </h2>
        <p className="font-body text-white/50 text-sm mt-2 max-w-md">
          Four shacks. Decades of tradition. One strip of the best
          Bahamian seafood in Nassau.
        </p>
      </div>

      {/* Vendor Cards — horizontal scroll container */}
      <div
        ref={stripRef}
        className="flex gap-6 px-8 md:px-16 pb-16 overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: 'none' }}
      >
        {vendors.map((vendor, index) => (
          <VendorCard
            key={vendor.id}
            vendor={vendor}
            index={index}
            cardRef={el => cardsRef.current[index] = el}
            onClick={() => navigate(`/vendor/${vendor.id}`)}
          />
        ))}
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-night-900 to-transparent pointer-events-none" />
    </section>
  )
}

// Separated into its own component for cleanliness.
// Each card is responsible only for rendering one vendor.
function VendorCard({ vendor, cardRef, onClick }) {
  const isOpen = vendor.status === 'open'

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      style={{ opacity: 0 }}
      className="flex-shrink-0 w-72 bg-night-700 border border-white/5 rounded-2xl overflow-hidden cursor-pointer group hover:border-bimini-500/40 transition-colors duration-300"
    >
      {/* Card Header */}
      <div className="p-6 border-b border-white/5">

        {/* Status Badge */}
        <div className="flex items-center justify-between mb-4">
          <span className={`inline-flex items-center gap-1.5 text-xs font-body tracking-wider uppercase px-3 py-1 rounded-full ${
            isOpen
              ? 'bg-bimini-500/15 text-bimini-400 border border-bimini-500/30'
              : 'bg-white/5 text-white/30 border border-white/10'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-bimini-400' : 'bg-white/30'}`} />
            {isOpen ? 'Open' : 'Closed'}
          </span>

          {isOpen && (
            <span className="font-body text-xs text-white/40">
              {vendor.waitTime} min wait
            </span>
          )}
        </div>

        {/* Vendor Name */}
        <h3 className="font-display text-white text-3xl tracking-wider group-hover:text-sunset-500 transition-colors duration-300">
          {vendor.name.toUpperCase()}
        </h3>
        <p className="font-body text-white/40 text-sm mt-1 italic">
          {vendor.tagline}
        </p>
      </div>

      {/* Card Body */}
      <div className="p-6">

        {/* Specialty */}
        <div className="mb-4">
          <p className="font-body text-white/30 text-xs tracking-widest uppercase mb-1">
            Known for
          </p>
          <p className="font-body text-bimini-400 text-sm font-medium">
            {vendor.specialty}
          </p>
        </div>

        {/* Rating */}
        <div className="mb-6">
          <p className="font-body text-white/30 text-xs tracking-widest uppercase mb-1">
            Rating
          </p>
          <p className="font-body text-white text-sm">
            {vendor.rating} / 5.0
          </p>
        </div>

        {/* Established */}
        <div className="mb-6">
          <p className="font-body text-white/30 text-xs tracking-widest uppercase mb-1">
            Established
          </p>
          <p className="font-body text-white/60 text-sm">
            Since {vendor.established}
          </p>
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <span className="font-body text-xs text-white/30 tracking-wider uppercase">
            View Menu
          </span>
          <span className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-sunset-500/50 group-hover:bg-sunset-500/10 transition-all duration-300">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>

      </div>
    </div>
  )
}