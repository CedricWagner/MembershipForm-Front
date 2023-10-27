import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import FormErrorMessage from "./FormErrorMessage";

describe("<FormErrorMessage />", () => {
  test("it should mount", () => {
    render(<FormErrorMessage>Message</FormErrorMessage>);

    const formErrorMessage = screen.getByTestId("FormErrorMessage");

    expect(formErrorMessage).toBeInTheDocument();
  });
});
