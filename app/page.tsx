import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { TrilhaSection } from "@/components/trilha-section"
import { SocialProofSection } from "@/components/social-proof-section"
import { UrgencySection } from "@/components/urgency-section"
import { PricingSection } from "@/components/pricing-section-v2"
import { ClubSection } from "@/components/club-section"
import { BenefitsSection } from "@/components/benefits-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FaqSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      {/* 1. Hero — imagem 1 como capa */}
      <HeroSection />
      {/* 2. Sobre a mesa — imagem 3 */}
      <AboutSection />
      {/* 3. Trilha do trader — processo passo a passo */}
      <TrilhaSection />
      {/* 4. Por que a mesa — imagem 2 + benefícios */}
      <SocialProofSection />
      {/* 5. Urgência */}
      <UrgencySection />
      {/* 6. Planos */}
      <div id="planos">
        <PricingSection />
      </div>
      {/* 7. Clube do Valor */}
      <ClubSection />
      <BenefitsSection />
      <div id="depoimentos">
        <TestimonialsSection />
      </div>
      <div id="faq">
        <FaqSection />
      </div>
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
