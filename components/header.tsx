"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronRight } from "lucide-react"
import Image from "next/image"

const drawerTopics = [
  "Repasses",
  "Regras operacionais",
  "Plataforma e renovação",
  "Planos profissionais",
  "Planos convencionais",
  "Guia rápido",
  "Cancelamentos",
  "Campanhas promocionais",
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isDrawerOpen])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Image src="/images/logo.png" alt="Logo" width={0} height={0} sizes="100vw" unoptimized className="h-10 w-auto" />
            </div>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {[
                { label: "Sobre a Mesa", id: "sobre" },
                { label: "Planos", id: "planos" },
                { label: "Depoimentos", id: "depoimentos" },
                { label: "FAQ", id: "faq" },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <Button
                onClick={() => scrollToSection("planos")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              >
                ENTRAR AGORA
              </Button>
            </div>

            {/* Hamburger — opens drawer */}
            <button
              className="p-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Abrir menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`
          fixed top-0 right-0 z-50 h-full w-72 bg-card border-l border-border
          flex flex-col shadow-2xl
          transition-transform duration-300 ease-in-out
          ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border bg-secondary">
          <span className="font-bold text-sm uppercase tracking-widest text-foreground">Menu</span>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Fechar menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Topics list */}
        <nav className="flex-1 overflow-y-auto py-4">
          {drawerTopics.map((topic, i) => (
            <button
              key={i}
              onClick={() => setIsDrawerOpen(false)}
              className="w-full flex items-center justify-between px-6 py-4 text-left text-sm text-foreground hover:bg-secondary hover:text-primary transition-colors border-b border-border/50 last:border-0"
            >
              <span>{topic}</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            </button>
          ))}
        </nav>

        {/* Drawer footer CTA */}
        <div className="px-6 py-5 border-t border-border">
          <Button
            onClick={() => { scrollToSection("planos"); setIsDrawerOpen(false) }}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
          >
            ENTRAR AGORA
          </Button>
        </div>
      </div>
    </>
  )
}
