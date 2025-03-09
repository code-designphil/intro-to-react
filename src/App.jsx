import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Header from "./components/header.jsx";
import PizzaOfTheDay from "./components/pizza-of-the-day.jsx";
import Order from "./components/order.jsx";

const App = () => {
  return (
    <StrictMode>
      <div>
        <Header />
        <Order />
        <PizzaOfTheDay />
      </div>
    </StrictMode>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
