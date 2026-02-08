"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clipboard } from "lucide-react"
import { useState } from "react"

const prompts = [
  {
    title: "Guia de Palavras-Chave com Relevância e Incidência",
    prompt: `{Regras: Seja objetivo e responda de forma direta, sem exageros semânticos} > Você é um analista de performance e SEO especializado em campanhas de tráfego pago. Com base nas informações do cliente, gere um guia de palavras-chave com:
- Termos principais e variações relevantes
- Nível de intenção de compra
- Volume de busca estimado (incidência)
- Sugestões para palavras negativas
Apresente os dados em formato de tabela para fácil leitura e aplicação.`,
  },
  {
    title: "Segmentação Avançada: 5 Públicos para Campanhas",
    prompt: `{Regras: Seja objetivo e responda de forma direta, sem exageros semânticos} > Você é um estrategista de mídia paga. Com base no perfil do cliente, crie 5 segmentações de público ideais para campanhas em Meta Ads e Google Ads. Para cada público, especifique:
- Nome descritivo do público
- Características demográficas e comportamentais
- Interesses ou palavras-chave de segmentação
- Objetivo da campanha recomendada`,
  },
  {
    title: "Exemplos de Públicos Utilizados por Concorrentes Diretos",
    prompt: `{Regras: Seja objetivo e responda de forma direta, sem exageros semânticos} > Você é um especialista em inteligência competitiva. Com base nas informações do cliente, identifique os 3 principais concorrentes diretos do segmento e descreva os tipos de públicos que eles provavelmente utilizam em campanhas de mídia paga. Utilize benchmarks e lógica de mercado. `,
  },
  {
    title: "Copywriting para Anúncios com Diferentes Objetivos",
    prompt: `{Regras: Seja objetivo e responda de forma direta, sem exageros semânticos} > Você é um copywriter de tráfego com foco em performance. Crie 3 variações de copy para anúncios com os seguintes objetivos:
1. Reconhecimento de marca
2. Geração de leads
3. Vendas diretas

Cada copy deve conter:
- Headline envolvente
- Benefício claro
- CTA otimizado
- Adapte para Meta Ads e Google (texto de pesquisa e display)`,
  },
  {
    title: "Criação de Funil de Conversão com Anúncios",
    prompt: `{Regras: Seja objetivo e responda de forma direta, sem exageros semânticos} > Você é um gestor de tráfego com foco em funis. Com base nas informações do cliente, crie um funil de marketing dividido em 3 etapas:
- TOFU: Atração
- MOFU: Nutrição
- BOFU: Conversão

Para cada etapa, especifique:
- Objetivo da campanha
- Tipo de público ideal
- Tipo de criativo e mensagem principal
- Métrica de sucesso (KPI)`,
  },
  {
    title: "Sugestão de Planejamento e Cronograma de Ações de Tráfego",
    prompt: `{Regras: Seja objetivo e responda de forma direta, sem exageros semânticos} > Você é um coordenador de tráfego com foco em execução estratégica. Monte um cronograma de campanhas para os próximos 3 meses considerando:
- Objetivos do cliente
- Sazonalidades do setor
- Fases de investimento (crescimento, manutenção, performance)
- Canais e formatos a serem utilizados
- Observações sobre otimização e testes A/B

Apresente o planejamento de forma cronológica e visual, se possível.`,
  },
]

export function Trafego() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    alert("Prompt copiado com sucesso!")
  }

  return (
    <div className="grid gap-6">
      {prompts.map((item, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{item.title}</CardTitle>
            <Button size="sm" className=" bg-gradient-to-t from-teal-800 to-teal-600 hover:bg-teal-800 text-white rounded-3xl cursor-pointer" onClick={() => handleCopy(item.prompt, index)}>
              <Clipboard className="w-4 h-4 mr-2" />
              {copiedIndex === index ? "Copiado!" : "Copiar"}
            </Button>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap text-sm">{item.prompt}</pre>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
