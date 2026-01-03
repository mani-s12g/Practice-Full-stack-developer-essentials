import React from "react";
import { useSelector, useDispatch } from "react-redux";
// Import the actions from the slice file
import { addPost, toggleNotifications } from "../features/data/dataSlice";

function DataComponent() {
  // Read state using useSelector
  const posts = useSelector((state) => state.data.posts);
  const settings = useSelector((state) => state.data.settings);

  // Get the dispatch function
  const dispatch = useDispatch();

  // 1. Array Mutation: Adding a Post
  const handleAddPost = () => {
    const newPost = { id: Date.now(), title: "New RTK Post " + Math.random() };
    // Dispatch the action creator (imported from the slice)
    dispatch(addPost(newPost));
  };

  // 2. Object Mutation: Toggling Notifications
  const handleToggle = () => {
    // Dispatch the action creator (imported from the slice)
    dispatch(toggleNotifications());
  };

  return (
    <>
      <div
        style={{
          marginTop: "40px",
          padding: "15px",
          border: "1px dashed blue",
        }}
      >
        <h2>Redux Toolkit Immutability Demo</h2>
        {/* Array Action */}
        <button onClick={handleAddPost}>Add New Post (RTK)</button>
        <p>Posts Count: {posts.length} </p>

        {/* Object Action */}
        <p>Notifications: {settings.notifications ? "ON" : "OFF"}</p>
        <button onClick={handleToggle}>Toggle Notifications (RTK)</button>

        <p>Last 3 Posts:</p>
        <ul>
          {posts.slice(-3).map(post => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default DataComponent;
