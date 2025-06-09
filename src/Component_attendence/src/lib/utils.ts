
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, isSameDay as dateFnsIsSameDay } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isSameDay(dateLeft: Date, dateRight: Date): boolean {
  return dateFnsIsSameDay(dateLeft, dateRight)
}

export function formatDate(date: Date, formatStr: string = "PPP"): string {
  return format(date, formatStr)
}
