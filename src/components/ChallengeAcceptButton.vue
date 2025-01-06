<template>
  <button class="challenge-accept-button" @click="acceptChallenge">
    Ac
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

const acceptChallenge = () => {
  socket.emit('challenge_accept', props.friendId);
};
</script>

<style scoped>
.challenge-accept-button {
  width: 45px;
  height: 40px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 2.5px;
  padding: 15px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  color: var(--text-primary);
  background-color: var(--btn-third-d);
}

.challenge-accept-button:hover {
  background-color: var(--btn-third);
}
</style>
