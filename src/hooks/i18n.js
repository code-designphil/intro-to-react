export default function usePriceFormat(_currency = "USD") {
  const intl = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: _currency,
  });

  return intl;
}
