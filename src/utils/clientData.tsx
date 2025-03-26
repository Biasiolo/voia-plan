import { defaultFormData } from "../data/formFileds"

export const generateClientDataView = (formData: typeof defaultFormData) => {
  const acessosString = formData.accesses
    .map((a) => `• ${a.channel} – Login: ${a.login}, Senha: ${a.password}`)
    .join("\n")

  return `CADASTRO

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


`
}
