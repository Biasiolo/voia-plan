"use client"

import type React from "react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

import { Clipboard, Download } from "lucide-react"

import { defaultFormData, formSections } from "../data/formFields"

import { generateTemplate } from "../utils/templateGenerator"
import { generateClientDataView } from "../utils/generateClientDataView"

/**
 * Tipagem automática baseada no defaultFormData
 */
type FormData = typeof defaultFormData

export function Cadastro() {
  const [formData, setFormData] = useState<FormData>(defaultFormData)
  const [activeTab, setActiveTab] = useState("form")

  // ==========================
  // HANDLER PADRÃO
  // ==========================
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // ==========================
  // ACESSOS
  // ==========================
  const handleAccessChange = (
    index: number,
    field: "channel" | "login" | "password",
    value: string
  ) => {
    const updated = [...formData.accesses]
    updated[index][field] = value

    setFormData((prev) => ({
      ...prev,
      accesses: updated,
    }))
  }

  const addAccess = () => {
    setFormData((prev) => ({
      ...prev,
      accesses: [...prev.accesses, { channel: "", login: "", password: "" }],
    }))
  }

  const removeAccess = (index: number) => {
    const updated = [...formData.accesses]
    updated.splice(index, 1)

    setFormData((prev) => ({
      ...prev,
      accesses: updated.length
        ? updated
        : [{ channel: "", login: "", password: "" }],
    }))
  }

  // ==========================
  // EXPORT TXT — CADASTRO
  // ==========================
  const copyClientData = () => {
    navigator.clipboard.writeText(generateClientDataView(formData))
    alert("Cadastro completo copiado.")
  }

  const downloadClientData = () => {
    const element = document.createElement("a")

    const file = new Blob([generateClientDataView(formData)], {
      type: "text/plain",
    })

    element.href = URL.createObjectURL(file)
    element.download = `${formData.companyName || "cliente"}_cadastro.txt`

    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  // ==========================
  // EXPORT TXT — TEMPLATE PROMPT
  // ==========================
  const copyTemplate = () => {
    navigator.clipboard.writeText(generateTemplate(formData))
    alert("Template copiado.")
  }

  const downloadTemplate = () => {
    const element = document.createElement("a")

    const file = new Blob([generateTemplate(formData)], {
      type: "text/plain",
    })

    element.href = URL.createObjectURL(file)
    element.download = `${formData.companyName || "cliente"}_template.txt`

    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  // ==========================
  // UI HELPERS
  // ==========================
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

  const isLongField = (label: string) => label.length > 60

  // ==========================
  // RENDER
  // ==========================
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="bg-gradient-to-b from-gray-300 to-gray-500 w-full grid grid-cols-3 rounded-3xl shadow-md mb-8">
        <TabsTrigger value="form" className={triggerClass}>
          Formulário
        </TabsTrigger>

        <TabsTrigger value="client-data" className={triggerClass}>
          Cadastro
        </TabsTrigger>

        <TabsTrigger value="preview" className={triggerClass}>
          Prompt
        </TabsTrigger>
      </TabsList>

      {/* ==========================
          FORMULÁRIO DINÂMICO
      ========================== */}
      <TabsContent value="form">
        <div className="grid gap-8 mb-8 max-w-4xl mx-auto rounded-3xl">
          {formSections.map((section, i) => (
            <Card
              key={i}
              className="bg-gray-100 border-none shadow-xl rounded-3xl overflow-hidden"
            >
              <CardHeader className="bg-gradient-to-t from-gray-300 to-gray-400 py-6 px-6">
                <CardTitle className="text-xl font-semibold text-gray-800">
                  {section.title}
                </CardTitle>

                <CardDescription>
                  Preencha as informações abaixo
                </CardDescription>
              </CardHeader>

              <CardContent className="p-6 space-y-6">
                {section.fields.map((field) => {
                  if (field.name === "accesses") return null

                  return (
                    <div key={field.name} className="grid gap-3">
                      <Label className="text-sm font-medium text-gray-700">
                        {field.label}
                      </Label>

                      {isLongField(field.label) ? (
                        <Textarea
                          name={field.name}
                          value={(formData[field.name] as string) ?? ""}
                          onChange={handleChange}
                          placeholder="Digite sua resposta..."
                        />
                      ) : (
                        <Input
                          name={field.name}
                          value={(formData[field.name] as string) ?? ""}
                          onChange={handleChange}
                          placeholder="Digite aqui..."
                        />
                      )}
                    </div>
                  )
                })}

                {/* BLOCO ESPECIAL: ACESSOS */}
                {section.title === "Presença Digital" && (
                  <div className="grid gap-3 mt-6">
                    <Label className="text-sm font-medium text-gray-700">
                      Acessos às redes sociais:
                    </Label>

                    {formData.accesses.map((access, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-4 gap-2 items-center"
                      >
                        <Input
                          placeholder="Canal"
                          value={access.channel}
                          onChange={(e) =>
                            handleAccessChange(
                              index,
                              "channel",
                              e.target.value
                            )
                          }
                        />

                        <Input
                          placeholder="Login"
                          value={access.login}
                          onChange={(e) =>
                            handleAccessChange(index, "login", e.target.value)
                          }
                        />

                        <Input
                          placeholder="Senha"
                          type="password"
                          value={access.password}
                          onChange={(e) =>
                            handleAccessChange(
                              index,
                              "password",
                              e.target.value
                            )
                          }
                        />

                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => removeAccess(index)}
                          className="border-red-500 bg-red-200"
                        >
                          −
                        </Button>
                      </div>
                    ))}

                    <div className="flex justify-end">
                      <Button
                        type="button"
                        onClick={addAccess}
                        className="bg-green-300 border-green-500"
                      >
                        + Adicionar acesso
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      {/* ==========================
          CADASTRO TXT
      ========================== */}
      <TabsContent value="client-data">
        <Card className="bg-gray-100 border-none shadow-xl rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-t from-gray-300 to-gray-400 py-6 px-6">
            <CardTitle>Cadastro Completo</CardTitle>

            <div className="flex gap-2 mt-4 justify-end flex-wrap">
              <Button onClick={copyClientData}>
                <Clipboard className="mr-2 h-4 w-4" />
                Copiar
              </Button>

              <Button onClick={downloadClientData}>
                <Download className="mr-2 h-4 w-4" />
                Baixar
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <ScrollArea className="h-[500px] w-full rounded-md border p-4 whitespace-pre-wrap">
              <pre>{generateClientDataView(formData)}</pre>
            </ScrollArea>
          </CardContent>
        </Card>
      </TabsContent>

      {/* ==========================
          TEMPLATE PROMPT
      ========================== */}
      <TabsContent value="preview">
        <Card className="bg-gray-100 border-none shadow-xl rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-t from-gray-300 to-gray-400 py-6 px-6">
            <CardTitle>Template Preenchido</CardTitle>

            <div className="flex gap-2 mt-4 justify-end flex-wrap">
              <Button onClick={copyTemplate}>
                <Clipboard className="mr-2 h-4 w-4" />
                Copiar
              </Button>

              <Button onClick={downloadTemplate}>
                <Download className="mr-2 h-4 w-4" />
                Baixar
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <ScrollArea className="h-[500px] w-full rounded-md border p-4">
              <pre className="whitespace-pre-wrap text-sm">
                {generateTemplate(formData)}
              </pre>
            </ScrollArea>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
