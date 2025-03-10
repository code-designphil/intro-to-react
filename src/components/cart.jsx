import { usePriceFormat } from "../hooks/i18n";

export default function Cart({ cart, checkout }) {
  const i18nPriceFormatter = usePriceFormat();

  let total = 0;
  cart.forEach((item) => {
    total += item.price;
  });

  return (
    <div className="cart">
      <h2>Cart</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            <span className="size">{item.size} - </span>
            <span className="type">{item.pizza.name} - </span>
            <span className="price">
              {i18nPriceFormatter.format(item.price)}
            </span>
          </li>
        ))}
      </ul>
      <p>Total: {i18nPriceFormatter.format(total)}</p>
      <button onClick={checkout}>Checkout</button>
    </div>
  );
}
