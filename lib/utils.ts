import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const base_url_server = process.env.NODE_ENV === 'production' ? 'https://dashboardserver-z9yo.onrender.com' : `http://localhost:8000/api/v1`;

export const fetcher = async ([url, key, token]: [
  url: string,
  key: string,
  token: string,
]) =>
  await fetch(url, {
    headers: {
      Authorization: token,
    },
  }).then((res) => res.json());
