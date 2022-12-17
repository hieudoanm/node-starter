export const currencyFormatter = (
  number: number,
  locale: string,
  currency: string,
  minimumFractionDigits: number
): string => {
  if (isNaN(number)) {
    return 'N/A';
  }
  const currencyFormatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits,
    currencyDisplay: 'symbol',
  });
  return currencyFormatter.format(number).replace(/\s/g, '');
};

export const audFormatter = (number: number) => {
  return currencyFormatter(number, 'en', 'AUD', 2);
};

export const eurFormatter = (number: number) => {
  return currencyFormatter(number, 'en', 'EUR', 2);
};

export const gbpFormatter = (number: number) => {
  return currencyFormatter(number, 'en', 'GBP', 2);
};

export const usdFormatter = (number: number) => {
  return currencyFormatter(number, 'en', 'USD', 2);
};

export const vndFormatter = (number: number) => {
  return currencyFormatter(number, 'vi', 'VND', 0);
};

export default currencyFormatter;
