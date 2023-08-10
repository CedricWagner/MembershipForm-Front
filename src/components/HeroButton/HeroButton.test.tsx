import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import HeroButton from "./HeroButton";
import { vi } from "vitest";

describe("<HeroButton />", () => {
  test("it should mount", () => {
    render(<HeroButton onClick={vi.fn} title="The title" />);

    const heroButton = screen.getByTestId("HeroButton");

    expect(heroButton).toBeInTheDocument();
  });

  test("it should trigger the function on click", () => {
    const mockFn = vi.fn();

    render(<HeroButton onClick={mockFn} title="The title" />);

    const heroButton = screen.getByTestId("HeroButton");

    fireEvent.click(heroButton);

    expect(mockFn).toBeCalled();
  });

  test("it should contain the additionnal classes", () => {
    render(
      <HeroButton
        onClick={vi.fn()}
        classes={["rounded", "square"]}
        title="The title"
      />
    );

    const heroButton = screen.getByTestId("HeroButton");

    expect(heroButton).toHaveClass("rounded");
  });
});
