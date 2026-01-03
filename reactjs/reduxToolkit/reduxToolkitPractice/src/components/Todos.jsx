// before ( commented code ) not memoized ❌
// ✅ 3. TodoList.jsx (uses memoized selector)

import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
    setInputTodo, addTodo, deleteTodo, toggleCompleted, resetTodos, resetInputTodo,
    setFilter, setSortBy, incrementCount, decrementCount
} from "../features/todos/todosSlice";

import { selectSortedTodos } from "../features/todos/selectors";

export default function Todos() {
    // const { todos, inputTodo, filter, sortBy } = useSelector((state) => state.todosFromStore);
    const { inputTodo, sortBy } = useSelector((state) => state.todosFromStore);

    // memoized selector
    const todos = useSelector(selectSortedTodos);
    const dispatch = useDispatch();
    // const [count, setCount] = useState(0);
    const count = useSelector((state) => state.todosFromStore.count);

    // derived state ( not memoized ❌ )
    // const filteredTodos = todos.filter((todo) => {
    //     console.log("calculating ...filteredTodos");
    //     if (filter === 'completed') return todo.completed;
    //     if (filter === 'active') return !todo.completed;
    //     return true;
    // });

    return (
        <div>
            <h1>Todos</h1>
            <p>Count: {count}</p>
            <button onClick={() => dispatch(incrementCount())}>Increment</button>
            <button onClick={() => dispatch(decrementCount())}>Decrement</button>

            <br />
            <input type="text" value={inputTodo} onChange={(e) => dispatch(setInputTodo(e.target.value))} />
            <button onClick={() => { dispatch(addTodo(inputTodo)); dispatch(resetInputTodo()) }}>Add Todo</button>

            {/* TODOS */}
            {!todos.length ? (
                <p>No todos available</p>
            ) : (
                todos.map((todo) => (
                    <div key={todo.id}>
                        <p>{todo.text}</p>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => dispatch(toggleCompleted(todo.id))}
                        />
                        <p>{todo.completed ? "Completed" : "Not Completed"}</p>
                        <button onClick={() => dispatch(deleteTodo(todo.id))}>Delete ❌</button>
                        {/* <button onClick={() => dispatch(toggleCompleted(todo.id))}>Toggle ✔</button> */}
                    </div>
                ))
            )}

            <br />
            <button onClick={() => dispatch(resetTodos())}>Reset Todos</button>
            <button onClick={() => dispatch(resetInputTodo())}>Reset Input</button>

            {/* FILTER CONTROLS */}
            <h2>Filters</h2>
            <button onClick={() => dispatch(setFilter('all'))}>All</button>
            <button onClick={() => dispatch(setFilter('active'))}>Active ( Incomplete )</button>
            <button onClick={() => dispatch(setFilter('completed'))}>Completed</button>
            {/* <button onClick={() => dispatch(setFilter('all'))} disabled={filter === 'all'}>All</button>
            <button onClick={() => dispatch(setFilter('active'))} disabled={filter === 'active'}>Active ( Incomplete )</button>
            <button onClick={() => dispatch(setFilter('completed'))} disabled={filter === 'completed'}>Completed</button> */}

            {/* SORT CONTROLS */}
            <div>
                <button onClick={() => dispatch(setSortBy('createdAt'))}>Sort by Date</button>
                <button onClick={() => dispatch(setSortBy('alphabetical (A-Z)'))}>Sort by A-Z</button>
                <button onClick={() => dispatch(setSortBy('alphabetical (Z-A)'))}>Sort by Z-A</button>
            </div>
        </div>
    )
}

// ⭐ Summary — You Now Have:
// ✔ Filtering (all / completed / incomplete)
// ✔ Sorting (日期 or A–Z)
// ✔ Memoization (every stage optimized)
// ✔ Clean module organization
// ✔ Scalable project structure

// This is exactly how production-grade Redux apps implement feature modules.