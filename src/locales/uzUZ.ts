import type { Locale } from "antd/es/locale";

const uzUZ: Locale = {
  locale: "uz",

  Pagination: {
    items_per_page: "sahifada",
    jump_to: "O‘tish",
    jump_to_confirm: "Tasdiqlash",
    page: "Sahifa",
    prev_page: "Oldingi",
    next_page: "Keyingi",
    prev_5: "Oldingi 5",
    next_5: "Keyingi 5",
    prev_3: "Oldingi 3",
    next_3: "Keyingi 3",
  },

  Table: {
    filterTitle: "Filtr",
    filterConfirm: "OK",
    filterReset: "Tozalash",
    filterEmptyText: "Filtr yo‘q",
    emptyText: "Ma’lumot yo‘q",
    selectAll: "Barchasini tanlash",
    selectInvert: "Teskarisini tanlash",
    selectionAll: "Hamma qatorlarni tanlash",
    sortTitle: "Saralash",
    expand: "Kengaytirish",
    collapse: "Yig‘ish",
    triggerDesc: "Kamayish bo‘yicha saralash",
    triggerAsc: "O‘sish bo‘yicha saralash",
    cancelSort: "Saralashni bekor qilish",
  },

  Modal: {
    okText: "OK",
    cancelText: "Bekor qilish",
    justOkText: "OK",
  },

  Popconfirm: {
    okText: "OK",
    cancelText: "Bekor qilish",
  },

  Transfer: {
    titles: ["Chap", "O‘ng"],
    searchPlaceholder: "Qidirish",
    itemUnit: "ta",
    itemsUnit: "ta",
  },

  Upload: {
    uploading: "Yuklanmoqda...",
    removeFile: "Faylni o‘chirish",
    uploadError: "Yuklashda xatolik",
    previewFile: "Faylni ko‘rish",
    downloadFile: "Yuklab olish",
  },

  Empty: {
    description: "Ma’lumot yo‘q",
  },

  Form: {
    optional: "(ixtiyoriy)",
    defaultValidateMessages: {
      default: "Xatolik mavjud",
      required: "Bu maydon to‘ldirilishi shart",
      enum: "Qiymatlardan biri bo‘lishi kerak: [${enum}]",
      whitespace: "Bo‘sh bo‘lmasligi kerak",
      date: {
        format: "Noto‘g‘ri sana formati",
        parse: "Sanani o‘qib bo‘lmadi",
        invalid: "Noto‘g‘ri sana",
      },
      types: {
        string: "Matn bo‘lishi kerak",
        method: "Funksiya bo‘lishi kerak",
        array: "Massiv bo‘lishi kerak",
        object: "Obyekt bo‘lishi kerak",
        number: "Raqam bo‘lishi kerak",
        date: "Sana bo‘lishi kerak",
        boolean: "Boolean bo‘lishi kerak",
        integer: "Butun son bo‘lishi kerak",
        float: "O‘nlik son bo‘lishi kerak",
        regexp: "Noto‘g‘ri andoza",
        email: "Email noto‘g‘ri",
        url: "URL noto‘g‘ri",
        hex: "Hex format bo‘lishi kerak",
      },
      string: {
        len: "Uzunligi ${len} bo‘lishi kerak",
        min: "Minimum ${min} ta belgi",
        max: "Maksimum ${max} ta belgi",
        range: "Uzunligi ${min}-${max} oralig‘ida bo‘lishi kerak",
      },
      number: {
        len: "Qiymat ${len} bo‘lishi kerak",
        min: "Eng kam qiymat ${min}",
        max: "Eng ko‘p qiymat ${max}",
        range: "Qiymat ${min}-${max} oralig‘ida bo‘lishi kerak",
      },
      array: {
        len: "Elementlar soni ${len} bo‘lishi kerak",
        min: "Kollektsiyada kamida ${min} ta element",
        max: "Kollektsiyada ko‘pi bilan ${max} ta element",
        range: "Elementlar soni ${min}-${max} oralig‘ida bo‘lishi kerak",
      },
      pattern: {
        mismatch: "Andozaga mos kelmadi",
      },
    },
  },

  DatePicker: {
    // @ts-ignore
    lang: {
      placeholder: "Sanani tanlang",
      yearPlaceholder: "Yilni tanlang",
      quarterPlaceholder: "Kvartal tanlang",
      monthPlaceholder: "Oyni tanlang",
      weekPlaceholder: "Haftani tanlang",
      rangePlaceholder: ["Boshlanish", "Tugash"],
      rangeYearPlaceholder: ["Boshlanish yili", "Tugash yili"],
      rangeMonthPlaceholder: ["Boshlanish oyi", "Tugash oyi"],
      rangeQuarterPlaceholder: ["Boshlanish kvartal", "Tugash kvartal"],
      rangeWeekPlaceholder: ["Boshlanish hafta", "Tugash hafta"],
      today: "Bugun",
      now: "Hozir",
      backToToday: "Bugunga qayt",
      ok: "OK",
      clear: "Tozalash",
      month: "Oy",
      year: "Yil",
      timeSelect: "Vaqtni tanlash",
      dateSelect: "Sanani tanlash",
      monthSelect: "Oyni tanlash",
      yearSelect: "Yilni tanlash",
      decadeSelect: "O‘n yillikni tanlash",
      dateFormat: "DD/MM/YYYY",
      dayFormat: "DD",
      dateTimeFormat: "DD/MM/YYYY HH:mm:ss",
      monthBeforeYear: true,
      previousMonth: "Oldingi oy (PageUp)",
      nextMonth: "Keyingi oy (PageDown)",
      previousYear: "Oldingi yil (Control + left)",
      nextYear: "Keyingi yil (Control + right)",
      previousDecade: "Oldingi o‘n yillik",
      nextDecade: "Keyingi o‘n yillik",
      previousCentury: "Oldingi asr",
      nextCentury: "Keyingi asr",
    },
  },

  TimePicker: {
    placeholder: "Vaqtni tanlang",
  },

  Calendar: {
    lang: {
      placeholder: "Sanani tanlang",
      yearPlaceholder: "Yilni tanlang",
      monthPlaceholder: "Oyni tanlang",
      rangePlaceholder: ["Boshlanish", "Tugash"],
    },
  },
};

export default uzUZ;
