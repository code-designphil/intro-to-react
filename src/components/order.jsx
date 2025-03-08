import { useEffect, useState } from "react";
import Pizza from "./pizza";

const intl = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Order() {
  const [pizzaTypes, setPizzaTypes] = useState([]);
  const [pizzaType, setPizzaType] = useState("Pepperoni");
  const [pizzaSize, setPizzaSize] = useState("M");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let price, selectedPizza;

  if (!loading) {
    selectedPizza = pizzaTypes.find((pizza) => pizzaType === pizza.id);
  }

  async function fetchPizzaTypes() {
    await new Promise((resolve) => setTimeout(resolve, 10000));

    const response = await fetch("/api/pizzas");
    if (!response.ok) {
      setLoading(false);
      throw new Error(
        `Failed to fetch pizza types. \n Status ${response.status} \n Reason: ${response.statusText}`,
      );
    }
    const data = await response.json();
    setPizzaTypes(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchPizzaTypes();
  }, []);

  function handleChangePizzaSize(e) {
    setPizzaSize(e.target.value);
  }

  return loading ? (
    <div>
      <h2>Loading...</h2>
    </div>
  ) : (
    <div className="order">
      <h2>Create Order Page</h2>
      <form>
        <div>
          <div>
            <label htmlFor="pizza-type">Pizza Type</label>
            <select
              id="pizza-type"
              name="pizza-type"
              value={pizzaType}
              onChange={(e) => setPizzaType(e.target.value)}
            >
              {pizzaTypes.map((pizza) => (
                <option key={pizza.id} value={pizza.id}>
                  {pizza.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="pizza-size">Pizza Size</label>
            <div>
              <span>
                <input
                  checked={pizzaSize === "S"}
                  type="radio"
                  name="pizza-size"
                  value="S"
                  id="pizza-size-s"
                  onChange={handleChangePizzaSize}
                />
                <label htmlFor="pizza-size-s">Small</label>
              </span>
              <span>
                <input
                  checked={pizzaSize === "M"}
                  type="radio"
                  name="pizza-size"
                  value="M"
                  id="pizza-size-m"
                  onChange={handleChangePizzaSize}
                />
                <label htmlFor="pizza-size-m">Medium</label>
              </span>
              <span>
                <input
                  checked={pizzaSize === "L"}
                  type="radio"
                  name="pizza-size"
                  value="L"
                  id="pizza-size-l"
                  onChange={handleChangePizzaSize}
                />
                <label htmlFor="pizza-size-l">Large</label>
              </span>
            </div>
          </div>
          <button type="submit">Add to Cart</button>
        </div>
        <div className="order-pizza">
          <Pizza
            key={0}
            name="Pepperoni"
            description="Pepperoni, cheese, tomato sauce"
            imageSrc="public/pizzas/pepperoni.webp"
          />
          <p>$9.90</p>
        </div>
      </form>
    </div>
  );
}
