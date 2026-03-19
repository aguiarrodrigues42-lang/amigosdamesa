import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { WhatIsSection } from "@/components/what-is-section"
import { PainSection } from "@/components/pain-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { BenefitsSection } from "@/components/benefits-section"
import { PricingSection } from "@/components/pricing-section"
import { ComparisonSection } from "@/components/comparison-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FaqSection } from "@/components/faq-section"
import { UrgencySection } from "@/components/urgency-section"
import { FinalCtaSection } from "@/components/final-cta-section"
import { Footer } from "@/components/footer"
import { FloatingCta } from "@/components/floating-cta"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <WhatIsSection />
      <PainSection />
      <div id="como-funciona">
        <HowItWorksSection />
      </div>
      <BenefitsSection />
      <PricingSection />
      <ComparisonSection />
      <div id="depoimentos">
        <TestimonialsSection />
      </div>
      <div id="faq">
        <FaqSection />
      </div>
      <UrgencySection />
      <FinalCtaSection />
      <Footer />
      <FloatingCta />
    </main>
  )
}
