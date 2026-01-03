import React, { useState } from 'react';

function MyCheckbox() {
    // Declare a state variable 'isChecked' and a function 'setIsChecked' to update it.
    // Initialize 'isChecked' to false, meaning the checkbox starts unchecked.
    const [isChecked, setIsChecked] = useState(false);

    // Event handler for when the checkbox's state changes.
    const handleCheckboxChange = () => {
        // Update the 'isChecked' state with the new checked status from the event target.
        setIsChecked(!isChecked);
    };
    // const handleCheckboxChange = (event) => {
    //     // Update the 'isChecked' state with the new checked status from the event target.
    //     setIsChecked(event.target.checked);
    // };

    return (
        <div>
            <label>
                <input
                    type="checkbox"
                    checked={isChecked} // The 'checked' prop controls the checkbox's visual state.
                    onChange={handleCheckboxChange} // The 'onChange' prop handles state updates.
                />
                Check me!
            </label>
            <p>Checkbox is {isChecked ? 'checked' : 'unchecked'}.</p>
        </div>
    );
}

export default MyCheckbox;