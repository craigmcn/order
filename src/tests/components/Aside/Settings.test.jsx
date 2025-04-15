import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Settings from '../../../components/Aside/Settings';
// import { useLocalStorage, useMediaQuery } from '@uidotdev/usehooks';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { byPrefixAndName } from '@awesome.me/kit-84f13ff524/icons';
// import { DEFAULT_OPTIONS } from '../../utils/constants';

// // Mocking hooks and components
// vi.mock('@uidotdev/usehooks', () => ({
//   useLocalStorage: vi.fn(),
//   useMediaQuery: vi.fn(),
// }));

// vi.mock('@fortawesome/react-fontawesome', () => ({
//   FontAwesomeIcon: vi.fn(),
// }));

describe('Settings', () => {
  // const mockSetStoredOptions = vi.fn();
  // const mockSetStoredTheme = vi.fn();
  // const defaultStoredOptions = {
  //   prefix: '',
  //   separator: '',
  //   lastSeparator: '',
  //   oxfordComma: false,
  // };

  // beforeEach(() => {
  //   // useLocalStorage.mockImplementation((key, initialValue) => {
  //   useLocalStorage.mockImplementation((key) => {
  //     if (key === 'options') {
  //       return [defaultStoredOptions, mockSetStoredOptions];
  //     } else if (key === 'theme') {
  //       return [undefined, mockSetStoredTheme];
  //     }
  //   });
  //   useMediaQuery.mockReturnValue(false);
  //   FontAwesomeIcon.mockImplementation(({ icon, className }) => (
  //     <svg className={className} data-icon={icon[1]} />
  //   ));
  // });

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

  // it('handles prefix change correctly', () => {
  //   render(<Settings />);
  //   const prefixInput = screen.getByLabelText('Prefix');

  //   fireEvent.change(prefixInput, { target: { value: 'New Prefix' } });

  //   expect(mockSetStoredOptions).toHaveBeenCalledWith({
  //     ...defaultStoredOptions,
  //     prefix: 'New Prefix',
  //   });
  // });

  // it('handles separator change correctly', () => {
  //   render(<Settings />);
  //   const separatorInput = screen.getByLabelText('Separator');

  //   fireEvent.change(separatorInput, { target: { value: ';' } });

  //   expect(mockSetStoredOptions).toHaveBeenCalledWith({
  //     ...defaultStoredOptions,
  //     separator: ';',
  //   });
  // });

  // it('handles last separator change correctly', () => {
  //   render(<Settings />);
  //   const lastSeparatorInput = screen.getByLabelText('Last separator');

  //   fireEvent.change(lastSeparatorInput, { target: { value: 'and' } });

  //   expect(mockSetStoredOptions).toHaveBeenCalledWith({
  //     ...defaultStoredOptions,
  //     lastSeparator: 'and',
  //   });
  // });

  // it('handles oxford comma change correctly', () => {
  //   render(<Settings />);
  //   const oxfordCommaSwitch = screen.getByRole('checkbox');

  //   fireEvent.click(oxfordCommaSwitch);

  //   expect(mockSetStoredOptions).toHaveBeenCalledWith({
  //     ...defaultStoredOptions,
  //     oxfordComma: true,
  //   });
  // });

  // it('handles theme change correctly', () => {
  //   render(<Settings />);
  //   const darkThemeRadio = screen.getByLabelText('Dark');
  //   const lightThemeRadio = screen.getByLabelText('Light');
  //   const systemThemeRadio = screen.getByLabelText('System');

  //   fireEvent.change(darkThemeRadio, { target: { checked: true, value: 'dark' } });
  //   expect(mockSetStoredTheme).toHaveBeenCalledWith('dark');

  //   fireEvent.change(lightThemeRadio, { target: { checked: true, value: 'light' } });
  //   expect(mockSetStoredTheme).toHaveBeenCalledWith('light');

  //   fireEvent.change(systemThemeRadio, { target: { checked: true, value: 'system' } });
  //   expect(mockSetStoredTheme).toHaveBeenCalledWith(undefined);
  // });

  // it('handles dark mode preference correctly', () => {
  //   useMediaQuery.mockReturnValue(true);
  //   render(<Settings />);

  //   expect(document.documentElement.classList.contains('dark')).toBe(true);
  // });

  // it('handles light mode preference correctly', () => {
  //   useMediaQuery.mockReturnValue(false);
  //   render(<Settings />);

  //   expect(document.documentElement.classList.contains('dark')).toBe(false);
  // });
});
