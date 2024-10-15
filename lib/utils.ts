import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const base_url_server = `http://localhost:8000/api/v1`


export const fetcher = async ([url, key]: [url: string, key: string]) => await fetch(url).then(res => res.json());