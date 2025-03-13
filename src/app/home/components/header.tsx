"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import { Home, User } from "lucide-react"

export default function Header({ activeTab, setActiveTab }: any) {
  const router = useRouter()

  return (
    <>
      <header className="font-primary w-full h-[9vh] bg-secondary text-primary p-4 flex items-center justify-between">
        <button 
          onClick={() => router.push("/home")} 
          className="p-2 rounded-md hover:scale-120 transition"
        >
          <Home size={28} />
        </button>

        <div className="flex justify-center flex-1">
          <Tabs >
            <TabsList className="h-[5vh] text-secondary data-[state=active]:text-secondary p-1 rounded-lg flex gap-x-40 px-10">
              <TabsTrigger className="hover:scale-110 transition text-lg data-[state=active]:text-secondary" value="inquilinos" onClick={() => setActiveTab("renters")}>
                Inquilinos
              </TabsTrigger>
              <TabsTrigger className="hover:scale-110 transition text-lg data-[state=active]:text-secondary" value="casas" onClick={() => setActiveTab("houses")}>
                Casas
              </TabsTrigger>
              <TabsTrigger className="hover:scale-110 transition text-lg data-[state=active]:text-secondary" value="contratos" onClick={() => setActiveTab("contracts")}>
                Contratos
              </TabsTrigger>
              <TabsTrigger className="hover:scale-110 transition text-lg data-[state=active]:text-secondary" value="profile" onClick={() => setActiveTab("reports")}>
                Relatórios
              </TabsTrigger>
              <TabsTrigger className="hover:scale-110 transition text-lg data-[state=active]:text-secondary" value="profile" onClick={() => setActiveTab("profile")}>
                <User size={32} />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </header>
    </>
  )
}
