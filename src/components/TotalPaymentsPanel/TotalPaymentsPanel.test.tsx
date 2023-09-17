import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TotalPaymentsPanel from "./TotalPaymentsPanel";

describe("<TotalPaymentsPanel />", () => {
  test("it should mount", () => {
    render(<TotalPaymentsPanel dateStart="2023-08-02" dateEnd="2023-08-02" />);

    const totalPaymentsPanel = screen.getByTestId("TotalPaymentsPanel");

    expect(totalPaymentsPanel).toBeInTheDocument();
  });
});
