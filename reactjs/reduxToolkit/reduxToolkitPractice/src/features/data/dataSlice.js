import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [
    {
      id: 101,
      title: "Old post",
    },
    {
      id: 102,
      title: "Draft",
    },
  ],
  settings: {
    theme: "light",
    notifications: true,
  },
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    // 1. ADDING to an Array (e.g., a new post)
    addPost: (state, action) => {
      // 🛑 RTK/Immer allows direct pushing!
      state.posts.push(action.payload);
    },
    // 2. UPDATING an Object (e.g., toggling a boolean)
    toggleNotifications: (state) => {
      state.settings.notifications = !state.settings.notifications;
    },
    // 3. DELETING from an Array (requires finding the index)
    deletePost: (state, action) => {
      const index = state.posts.findIndex(
        (post) => post.id == action.payload.id
      );
      if (index !== -1) {
        // If you wanted to log the deleted item, you'd find it here:
        // console.log("Post to be deleted:", state.posts[index]);

        // Then you perform the deletion:
        // 🛑 RTK/Immer allows direct splicing!
        state.posts.splice(index, 1);
      }
    },
    // 4. UPDATING an Item in an Array
    updatePostTitle: (state, action) => {
      const postToUpdate = state.posts.find(
        (post) => post.id == action.payload.id
      );
      if (postToUpdate) {
        // 🛑 RTK/Immer allows direct property assignment on the item!
        postToUpdate.title = action.payload.newTitle;
      }
    },
  },
});

export const { addPost, toggleNotifications, deletePost, updatePostTitle } =
  dataSlice.actions;
export default dataSlice.reducer;
