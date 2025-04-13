import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from '../../components/Header';

describe('Header component', () => {
  it('renders without crashing', () => {
    render(<Header title="Test Title" />);
  });

  it('renders the correct title', () => {
    render(<Header title="Test Title" />);
    const titleElement = screen.getByText(/Test Title/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('renders the correct title case', () => {
    render(<Header title="test title" />);
    const titleElement = screen.getByText(/Test Title/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('applies the correct CSS classes', () => {
    render(<Header title="Test Title" />);
    const titleElement = screen.getByText(/Test Title/i);
    expect(titleElement).toHaveClass(
      'my-8 text-2xl font-thin uppercase tracking-wider text-slate-700 dark:text-slate-300',
    );
  });
});
