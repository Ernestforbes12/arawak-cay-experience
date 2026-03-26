import { useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { motion } from 'framer-motion'
import useVendors from '../hooks/useVendors'
import MenuCard from '../components/MenuCard'

export default function Vendor() {
  const { id }       = useParams()
  const navigate     = useNavigate()
  const containerRef = useRef(null)
  const headerRef    = useRef(null)
  const contentRef   = useRef(null)

  const { getVendorById, loading } = useVendors()
  const vendor = getVendorById(id)

  useGSAP(() => {
    if (!vendor) return

    const tl = gsap.timeline({ delay: 0.1 })

    tl.fromTo(headerRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    )
    .fromTo(contentRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      '-=0.4'
    )

  }, { scope: containerRef, dependencies: [vendor] })

  if (loading) {
    return (
      <div className="min-h-screen bg-night-900 flex items-center justify-center">
        <p className="font-body text-white/40 text-sm tracking-widest uppercase">
          Loading...
        </p>
      </div>
    )
  }

  if (!vendor) {
    return (
      <div className="min-h-screen bg-night-900 flex flex-col items-center justify-center gap-6">
        <p className="font-display text-white/20 text-5xl tracking-wider">
          VENDOR NOT FOUND
        </p>
        <button
          onClick={() => navigate('/')}
          className="font-body text-sm text-bimini-400 tracking-widest uppercase border border-bimini-500/30 px-6 py-3 rounded-full hover:bg-bimini-500/10 transition-colors duration-200"
        >
          Back to Home
        </button>
      </div>
    )
  }

  const isOpen    = vendor.status === 'open'
  const mainItems = vendor.menu.filter(item => item.category === 'mains')
  const otherItems = vendor.menu.filter(item => item.category !== 'mains')

  return (
    <div ref={containerRef} className="min-h-screen bg-night-900">

      {/* Cinematic Header */}
      <div
        ref={headerRef}
        style={{ opacity: 0 }}
        className="relative w-full h-72 md:h-96 bg-night-800 overflow-hidden"
      >
        {/* Background texture */}
        <div className="absolute inset-0 bg-gradient-to-br from-night-700 via-night-800 to-night-900" />
        <div className="absolute inset-0 bg-gradient-to-t from-night-900 via-transparent to-transparent" />

        {/* Header Content */}
        <div className="relative h-full max-w-7xl mx-auto px-6 md:px-8 flex flex-col justify-end pb-10">

          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-24 left-6 md:left-8 flex items-center gap-2 font-body text-xs text-white/40 tracking-widest uppercase hover:text-white/70 transition-colors duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </button>

          {/* Status */}
          <div className="flex items-center gap-4 mb-4">
            <span className={`inline-flex items-center gap-1.5 text-xs font-body tracking-wider uppercase px-3 py-1 rounded-full border ${
              isOpen
                ? 'bg-bimini-500/15 text-bimini-400 border-bimini-500/30'
                : 'bg-white/5 text-white/30 border-white/10'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-bimini-400' : 'bg-white/30'}`} />
              {isOpen ? 'Open Now' : 'Closed'}
            </span>
            {isOpen && (
              <span className="font-body text-xs text-white/30 tracking-wider">
                {vendor.waitTime} min wait
              </span>
            )}
          </div>

          {/* Vendor Name */}
          <h1 className="font-display text-white text-5xl md:text-7xl tracking-wider leading-none mb-2">
            {vendor.name.toUpperCase()}
          </h1>

          {/* Tagline */}
          <p className="font-accent text-white/50 text-base italic">
            {vendor.tagline}
          </p>

        </div>
      </div>

      {/* Main Content */}
      <div
        ref={contentRef}
        style={{ opacity: 0 }}
        className="max-w-7xl mx-auto px-6 md:px-8 py-16"
      >

        {/* Vendor Info Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 pb-16 border-b border-white/5">

          {/* Description */}
          <div className="md:col-span-2">
            <p className="font-body text-white/30 text-xs tracking-widest uppercase mb-3">
              About
            </p>
            <p className="font-body text-white/60 text-base leading-relaxed">
              {vendor.description}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="font-body text-white/30 text-xs tracking-widest uppercase mb-1">
                Specialty
              </p>
              <p className="font-body text-bimini-400 text-sm font-medium">
                {vendor.specialty}
              </p>
            </div>
            <div>
              <p className="font-body text-white/30 text-xs tracking-widest uppercase mb-1">
                Rating
              </p>
              <p className="font-display text-sunset-500 text-3xl tracking-wider">
                {vendor.rating}
                <span className="font-body text-white/20 text-sm ml-1">/ 5.0</span>
              </p>
            </div>
            <div>
              <p className="font-body text-white/30 text-xs tracking-widest uppercase mb-1">
                Established
              </p>
              <p className="font-body text-white/50 text-sm">
                Since {vendor.established}
              </p>
            </div>
          </div>

        </div>

        {/* Mains Section */}
        {mainItems.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <p className="font-body text-white/30 text-xs tracking-widest uppercase">
                Mains
              </p>
              <div className="flex-1 h-px bg-white/5" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mainItems.map(item => (
                <MenuCard
                  key={item.id}
                  item={item}
                  vendor={vendor}
                />
              ))}
            </div>
          </div>
        )}

        {/* Everything Else */}
        {otherItems.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <p className="font-body text-white/30 text-xs tracking-widest uppercase">
                Also on the menu
              </p>
              <div className="flex-1 h-px bg-white/5" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherItems.map(item => (
                <MenuCard
                  key={item.id}
                  item={item}
                  vendor={vendor}
                />
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-white/5 gap-6">
          <div>
            <p className="font-body text-white/30 text-xs tracking-widest uppercase mb-1">
              Find us at
            </p>
            <p className="font-body text-white/60 text-sm">
              Arawak Cay, West Bay Street, Nassau
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/')}
            className="font-body text-xs tracking-widest uppercase px-8 py-4 rounded-full border border-bimini-500/30 text-bimini-400 hover:bg-bimini-500/10 transition-colors duration-200"
          >
            Explore The Strip
          </motion.button>
        </div>

      </div>
    </div>
  )
}