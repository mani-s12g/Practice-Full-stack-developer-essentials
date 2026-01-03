import React, { useEffect } from 'react';
import UserComponent from '../components/UserComponent';

function UserPage() {
    useEffect(() => {
        console.log("UserPage mounted...");

        return () => {
            console.log("UserPage unmounted...");
        }
    }, []);
    return (
        <div>
            <UserComponent />
        </div>
    );
}

export default UserPage;
