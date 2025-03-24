import RegisterHouse from "@/components/registerHouse";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { request } from "@/services/api";
import { Label } from "@radix-ui/react-label";
import { LoaderCircle, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface IHousesRequest {
  hasNext: boolean
  items: any
}

interface IHousesResponse {
  id: string
  name: string
  lastName: string
  email: string
  phone: string
  mobilePhone: string
}


export default function Houses() {
  const [isRegisterRenterModalOpen, setRegisterHousesModalOpen] = useState(false)
  const [loadingRequest, setLoadingRequest] = useState(true)
  const [houses, setHouses] = useState<IHousesResponse[]>([])
  const [selectedHouse, setSelectedHouse] = useState<IHousesResponse| null>(null)
  const [reload, setReload] = useState(false)

  const triggerReload = () => {
    setReload((prev) => !prev)
    setLoadingRequest(true)
  }

  const handleRegisterClick = () => {
    setRegisterHousesModalOpen(true)
  }

  const handleEditHouse = async (renterId: any) => {
    try {
      const response: any = await request('get', `/renters/${renterId}`)

      if(response.statusCode === 200) {
        setSelectedHouse(response.data)
        setRegisterHousesModalOpen(true)
      }

    } catch(err){
      console.log(err)
    }
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
          const locatorId = localStorage.getItem('locatorId')
          const response: IHousesRequest = await request('post', `/renters/list/${locatorId}`, payload)
          setHouses(response.items)
        } catch (error) {
          console.error("Erro ao buscar dados:", error)
        } finally {
          setTimeout(() => {
            setLoadingRequest(false)
          }, 500)
        }
      }
    
      fetchData() 
    }, [reload])
  
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
            Adicionar Casa
          </CardContent>
        </Card>
      </div>

      {loadingRequest ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <LoaderCircle className="h-32 w-32 animate-spin" />
        </div>
        ) : (
        houses.map((renter, index) => (
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
                <Button variant="outline" onClick={() => handleEditHouse(renter.id)}>Editar</Button>
                <Button variant="secondary">Info</Button>
                <Button variant="outline">Excluir</Button>
              </CardFooter>
            </Card>
          </div>
        ))
      )}

      <RegisterHouse
        isOpen={isRegisterRenterModalOpen} 
        onClose={() => {
          setRegisterHousesModalOpen(false) 
          setSelectedHouse(null)
        }} 
        selectHouseData={selectedHouse}
        onSuccess={triggerReload}
        />
      
    </div>
  )
}