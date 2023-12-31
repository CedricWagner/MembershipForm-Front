export const amountToString = (
  value: number | null | undefined | string
): string => {
  const stringValue = String(value);

  if (stringValue === "NaN" || value == 0 || value == null) {
    return "0";
  }

  return stringValue;
};

export const getFormattedMemberNum = (num: string): string => {
  const year = new Date().getFullYear();

  return year.toString().slice(2, 4) + "-W" + num;
};

export const amountToDecimal = (value: string): number => {
  return parseFloat(value);
};

export const timestampToDate = (value: string): string => {
  return value.substring(0, 10);
};

export const dateToFrFormat = (value: string): string => {
  const date = new Date(value);

  return date.toLocaleDateString("fr-fr", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
};
