"use client"

import { ChevronRight, Trophy } from "lucide-react"

export function AnnouncementBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-11 bg-[#009C3B] text-white flex items-center justify-center gap-2 text-sm font-black uppercase tracking-wide animate-fade-in">
      <Trophy className="w-4 h-4 text-[#FFDF00]" />
      <span className="text-xs md:text-sm">Especial Copa 2026 — 60% OFF por tempo limitado</span>
      <ChevronRight className="w-4 h-4 text-[#FFDF00]" />
    </div>
  )
}
