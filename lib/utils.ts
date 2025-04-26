import { workCardsColors } from "@/constants";
import { workCardsData } from "@/constants/ourWorkData";
import { WorkCardColorKey } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const GetWorkColors = (ItemColor: string) => {
  const itemColor = ItemColor as WorkCardColorKey;
  const colors = workCardsColors[itemColor] || {
    textColor: "black",
    textBg: "black",
  };
  return {
    bgColor: colors.textBg,
    textColor: colors.textColor,
  };
};

export const searchSchema = z.object({
  search: z
    .string()
    .min(2, {
      message: "search text must be at least 2 characters.",
    })
    .optional(),
});

export const typeOptions = [
  "all",
  "shell",
  "mobil",
  "castrol",
  "الميكانيكا",
  "الكهرباء",
  "العفشة",
] as const;

export type TypeOption = (typeof typeOptions)[number];

export const FilterFormSchema = z.object({
  search: z.string().optional(),
  type: z.enum(typeOptions).optional(),
  range: z.array(z.number()).length(2).optional(),
  rangeFrom: z.number().min(0).optional(),
  rangeTo: z.number().min(0).optional(),
});

//todo: check is used or not
export const getWorkCardsData = () => {
  return workCardsData;
};

export const getDiscountedPrice = (
  price: number,
  discountPercentage: number
) => {
  const discount = price * (discountPercentage / 100);
  return price - discount;
};

export const slugify = (text: string) => {
  return text
    .toString()
    .replace(/[أإآ]/g, "ا") // حوّل أ/إ/آ لـ ا
    .replace(/[ى]/g, "ي") // حوّل ى لـ ي
    .replace(/\s+/g, "-") // استبدل المسافات بـ -
    .replace(/[^\u0600-\u06FF\w\-]+/g, "") // اسمح بالحروف العربية والإنجليزية والـ -
    .replace(/\-\-+/g, "-") // شيل الـ -- المتكرر
    .trim();
};
