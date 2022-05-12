export const reduceNumberByThousand = (number: number): string => {
  if (number <= 1000) {
    return number.toString();
  }
  return `${(number / 1000).toFixed(1)}K`;
};
