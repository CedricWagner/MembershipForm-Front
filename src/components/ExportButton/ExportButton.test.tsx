import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ExportButton from "./ExportButton";

describe("<ExportButton />", () => {
  test("it should mount", () => {
    render(
      <ExportButton dateStart="1990-08-14" dateEnd="2023-08-14">
        Export
      </ExportButton>
    );

    const exportButton = screen.getByTestId("ExportButton");

    expect(exportButton).toBeInTheDocument();
  });
});
