"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const LINK_SELECTOR = 'a[href*="neoncheckout"], a[href*="checkout"], a[href*="neon"]';

function injectUtm(link: Element, vendedora: string) {
  const href = link.getAttribute("href");
  console.log("[v0] VendedoraTracker: link href =", href);
  if (href && !href.includes("utm_source")) {
    const separator = href.includes("?") ? "&" : "?";
    link.setAttribute("href", `${href}${separator}utm_source=${vendedora}`);
  }
}

function processAllLinks(vendedora: string) {
  const links = document.querySelectorAll(LINK_SELECTOR);
  console.log("[v0] VendedoraTracker: links encontrados =", links.length);
  links.forEach((link) => {
    injectUtm(link, vendedora);
  });
}

export function VendedoraTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const ref = searchParams.get("ref");
    console.log("[v0] VendedoraTracker: ref =", ref);
    
    if (ref) {
      document.cookie = `vendedora=${encodeURIComponent(ref)};path=/;max-age=${60 * 60 * 24 * 30};SameSite=Lax`;
    }

    const match = document.cookie.match(/vendedora=([^;]+)/);
    const vendedora = match ? decodeURIComponent(match[1]) : null;
    console.log("[v0] VendedoraTracker: vendedora cookie =", vendedora);

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
          el.querySelectorAll?.(LINK_SELECTOR).forEach((link) => {
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
