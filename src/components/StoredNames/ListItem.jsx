import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { NamesContext } from '../../contexts/NamesContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-84f13ff524/icons';
import ConfirmDialog from './ConfirmDialog';

ListItem.propTypes = {
  id: PropTypes.string.isRequired,
  names: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

function ListItem({ id, names, onSelect, onDelete }) {
  const { currentNames, setCurrentNames } = useContext(NamesContext);
  const [showConfirm, setShowConfirm] = useState(false);
  const displayNames = names?.map((v) => (v.includes(' ') ? `"${v}"` : v)).join(', ');

  const handleClick = () => {
    if (currentNames?.id !== id) {
      setCurrentNames({ id, names });
    }

    onSelect();
  };
  const handleDelete = () => {
    onDelete(id);
  };

  const handleConfirmDelete = () => {
    setShowConfirm(true);
  };

  return (
    <>
      <li className="border-b border-slate-400 flex items-center text-slate-600 dark:text-slate-400">
        <button className="py-4 ps-4 flex-auto text-start" onClick={handleClick}>
          {displayNames}
        </button>
        <button
          className="px-4 flex-none text-red-600 dark:text-red-400"
          onClick={handleConfirmDelete}
          aria-label="Delete"
          title="Delete"
        >
          <FontAwesomeIcon icon={byPrefixAndName.fal['trash-alt']} />
        </button>
      </li>

      <ConfirmDialog
        additionalText={displayNames}
        open={showConfirm}
        confirmAction={handleDelete}
        closeAction={() => setShowConfirm(false)}
      />
    </>
  );
}

export default ListItem;
