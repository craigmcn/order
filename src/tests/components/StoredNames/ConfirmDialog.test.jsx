// FILEPATH: /Users/craigmcnaughton/Web/order/src/components/ConfirmDialog.test.jsx
import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ConfirmDialog from '../../../components/StoredNames/ConfirmDialog';

// Mock ResizeObserver
class ResizeObserver {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}

Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  configurable: true,
  value: ResizeObserver,
});

describe('ConfirmDialog component', () => {
  it('renders without crashing', () => {
    render(<ConfirmDialog />);
  });

  it('nothing displays when not `open`', async () => {
    const additionalText = 'John, Jane Doe';
    render(<ConfirmDialog additionalText={additionalText} />);

    expect(screen.queryByTestId('confirm-dialog-title')).not.toBeInTheDocument();
  });

  it('displays the additional text', async () => {
    const additionalText = 'John, Jane Doe';
    render(<ConfirmDialog open additionalText={additionalText} />);

    await waitFor(() => {
      expect(screen.getByTestId('confirm-dialog-title')).toBeInTheDocument();
      expect(screen.getByText(/John, Jane Doe/i)).toBeInTheDocument();
    });
  });

  it('calls the confirmAction function when the confirm button is clicked', async () => {
    const confirmAction = vi.fn();
    render(<ConfirmDialog open confirmAction={confirmAction} />);

    await waitFor(() => {
      expect(screen.getByTestId('confirm-dialog-title')).toBeInTheDocument();
    });

    const confirmButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(confirmButton);
    expect(confirmAction).toHaveBeenCalled();
  });

  it('calls the closeAction function when the close button is clicked', async () => {
    const closeAction = vi.fn();
    render(<ConfirmDialog open closeAction={closeAction} />);

    await waitFor(() => {
      expect(screen.getByTestId('confirm-dialog-title')).toBeInTheDocument();
    });

    const closeButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(closeButton);
    expect(closeAction).toHaveBeenCalled();
  });
});
