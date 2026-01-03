<template>
    <div>
        <h2>Count: {{ count }}</h2>
        <button @click="increment">➕ Increment</button>
        <button @click="decrement">➖ Decrement</button>
        <button @click="reset">🔁 Reset</button>
    </div>
</template>

<script setup>
    import { ref } from 'vue'

    const count = ref(0)

    function increment () {
        count.value++
    }
    function decrement () {
        count.value--
    }
    function reset () {
        count.value = 0
    }

</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background-color: #42b883;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #2c9e70;
}
</style>