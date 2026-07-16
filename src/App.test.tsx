import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import App from "./App";

describe("App component", () => {
  it("renders without crashing", () => {
    render(<App />);
  });

  it("has no detectable accessibility violations", async () => {
    const { container } = render(<App />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("renders the Header component", () => {
    render(<App />);
    const headerElement = screen.getByText(/Generate Speaking Order/i);
    expect(headerElement).toBeInTheDocument();
  });

  it("renders the Form component", () => {
    render(<App />);
    const formElement = screen.getByRole("form");
    expect(formElement).toBeInTheDocument();
  });

  //   it('renders the Results component', () => {
  //     render(<App />);
  //     const resultsElement = screen.getByTestId('results');
  //     expect(resultsElement).toBeInTheDocument();
  //   });

  it("renders the Aside component", () => {
    render(<App />);
    const toggleButton = screen.getByLabelText("Open settings menu");
    expect(toggleButton).toBeInTheDocument();
  });
});
