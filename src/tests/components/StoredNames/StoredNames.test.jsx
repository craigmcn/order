import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import StoredNames from '../../../components/StoredNames/StoredNames';

describe('StoredNames component', () => {
  it('renders without crashing', () => {
    render(<StoredNames />);
  });

  it('displays a message when there are no stored names', () => {
    render(<StoredNames />);
    const message = screen.getByText(/No stored lists/i);
    expect(message).toBeInTheDocument();
  });

  it('displays a list of stored names', () => {
    const storedNames = { 1: ['John', 'Jane', 'Doe'], 2: ['Alice', 'Bob', 'Charlie'] };
    render(<StoredNames storedNames={storedNames} />);
    const listItems = screen.getAllByRole('listitem');
    expect(listItems.length).toBe(2);
  });

  it('calls the handleDelete function when the delete button is clicked', () => {
    const handleDelete = vi.fn();
    const storedNames = { 1: ['John', 'Jane', 'Doe'] };
    render(<StoredNames storedNames={storedNames} onDelete={handleDelete} />);
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);
    expect(handleDelete).toHaveBeenCalled();
  });
});
