// ✅ 2. selectors.js (FILTER + SORT + MEMOIZATION)

// This file contains efficient, memoized selectors with Reselect.
// import { createSelector } from "reselect";

// use this redux officially recommended when using rtk
import { createSelector } from "@reduxjs/toolkit";


// Base selectors
const selectTodoState = (state) => state.todosFromStore; // (selecting whole todos state from  todosFromStore)

// (selecting todos from todos state)
const selectTodos = createSelector([selectTodoState], (state) => state.todos); 

// (selecting filter from todos state)
const selectFilter = createSelector([selectTodoState], (state) => state.filter); 

// (selecting sortBy from todos state)
const selectSortBy = createSelector([selectTodoState], (state) => state.sortBy); 


// Filter todos (memoized)
const selectFilteredTodos = createSelector(
    [selectTodos, selectFilter],
    (todos, filter) => {
        console.log("Calculating ...selectFilteredTodos");
        if (filter === "all") return todos;
        if (filter === "active") return todos.filter((todo) => !todo.completed);
        if (filter === "completed") return todos.filter((todo) => todo.completed);
        return todos;
    }
);

// Sort todos (memoized)
export const selectSortedTodos = createSelector(
    [selectFilteredTodos, selectSortBy],
    (todos, sortBy) => {
        console.log("Calculating ...selectSortedTodos");
        const sortedTodos = [...todos]; // Create a copy to avoid mutating state (check comments down for this...)
        if (sortBy === "createdAt") return sortedTodos.sort((a, b) => b.createdAt - a.createdAt);
        if (sortBy === "alphabetical (A-Z)") return sortedTodos.sort((a, b) => a.text.localeCompare(b.text));
        if (sortBy === "alphabetical (Z-A)") return sortedTodos.sort((a, b) => b.text.localeCompare(a.text));
        return sortedTodos;
    }
);

// ✔ What this gives you:
// Layer	What It Does	Memoized?
// selectItems	pulls todos list	✔
// selectFilteredTodos	filters todos by status	✔
// selectSortedTodos	sorts filtered todos	✔

// Selectors only recompute when their inputs change — very fast.



// check comment here for line 30
// The error Cannot assign to read only property '0' of object '[object Array]' happens
// because Array.prototype.sort() mutates the array in place. Since the todos array comes
// from the Redux state (which is immutable), you cannot sort it directly.

// I fixed this by creating a shallow copy of the array using [...todos] before sorting.