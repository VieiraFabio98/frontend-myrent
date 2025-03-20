import { Input } from "@/components/ui/input"
import { Label } from "./ui/label"
import React from "react"
interface CustomInputProps {
  className?: string
  label?: string
  type?: string
  formName?: "name" | "lastName" | "email" | "phone" | "mobilePhone"
  control?: any
  isDisabled?: boolean
  form?: any
  onChange?: (value: any) => void
  onChangeDebounce?: (value: any) => void
  debounceDelay?: number
  removeRightRound?: boolean
  mask?: string
}

export default function CustomInput(props: CustomInputProps) {
  return (
    <div className={props.className}>
      <Label 
        htmlFor="terms"
        className="text-md font-medium text-secondary mb-2 pl-1 "
      >
        {props.label}
      </Label>
      <Input 
        className="h-[3rem] border-secondary focus-visible:ring-secondary-darker focus-visible:border-none focus-visible:ring-2 transition-all duration-400 ease-in-out" 
        type={props.type} 
        mask={props.mask}
        {...props.form.register(props.formName)}
        disabled={props.isDisabled}
        onInput={(e: React.FormEvent<HTMLInputElement>) => {
          const inputValue = e.currentTarget.value
          if(props.onChange) {
            props.onChange(inputValue)
          }
          // if(props.onChangeDebounce) {
          //   props.debouncedOnChange(inputValue)
          // }
        }}
      />
    </div>
  )
}