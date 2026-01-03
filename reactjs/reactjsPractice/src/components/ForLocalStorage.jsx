import useLocalStorage from "../hooks/customHooks/useLocalStorage";

export default function ForLocalStorage() {
    const { value, setToLocal } = useLocalStorage("value", "Mani");
    return (
        <div>
            <h1>ForLocalStorage</h1>
            <input type="text" value={value} onChange={(e) => setToLocal(e.target.value)} />
            <p>{value}</p>
        </div>
    );
}