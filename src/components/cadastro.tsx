"use client"

import type React from "react"
import { useState } from "react"

import jsPDF from "jspdf"

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

import { Clipboard, Download, Trash2, Plus } from "lucide-react"

import { defaultFormData, formSections } from "../data/formFields"
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
  // COPIAR CADASTRO
  // ==========================
  const copyClientData = () => {
    navigator.clipboard.writeText(generateClientDataView(formData))
    alert("Cadastro completo copiado.")
  }

  // ==========================
  // EXPORTAR PDF
  // ==========================
  const downloadClientPDF = () => {
    const doc = new jsPDF()
    let y = 20

    doc.setFont("helvetica", "bold")
    doc.setFontSize(18)
    doc.text("Cadastro do Cliente", 14, y)

    y += 12
    doc.setFontSize(11)
    doc.setFont("helvetica", "normal")

    doc.text(
      `Empresa: ${formData.companyName || "Não informado"}`,
      14,
      y
    )

    y += 10
    doc.setDrawColor(200)
    doc.line(14, y, 195, y)
    y += 12

    formSections.forEach((section) => {
      if (y > 270) {
        doc.addPage()
        y = 20
      }

      doc.setFont("helvetica", "bold")
      doc.setFontSize(13)
      doc.text(section.title, 14, y)

      y += 8

      section.fields.forEach((field) => {
        if (field.name === "accesses") return

        const value = (formData[field.name] as string) || "Não informado"

        doc.setFont("helvetica", "normal")
        doc.setFontSize(10)

        doc.text(`${field.label}:`, 16, y)
        y += 5

        const wrapped = doc.splitTextToSize(value, 170)
        doc.text(wrapped, 18, y)

        y += wrapped.length * 5 + 6
      })

      y += 8
    })

    if (formData.accesses.length > 0) {
      doc.setFont("helvetica", "bold")
      doc.setFontSize(13)
      doc.text("Acessos às Redes Sociais", 14, y)

      y += 8

      formData.accesses.forEach((acc) => {
        doc.setFont("helvetica", "normal")
        doc.setFontSize(10)

        doc.text(
          `• ${acc.channel} | Login: ${acc.login} | Senha: ${acc.password}`,
          16,
          y
        )

        y += 6
      })
    }

    doc.save(`${formData.companyName || "cliente"}_cadastro.pdf`)
  }

  // ==========================
  // UI Helpers
  // ==========================
  const triggerClass = `
    data-[state=active]:bg-gradient-to-b from-teal-800 to-teal-600 
    data-[state=active]:text-white
    data-[state=active]:shadow-md
    rounded-t-3xl
    transition-all 
    duration-300 
    hover:bg-orange-200
    border-0
    cursor-pointer
    text-md
    uppercase
  `

  const isLongField = (label: string) => label.length > 60

  // ==========================
  // RENDER
  // ==========================
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      {/* ===== ABAS ===== */}
      <TabsList className="w-full grid grid-cols-2 bg-gray-100 rounded-t-3xl shadow-inner mb-10 ">
        <TabsTrigger value="form" className={triggerClass} >
          Formulário
        </TabsTrigger>

        <TabsTrigger value="client-data" className={triggerClass}>
          Cadastro Final
        </TabsTrigger>
      </TabsList>

      {/* ==========================
          FORMULÁRIO
      ========================== */}
      <TabsContent value="form">
        <div className="grid gap-10 max-w-6xl mx-auto rounded-3xl">
          {formSections.map((section, i) => (
            <Card
              key={i}
              className="bg-gray-100 border-none shadow-xl rounded-3xl overflow-hidden"
            >
              <CardHeader className="bg-gradient-to-b from-gray-200 to-gray-300 px-8 py-6 rounded-t-3xl">
                <CardTitle className="text-xl font-bold text-gray-900">
                  {section.title}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Preencha com atenção para gerar o planejamento completo.
                </CardDescription>
              </CardHeader>

              <CardContent className="p-8 space-y-6">
                {section.fields.map((field) => {
                  if (field.name === "accesses") return null

                  return (
                    <div key={field.name} className="grid gap-2">
                      <Label className="text-md font-medium text-teal-900">
                        {field.label}
                      </Label>

                      {isLongField(field.label) ? (
                        <Textarea
                          name={field.name}
                          value={(formData[field.name] as string) ?? ""}
                          onChange={handleChange}
                          placeholder="Digite sua resposta..."
                          className="rounded-xl min-h-[120px]"
                        />
                      ) : (
                        <Input
                          name={field.name}
                          value={(formData[field.name] as string) ?? ""}
                          onChange={handleChange}
                          placeholder="Digite aqui..."
                          className="rounded-xl h-11"
                        />
                      )}
                    </div>
                  )
                })}

                {/* BLOCO ESPECIAL: ACESSOS */}
                {section.title === "Presença Digital" && (
                  <div className="mt-10 space-y-4">
                    <Label className="text-base font-semibold text-gray-800">
                      Acessos às redes sociais
                    </Label>

                    {formData.accesses.map((access, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-4 gap-3 items-center"
                      >
                        <Input
                          placeholder="Canal"
                          value={access.channel}
                          onChange={(e) =>
                            handleAccessChange(index, "channel", e.target.value)
                          }
                          className="rounded-xl"
                        />

                        <Input
                          placeholder="Login"
                          value={access.login}
                          onChange={(e) =>
                            handleAccessChange(index, "login", e.target.value)
                          }
                          className="rounded-xl"
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
                          className="rounded-xl"
                        />

                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => removeAccess(index)}
                          className="rounded-xl border-red-400 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    ))}

                    <Button
                      type="button"
                      onClick={addAccess}
                      className="rounded-xl bg-indigo-600 hover:bg-indigo-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar acesso
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      {/* ==========================
          CADASTRO FINAL + PDF
      ========================== */}
      <TabsContent value="client-data">
        <Card className="bg-gray-100 border-none shadow-xl rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-b from-gray-200 to-gray-300 px-8 py-6">
            <CardTitle className="text-xl font-bold">
              Cadastro Completo
            </CardTitle>

            <div className="flex gap-3 mt-6 justify-end flex-wrap">
              <Button
                onClick={copyClientData}
                className="rounded-xl bg-orange-300 hover:bg-orange-500 cursor-pointer"
              >
                <Clipboard className="mr-2 h-4 w-4" />
                Copiar
              </Button>

              <Button
                onClick={downloadClientPDF}
                className="rounded-xl bg-emerald-400 hover:bg-emerald-500 cursor-pointer"
              >
                <Download className="mr-2 h-4 w-4" />
                Baixar PDF
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <ScrollArea className="h-[520px] w-full rounded-xl border bg-white p-5 whitespace-pre-wrap">
              <pre className="text-sm text-gray-800 leading-relaxed">
                {generateClientDataView(formData)}
              </pre>
            </ScrollArea>
          </CardContent>
        </Card>
      </TabsContent>
      <div className="flex justify-center mt-10">
  <Button
    onClick={() => setActiveTab("client-data")}
    className="bg-gradient-to-t from-teal-800 to-teal-600 
               hover:opacity-80 
               text-white 
               rounded-3xl 
               px-8 
               py-6 
               text-base 
               font-semibold 
               shadow-lg 
               transition-all
               cursor-pointer"
  >
    Visualizar Cadastro Gerado →
  </Button>
</div>
    </Tabs>
    
  )
  
}
