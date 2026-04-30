"use client"
import { useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"

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
      if (vendedora && typeof url === "string" && url.includes("neoncheckout") && !url.includes("utm_source")) {
        var sep = url.includes("?") ? "&" : "?"
        url = url + sep + "utm_source=" + vendedora
      }
      return originalOpen.call(window, url, target, features)
    }

    var handleClick = function(e: MouseEvent) {
      var vendedora = getVendedora()
      if (!vendedora) return
      var anchor = (e.target as HTMLElement).closest("a")
      if (anchor && anchor.href && anchor.href.includes("neoncheckout") && !anchor.href.includes("utm_source")) {
        e.preventDefault()
        var sep = anchor.href.includes("?") ? "&" : "?"
        window.location.href = anchor.href + sep + "utm_source=" + vendedora
      }
    }

    document.addEventListener("click", handleClick, true)

    var interval = setInterval(function() {
      var vendedora = getVendedora()
      if (!vendedora) return
      var links = document.querySelectorAll('a[href*="neoncheckout"]')
      links.forEach(function(link) {
        var href = link.getAttribute("href")
        if (href && !href.includes("utm_source")) {
          var sep = href.includes("?") ? "&" : "?"
          link.setAttribute("href", href + sep + "utm_source=" + vendedora)
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