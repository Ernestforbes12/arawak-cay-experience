import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export default function Hero() {
  const containerRef = useRef(null)
  const maskTextRef  = useRef(null)
  const overlayRef   = useRef(null)
  const sublineRef   = useRef(null)
  const scrollCueRef = useRef(null)

  useGSAP(() => {
    // Master timeline — everything is sequenced from here.
    // This is the GTA-style cinematic opener.
    const tl = gsap.timeline({ delay: 0.3 })

    // Step 1: Start with the overlay fully black, then fade it out
    // to reveal the video playing behind the mask.
    tl.fromTo(overlayRef.current,
      { opacity: 1 },
      { opacity: 0.65, duration: 2, ease: 'power2.inOut' }
    )

    // Step 2: The mask text scales up from nothing and fades in.
    // This is the moment the "FISH FRY" letters appear over the video.
    .fromTo(maskTextRef.current,
      { opacity: 0, scale: 0.8, letterSpacing: '0.3em' },
      { opacity: 1, scale: 1, letterSpacing: '0.15em', duration: 1.4, ease: 'power3.out' },
      '-=1'
    )

    // Step 3: The tagline slides up from below.
    .fromTo(sublineRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' },
      '-=0.4'
    )

    // Step 4: The scroll cue fades in last.
    .fromTo(scrollCueRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      '-=0.2'
    )

    // Pulse animation on the scroll cue — runs independently and forever.
    gsap.to(scrollCueRef.current, {
      y: 8,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      delay: 2.5,
    })

  }, { scope: containerRef })

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-night-900"
    >

      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Dark overlay so text is always readable over the video */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-night-900"
      />

      {/* SVG Mask — the video plays INSIDE the letters */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          viewBox="0 0 1200 300"
          className="w-full max-w-6xl px-4"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* The mask cuts the text shape out of a rectangle.
                White areas show through, black areas are hidden.
                This makes the video visible only inside the letters. */}
            <mask id="textMask">
              <rect width="1200" height="300" fill="black" />
              <text
                x="50%"
                y="78%"
                textAnchor="middle"
                fontSize="260"
                fontFamily="'Bebas Neue', sans-serif"
                fontWeight="400"
                letterSpacing="8"
                fill="white"
              >
                FISH FRY
              </text>
            </mask>
          </defs>

          {/* This rectangle is masked by the text above.
              The video behind shows through the letter shapes. */}
          <rect
            width="1200"
            height="300"
            fill="rgba(255,255,255,0.18)"
            mask="url(#textMask)"
          />

          {/* Stroke outline of the letters for definition */}
          <text
            x="50%"
            y="78%"
            textAnchor="middle"
            fontSize="260"
            fontFamily="'Bebas Neue', sans-serif"
            fontWeight="400"
            letterSpacing="8"
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="0.5"
          >
            FISH FRY
          </text>

        </svg>
      </div>

      {/* Animated mask text ref for GSAP */}
      <div
        ref={maskTextRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ opacity: 0 }}
      >
        <svg
          viewBox="0 0 1200 300"
          className="w-full max-w-6xl px-4"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <mask id="textMaskAnimated">
              <rect width="1200" height="300" fill="black" />
              <text
                x="50%"
                y="78%"
                textAnchor="middle"
                fontSize="260"
                fontFamily="'Bebas Neue', sans-serif"
                fontWeight="400"
                letterSpacing="8"
                fill="white"
              >
                FISH FRY
              </text>
            </mask>
          </defs>

          <rect
            width="1200"
            height="300"
            fill="rgba(255,255,255,0.12)"
            mask="url(#textMaskAnimated)"
          />

          <text
            x="50%"
            y="78%"
            textAnchor="middle"
            fontSize="260"
            fontFamily="'Bebas Neue', sans-serif"
            fontWeight="400"
            letterSpacing="8"
            fill="none"
            stroke="rgba(255, 109, 0, 0.4)"
            strokeWidth="1"
          >
            FISH FRY
          </text>
        </svg>
      </div>

      {/* Bottom Content — tagline and scroll cue */}
      <div className="absolute bottom-0 left-0 right-0 pb-16 flex flex-col items-center gap-8">

        {/* Tagline */}
        <div ref={sublineRef} style={{ opacity: 0 }} className="text-center">
          <p className="font-accent text-white/80 text-lg md:text-xl italic tracking-wide">
            The soul of Nassau on a plate
          </p>
          <p className="font-body text-bimini-400/70 text-sm tracking-widest uppercase mt-2">
            Arawak Cay — Nassau, Bahamas
          </p>
        </div>

        {/* Scroll Cue */}
        <div ref={scrollCueRef} style={{ opacity: 0 }} className="flex flex-col items-center gap-2">
          <p className="font-body text-white/40 text-xs tracking-widest uppercase">
            Scroll to explore
          </p>
          <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
        </div>

      </div>

      {/* Bottom gradient fade into the next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-night-900 to-transparent" />

    </section>
  )
}