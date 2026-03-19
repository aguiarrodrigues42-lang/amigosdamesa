"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setIsMobileMenuOpen(false)
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-2">
            <Image 
              src="/images/logo.png" 
              alt="Amigos da Mesa PRO" 
              width={40} 
              height={40}
              className="w-8 h-8 md:w-10 md:h-10"
            />
            <span className="font-bold text-lg text-foreground">Amigos da Mesa PRO</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection("como-funciona")}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Como Funciona
            </button>
            <button 
              onClick={() => scrollToSection("planos")}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Planos
            </button>
            <button 
              onClick={() => scrollToSection("depoimentos")}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Depoimentos
            </button>
            <button 
              onClick={() => scrollToSection("faq")}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              FAQ
            </button>
          </nav>

          <div className="hidden md:block">
            <Button 
              onClick={() => scrollToSection("planos")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              ENTRAR AGORA
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              <button 
                onClick={() => scrollToSection("como-funciona")}
                className="text-left text-muted-foreground hover:text-primary transition-colors py-2"
              >
                Como Funciona
              </button>
              <button 
                onClick={() => scrollToSection("planos")}
                className="text-left text-muted-foreground hover:text-primary transition-colors py-2"
              >
                Planos
              </button>
              <button 
                onClick={() => scrollToSection("depoimentos")}
                className="text-left text-muted-foreground hover:text-primary transition-colors py-2"
              >
                Depoimentos
              </button>
              <button 
                onClick={() => scrollToSection("faq")}
                className="text-left text-muted-foreground hover:text-primary transition-colors py-2"
              >
                FAQ
              </button>
              <Button 
                onClick={() => scrollToSection("planos")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold mt-2"
              >
                ENTRAR AGORA
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
