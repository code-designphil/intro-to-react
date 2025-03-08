import { createRoot } from "react-dom/client";
import Pizza from "./pizza.jsx";

const App = () => {
  return (
    <div>
      <h1>Padre Gino's</h1>
      <Pizza
        key={0}
        name="Pepperoni"
        ingredients="Pepperoni, cheese, tomato sauce"
        price="$10.99"
      />
      <Pizza
        key={1}
        name="Margherita"
        ingredients="Tomato, cheese, basil"
        price="$9.99"
      />
      <Pizza
        key={2}
        name="Hawaiian"
        ingredients="Ham, pineapple, cheese, tomato sauce"
        price="$12.99"
      />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
