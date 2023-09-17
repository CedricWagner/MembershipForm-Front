import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import DateRangeFilter from "./DateRangeFilter";

describe("<DateRangeFilter />", () => {
  test("it should mount", () => {
    render(<DateRangeFilter onFilter={() => {}} />);

    const dateRangeFilter = screen.getByTestId("DateRangeFilter");

    expect(dateRangeFilter).toBeInTheDocument();
  });
});
