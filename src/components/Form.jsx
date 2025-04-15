import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useLocalStorage } from '@uidotdev/usehooks';
import { v4 as uuid4 } from 'uuid';
import _throttle from 'lodash/throttle';
import { parseNames } from '../utils';
import { NamesContext } from '../contexts/NamesContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-84f13ff524/icons';
import Textarea from './Fields/Textarea';
import Switch from './Fields/Switch';

Form.propTypes = {};

function Form() {
  const { currentNames, setCurrentNames } = useContext(NamesContext) || {};
  const [, setStoredNames] = useLocalStorage('names', undefined);
  const [error, setError] = useState(null);
  const textareaRef = useRef();

  const uniqueId = useMemo(() => currentNames?.id ?? uuid4(), [currentNames?.id]);

  useEffect(() => {
    if (!currentNames) return;

    const namesArray = currentNames.names;

    if (textareaRef.current) {
      textareaRef.current.value = namesArray.map((v) => (v.includes(' ') ? `"${v}"` : v)).join(', ');
    }
  }, [currentNames]);

  const handleNamesChange = _throttle((e) => {
    if (error && e.target.value) {
      setError(null);
    }
  }, 300);

  const handleReset = () => {
    setCurrentNames(null);
    setError(null);
    textareaRef.current.value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!e.target.names.value) {
      setError('Please enter at least one name.');
      return;
    }

    const namesArray = parseNames(e.target.names.value);
    let currentId = null;

    if (e.target.remember.checked) {
      currentId = e.target.remember.value;
      setStoredNames((storedNames) => ({ ...storedNames, [currentId]: namesArray }));
    }
    setCurrentNames({ id: currentId, names: namesArray });
  };

  return (
    <form key={uniqueId} name="participants" onSubmit={handleSubmit}>
      <div className="flex justify-between items-center">
        <label className="block text-slate-600 dark:text-slate-400 mb-1" htmlFor="names">
          Participant names
        </label>
        <button
          type="button"
          onClick={handleReset}
          aria-label="Clear current list"
          title="Clear current list"
          className="border-0 rounded py-0 px-0.5 text-slate-600 dark:text-slate-400 outline-none outline-offset-0 focus:outline-orange-500/50"
        >
          <FontAwesomeIcon icon={byPrefixAndName.fal['delete-left']} size="lg" />
        </button>
      </div>
      <div className="mb-1">
        <Textarea
          innerRef={textareaRef}
          name="names"
          className="w-full p-2 text-slate-700 dark:text-slate-300 border rounded border-slate-400 outline-none outline-offset-1 focus:outline-orange-500/50 resize-none"
          autoResize
          onChange={handleNamesChange}
        />
        {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
      </div>

      <div>
        <Switch name="remember" label="Remember this list" checked={!!currentNames?.id} value={uniqueId} />
      </div>

      <button
        className="block w-full mt-4 bg-orange-500 dark:bg-orange-600 hover:bg-orange-600 dark:hover:bg-orange-700 focus:bg-orange-600 dark:focus:bg-orange-700 text-orange-50 dark:text-orange-100 py-2 px-4 border-b-4 border-orange-600 dark:border-orange-700 rounded hover:border-orange-700 dark:hover:border-orange-800 focus:border-orange-700 dark:focus:border-orange-800 outline-none focus:outline-4 outline-offset-0 focus:outline-orange-500/50"
        type="submit"
      >
        Generate
      </button>
    </form>
  );
}

export default Form;
