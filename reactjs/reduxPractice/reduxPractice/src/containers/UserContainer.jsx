// (Container Component)

import React, { useEffect } from 'react';
import {connect} from "react-redux";
import { fetchUser } from '../redux/actions/userActions';
import UserDisplay from '../components/UserDisplay';

const UserContainer = ({ user, loading, error, fetchUser }) => {
    // Use useEffect to trigger the Thunk (API call) when the component mounts
    useEffect(() => {
        // Dispatch the thunk action creator
        fetchUser(1); // Fetch user with ID 1
    }, [fetchUser]); // Depend on fetchUser, which is stable via connect

    if (loading) {
        return <p>Loading user data...</p>;
    }
    if (error) {
        return <p style={{ color: 'red' }}>Error: {error}</p>;
    }

    return (
        <div>
            <h1>Classic Redux Thunk Demo</h1>
            <UserDisplay user={user} />
        </div>
    )
}

// 1. mapStateToProps: connects state slices to component props
const mapStateToProps = (state) => ({
    user: state.user.user,
    loading: state.user.loading,
    error: state.user.error,
});

// 2. mapDispatchToProps (Object shorthand): connects action creators to props.
// The `connect` function automatically wraps fetchUser in `dispatch()`.
const mapDispatchToProps = {
  fetchUser,
};

// Connect UserContainer to the Redux store
export default connect(mapStateToProps, mapDispatchToProps) (UserContainer);