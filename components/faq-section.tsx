"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function FaqSection() {
  const faqs = [
    {
      question: "Preciso ter experiência para participar?",
      answer: "Não necessariamente. Nossos planos são adaptados para diferentes níveis. O plano Starter é ideal para quem está começando, enquanto o Pro e Elite são mais indicados para traders com alguma experiência. O importante é ter compromisso e vontade de aprender."
    },
    {
      question: "Funciona para iniciantes?",
      answer: "Sim! O plano Starter foi desenhado pensando em quem está começando. Você terá acesso à sala de operações, análises diárias e uma comunidade para tirar dúvidas. Porém, é importante ter conhecimento básico de mercado financeiro."
    },
    {
      question: "Vocês dão sinais de entrada?",
      answer: "NÃO. A Amigos da Mesa PRO não é um grupo de sinais. Nós ensinamos você a pensar e operar de forma independente. Você vai aprender a identificar oportunidades e tomar suas próprias decisões com base em uma metodologia sólida."
    },
    {
      question: "Tem acompanhamento?",
      answer: "Sim! Dependendo do plano, você tem diferentes níveis de acompanhamento. No plano Starter, você tem a comunidade. No Pro, revisões semanais. No Elite, mentoria individual mensal e suporte personalizado."
    },
    {
      question: "Posso cancelar quando quiser?",
      answer: "Sim! Não há fidelidade. Você pode cancelar sua assinatura a qualquer momento, sem multas ou complicações. Oferecemos também garantia de 7 dias em todos os planos."
    },
    {
      question: "Quanto tempo leva para ver resultados?",
      answer: "Depende do seu comprometimento e nível atual. Alguns traders veem melhoras em poucas semanas, outros levam alguns meses. O importante é seguir o processo e ter disciplina. Consistência é uma jornada, não um destino."
    },
    {
      question: "Qual horário das operações?",
      answer: "Acompanhamos principalmente o horário do mercado brasileiro. Análise pré-mercado às 9h, operações ao vivo das 10h às 17h, e revisão do dia às 17h30. Tudo é gravado para quem não puder acompanhar ao vivo."
    },
    {
      question: "Vocês operam qual mercado?",
      answer: "Focamos principalmente em mini-índice (WIN) e mini-dólar (WDO), mas também cobrimos ações e outros ativos dependendo das oportunidades do dia."
    }
  ]

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
            Perguntas <span className="text-primary">Frequentes</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Tire suas dúvidas antes de entrar.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem 
                key={i} 
                value={`item-${i}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/50"
              >
                <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
