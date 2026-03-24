import { motion } from 'framer-motion'

// This is one of the few places we use Framer Motion.
// These are simple card entrance animations — not scroll-driven,
// not sequenced. Framer Motion handles this case cleanly
// without needing a GSAP timeline.
export default function MenuCard({ item, vendor }) {
  const isPopular = item.popular

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-night-800 border border-white/5 rounded-2xl overflow-hidden group hover:border-bimini-500/30 transition-colors duration-300"
    >
      {/* Image Area */}
      <div className="relative h-48 bg-night-700 overflow-hidden">

        {/* Placeholder gradient when no image is available */}
        <div className="absolute inset-0 bg-gradient-to-br from-night-700 to-night-900" />

        {/* Category label sits over the image */}
        <div className="absolute top-4 left-4">
          <span className="font-body text-xs tracking-widest uppercase px-3 py-1 rounded-full bg-night-900/80 text-white/50 border border-white/10">
            {item.category}
          </span>
        </div>

        {/* Popular badge */}
        {isPopular && (
          <div className="absolute top-4 right-4">
            <span className="font-body text-xs tracking-wider uppercase px-3 py-1 rounded-full bg-sunset-500/20 text-sunset-300 border border-sunset-500/30">
              Popular
            </span>
          </div>
        )}

        {/* Price sits at the bottom of the image area */}
        <div className="absolute bottom-4 right-4">
          <span className="font-display text-2xl text-white tracking-wider">
            ${item.price.toFixed(2)}
          </span>
        </div>

      </div>

      {/* Card Body */}
      <div className="p-5">

        {/* Item Name */}
        <h3 className="font-display text-white text-xl tracking-wider mb-2 group-hover:text-sunset-500 transition-colors duration-300">
          {item.name.toUpperCase()}
        </h3>

        {/* Description */}
        <p className="font-body text-white/40 text-sm leading-relaxed mb-4">
          {item.description}
        </p>

        {/* Vendor Attribution */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${vendor.status === 'open' ? 'bg-bimini-400' : 'bg-white/20'}`} />
            <span className="font-body text-xs text-white/30 tracking-wider">
              {vendor.name}
            </span>
          </div>
          {vendor.status === 'open' && (
            <span className="font-body text-xs text-white/25">
              {vendor.waitTime} min wait
            </span>
          )}
        </div>

      </div>
    </motion.div>
  )
}