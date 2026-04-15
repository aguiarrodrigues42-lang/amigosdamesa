"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, User } from "lucide-react"

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

  const closeDrawer = () => {
    setIsDrawerOpen(false)
  }

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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo.png" alt="Logo" width="160" height="40" style={{ height: "40px", width: "auto", display: "block" }} />
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
                onClick={() => window.open("https://areamembrosamigos.vercel.app/auth/login?redirect=%2F", "_blank")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              >
                ENTRAR AGORA
              </Button>
            </div>

            {/* Hamburger */}
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
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          onClick={closeDrawer}
        />
      )}

      {/* Drawer */}
      <div
        className={`
          fixed top-0 right-0 z-[70] h-full w-80 bg-card border-l border-border
          flex flex-col shadow-2xl
          transition-transform duration-300 ease-in-out
          ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-secondary flex-shrink-0">
          <span className="font-bold text-sm uppercase tracking-widest text-foreground">Menu</span>
          <button
            onClick={closeDrawer}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Fechar menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content - Área de membros */}
        <div className="flex-1 flex flex-col items-center justify-center px-5 py-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-8 h-8 text-primary" />
            </div>
            <span className="text-lg font-semibold text-foreground">Área de membros</span>
            <p className="text-sm text-muted-foreground">Acesse sua conta para gerenciar seus planos e operações.</p>
            <Button
              variant="outline"
              className="mt-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              onClick={() => window.open("https://areamembrosamigos.vercel.app/auth/login?redirect=%2F", "_blank")}
            >
              Acessar
            </Button>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="px-5 py-4 border-t border-border flex-shrink-0">
          <Button
            onClick={() => window.open("https://areamembrosamigos.vercel.app/auth/login?redirect=%2F", "_blank")}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
          >
            ENTRAR AGORA
          </Button>
        </div>
      </div>
    </>
  )
}
