import { Select, SelectTrigger, SelectContent, SelectGroup, SelectItem, SelectValue } from "@/components/ui/select"
import { Label } from "./ui/label"
import React, { useEffect, useState } from "react"
import { request } from "@/services/api"

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
  options: { label: string; value: string }[]
  onChange?: (value: string) => void
}

export default function CustomSelect(props: CustomSelectProps) {
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
        onValueChange={(value) => {
          props.form.setValue(props.formName, value)
          props.onChange && props.onChange(value)
        }}
      >
        <SelectTrigger className="w-full !h-[3rem] border-secondary focus-visible:ring-secondary-darker focus-visible:border-none focus-visible:ring-2 transition-all duration-400 ease-in-out">
          <SelectValue placeholder="Selecione..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {(props.options).map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
