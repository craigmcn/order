import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import _kebabCase from "lodash/kebabCase";
import Textarea from "./Textarea";

describe("Textarea component", () => {
  it("renders without crashing", () => {
    render(<Textarea />);
  });

  it("has the correct id", () => {
    const id = "test-id";
    const name = "test-name";
    render(<Textarea id={id} name={name} />);
    const textareaElement = screen.getByRole("textbox");
    expect(textareaElement).toHaveAttribute("id", id);
  });

  it("generates id from name if id is not provided", () => {
    const name = "test-name";
    render(<Textarea name={name} />);
    const textareaElement = screen.getByRole("textbox");
    expect(textareaElement).toHaveAttribute("id", _kebabCase(name));
  });

  it("resizes on input when autoResize prop is true", () => {
    render(<Textarea autoResize={true} name="test" />);
    const textarea = screen.getByRole("textbox");
    const initialHeight = textarea.style.height;

    fireEvent.input(textarea, {
      target: {
        value:
          "A very long text that should trigger the auto resize feature of the textarea component.",
      },
    });

    const finalHeight = textarea.style.height;
    expect(finalHeight).not.toBe(initialHeight);
  });

  it("does not resize on input when autoResize prop is false", () => {
    render(<Textarea autoResize={false} name="test" />);
    const textarea = screen.getByRole("textbox");
    const initialHeight = textarea.style.height;

    fireEvent.input(textarea, {
      target: {
        value:
          "A very long text that should not trigger the auto resize feature of the textarea component.",
      },
    });

    const finalHeight = textarea.style.height;
    expect(finalHeight).toBe(initialHeight);
  });
});
