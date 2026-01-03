import { create } from "zustand";

interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

interface TodoState {
    todos: Todo[];
    addTodos: (text: string) => void;
    deleteTodos: (id: string) => void;
    toggleCompleted: (id: string) => void;
}
const useTodoStore = create<TodoState>((set) => {
    return {
        todos: [],
        addTodos: (text: string) => {
            set((state) => ({
                todos: [...state.todos, {id: Date.now().toString(), text: text, completed: false}]
            }))
        },
        deleteTodos: (id: string) => {
            set((state) => ({
                todos: state.todos.filter(t => t.id !== id)
            }))
        },
        toggleCompleted: (id: string) =>{
            set((state) => ({
                todos: state.todos.map(t => t.id === id ? {...t, completed: !t.completed}: t)
            }))
        }
    }
})

export default useTodoStore
