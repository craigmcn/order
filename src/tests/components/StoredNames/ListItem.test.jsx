import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import ListItem from '../../../components/StoredNames/ListItem';
import { NamesContext } from '../../../contexts/NamesContext';

describe('ListItem component', () => {
  it('renders without crashing', () => {
    render(
      <NamesContext.Provider value={{ currentNames: { id: 1, names: ['John', 'Jane'] } }}>
        <ListItem />
      </NamesContext.Provider>,
    );
  });

  it('displays the names correctly', () => {
    const names = ['John', 'Jane Doe'];
    render(
      <NamesContext.Provider value={{ currentNames: { id: 1, names: ['John', 'Jane'] } }}>
        <ListItem names={names} />
      </NamesContext.Provider>,
    );
    const displayNames = screen.getByText(/John, "Jane Doe"/i);
    expect(displayNames).toBeInTheDocument();
  });

  it('calls the handleClick function when the list item is clicked', () => {
    const handleClick = vi.fn();
    const setCurrentNames = vi.fn();
    const onSelect = vi.fn();
    const names = ['John', 'Jane Doe'];
    render(
      <NamesContext.Provider value={{ currentNames: { id: 1, names: ['John', 'Jane'] } }}>
        <ListItem id={2} names={names} onSelect={onSelect} />
      </NamesContext.Provider>,
    );
    const listItem = screen.getByRole('button', { name: /John, "Jane Doe"/i });
    fireEvent.click(listItem);
    expect(handleClick).toHaveBeenCalled();
    expect(setCurrentNames).toHaveBeenCalled();
    // expect(onSelect).toHaveBeenCalled();

    // const closeAction = vi.fn();
    // render(<ConfirmDialog open closeAction={closeAction} />);

    // await waitFor(() => {
    //   expect(screen.getByTestId('confirm-dialog-title')).toBeInTheDocument();
    // });

    // const closeButton = screen.getByRole('button', { name: /cancel/i });
    // fireEvent.click(closeButton);
    // expect(closeAction).toHaveBeenCalled();
  });

  // it('calls the handleConfirmDelete function when the delete button is clicked', () => {
  //   const names = ['John', 'Jane Doe'];
  //   render(<ListItem names={names} />);
  //   const deleteButton = screen.getByRole('button', { name: /Delete/i });
  //   fireEvent.click(deleteButton);
  //   // Here you would check if the confirmation dialog is shown
  // });
});
