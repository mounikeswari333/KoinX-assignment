const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

const compactCurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 2,
});

const COMPACT_THRESHOLD = 1000;

export const formatINR = (value) => currencyFormatter.format(value);

export const formatCompactINR = (value) => {
  if (Math.abs(value) < COMPACT_THRESHOLD) {
    return formatINR(value);
  }
  return compactCurrencyFormatter.format(value);
};

export const formatSignedINR = (value) => {
  const absValue = Math.abs(value);
  const formatted = currencyFormatter.format(absValue);
  if (value > 0) return `+${formatted}`;
  if (value < 0) return `-${formatted}`;
  return formatted;
};

export const formatSignedCompactINR = (value) => {
  const absValue = Math.abs(value);
  const formatted =
    absValue < COMPACT_THRESHOLD
      ? currencyFormatter.format(absValue)
      : compactCurrencyFormatter.format(absValue);

  if (value > 0) return `+${formatted}`;
  if (value < 0) return `-${formatted}`;
  return formatted;
};

export const getHoverCurrencyText = (value) => {
  return formatINR(value);
};

export const getHoverSignedCurrencyText = (value) => {
  return formatINR(value);
};

export const formatAssetAmount = (value) => {
  if (!Number.isFinite(value)) return "-";
  if (value === 0) return "0";
  if (Math.abs(value) >= 1)
    return value.toLocaleString("en-US", { maximumFractionDigits: 4 });
  return value.toLocaleString("en-US", { maximumFractionDigits: 8 });
};
