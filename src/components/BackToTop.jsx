import { useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)
  const buttonRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!buttonRef.current) return

    gsap.to(buttonRef.current, {
      opacity: visible ? 1 : 0,
      y: visible ? 0 : 20,
      duration: 0.4,
      ease: 'power2.out',
      pointerEvents: visible ? 'auto' : 'none',
    })
  }, [visible])

  const scrollToTop = () => {
    gsap.to(window, {
      scrollTo: 0,
      duration: 1.2,
      ease: 'power3.inOut',
    })
  }

  return (
    <button
      ref={buttonRef}
      onClick={scrollToTop}
      style={{ opacity: 0 }}
      className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-night-800 border border-white/10 flex items-center justify-center hover:border-bimini-500/50 hover:bg-night-700 transition-colors duration-200"
      aria-label="Back to top"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 12V4M4 8l4-4 4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  )
}