// 2. Redux Toolkit Data Slice (Local State/UI Manipulation)
// This slice holds the UI state for filtering/sorting the fetched data and a temporary user object.

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterText: "",
  sortOrder: "name_asc",
  selectedUser: null, // Holds a temporary object for manipulation
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // 1. Manipulating Primitive State (Strings)
    setFilterText: (state, action) => {
      state.filterText = action.payload;
    },
    // 2. Manipulating Primitive State (Strings - Array Sorting Logic)
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    // 3. Manipulating Object State
    setSelectedUser: (state, action) => {
      // Here we could deep copy the object if needed, but RTK handles immutability
      state.selectedUser = action.payload;
    },
    // 4. Manipulating the selected object's property
    updateSelectedUserName: (state, action) => {
        if (state.selectedUser) {
            state.selectedUser.name = action.payload;
        }
    }
  },
});

export const { setFilterText, setSortOrder, setSelectedUser, updateSelectedUserName } = userSlice.actions;
export default userSlice.reducer;