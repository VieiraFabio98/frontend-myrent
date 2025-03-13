
import RegisterRenter from "@/components/registerRenter"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PlusIcon } from "lucide-react"
import { useState } from "react"

export default function Renters() {
  const [isRegisterRenterModalOpen, setRegisterRenterModalOpen] = useState(false)

  const handleRegisterClick = () => {
    setRegisterRenterModalOpen(true)
  }

  return (
    <div className="font-primary flex flex-wrap justify-start ">
      <div className="w-[25%]">
        <Card
          className="m-4 h-48 flex flex-col items-center justify-center group cursor-pointer transition-transform duration-500 hover:scale-105 border-2  hover:border-blue-500"
          onClick={() => handleRegisterClick()}
        >
          <CardHeader className="hover:scale-110 px-0 flex justify-center">
            <div className="m-0 p-0 flex justify-center">
              <PlusIcon size={65} className="transition-transform duration-200 group-hover:scale-120" />
            </div>
          </CardHeader>
          <CardContent className="transition-transform duration-200 group-hover:scale-110">
            Adicionar Inquilino
          </CardContent>
        </Card>
      </div>
      
      {[...Array(4)].map((_, index) => (
        <div key={index} className="p-0 w-[25%]">
          <Card className="m-4 h-48">
            <CardHeader className="px-0">
              <div className="m-0 p-0">
                <PlusIcon size={48} />
              </div>
            </CardHeader>
            <CardContent>Adicionar Inquilino</CardContent>
          </Card>
        </div>
      ))}

      <RegisterRenter isOpen={isRegisterRenterModalOpen} onClose={() => setRegisterRenterModalOpen(false)} />
    </div>
  )
}
