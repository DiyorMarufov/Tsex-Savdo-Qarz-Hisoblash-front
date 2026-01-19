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
  {
    value: "Kazakhstan",
    label: "Kazakhstan",
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

export const colorOptions = [
  { value: "black", label: "Black", hex: "#000000" },
  { value: "navy", label: "Navy Blue", hex: "#000080" },
  { value: "blue", label: "Blue", hex: "#0000FF" },
  { value: "white", label: "White", hex: "#FFFFFF" },
  { value: "red", label: "Red", hex: "#FF0000" },
  { value: "yellow", label: "Yellow", hex: "#FFFF00" },
  { value: "green", label: "Green", hex: "#008000" },
  { value: "orange", label: "Orange", hex: "#FFA500" },
  { value: "purple", label: "Purple", hex: "#800080" },
  { value: "pink", label: "Pink", hex: "#FFC0CB" },
  { value: "brown", label: "Brown", hex: "#A52A2A" },
  { value: "grey", label: "Grey", hex: "#808080" },

  { value: "beige", label: "Beige", hex: "#F5F5DC" },
  { value: "ivory", label: "Ivory", hex: "#FFFFF0" },
  { value: "khaki", label: "Khaki", hex: "#F0E68C" },
  { value: "charcoal", label: "Charcoal", hex: "#36454F" },
  { value: "silver", label: "Silver", hex: "#C0C0C0" },

  { value: "sky-blue", label: "Sky Blue", hex: "#87CEEB" },
  { value: "turquoise", label: "Turquoise", hex: "#40E0D0" },
  { value: "olive", label: "Olive", hex: "#808000" },
  { value: "mint", label: "Mint", hex: "#98FF98" },
  { value: "lavender", label: "Lavender", hex: "#E6E6FA" },
  { value: "magenta", label: "Magenta", hex: "#FF00FF" },
  { value: "maroon", label: "Maroon", hex: "#800000" },
  { value: "emerald", label: "Emerald", hex: "#50C878" },
  { value: "gold", label: "Gold", hex: "#FFD700" },
  { value: "coral", label: "Coral", hex: "#FF7F50" },

  { value: "light-blue", label: "Light Blue", hex: "#ADD8E6" },
  { value: "dark-green", label: "Dark Green", hex: "#006400" },
  { value: "pale-pink", label: "Pale Pink", hex: "#FADADD" },
  { value: "burgundy", label: "Burgundy", hex: "#800020" },
];

export const productUnitInPackageOptions = [
  { value: 3, label: 3 },
  { value: 4, label: 4 },
  { value: 5, label: 5 },
  { value: 6, label: 6 },
];

export const productSizeOptions = [
  { value: "39-43", label: "39-43" },
  { value: "39-44", label: "39-44" },
  { value: "40-44", label: "40-44" },
  { value: "44-46", label: "44-46" },
  { value: "44-47", label: "44-47" },
];

export const productCategories: Record<string, string> = {
  barsovka: "Barsovka",
  loafers: "Lofer",
  pumps: "Tufli",
  boots: "Etik",
  moccasins: "Mokasin",
  pol_classica: "Pol classica",
  keda: "Keta",
};

export const productMaterialTypes: Record<string, string> = {
  natural_leather: "Tabiiy teri",
  eco_leather: "Eko-teri",
  suede: "Zamsh",
  nubuck: "Nubuk",
  mesh: "Setka",
  drap: "Drap",
};
