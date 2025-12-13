export const formatUnitOfMeasurement = (amount: string): string => {
  return String(amount.split("").at(-1));
};
