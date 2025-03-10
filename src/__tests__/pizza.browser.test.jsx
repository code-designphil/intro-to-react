import { render } from "vitest-browser-react";
import { expect, test } from "vitest";
import Pizza from "../components/Pizza";

test("alt text renders on image", async () => {
  const name = "My favorite pizza";
  const src = "https://picsum.photos/200";
  const screen = render(
    <Pizza name={name} description="cool browser stuff" src={src} />,
  );

  const img = screen.getByRole("presentation");
  await expect.element(img).toBeInTheDocument();
  await expect.element(img).toHaveAttribute("src", src);
  await expect.element(img).toHaveAttribute("alt", "");
});
