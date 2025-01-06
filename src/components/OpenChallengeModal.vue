<template>
  <div class="open-challenge-modal-wrapper popup-wrapper">
    <div class="open-challenge-modal">
      <span class="open-challenge-modal-text">
        Waiting for an opponent...
      </span>
      <LoaderRing />
      <ChallengeCancelButton />
    </div>
  </div>
</template>

<script setup>
import ChallengeCancelButton from '@/components/ChallengeCancelButton.vue';
import LoaderRing from '@/components/LoaderRing.vue';
</script>

<style scoped>
.open-challenge-modal-wrapper {
  z-index: 800;
}

.open-challenge-modal {
  position: relative;
  width: 100%;
  max-width: 600px;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px 25px;
  border-radius: 10px;
  background-color: var(--bg-primary);
}
</style>
