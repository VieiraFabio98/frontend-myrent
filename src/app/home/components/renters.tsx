
import RegisterRenter from "@/components/registerRenter"
import { Button } from "@/components/ui/button"
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
import { request } from "@/services/api"
import { PlusIcon } from "lucide-react"
import { useEffect, useState } from "react"

interface IRentersRequest {
  hasNext: boolean
  items: any
}

interface IRentersResponse {
  id: string
  name: string
  lastName: string
  email: string
  phone: string
  mobilePhone: string
}

export default function Renters() {
  const [isRegisterRenterModalOpen, setRegisterRenterModalOpen] = useState(false)
  const [renters, setRenters] = useState<IRentersResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedRenter, setSelectedRenter] = useState<IRentersResponse| null>(null)


  const handleRegisterClick = () => {
    setRegisterRenterModalOpen(true)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const payload = {
          "search":"",
          "page":"",
          "pageSize":"",
          "order":""
        }

        const response: IRentersRequest = await request('post', '/renters/list', payload)
        setRenters(response.items)
      } catch (error) {
        console.error("Erro ao buscar dados:", error)
      } finally {
        setTimeout(() => {
          setLoading(false)
        }, 500)
      }
    }
  
    fetchData() 
  }, []) 

  if (loading) return <p>Carregando...</p>
  if (error) return <p>Erro ao buscar os dados: {error}</p>

  const handleEditRenter = async (renterId: any) => {
    try {
      const response: any = await request('get', `/renters/${renterId}`)
      console.log(response)
      if(response.statusCode === 200) {
        setSelectedRenter(response.data)
        setRegisterRenterModalOpen(true)
      }

    } catch(err){
      console.log(err)
    }
  }
  

  return (
    <div className="font-primary flex flex-wrap justify-start">
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

      {renters.map((renter, index) => (
        <div key={index} className="p-0 w-[25%]">
          <Card className="m-4 h-48 group flex flex-col">
            <CardHeader className="px-0">
              <CardTitle className="mx-4 border-b border-secondary pb-1">{renter.name}</CardTitle>
              <CardDescription className="mx-4">Algo</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-2">
              <Label>Email: {renter.email}</Label>
              <Label>Telefone: {renter.phone}</Label>
              <Label> Celular: {renter.mobilePhone}</Label>
            </CardContent>
            <CardFooter className="flex justify-around opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:h-56">
              <Button variant="outline" onClick={() => handleEditRenter(renter.id)}>Editar</Button>
              <Button variant="secondary">Info</Button>
              <Button variant="outline">Excluir</Button>
            </CardFooter>
          </Card>
        </div>
      ))}

      <RegisterRenter 
        isOpen={isRegisterRenterModalOpen} 
        onClose={() => {
          setRegisterRenterModalOpen(false) 
          setSelectedRenter(null)
        }} 
        selectRenterData={selectedRenter}
      />
    </div>
  )
}
