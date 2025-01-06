<template>
  <button
    :class="buttonClass"
    type="button"
    :disabled="!isButtonEnabled"
    @click="challengeFriend"
  >
    {{ buttonText }}
  </button>
</template>

<script setup>
import { computed, inject } from 'vue';
import { Availabilities } from '@/models/enums/availabilityEnum';

const props = defineProps({
  friendId: {
    type: Number,
    required: true,
  },
  availability: {
    type: String,
    required: true,
  },
});

const socket = inject('socket')

const isButtonEnabled = computed(() => {
  return props.availability === Availabilities.ONLINE;
});

const buttonText = computed(() => {
  switch (props.availability) {
    case Availabilities.ONLINE:
      return 'Play';
    case Availabilities.OFFLINE:
      return 'Offline';
    case Availabilities.PENDING:
      return 'On hold';
    case Availabilities.PLAYING:
      return 'Playing';
    default:
      return '';
  }
});

const buttonClass = computed(() => {
  return [
    'challenge-button',
    `challenge-button${isButtonEnabled.value ? '-enabled' : '-disabled'}`,
    `challenge-button-${props.availability}`,
  ].join(' ');
});

const challengeFriend = () => {
  socket.emit('challenge', props.friendId);
};
</script>

<style scoped>
.challenge-button-enabled {
  cursor: pointer;
  color: var(--text-primary);
}

.challenge-button-disabled {
  cursor: not-allowed;
  color: var(--text-primary);
}

.challenge-button-ONLINE {
  background-color: var(--btn-primary-d);
}

.challenge-button-OFFLINE {
  background-color: var(--text-disabled-d);
}

.challenge-button-PENDING {
  background-color: var(--text-disabled-d);
}

.challenge-button-PLAYING {
  background-color: var(--btn-secondary-d);
}

.challenge-button-ONLINE:hover {
  background-color: var(--btn-primary);
}
</style>
