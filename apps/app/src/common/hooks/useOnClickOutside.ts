import { RefObject, useEffect } from 'react';

/**
 * Hook to handle click outside of an element
 */
export const useOnClickOutside = (
  refs: RefObject<HTMLElement | null>[],
  handler: (event: MouseEvent | TouchEvent) => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (
        Array.isArray(refs) &&
        refs.some((ref) => ref.current && ref.current.contains(event.target as Node))
      ) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [refs, handler]);
};
