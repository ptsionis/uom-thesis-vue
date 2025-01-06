<script setup>
import LoginButton from '../components/LoginButton.vue'
</script>

<template>
  <main class="login-main">
    <h1>ThesisVue</h1>
    <LoginButton />
  </main>
</template>

<style scoped>
.login-main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: var(--bg-primary);
}
</style>
