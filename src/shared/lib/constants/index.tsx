import type { Option } from "../types";

export const customerRegions: Option[] = [
  {
    value: "Andijan",
    label: "Andijan",
  },
  {
    value: "Bukhara",
    label: "Bukhara",
  },
  {
    value: "Fergana",
    label: "Fergana",
  },
  {
    value: "Jizzakh",
    label: "Jizzakh",
  },
  {
    value: "Kashkadarya",
    label: "Kashkadarya",
  },
  {
    value: "Navoiy",
    label: "Navoiy",
  },
  {
    value: "Namangan",
    label: "Namangan",
  },
  {
    value: "Samarkand",
    label: "Samarkand",
  },
  {
    value: "Surkhandarya",
    label: "Surkhandarya",
  },
  {
    value: "Sirdaryo",
    label: "Sirdaryo",
  },
  {
    value: "Tashkent Region",
    label: "Tashkent Region",
  },
  {
    value: "Tashkent City",
    label: "Tashkent City",
  },
  {
    value: "Khorezm",
    label: "Khorezm",
  },
  {
    value: "Republic of Karakalpakstan",
    label: "Republic of Karakalpakstan",
  },
];

export const roleOptions: Option[] = [
  {
    value: "",
    label: "Barcha rollar",
  },
  {
    value: "admin",
    label: "Admin",
  },
  {
    value: "seller",
    label: "Sotuvchi",
  },
  {
    value: "tsex_manager",
    label: "Tsex boshqaruvchi",
  },
];

export const statusOptions: Option[] = [
  {
    value: "",
    label: "Barcha statuslar",
  },
  {
    value: "true",
    label: "Aktiv",
  },
  {
    value: "false",
    label: "Inaktiv",
  },
];

export const roleUserCreationOptions: Option[] = [
  {
    value: "admin",
    label: "Admin",
  },
  {
    value: "seller",
    label: "Sotuvchi",
  },
  {
    value: "tsex_manager",
    label: "Tsex boshqaruvchi",
  },
];

export const roleTranslationToUzbek: Record<string, string> = {
  admin: "Admin",
  seller: "Sotuvchi",
  tsex_manager: "Tsex boshqaruvchi",
};
