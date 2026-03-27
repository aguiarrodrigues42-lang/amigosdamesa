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

export function RegulamentosModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAgreed, setIsAgreed] = useState(false)

  const handleClose = () => {
    if (isAgreed) {
      setIsOpen(false)
    }
  }

  const handleOpenChange = (open: boolean) => {
    if (!open && !isAgreed) {
      return
    }
    setIsOpen(open)
    if (open) {
      setIsAgreed(false)
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
        className="max-w-md"
        onPointerDownOutside={(e) => {
          if (!isAgreed) {
            e.preventDefault()
          }
        }}
        onEscapeKeyDown={(e) => {
          if (!isAgreed) {
            e.preventDefault()
          }
        }}
      >
        <DialogHeader>
          <DialogTitle>Regulamentos da Mesa</DialogTitle>
          <DialogDescription>
            Para continuar, você deve concordar com os termos e regulamentos da AMIGOS DA MESA PROP.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-6">
          <div className="flex items-start gap-3 p-4 rounded-lg border border-border bg-card">
            <Checkbox 
              id="terms" 
              checked={isAgreed}
              onCheckedChange={(checked) => setIsAgreed(checked === true)}
              className="mt-0.5"
            />
            <label 
              htmlFor="terms" 
              className="text-sm text-muted-foreground cursor-pointer leading-relaxed"
            >
              Declaro que li e estou ciente de todos os termos, regulamentos e condições da AMIGOS DA MESA PROP, incluindo as regras operacionais, políticas de repasse e cancelamento.
            </label>
          </div>
        </div>

        <Button 
          onClick={handleClose}
          disabled={!isAgreed}
          className="w-full gap-2"
        >
          {isAgreed && <Check className="w-4 h-4" />}
          {isAgreed ? "Concordar e Fechar" : "Marque a caixa para continuar"}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
