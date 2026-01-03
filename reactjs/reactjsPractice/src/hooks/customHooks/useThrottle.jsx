import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

export function useThrottle(value, delay = 500) {
    const [throttledValue, setThrottledValue] = useState(value);
    const lastRun = useRef(Date.now());

    useEffect(() => {
        const now = Date.now();
        if (now - lastRun.current >= delay) {
            setThrottledValue(value);
            lastRun.current = now;
        }
    }, [value, delay]);

    return throttledValue;
}


// Usage
// const throttledScroll = useThrottle(scrollY, 300);
