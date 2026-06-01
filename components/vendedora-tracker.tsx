"use client"
import { useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"

function cleanUtmSource(url: string): string {
  return url
    .replace(/([?&])utm_source=[^&]*/g, "$1")
    .replace(/\?&/, "?")
    .replace(/&&/g, "&")
    .replace(/[?&]$/, "")
}

function VendedoraTrackerInner() {
  const searchParams = useSearchParams()

  useEffect(() => {
    var ref = searchParams.get("ref")
    if (ref) {
      document.cookie = "vendedora=" + ref + ";path=/;max-age=" + (60 * 60 * 24 * 30) + ";SameSite=Lax"
    }
  }, [searchParams])

  useEffect(() => {
    var getVendedora = function() {
      var match = document.cookie.match(/vendedora=([^;]+)/)
      return match ? match[1] : null
    }

    var originalOpen = window.open
    window.open = function(url, target, features) {
      var vendedora = getVendedora()
      if (vendedora && typeof url === "string" && url.includes("neoncheckout")) {
        var clean = cleanUtmSource(url)
        var sep = clean.includes("?") ? "&" : "?"
        url = clean + sep + "utm_source=" + vendedora
      }
      return originalOpen.call(window, url, target, features)
    }

    var handleClick = function(e: MouseEvent) {
      var vendedora = getVendedora()
      if (!vendedora) return
      var anchor = (e.target as HTMLElement).closest("a")
      if (anchor && anchor.href && anchor.href.includes("neoncheckout")) {
        e.preventDefault()
        var clean = cleanUtmSource(anchor.href)
        var sep = clean.includes("?") ? "&" : "?"
        window.location.href = clean + sep + "utm_source=" + vendedora
      }
    }

    document.addEventListener("click", handleClick, true)

    var interval = setInterval(function() {
      var vendedora = getVendedora()
      if (!vendedora) return
      var links = document.querySelectorAll('a[href*="neoncheckout"]')
      links.forEach(function(link) {
        var href = link.getAttribute("href")
        if (href) {
          var clean = cleanUtmSource(href)
          var sep = clean.includes("?") ? "&" : "?"
          link.setAttribute("href", clean + sep + "utm_source=" + vendedora)
        }
      })
    }, 1000)

    return function() {
      window.open = originalOpen
      document.removeEventListener("click", handleClick, true)
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