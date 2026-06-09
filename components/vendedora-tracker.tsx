"use client"
import { useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"

const VALID_SELLERS = ["milena", "talita", "james", "leonardo"]

function getVendedora(): string | null {
  if (typeof document === "undefined") return null
  const m = document.cookie.match(/vendedora=([^;]+)/)
  return m ? m[1] : null
}

function withUtm(url: string, vendedora: string): string {
  if (!url || url.indexOf("neoncheckout") === -1) return url
  const clean = url
    .replace(/([?&])utm_source=[^&]*/g, "$1")
    .replace(/\?&/, "?")
    .replace(/&&/g, "&")
    .replace(/[?&]$/, "")
  const sep = clean.indexOf("?") === -1 ? "?" : "&"
  return clean + sep + "utm_source=" + vendedora
}

function VendedoraTrackerInner() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const ref = (searchParams.get("ref") || "").toLowerCase().trim()
    if (ref && VALID_SELLERS.indexOf(ref) !== -1) {
      // Cookie de sessão (sem max-age) — limpa ao fechar o navegador,
      // evitando que venda de meses passados contamine a atribuição.
      document.cookie = "vendedora=" + ref + ";path=/;SameSite=Lax"
    }
  }, [searchParams])

  useEffect(() => {
    // Intercepta window.open (tipado corretamente para o build)
    const originalOpen = window.open
    window.open = function (this: Window, ...args: any[]) {
      const v = getVendedora()
      if (v && typeof args[0] === "string") args[0] = withUtm(args[0], v)
      return originalOpen.apply(this, args as any)
    } as typeof window.open

    // Rede de segurança: clique em <a>
    const handleClick = (e: MouseEvent) => {
      const v = getVendedora()
      if (!v) return
      const a = (e.target as HTMLElement).closest("a")
      if (a && a.href && a.href.indexOf("neoncheckout") !== -1 && a.href.indexOf("utm_source=" + v) === -1) {
        e.preventDefault()
        window.location.href = withUtm(a.href, v)
      }
    }
    document.addEventListener("click", handleClick, true)

    // Reescreve links de checkout (incl. dinâmicos)
    const rewrite = () => {
      const v = getVendedora()
      if (!v) return
      document.querySelectorAll('a[href*="neoncheckout"]').forEach((l) => {
        const h = l.getAttribute("href")
        if (h) {
          const n = withUtm(h, v)
          if (h !== n) l.setAttribute("href", n)
        }
      })
    }
    rewrite()
    const observer = new MutationObserver(rewrite)
    observer.observe(document.body, { childList: true, subtree: true })
    const interval = setInterval(rewrite, 1500)

    return () => {
      window.open = originalOpen
      document.removeEventListener("click", handleClick, true)
      observer.disconnect()
      clearInterval(interval)
    }
  }, [])

  return null
}

export function VendedoraTracker() {
  return (
    <Suspense fallback={null}>
      <VendedoraTrackerInner />
    </Suspense>
  )
}"use client"
import { useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"

const VALID_SELLERS = ["milena", "talita", "james", "leonardo"]

function getVendedora(): string | null {
  if (typeof document === "undefined") return null
  const m = document.cookie.match(/vendedora=([^;]+)/)
  return m ? m[1] : null
}

function withUtm(url: string, vendedora: string): string {
  if (!url || url.indexOf("neoncheckout") === -1) return url
  const clean = url
    .replace(/([?&])utm_source=[^&]*/g, "$1")
    .replace(/\?&/, "?")
    .replace(/&&/g, "&")
    .replace(/[?&]$/, "")
  const sep = clean.indexOf("?") === -1 ? "?" : "&"
  return clean + sep + "utm_source=" + vendedora
}

function VendedoraTrackerInner() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const ref = (searchParams.get("ref") || "").toLowerCase().trim()
    if (ref && VALID_SELLERS.indexOf(ref) !== -1) {
      // Cookie de sessão (sem max-age) — limpa ao fechar o navegador,
      // evitando que venda de meses passados contamine a atribuição.
      document.cookie = "vendedora=" + ref + ";path=/;SameSite=Lax"
    }
  }, [searchParams])

  useEffect(() => {
    // Intercepta window.open (tipado corretamente para o build)
    const originalOpen = window.open
    window.open = function (this: Window, ...args: any[]) {
      const v = getVendedora()
      if (v && typeof args[0] === "string") args[0] = withUtm(args[0], v)
      return originalOpen.apply(this, args as any)
    } as typeof window.open

    // Rede de segurança: clique em <a>
    const handleClick = (e: MouseEvent) => {
      const v = getVendedora()
      if (!v) return
      const a = (e.target as HTMLElement).closest("a")
      if (a && a.href && a.href.indexOf("neoncheckout") !== -1 && a.href.indexOf("utm_source=" + v) === -1) {
        e.preventDefault()
        window.location.href = withUtm(a.href, v)
      }
    }
    document.addEventListener("click", handleClick, true)

    // Reescreve links de checkout (incl. dinâmicos)
    const rewrite = () => {
      const v = getVendedora()
      if (!v) return
      document.querySelectorAll('a[href*="neoncheckout"]').forEach((l) => {
        const h = l.getAttribute("href")
        if (h) {
          const n = withUtm(h, v)
          if (h !== n) l.setAttribute("href", n)
        }
      })
    }
    rewrite()
    const observer = new MutationObserver(rewrite)
    observer.observe(document.body, { childList: true, subtree: true })
    const interval = setInterval(rewrite, 1500)

    return () => {
      window.open = originalOpen
      document.removeEventListener("click", handleClick, true)
      observer.disconnect()
      clearInterval(interval)
    }
  }, [])

  return null
}

export function VendedoraTracker() {
  return (
    <Suspense fallback={null}>
      <VendedoraTrackerInner />
    </Suspense>
  )
}