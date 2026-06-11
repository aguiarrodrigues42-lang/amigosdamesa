import { FlagsBanner } from "@/components/cinematic"

export function Footer() {
  return (
    <footer className="relative bg-card border-t border-gold/15 overflow-hidden">
      {/* World Cup closing scene: hanging flags + ambient stadium glow */}
      <FlagsBanner />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, oklch(0.55 0.13 150 / 0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative pt-16 pb-12">
        {/* Instagram CTA */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-gold" aria-hidden="true">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
            <span className="text-lg font-semibold text-foreground">@amigosdamesa</span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Nos siga no Instagram e fique por dentro de tudo</p>
          <a
            href="https://www.instagram.com/amigosdamesa/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative overflow-hidden group inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-3 rounded-full transition-colors text-sm shadow-[0_8px_30px_-8px_oklch(0.56_0.21_263/0.55)]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 relative z-10" aria-hidden="true">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
            <span className="relative z-10">Seguir no Instagram</span>
            <span aria-hidden className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-white/20 skew-x-[-20deg] transition-transform duration-500" />
          </a>
        </div>

        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo.png" alt="Amigos da Mesa PRO" width="128" height="32" style={{ height: "32px", width: "auto", display: "block" }} />
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-gold transition-colors">Termos de Uso</a>
              <a href="#" className="hover:text-gold transition-colors">Política de Privacidade</a>
              <a href="#" className="hover:text-gold transition-colors">Contato</a>
            </div>

            <p className="text-sm text-muted-foreground">
              © 2024 Amigos da Mesa PRO. Todos os direitos reservados.
            </p>
          </div>

          {/* brazil tri-band divider */}
          <div aria-hidden className="mt-8 h-px w-full brazil-band opacity-50" />

          <div className="mt-8 text-center text-xs text-muted-foreground max-w-3xl mx-auto">
            <p>
              Aviso de risco: Operações em mercados financeiros envolvem riscos significativos. 
              Resultados passados não garantem resultados futuros. Este não é um serviço de 
              consultoria de investimentos. Opere com responsabilidade e apenas com capital que 
              você pode perder.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
