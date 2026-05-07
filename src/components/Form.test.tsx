import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { NamesContext } from "../contexts/NamesContext";
import { parseNames } from "../utils";
import Form from "./Form";

describe("Form component", () => {
  it("renders without crashing", () => {
    render(<Form />);
  });

  it("displays the current names in the textarea", () => {
    const currentNames = { id: "1", names: ["John", "Jane", "Doe"] };
    render(
      <NamesContext.Provider value={{ currentNames, setCurrentNames: vi.fn() }}>
        <Form />
      </NamesContext.Provider>,
    );
    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
    expect(textarea.value).toBe("John, Jane, Doe");
  });

  it("clears the textarea when the reset button is clicked", () => {
    const currentNames = { id: "1", names: ["John", "Jane", "Doe"] };
    const setCurrentNames = vi.fn();
    render(
      <NamesContext.Provider value={{ currentNames, setCurrentNames }}>
        <Form />
      </NamesContext.Provider>,
    );
    const resetButton = screen.getByLabelText(/Clear current list/i);
    fireEvent.click(resetButton);
    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
    expect(textarea.value).toBe("");
    expect(setCurrentNames).toHaveBeenCalledWith(null);
  });

  it("calls setCurrentNames with parsed names on submit", () => {
    const setCurrentNames = vi.fn();
    render(
      <NamesContext.Provider value={{ currentNames: null, setCurrentNames }}>
        <Form />
      </NamesContext.Provider>,
    );
    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: "Alice, Bob, Charlie" } });
    fireEvent.click(screen.getByRole("button", { name: /generate/i }));
    expect(setCurrentNames).toHaveBeenCalledWith({
      id: null,
      names: parseNames("Alice, Bob, Charlie"),
    });
  });

  it("shows an error when submitted with no names", () => {
    render(<Form />);
    fireEvent.click(screen.getByRole("button", { name: /generate/i }));
    expect(
      screen.getByText(/Please enter at least one name/i),
    ).toBeInTheDocument();
  });

  it("clears the error when re-submitted with names after an empty submit", () => {
    const setCurrentNames = vi.fn();
    render(
      <NamesContext.Provider value={{ currentNames: null, setCurrentNames }}>
        <Form />
      </NamesContext.Provider>,
    );
    fireEvent.click(screen.getByRole("button", { name: /generate/i }));
    expect(
      screen.getByText(/Please enter at least one name/i),
    ).toBeInTheDocument();
    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: "Alice, Bob" } });
    fireEvent.click(screen.getByRole("button", { name: /generate/i }));
    expect(
      screen.queryByText(/Please enter at least one name/i),
    ).not.toBeInTheDocument();
    expect(setCurrentNames).toHaveBeenCalledOnce();
  });
});
