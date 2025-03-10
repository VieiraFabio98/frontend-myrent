import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"

interface RegisterModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  const handleRegisterClick = async() => {
    try {
      const response = await fetch("http://localhost:3333/users", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          name: name,
          login: email, 
          password: btoa(password) ,
        })
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
      <DialogContent className="p-6 bg-white rounded-lg shadow-xl">
        <DialogTitle className="text-lg font-semibold">Criar Conta</DialogTitle>
        <div className="flex flex-col gap-3 mt-4">
          <Input
            id="register-name"
            type="name"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            id="register-email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            id="register-password"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button className="w-full bg-[#608BC1] hover:bg-[#4A7BB8] transition-colors duration-100" onClick={handleRegisterClick}>
            Cadastrar
          </Button>
        </div>
        <DialogClose asChild>
          <Button variant="outline">Fechar</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}
