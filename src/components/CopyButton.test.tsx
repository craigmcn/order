import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import CopyButton from './CopyButton';

Object.defineProperty(globalThis.navigator, 'clipboard', {
  value: { writeText: vi.fn().mockResolvedValue(undefined) },
  configurable: true,
});

describe('CopyButton component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.mocked(globalThis.navigator.clipboard.writeText).mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders without crashing', () => {
    render(<CopyButton text="hello" />);
  });

  it('renders the copy icon initially', () => {
    render(<CopyButton text="hello" />);
    expect(screen.getByTestId('copy-button-icon')).toHaveAttribute('data-icon', 'copy');
  });

  it('copies text to clipboard when clicked', async () => {
    render(<CopyButton text="hello world" />);
    fireEvent.click(screen.getByRole('button', { name: /copy/i }));
    expect(globalThis.navigator.clipboard.writeText).toHaveBeenCalledWith('hello world');
  });

  it('shows check icon after clicking', async () => {
    render(<CopyButton text="hello" />);
    fireEvent.click(screen.getByRole('button', { name: /copy/i }));
    expect(screen.getByTestId('copy-button-icon')).toHaveAttribute('data-icon', 'circle-check');
  });

  it('reverts to copy icon after timeout', async () => {
    render(<CopyButton text="hello" />);
    fireEvent.click(screen.getByRole('button', { name: /copy/i }));
    expect(screen.getByTestId('copy-button-icon')).toHaveAttribute('data-icon', 'circle-check');

    await act(async () => {
      vi.advanceTimersByTime(600);
    });

    expect(screen.getByTestId('copy-button-icon')).toHaveAttribute('data-icon', 'copy');
  });

  it('handles null text gracefully', () => {
    render(<CopyButton text={null} />);
    fireEvent.click(screen.getByRole('button', { name: /copy/i }));
    expect(globalThis.navigator.clipboard.writeText).toHaveBeenCalledWith('');
  });
});
