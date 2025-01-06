<template>
  <div class="scoreboard">
    <span class="scoreboard-score">{{ props.scoreMe }}</span>
    <div class="scoreboard-divider"></div>
    <span class="scoreboard-score">{{ props.scoreOpponent }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  scoreMe: {
    type: Number,
    required: true,
  },
  scoreOpponent: {
    type: Number,
    required: true,
  },
});
</script>

<style scoped>
.scoreboard {
  display: flex;
  justify-content: center;
  align-items: center;
}

.scoreboard-score {
  font-weight: bolder;
  font-size: 28px;
}

.scoreboard-divider {
  height: 100%;
  width: 1px;
  margin: 0px 15px;
  background-color: var(--text-disabled);
}
</style>
