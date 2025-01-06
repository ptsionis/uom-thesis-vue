<template>
  <div style="width: 80px">
    <h6 class="category-winrate-title">{{ categoryName }}</h6>
    <CircleProgress :percent="winrate" size="80" />
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import "vue3-circle-progress/dist/circle-progress.css";
import CircleProgress from "vue3-circle-progress";

const props = defineProps({
  categoryName: String,
  winrate: Number,
});
</script>

<style scoped>
.category-winrate-title {
  margin-bottom: 10px;
}
</style>
