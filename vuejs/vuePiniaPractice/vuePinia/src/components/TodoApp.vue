<template>
  <div class="todo-app">
    <h2>Vue 3 + Pinia Todo App (Fixed)</h2>

    <div class="controls">
      <input
        v-model="newTodo"
        placeholder="Add new task"
        @keyup.enter="addNewTodo"
      />
      <button @click="addNewTodo">Add</button>

      <select v-model="todoStore.filter">
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>

      <select v-model="todoStore.sortOrder">
        <option value="asc">Sort A-Z</option>
        <option value="desc">Sort Z-A</option>
      </select>
    </div>

    <TodoList
      :todos="todoStore.filteredTodos"
      @delete-todo="todoStore.deleteTodo"
      @toggle-complete="todoStore.toggleComplete"
    />

    <p>
      {{ todoStore.completedCount }} /
      {{ todoStore.filteredTodos.length }} completed
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTodoStore } from '../stores/counter'
import TodoList from './TodoList.vue'

const todoStore = useTodoStore()
const newTodo = ref('')

onMounted(() => {
  todoStore.loadFromLocal()
})

function addNewTodo() {
  if (!newTodo.value.trim()) return
  todoStore.addTodo(newTodo.value.trim())
  newTodo.value = ''
}
</script>

<style scoped>
.todo-app {
  width: 700px;
  margin: 20px auto;
  font-family: sans-serif;
}
.controls {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 15px;
  align-items: center;
}
.completed {
  text-decoration: line-through;
  color: gray;
}
</style>
