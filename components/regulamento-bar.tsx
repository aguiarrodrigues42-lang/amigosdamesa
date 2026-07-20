"use client"

import { FileText, ArrowUpRight } from "lucide-react"

const PDF_URL = "/docs/regulamento-copa-dos-traders.pdf"

export function RegulamentoBar() {
  return (
    <div className="bg-background border-b border-[#1b2024]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4 flex-wrap">
        {/* Left label */}
        <p className="font-sans text-xs font-medium uppercase tracking-[0.18em] text-[#5f5e58]">
          Copa dos Traders · Campanha Oficial
        </p>

        {/* CTA link */}
        <a
          href={PDF_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2.5 rounded-lg border border-[#efbd24]/25 bg-[#efbd24]/5 px-4 py-2 transition-all duration-200 hover:border-[#efbd24]/50 hover:bg-[#efbd24]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#efbd24]/50"
          aria-label="Abrir regulamento oficial da Copa dos Traders em PDF"
        >
          <FileText
            className="h-3.5 w-3.5 shrink-0 text-[#efbd24]"
            aria-hidden="true"
          />
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-[#efbd24]">
            Regulamento oficial
          </span>
          <ArrowUpRight
            className="h-3 w-3 shrink-0 text-[#efbd24]/60 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </a>
      </div>
    </div>
  )
}
