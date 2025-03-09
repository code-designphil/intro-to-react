import { useState } from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { CartContext } from "../components/contexts.jsx";
import Header from "../components/header.jsx";
import PizzaOfTheDay from "../components/pizza-of-the-day.jsx";

export const Route = createRootRoute({
  component: () => {
    const cartState = useState([]);

    return (
      <>
        <CartContext.Provider value={cartState}>
          <div>
            <Header />
            <Outlet />
            <PizzaOfTheDay />
          </div>
        </CartContext.Provider>
        <TanStackRouterDevtools />
      </>
    );
  },
});
