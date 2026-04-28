import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Settings from './Settings';

describe('Settings', () => {
  it('renders the Settings component correctly', () => {
    render(<Settings />);

    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByLabelText('Prefix')).toBeInTheDocument();
    expect(screen.getByLabelText('Separator')).toBeInTheDocument();
    expect(screen.getByLabelText('Last separator')).toBeInTheDocument();
    expect(screen.getByText('Appearance')).toBeInTheDocument();
    expect(screen.getByLabelText('Dark')).toBeInTheDocument();
    expect(screen.getByLabelText('Light')).toBeInTheDocument();
    expect(screen.getByLabelText('System')).toBeInTheDocument();
  });
});
