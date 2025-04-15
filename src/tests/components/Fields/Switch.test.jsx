import { describe, expect, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import _kebabCase from 'lodash/kebabCase';
import Switch from '../../../components/Fields/Switch';
import { sentenceCase } from '../../../utils';

describe('Switch component', () => {
  it('renders without crashing', () => {
    render(<Switch name="test" />);
  });

  it('renders the label', () => {
    const name = 'test';
    render(<Switch name={name} />);
    const labelElement = screen.getByText(sentenceCase(name));
    expect(labelElement).toBeInTheDocument();
  });

  it('changes state when clicked', () => {
    const name = 'test';
    render(<Switch name={name} />);
    const inputElement = screen.getByRole('checkbox');
    expect(inputElement.checked).toEqual(false);
    fireEvent.click(inputElement);
    expect(inputElement.checked).toEqual(true);
  });

  it('has the correct id', () => {
    const id = 'test-id';
    const name = 'test-name';
    render(<Switch id={id} name={name} />);
    const inputElement = screen.getByRole('checkbox');
    expect(inputElement).toHaveAttribute('id', id);
  });

  it('generates id from name if id is not provided', () => {
    const name = 'test-name';
    render(<Switch name={name} />);
    const inputElement = screen.getByRole('checkbox');
    expect(inputElement).toHaveAttribute('id', _kebabCase(name));
  });
});
