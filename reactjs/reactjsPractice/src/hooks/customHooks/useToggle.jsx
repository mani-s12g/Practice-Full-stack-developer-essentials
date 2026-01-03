import { useState } from "react";

export function useToggle(initialValue) {
    const [value, setValue] = useState(initialValue);

    const toggle = () => setValue((prev) => !prev);
    return { value, toggle };

    // send as array(when using we can rename to anything we want)
    // return [value, toggle];
}

// Usage
// const { value, toggle } = useToggle(false);

// if used as array
// const [isOpen, toggleModal] = useToggle();
