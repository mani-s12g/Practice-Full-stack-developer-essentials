<template>
  <ul>
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
defineProps({
  todos: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.completed {
  text-decoration: line-through;
  color: gray;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
}
button {
  margin-left: 10px;
}
</style>
