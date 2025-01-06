<template>
  <button class="main-menu-button admin-pending-button" @click="$emit('toggle-admin-pending')">Pending Questions</button>
</template>

<script setup>
</script>

<style scoped>
.admin-pending-button {
  background-color: var(--btn-third-d);
  color: var(--text-primary);
}

.admin-pending-button:hover {
  background-color: var(--btn-third);
}
</style>
