<template>
  <div :class="['game-player', { 'game-player-opponent': props.isOpponent }]">
    <img
      class="game-player-img"
      :src="props.player.profilePicUrl ? props.player.profilePicUrl : '/images/noPicture.webp'"
      alt="Pic"
      @error="handleImageError"
    />
    <span class="game-player-name">{{ getFirstName(props.player.username) }}</span>
  </div>
</template>

<script setup>
import { getFirstName } from '@/utils/userUtils';

const props = defineProps({
  player: {
    type: Object,
    required: true,
  },
  isOpponent: {
    type: Boolean,
    required: true,
  },
});

const handleImageError = (event) => {
  event.target.onerror = null;
  event.target.src = '/images/noPicture.webp';
};
</script>

<style scoped>
.game-player {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.game-player-opponent {
  flex-direction: row-reverse;
}

.game-player-img {
  width: 40px;
  height: 40px;
  border-radius: 100%;
}

.game-player-name {
  padding: 0px 15px;
}

@media screen and (max-width: 1200px) {
  .game-player-name {
    display: none;
  }
}
</style>
