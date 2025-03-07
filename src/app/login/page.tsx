"use client"
import { Button } from "@/components/ui/button"
import { FaFacebookF, FaGoogle } from "react-icons/fa"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { useRouter } from 'next/navigation'
import RegisterModal from "@/components/registerModal"
import { Toaster } from "@/components/ui/sonner"

export default function Home() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false)

  const handleLoginClick = async () => {
    // const valid = validateLogin(email, password)
   
    // if(!valid) {
    //   return
    // }

    try {
      console.log('aqui')
      const response = await fetch("http://localhost:3333/sessions", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ login: email, password: btoa(password) })
      })

      if(response.status === 200) {
        const data = await response.json()
        localStorage.setItem("token", data.token)
        localStorage.setItem("refreshToken", data.refreshToken)
        localStorage.setItem("user", JSON.stringify(data.user))
      } else {
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
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-[#f5f5eae5]">
      <Toaster position="top-center"/>
      <main className="flex felx-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-[#F3F3E0] rounded-2xl shadow-2xl flex flex-row w-2/3 max-w-4xl">
          <div className="w-3/5 p-5">
            <div className="text-left font-bold text-2xl"><span className="text-[#608BC1]">My</span> Rent</div>
            <div className="py-10">
              <h2 className="text-3xl font-bold text-[#608BC1]">Login</h2>
              <div className="border-2 w-30 border-[#608BC1] inline-block"></div>
              <div className="flex justify-center my-2">
                <a href="" className="border-2 border-gray-200 rounded-full p-3 mx-1">
                  <FaFacebookF className="text-1xl " />
                </a>
                <a href="" className="border-2 border-gray-200 rounded-full p-3 mx-1">
                  <FaGoogle className="text-1xl " />
                </a>
              </div>
              <p className="text-gray-400 my-3">ou use seu email</p>
              <div className="flex flex-col items-center">
                <div className="w-64 py-2">
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Email"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="w-64 py-2 mb-3">
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="flex justify-between w-64 mb-5">
                  <label className="flex items-center text-xs"><Checkbox className="mr-1"></Checkbox>Lembre de mim</label>
                  <a href="#" className="text-xs hover:text-[#4A7BB8]">Esqueceu sua senha ?</a>
                </div>
                <div className="flex justify-between w-64 gap-x-4">
                  <Button className="w-32 bg-[#608BC1] hover:bg-[#4A7BB8] transition-colors duration-100" onClick={handleLoginClick}>Entrar</Button>
                  <Button className="w-32 bg-[#608BC1] hover:bg-[#4A7BB8] transition-colors duration-100" onClick={handleRegisterClick}>Cadastrar</Button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-2/5 bg-[#CBDCEB] text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
            <h2 className="text-2xl font-bold">Deseja criar uma conta ?</h2>
            <div className="border-2 w-25 border-white inline-block"></div>
            <p className="mb-2"></p>
            <Button className="bg-[#608BC1] hover:bg-[#4A7BB8] transition-colors duration-100" onClick={handleRegisterClick}>Cadastrar</Button>
          </div>
        </div>
      </main>

      <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setRegisterModalOpen(false)} />
      
    </div>
  )
}