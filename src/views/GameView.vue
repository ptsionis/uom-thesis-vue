<template>
  <main class="game-main">
    <LoaderRing v-if="!opponent || !turn" />
    <div class="game-header" v-else>
      <GamePlayer :player="player" :isOpponent="false" />
      <ScoreBoard :scoreMe="player.points" :scoreOpponent="opponent.points" />
      <GamePlayer :player="opponent" :isOpponent="true" />
    </div>
    <div class="game-wrapper">
      <span class="game-turn">
        {{ turn === user.id ? "Playing!" : "Waiting..." }}
      </span>
      <component
        :is="stage === Stages.SELECTION ? GameCategoriesWrapper : GameQuestionWrapper"
        :turn="turn"
        :questionsPlayed="questionsPlayed"
        :question="question"
      />
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';
import LoaderRing from '@/components/LoaderRing.vue';
import ScoreBoard from '@/components/ScoreBoard.vue';
import GameCategoriesWrapper from '@/components/GameCategoriesWrapper.vue';
import GameQuestionWrapper from '@/components/GameQuestionWrapper.vue';
import GamePlayer from '@/components/GamePlayer.vue';
import { Stages } from '@/models/enums/stagesEnum';

const user = inject('user');
const gameRoom = inject('gameRoom');
const currentPage = inject('currentPage');
const socket = inject('socket');

const player = ref(null);
const opponent = ref(null);
const turn = ref(0);
const stage = ref(Stages.SELECTION);
const question = ref(null);
const questionsPlayed = ref([]);

onMounted(() => {
  socket.emit('game_init_info', gameRoom.value);

  socket.on('set_game_init_info', (playerData, opponentData, turnData) => {
    player.value = playerData;
    opponent.value = opponentData;
    turn.value = turnData;
  });
  socket.on('set_question', (questionData) => {
    stage.value = Stages.QUESTION;
    question.value = questionData;
  });
  socket.on('update_players', (playerData, opponentData) => {
    player.value = playerData;
    opponent.value = opponentData;
  });
  socket.on('start_next_round', (questionsPlayedData, turnData) => {
    questionsPlayed.value = questionsPlayedData;
    turn.value = turnData;
    stage.value = Stages.SELECTION;
  });
  socket.on('opponent_quit', () => {
    currentPage.value = '/';
  });
  socket.on('game_ended', () => {
    currentPage.value = '/';
  });
});
</script>

<style scoped>
.game-main {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 35px 25px;
  background-color: var(--bg-primary-d);
}

.game-header {
  width: 100%;
  height: 100px;
  padding: 25px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  background-color: var(--bg-primary);
}

.game-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  flex-grow: 1;
  margin-top: 10px;
  padding: 35px 25px 35px 25px;
  border-radius: 10px;
  background-color: var(--bg-primary);
}

.game-turn {
  width: 100%;
  margin-bottom: 35px;
  text-align: center;
  padding: 15px;
  border-radius: 10px;
  background-color: var(--bg-primary-d);
}
</style>
