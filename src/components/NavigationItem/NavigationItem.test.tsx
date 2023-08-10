import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import NavigationItem from "./NavigationItem";
import { HiUser } from "react-icons/hi";
import { BrowserRouter } from "react-router-dom";

describe("<NavigationItem />", () => {
  test("it should mount", () => {
    render(
      <BrowserRouter>
        <NavigationItem
          href="/"
          picto={<HiUser />}
          title="Home"
          onSelect={() => {}}
        />
      </BrowserRouter>
    );

    const navigationItem = screen.getByTestId("NavigationItem");

    expect(navigationItem).toBeInTheDocument();
  });
});
