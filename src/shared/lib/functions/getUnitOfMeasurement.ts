export const getUnitOfMeasurement = (amount: string): string => {
  return String(amount.split("").at(-1));
};
