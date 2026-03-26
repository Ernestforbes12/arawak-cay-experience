import { motion } from 'framer-motion'

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

        {/* Food photography */}
        <img
          src={`/images/menu/${item.image}`}
          alt={item.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.style.display = 'none'
          }}
        />

        {/* Gradient overlay so badges and price stay readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-night-900/80 via-night-900/20 to-transparent" />

        {/* Category label */}
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

        {/* Price */}
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
            <span className={`w-1.5 h-1.5 rounded-full ${
              vendor.status === 'open' ? 'bg-bimini-400' : 'bg-white/20'
            }`} />
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