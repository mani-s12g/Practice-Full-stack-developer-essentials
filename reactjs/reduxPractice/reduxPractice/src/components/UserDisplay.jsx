// Presentation components (No Redux)
import React from 'react';

// This component is "dumb" - it only receives props and displays them
const UserDisplay = ({ user }) => {
    if(!user) {
        return null;
    }

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h3>User: {user.name}</h3>
            <p>ID: {user.id}</p>
            <p>Email: {user.email}</p>
            <p>City: {user.address.city}</p>
        </div>
    )
}

export default UserDisplay;