<template>
  <button class="main-menu-button submit-question-button" @click="$emit('toggle-question-form')">Submit a Question</button>
</template>

<script setup>
</script>

<style scoped>
.submit-question-button {
  background-color: var(--bg-primary-d);
  color: var(--text-primary);
}

.submit-question-button:hover {
  background-color: var(--bg-alt);
}
</style>
