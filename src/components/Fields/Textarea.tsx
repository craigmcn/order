import { useEffect, useRef } from 'react';
import type { TextareaHTMLAttributes, RefObject } from 'react';
import _kebabCase from 'lodash/kebabCase';

interface ITextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> {
  id?: string | null;
  name?: string;
  autoResize?: boolean;
  innerRef?: RefObject<HTMLTextAreaElement | null> | null;
}

const HEIGHT_ADJUSTMENT_OFFSET = 2;

const resizeInput = (e: Event) => {
  const el = e.target as HTMLTextAreaElement;
  el.style.height = 'auto';
  el.style.height = `${el.scrollHeight + HEIGHT_ADJUSTMENT_OFFSET}px`;
};

function Textarea({ id = null, name, className = '', autoResize = false, innerRef = null, ...props }: ITextareaProps) {
  const derivedId = id || (name ? _kebabCase(name) : undefined);
  const ref = useRef<HTMLTextAreaElement>(null);
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
