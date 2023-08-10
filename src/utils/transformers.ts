export const amountToString = (
  value: number | null | undefined | string
): string => {
  let stringValue = String(value);

  if (stringValue === "NaN" || value == 0 || value == null) {
    return "0";
  }

  return stringValue;
};

export const amountToDecimal = (value: string): number => {
  return parseFloat(value);
};
