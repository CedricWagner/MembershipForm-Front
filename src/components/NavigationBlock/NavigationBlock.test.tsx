import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import NavigationBlock from "./NavigationBlock";
import { HiHome } from "react-icons/hi";
import { BrowserRouter } from "react-router-dom";

describe("<NavigationBlock />", () => {
  test("it should mount", () => {
    render(
      <BrowserRouter>
        <NavigationBlock picto={<HiHome />} href="/" title="Label" />
      </BrowserRouter>
    );

    const navigationBlock = screen.getByTestId("NavigationBlock");

    expect(navigationBlock).toBeInTheDocument();
  });
});
