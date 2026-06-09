"use client"
import { useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"

// ─── Vendedores válidos — adicione novos nomes aqui ───
const VALID_SELLERS = ["milena", "talita", "james", "leonardo"]

function cleanUtmSource(url: string): string {
  return url
    .replace(/([?&])utm_source=[^&]*/g, "$1")
    .replace(/\?&/, "?")
    .replace(/&&/g, "&")
    .replace(/[?&]$/, "")
}

function VendedoraTrackerInner() {
  const searchParams = useSearchParams()

  // Salva o vendedor assim que o ?ref= aparece (cookie + localStorage)
  useEffect(() => {
    var ref = (searchParams.get("ref") || "").toLowerCase().trim()
    if (ref && VALID_SELLERS.includes(ref)) {
      document.cookie = "vendedora=" + ref + ";path=/;max-age=" + (60 * 60 * 24 * 30) + ";SameSite=Lax"
      try { localStorage.setItem("vendedora", ref) } catch (e) {}
    }
  }, [searchParams])

  useEffect(() => {
    var getVendedora = function () {
      var match = document.cookie.match(/vendedora=([^;]+)/)
      if (match) return match[1]
      try { return localStorage.getItem("vendedora") } catch (e) { return null }
    }

    // Reescreve TODOS os links de checkout com o utm_source do vendedor
    var rewriteLinks = function () {
      var vendedora = getVendedora()
      if (!vendedora) return
      var links = document.querySelectorAll('a[href*="neoncheckout"]')
      links.forEach(function (link) {
        var href = link.getAttribute("href")
        if (href) {
          var clean = cleanUtmSource(href)
          var sep = clean.includes("?") ? "&" : "?"
          var novo = clean + sep + "utm_source=" + vendedora
          if (href !== novo) link.setAttribute("href", novo)
        }
      })
    }

    // 1. Roda IMEDIATAMENTE (corrige clique rápido)
    rewriteLinks()

    // 2. Intercepta window.open
    var originalOpen = window.open
    window.open = function (url, target, features) {
      var vendedora = getVendedora()
      if (vendedora && typeof url === "string" && url.includes("neoncheckout")) {
        var clean = cleanUtmSource(url)
        var sep = clean.includes("?") ? "&" : "?"
        url = clean + sep + "utm_source=" + vendedora
      }
      return originalOpen.call(window, url, target, features)
    }

    // 3. Intercepta clique como rede de segurança
    var handleClick = function (e: MouseEvent) {
      var vendedora = getVendedora()
      if (!vendedora) return
      var anchor = (e.target as HTMLElement).closest("a")
      if (anchor && anchor.href && anchor.href.includes("neoncheckout") && !anchor.href.includes("utm_source=" + vendedora)) {
        e.preventDefault()
        var clean = cleanUtmSource(anchor.href)
        var sep = clean.includes("?") ? "&" : "?"
        window.location.href = clean + sep + "utm_source=" + vendedora
      }
    }
    document.addEventListener("click", handleClick, true)

    // 4. MutationObserver — pega links adicionados dinamicamente NA HORA
    var observer = new MutationObserver(function () { rewriteLinks() })
    observer.observe(document.body, { childList: true, subtree: true })

    // 5. Interval de fallback (a cada 1s)
    var interval = setInterval(rewriteLinks, 1000)

    return function () {
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