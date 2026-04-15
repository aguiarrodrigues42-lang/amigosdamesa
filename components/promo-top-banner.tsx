"use client"

export function PromoTopBanner() {
  const scrollToPlans = () => {
    document.getElementById("planos")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="w-full bg-[#0d1117] border-b border-primary/20">
      <button
        onClick={scrollToPlans}
        className="w-full cursor-pointer group focus:outline-none"
        aria-label="Ver planos com desconto"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/promo-header-banner.png"
          alt="Descontos de ate 70% - Exames e Pegue e Monte"
          className="w-full h-auto object-contain group-hover:brightness-110 transition-all duration-200"
        />
      </button>
    </div>
  )
}
