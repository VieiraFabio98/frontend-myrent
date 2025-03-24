import { Select, SelectTrigger, SelectContent, SelectGroup, SelectItem, SelectValue } from "@/components/ui/select"
import { Label } from "./ui/label"
import React, { useEffect, useState } from "react"
import { request } from "@/services/api"
import { set } from "react-hook-form"
import { Loader2 } from "lucide-react"

interface Option {
  label: string
  value: string
}

interface CustomSelectProps {
  className?: string
  label?: string
  formName?: string
  control?: any
  isDisabled?: boolean
  form?: any
  url: string
  onChange?: (value: string) => void
}

export default function CustomRequestSelect(props: CustomSelectProps) {
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(false)
  // const [isFetched, setIsFetched] = useState(false)

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response: any = await request('get', props.params ? props.url + '/' + props.params : props.url)
  //       setData(response)
  //     } catch (error) {
  //       console.error("Erro ao buscar dados:", error)
  //     }
  //   }

  //   fetchData()
  // }, [props.params])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response: any = await request('get', props.url)
      setData(response)
      // setIsFetched(true)
      console.log(response)
    } catch (error) {
      console.error("Erro ao buscar dados:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={props.className}>
      <Label 
        htmlFor={props.formName}
        className="text-md font-medium text-secondary mb-2 pl-1"
      >
        {props.label}
      </Label>
      <Select 
        disabled={props.isDisabled}
        {...props.form.register(props.formName)}
        onValueChange={(value) => {
          props.form.setValue(props.formName, value)
          props.onChange && props.onChange(value)
        }}
        onOpenChange={(open) => open && fetchData()}
      >
        <SelectTrigger className="w-full !h-[3rem] border-secondary focus-visible:ring-secondary-darker focus-visible:border-none focus-visible:ring-2 transition-all duration-400 ease-in-out">
          <SelectValue placeholder="Selecione..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {isLoading ? (
              <SelectItem value="null" disabled>
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin h-4 w-4" />
                  Carregando...
                </div>
              </SelectItem>
            ) : (
              data && (data as any[]).map((option: any) => (
                <SelectItem key={option.uf} value={option.id}>
                  {option.nome}
                </SelectItem>
              ))
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
