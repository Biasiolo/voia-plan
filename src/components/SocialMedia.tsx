"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clipboard } from "lucide-react"
import { useState } from "react"


const prompts = [
  {
    title: "Ideias de Datas Comemorativas Relevantes",
    prompt: `{Regras: Seja objetivo e responda de forma direta, sem exageros semânticos} Você é um estrategista de conteúdo para redes sociais. Com base nas informações da marca abaixo, sugira datas comemorativas (oficiais, simbólicas ou nichadas) que tenham afinidade com o público e propósito da marca.
- Liste pelo menos 10 datas relevantes nos próximos 3 meses
- Para cada data, proponha uma ideia de conteúdo criativo`,
  },
  {
    title: "Planejamento Mensal de Conteúdo",
    prompt: `{Regras: Seja objetivo e responda de forma direta, sem exageros semânticos} Você é um social media planner. Crie um planejamento mensal de conteúdo para a marca abaixo, incluindo:
- Quantidade sugerida de posts por semana
- Distribuição dos formatos (feed, reels, stories, carrossel, lives)
- Objetivo de cada conteúdo (engajamento, conversão, branding, etc.)
- Exemplo de tema para cada semana`,
  },
  {
    title: "Ideias de Conteúdos Educativos",
    prompt: `{Regras: Seja objetivo e responda de forma direta, sem exageros semânticos} Você é um criador de conteúdo focado em valor educativo. Com base nas informações da marca abaixo, sugira pelo menos 10 ideias de postagens educativas, divididas por:
- Dicas práticas
- Curiosidades do setor
- Bastidores e processos da marca
- Conteúdos de autoridade e posicionamento`,
  },
  {
    title: "Criação de Calendário Editorial",
    prompt: `{Regras: Seja objetivo e responda de forma direta, sem exageros semânticos} Você é um estrategista de social media. Monte um calendário editorial para os próximos 30 dias da marca abaixo. O calendário deve conter:
- Data
- Tipo de conteúdo
- Formato
- Objetivo
- Tema ou título sugerido

Apresente em formato de tabela simples.`,
  },
  {
    title: "Sugestões de Pautas para Stories",
    prompt: `{Regras: Seja objetivo e responda de forma direta, sem exageros semânticos} Você é um especialista em conteúdo para Instagram. Sugira uma sequência de stories para engajamento, considerando:
- Enquetes e interações
- Bastidores e vida real
- Chamadas para ação (CTA)
- Dicas rápidas e curiosidades

Crie pelo menos 5 sequências com 3 a 4 stories cada.`,
  },
  {
    title: "Storytelling para Feed, Legendas e Destaques",
    prompt: `{Regras: Seja objetivo e responda de forma direta, sem exageros semânticos} Você é um estrategista de conteúdo com foco em storytelling para redes sociais. Com base nas informações da marca abaixo, desenvolva uma narrativa envolvente para:
  - O perfil da marca no Instagram (bio, destaques, identidade visual)
  - 3 posts de feed com storytelling (tema, legenda sugerida e CTA)
  - Linha editorial que una todos os conteúdos com consistência de voz e posicionamento`,
  },

  {
    title: "Conteúdo com Base nas Tendências do TikTok",
    prompt: `{Regras: Seja objetivo e responda de forma direta, sem exageros semânticos} Você é um estrategista de social media com acesso ao TikTok Studio. Com base na marca abaixo, identifique e proponha conteúdos aproveitando as tendências atuais da plataforma. A resposta deve conter:
  - Tópicos e formatos em alta que se relacionam com o segmento da marca
  - Ideias de vídeos curtos adaptadas para a marca (com títulos e ganchos)
  - Sugestão de hashtags e áudios populares relacionados
  - Frequência ideal de postagens e melhores horários
  - Sugestão de influenciadores ou criadores para possíveis parcerias`,
  },

  {
    title: "Estudo de Concorrência – Benchmarking em Social Media",
    prompt: `{Regras: Seja objetivo e responda de forma direta, sem exageros semânticos} Você é um analista de mercado digital. Faça um estudo de concorrência com base nas informações da marca abaixo. Entregue:
  - 3 marcas concorrentes diretas com atuação relevante nas redes sociais
  - Análise de estratégias, formatos e frequência utilizadas
  - Pontos fortes e fracos percebidos em cada uma
  - Oportunidades de diferenciação para a marca analisada`,
  },


  {
    title: "Série de Conteúdo Temático (Ex: #DicaDaSemana)",
    prompt: `{Regras: Seja objetivo e responda de forma direta, sem exageros semânticos} Você é um estrategista de conteúdo. Crie uma série de conteúdo temático para redes sociais com base na marca abaixo. A série deve:
- Ter um nome criativo (ex: #SegundaDaMarca)
- Conter pelo menos 4 temas (1 por semana)
- Ter formato e CTA recomendados
- Gerar expectativa e fidelização`,
  },
]


export function SocialMedia() {
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
            <Button size="sm" className=" bg-gradient-to-t from-indigo-800 to-indigo-600 hover:bg-indigo-800 text-white rounded-3xl cursor-pointer" onClick={() => handleCopy(item.prompt, index)}>
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
