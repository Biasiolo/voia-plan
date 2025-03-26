"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Cadastro } from "@/components/cadastro"
import { Toaster } from "@/components/ui/sonner"
import { SocialMedia } from "@/components/SocialMedia"
import { Design } from "@/components/Design"
import { Trafego } from "@/components/Trafego"
import Image from "next/image"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 pb-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white shadow-xl overflow-hidden justify-center items-center">

        <div className="bg-gradient-to-b from-gray-400 to-gray-800 p-6 sm:p-10 ">
          <Image
            src="https://voiaagency.com.br/wp-content/uploads/2025/01/logo-voia-svg.webp"
            width={200}
            height={80}
            alt="Logo Voia"
            className="mx-auto mb-3 "
          />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-white drop-shadow-md">
            Planejamento Estratégico
          </h1>

        </div>

        <div className="p-4 sm:p-8 bg-gradient-to-b from-gray-800 to-gray-950">
          <Tabs
            defaultValue="marketing"
            className="w-full bg-transparent"
          >
            <TabsList className="mx-auto grid grid-cols-4 bg-gray-100 rounded-3xl mt-0 mb-8 shadow-inner justify-center items-center">
              {[
                { value: "marketing", label: "Cadastro" },
                { value: "social-media", label: "Social Media" },
                { value: "design", label: "Design" },
                { value: "trafego", label: "Tráfego" }
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="
                  data-[state=active]:bg-gradient-to-b from-indigo-800 to-indigo-600 
                  data-[state=active]:text-white
                  data-[state=active]:shadow-md
                  rounded-3xl
                  transition-all 
                  duration-300 
                hover:bg-indigo-200
                  border-0
                  cursor-pointer
                  "
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {[
              {
                value: "marketing",
                title: "Documento Cadastral do Cliente",
                component: <Cadastro />
              },
              {
                value: "social-media",
                title: "Social Media – Prompts Padrões",
                component: <SocialMedia />
              },
              {
                value: "design",
                title: "Design – Prompts Padrões",
                component: <Design />
              },
              {
                value: "trafego",
                title: "Tráfego – Prompts Padrões",
                component: <Trafego />
              }
            ].map((tab) => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className="mt-0"
              >
                <div className="bg-gray-100 rounded-3xl shadow-lg p-6 sm:p-8">
                  <h2 className="text-2xl font-bold text-zinc-900 mb-6 border-b pb-4 border-gray-200">
                    {tab.title}
                  </h2>
                  {tab.component}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>

      <Toaster />
    </div>
  )
}