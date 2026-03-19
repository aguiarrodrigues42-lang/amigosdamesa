import Image from "next/image"

export function Footer() {
  return (
    <footer className="py-12 bg-card border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Image 
              src="/images/logo.png" 
              alt="Amigos da Mesa PRO" 
              width={32} 
              height={32}
            />
            <span className="font-bold text-foreground">Amigos da Mesa PRO</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-primary transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-primary transition-colors">Contato</a>
          </div>

          <p className="text-sm text-muted-foreground">
            © 2024 Amigos da Mesa PRO. Todos os direitos reservados.
          </p>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-xs text-muted-foreground max-w-3xl mx-auto">
          <p>
            Aviso de risco: Operações em mercados financeiros envolvem riscos significativos. 
            Resultados passados não garantem resultados futuros. Este não é um serviço de 
            consultoria de investimentos. Opere com responsabilidade e apenas com capital que 
            você pode perder.
          </p>
        </div>
      </div>
    </footer>
  )
}
