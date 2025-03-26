import { defaultFormData } from "../data/formFileds"

export const generateTemplate = (formData: typeof defaultFormData) => {
    const acessosString = formData.accesses
        .map((a) => `• ${a.channel} – Login: ${a.login}, Senha: ${a.password}`)
        .join("\n")

    return `Você é um estrategista de marketing de alta performance. Abaixo estão as informações cadastrais de um cliente. Leia com atenção e, a partir dessas informações, será possível criar planejamentos estratégicos, campanhas e recomendações personalizadas para este negócio.

Informações do Cliente:
Nome da empresa: ${formData.companyName}
Segmento de atuação: ${formData.segment}
Produtos/serviços oferecidos: ${formData.productsServices}
Localização/abrangência: ${formData.location}
Tempo de mercado: ${formData.timeInMarket}
Propósito e missão: ${formData.purpose}
Valores: ${formData.values}
Diferenciais: ${formData.differentials}
Tom de voz: ${formData.toneOfVoice}
Slogan: ${formData.slogan}

Público-Alvo:
Perfil principal: ${formData.mainAudience}
Outros públicos: ${formData.otherAudiences}

Presença Digital:
Canais utilizados: ${formData.channels}
Frequência de postagens: ${formData.postFrequency}
Resultados percebidos: ${formData.currentResults}
Acessos:
${acessosString}

Objetivos e Desafios:
Objetivos de curto prazo: ${formData.shortTermGoals}
Objetivos de longo prazo: ${formData.longTermGoals}
Desafios atuais: ${formData.challenges}

Recursos e Métricas:
Orçamento de marketing: ${formData.budget}
Equipe responsável: ${formData.team}
KPIs acompanhados: ${formData.indicators}
Ferramentas utilizadas: ${formData.tools}

Planejamento:
Datas sazonais importantes: ${formData.seasonalDates}
Lançamentos ou ações previstas: ${formData.plannedEvents}

Com base nessas informações, me ajude a:

1. Criar um planejamento estratégico de marketing e comunicação
2. Criar Blocos de Conteúdos
3. Recomendar os melhores canais e formatos para a marca
4. Sugerir ideias de campanhas e conteúdos para os próximos meses`
}
