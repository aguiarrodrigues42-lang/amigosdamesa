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
      question: "Quais mercados estão disponíveis para operar na Amigos da Mesa?",
      answer: "Você pode operar mini dólar (WDO), mini índice (WIN) e Bitcoin, de acordo com o plano escolhido e respeitando o limite de contratos permitido em cada conta."
    },
    {
      question: "A Amigos da Mesa trabalha com drawdown?",
      answer: "Não. A Amigos da Mesa não utiliza drawdown. O trader precisa apenas seguir o limite de perda diária e o limite máximo de perda estabelecido na conta."
    },
    {
      question: "Posso usar minha própria estratégia na Amigos da Mesa?",
      answer: "Sim. Você pode operar utilizando o seu próprio método, como já está acostumado no dia a dia, desde que siga as regras estabelecidas na fase de avaliação."
    },
    {
      question: "Quais plataformas posso utilizar para operar na Amigos da Mesa?",
      answer: "A operação é feita pela Profit One, que é disponibilizada gratuitamente por 30 dias. Também há a opção de usar Profit Plus ou Profit Pro. Após esse período inicial, a renovação da plataforma deve ser solicitada ao suporte e passa a ser cobrada."
    },
    {
      question: "Existe prazo para marcar o exame?",
      answer: "O exame é agendado após a contratação, diretamente em sua área logada. Você pode escolher quando iniciar, desde que cumpra o número mínimo de pregões exigidos e siga todas as regras estabelecidas."
    },
    {
      question: "Quais fatores levam à desclassificação do trader?",
      answer: "O não cumprimento das diretrizes previstas no regulamento, bem como o atingimento do limite máximo de perda acumulada estabelecido no plano contratado, resultam na desclassificação do trader."
    },
    {
      question: "Quantas tentativas de avaliação estão incluídas?",
      answer: "Cada contratação concede direito a uma única avaliação. Em caso de reprovação, será necessário adquirir um novo plano para uma nova tentativa. É permitido manter até 10 planos ativos simultaneamente por CPF, cada um vinculado à sua respectiva licença."
    },
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