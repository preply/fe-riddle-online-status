import { useEffect, useState } from "react";

function useDebounce(delay: number) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(true);

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(debouncedValue);
      }, delay);

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [delay, debouncedValue] // Only re-call effect if delay changes
  );

  return debouncedValue;
}

export default useDebounce;
