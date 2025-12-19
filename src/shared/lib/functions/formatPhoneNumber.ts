export const formatPhoneNumber = (phone: string) => {
  const cleaned = ("" + phone).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})$/);
  return match
    ? `+${match[1]} ${match[2]} ${match[3]} ${match[4]} ${match[5]}`
    : phone;
};
