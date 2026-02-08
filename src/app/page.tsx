"use client"

import Image from "next/image"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Toaster } from "@/components/ui/sonner"

import { Cadastro } from "@/components/cadastro"
import { SocialMedia } from "@/components/SocialMedia"
import { Design } from "@/components/Design"
import { Trafego } from "@/components/Trafego"

export default function Home() {
  const tabs = [
    { value: "marketing", label: "Cadastro", component: <Cadastro /> },
    { value: "social-media", label: "Social Media", component: <SocialMedia /> },
    { value: "design", label: "Design", component: <Design /> },
    { value: "trafego", label: "Tráfego", component: <Trafego /> },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-stone-900 to-zinc-950 px-4 py-10 sm:px-8">
      {/* Container principal */}
      <div className="mx-auto w-full lg:w-10/12 overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl">

        {/* ==========================
            HEADER PREMIUM
        ========================== */}
        <header className="flex flex-col items-center gap-4 border-b border-white/10 px-6 py-10 text-center sm:px-10">
          <Image
            src="/logovoia.png"
            width={190}
            height={70}
            alt="Logo Voia"
            className="opacity-95"
          />

          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Planejamento Estratégico
          </h1>

          <p className="max-w-xl text-sm text-white/60 sm:text-base">
            Onboarding e estruturação de informações do cliente
          </p>
        </header>

        {/* ==========================
            CONTEÚDO
        ========================== */}
        <main className="px-4 py-8 sm:px-10 sm:py-10">
          <Tabs defaultValue="marketing" className="w-full">
            {/* ==========================
                TABS MODERNAS
            ========================== */}
            <TabsList
              className="
                mx-auto mb-10 grid w-full max-w-3xl h-full grid-cols-4
                rounded-full border border-white/10 bg-white/5 p-1
                shadow-inner backdrop-blur-md
              "
            >
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="
                    rounded-full px-4 py-2 text-sm font-medium cursor-pointer
                    text-white/70 transition-all
                    hover:text-white

                    data-[state=active]:bg-white
                    data-[state=active]:text-zinc-900
                    data-[state=active]:shadow-md
                  "
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* ==========================
                CONTEÚDO DAS ABAS
            ========================== */}
            {tabs.map((tab) => (
              <TabsContent key={tab.value} value={tab.value} className="mt-0">
                <section
                  className="
                    rounded-3xl border border-white/10
                    bg-white/95 p-6 shadow-xl
                    sm:p-10
                  "
                >
                  <h2 className="mb-8 text-2xl font-semibold tracking-tight text-zinc-900">
                    {tab.label}
                  </h2>

                  <div className="text-zinc-700 ">{tab.component}</div>
                </section>
              </TabsContent>
            ))}
          </Tabs>
        </main>
      </div>

      <Toaster />
      
    </div>
  )
}
