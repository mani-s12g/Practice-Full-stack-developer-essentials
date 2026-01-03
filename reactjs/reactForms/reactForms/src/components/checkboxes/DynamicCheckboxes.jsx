// 10: 13

import { useEffect } from "react";
import { useState } from "react";

export default function DynamicCheckboxes() {
    const initialItems = [
        { id: '1', label: 'apple', isChecked: false },
        { id: '2', label: 'banana', isChecked: false },
        { id: '3', label: 'orange', isChecked: false },
    ]
    const [items, setItems] = useState(initialItems);

    const handleChange = (id) => {
        // setItems(
        //     items.map((item) => item.id == id ? { ...item, isChecked: !item.isChecked } : item)
        // )
        // setItems((prevItems) => {
        //     return prevItems.map((item) => item.id == id ? { ...item, isChecked: !item.isChecked } : item)
        // })
        const updatedItems = items.map((item) => item.id == id ? { ...item, isChecked: !item.isChecked } : item);
        setItems(updatedItems);
        localStorage.setItem('items', JSON.stringify(updatedItems));
    }


    // Get the currently selected items
    const selectedItems = items.filter((item) => item.isChecked);
    localStorage.setItem('items', JSON.stringify(selectedItems));

    const getStoredItems = () => localStorage.getItem('items');

    useEffect(() => {
        const val = getStoredItems();
        console.log(val);
    }, [items]);
    return (
        <div>
            <h1>Dynamic Checkboxes</h1>
            {items.length && (
                items.map((item) => (
                    <div key={item.id}>
                        <input type="checkbox" id={item.id} checked={item.isChecked} onChange={() => handleChange(item.id)} />
                        <label htmlFor={item.id}>{item.label}</label>
                    </div>
                ))
            )}

            {selectedItems.length > 0 && (
                <div>
                    <h2>Selected Items</h2>
                    <ul>
                        {selectedItems.map((item) => (
                            <li key={item.id}>{item.label}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}