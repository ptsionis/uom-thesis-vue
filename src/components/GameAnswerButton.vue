<template>
  <button
    :class="buttonClassName"
    @click="sendAnswer"
    :disabled="isDisabled"
  >
    {{ props.text }}
  </button>
</template>

<script setup>
import { ref, onMounted, inject, watch, defineProps } from 'vue';

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  turn: {
    type: Number,
    required: true,
  },
});

const user = inject('user');
const gameRoom = inject('gameRoom');
const socket = inject('socket');

const buttonClassName = ref('game-answer-button');
const isDisabled = ref(false);

const sendAnswer = () => {
  socket.emit('submit_answer', gameRoom.value, props.id);
};

onMounted(() => {
  if (props.turn !== user.value.id) {
    buttonClassName.value = 'game-answer-button-disabled';
  }

  socket.on('selected_answer', (answerId) => {
    isDisabled.value = true;
    if (answerId === props.id) {
      buttonClassName.value = 'game-answer-button-selected';
    } else {
      buttonClassName.value = 'game-answer-button-unselected';
    }
  });

  socket.on('reveal_answer', (answerId, correctId) => {
    if (props.id === correctId) {
      buttonClassName.value = 'game-answer-button-correct';
    }
    if (props.id === answerId && props.id !== correctId) {
      buttonClassName.value = 'game-answer-button-wrong';
    }
  });
});

watch(() => props.turn, (newTurn) => {
  if (newTurn !== user.value.id) {
    buttonClassName.value = 'game-answer-button-disabled';
  } else {
    buttonClassName.value = 'game-answer-button';
  }
});
</script>

<style scoped>
.game-answer-button {
  width: 100%;
  margin: 10px;
  padding: 20px 40px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 10px;
  background-color: var(--bg-alt-d);
  cursor: pointer;
  color: var(--text-primary);
}

.game-answer-button-disabled {
  width: 100%;
  margin: 10px;
  padding: 20px 40px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 10px;
  background-color: var(--text-disabled);
  cursor: not-allowed;
  color: var(--text-primary);
}

.game-answer-button:hover {
  background-color: var(--bg-alt);
}

.game-answer-button-selected {
  width: 100%;
  margin: 10px;
  padding: 20px 40px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 10px;
  background-color: var(--bg-primary-d);
  cursor: not-allowed;
  color: var(--text-primary);
}

.game-answer-button-unselected {
  width: 100%;
  margin: 10px;
  padding: 20px 40px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 10px;
  background-color: var(--text-disabled-d);
  cursor: not-allowed;
  color: var(--text-primary);
}

.game-answer-button-correct {
  width: 100%;
  margin: 10px;
  padding: 20px 40px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 10px;
  background-color: var(--btn-third-d);
  cursor: not-allowed;
  color: var(--text-primary);
}

.game-answer-button-wrong {
  width: 100%;
  margin: 10px;
  padding: 20px 40px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 10px;
  background-color: var(--btn-secondary-d);
  cursor: not-allowed;
  color: var(--text-primary);
}
</style>
