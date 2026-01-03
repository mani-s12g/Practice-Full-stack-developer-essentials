import { combineReducers } from "redux";
import userReducer from "./userReducer";

// Combine all feature reducers into a single root reducer
const rootReducer = combineReducers({
    user: userReducer, // The state slice will be available as state.user
    // Add other reducers here (e.g., posts: postsReducer)
});

export default rootReducer;