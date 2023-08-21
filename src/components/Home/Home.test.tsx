import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Home from "./Home";
import { BrowserRouter } from "react-router-dom";

describe("<Home />", () => {
  test("it should mount", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const home = screen.getByTestId("Home");

    expect(home).toBeInTheDocument();
  });
});
