import { createStore } from 'vuex'

export default createStore({
  state: {
    todos: [],
    filter: 'all',
    sortOrder: 'asc'
  },
  getters: {
    filteredTodos(state) {
      let filtered = state.todos
      if (state.filter === 'active') filtered = state.todos.filter(t => !t.completed)
      if (state.filter === 'completed') filtered = state.todos.filter(t => t.completed)

      // copy filtered before sorting so we don't mutate state from a getter
      return [...filtered].sort((a, b) => {
        const textA = String(a?.text ?? '');
        const textB = String(b?.text ?? '');
        const comparison = textA.toLowerCase().localeCompare(textB.toLowerCase());
        return state.sortOrder === 'asc' ? comparison : -comparison;
      })
    },
    completedCount: (state) => state.todos.filter(t => t.completed).length,
  },
  mutations: {
    ADD_TODO(state, text) {
      if (!text || !text.trim()) return
      state.todos.push({ id: Date.now(), text: text.trim(), completed: false })
    },
    DELETE_TODO(state, id) {
      state.todos = state.todos.filter(t => t.id !== id)
    },
    TOGGLE_COMPLETE(state, id) {
      const todo = state.todos.find(t => t.id === id)
      if (todo) todo.completed = !todo.completed
    },
    SET_FILTER(state, filter) {
      state.filter = filter
    },
    SET_SORT_ORDER(state, order) {
      state.sortOrder = order
    },
    LOAD_TODOS(state, todos) {
      state.todos = todos || []
    }
  },
  actions: {
    addTodo({ commit }, text) {
        if (typeof text !== 'string') return
      commit('ADD_TODO', text)
    },
    deleteTodo({ commit }, id) {
      commit('DELETE_TODO', id)
    },
    toggleComplete({ commit }, id) {
      commit('TOGGLE_COMPLETE', id)
    },
    saveToLocal({ state }) {
      localStorage.setItem('todos', JSON.stringify(state.todos))
    },
    loadFromLocal({ commit }) {
      const saved = localStorage.getItem('todos')
      if (saved) commit('LOAD_TODOS', JSON.parse(saved))
    }
  }

// actions: {
//     addTodo({ commit, dispatch }, text) {
//       // Ensure the action only runs if we get a string
//       if (typeof text !== 'string') return
//       commit('ADD_TODO', text)
//       dispatch('saveToLocal')
//     },
//     deleteTodo({ commit, dispatch }, id) {
//       commit('DELETE_TODO', id)
//       dispatch('saveToLocal')
//     },
//     toggleComplete({ commit, dispatch }, id) {
//       commit('TOGGLE_COMPLETE', id)
//       dispatch('saveToLocal')
//     },
//     saveToLocal({ state }) {
//       localStorage.setItem('todos', JSON.stringify(state.todos))
//     },
//     loadFromLocal({ commit }) {
//       const saved = localStorage.getItem('todos')
//       if (saved) commit('LOAD_TODOS', JSON.parse(saved))
//     }
//   }
})
