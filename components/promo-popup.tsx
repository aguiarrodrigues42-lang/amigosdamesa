"use client"
import { useState, useEffect } from "react"
import { X } from "lucide-react"
import Image from "next/image"
export function PromoPopup() {
const [isOpen, setIsOpen] = useState(false)
useEffect(() => {
const timer = setTimeout(() => setIsOpen(true), 800)
return () => clearTimeout(timer)
  }, [])
const handleClose = () => setIsOpen(false)
const handleClick = () => {
setIsOpen(false)
document.getElementById("planos")?.scrollIntoView({ behavior: "smooth" })
  }
if (!isOpen) return null
return (
<div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
<div
className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
onClick={handleClose}
/>
<div className="relative z-10 animate-in fade-in zoom-in-95 duration-300" style={{ maxHeight: "70vh", width: "auto" }}>
<button
onClick={handleClose}
className="absolute -top-2 -right-2 z-20 w-6 h-6 rounded-full bg-zinc-800/90 hover:bg-zinc-600 flex items-center justify-center text-white/80 hover:text-white transition-colors shadow-lg border border-zinc-600/50"
aria-label="Fechar popup"
>
<X className="w-3 h-3" />
</button>
<button
onClick={handleClick}
className="block rounded-lg overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-orange-500/20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500 hover:border-orange-500/50 transition-all duration-200"
style={{ maxHeight: "70vh" }}
aria-label="Ver planos com desconto"
>
<Image
src="/images/1.jpg"
alt="Promocao Amigos da Mesa"
width={400}
height={712}
className="h-full w-auto object-contain"
style={{ maxHeight: "70vh" }}
priority
/>
</button>
</div>
</div>
  )
}