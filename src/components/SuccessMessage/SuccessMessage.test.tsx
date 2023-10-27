import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SuccessMessage from "./SuccessMessage";

describe("<SuccessMessage />", () => {
  test("it should mount", () => {
    render(<SuccessMessage>Message</SuccessMessage>);

    const successMessage = screen.getByTestId("SuccessMessage");

    expect(successMessage).toBeInTheDocument();
  });
});
