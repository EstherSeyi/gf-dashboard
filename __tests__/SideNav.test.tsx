import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import SideNav from "../src/components/layout/Sidenav";

const pageLinks = ["Dashboard", "Add Contact"];

test("SideNav", () => {
  render(<SideNav />);

  const navLinks = screen.getAllByRole("link");

  navLinks.forEach((link, index) => {
    expect(link).toHaveTextContent(pageLinks[index]);
  });

  expect(screen.getAllByRole("link").length).toBe(2);
});
