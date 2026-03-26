import { NavLink } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-night-900 border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-8">

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">

          {/* Brand */}
          <div>
            <p className="font-display text-white text-2xl tracking-widest mb-1">
              ARAWAK CAY
            </p>
            <p className="font-body text-white/30 text-xs tracking-wider">
              The Fish Fry — Nassau, Bahamas
            </p>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-wrap gap-6">
            {[
              { path: '/',      label: 'Home'   },
              { path: '/menu',  label: 'Menu'   },
              { path: '/about', label: 'About'  },
            ].map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                className="font-body text-xs text-white/30 tracking-widest uppercase hover:text-white/60 transition-colors duration-200"
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/5 mb-8" />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="font-body text-white/20 text-xs tracking-wider">
            &copy; {currentYear} Arawak Cay Fish Fry Digital Experience.
            All rights reserved.
          </p>
          <p className="font-body text-white/15 text-xs tracking-wider">
            Designed and built by Ernest Forbes Jr. — Nassau, Bahamas
          </p>
        </div>

      </div>
    </footer>
  )
}