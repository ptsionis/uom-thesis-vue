<template>
  <button
    class="challenge-button challenge-button-cancel"
    @click="cancelChallenge"
  >
    Cancel
  </button>
</template>

<script setup>
import { inject, defineProps } from 'vue';

const props = defineProps({
  friendId: {
    type: Number,
  },
});

const socket = inject('socket');

const cancelChallenge = () => {
  if (props.friendId) {
    socket.emit('challenge_cancel', props.friendId);
  } else {
    socket.emit('open_challenge_cancel');
  }
};
</script>

<style scoped>
.challenge-button-cancel {
  cursor: pointer;
  color: var(--text-primary);
  background-color: var(--btn-secondary-d);
}

.challenge-button-cancel:hover {
  background-color: var(--btn-secondary);
}
</style>
