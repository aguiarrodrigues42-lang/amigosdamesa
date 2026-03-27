export function Footer() {
  return (
    <footer className="py-12 bg-card border-t border-border">

      {/* Instagram CTA */}
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-primary" aria-hidden="true">
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
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-3 rounded-full transition-colors text-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
          Seguir no Instagram
        </a>
      </div>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.png" alt="Logo" width="128" height="32" style={{ height: "32px", width: "auto", display: "block" }} />
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
