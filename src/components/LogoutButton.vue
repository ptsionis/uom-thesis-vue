<template>
  <button class="main-menu-button logout-btn" @click="logout"><span class="logout-btn-text">Logout</span></button>
</template>

<script setup>
import { logout } from '@/services/authServices';
</script>

<style scoped>
.logout-btn {
  background-color: var(--btn-secondary-d);
  color: var(--text-primary);
}

.logout-btn:hover {
  background-color: var(--btn-secondary);
}

.logout-btn-text {
  margin-left: 5px;
}
</style>
