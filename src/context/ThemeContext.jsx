import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext(null)

// Two accent themes. Each defines the CSS custom properties
// that components reference for their accent colors.
export const themes = {
  bimini: {
    name: 'Bimini Blue',
    accent:       '#00bfa8',
    accentLight:  '#4dd4c2',
    accentDark:   '#008f7e',
    accentMuted:  'rgba(0, 191, 168, 0.15)',
    accentBorder: 'rgba(0, 191, 168, 0.30)',
  },
  sunset: {
    name: 'Sunset',
    accent:       '#ff6d00',
    accentLight:  '#ffb74d',
    accentDark:   '#e65100',
    accentMuted:  'rgba(255, 109, 0, 0.15)',
    accentBorder: 'rgba(255, 109, 0, 0.30)',
  },
  coral: {
    name: 'Coral',
    accent:       '#ef5350',
    accentLight:  '#ff8a80',
    accentDark:   '#c62828',
    accentMuted:  'rgba(239, 83, 80, 0.15)',
    accentBorder: 'rgba(239, 83, 80, 0.30)',
  },
}

export function ThemeProvider({ children }) {
  const [activeTheme, setActiveTheme] = useState('bimini')

  const switchTheme = (themeName) => {
    setActiveTheme(themeName)

    // Apply CSS custom properties to the document root.
    // Every component that references var(--accent) will
    // update instantly across the entire application.
    const theme = themes[themeName]
    const root  = document.documentElement

    root.style.setProperty('--accent',        theme.accent)
    root.style.setProperty('--accent-light',  theme.accentLight)
    root.style.setProperty('--accent-dark',   theme.accentDark)
    root.style.setProperty('--accent-muted',  theme.accentMuted)
    root.style.setProperty('--accent-border', theme.accentBorder)
  }

  return (
    <ThemeContext.Provider value={{ activeTheme, switchTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used inside ThemeProvider')
  return context
}