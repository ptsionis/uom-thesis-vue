<template>
  <div class="game-question-wrapper">
    <span class="game-question-head">{{ `${props.question.dataValues.category} X${props.question.dataValues.level}` }}</span>
    <span class="game-question">{{ props.question.dataValues.question }}</span>
    <div class="game-answers-wrapper">
      <GameAnswerButton :id="1" :text="props.question.dataValues.answer1" :turn="props.turn" />
      <GameAnswerButton :id="2" :text="props.question.dataValues.answer2" :turn="props.turn" />
      <GameAnswerButton :id="3" :text="props.question.dataValues.answer3" :turn="props.turn" />
      <GameAnswerButton :id="4" :text="props.question.dataValues.answer4" :turn="props.turn" />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import GameAnswerButton from '@/components/GameAnswerButton.vue';

const props = defineProps({
  turn: {
    type: Number,
    required: true,
  },
  question: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.game-question-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  flex-grow: 1;
  padding: 25px;
  border-radius: 10px;
}

.game-question-head {
  width: 100%;
  padding: 10px 25px;
  border-radius: 10px;
  background-color: var(--bg-alt);
  text-align: center;
}

.game-question {
  width: 100%;
  text-align: center;
  margin: 35px 0px;
}

.game-answers-wrapper {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: start;
  align-items: center;
}
</style>
