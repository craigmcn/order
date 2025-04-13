import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useLocalStorage } from '@uidotdev/usehooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-84f13ff524/icons';
import ListItem from './ListItem';

StoredNames.propTypes = {
  onSelect: PropTypes.func,
};

function StoredNames({ onSelect = () => {} }) {
  const [storedNames, setStoredNames] = useLocalStorage('names', null);

  const handleDelete = useCallback(
    (id) => {
      setStoredNames((storedNames) => {
        const newStoredNames = { ...storedNames };
        delete newStoredNames[id];
        return newStoredNames;
      });
    },
    [setStoredNames],
  );

  return (
    <>
      {(!storedNames || Object.keys(storedNames).length === 0) && (
        <p className="p-4 text-slate-600 dark:text-slate-400">
          <FontAwesomeIcon icon={byPrefixAndName.fal['exclamation-triangle']} className="text-orange-500 me-2" />
          No stored lists
        </p>
      )}
      <ul className="list-none">
        {storedNames &&
          Object.entries(storedNames).map(([k, v]) => (
            <ListItem key={k} id={k} names={v} onDelete={handleDelete} onSelect={onSelect} />
          ))}
      </ul>
    </>
  );
}

export default StoredNames;
