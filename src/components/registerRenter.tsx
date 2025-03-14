"use-client"

import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { toast } from "sonner"
import { FieldErrors, useForm } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import CustomInput from "./customInput"
import { Toaster } from "./ui/sonner"

export const formSchema = z.object({
  name: z.string().min(2, "Mínimo de caracteres - 2").max(50, "Máximo de caracteres - 50"),
  lastName: z.string().min(2, "Mínimo de caracteres - 2").max(50, "Máximo de caracteres - 50"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Número de telefone inválido").max(11, "Número de telefone inválido"),
  mobilePhone: z.string().min(10, "Número de celular inválido").max(11, "Número de celular inválido"),

})
export type RenterFormData = z.infer<typeof formSchema>

interface RegisterModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function RegisterRenter({ isOpen, onClose }: RegisterModalProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: RenterFormData) => {
    console.log(data)
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

  const handleRegisterClick = async() => {
    try {
      const response = await fetch("http://localhost:3333/users", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form.getValues())
      })

      if(response.status === 200) {
        toast("Conta criada com sucesso!", {
          description: "Agora você pode fazer login na plataforma.",
          action: {
            label: "Fechar",
            onClick: () => toast.dismiss(),
          },
        })
        onClose()

        setTimeout(() => toast.dismiss(), 3000)
        
      } else {
        console.log("Erro ao criar conta")
      }

    } catch (e) {
      console.log(e)
    }
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
                Cadastrar
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

