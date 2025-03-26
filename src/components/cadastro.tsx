"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Clipboard, Download, Upload } from "lucide-react"
import { defaultFormData, fieldMap } from "../data/formFileds"
import { generateTemplate } from "../utils/templateGenerator"

export function Cadastro() {
  const [formData, setFormData] = useState({ ...defaultFormData })
  const [activeTab, setActiveTab] = useState("form")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAccessChange = (
    index: number,
    field: "channel" | "login" | "password",
    value: string
  ) => {
    const updated = [...formData.accesses]
    updated[index][field] = value
    setFormData((prev) => ({ ...prev, accesses: updated }))
  }

  const addAccess = () => {
    setFormData((prev) => ({
      ...prev,
      accesses: [...prev.accesses, { channel: "", login: "", password: "" }]
    }))
  }

  const removeAccess = (index: number) => {
    const updated = [...formData.accesses]
    updated.splice(index, 1)
    setFormData({ ...formData, accesses: updated })
  }

  const parseTextToFormData = (text: string) => {
    const lines = text.split("\n")
    const data: Record<string, string> = {}

    lines.forEach((line) => {
      const [key, ...rest] = line.split(":")
      if (!key || !rest.length) return

      const value = rest.join(":").trim()
      const formField = fieldMap[key.trim() as keyof typeof fieldMap]
      if (formField) {
        data[formField] = value
      }
    })

    return {
      ...formData,
      ...data,
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      const parsed = parseTextToFormData(text)
      setFormData(parsed)
      window.alert("Dados carregados com sucesso!")
    }
    reader.readAsText(file)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateTemplate(formData))
    window.alert("Template copiado para a área de transferência.")
  }

  const downloadTemplate = () => {
    const element = document.createElement("a")
    const file = new Blob([generateTemplate(formData)], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `${formData.companyName || "cliente"}_template_marketing.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const triggerClass = `
  data-[state=active]:bg-gradient-to-b from-indigo-800 to-indigo-600 
  data-[state=active]:text-white
  data-[state=active]:shadow-md
  rounded-3xl
  transition-all 
  duration-300 
  hover:bg-indigo-200
  border-0
  cursor-pointer
`

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="bg-gradient-to-b from-gray-300 to-gray-500 w-full grid grid-cols-2 rounded-3xl shadow-md mb-8">
        <TabsTrigger value="form" className={triggerClass}>
          Formulário
        </TabsTrigger>
        <TabsTrigger value="preview" className={triggerClass}>
          Visualizar Template
        </TabsTrigger>
      </TabsList>

      <TabsContent value="form">
        <div className="grid gap-8 mb-8 max-w-4xl mx-auto rounded-3xl">
          <Card className="bg-gray-100 border-none shadow-xl rounded-3xl overflow-hidden mt-0">
            <CardHeader className="bg-gradient-to-t from-gray-300 to-gray-400 rounded-t-2xl py-6 px-6">
              <CardTitle className="text-2xl font-semibold text-gray-800">Informações da Empresa</CardTitle>
              <CardDescription className="text-gray-600">Dados básicos sobre a empresa e sua identidade</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid gap-3">
                <Label htmlFor="companyName" className="text-sm font-medium text-gray-700">1. Nome da empresa:</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Digite o nome da empresa"
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="segment" className="text-sm font-medium text-gray-700">2. Segmento de atuação:</Label>
                <Input
                  id="segment"
                  name="segment"
                  value={formData.segment}
                  onChange={handleChange}
                  placeholder="Ex: Tecnologia, Saúde, Educação, etc."
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="productsServices" className="text-sm font-medium text-gray-700">3. Produtos ou serviços oferecidos:</Label>
                <Textarea
                  id="productsServices"
                  name="productsServices"
                  value={formData.productsServices}
                  onChange={handleChange}
                  placeholder="Descreva os principais produtos ou serviços"
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="location" className="text-sm font-medium text-gray-700">4. Localização e abrangência:</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Ex: Nacional, Regional, Local (especifique)"
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="timeInMarket" className="text-sm font-medium text-gray-700">5. Tempo de mercado:</Label>
                <Input
                  id="timeInMarket"
                  name="timeInMarket"
                  value={formData.timeInMarket}
                  onChange={handleChange}
                  placeholder="Ex: 2 anos, 5 anos, etc."
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-100 border-none shadow-xl rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-t from-gray-300 to-gray-400 rounded-t-3xl py-6 px-6">
              <CardTitle className="text-2xl font-semibold text-gray-800">Identidade e Posicionamento</CardTitle>
              <CardDescription>Informações sobre a identidade e posicionamento da marca</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="purpose" className="text-sm font-medium text-gray-700">6. Propósito e missão da marca:</Label>
                <Textarea
                  id="purpose"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  placeholder="Descreva o propósito e missão da empresa"
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="values" className="text-sm font-medium text-gray-700">7. Valores da empresa:</Label>
                <Textarea
                  id="values"
                  name="values"
                  value={formData.values}
                  onChange={handleChange}
                  placeholder="Liste os principais valores da empresa"
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="differentials" className="text-sm font-medium text-gray-700">8. Diferenciais competitivos:</Label>
                <Textarea
                  id="differentials"
                  name="differentials"
                  value={formData.differentials}
                  onChange={handleChange}
                  placeholder="O que diferencia a empresa da concorrência?"
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="toneOfVoice" className="text-sm font-medium text-gray-700">9. Tom de voz e estilo da comunicação:</Label>
                <Input
                  id="toneOfVoice"
                  name="toneOfVoice"
                  value={formData.toneOfVoice}
                  onChange={handleChange}
                  placeholder="Ex: Formal, Descontraído, Técnico, etc."
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="slogan" className="text-sm font-medium text-gray-700">10. Slogan ou frase de impacto (se houver):</Label>
                <Input
                  id="slogan"
                  name="slogan"
                  value={formData.slogan}
                  onChange={handleChange}
                  placeholder="Digite o slogan da empresa"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-100 border-none shadow-xl rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-t from-gray-300 to-gray-400 rounded-t-3xl py-6 px-6">
              <CardTitle className="text-2xl font-semibold text-gray-800">Público e Presença Digital</CardTitle>
              <CardDescription>Informações sobre o público-alvo e presença digital</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="mainAudience" className="text-sm font-medium text-gray-700">11. Público-alvo principal:</Label>
                <Textarea
                  id="mainAudience"
                  name="mainAudience"
                  value={formData.mainAudience}
                  onChange={handleChange}
                  placeholder="Descreva o perfil do público-alvo principal"
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="otherAudiences" className="text-sm font-medium text-gray-700">12. Existe mais de um público? Quais?</Label>
                <Textarea
                  id="otherAudiences"
                  name="otherAudiences"
                  value={formData.otherAudiences}
                  onChange={handleChange}
                  placeholder="Descreva outros públicos relevantes, se houver"
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="channels" className="text-sm font-medium text-gray-700">13. Canais utilizados atualmente:</Label>
                <Input
                  id="channels"
                  name="channels"
                  value={formData.channels}
                  onChange={handleChange}
                  placeholder="Ex: Instagram, Facebook, Site, etc."
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="postFrequency" className="text-sm font-medium text-gray-700">14. Frequência de postagens e campanhas:</Label>
                <Input
                  id="postFrequency"
                  name="postFrequency"
                  value={formData.postFrequency}
                  onChange={handleChange}
                  placeholder="Ex: Diária, Semanal, Mensal, etc."
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="currentResults" className="text-sm font-medium text-gray-700">15. Resultados atuais percebidos:</Label>
                <Textarea
                  id="currentResults"
                  name="currentResults"
                  value={formData.currentResults}
                  onChange={handleChange}
                  placeholder="Descreva os resultados atuais das estratégias de marketing"
                />
              </div>
              <div className="grid gap-3">
                <Label className="text-sm font-medium text-gray-700">Acessos às redes sociais:</Label>

                {formData.accesses.map((access, index) => (
                  <div key={index} className="grid grid-cols-4 gap-2 items-center">
                    <Input
                      placeholder="Canal (ex: Instagram)"
                      value={access.channel}
                      onChange={(e) => handleAccessChange(index, "channel", e.target.value)}
                    />
                    <Input
                      placeholder="Login"
                      value={access.login}
                      onChange={(e) => handleAccessChange(index, "login", e.target.value)}
                    />
                    <Input
                      placeholder="Senha"
                      type="password"
                      value={access.password}
                      onChange={(e) => handleAccessChange(index, "password", e.target.value)}
                    />
                    <div className="flex justify-end">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => removeAccess(index)}
                        className="w-7 h-7 text-xl font-bold p-2 text-zinc-900 border-2 border-red-500 bg-red-300 flex items-center justify-center cursor-pointer"
                        aria-label="Remover acesso"
                      >
                        −
                      </Button>
                    </div>
                  </div>
                ))}

                <div className="flex justify-end mt-2">
                  <Button
                    type="button"

                    onClick={addAccess}
                    className="w-7 h-7 text-xl font-bold p-2 text-zinc-900 bg-green-300 border-2 border-green-500 flex items-center justify-center cursor-pointer"
                    aria-label="Adicionar acesso"
                  >
                    +
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-100 border-none shadow-xl rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-t from-gray-300 to-gray-400 rounded-t-3xl py-6 px-6">
              <CardTitle className="text-2xl font-semibold text-gray-800">Objetivos e Desafios</CardTitle>
              <CardDescription>Informações sobre objetivos e desafios da empresa</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="shortTermGoals" className="text-sm font-medium text-gray-700">16. Objetivos de curto prazo (3 a 6 meses):</Label>
                <Textarea
                  id="shortTermGoals"
                  name="shortTermGoals"
                  value={formData.shortTermGoals}
                  onChange={handleChange}
                  placeholder="Liste os objetivos de curto prazo"
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="longTermGoals" className="text-sm font-medium text-gray-700">17. Objetivos de longo prazo (6 a 12 meses+):</Label>
                <Textarea
                  id="longTermGoals"
                  name="longTermGoals"
                  value={formData.longTermGoals}
                  onChange={handleChange}
                  placeholder="Liste os objetivos de longo prazo"
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="challenges" className="text-sm font-medium text-gray-700">18. Principais desafios enfrentados hoje:</Label>
                <Textarea
                  id="challenges"
                  name="challenges"
                  value={formData.challenges}
                  onChange={handleChange}
                  placeholder="Descreva os principais desafios enfrentados"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-100 border-none shadow-xl rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-t from-gray-300 to-gray-400 rounded-t-3xl py-6 px-6">
              <CardTitle className="text-2xl font-semibold text-gray-800">Recursos e Planejamento</CardTitle>
              <CardDescription>Informações sobre recursos, métricas e planejamento</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="budget" className="text-sm font-medium text-gray-700">19. Orçamento disponível para marketing:</Label>
                <Input
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="Ex: R$ 5.000/mês, R$ 10.000/trimestre, etc."
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="team" className="text-sm font-medium text-gray-700">20. Equipe interna ou terceirizada?:</Label>
                <Input
                  id="team"
                  name="team"
                  value={formData.team}
                  onChange={handleChange}
                  placeholder="Descreva a estrutura da equipe de marketing"
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="indicators" className="text-sm font-medium text-gray-700">21. Indicadores mais acompanhados:</Label>
                <Input
                  id="indicators"
                  name="indicators"
                  value={formData.indicators}
                  onChange={handleChange}
                  placeholder="Ex: Conversões, Engajamento, Tráfego, etc."
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="tools" className="text-sm font-medium text-gray-700">22. Ferramentas de análise utilizadas:</Label>
                <Input
                  id="tools"
                  name="tools"
                  value={formData.tools}
                  onChange={handleChange}
                  placeholder="Ex: Google Analytics, Meta Business Suite, etc."
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="seasonalDates" className="text-sm font-medium text-gray-700">23. Datas sazonais importantes para o negócio:</Label>
                <Textarea
                  id="seasonalDates"
                  name="seasonalDates"
                  value={formData.seasonalDates}
                  onChange={handleChange}
                  placeholder="Liste as datas sazonais importantes"
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="plannedEvents" className="text-sm font-medium text-gray-700">24. Eventos, lançamentos ou ações previstas:</Label>
                <Textarea
                  id="plannedEvents"
                  name="plannedEvents"
                  value={formData.plannedEvents}
                  onChange={handleChange}
                  placeholder="Descreva eventos ou ações planejadas"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="preview">
        <Card className="bg-gray-100 border-none shadow-xl rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-t from-gray-300 to-gray-400 rounded-t-3xl py-6 px-6">
            <div className="flex flex-col gap-2">
              <div>
                <CardTitle className="text-left">Template Preenchido</CardTitle>
                <CardDescription className="text-left">
                  Visualize como ficará o template com as informações preenchidas
                </CardDescription>
              </div>

              <div className="flex gap-2 mt-4 flex-wrap justify-end">
                <label className="flex items-center gap-2 cursor-pointer">
                  <Upload className="w-4 h-4" />
                  <span className="text-sm font-medium text-gray-700">Carregar .txt</span>
                  <input type="file" accept=".txt" onChange={handleFileUpload} className="hidden" />
                </label>

                <Button className="bg-indigo-200 cursor-pointer" onClick={copyToClipboard}>
                  <Clipboard className="mr-2 h-4 w-4" />
                  Copiar
                </Button>
                <Button className="bg-emerald-600 cursor-pointer" onClick={downloadTemplate}>
                  <Download className="mr-2 h-4 w-4" />
                  Baixar
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <ScrollArea className="h-[500px] w-full rounded-md border p-4">
              <pre className="whitespace-pre-wrap text-sm">{generateTemplate(formData)}</pre>
            </ScrollArea>
          </CardContent>
        </Card>
      </TabsContent>
      <div className="flex justify-center mt-6">
        <Button onClick={() => setActiveTab("preview")} className=" bg-gradient-to-t from-indigo-800 to-indigo-600 hover:bg-indigo-800 text-white rounded-3xl cursor-pointer">
          Visualizar Template Gerado
        </Button>
      </div>
    </Tabs>
  )
}