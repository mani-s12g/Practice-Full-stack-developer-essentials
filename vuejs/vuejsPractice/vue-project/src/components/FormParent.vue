<template>
    <div>
        <h2>Vue - 2 User Registration Form</h2>
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
        <!-- <div v-if="userData"> -->
            <!-- <h3>Response from API:</h3> -->
            <!-- <pre>{{ userData }}</pre> -->
        <!-- </div> -->

        <!-- Passing data to child -->
        <UsersDataChild v-if="userData" :data="userData" />
    </div>
</template>

<script>
import axios from "axios"
import UsersDataChild from "./UsersDataChild.vue"; // child import

export default {
    name: 'FormParent',
    components: { UsersDataChild },
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
    computed : {
        // Example: computed property that reacts to form changes
        isFormValid () {
            return this.form.name && /\S+@\S+\.\S+/.test(this.form.email)
        }
    },
    watch: {
        'form.email'(newVal) {
            console.log('Email changed:', newVal)
            if(!/\S+@\S+\.\S+/.test(newVal)) {
                this.errors.email = 'Email invalid'
            } else {
                this.errors.email = ''
            }
        }
    },
    created() {
        console.log('Component created — data initialized')
    },
    mounted() {
        console.log('Component mounted — DOM ready')
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