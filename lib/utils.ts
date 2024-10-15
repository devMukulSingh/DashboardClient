import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const base_url_server = `http://localhost:8000/api/v1`

// const token = typeof window !=='undefined' ? JSON.parse(localStorage.getItem('token') || "{}") || "" : '';

export const fetcher = async ([url, key, token]: [url: string, key: string,token : string]) => await fetch(url,{
  headers:{
    'Authorization':token
  }
}).then(res => res.json());


export const useLocalStorage = () => {
  const setInLocalStorage = (key: string, value: any) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }
  const getFromLocalStorage = (key: string) => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem(key) || "{}");
    }
    return {};
  }
  const removeFromLocalStorage = (key: string) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
    }
  }
  return { setInLocalStorage, getFromLocalStorage, removeFromLocalStorage }
}