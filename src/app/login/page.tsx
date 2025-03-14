"use client"
import { Button } from "@/components/ui/button"
import { FaFacebookF, FaGoogle } from "react-icons/fa"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { useRouter } from 'next/navigation'
import RegisterModal from "@/components/registerModal"
import { Toaster } from "@/components/ui/sonner"
import { request } from "@/services/api"

interface ILoginData {
  token: string
  refreshToken: string
  user: {
    login: string
    locatorId: string
  }
}

export default function Home() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false)

  const handleLoginClick = async () => {
    try {
      const payload = { login: email, password: btoa(password) }
      const response: ILoginData = await request('post', '/sessions', payload)
      
      if(response) {
        localStorage.setItem('token', response.token)
        localStorage.setItem('refreshToken', response.refreshToken)
        localStorage.setItem('login', response.user.login)
        localStorage.setItem('locatorId', response.user.locatorId)
        router.push("/home")
      }
    
    } catch(e) {
      console.log(e)
    }
  }

  function validateLogin(email: string, password: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email) || password.length < 5) {
      return false
    } 

    return true
  }

  const handleRegisterClick = () => {
    // router.push("/register")
    setRegisterModalOpen(true)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-[#CBDCEB] font-primary">
      <Toaster position="top-center"/>
      <main className="flex felx-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-primary rounded-2xl shadow-2xl flex flex-row w-3/4 max-w-4xl">
          <div className="w-5/5 p-5">
            <div className="py-10">
              <h2 className="text-3xl font-bold text-secondary">My Rent W</h2>
              <div className="border-2 w-64 border-secondary-darker inline-block"></div>
              <p className="text-gray-400 my-3">seu aluguel descomplicado</p>
              <div className="flex flex-col items-center">
                <div className="w-3/6 py-2 focus:outline-none">
                  <Input 
                    className="h-10 border-secondary focus-visible:ring-secondary-darker focus-visible:border-none focus-visible:ring-2 transition-all duration-400 ease-in-out"
                    id="email" 
                    type="email" 
                    placeholder="Email"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="w-3/6 py-2 mb-3">
                  <Input 
                    className="h-10 border-secondary focus-visible:ring-secondary-darker focus-visible:border-none focus-visible:ring-2 transition-all duration-400 ease-in-out"
                    id="password" 
                    type="password" 
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="flex justify-between w-3/6 mb-5">
                  <label className="flex items-center text-xs"><Checkbox className="mr-1"></Checkbox>Lembre de mim</label>
                  <a href="#" className="text-xs hover:text-[#4A7BB8]">Esqueceu sua senha ?</a>
                </div>
                <div className="flex justify-between w-3/6 gap-x-4">
                  <Button className="flex-1 h-10 bg-secondary hover:bg-secondary-darker transition duration-300 hover:scale-105" onClick={handleLoginClick}>Entrar</Button>
                  <Button className="flex-1 h-10 bg-secondary hover:bg-secondary-darker transition duration-300 hover:scale-105" onClick={handleRegisterClick}>Cadastrar</Button>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="w-2/5 bg-[#CBDCEB] text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
            <h2 className="text-2xl font-bold">Deseja criar uma conta ?</h2>
            <div className="border-2 w-25 border-white inline-block"></div>
            <p className="mb-2"></p>
            <Button className="bg-[#608BC1] hover:bg-[#4A7BB8] transition-colors duration-100" onClick={handleRegisterClick}>Cadastrar</Button>
          </div> */}
        </div>
      </main>

      <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setRegisterModalOpen(false)} />
      
    </div>
  )
}