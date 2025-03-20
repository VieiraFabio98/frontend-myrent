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


export const formSchema = z.object({
  name: z.string().min(2, "Mínimo de caracteres - 2").max(50, "Máximo de caracteres - 50"),
  lastName: z.string().min(2, "Mínimo de caracteres - 2").max(50, "Máximo de caracteres - 50"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Número de telefone inválido").max(11, "Número de telefone inválido"),
  mobilePhone: z.string().min(10, "Número de celular inválido").max(11, "Número de celular inválido"),
})
export type RenterFormData = z.infer<typeof formSchema>

interface IRentersResponse {
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
  selectRenterData?: IRentersResponse | null
  onSuccess: () => void
}

export default function RegisterRenter({ isOpen, onClose, selectRenterData, onSuccess }: RegisterModalProps) {
  const [isEdit, setIsEdit] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  useEffect(() => {
    if (selectRenterData) {
      setIsEdit(true)
      form.reset({
        name: selectRenterData.name || "",
        lastName:selectRenterData.lastName || "",
        email: selectRenterData.email || "",
        phone: selectRenterData.phone || "",
        mobilePhone: selectRenterData.mobilePhone || "",
      })
    }
  }, [selectRenterData, form.reset])

  const onSubmit = async () => {
    try {
      const formData = form.getValues()
      const locatorId = localStorage.getItem('locatorId')
      const payload = {...formData, locatorId: locatorId}
      const response: any = isEdit ? 
        await request('put', `/renters/${selectRenterData?.id}`, payload) 
        : 
        await request('post', '/renters', payload)
    
      if (response.statusCode === 200) {
        form.reset()
        onClose()
        onSuccess()
      }
    } catch (e) {
      console.log(e)
    }
  } 

  const onError = (errors: FieldErrors<RenterFormData>) => {
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
        <DialogTitle className="text-lg font-semibold">Cadastrar Inquilino</DialogTitle>
        <form>
         <Toaster theme="light" position="bottom-center"/>
         <div className="grid grid-cols-2 gap-2">
          <CustomInput label="Nome" type="text" formName="name" form={form} control={form.control} />
          <CustomInput label="Sobrenome" type="text" formName="lastName" form={form} control={form.control} />
          <CustomInput label="E-mail" type="text" formName="email" form={form} control={form.control} />
          <CustomInput label="Telefone" type="text" formName="phone" form={form} control={form.control} />
          <CustomInput label="Celular" type="text" formName="mobilePhone" form={form} control={form.control} />
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

