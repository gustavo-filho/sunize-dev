import { InputHTMLAttributes, ComponentType } from 'react'

type Mode = 'light' | 'dark'

export interface InputComponentData
    extends InputHTMLAttributes<HTMLInputElement> {
    text?: string
    mask?: string
    formatChars?: {
        [key: string | number]: string
    }
    maskChar?: any
    mode?: Mode
    icon?: ComponentType
}