<template>
  <div>
    <h3>API Response (from Child):</h3>
    <pre>{{ data }}</pre>
  </div>
</template>

<script setup>
defineProps(['data'])
</script>