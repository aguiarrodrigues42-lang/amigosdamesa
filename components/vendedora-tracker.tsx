"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export function VendedoraTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) {
      document.cookie = `vendedora=${ref};path=/;max-age=${60 * 60 * 24 * 30};SameSite=Lax`;
    }

    const match = document.cookie.match(/vendedora=([^;]+)/);
    const vendedora = match ? match[1] : null;

    if (vendedora) {
      const links = document.querySelectorAll('a[href*="neoncheckout.com"]');
      links.forEach((link) => {
        const href = link.getAttribute("href");
        if (href && !href.includes("utm_source")) {
          const separator = href.includes("?") ? "&" : "?";
          link.setAttribute("href", `${href}${separator}utm_source=${vendedora}`);
        }
      });
    }
  }, [searchParams]);

  return null;
}
