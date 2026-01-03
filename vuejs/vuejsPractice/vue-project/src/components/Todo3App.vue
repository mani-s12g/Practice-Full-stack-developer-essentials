<template>
  <div class="todo-app">
    <h2>Vue 3 - Todo App</h2>

    <div class="input-section">
      <input v-model="newTodo" placeholder="Enter a task" @keyup.enter="addTodo" />
      <button @click="addTodo">Add</button>
    </div>

    <div class="controls">
      <select v-model="filter">
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>

      <select v-model="sortOrder">
        <option value="asc">Sort A-Z</option>
        <option value="desc">Sort Z-A</option>
      </select>
    </div>

    <TodoList
      :todos="sortedAndFilteredTodos"
      @delete-todo="deleteTodo"
      @toggle-complete="toggleComplete"
    />

    <div class="footer">
      <p>Total Tasks: {{ todos.length }}</p>
      <p>Completed: {{ completedCount }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, onBeforeMount } from 'vue'
import TodoList from './TodoList.vue'

const todos = ref([])
const newTodo = ref('')
const filter = ref('all')
const sortOrder = ref('asc')

// Lifecycle hooks
onBeforeMount(() => console.log('Before mount'))
onMounted(() => {
  console.log('Mounted!')
  const saved = localStorage.getItem('todos')
  if (saved) todos.value = JSON.parse(saved)
})

// Watcher to persist todos
watch(todos, (newVal) => {
  localStorage.setItem('todos', JSON.stringify(newVal))
}, { deep: true })

// Computed properties
const completedCount = computed(() => todos.value.filter(t => t.completed).length)

const sortedAndFilteredTodos = computed(() => {
  let filtered = todos.value
  if (filter.value === 'active') filtered = todos.value.filter(t => !t.completed)
  if (filter.value === 'completed') filtered = todos.value.filter(t => t.completed)

  const sorted = filtered.sort((a, b) => {
    return sortOrder.value === 'asc'
      ? a.text.localeCompare(b.text)
      : b.text.localeCompare(a.text)
  })
  return sorted
})

// Methods (as plain functions)
function addTodo() {
  if (!newTodo.value.trim()) return
  todos.value.push({ id: Date.now(), text: newTodo.value.trim(), completed: false })
  newTodo.value = ''
}

function deleteTodo(id) {
  todos.value = todos.value.filter(t => t.id !== id)
}

function toggleComplete(id) {
  const todo = todos.value.find(t => t.id === id)
  if (todo) todo.completed = !todo.completed
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
