<template>
  <button class="challenge-decline-button" @click="declineChallenge">
    De
  </button>
</template>

<script setup>
import { inject, defineProps } from 'vue';

const props = defineProps({
  friendId: {
    type: Number,
    required: true,
  },
});

const socket = inject('socket');

const declineChallenge = () => {
  socket.emit('challenge_decline', props.friendId);
};
</script>

<style scoped>
.challenge-decline-button {
  width: 45px;
  height: 40px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 2.5px;
  padding: 15px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  color: var(--text-primary);
  background-color: var(--btn-secondary-d);
}

.challenge-decline-button:hover {
  background-color: var(--btn-secondary);
}
</style>
