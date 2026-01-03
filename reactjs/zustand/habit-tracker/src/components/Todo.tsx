import { useState } from "react";
import useTodoStore from "../store/store";

export default function Todo() {
    const {addTodos, todos, deleteTodos, toggleCompleted} = useTodoStore();
    const [todoText, setTodoText] = useState<string>("");
    return (
        <div className="min h-screen p-4">
            <h1 className="text-4xl font-bold text-center text-red-800">Todo App</h1>
            <input type="text" value={todoText} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTodoText(e.target.value)} />
            <button onClick={() => addTodos(todoText)}>Add Todo</button>
            {todos.length > 0 ? todos.map((todo) => (
                <div key={todo.id}>
                    <input type="checkbox" checked={todo.completed} onChange={() => toggleCompleted(todo.id)} />
                    <p>{todo.text}</p>
                    <button onClick={() => deleteTodos(todo.id)}>Delete</button>
                </div>
            )) : <p>No todos available</p>}
        </div>
    )
}