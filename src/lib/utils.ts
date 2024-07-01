import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getImageURL(name: string) {
  return new URL(`../assets/triggers/${name}.jpg`, import.meta.url).href;
}
