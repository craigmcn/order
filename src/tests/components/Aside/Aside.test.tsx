import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Aside from '../../../components/Aside/Aside';

describe('Aside component', () => {
  it('renders without crashing', () => {
    render(<Aside />);
  });

  it('renders the "Open settings menu" text', () => {
    render(<Aside />);
    const toggleSettingsElement = screen.getByLabelText(/Open settings menu/i);
    expect(toggleSettingsElement).toBeInTheDocument();
  });

  // // If the "Open settings menu" text is a button or link that triggers an action, you can add a test like this:
  // it('triggers the action when "Open settings menu" is clicked', () => {
  //   const toggleOffCanvas = vi.fn();
  //   render(<Aside />);
  //   const toggleSettingsElement = screen.getByLabelText(/Open settings menu/i);
  //   fireEvent.click(toggleSettingsElement);
  //   expect(toggleOffCanvas).toHaveBeenCalled();
  // });
});
