import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import FormInput from "./FormInput";

describe("<FormInput />", () => {
  test("it should mount", () => {
    render(
      <FormInput label="Test" name="test">
        <input />
      </FormInput>
    );

    const formInput = screen.getByTestId("FormInput");

    expect(formInput).toBeInTheDocument();
  });

  test("it should display error message", () => {
    render(
      <FormInput label="Test" name="test" error={{ type: "required" }}>
        <input />
      </FormInput>
    );

    const formInput = screen.getByText("Ce champ est requis");

    expect(formInput).toBeInTheDocument();
  });
});
