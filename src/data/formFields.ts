// src/data/formFields.ts

// ==========================
// TIPOS AUXILIARES
// ==========================

export type AccessItem = {
  channel: string
  login: string
  password: string
}

// ==========================
// FORM DATA (TIPO PRINCIPAL)
// ==========================

export type FormData = {
  companyName: string
  segment: string
  productsServices: string
  location: string
  timeInMarket: string

  // NOVOS CAMPOS — REDES SOCIAIS / SITE
  website: string
  instagram: string
  tiktok: string
  linkedin: string

  purpose: string
  marketProblem: string
  transformation: string
  nonNegotiable: string

  values: string
  differentials: string
  slogan: string

  enemy: string
  marketMistake: string
  unpopularTruth: string
  notYourClient: string
  flagStatement: string

  mainAudience: string
  silentPain: string
  failedAttempts: string
  hiddenFear: string
  desiredFeeling: string
  otherAudiences: string

  authority: string
  concreteResults: string
  failuresLessons: string
  methodLogic: string

  toneOfVoice: string
  brandAdjectives: string
  rationalOrEmotional: string
  provocativeOrWarm: string
  wordsToAvoid: string

  changeInMarket: string
  whatMustEnd: string
  whatMustBeBorn: string
  community: string
  desiredAction: string

  channels: string
  postFrequency: string
  currentResults: string

  shortTermGoals: string
  longTermGoals: string
  challenges: string

  budget: string
  team: string
  indicators: string
  tools: string

  seasonalDates: string
  plannedEvents: string

  accesses: AccessItem[]
}

// ==========================
// DEFAULT FORM DATA
// ==========================

export const defaultFormData: FormData = {
  companyName: "",
  segment: "",
  productsServices: "",
  location: "",
  timeInMarket: "",

  // NOVOS CAMPOS — REDES SOCIAIS / SITE
  website: "",
  instagram: "",
  tiktok: "",
  linkedin: "",

  purpose: "",
  marketProblem: "",
  transformation: "",
  nonNegotiable: "",

  values: "",
  differentials: "",
  slogan: "",

  enemy: "",
  marketMistake: "",
  unpopularTruth: "",
  notYourClient: "",
  flagStatement: "",

  mainAudience: "",
  silentPain: "",
  failedAttempts: "",
  hiddenFear: "",
  desiredFeeling: "",
  otherAudiences: "",

  authority: "",
  concreteResults: "",
  failuresLessons: "",
  methodLogic: "",

  toneOfVoice: "",
  brandAdjectives: "",
  rationalOrEmotional: "",
  provocativeOrWarm: "",
  wordsToAvoid: "",

  changeInMarket: "",
  whatMustEnd: "",
  whatMustBeBorn: "",
  community: "",
  desiredAction: "",

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

  accesses: [{ channel: "", login: "", password: "" }],
}

// ==========================
// FORM STRUCTURE
// ==========================

export type FormField = {
  label: string
  name: keyof FormData
}

export type FormSection = {
  title: string
  fields: FormField[]
}

// ==========================
// FORM SECTIONS
// ==========================

export const formSections: FormSection[] = [
  {
    title: "Cadastro Inicial",
    fields: [
      { label: "Nome da empresa", name: "companyName" },
      { label: "Segmento de atuação", name: "segment" },
      { label: "Produtos/serviços oferecidos", name: "productsServices" },
      { label: "Localização/abrangência", name: "location" },
      { label: "Tempo de mercado", name: "timeInMarket" },

      // NOVOS CAMPOS
      { label: "Website", name: "website" },
      { label: "Instagram", name: "instagram" },
      { label: "TikTok", name: "tiktok" },
      { label: "LinkedIn", name: "linkedin" },
    ],
  },

  {
    title: "Etapa 1 — Essência",
    fields: [
      { label: "Por que sua marca existe além de gerar receita?", name: "purpose" },
      {
        label:
          "Que problema do mercado mais te incomoda a ponto de você ter criado essa marca?",
        name: "marketProblem",
      },
      { label: "Que transformação real você gera na vida do cliente?", name: "transformation" },
      {
        label:
          "O que você jamais abriria mão, mesmo que isso custasse crescimento?",
        name: "nonNegotiable",
      },
      { label: "Valores da marca", name: "values" },
      { label: "Diferenciais", name: "differentials" },
      { label: "Slogan", name: "slogan" },
    ],
  },

  {
    title: "Etapa 2 — Posicionamento",
    fields: [
      { label: "Contra o que exatamente você está lutando no seu mercado?", name: "enemy" },
      {
        label: "O que você acredita que o mercado faz errado hoje, mas normaliza?",
        name: "marketMistake",
      },
      {
        label:
          "Que verdade comum sobre redes sociais ou marketing você discorda totalmente?",
        name: "unpopularTruth",
      },
      { label: "Quem não é seu cliente, mesmo que pagasse bem?", name: "notYourClient" },
      { label: "Se tivesse que levantar uma única bandeira, qual seria?", name: "flagStatement" },
    ],
  },

  {
    title: "Etapa 3 — Público",
    fields: [
      { label: "Quem é seu cliente ideal de forma específica?", name: "mainAudience" },
      { label: "Qual é a dor silenciosa que ele vive hoje?", name: "silentPain" },
      { label: "O que ele já tentou e não funcionou?", name: "failedAttempts" },
      { label: "O que ele tem medo de admitir, mas sente com força?", name: "hiddenFear" },
      { label: "Depois de trabalhar com você, como ele quer se sentir?", name: "desiredFeeling" },
      { label: "Outros públicos relevantes", name: "otherAudiences" },
    ],
  },

  {
    title: "Etapa 4 — Prova",
    fields: [
      { label: "Quais experiências pessoais ou profissionais te dão autoridade?", name: "authority" },
      { label: "Quais resultados concretos você já gerou?", name: "concreteResults" },
      { label: "Que erros ou fracassos moldaram sua visão?", name: "failuresLessons" },
      { label: "Que método ou lógica orienta seu trabalho?", name: "methodLogic" },
    ],
  },

  {
    title: "Etapa 5 — Personalidade",
    fields: [
      { label: "Se sua marca fosse uma pessoa, como ela falaria?", name: "toneOfVoice" },
      { label: "Cite 3 adjetivos que definem o tom da marca", name: "brandAdjectives" },
      { label: "Sua marca é mais racional ou emocional?", name: "rationalOrEmotional" },
      { label: "Sua marca é mais provocadora ou acolhedora?", name: "provocativeOrWarm" },
      { label: "Quais palavras ou expressões você evita usar?", name: "wordsToAvoid" },
    ],
  },

  {
    title: "Etapa 6 — Futuro",
    fields: [
      { label: "Que mudança você quer provocar no seu mercado?", name: "changeInMarket" },
      { label: "O que precisa acabar nesse mercado?", name: "whatMustEnd" },
      { label: "O que precisa nascer ou ser fortalecido?", name: "whatMustBeBorn" },
      { label: "Que comunidade você quer construir?", name: "community" },
      {
        label:
          "Qual ação você quer que as pessoas sintam vontade de tomar depois de conhecer sua marca?",
        name: "desiredAction",
      },
    ],
  },

  {
    title: "Presença Digital",
    fields: [
      { label: "Canais utilizados", name: "channels" },
      { label: "Frequência de postagens", name: "postFrequency" },
      { label: "Resultados percebidos", name: "currentResults" },
    ],
  },

  {
    title: "Objetivos e Desafios",
    fields: [
      { label: "Objetivos de curto prazo", name: "shortTermGoals" },
      { label: "Objetivos de longo prazo", name: "longTermGoals" },
      { label: "Desafios atuais", name: "challenges" },
    ],
  },

  {
    title: "Recursos e Métricas",
    fields: [
      { label: "Orçamento de marketing", name: "budget" },
      { label: "Equipe responsável", name: "team" },
      { label: "KPIs acompanhados", name: "indicators" },
      { label: "Ferramentas utilizadas", name: "tools" },
    ],
  },

  {
    title: "Planejamento",
    fields: [
      { label: "Datas sazonais importantes", name: "seasonalDates" },
      { label: "Lançamentos ou ações previstas", name: "plannedEvents" },
    ],
  },
]

// ==========================
// FIELD MAP AUTOMÁTICO
// ==========================

export const fieldMap: Record<string, keyof FormData> = Object.fromEntries(
  formSections.flatMap((section) =>
    section.fields.map((field) => [field.label, field.name])
  )
)
