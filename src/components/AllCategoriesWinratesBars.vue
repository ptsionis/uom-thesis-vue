<template>
  <div class="all-categories-winrates-wrapper">
    <CategoryWinrateBar
      categoryName="History"
      :winrate="getWinrate(user.historyWon, user.historyPlayed)"
    />
    <CategoryWinrateBar
      categoryName="Geography"
      :winrate="getWinrate(user.geographyWon, user.geographyPlayed)"
    />
    <CategoryWinrateBar
      categoryName="Finance"
      :winrate="getWinrate(user.financeWon, user.financePlayed)"
    />
    <CategoryWinrateBar
      categoryName="Logo"
      :winrate="getWinrate(user.logoWon, user.logoPlayed)"
    />
    <CategoryWinrateBar
      categoryName="Trivia"
      :winrate="getWinrate(user.triviaWon, user.triviaPlayed)"
    />
    <CategoryWinrateBar
      categoryName="Hidden"
      :winrate="getWinrate(user.hiddenWon, user.hiddenPlayed)"
    />
  </div>
</template>

<script setup>
import CategoryWinrateBar from '@/components/CategoryWinrateBar.vue';
import { getWinrate } from '../utils/userUtils.js';

const props = defineProps({
  user: Object
});
</script>

<style scoped>
.all-categories-winrates-wrapper {
  display: grid;
  justify-content: space-evenly;
  grid-template-columns: auto auto auto;
  column-gap: 40px;
  row-gap: 30px;
  margin-top: 60px;
}

@media screen and (max-width: 768px) {
  .all-categories-winrates-wrapper {
    grid-template-columns: auto auto;
  }
}
</style>
