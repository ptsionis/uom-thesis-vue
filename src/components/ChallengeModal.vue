<template>
  <div class="challenge-modal-wrapper popup-wrapper">
    <div class="challenge-modal">
      <span>{{ getFirstName(props.challenger.username) }} challenged you!</span>
      <div class="challenge-modal-vs-wrapper">
        <img
          class="challenge-modal-profile-pic"
          :src="user.profilePicUrl ? user.profilePicUrl : '/images/noPicture.webp'"
          alt="Pic"
          @error="handleImageError"
        />
        <span class="challenge-modal-vs">vs</span>
        <img
          class="challenge-modal-profile-pic"
          :src="props.challenger.profilePicUrl ? props.challenger.profilePicUrl : '/images/noPicture.webp'"
          alt="Pic"
          @error="handleImageError"
        />
      </div>
      <div class="challenge-modal-respond-wrapper">
        <ChallengeAcceptButton :friendId="props.challenger.id" />
        <ChallengeDeclineButton :friendId="props.challenger.id" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue';
import ChallengeAcceptButton from '@/components/ChallengeAcceptButton.vue';
import ChallengeDeclineButton from '@/components/ChallengeDeclineButton.vue';
import { getFirstName } from '@/utils/userUtils';

const props = defineProps({
  challenger: {
    type: Object,
    required: true,
  },
});

const user = inject('user');

const handleImageError = (event) => {
  event.target.onerror = null;
  event.target.src = '/images/noPicture.webp';
};
</script>

<style scoped>
.challenge-modal-wrapper {
  z-index: 800;
}

.challenge-modal {
  position: relative;
  width: 100%;
  max-width: 600px;
  height: fit-content;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 60px 25px;
  border-radius: 10px;
  background-color: var(--bg-primary);
}

.challenge-modal-vs-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 35px 0px;
}

.challenge-modal-vs {
  margin: 0px 20px;
}

.challenge-modal-profile-pic {
  width: 60px;
  border-radius: 100%;
}

.challenge-modal-respond-wrapper {
  width: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
