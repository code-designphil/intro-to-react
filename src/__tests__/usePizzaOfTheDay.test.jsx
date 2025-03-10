import { expect, test, vi, afterEach } from "vitest";
import { renderHook, waitFor, cleanup } from "@testing-library/react";
import createFetchMock from "vitest-fetch-mock";
import usePizzaOfTheDay from "../hooks/usePizzaOfTheDay";

afterEach(cleanup);

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

const testPizza = {
  id: "calabrese",
  name: "The Calabrese Pizza",
  categroy: "meat",
  description:
    "Spicy salami, red chilies, mozzarella, tomato sauce, and fresh basil.",
  image: "public/pizzas/calabrese.webp",
  size: { S: 12.25, M: 15.5, L: 18.75 },
};

test("gives null when first called", async () => {
  fetchMocker.mockResponseOnce(JSON.stringify(testPizza));
  const { result } = renderHook(() => usePizzaOfTheDay())
  expect(result.current).toBeNull();
});

test("to call the API and give back the pizza of the day", async () => {
  fetchMocker.mockResponseOnce(JSON.stringify(testPizza));
  const { result } = renderHook(() => usePizzaOfTheDay());
  await waitFor(() => expect(result.current).toEqual(testPizza));
  expect(fetchMocker).toBeCalledWith("/api/pizza-of-the-day");
});
