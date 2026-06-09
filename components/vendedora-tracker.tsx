"use client"
import { useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"

const VALID_SELLERS = ["milena", "talita", "james", "leonardo"]

function getVendedora() {
  var m = document.cookie.match(/vendedora=([^;]+)/)
  return m ? m[1] : null
}

function withUtm(url: string, vendedora: string): string {
  if (!url || !url.includes("neoncheckout")) return url
  var clean = url
    .replace(/([?&])utm_source=[^&]*/g, "$1")
    .replace(/\?&/, "?").replace(/&&/g, "&").replace(/[?&]$/, "")
  var sep = clean.includes("?") ? "&" : "?"
  return clean + sep + "utm_source=" + vendedora
}

function VendedoraTrackerInner() {
  const searchParams = useSearchParams()

  useEffect(() => {
    var ref = (searchParams.get("ref") || "").toLowerCase().trim()
    if (ref && VALID_SELLERS.includes(ref)) {
      // COOKIE DE SESSÃO (sem max-age) — limpa ao fechar o navegador.
      // Evita que venda de meses passados contamine a atribuição atual.
      document.cookie = "vendedora=" + ref + ";path=/;SameSite=Lax"
    }
  }, [searchParams])

  useEffect(() => {
    // 1. window.open
    var originalOpen = window.open
    window.open = function (url, target, features) {
      var v = getVendedora()
      if (v && typeof url === "string") url = withUtm(url, v)
      return originalOpen.call(window, url as any, target, features)
    }

    // 2. location.assign
    var originalAssign = window.location.assign.bind(window.location)
    try {
      (window.location as any).assign = function (url: string) {
        var v = getVendedora()
        return originalAssign(v ? withUtm(url, v) : url)
      }
    } catch (e) {}

    // 3. location.replace
    var originalReplace = window.location.replace.bind(window.location)
    try {
      (window.location as any).replace = function (url: string) {
        var v = getVendedora()
        return originalReplace(v ? withUtm(url, v) : url)
      }
    } catch (e) {}

    // 4. Cliques em <a> (rede de segurança)
    var handleClick = function (e: MouseEvent) {
      var v = getVendedora()
      if (!v) return
      var a = (e.target as HTMLElement).closest("a")
      if (a && a.href && a.href.includes("neoncheckout") && !a.href.includes("utm_source=" + v)) {
        e.preventDefault()
        window.location.href = withUtm(a.href, v)
      }
    }
    document.addEventListener("click", handleClick, true)

    // 5. Reescreve <a> dinâmicos
    var rewrite = function () {
      var v = getVendedora()
      if (!v) return
      document.querySelectorAll('a[href*="neoncheckout"]').forEach(function (l) {
        var h = l.getAttribute("href")
        if (h) { var n = withUtm(h, v); if (h !== n) l.setAttribute("href", n) }
      })
    }
    rewrite()
    var observer = new MutationObserver(rewrite)
    observer.observe(document.body, { childList: true, subtree: true })

    return function () {
      window.open = originalOpen
      try { (window.location as any).assign = originalAssign } catch (e) {}
      try { (window.location as any).replace = originalReplace } catch (e) {}
      document.removeEventListener("click", handleClick, true)
      observer.disconnect()
    }
  }, [])

  return null
}

export function VendedoraTracker() {
  return <Suspense fallback={null}><VendedoraTrackerInner /></Suspense>
}"use client"
import { useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"

const VALID_SELLERS = ["milena", "talita", "james", "leonardo"]

function getVendedora() {
  var m = document.cookie.match(/vendedora=([^;]+)/)
  return m ? m[1] : null
}

function withUtm(url: string, vendedora: string): string {
  if (!url || !url.includes("neoncheckout")) return url
  var clean = url
    .replace(/([?&])utm_source=[^&]*/g, "$1")
    .replace(/\?&/, "?").replace(/&&/g, "&").replace(/[?&]$/, "")
  var sep = clean.includes("?") ? "&" : "?"
  return clean + sep + "utm_source=" + vendedora
}

function VendedoraTrackerInner() {
  const searchParams = useSearchParams()

  useEffect(() => {
    var ref = (searchParams.get("ref") || "").toLowerCase().trim()
    if (ref && VALID_SELLERS.includes(ref)) {
      // COOKIE DE SESSÃO (sem max-age) — limpa ao fechar o navegador.
      // Evita que venda de meses passados contamine a atribuição atual.
      document.cookie = "vendedora=" + ref + ";path=/;SameSite=Lax"
    }
  }, [searchParams])

  useEffect(() => {
    // 1. window.open
    var originalOpen = window.open
    window.open = function (url, target, features) {
      var v = getVendedora()
      if (v && typeof url === "string") url = withUtm(url, v)
      return originalOpen.call(window, url as any, target, features)
    }

    // 2. location.assign
    var originalAssign = window.location.assign.bind(window.location)
    try {
      (window.location as any).assign = function (url: string) {
        var v = getVendedora()
        return originalAssign(v ? withUtm(url, v) : url)
      }
    } catch (e) {}

    // 3. location.replace
    var originalReplace = window.location.replace.bind(window.location)
    try {
      (window.location as any).replace = function (url: string) {
        var v = getVendedora()
        return originalReplace(v ? withUtm(url, v) : url)
      }
    } catch (e) {}

    // 4. Cliques em <a> (rede de segurança)
    var handleClick = function (e: MouseEvent) {
      var v = getVendedora()
      if (!v) return
      var a = (e.target as HTMLElement).closest("a")
      if (a && a.href && a.href.includes("neoncheckout") && !a.href.includes("utm_source=" + v)) {
        e.preventDefault()
        window.location.href = withUtm(a.href, v)
      }
    }
    document.addEventListener("click", handleClick, true)

    // 5. Reescreve <a> dinâmicos
    var rewrite = function () {
      var v = getVendedora()
      if (!v) return
      document.querySelectorAll('a[href*="neoncheckout"]').forEach(function (l) {
        var h = l.getAttribute("href")
        if (h) { var n = withUtm(h, v); if (h !== n) l.setAttribute("href", n) }
      })
    }
    rewrite()
    var observer = new MutationObserver(rewrite)
    observer.observe(document.body, { childList: true, subtree: true })

    return function () {
      window.open = originalOpen
      try { (window.location as any).assign = originalAssign } catch (e) {}
      try { (window.location as any).replace = originalReplace } catch (e) {}
      document.removeEventListener("click", handleClick, true)
      observer.disconnect()
    }
  }, [])

  return null
}

export function VendedoraTracker() {
  return <Suspense fallback={null}><VendedoraTrackerInner /></Suspense>
}