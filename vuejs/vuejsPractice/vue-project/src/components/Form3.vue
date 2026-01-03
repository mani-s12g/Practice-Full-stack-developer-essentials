<template>
    <div>
        <h2>Vue - 3 Form validation & API calls</h2>
        <form @submit.prevent="handleSubmit">
            <div>
                <label for="">Name:</label>
                <input v-model="form.name" type="text" />
                <span v-if="errors.name" class="error">{{ errors.name }}</span>
            </div>
            <div>
                <label for="">Email:</label>
                <input v-model="form.email" type="email" />
                <span v-if="errors.email" class="error">{{ errors.email }}</span>
            </div>
            <button type="submit">Submit</button>
        </form>

        <div v-if="loading" >Loading...</div>
        <div v-if="userData">
            <h3>Response from API:</h3>
            <pre>{{ userData }}</pre>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from "vue"
import axios from "axios"

const form = reactive({
    name: "",
    email: ""
})

const errors = reactive({})
const loading = ref(false)
const userData = ref(null)

function validateForm () {
    errors.name = form.name ? "" : "Name is required"
    errors.email = /\S+@\S+\.\S+/.test(form.email) ? '' : 'Valid email required'
    return !errors.name && !errors.email
}

async function handleSubmit() {
  if (!validateForm()) return

  loading.value = true
  try {
    const response = await axios.post('https://jsonplaceholder.typicode.com/users', form)
    userData.value = response.data
    console.log('Form submitted:', userData.value)
  } catch (error) {
    console.error('API error:', error)
  } finally {
    loading.value = false
  }
}

</script>

<style scoped>
    .error {
        color: red;
        font-size: 0.9rem;
    }
</style>


<!-- ✅ Concepts shown: -->

<!-- Vue 3 Composition API (ref, reactive) -->