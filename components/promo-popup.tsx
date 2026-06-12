"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { X, Volume2, VolumeX, Play, Pause, Trophy } from "lucide-react"
import confetti from "canvas-confetti"

const VIDEO_SRC = "https://i.imgur.com/N8l4Dtl.mp4"

// CBF palette for the confetti burst
const BRAZIL_COLORS = ["#009C3B", "#FFD500", "#2B2D7F", "#FFFFFF", "#3B43B8"]

export function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimatingOut, setIsAnimatingOut] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showSoundHint, setShowSoundHint] = useState(false)
  // real video aspect ratio (width / height); defaults to vertical until metadata loads
  const [videoRatio, setVideoRatio] = useState(9 / 16)

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const confettiCanvasRef = useRef<HTMLCanvasElement | null>(null)

  const handleClose = useCallback(() => {
    setIsAnimatingOut(true)
    if (videoRef.current) {
      videoRef.current.pause()
    }
    setTimeout(() => {
      setIsOpen(false)
      setIsAnimatingOut(false)
    }, 220)
  }, [])

  const goToPlans = () => {
    handleClose()
    setTimeout(() => {
      document.getElementById("planos")?.scrollIntoView({ behavior: "smooth" })
    }, 280)
  }

  // Open immediately, once per session
  useEffect(() => {
    if (sessionStorage.getItem("promoVslShown")) return
    sessionStorage.setItem("promoVslShown", "true")
    setIsOpen(true)
  }, [])

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) handleClose()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [isOpen, handleClose])

  // Realistic Brazil-colored confetti burst when the popup opens
  useEffect(() => {
    if (!isOpen || !confettiCanvasRef.current) return

    const myConfetti = confetti.create(confettiCanvasRef.current, {
      resize: true,
      useWorker: true,
    })

    const fire = (particleRatio: number, opts: confetti.Options) => {
      myConfetti({
        origin: { y: 0.62 },
        colors: BRAZIL_COLORS,
        disableForReducedMotion: true,
        ...opts,
        particleCount: Math.floor(220 * particleRatio),
      })
    }

    // multi-layered burst for an ultra-realistic feel
    fire(0.25, { spread: 26, startVelocity: 55, scalar: 1.1 })
    fire(0.2, { spread: 60, startVelocity: 45 })
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.9 })
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 })
    fire(0.1, { spread: 120, startVelocity: 45 })

    // gentle side cannons shortly after
    const t1 = setTimeout(() => {
      myConfetti({
        particleCount: 60,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.65 },
        colors: BRAZIL_COLORS,
        disableForReducedMotion: true,
      })
      myConfetti({
        particleCount: 60,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.65 },
        colors: BRAZIL_COLORS,
        disableForReducedMotion: true,
      })
    }, 260)

    return () => {
      clearTimeout(t1)
      myConfetti.reset()
    }
  }, [isOpen])

  // Try to autoplay WITH sound; fall back to muted + "clique para ouvir"
  useEffect(() => {
    if (!isOpen) return
    const video = videoRef.current
    if (!video) return

    let cancelled = false

    const tryPlay = async () => {
      try {
        video.muted = false
        video.volume = 1
        await video.play()
        if (cancelled) return
        setIsMuted(false)
        setIsPlaying(true)
        setShowSoundHint(false)
      } catch {
        // Browser blocked autoplay with sound — fall back to muted
        try {
          video.muted = true
          await video.play()
          if (cancelled) return
          setIsMuted(true)
          setIsPlaying(true)
          setShowSoundHint(true)
        } catch {
          if (cancelled) return
          setIsPlaying(false)
        }
      }
    }

    tryPlay()
    return () => {
      cancelled = true
    }
  }, [isOpen])

  const toggleSound = () => {
    const video = videoRef.current
    if (!video) return
    const next = !video.muted
    video.muted = next
    if (!next) video.volume = 1
    setIsMuted(next)
    setShowSoundHint(false)
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {})
    }
  }

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {})
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Apresentacao Amigos da Mesa"
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-200 ${
        isAnimatingOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleClose} aria-hidden="true" />

      {/* Confetti canvas — covers the whole screen, behind the modal content but above overlay */}
      <canvas
        ref={confettiCanvasRef}
        className="pointer-events-none absolute inset-0 z-[5] h-full w-full"
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className={`relative z-10 flex max-h-[94svh] w-full flex-col overflow-y-auto transition-all duration-300 ${
          isAnimatingOut ? "opacity-0 scale-95" : "opacity-100 scale-100 animate-in fade-in zoom-in-95"
        }`}
        style={{ maxWidth: "400px" }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute -top-3 -right-3 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-black/80 text-white shadow-lg ring-1 ring-white/15 transition-colors hover:bg-black"
          aria-label="Fechar"
        >
          <X className="h-5 w-5" />
        </button>

        {/* ── Bonus headline banner ───────────────────────────── */}
        <div className="relative overflow-hidden rounded-t-2xl border border-b-0 border-[oklch(0.24_0.01_240)] bg-[linear-gradient(135deg,var(--brazil-green-deep)_0%,oklch(0.11_0.006_240)_55%,oklch(0.11_0.006_240)_100%)] px-5 py-3.5">
          {/* CBF tri-band top accent */}
          <div className="brazil-band absolute inset-x-0 top-0 h-1" aria-hidden="true" />
          <div className="flex items-start gap-3">
            <span
              className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
              style={{ background: "color-mix(in oklch, var(--gold) 18%, transparent)" }}
            >
              <Trophy className="h-5 w-5" style={{ color: "var(--gold)" }} aria-hidden="true" />
            </span>
            <p className="font-sans text-[13px] leading-snug text-foreground/90 sm:text-sm">
              Assine qualquer plano da{" "}
              <span className="font-display font-semibold tracking-wide" style={{ color: "var(--gold)" }}>
                Amigos da Mesa
              </span>{" "}
              e ganhe{" "}
              <span className="font-bold" style={{ color: "var(--brazil-green)" }}>
                pontos de largada
              </span>{" "}
              no Ranking da Copa, aumentando suas chances de levar a{" "}
              <span className="font-semibold text-foreground">premiacao final</span>.
            </p>
          </div>
        </div>

        {/* ── VSL player ──────────────────────────────────────── */}
        <div
          className="relative w-full overflow-hidden border-x border-[oklch(0.24_0.01_240)] bg-black"
          style={{ aspectRatio: videoRatio, maxHeight: "58svh" }}
        >
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            playsInline
            preload="auto"
            controls={false}
            onClick={togglePlay}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onLoadedMetadata={(e) => {
              const v = e.currentTarget
              if (v.videoWidth && v.videoHeight) {
                setVideoRatio(v.videoWidth / v.videoHeight)
              }
            }}
            className="h-full w-full cursor-pointer object-contain"
          />

          {/* "Clique para ouvir" hint (only when muted fallback kicked in) */}
          {showSoundHint && isMuted && (
            <button
              onClick={toggleSound}
              className="absolute left-1/2 top-4 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-black shadow-lg animate-pulse"
              style={{ background: "var(--gold)" }}
            >
              <VolumeX className="h-4 w-4" />
              Clique para ouvir
            </button>
          )}

          {/* Big center play button when paused */}
          {!isPlaying && (
            <button
              onClick={togglePlay}
              className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 transition-colors hover:bg-black/40"
              aria-label="Reproduzir"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-2xl">
                <Play className="ml-1 h-7 w-7 text-black" fill="currentColor" />
              </span>
            </button>
          )}

          {/* Minimal control bar */}
          <div className="absolute inset-x-0 bottom-0 z-20 flex items-center gap-3 bg-gradient-to-t from-black/70 to-transparent px-3 py-2">
            <button
              onClick={togglePlay}
              className="flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15"
              aria-label={isPlaying ? "Pausar" : "Reproduzir"}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" fill="currentColor" />}
            </button>
            <button
              onClick={toggleSound}
              className="flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15"
              aria-label={isMuted ? "Ativar som" : "Desativar som"}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* ── CTA footer ──────────────────────────────────────── */}
        <div className="rounded-b-2xl border border-t-0 border-[oklch(0.24_0.01_240)] bg-[oklch(0.11_0.006_240)] p-4">
          <button
            onClick={goToPlans}
            className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary px-6 py-3.5 font-display text-base font-bold uppercase tracking-wide text-primary-foreground shadow-[0_10px_30px_-8px_oklch(0.56_0.21_263/0.6)] transition-all hover:brightness-110"
          >
            <span className="relative z-10">Quero meus pontos de largada</span>
            <span
              aria-hidden
              className="absolute inset-0 -translate-x-full bg-white/20 skew-x-[-20deg] transition-transform duration-500 group-hover:translate-x-full"
            />
          </button>
          <p className="mt-2.5 text-center font-sans text-[11px] text-muted-foreground">
            Oferta especial Copa 2026 — bonus aplicado automaticamente na assinatura.
          </p>
        </div>
      </div>
    </div>
  )
}
