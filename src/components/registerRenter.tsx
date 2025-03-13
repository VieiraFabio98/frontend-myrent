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

export const formSchema = z.object({
  name: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email(),
  phone: z.string().min(10).max(11),
  mobilePhone: z.string().min(10).max(11),

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
      console.log(error)
      // toast({
      //   title: error?.message || "Corrija este campo",
      //   variant: "destructive",
      // })
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
         <div className="grid grid-cols-2 gap-5">
          <Input
              id="register-name"
              type="text"
              {...form.register("name")}
              placeholder="name"
              className="h-[3rem]"
            />
            <Input
              id="register-last-name"
              type="text"
              placeholder="Last Name"
              {...form.register("lastName")}
              className="h-[3rem]"
            />
            <Input
              id="register-password"
              type="text"
              placeholder="email"
              {...form.register("email")}
              className="h-[3rem]"
            />
            <Input
              id="register-password"
              type="text"
              placeholder="phone"
              {...form.register("email")}
              className="h-[3rem]"
            />
            <Input
              id="register-password"
              type="text"
              placeholder="mobilePhone"
              {...form.register("email")}
              className="h-[3rem]"
            />
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

