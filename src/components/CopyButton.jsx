import { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-84f13ff524/icons';
import { copyToClipboard } from '../utils';

CopyButton.propTypes = {
  text: PropTypes.string,
};

function CopyButton({ text =  '' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    const copyButton = e.currentTarget;
    copyToClipboard(text);
    setCopied(true);
    setTimeout(() => {
      copyButton.blur();
      setCopied(false);
    }, 600);
  };

  return (
        
    <button
      className={`
        absolute top-0 right-0 z-10
        invisible group-hover:visible group-focus-within:visible
        mt-1 mr-1 p-1 rounded-sm
        bg-white dark:bg-slate-900 bg-opacity-75 dark:bg-opacity-50 backdrop-blur-sm
        ${copied ? 'text-green-600 dark:text-green-400 focus-visible:outline-green-800/50' : 'text-slate-600 dark:text-slate-400 focus-visible:outline-orange-500/50'}
        transition-colors duration-100
      `}
      type="button"
      title="Copy"
      onClick={handleCopy}
    >
      <FontAwesomeIcon data-testid="copy-button-icon" icon={byPrefixAndName.fal[copied ? 'check-circle' : 'copy']} fixedWidth />
    </button>
  );
}

export default CopyButton;
