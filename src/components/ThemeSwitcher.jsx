import { useTheme, themes } from '../context/ThemeContext'
import { motion } from 'framer-motion'

export default function ThemeSwitcher() {
  const { activeTheme, switchTheme } = useTheme()

  return (
    <div className="fixed bottom-8 left-8 z-50 flex flex-col gap-2">

      {/* Label */}
      <p className="font-body text-white/20 text-xs tracking-widest uppercase mb-1">
        Accent
      </p>

      {/* Theme Buttons */}
      {Object.entries(themes).map(([key, theme]) => (
        <motion.button
          key={key}
          onClick={() => switchTheme(key)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 group"
          aria-label={`Switch to ${theme.name} theme`}
        >
          {/* Color swatch */}
          <div
            className="w-6 h-6 rounded-full border-2 transition-all duration-300"
            style={{
              backgroundColor: theme.accent,
              borderColor: activeTheme === key
                ? 'white'
                : 'transparent',
              boxShadow: activeTheme === key
                ? `0 0 12px ${theme.accent}60`
                : 'none',
            }}
          />

          {/* Theme name */}
          <span className={`font-body text-xs tracking-wider transition-colors duration-200 ${
            activeTheme === key
              ? 'text-white'
              : 'text-white/25 group-hover:text-white/50'
          }`}>
            {theme.name}
          </span>
        </motion.button>
      ))}

    </div>
  )
}