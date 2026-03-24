import { useState, useMemo } from 'react'
import useVendors from '../hooks/useVendors'
import MenuCard from '../components/MenuCard'

// All possible categories that exist across the entire menu.
const CATEGORIES = ['all', 'mains', 'starters', 'sides', 'drinks']

export default function Menu() {
  const { vendors, loading } = useVendors()
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeVendor, setActiveVendor]     = useState('all')

  // useMemo means this computation only re-runs when its
  // dependencies change. We are not re-filtering on every
  // render — only when the user changes a filter.
  const filteredItems = useMemo(() => {
    const items = []

    vendors.forEach(vendor => {
      // Skip this vendor if a specific vendor filter is active
      if (activeVendor !== 'all' && vendor.id !== activeVendor) return

      vendor.menu.forEach(item => {
        // Skip this item if a category filter is active
        if (activeCategory !== 'all' && item.category !== activeCategory) return

        // Push both the item and its vendor so the card
        // has access to vendor status and wait time
        items.push({ item, vendor })
      })
    })

    return items
  }, [vendors, activeCategory, activeVendor])

  if (loading) {
    return (
      <div className="min-h-screen bg-night-900 flex items-center justify-center">
        <p className="font-body text-white/40 text-sm tracking-widest uppercase">
          Loading menu...
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-night-900 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 md:px-8">

        {/* Page Header */}
        <div className="mb-12">
          <p className="font-body text-bimini-500 text-sm tracking-widest uppercase mb-3">
            Full Menu
          </p>
          <h1 className="font-display text-white text-6xl md:text-8xl tracking-wider mb-4">
            THE MENU
          </h1>
          <p className="font-body text-white/40 text-sm max-w-lg leading-relaxed">
            Every dish across every shack on the strip. Filter by category
            or by vendor to find exactly what you are looking for.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 pb-8 border-b border-white/5">

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`font-body text-xs tracking-widest uppercase px-4 py-2 rounded-full border transition-all duration-200 ${
                  activeCategory === category
                    ? 'bg-sunset-500 border-sunset-500 text-white'
                    : 'bg-transparent border-white/10 text-white/40 hover:border-white/30 hover:text-white/70'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px bg-white/10" />

          {/* Vendor Filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveVendor('all')}
              className={`font-body text-xs tracking-widest uppercase px-4 py-2 rounded-full border transition-all duration-200 ${
                activeVendor === 'all'
                  ? 'bg-bimini-500 border-bimini-500 text-white'
                  : 'bg-transparent border-white/10 text-white/40 hover:border-white/30 hover:text-white/70'
              }`}
            >
              All Vendors
            </button>
            {vendors.map(vendor => (
              <button
                key={vendor.id}
                onClick={() => setActiveVendor(vendor.id)}
                className={`font-body text-xs tracking-widest uppercase px-4 py-2 rounded-full border transition-all duration-200 ${
                  activeVendor === vendor.id
                    ? 'bg-bimini-500 border-bimini-500 text-white'
                    : 'bg-transparent border-white/10 text-white/40 hover:border-white/30 hover:text-white/70'
                }`}
              >
                {vendor.name}
              </button>
            ))}
          </div>

        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="font-body text-white/25 text-xs tracking-widest uppercase">
            {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} found
          </p>
        </div>

        {/* Menu Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map(({ item, vendor }) => (
              <MenuCard
                key={`${vendor.id}-${item.id}`}
                item={item}
                vendor={vendor}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24">
            <p className="font-display text-white/20 text-4xl tracking-wider mb-4">
              NO ITEMS FOUND
            </p>
            <p className="font-body text-white/30 text-sm">
              Try adjusting your filters
            </p>
          </div>
        )}

      </div>
    </div>
  )
}