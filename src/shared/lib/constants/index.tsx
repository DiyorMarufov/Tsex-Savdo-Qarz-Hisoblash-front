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

export const salesReportrawData = {
  day: [
    { name: "04:00", "Sotuvlar soni": 400, Summa: 1230000 },
    { name: "05:00", "Sotuvlar soni": 400, Summa: 1230000 },
    { name: "06:00", "Sotuvlar soni": 400, Summa: 1230000 },
    { name: "07:00", "Sotuvlar soni": 400, Summa: 1230000 },
    { name: "08:00", "Sotuvlar soni": 400, Summa: 1230000 },
    { name: "09:00", "Sotuvlar soni": 400, Summa: 1230000 },
    { name: "10:00", "Sotuvlar soni": 400, Summa: 1230000 },
    { name: "11:00", "Sotuvlar soni": 400, Summa: 1230000 },
    { name: "12:00", "Sotuvlar soni": 400, Summa: 1230000 },
    { name: "13:00", "Sotuvlar soni": 400, Summa: 1230000 },
  ],
  month: Array.from({ length: 31 }, (_, i) => ({
    name: (i + 1).toString(),
    "Sotuvlar soni": Math.floor(Math.random() * (600 - 200) + 200),
    Summa: Math.floor(Math.random() * (8000000 - 3000000) + 3000000),
  })),
  year: [
    { name: "Yan", "Sotuvlar soni": 4500, Summa: 125000000 },
    { name: "Fev", "Sotuvlar soni": 5200, Summa: 148000000 },
    { name: "Mar", "Sotuvlar soni": 4800, Summa: 135000000 },
    { name: "Apr", "Sotuvlar soni": 6100, Summa: 180000000 },
    { name: "May", "Sotuvlar soni": 7200, Summa: 210000000 },
    { name: "Iyun", "Sotuvlar soni": 6800, Summa: 195000000 },
    { name: "Iyul", "Sotuvlar soni": 7500, Summa: 225000000 },
    { name: "Avg", "Sotuvlar soni": 8200, Summa: 250000000 },
    { name: "Sen", "Sotuvlar soni": 6400, Summa: 185000000 },
    { name: "Okt", "Sotuvlar soni": 5900, Summa: 165000000 },
    { name: "Noy", "Sotuvlar soni": 6700, Summa: 190000000 },
    { name: "Dek", "Sotuvlar soni": 9500, Summa: 310000000 },
  ],
};

export const colorOptions = [
  { value: "white", label: "White", hex: "#FFFFFF" },
  { value: "black", label: "Black", hex: "#000000" },
  { value: "red", label: "Red", hex: "#FF0000" },
  { value: "blue", label: "Blue", hex: "#0000FF" },
  { value: "yellow", label: "Yellow", hex: "#FFFF00" },
  { value: "green", label: "Green", hex: "#008000" },
  { value: "orange", label: "Orange", hex: "#FFA500" },
  { value: "purple", label: "Purple", hex: "#800080" },
  { value: "pink", label: "Pink", hex: "#FFC0CB" },
  { value: "brown", label: "Brown", hex: "#A52A2A" },
  { value: "grey", label: "Grey", hex: "#808080" },

  { value: "navy", label: "Navy Blue", hex: "#000080" },
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
  { value: 4, label: 4 },
  { value: 5, label: 5 },
  { value: 6, label: 6 },
];

export const productSizeOptions = [
  { value: "39-43", label: "39-43" },
  { value: "40-44", label: "40-44" },
];
