import { createRoot } from "react-dom/client";
import Pizza from "./components/pizza.jsx";

const App = () => {
  return (
    <div>
      <h1>Padre Gino's</h1>
      <Pizza
        key={0}
        name="Pepperoni"
        description="Pepperoni, cheese, tomato sauce"
        imageSrc="public/pizzas/pepperoni.webp"
      />
      <Pizza
        key={1}
        name="Margherita"
        description="Tomato, cheese, basil"
        imageSrc="public/pizzas/mediterraneo.webp"
      />
      <Pizza
        key={2}
        name="Hawaiian"
        description="Ham, pineapple, cheese, tomato sauce"
        imageSrc="public/pizzas/hawaiian.webp"
      />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
