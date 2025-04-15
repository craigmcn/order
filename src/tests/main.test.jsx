import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import App from '../App.jsx';

describe('App component', () => {
  it('renders without crashing', () => {
    render(<App />);
  });
});
