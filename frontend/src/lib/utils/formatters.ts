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

export const maskAccount = (accountNumber: string | number) => {
  if (!String(accountNumber).length) return;
  const lastDigits = String(accountNumber).slice(-4);
  const censured = "*".repeat(String(accountNumber).length - 4);
  return `${censured}${lastDigits}`;
};

export const formatDateToSpanish = (dateString: string) => {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString("es-ES", { month: "long" });
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
};

export const getRandomNumber = (
  min: number = 1000,
  max: number = 9999
): string => {
  return Math.floor(Math.random() * (max - min + 1) + min).toString();
};

export const getRandomAmount = (max = 99999): number => {
  const min = 1000;
  return parseFloat((Math.random() * (max - min) + min).toFixed(0));
};

export const formatNumberWithDots = (number: string): string => {
  return number.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
