<template>
  <div>
    <h2>Vue 3 - User Registration Form</h2>

    <form @submit.prevent="handleSubmit">
      <div>
        <label>Name:</label>
        <input v-model="form.name" type="text" />
        <span class="error" v-if="errors.name">{{ errors.name }}</span>
      </div>

      <div>
        <label>Email:</label>
        <input v-model="form.email" type="email" />
        <span class="error" v-if="errors.email">{{ errors.email }}</span>
      </div>

      <button type="submit">Submit</button>
    </form>

    <div v-if="loading">Loading...</div>

    <UsersDataChild3 v-if="userData" :data="userData" />
  </div>
</template>

<script setup>
import { reactive, ref, computed, watch, onMounted, onBeforeMount } from "vue"
import axios from "axios"
import UsersDataChild3 from "./UsersDataChild3.vue";


const form = reactive({
    name: "",
    email: ""
})
const errors = reactive({});
const loading = ref(false);
const userData = ref(null);

// Computed property
const isFormValid = computed(() => {
    return form.name && /\S+@\S+\.\S +/.test(form.email)
})

// Watcher
watch(() => form.email, (newVal) => {
    console.log('Email changed:', newVal)
    errors.email = /\S+@\S+\.\S+/.test(newVal) ? "" : 'Email invalid'
})
// watch(() => form.email, (newVal) => {
//     console.log('Email changed:', newVal)
//     errors.email = /\S+@\S+\.\S+/.test(newVal) ? "" : 'Email invalid'
// })

// Lifecycle Hooks
onBeforeMount(() => console.log('Before mount'))
onMounted(() => console.log('Mounted — DOM ready'))

// Methods (plain functions)
function validateForm() {
  errors.name = form.name ? '' : 'Name required'
  errors.email = /\S+@\S+\.\S+/.test(form.email) ? '' : 'Valid email required'
  return !errors.name && !errors.email
}

async function handleSubmit () {
    if(!validateForm()) return

    loading.value = true;
    try {
        const res = await axios.post("https://jsonplaceholder.typicode.com/users", form);
        userData.value = res.data;
        console.log('Submitted successfully:', res.data)
    } catch (e) {
        console.error("API error:", e);
    } finally {
        loading.value = false;
    }
}

</script>