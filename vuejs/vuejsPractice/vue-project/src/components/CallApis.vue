<template>
    <div>
        <div v-if="loading">Loading...</div>
        <div v-else-if="error">Error: {{ error }}</div>
        <ul v-else>
            <li v-for="user in users" :key="user.id">{{ user.name }}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                users: [],
                loading: true,
                error: null
            };
        },
        mounted() {
            fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                if(!response.ok) {
                    throw new Error('Some error occurred!');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.users = data;
                this.loading = false;
            })
            .catch(error => {
                this.error = error.message;
                this.loading = false;
            });
        }
    }
</script>

<style lang="scss" scoped>

</style>