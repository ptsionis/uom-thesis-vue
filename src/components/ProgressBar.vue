<template>
  <div class="progress-bar-outer">
    <div
      class="progress-bar-inner"
      :style="{ width: `${barWidth}%` }"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
  currentValue: Number,
  goalValue: Number,
});

const barWidth = ref(0);

const calculateBarWidth = () => {
  let widthPercentage = 0;
  if (props.currentValue <= 0) {
    widthPercentage = 1;
  } else if (props.goalValue === 0) {
    widthPercentage = 100;
  } else {
    widthPercentage = Math.round((props.currentValue / props.goalValue) * 100);
  }
  barWidth.value = widthPercentage;
};

onMounted(() => {
  calculateBarWidth();
});

watch(() => [props.currentValue, props.goalValue], calculateBarWidth);
</script>

<style scoped>
.progress-bar-outer {
  height: 25px;
  width: 100%;
  border-radius: 10px;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 5px 5px;
  background-color: var(--bg-primary-d);
}

.progress-bar-inner {
  height: 100%;
  border-radius: 10px;
  transition: width 1s ease;
  background-color: var(--btn-primary);
}
</style>
