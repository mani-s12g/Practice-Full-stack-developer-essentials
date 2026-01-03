import { useState } from "react";

export function useForm(initialValue) {
    const [value, setValue] = useState(initialValue);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValue((prev) => ({
            ...prev,
            [name]: value,
        }))
    };

    const reset = () => setValue(initialValue);

    return { value, handleChange, reset };
}


// Usage
// const { value, handleChange, reset } = useForm({ email: "", password: "" });