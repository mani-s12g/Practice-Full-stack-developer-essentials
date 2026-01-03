import { useState, useEffect } from "react"

export function useDebounce(value, delay = 500) {
    const [debouncedState, setDebouncedState] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedState(value);
        }, delay);

        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedState;
} 