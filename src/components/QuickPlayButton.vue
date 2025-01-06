<template>
  <button class="main-menu-button quick-play" @click="createOpenChallenge"><span class="logout-btn-text">Quick Play</span></button>
</template>

<script setup>
import { inject } from 'vue';

const socket = inject('socket');

const createOpenChallenge = () => {
  socket.emit('challenge_open');
};
</script>

<style scoped>
.quick-play {
  background-color: var(--bg-primary-d);
  color: var(--text-primary);
}

.quick-play:hover {
  background-color: var(--bg-alt);
}
</style>
