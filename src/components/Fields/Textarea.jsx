import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import _kebabCase from 'lodash/kebabCase';

Textarea.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  autoResize: PropTypes.bool,
  innerRef: PropTypes.shape({ current: PropTypes.instanceOf(HTMLTextAreaElement) }),
};

const HEIGHT_ADJUSTMENT_OFFSET = 2; // Offset to account for padding/border discrepancies in textarea height calculation.

const resizeInput = (e) => {
  const el = e.target;
  el.style.height = 'auto';
  el.style.height = `${el.scrollHeight + HEIGHT_ADJUSTMENT_OFFSET}px`;
};

function Textarea({ id = null, name, className = '', autoResize = false, innerRef = null, ...props }) {
  const derivedId = id || _kebabCase(name);
  const ref = useRef();
  const thisRef = innerRef || ref;

  useEffect(() => {
    if (!autoResize || !thisRef.current) return;

    const el = thisRef.current;
    el.addEventListener('input', resizeInput);

    return () => {
      el.removeEventListener('input', resizeInput);
    };
  }, [autoResize, thisRef]);

  return <textarea ref={thisRef} id={derivedId} name={name} className={className} {...props} />;
}

export default Textarea;
