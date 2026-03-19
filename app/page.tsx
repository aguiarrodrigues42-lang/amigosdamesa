import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { PricingSection } from "@/components/pricing-section"
import { BenefitsSection } from "@/components/benefits-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FaqSection } from "@/components/faq-section"
import { UrgencySection } from "@/components/urgency-section"
import { Footer } from "@/components/footer"
import { FloatingCta } from "@/components/floating-cta"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <AboutSection />
      <UrgencySection />
      <PricingSection />
      <BenefitsSection />
      <div id="depoimentos">
        <TestimonialsSection />
      </div>
      <div id="faq">
        <FaqSection />
      </div>
      <Footer />
      <FloatingCta />
    </main>
  )
}
