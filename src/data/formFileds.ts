// src/data/formFields.ts

export const defaultFormData = {
    companyName: "",
    segment: "",
    productsServices: "",
    location: "",
    timeInMarket: "",
    purpose: "",
    values: "",
    differentials: "",
    toneOfVoice: "",
    slogan: "",
    mainAudience: "",
    otherAudiences: "",
    channels: "",
    postFrequency: "",
    currentResults: "",
    shortTermGoals: "",
    longTermGoals: "",
    challenges: "",
    budget: "",
    team: "",
    indicators: "",
    tools: "",
    seasonalDates: "",
    plannedEvents: "",
    accesses: [
      { channel: "", login: "", password: "" }
    ]
  }
  
  export const fieldMap = {
    "Nome da empresa": "companyName",
    "Segmento de atuação": "segment",
    "Produtos/serviços oferecidos": "productsServices",
    "Localização/abrangência": "location",
    "Tempo de mercado": "timeInMarket",
    "Propósito e missão": "purpose",
    "Valores": "values",
    "Diferenciais": "differentials",
    "Tom de voz": "toneOfVoice",
    "Slogan": "slogan",
    "Perfil principal": "mainAudience",
    "Outros públicos": "otherAudiences",
    "Canais utilizados": "channels",
    "Frequência de postagens": "postFrequency",
    "Resultados percebidos": "currentResults",
    "Objetivos de curto prazo": "shortTermGoals",
    "Objetivos de longo prazo": "longTermGoals",
    "Desafios atuais": "challenges",
    "Orçamento de marketing": "budget",
    "Equipe responsável": "team",
    "KPIs acompanhados": "indicators",
    "Ferramentas utilizadas": "tools",
    "Datas sazonais importantes": "seasonalDates",
    "Lançamentos ou ações previstas": "plannedEvents"
  } as const