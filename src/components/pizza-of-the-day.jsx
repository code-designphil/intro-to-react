import usePriceFormat from "../hooks/i18n";
import usePizzaOfTheDay from "../hooks/usePizzaOfTheDay";

export default function PizzaOfTheDay() {
  const pizzaOfTheDay = usePizzaOfTheDay();
  const i18nPriceFormatter = usePriceFormat();

  if (!pizzaOfTheDay) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pizza-of-the-day">
      <h2>Pizza of the Day</h2>
      <div>
        <div className="pizza-of-the-day-info">
          <h3>{pizzaOfTheDay.name}</h3>
          <p>{pizzaOfTheDay.description}</p>
          <p className="pizza-of-the-day-price">
            From: {i18nPriceFormatter.format(pizzaOfTheDay.sizes["S"])}
          </p>
        </div>
        <img
          className="pizza-of-the-day-image"
          src={pizzaOfTheDay.image}
          alt=""
        />
      </div>
    </div>
  );
}
