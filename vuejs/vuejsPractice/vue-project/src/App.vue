<template>
  <!-- <h1>You did it!</h1>
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
  </p> -->
  <div class="app">
    <h1>🧮 Vue Counter App</h1>
    <!-- <Counter /> -->
    <!-- <CallApis /> -->
    <!-- <Form /> -->
    <!-- <Form3 /> -->
    <!-- <FormParent /> -->
    <!-- <Form3Parent /> -->
    <TodoApp />
    <!-- <Todo3App /> -->
  </div>
</template>

<script setup>
  import Counter from "./components/Counter.vue";
  import CallApis from "./components/CallApis.vue";
import Form from "./components/Form.vue";
import Form3 from "./components/Form3.vue";
import FormParent from "./components/FormParent.vue";
import Form3Parent from "./components/Form3Parent.vue";
import TodoApp from "./components/TodoApp.vue";
import Todo3App from "./components/Todo3App.vue";
</script>

<style>
  .app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
    margin-top: 50px;
  }
</style>
