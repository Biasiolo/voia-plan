"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clipboard } from "lucide-react"
import { useState } from "react"

const prompts = [
    {
        title: "Criação de Identidade Visual",
        prompt: `{Regras: Seja objetivo e responda de forma direta, sem exageros semânticos} Você é um diretor de arte com especialidade em branding. Com base nas informações do cliente abaixo, crie uma proposta de identidade visual que contenha:
  - Paleta de cores recomendada (com códigos HEX)
  - Tipografias ideais (Google Fonts ou fontes similares)
  - Estilo visual sugerido (ex: minimalista, retrô, futurista)
  - Referências visuais e moodboard textual
  - Elementos gráficos de apoio (ícones, padrões, texturas)`,
    },
    {
        title: "Design de Peças para Redes Sociais",
        prompt: `{Regras: Seja objetivo e responda de forma direta, sem exageros semânticos} Você é um designer especializado em social media. Com base nas informações do cliente, sugira um conjunto de peças para redes sociais, incluindo:
  - Templates de Stories e sequência de destaques (temática e layout)
  - Modelos de postagens regulares (feed)
  - Capa para destaques (ícones e cores)
  - Estilo visual coerente com a identidade da marca
  Descreva o racional criativo e possíveis temas visuais para os próximos 30 dias.`,
    },
    {
        title: "Manual de Marca (Brandbook)",
        prompt: `{Regras: Seja objetivo e responda de forma direta, sem exageros semânticos} Você é responsável por criar manuais de marca profissionais. Gere um Brandbook com base nas informações abaixo, contendo:
  - Missão, visão e valores
  - Voz e tom da marca
  - Paleta de cores (HEX + aplicações)
  - Tipografia (primária e secundária)
  - Aplicações do logo (restrições e variações)
  - Exemplos de uso correto e incorreto
  - Elementos gráficos auxiliares`,
    },
    {
        title: "Geração de Imagens com IA (Sora, Midjourney, etc.)",
        prompt: `{Regras: Seja objetivo e responda de forma direta, sem exageros semânticos} Você é um gerador de prompts para IA generativa de imagens (como Midjourney ou Sora). Crie comandos detalhados para gerar imagens para este cliente com base nos objetivos abaixo:
  - Estilo de imagem (foto realista, vetor, 3D, flat, etc.)
  - Cenários ou elementos visuais obrigatórios
  - Posição de elementos ou personagens
  - Cores e estética
  
  Gere pelo menos 3 prompts prontos para cópia e uso direto na IA.`,
    },
    {
        title: "Design de Landing Page",
        prompt: `{Regras: Seja objetivo e responda de forma direta, sem exageros semânticos} Você é um designer de interfaces e UX. Crie a estrutura e layout de uma landing page para o cliente abaixo com base em boas práticas de conversão. O conteúdo deve incluir:
  - Cabeçalho com proposta de valor
  - Blocos de benefícios (com ícones)
  - Depoimentos ou prova social
  - CTA de destaque
  - Rodapé com contato e políticas
  Descreva a hierarquia visual, referências de layout e estilo.`,
    },
    {
        title: "Kit de Design para Campanhas",
        prompt: `{Regras: Seja objetivo e responda de forma direta, sem exageros semânticos} Você é um designer de performance. Monte um kit gráfico para campanhas promocionais com base no cliente abaixo. O kit deve conter:
  - Modelos de banner para Google Display
  - Criativos para Meta Ads (feed, reels, stories)
  - Layout adaptável para e-mail marketing
  - Versões com e sem preço
  
  Sugira variações de cores e mensagens para testes A/B.`,
    },
]


export function Design() {
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
