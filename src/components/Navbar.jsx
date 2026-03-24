import { useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-night-900/90 backdrop-blur-sm border-b border-bimini-900/40">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Brand */}
        <NavLink
          to="/"
          className="font-display text-2xl tracking-widest text-white hover:text-sunset-500 transition-colors duration-300"
        >
          ARAWAK CAY
        </NavLink>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `font-body text-sm tracking-wider uppercase transition-colors duration-300 ${
                    isActive
                      ? 'text-sunset-500 border-b border-sunset-500 pb-0.5'
                      : 'text-white/70 hover:text-white'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>

      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-64' : 'max-h-0'}`}>
        <ul className="flex flex-col px-6 pb-6 gap-4 border-t border-bimini-900/40">
          {navLinks.map(link => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block font-body text-sm tracking-wider uppercase pt-4 transition-colors duration-300 ${
                    isActive ? 'text-sunset-500' : 'text-white/70 hover:text-white'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

    </nav>
  )
}

const navLinks = [
  { path: '/',      label: 'Home'     },
  { path: '/menu',  label: 'Menu'     },
  { path: '/about', label: 'About'    },
]