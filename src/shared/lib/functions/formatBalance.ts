export const formatBalance = (amount: string): number => {
  return Number(amount.slice(0, amount.length - 1));
};
