import React, { useState } from "react";

interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

export default function TodoApp() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [todoText, setTodoText] = useState<string>("");

    const addTodos = () => {
        if(todoText.trim()) {
            setTodos((prev) => [...prev, {id: Date.now().toString(), text: todoText, completed: false }])
            setTodoText("")
        }
    }
    const handleDelete = (id: string) => {
        setTodos((prev) => prev.filter(p => p.id !== id));
    }
    const toggleCompleted = (id: string) => {
        setTodos((prev) => prev.map(p => p.id == id ? {...p, completed: !p.completed}: p));
        // const g = todos.find(t => t.id == id);
        // if(g) {
        //     g.completed = !g.completed;
        //     setTodos([...todos])
        // }
    }
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter")  {
            addTodos();
        }
    }
    const activeTodos = todos.filter(t => !t.completed).length;
    return (
        <>
        <input type="text" value={todoText} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTodoText(e.target.value) } onKeyPress={handleKeyPress} />
        <button onClick={addTodos} disabled={todoText.trim() === ""}>Add Todo</button>

        {todos.length > 0 ? todos.map((todo) => (
            <div key={todo.id}>
            <input type="checkbox" checked={todo.completed} onChange={() => toggleCompleted(todo.id)} />
            <p>{todo.text}</p>
            <button onClick={() =>handleDelete(todo.id)}>Delete</button>
            </div>
        )) : <p>No todos available</p>}
        <p>Active todos: {activeTodos}</p>
        </>
    )
}