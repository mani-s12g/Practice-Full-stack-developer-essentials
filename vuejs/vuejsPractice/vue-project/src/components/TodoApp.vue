<template>
    <div class="todo-app">
        <h2>Vue 2 - Todo App</h2>
        <div class="input-section">
            <input v-model="newTodo" placeholder="Enter a task" @keyup.enter="addTodo" />
            <button @click="addTodo" >Add</button>
        </div>
        <div class="controls">
            <select v-model="filter"> 
                <!-- <option v-for="value in filterOptions" :value="value">{{ value }}</option> -->
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
            </select>
            <select v-model="sortOrder">
                <option value="asc">Sort A-Z</option>
                <option value="desc">Sort Z-A</option>
            </select>
        </div>
        <TodoList :todos="sortedAndFilteredTodos"  @delete-todo="deleteTodo" @toggle-complete="toggleComplete" />
        <div class="footer">
            <p>Total Tasks: {{ todos.length }}</p>
            <p>Completed: {{ completedCount }}</p>
        </div>
    </div>
</template>

<script>
import TodoList from './TodoList.vue'

export default {
    name: "TodoApp",
    components: { TodoList },
    data() {
        return {
            todos: [],
            newTodo: "",
            filter: "all",
            sortOrder: "asc",
        }
    },
    created() {
        console.log('TodoApp created!');
        const saved = localStorage.getItem('todos')
        if(saved) this.todos = JSON.parse(saved)
    },
    mounted() {
        console.log('TodoApp mounted!')
    },
    watch: {
        todos: {
            handler(newVal) {
                localStorage.setItem('todos', JSON.stringify(newVal))
            },
            deep: true
        }
    },  
    // for derived values
    computed: {
        completedCount() {
            return this.todos.filter((t) => t.completed).length
        },
        sortedAndFilteredTodos() {
            let filtered = this.todos
            if (this.filter === "active") filtered  = this.todos.filter((t) => !t.completed)
            if (this.filter === "completed") filtered = this.todos.filter((t) => t.completed)

            const sorted = filtered.sort((a, b) => {
                if(this.sortOrder === "asc") return a.text.localeCompare(b.text)
                else return b.text.localeCompare(a.text)
            })
            return sorted
        }
    },
    methods: {
        addTodo() {
            if(!this.newTodo.trim()) return
            this.todos.push({ id: Date.now(), text: this.newTodo.trim(), completed: false })
            this.newTodo = ""
        },
        deleteTodo (id) {
            this.todos = this.todos.filter((t) => t.id !== id)
        },
        toggleComplete(id) {
           const todo =  this.todos.find((t) => t.id === id)
           if(todo) todo.completed = !todo.completed
        }
    }
}


</script>

<style scoped>
.todo-app {
  width: 400px;
  margin: auto;
  font-family: sans-serif;
}
.input-section input {
  width: 70%;
  padding: 5px;
}
.input-section button {
  padding: 5px 10px;
}
.controls {
  margin-top: 10px;
}
.footer {
  margin-top: 10px;
  font-size: 0.9rem;
}
</style>