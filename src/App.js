const Pizza = (props) => {
  return React.createElement("div", {}, [
    React.createElement("h2", {}, props.name),
    React.createElement("p", {}, props.ingredients),
    React.createElement("p", {}, props.price),
  ]);
};

const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "Padre Gino's"),
    React.createElement(Pizza, {
      name: "Pepperoni",
      ingredients: "Pepperoni, cheese, tomato sauce",
      price: "$10.99",
    }),
    React.createElement(Pizza, {
      name: "Margherita",
      ingredients: "Tomato, cheese, basil",
      price: "$9.99",
    }),
    React.createElement(Pizza, {
      name: "Hawaiian",
      ingredients: "Ham, pineapple, cheese, tomato sauce",
      price: "$12.99",
    }),
  ]);
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));
