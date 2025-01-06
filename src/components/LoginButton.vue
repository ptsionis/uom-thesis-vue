<template>
  <button class="login-button" @click="login"><span class="login-button-text">Login</span></button>
</template>

<script setup>
import { login } from '@/services/authServices';
</script>

<style scoped>
.login-button {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
  padding: 12.5px 20px 12.5px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  color: var(--text-primary);
  background-color: #42b883;
}

.login-button-text {
  margin-left: 5px;
}

.login-button:hover {
  background-color: #339d6d;
}
</style>
