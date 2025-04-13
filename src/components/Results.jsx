import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-84f13ff524/icons';
import { copyToClipboard, generate } from '../utils';
import { NamesContext } from '../contexts/NamesContext';
import { DEFAULT_OPTIONS } from '../utils/constants';
import { useLocalStorage } from '@uidotdev/usehooks';

function Results() {
  const { currentNames } = useContext(NamesContext);
  const [storedOptions] = useLocalStorage('options', null);
  const localOptions = storedOptions ? { ...DEFAULT_OPTIONS, ...storedOptions } : DEFAULT_OPTIONS;

  const results = generate(currentNames?.names, localOptions);

  const handleCopy = () => {
    copyToClipboard(results);
  };

  return (
    <div
      className={`group relative mx-auto my-8 py-3 px-5 text-2xl text-slate-700 dark:text-slate-300 border rounded border-slate-300 dark:border-slate-700 focus:border-slate-400 dark:focus:border-slate-600 outline-none ${results ?? 'hidden'}`}
      tabIndex={0} // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
    >
      <button
        className="absolute top-0 right-0 z-10 mt-1 mr-1 p-1 bg-white dark:bg-slate-900 bg-opacity-75 dark:bg-opacity-50 backdrop-blur-sm text-slate-600 dark:text-slate-400 rounded-sm invisible group-hover:visible group-focus-within:visible outline-none outline-offset-1 focus:outline-orange-500/50"
        type="button"
        title="Copy"
        onClick={handleCopy}
      >
        <FontAwesomeIcon data-testid="copy-button-icon" icon={byPrefixAndName.fal['copy']} />
      </button>

      <div data-testid="results">{results}</div>
    </div>
  );
}

export default Results;
