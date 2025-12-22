export const formatUnitOfMeasurement = (amount: number): string => {
  const absAmount = Math.abs(amount);
  const floorAmount = Math.floor(absAmount);

  if (floorAmount >= 100) return "B";
  else if (floorAmount >= 1) return "M";
  else if (floorAmount >= 0.1) return "K";
  return "";
};
