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
  const [agreed, setAgreed] = useState(false)

  const handleClose = () => {
    if (agreed) {
      setIsOpen(false)
    }
  }

  const handleOpenChange = (open: boolean) => {
    if (!open && !agreed) {
      return
    }
    setIsOpen(open)
    if (open) {
      setAgreed(false)
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
          if (!agreed) {
            e.preventDefault()
          }
        }}
        onEscapeKeyDown={(e) => {
          if (!agreed) {
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
          <div 
            className="flex items-start gap-3 p-4 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors cursor-pointer"
            onClick={() => setAgreed(!agreed)}
          >
            <Checkbox 
              id="termos" 
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked === true)}
              className="mt-0.5"
            />
            <label 
              htmlFor="termos" 
              className="cursor-pointer flex-1"
            >
              <span className="text-sm font-medium text-foreground block">Li e estou ciente</span>
              <span className="text-xs text-muted-foreground">
                Declaro que li e estou ciente com todos os termos e regulamentos da AMIGOS DA MESA PROP
              </span>
            </label>
          </div>
        </div>

        <Button 
          onClick={handleClose}
          disabled={!agreed}
          className="w-full gap-2"
        >
          {agreed && <Check className="w-4 h-4" />}
          {agreed ? "Concordar e Fechar" : "Marque a caixa para continuar"}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
