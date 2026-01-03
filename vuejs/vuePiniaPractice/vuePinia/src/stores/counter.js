// import { ref, computed } from 'vue'
// import { defineStore } from 'pinia'

// export const useCounterStore = defineStore('counter', () => {
//   const count = ref(0)
//   const doubleCount = computed(() => count.value * 2)
//   function increment() {
//     count.value++
//   }

//   return { count, doubleCount, increment }
// })


import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [],
    filter: 'all',
    sortOrder: 'asc'
  }),

  getters: {
    filteredTodos: (state) => {
      let filtered = state.todos
      if (state.filter === 'active') filtered = filtered.filter(t => !t.completed)
      if (state.filter === 'completed') filtered = filtered.filter(t => t.completed)

      const sorted = filtered.sort((a, b) => {
        return state.sortOrder === 'asc'
          ? a.text.localeCompare(b.text)
          : b.text.localeCompare(a.text)
      })
      return sorted
    },
    completedCount: (state) => state.todos.filter(t => t.completed).length,
  },

  actions: {
    addTodo(text) {
      if (!text || !text.trim()) return
      this.todos.push({ id: Date.now(), text: text.trim(), completed: false })
      this.saveToLocal()
    },
    deleteTodo(id) {
      this.todos = this.todos.filter(t => t.id !== id)
      this.saveToLocal()
    },
    toggleComplete(id) {
      const todo = this.todos.find(t => t.id === id)
      if (todo) todo.completed = !todo.completed
      this.saveToLocal()
    },
    setFilter(filter) {
      this.filter = filter
    },
    setSortOrder(order) {
      this.sortOrder = order
    },
    saveToLocal() {
      localStorage.setItem('todos', JSON.stringify(this.todos))
    },
    loadFromLocal() {
      const saved = localStorage.getItem('todos')
      if (saved) {
        try {
          this.todos = JSON.parse(saved)
        } catch {
          this.todos = []
        }
      }
    }
  }
})
