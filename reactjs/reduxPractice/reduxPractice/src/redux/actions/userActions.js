import {FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE} from "./types"

// --- Synchronous Action Creators ---

// Action 1: Signifies the start of the API call (to set loading state)
export const fetchUserRequest = () => ({
    type: FETCH_USER_REQUEST,
})

// Action 2: Signifies the successful API response (to save data)
export const fetchUserSuccess = (user) => ({
    type: FETCH_USER_SUCCESS,
    payload: user
})

// Action 3: Signifies a failed API response (to save error)
export const fetchUserFailure = (error) => ({
  type: FETCH_USER_FAILURE,
  payload: error,
});


// --- Asynchronous Thunk Action Creator ---
// This function RETURNS the THUNK (the function that handles async logic)

export const fetchUser = (userId) => {
    // This is the THUNK: it receives dispatch and getState (if needed)
    return async (dispatch) => {
        // 1. Dispatch REQUEST
        dispatch(fetchUserRequest());

        try {
            // 2. Perform API call (using JSONPlaceholder for a mock user)
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
            if(!response.ok) {
                throw new Error(`Failed to fetch user. Status: ${response.status}`);
            }
            const data = await response.json();
            // 3. Dispatch SUCCESS
            dispatch(fetchUserSuccess(data));
        } catch (error) {
            // 4. Dispatch FAILURE
            dispatch(fetchUserFailure(error.message));
        }
    }
}