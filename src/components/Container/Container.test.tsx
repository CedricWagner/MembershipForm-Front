import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Container from "./Container";

describe("<Container />", () => {
  test("it should mount", () => {
    render(
      <Container>
        <p>Content</p>
      </Container>
    );

    const container = screen.getByTestId("Container");

    expect(container).toBeInTheDocument();
  });
});
