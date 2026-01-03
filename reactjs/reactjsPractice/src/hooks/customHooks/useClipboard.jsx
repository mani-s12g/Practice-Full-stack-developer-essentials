export function useClipboard() {
    const copy = async (text) => {
        await window.navigator.clipboard.writeText(text);
    }

    return copy;
}

// Usage
// const copy = useClipboard();
// copy("Hello World");