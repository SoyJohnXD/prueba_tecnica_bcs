export const formatCurrency = (value: string): string => {
  const number = value.replace(/\D/g, "");

  if (number === "") return "";

  return Number(number)
    .toLocaleString("es-CO", {
      maximumFractionDigits: 0,
      useGrouping: true,
    })
    .replace(/,/g, ".");
};

export const cleanFormattedValue = (value: string): string => {
  return value.replace(/\D/g, "");
};
