import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    todos: [],
    inputTodo: "",
    filter: "all", // all, active, completed,
    sortBy: "createdAt", // "createdAt" | "alphabetical (A-Z or Z-A)",
    count: 0,
}

export const todosSlice = createSlice({
    name: "snTodos",
    initialState,
    reducers: {
        setInputTodo: (state, action) => {
            state.inputTodo = action.payload;
        },
        addTodo: (state, action) => {
            state.todos.push({
                id: Date.now(),
                text: action.payload,
                completed: false,
            });
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id != action.payload);
        },
        toggleCompleted: (state, action) => {
            state.todos = state.todos.map((todo) => todo.id == action.payload ? { ...todo, completed: !todo.completed } : todo);
            // const todo = state.items.find(t => t.id === action.payload);
            // if (todo) todo.completed = !todo.completed;
        },
        resetTodos: (state) => {
            state.todos = [];
        },
        resetInputTodo: (state) => {
            state.inputTodo = "";
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload;
        },
        incrementCount: (state) => {
            state.count++;
        },
        decrementCount: (state) => {
            state.count--;
        }
    }
})

export const { setInputTodo, addTodo, deleteTodo, toggleCompleted, resetInputTodo, resetTodos, setFilter, setSortBy, incrementCount, decrementCount } = todosSlice.actions;
export default todosSlice.reducer;
