import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import _kebabCase from 'lodash/kebabCase';
import Textarea from '../../../components/Fields/Textarea';

describe('Textarea component', () => {
  // Mock the console.error function to check if it gets called
  const consoleError = console.error;
  console.error = vi.fn();

  afterEach(() => {
    // Clear the mock after each test
    console.error.mockClear();
  });

  afterAll(() => {
    // Restore the original console.error function after all tests
    console.error = consoleError;
  });

  it('throws an error when no name prop is provided', () => {
    render(<Textarea />);
    expect(console.error).toHaveBeenCalled();
  });

  it('throws an error when invalid autoResize prop is provided', () => {
    render(<Textarea name="test" autoResize="invalid" />);
    expect(console.error).toHaveBeenCalled();
  });

  it('renders without crashing', () => {
    render(<Textarea />);
  });

  it('has the correct id', () => {
    const id = 'test-id';
    const name = 'test-name';
    render(<Textarea id={id} name={name} />);
    const textareaElement = screen.getByRole('textbox');
    expect(textareaElement).toHaveAttribute('id', id);
  });

  it('generates id from name if id is not provided', () => {
    const name = 'test-name';
    render(<Textarea name={name} />);
    const textareaElement = screen.getByRole('textbox');
    expect(textareaElement).toHaveAttribute('id', _kebabCase(name));
  });

  it('resizes on input when autoResize prop is true', () => {
    render(<Textarea autoResize={true} name="test" />);
    const textarea = screen.getByRole('textbox');
    const initialHeight = textarea.style.height;

    fireEvent.input(textarea, {
      target: { value: 'A very long text that should trigger the auto resize feature of the textarea component.' },
    });

    const finalHeight = textarea.style.height;
    expect(finalHeight).not.toBe(initialHeight);
  });

  it('does not resize on input when autoResize prop is false', () => {
    render(<Textarea autoResize={false} name="test" />);
    const textarea = screen.getByRole('textbox');
    const initialHeight = textarea.style.height;

    fireEvent.input(textarea, {
      target: { value: 'A very long text that should not trigger the auto resize feature of the textarea component.' },
    });

    const finalHeight = textarea.style.height;
    expect(finalHeight).toBe(initialHeight);
  });
});
