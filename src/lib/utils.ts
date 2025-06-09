import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function dateFormatter(date: Date | null) {
  // Return hours, minutes, and seconds
  return date ? date.toLocaleTimeString() : ''
}
