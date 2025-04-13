// FILEPATH: /Users/craigmcnaughton/Web/order/src/components/Form.test.jsx
import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NamesContext } from '../../contexts/NamesContext';
import Form from '../../components/Form';

describe('Form component', () => {
  it('renders without crashing', () => {
    render(<Form />);
  });

  it('displays the current names in the textarea', () => {
    const currentNames = { id: '1', names: ['John', 'Jane', 'Doe'] };
    render(
      <NamesContext.Provider value={{ currentNames }}>
        <Form />
      </NamesContext.Provider>,
    );
    const textarea = screen.getByRole('textbox');
    expect(textarea.value).toBe('John, Jane, Doe');
  });

  it('clears the textarea when the reset button is clicked', () => {
    const currentNames = { id: '1', names: ['John', 'Jane', 'Doe'] };
    const setCurrentNames = vi.fn();
    render(
      <NamesContext.Provider value={{ currentNames, setCurrentNames }}>
        <Form />
      </NamesContext.Provider>,
    );
    const resetButton = screen.getByLabelText(/Clear current list/i);
    fireEvent.click(resetButton);
    const textarea = screen.getByRole('textbox');
    expect(textarea.value).toBe('');
    expect(setCurrentNames).toHaveBeenCalledWith(null);
  });
});
