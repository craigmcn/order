import { useEffect } from 'react';
import { useLocalStorage, useMediaQuery } from '@uidotdev/usehooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-84f13ff524/icons';
import { DEFAULT_OPTIONS } from '../../utils/constants';
import Switch from '../Fields/Switch';

function Settings() {
  const [storedOptions, setStoredOptions] = useLocalStorage('options', null);
  const [storedTheme, setStoredTheme] = useLocalStorage('theme', undefined);
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const localOptions = storedOptions ? { ...DEFAULT_OPTIONS, ...storedOptions } : DEFAULT_OPTIONS;

  useEffect(() => {
    if (!storedTheme) {
      if (prefersDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [prefersDark, storedTheme]);

  const handleSettingsChange = (e) => {
    if (e.target.type === 'checkbox') {
      setStoredOptions((storedOptions) => ({ ...storedOptions, [e.target.name]: e.target.checked }));
      return;
    }

    setStoredOptions((storedOptions) => ({ ...storedOptions, [e.target.name]: e.target.value }));
  };

  const handleThemeChange = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setStoredTheme(value === 'system' ? undefined : value);

      if (value === 'light' || (value === 'system' && window.matchMedia('(prefers-color-scheme: light)').matches)) {
        document.documentElement.classList.remove('dark');
      }

      if (value === 'dark' || (value === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
      }
    }
  };

  return (
    <>
      <h2 className="border-b border-slate-400 py-5 px-4 font-extralight uppercase tracking-wide text-slate-600 dark:text-slate-400">
        <FontAwesomeIcon icon={byPrefixAndName.fal['cog']} className="me-2" />
        Settings
      </h2>
      <div className="p-4">
        <div>
          <label htmlFor="prefix" className="block text-sm text-slate-600 dark:text-slate-400">
            Prefix
          </label>
          <input
            type="text"
            id="prefix"
            name="prefix"
            className="w-full p-1 text-slate-700 dark:text-slate-300 border rounded border-slate-400 outline-none outline-offset-1 focus:outline-orange-500/50"
            value={localOptions.prefix}
            onChange={handleSettingsChange}
          />
        </div>

        <div>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Separators</p>
          <label htmlFor="separator" className="sr-only">
            Separator
          </label>
          <input
            type="text"
            id="separator"
            name="separator"
            className="w-1/4 p-1 text-slate-700 dark:text-slate-300 border rounded border-slate-400 outline-none outline-offset-1 focus:outline-orange-500/50"
            value={localOptions.separator}
            onChange={handleSettingsChange}
          />
          <label htmlFor="last-separator" className="sr-only">
            Last separator
          </label>
          <input
            type="text"
            id="last-separator"
            name="lastSeparator"
            className="w-1/4 ms-1 p-1 text-slate-700 dark:text-slate-300 border rounded border-slate-400 outline-none outline-offset-1 focus:outline-orange-500/50"
            value={localOptions.lastSeparator}
            onChange={handleSettingsChange}
          />
        </div>

        <div className="mt-1">
          <Switch name="oxfordComma" checked={!!localOptions.oxfordComma} value="1" onClick={handleSettingsChange} />
        </div>
      </div>

      <div className="mt-3 border-t border-slate-400">
        <div className="p-4">
          <h3 className="mb-1 font-light tracking-wide text-slate-600 dark:text-slate-400">
            <FontAwesomeIcon icon={byPrefixAndName.fal['eclipse']} className="me-2" />
            Appearance
          </h3>

          <label className="pe-3 text-sm text-slate-600 dark:text-slate-400">
            <input
              type="radio"
              id="theme-dark"
              name="theme"
              value="dark"
              defaultChecked={storedTheme === 'dark'}
              className="me-1"
              onChange={handleThemeChange}
            />
            Dark
          </label>

          <label className="pe-3 text-sm text-slate-600 dark:text-slate-400">
            <input
              type="radio"
              id="theme-light"
              name="theme"
              value="light"
              defaultChecked={storedTheme === 'light'}
              className="me-1"
              onChange={handleThemeChange}
            />
            Light
          </label>

          <label className="text-sm text-slate-600 dark:text-slate-400">
            <input
              type="radio"
              id="theme-system"
              name="theme"
              value="system"
              defaultChecked={storedTheme === 'system' || !storedTheme}
              className="me-1"
              onChange={handleThemeChange}
            />
            System
          </label>
        </div>
      </div>
    </>
  );
}

export default Settings;
