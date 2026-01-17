export const formatUnitOfMeasurement = (amount: number): string => {
  const absAmount = Math.abs(amount);
  const floorAmount = Math.floor(absAmount);

  if (floorAmount >= 1000) return "B";
  else if (floorAmount >= 1 && floorAmount <= 999) return "M";
  else if (floorAmount >= 0.1 && floorAmount <= 0.9) return "K";
  return "";
};
