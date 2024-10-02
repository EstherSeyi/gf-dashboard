import toast from "react-hot-toast";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const notify = ({
  message,
  type,
  duration = 4000,
}: {
  message: string | JSX.Element;
  type: "success" | "error";
  duration?: number;
}) =>
  toast[type](message, {
    icon: type === "error" ? "😔" : "👏",
    duration,
  });

export function paginateArray<T>(
  array: T[],
  page: number,
  pageSize: number
): T[] {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return array.slice(startIndex, endIndex);
}
