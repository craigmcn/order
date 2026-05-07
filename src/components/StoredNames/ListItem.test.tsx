import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ListItem from "./ListItem";
import { NamesContext } from "../../contexts/NamesContext";

describe("ListItem component", () => {
  const contextValue = {
    currentNames: { id: "1", names: ["John", "Jane"] },
    setCurrentNames: vi.fn(),
  };

  it("renders without crashing", () => {
    render(
      <NamesContext.Provider value={contextValue}>
        <ListItem id="1" names={[]} onSelect={() => {}} onDelete={() => {}} />
      </NamesContext.Provider>,
    );
  });

  it("displays the names correctly", () => {
    const names = ["John", "Jane Doe"];
    render(
      <NamesContext.Provider value={contextValue}>
        <ListItem id="2" names={names} onSelect={() => {}} onDelete={vi.fn()} />
      </NamesContext.Provider>,
    );
    const displayNames = screen.getByText(/John, "Jane Doe"/i);
    expect(displayNames).toBeInTheDocument();
  });
});
