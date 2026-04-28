import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NamesContext } from '../../contexts/NamesContext';
import Results from '../../components/Results';
import { copyToClipboard } from '../../utils';

Object.defineProperty(globalThis.navigator, 'clipboard', {
  value: { writeText: vi.fn() },
  configurable: true,
});

describe('Results component', () => {
  it('renders without crashing', () => {
    render(
      <NamesContext.Provider value={{ currentNames: null, setCurrentNames: vi.fn() }}>
        <Results />
      </NamesContext.Provider>,
    );
  });

  it('renders the results element', () => {
    render(
      <NamesContext.Provider value={{ currentNames: null, setCurrentNames: vi.fn() }}>
        <Results />
      </NamesContext.Provider>,
    );
    const resultsElement = screen.getByTestId('results');
    expect(resultsElement).toBeInTheDocument();
  });

  it('copies the results to clipboard when copy button is clicked', async () => {
    const currentNames = { id: '1', names: ['John', 'Jane', 'Doe'] };
    render(
      <NamesContext.Provider value={{ currentNames, setCurrentNames: vi.fn() }}>
        <Results />
      </NamesContext.Provider>,
    );
    const copyButton = screen.getByRole('button', { name: /copy/i });
    userEvent.click(copyButton);

    await copyToClipboard('test');
    expect(globalThis.navigator.clipboard.writeText).toHaveBeenCalled();
  });

  it('renders the copy icon in the copy button', () => {
    render(
      <NamesContext.Provider value={{ currentNames: { id: '1', names: ['John', 'Jane'] }, setCurrentNames: vi.fn() }}>
        <Results />
      </NamesContext.Provider>,
    );
    const copyIcon = screen.getByTestId('copy-button-icon');
    expect(copyIcon).toBeInTheDocument();
    expect(copyIcon).toHaveAttribute('data-icon', 'copy');
  });

  it('renders the results from context', () => {
    render(
      <NamesContext.Provider value={{ currentNames: { id: '1', names: ['John', 'Jane'] }, setCurrentNames: vi.fn() }}>
        <Results />
      </NamesContext.Provider>,
    );
    const resultsElement = screen.getByTestId('results');
    expect(resultsElement.textContent).toContain('John');
    expect(resultsElement.textContent).toContain('Jane');
    expect(resultsElement.textContent).not.toContain('Doe');
  });
});
