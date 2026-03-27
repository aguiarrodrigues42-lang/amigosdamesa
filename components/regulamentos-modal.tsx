"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileText, Check } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"

const termos = [
  {
    id: "regulamento-geral",
    label: "Regulamento Geral",
    description: "Li e concordo com o Regulamento Geral da AMIGOS DA MESA PROP",
  },
  {
    id: "guia-rapido",
    label: "Guia Rápido",
    description: "Li e concordo com o Guia Rápido - Como funciona a jornada do Trader",
  },
  {
    id: "material-explicativo-1",
    label: "Material Explicativo I",
    description: "Li e concordo com o Material Explicativo I (Master50/Unos40/Titan/Prime/Pegue e Monte/BIT)",
  },
  {
    id: "material-explicativo-2",
    label: "Material Explicativo II",
    description: "Li e concordo com o Material Explicativo II (Demais planos)",
  },
  {
    id: "campanhas-50-off",
    label: "Campanhas 50% OFF",
    description: "Li e concordo com o Regulamento Específico de Campanhas acima de 50% OFF",
  },
]

export function RegulamentosModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [agreedTerms, setAgreedTerms] = useState<Record<string, boolean>>({})

  const allAgreed = termos.every((termo) => agreedTerms[termo.id] === true)

  const handleToggleTermo = (termoId: string, checked: boolean) => {
    setAgreedTerms((prev) => ({
      ...prev,
      [termoId]: checked,
    }))
  }

  const handleClose = () => {
    if (allAgreed) {
      setIsOpen(false)
    }
  }

  const handleOpenChange = (open: boolean) => {
    if (!open && !allAgreed) {
      return
    }
    setIsOpen(open)
    if (open) {
      setAgreedTerms({})
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 text-xs">
          <FileText className="w-3.5 h-3.5" />
          Ver Regulamento Geral
        </Button>
      </DialogTrigger>
      <DialogContent 
        className="max-w-md max-h-[90vh] overflow-y-auto"
        onPointerDownOutside={(e) => {
          if (!allAgreed) {
            e.preventDefault()
          }
        }}
        onEscapeKeyDown={(e) => {
          if (!allAgreed) {
            e.preventDefault()
          }
        }}
      >
        <DialogHeader>
          <DialogTitle>Regulamentos da Mesa</DialogTitle>
          <DialogDescription>
            Para continuar, você deve concordar com todos os termos e regulamentos da AMIGOS DA MESA PROP.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-3">
          {termos.map((termo) => (
            <div 
              key={termo.id}
              className="flex items-start gap-3 p-3 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors"
            >
              <Checkbox 
                id={termo.id} 
                checked={agreedTerms[termo.id] || false}
                onCheckedChange={(checked) => handleToggleTermo(termo.id, checked === true)}
                className="mt-0.5"
              />
              <label 
                htmlFor={termo.id} 
                className="cursor-pointer flex-1"
              >
                <span className="text-sm font-medium text-foreground block">{termo.label}</span>
                <span className="text-xs text-muted-foreground">{termo.description}</span>
              </label>
            </div>
          ))}
        </div>

        <div className="text-xs text-muted-foreground text-center mb-3">
          {Object.values(agreedTerms).filter(Boolean).length} de {termos.length} termos aceitos
        </div>

        <Button 
          onClick={handleClose}
          disabled={!allAgreed}
          className="w-full gap-2"
        >
          {allAgreed && <Check className="w-4 h-4" />}
          {allAgreed ? "Concordar e Fechar" : "Aceite todos os termos para continuar"}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
