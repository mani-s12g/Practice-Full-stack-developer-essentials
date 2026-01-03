import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE } from "../actions/types"

const initialState = {
    loading: false,
    user: null,
    error: null
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_REQUEST:
            // Start loading, clear previous errors
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_USER_SUCCESS:
            // Stop loading, store user data
            return {
                ...state,
                loading: false,
                user: action.payload,
                error: null
            }
        case FETCH_USER_FAILURE:
            // Stop loading, store error message
            return {
                ...state,
                loading: false,
                user: null,
                error: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;
