"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

function injectUtm(link: Element, vendedora: string) {
  const href = link.getAttribute("href");
  if (href && href.includes("neoncheckout.com") && !href.includes("utm_source")) {
    const separator = href.includes("?") ? "&" : "?";
    link.setAttribute("href", `${href}${separator}utm_source=${vendedora}`);
  }
}

function processAllLinks(vendedora: string) {
  document.querySelectorAll('a[href*="neoncheckout.com"]').forEach((link) => {
    injectUtm(link, vendedora);
  });
}

export function VendedoraTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) {
      document.cookie = `vendedora=${encodeURIComponent(ref)};path=/;max-age=${60 * 60 * 24 * 30};SameSite=Lax`;
    }

    const match = document.cookie.match(/vendedora=([^;]+)/);
    const vendedora = match ? decodeURIComponent(match[1]) : null;

    if (!vendedora) return;

    // Processa links já existentes no DOM
    processAllLinks(vendedora);

    // Observa links adicionados dinamicamente
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType !== Node.ELEMENT_NODE) return;
          const el = node as Element;

          // Verifica se o próprio nó é um link
          if (el.tagName === "A") {
            injectUtm(el, vendedora);
          }

          // Verifica links dentro do nó adicionado
          el.querySelectorAll?.('a[href*="neoncheckout.com"]').forEach((link) => {
            injectUtm(link, vendedora);
          });
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [searchParams]);

  return null;
}
