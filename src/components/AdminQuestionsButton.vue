<template>
  <button class="main-menu-button admin-questions-button" @click="$emit('toggle-admin-questions')">All Questions</button>
</template>

<script setup>
</script>

<style scoped>
.admin-questions-button {
  background-color: var(--btn-third-d);
  color: var(--text-primary);
}

.admin-questions-button:hover {
  background-color: var(--btn-third);
}
</style>
