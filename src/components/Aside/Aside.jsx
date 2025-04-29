import { useCallback, useEffect, useState } from 'react';
import { useMediaQuery } from '@uidotdev/usehooks';
import { Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-84f13ff524/icons';
import StoredNames from '../StoredNames/StoredNames';
import Settings from './Settings';

Aside.propTypes = {};

function Aside() {
  const [offCanvas, setOffCanvas] = useState(false);
  const mdBreakpoint = useMediaQuery('(min-width: 768px)'); // Tailwind CSS `md` breakpoint

  const closeOffCanvas = () => {
    if (mdBreakpoint) return;
    setOffCanvas(false);
  };

  const toggleOffCanvas = () => {
    if (mdBreakpoint) return;
    setOffCanvas((prev) => !prev);
  };

  const fixOffCanvas = useCallback(() => {
    setOffCanvas(mdBreakpoint);
  }, [mdBreakpoint]);

  useEffect(() => {
    fixOffCanvas();
  }, [fixOffCanvas]);

  useEffect(() => {
    window.addEventListener('resize', fixOffCanvas);

    return () => {
      window.removeEventListener('resize', fixOffCanvas);
    };
  }, [fixOffCanvas]);

  return (
    <>
      <div className="md:hidden absolute top-0 right-0 p-4">
        <button
          type="button"
          className="border-0 rounded bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-300 p-1"
          onClick={toggleOffCanvas}
          aria-label="Open settings menu"
        >
          <FontAwesomeIcon icon={byPrefixAndName.fal['bars']} size="lg" fixedWidth />
        </button>
      </div>

      <Transition
        show={offCanvas}
        enter="transition-width duration-150"
        enterFrom="w-0"
        enterTo="w-80" // matches the width of the aside content
        leave="transition-width duration-200"
        leaveFrom="w-80" // matches the width of the aside content
        leaveTo="w-0"
      >
        <aside
          data-testid="aside"
          className="absolute md:relative top-0 right-0 z-10 h-dvh border-s border-slate-400 bg-slate-50 dark:bg-slate-800 md:bg-white overflow-y-auto"
        >
          <div className="w-80">
            <div className="flex justify-between items-center border-b border-slate-400 p-4">
              <h2 className="font-extralight uppercase tracking-wide text-slate-500 dark:text-slate-400">
                <FontAwesomeIcon icon={byPrefixAndName.fal['list']} className="me-2" />
                Stored lists
              </h2>

              <button
                type="button"
                className="md:hidden border-0 rounded bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-300 py-1 px-1"
                onClick={toggleOffCanvas}
                aria-label="Close settings menu"
              >
                <FontAwesomeIcon icon={byPrefixAndName.fal['xmark']} size="lg" fixedWidth />
              </button>
            </div>

            <StoredNames onSelect={closeOffCanvas} />

            <Settings />
          </div>
        </aside>
      </Transition>
    </>
  );
}

export default Aside;
