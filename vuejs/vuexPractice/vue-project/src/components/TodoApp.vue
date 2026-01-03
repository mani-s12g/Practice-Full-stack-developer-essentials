<template>
  <div class="todo-app">
    <h2>Vuex Todo App (Fixed)</h2>

    <input
      v-model="newTodo"
      placeholder="Add new task"
      @keyup.enter="addNewTodo"
    />
    <button @click="addNewTodo">Add</button>

    <ul>
      <li
        v-for="todo in filteredTodos"
        :key="todo.id"
        :class="{ completed: todo.completed }"
      >
        <span @click="toggleComplete(todo.id)">{{ todo.text }}</span>
        <button @click="deleteTodo(todo.id)">❌</button>
      </li>
    </ul>

    <p>
      {{ completedCount }} / {{ filteredTodos.length }} completed
    </p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'TodoApp',
  data() {
    return {
      newTodo: ''
    }
  },
  computed: {
    ...mapGetters(['filteredTodos', 'completedCount'])
  },
  created() {
    this.loadFromLocal()
  },
  methods: {
    ...mapActions(['addTodo', 'deleteTodo', 'toggleComplete', 'loadFromLocal']),
    addNewTodo() {
      if (!this.newTodo.trim()) return
      this.addTodo(this.newTodo)
      this.newTodo = ''
    }
  }
}
</script>

<style scoped>
.completed {
  text-decoration: line-through;
  color: gray;
}
</style>
