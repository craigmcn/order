import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import _kebabCase from 'lodash/kebabCase';

Textarea.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  autoResize: PropTypes.bool,
  innerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(HTMLTextAreaElement) }),
  ]),
};

Textarea.defaultProps = {
  id: null,
  className: '',
  autoResize: false,
  innerRef: null,
};

const resizeInput = (e) => {
  const el = e.target;
  el.style.height = 'auto';
  el.style.height = `${el.scrollHeight + 2}px`; // +2 to fix ???
};

function Textarea({ id, name, className, autoResize, innerRef, ...props }) {
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
