"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

function getVendedoraFromCookie(): string | null {
  const match = document.cookie.match(/vendedora=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

function addUtm(url: string | URL | undefined | null): string {
  if (!url) return "";
  
  const urlStr = url.toString();
  
  // Só modifica URLs que contenham "neoncheckout" ou "checkout"
  if (!urlStr.includes("neoncheckout") && !urlStr.includes("checkout")) {
    return urlStr;
  }
  
  // Não duplica utm_source se já existir
  if (urlStr.includes("utm_source")) {
    return urlStr;
  }
  
  // Lê o cookie no momento do clique
  const vendedora = getVendedoraFromCookie();
  if (!vendedora) {
    return urlStr;
  }
  
  const separator = urlStr.includes("?") ? "&" : "?";
  return `${urlStr}${separator}utm_source=${vendedora}`;
}

export function VendedoraTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Captura ?ref= e salva no cookie
    const ref = searchParams.get("ref");
    if (ref) {
      document.cookie = `vendedora=${encodeURIComponent(ref)};path=/;max-age=${60 * 60 * 24 * 30};SameSite=Lax`;
    }

    // Intercepta window.location.assign
    const originalAssign = window.location.assign.bind(window.location);
    window.location.assign = (url: string | URL) => {
      originalAssign(addUtm(url));
    };

    // Intercepta window.location.replace
    const originalReplace = window.location.replace.bind(window.location);
    window.location.replace = (url: string | URL) => {
      originalReplace(addUtm(url));
    };

    // Intercepta window.open
    const originalOpen = window.open.bind(window);
    window.open = (url?: string | URL | undefined, target?: string, features?: string) => {
      return originalOpen(addUtm(url), target, features);
    };

    // Intercepta cliques em links <a> que possam ter href dinâmico
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      if (link && link.href) {
        const originalHref = link.href;
        if ((originalHref.includes("neoncheckout") || originalHref.includes("checkout")) && !originalHref.includes("utm_source")) {
          const vendedora = getVendedoraFromCookie();
          if (vendedora) {
            e.preventDefault();
            const newHref = addUtm(originalHref);
            window.location.href = newHref;
          }
        }
      }
    };

    document.addEventListener("click", handleClick, true);

    // Cleanup
    return () => {
      window.location.assign = originalAssign;
      window.location.replace = originalReplace;
      window.open = originalOpen;
      document.removeEventListener("click", handleClick, true);
    };
  }, [searchParams]);

  return null;
}
