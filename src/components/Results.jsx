import { useContext } from 'react';
import { useLocalStorage } from '@uidotdev/usehooks';
import { generate } from '../utils';
import { DEFAULT_OPTIONS } from '../utils/constants';
import { NamesContext } from '../contexts/NamesContext';
import CopyButton from './CopyButton';

function Results() {
  const { currentNames } = useContext(NamesContext);
  const [storedOptions] = useLocalStorage('options', null);
  const localOptions = storedOptions ? { ...DEFAULT_OPTIONS, ...storedOptions } : DEFAULT_OPTIONS;

  const results = generate(currentNames?.names, localOptions);
  return (
    <div
      className={`group relative mx-auto my-8 py-3 px-5 text-2xl text-slate-700 dark:text-slate-300 border rounded border-slate-300 dark:border-slate-700 focus:border-slate-400 dark:focus:border-slate-600 outline-none ${results ?? 'hidden'}`}
      tabIndex={0} // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
    >
      <CopyButton text={results} />
      <div data-testid="results">{results}</div>
    </div>
  );
}

export default Results;
