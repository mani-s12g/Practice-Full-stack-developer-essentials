<template>
  <ul>
    <li v-for="todo in todos" :key="todo.id" :class="{ completed: todo.completed }">
      <span @click="$emit('toggle-complete', todo.id)">
        {{ todo.text }}
      </span>
      <button @click="$emit('delete-todo', todo.id)">❌</button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'TodoList',
  props: ['todos']
}
</script>

<style scoped>
.completed { text-decoration: line-through; color: gray; }
</style>
