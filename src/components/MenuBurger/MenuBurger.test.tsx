import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import MenuBurger from "./MenuBurger";
import { vi } from "vitest";

describe("<MenuBurger />", () => {
  test("it should mount", () => {
    render(<MenuBurger isOpen={true} onToggle={vi.fn()} />);

    const menuBurger = screen.getByRole("button");

    expect(menuBurger).toBeInTheDocument();
  });

  test("it should toggle the open state", () => {
    let isOpen = false;
    const toggle = () => {
      isOpen = !isOpen;
    };

    render(<MenuBurger isOpen={isOpen} onToggle={toggle} />);

    const menuBurger = screen.getByRole("button");

    fireEvent.click(menuBurger);

    expect(isOpen).toBe(true);
  });
});
