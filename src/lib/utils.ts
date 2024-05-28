import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface ItemProps {
  keyValue : string,
  task : string,
}

export const getItems = () => {
  const localItems: ItemProps[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && !isNaN(Number(key))) {
      const item = localStorage.getItem(key);
      if (item) {
        localItems.push({ keyValue: key, task: String(item) });
      }
    }
  }
  return localItems
};