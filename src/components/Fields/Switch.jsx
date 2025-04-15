import PropTypes from 'prop-types';
import _kebabCase from 'lodash/kebabCase';
import { sentenceCase } from '../../utils';

Switch.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  checked: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

function Switch({ id = null, name, label = null, checked = false, value = 'on', ...props }) {
  const derivedId = id || _kebabCase(name);
  const derivedLabel = label || sentenceCase(name);

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        id={derivedId}
        name={name}
        type="checkbox"
        className="sr-only peer"
        defaultChecked={checked}
        value={value}
        {...props}
      />
      <div className="relative w-7 h-4 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-200/50 peer-focus:peer-checked:ring-green-500/50 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white dark:after:bg-slate-300 dark:after:peer-checked:bg-white/50 after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-slate-600 peer-checked:bg-green-600"></div>
      <span className="ms-2 text-sm text-slate-600 dark:text-slate-400">{derivedLabel}</span>
    </label>
  );
}

export default Switch;
