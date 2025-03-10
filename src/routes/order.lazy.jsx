import { useContext, useEffect, useState } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { usePriceFormat } from "../hooks/i18n";
import { CartContext } from "../components/contexts";
import Pizza from "../components/pizza";
import Cart from "../components/cart";

export const Route = createLazyFileRoute("/order")({
  component: Order,
});

function Order() {
  const [pizzaTypes, setPizzaTypes] = useState([]);
  const [pizzaType, setPizzaType] = useState("pepperoni");
  const [pizzaSize, setPizzaSize] = useState("M");
  const [cart, setCart] = useContext(CartContext);
  const [loading, setLoading] = useState(true);
  const i18nPriceFormatter = usePriceFormat();

  let price, selectedPizza;

  if (!loading) {
    selectedPizza = pizzaTypes.find((pizza) => pizzaType === pizza.id);
    price = selectedPizza.sizes[pizzaSize];
  }

  async function fetchPizzaTypes() {
    const response = await fetch("/api/pizzas");
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

  async function handleCheckout() {
    setLoading(true);

    await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart }),
    });

    setCart([]);
    setLoading(false);
  }

  return loading ? (
    <div>
      <h2>Loading...</h2>
    </div>
  ) : (
    <div className="order-page">
      <div className="order">
        <h2>Create Order Page</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setCart([
              ...cart,
              { pizza: selectedPizza, size: pizzaSize, price },
            ]);
          }}
        >
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
              name={selectedPizza?.name}
              description={selectedPizza?.description}
              imageSrc={selectedPizza?.image}
            />
            <p>{i18nPriceFormatter.format(price)}</p>
          </div>
        </form>
      </div>
      <Cart cart={cart} checkout={handleCheckout} />
    </div>
  );
}
