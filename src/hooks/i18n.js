export function usePriceFormat(currency = "USD") {
  const intl = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  });

  return intl;
}
