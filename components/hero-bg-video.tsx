"use client"

import { useEffect, useRef, useState } from "react"

interface HeroBgVideoProps {
  /** Render the video on screens < 768px. If false, mobile shows only the poster. */
  videoOnMobile?: boolean
  /** Pause the video when the hero scrolls out of view (saves CPU/battery). */
  pauseOffscreen?: boolean
  poster?: string
}

const POSTER = "/images/wc-stadium-hero.png"

export function HeroBgVideo({
  videoOnMobile = true,
  pauseOffscreen = true,
  poster = POSTER,
}: HeroBgVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showVideo, setShowVideo] = useState(true)
  const [failed, setFailed] = useState(false)

  // Decide whether to mount the video at all (reduced-motion / mobile flag)
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const isMobile = window.matchMedia("(max-width: 767px)").matches
    if (reduced || (!videoOnMobile && isMobile)) {
      setShowVideo(false)
    }
  }, [videoOnMobile])

  // Kick off playback once data is ready (respects autoplay policies)
  const handleLoadedData = () => {
    const v = videoRef.current
    if (!v) return
    v.play().catch(() => {
      /* autoplay blocked — poster stays visible */
    })
  }

  // Pause when off-screen, resume when back in view
  useEffect(() => {
    if (!showVideo || !pauseOffscreen) return
    const v = videoRef.current
    if (!v) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          v.play().catch(() => {})
        } else {
          v.pause()
        }
      },
      { threshold: 0.01 },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [showVideo, pauseOffscreen])

  return (
    <>
      {/* Poster: instant paint, also the fallback if video fails/blocked */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster || "/placeholder.svg"}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center animate-ken-burns"
      />

      {showVideo && !failed && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
          aria-hidden="true"
          onLoadedData={handleLoadedData}
          onError={() => setFailed(true)}
          className="absolute inset-0 w-full h-full object-cover object-center"
        >
          <source src="/videos/video1.mp4" type="video/mp4" />
        </video>
      )}
    </>
  )
}
