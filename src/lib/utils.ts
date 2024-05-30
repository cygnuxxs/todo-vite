import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ItemProps {
  keyValue: string;
  task: {
    task_name: string;
    isClicked: boolean;
  };
}

export const getItems = (): ItemProps[] => {
  const localItems: ItemProps[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && !isNaN(Number(key))) {
      const item = localStorage.getItem(key);
      if (item) {
        try {
          const parsedItem = JSON.parse(item);
          if (
            typeof parsedItem === "object" &&
            parsedItem !== null &&
            'task_name' in parsedItem &&
            'isClicked' in parsedItem
          ) {
            localItems.push({ keyValue: key, task: parsedItem });
          }
        } catch (e) {
          console.error("Error parsing item from localStorage", e);
        }
      }
    }
  }
  return localItems;
};

