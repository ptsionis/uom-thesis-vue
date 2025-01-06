<template>
  <button
    :class="buttonClass"
    @click="getQuestion"
    :disabled="isDisabled"
  >
    {{ `${category} X${level}` }}
  </button>
</template>

<script setup>
import { inject, computed } from 'vue';

const props = defineProps({
  category: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
  turn: {
    type: Number,
    required: true,
  },
  isPlayed: {
    type: Boolean,
    required: true,
  },
});

const user = inject('user');
const socket = inject('socket');
const gameRoom = inject('gameRoom');

const getQuestion = () => {
  socket.emit('get_question', gameRoom.value, props.category, props.level);
};

const isDisabled = computed(() => {
  return user.value.id !== props.turn || props.isPlayed;
});

const buttonClass = computed(() => {
  return isDisabled.value ? 'game-category-tile-disabled' : 'game-category-tile';
});
</script>

<style scoped>
.game-category-tile {
  width: 175px;
  height: 65px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 10px;
  background-color: hsl(0, 0%, 3%);
  cursor: pointer;
  color: var(--text-primary);
}

.game-category-tile:hover {
  background-color: var(--bg-primary-d);
}

.game-category-tile-disabled {
  width: 175px;
  height: 65px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 10px;
  cursor: not-allowed;
  background-color: var(--text-disabled);
  color: var(--text-primary);
}
</style>
