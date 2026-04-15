import { Header } from "@/components/header"
import { PromoPopup } from "@/components/promo-popup"
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
      <PromoPopup />
      <Header />
      <HeroSection />
      <AboutSection />
      <TrilhaSection />
      <SocialProofSection />
      <UrgencySection />
      <div id="planos">
        <PricingSection />
      </div>
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