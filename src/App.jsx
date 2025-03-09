import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { CartContext } from "./components/contexts.jsx";
import Header from "./components/header.jsx";
import PizzaOfTheDay from "./components/pizza-of-the-day.jsx";
import Order from "./components/order.jsx";

const App = () => {
  const cartState = useState([]);

  return (
    <StrictMode>
      <CartContext.Provider value={cartState}>
        <div>
          <Header />
          <Order />
          <PizzaOfTheDay />
        </div>
      </CartContext.Provider>
    </StrictMode>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
