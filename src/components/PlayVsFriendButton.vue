<template>
  <button class="main-menu-button vs-friend-play" @click="$emit('toggle-friendlist')">Play vs Friend</button>
</template>

<script setup>
</script>

<style scoped>
.vs-friend-play {
  background-color: var(--bg-primary-d);
  color: var(--text-primary);
}

.vs-friend-play:hover {
  background-color: var(--bg-alt);
}
</style>
