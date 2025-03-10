import { render, cleanup } from "@testing-library/react";
import { expect, test, afterEach } from "vitest";
import Pizza from "../components/pizza.jsx";

afterEach(cleanup);

test("alt text renders on pizza image", () => {
  const name = "My Favorite Pizza";
  const src = "https://picsum.photos/200";
  const screen = render(
    <Pizza name={name} description="supper cool pizza" imageSrc={src} />,
  );

  const img = screen.getByRole("presentation");
  expect(img.src).toBe(src);
  expect(img.alt).toBe("");
});

test("to have default image if no imageSrc prop is passed", () => {
  const screen = render(
    <Pizza name={"something else"} description="supper cool pizza" />,
  );

  const img = screen.getByRole("presentation");
  expect(img.src).not.toBe("");
});
