"use-client"

import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { FieldErrors, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import CustomInput from "./customInput"
import { Toaster } from "./ui/sonner"
import { request } from "@/services/api"
import { Label } from "@radix-ui/react-label"
import CustomSelect from "./customSelect"
import CustomRequestSelect from "./customRequestSelect"


export const formSchema = z.object({
  address: z.string().min(1).max(50),
  complement: z.string().min(1).max(50),
  city: z.string().min(1).max(50),
  state: z.string().min(1).max(50),
  zipCode: z.string().min(1).max(50),
  type: z.string().min(1).max(50),
  totalArea: z.string().min(1).max(50),
  usefulArea: z.string().min(1).max(50),
  rooms: z.string().min(1).max(50),
  bathrooms: z.string().min(1).max(50),
  parkingSpaces: z.string().min(1).max(50),
  rentValue: z.string().min(1).max(50),
  condoValue: z.string().min(1).max(50),
  status: z.string().min(1).max(50),
  description: z.string().min(1).max(50),
})
export type HouseFormData = z.infer<typeof formSchema>

interface IHousesResponse {
  id: string
  name: string
  lastName: string
  email: string
  phone: string
  mobilePhone: string
}

interface RegisterModalProps {
  isOpen: boolean
  onClose: () => void
  selectHouseData?: IHousesResponse | null
  onSuccess: () => void
}

export default function RegisterHouse({ isOpen, onClose, selectHouseData, onSuccess }: RegisterModalProps) {
  const [isEdit, setIsEdit] = useState(false)
  const [selectedState, setSelectedState] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  useEffect(() => {
    if (selectHouseData) {
      setIsEdit(true)
      form.reset({
        address: selectHouseData.name || "",
        complement: selectHouseData.lastName || "",
        city: selectHouseData.email || "",
        state: selectHouseData.phone || "",
        zipCode: selectHouseData.mobilePhone || "",
      })
    }
  }, [selectHouseData, form.reset, selectedState])

  const onSubmit = async () => {
    try {
      const formData = form.getValues()
      const locatorId = localStorage.getItem('locatorId')
      const payload = {...formData, locatorId: locatorId}
      console.log(payload)
      // const response: any = isEdit ? 
      //   await request('put', `/houses/${selectHouseData?.id}`, payload) 
      //   : 
      //   await request('post', '/houses', payload)
    
      // if (response.statusCode === 200) {
      //   form.reset()
      //   onClose()
      //   onSuccess()
      // }
    } catch (e) {
      console.log(e)
    }
  } 

  const onError = (errors: FieldErrors<HouseFormData>) => {
    console.log(errors)
    Object.entries(errors).forEach(([field, error]) => {
      toast.warning("Formulário Inválido", {
        description: error?.message || "Corrija este campo.",
        action: {
          label: "Fechar",
          onClick: () => toast.dismiss(),
        },
      })
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-6 bg-white rounded-lg shadow-xl font-primary w-[70%]">
        <DialogTitle className="text-lg font-semibold">Cadastrar Casa</DialogTitle>
        <form>
          <Toaster theme="light" position="bottom-center"/>
          <div className="grid grid-cols-3 gap-2">
            <Label className="col-span-3">Localização</Label>
            <hr className="col-span-3 border-t border-gray-300" />
            <CustomInput label="Endereço" type="text" formName="address" form={form} control={form.control} />
            <CustomInput label="Complemento" type="text" formName="complement" form={form} control={form.control} />
            <CustomRequestSelect 
              label="Estado" 
              formName="state" 
              form={form} 
              url="/state" 
              onChange={(value) => setSelectedState(value)}
            />
            <CustomRequestSelect 
              label="Cidade" 
              formName="city" 
              form={form} 
              url={`/city/${selectedState}`}
            />
            <CustomInput label="CEP" type="text" formName="zipCode" form={form} control={form.control} />
            <Label className="col-span-3 mt-3.5">Especificações</Label>
            <hr className="col-span-3 border-t mb-3 border-gray-300" />
            <CustomSelect label="Tipo" formName="type" form={form} 
              options={[
                { label: "Casa", value: "casa" },
                { label: "Apartamento", value: "apartamento" },
                { label: "Studio", value: "studio" }
              ]}
            />
            <CustomInput label="Área Total" type="text" formName="totalArea" form={form} control={form.control} />
            <CustomInput label="Área Útil" type="text" formName="usefulArea" form={form} control={form.control} />
            <CustomInput label="Quartos" type="text" formName="rooms" form={form} control={form.control} />
            <CustomInput label="Banheiros" type="text" formName="bathrooms" form={form} control={form.control} />
            <CustomInput label="Vagas de Garagem" type="text" formName="parkingSpaces" form={form} control={form.control} />
            <CustomInput label="Valor do Aluguel" type="text" formName="rentValue" form={form} control={form.control} />
            <CustomInput label="Valor do Condomínio" type="text" formName="condoValue" form={form} control={form.control} />
            <CustomInput label="Status" type="text" formName="status" form={form} control={form.control} />
            <CustomInput label="Descrição" type="text" formName="description" form={form} control={form.control} />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Button type="button" className="w-full bg-[#608BC1] hover:bg-[#4A7BB8] transition-colors duration-100" onClick={form.handleSubmit(onSubmit, onError)}>
                {isEdit ? "Atualizar" : "Cadastrar"}
              </Button>
            <DialogClose asChild>
              <Button className="w-full" variant="outline">Fechar</Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

