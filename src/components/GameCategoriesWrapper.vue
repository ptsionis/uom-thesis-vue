<template>
  <div class="game-categories-wrapper">
    <template v-for="(category, key) in categoriesKeys" :key="key">
      <GameCategoryTile
        :category="category"
        :level="1"
        :turn="props.turn"
        :isPlayed="props.questionsPlayed.includes(getQuestionTileId(category, 1))"
      />
      <GameCategoryTile
        :category="category"
        :level="2"
        :turn="props.turn"
        :isPlayed="props.questionsPlayed.includes(getQuestionTileId(category, 2))"
      />
      <GameCategoryTile
        :category="category"
        :level="3"
        :turn="props.turn"
        :isPlayed="props.questionsPlayed.includes(getQuestionTileId(category, 3))"
      />
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import GameCategoryTile from '@/components/GameCategoryTile.vue';
import { Categories } from '@/models/enums/categoriesEnum';
import { getQuestionTileId } from '@/utils/otherUtils';

const props = defineProps({
  turn: {
    type: Number,
    required: true,
  },
  questionsPlayed: {
    type: Array,
    required: true,
  },
});

const categoriesKeys = computed(() => Object.keys(Categories));
</script>

<style scoped>
.game-categories-wrapper {
  display: grid;
  justify-content: space-evenly;
  grid-template-columns: auto auto auto;
  column-gap: 40px;
  row-gap: 20px;
  padding: 30px 20px;
}

@media screen and (max-width: 1200px) {
  .game-categories-wrapper {
    grid-template-columns: auto auto;
  }
}

@media screen and (max-width: 768px) {
  .game-categories-wrapper {
    grid-template-columns: auto;
  }
}
</style>
