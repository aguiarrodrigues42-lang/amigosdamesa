"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export function VendedoraTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // 1. Captura ?ref= e salva no cookie
    const ref = searchParams.get("ref");
    if (ref) {
      document.cookie = `vendedora=${ref};path=/;max-age=${60 * 60 * 24 * 30};SameSite=Lax`;
    }
  }, [searchParams]);

  useEffect(() => {
    // 2. Intercepta navegação para checkout adicionando utm_source
    const getVendedora = () => {
      const match = document.cookie.match(/vendedora=([^;]+)/);
      return match ? match[1] : null;
    };

    // Intercepta window.open (usado por alguns checkouts)
    const originalOpen = window.open;
    window.open = function(url, ...args) {
      const vendedora = getVendedora();
      if (vendedora && typeof url === "string" && url.includes("neoncheckout") && !url.includes("utm_source")) {
        const sep = url.includes("?") ? "&" : "?";
        url = url + sep + "utm_source=" + vendedora;
      }
      return originalOpen.call(window, url, ...args);
    };

    // Intercepta clicks que levam a navegação
    const handleClick = (e: MouseEvent) => {
      const vendedora = getVendedora();
      if (!vendedora) return;

      // Checa se é um link <a>
      const anchor = (e.target as HTMLElement).closest("a");
      if (anchor && anchor.href && anchor.href.includes("neoncheckout") && !anchor.href.includes("utm_source")) {
        e.preventDefault();
        const sep = anchor.href.includes("?") ? "&" : "?";
        window.location.href = anchor.href + sep + "utm_source=" + vendedora;
      }
    };

    document.addEventListener("click", handleClick, true);

    // Intercepta pushState/replaceState
    const origPush = history.pushState;
    const origReplace = history.replaceState;
    
    // Monitor para qualquer navegação futura
    const interval = setInterval(() => {
      const vendedora = getVendedora();
      if (!vendedora) return;
      const links = document.querySelectorAll('a[href*="neoncheckout"]');
      links.forEach((link) => {
        const href = link.getAttribute("href");
        if (href && !href.includes("utm_source")) {
          const sep = href.includes("?") ? "&" : "?";
          link.setAttribute("href", href + sep + "utm_source=" + vendedora);
        }
      });
    }, 1000);

    return () => {
      window.open = originalOpen;
      document.removeEventListener("click", handleClick, true);
      clearInterval(interval);
    };
  }, []);

  return null;
}
