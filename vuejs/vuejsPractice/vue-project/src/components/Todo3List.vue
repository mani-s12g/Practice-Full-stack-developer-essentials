<template>
  <ul class="todo-list">
    <li
      v-for="todo in todos"
      :key="todo.id"
      :class="{ completed: todo.completed }"
    >
      <span @click="$emit('toggle-complete', todo.id)">
        {{ todo.text }}
      </span>
      <button @click="$emit('delete-todo', todo.id)">❌</button>
    </li>
  </ul>
</template>

<script setup>
defineProps(['todos'])
</script>

<style scoped>
.todo-list {
  list-style: none;
  padding: 0;
}
.todo-list li {
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
  cursor: pointer;
}
.completed {
  text-decoration: line-through;
  color: gray;
}
</style>
