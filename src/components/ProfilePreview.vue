<template>
  <div class="popup-wrapper profile-preview-wrapper">
    <div class="profile-preview">
      <div
        class="profile-preview-close"
        @click="$emit('toggle-profilepreview')"
      >close</div>
      <div class="profile-preview-outer">
        <div class="profile-preview-user">
          <img
            class="profile-preview-avatar-img"
            :src="user?.profilePicUrl ? user?.profilePicUrl : '/images/noPicture.webp'"
            alt="Pic"
            @error="handleImageError"
          />
          <h3 class="profile-preview-name">
            {{ getFirstName(user?.username) }} (
            <span>{{ getWinrate(user?.gamesWon, user?.gamesPlayed) + '%' }}</span>
            )
          </h3>
          <span class="profile-preview-joined">
            Member since {{ getJoinedDate(user?.createdAt) }}
          </span>
          <span class="profile-preview-rank">
            {{ capitalizeFirstLetter(getRank(user?.score)) }}
          </span>
        </div>
        <ProgressBar
          :currentValue="user?.score"
          :goalValue="getGoalScore(user.score)"
        />
        <AllCategoriesWinratesBars :user="user" />
      </div>
    </div>
  </div>
</template>

<script setup>
import ProgressBar from '@/components/ProgressBar.vue';
import AllCategoriesWinratesBars from '@/components/AllCategoriesWinratesBars.vue';
import {
  getFirstName,
  getGoalScore,
  getJoinedDate,
  getRank,
  getWinrate,
} from '../utils/userUtils';
import { capitalizeFirstLetter } from '../utils/otherUtils';

const props = defineProps({
  user: Object,
});

const handleImageError = (event) => {
  event.target.onerror = null;
  event.target.src = '/images/noPicture.webp';
};
</script>

<style scoped>
.profile-preview-close {
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
}

.profile-preview-wrapper {
  z-index: 700;
}

.profile-preview {
  position: relative;
  width: 100%;
  max-width: 600px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px 30px;
  background-color: var(--bg-primary);
  border-radius: 10px;
}

.profile-preview-outer {
  width: 100%;
  overflow-y: auto;
}

.profile-preview-user {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.profile-preview-avatar-img {
  border-radius: 100%;
  width: 70px;
  margin: 10px 0px;
}

.profile-preview-name {
  font-size: large;
  font-weight: normal;
  margin-bottom: 7.5px;
}

.profile-preview-joined {
  font-weight: lighter;
  font-size: small;
}

.profile-preview-rank {
  margin-top: 20px;
}

.profile-preview-outer::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.profile-preview-outer {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>