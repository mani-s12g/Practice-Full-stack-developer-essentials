<template>
    <div>
        <h2>Vue - 2 Form validation & API calls</h2>
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

<script>
import axios from "axios"

export default {
    name: 'Form',
    data() {
        return {
            form: {
                name: '',
                email: ''
            },
            errors: {},
            loading: false,
            userData: null
        }
    },
    methods: {
        validateForm () {
            this.errors = {}
            if(!this.form.name) this.errors.name = "Name is required"
            if(!this.form.email || !/\S+@\S+\.\S+/.test(this.form.email))
                this.errors.email = "Valid email required"
            return Object.keys(this.errors).length === 0
        },
        async handleSubmit () {
            if(!this.validateForm()) return

            this.loading = true
            try {
                const res = await axios.post('https://jsonplaceholder.typicode.com/users', this.form);
                this.userData = res.data;
                console.log('Form Submitted:', this.userData)
            } catch (e) {
                console.error('API Error:', e)
            } finally {
                this.loading = false
            }
        }
    }
}
</script>

<style scoped>
    .error {
        color: red;
        font-size: 0.9rem;
    }
</style>


<!-- ✅ Concepts shown:
Vue 2 Options API (data, methods)
v-model for two-way binding
Manual validation
Async API call with axios -->