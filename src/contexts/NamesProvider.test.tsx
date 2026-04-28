import { describe, expect, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useContext } from 'react';
import NamesProvider from './NamesProvider';
import { NamesContext } from './NamesContext';

function TestConsumer() {
  const { currentNames, setCurrentNames } = useContext(NamesContext);
  return (
    <div>
      <span data-testid="names">{currentNames ? currentNames.names.join(', ') : 'none'}</span>
      <button onClick={() => setCurrentNames({ id: '1', names: ['Alice', 'Bob'] })}>set</button>
      <button onClick={() => setCurrentNames(null)}>clear</button>
    </div>
  );
}

describe('NamesProvider', () => {
  it('renders children', () => {
    render(
      <NamesProvider>
        <span>child</span>
      </NamesProvider>,
    );
    expect(screen.getByText('child')).toBeInTheDocument();
  });

  it('provides null currentNames by default', () => {
    render(
      <NamesProvider>
        <TestConsumer />
      </NamesProvider>,
    );
    expect(screen.getByTestId('names').textContent).toBe('none');
  });

  it('allows updating currentNames via setCurrentNames', () => {
    render(
      <NamesProvider>
        <TestConsumer />
      </NamesProvider>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'set' }));
    expect(screen.getByTestId('names').textContent).toBe('Alice, Bob');
  });

  it('allows clearing currentNames', () => {
    render(
      <NamesProvider>
        <TestConsumer />
      </NamesProvider>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'set' }));
    fireEvent.click(screen.getByRole('button', { name: 'clear' }));
    expect(screen.getByTestId('names').textContent).toBe('none');
  });
});
