<template>
  <div :class="['frienditem', challengedMe ? 'challenged-me' : '']">
    <div class="frienditem-name-wrapper">
      <AvailabilityIcon :availability="availability" />
      <div class="frienditem-name" @click="toggleShowProfile">
        <img
          class="friend-img"
          :src="friend.profilePicUrl ? friend.profilePicUrl : '/images/noPicture.webp'"
          alt="Pic"
          @error="handleImgError"
        />
        <span class="frienditem-name-span">{{ getFirstName(friend.username) }}</span>
      </div>
    </div>
    <div v-if="challengedMe" class="challenge-response-wrapper">
      <ChallengeAcceptButton :friendId="friend.id" />
      <ChallengeDeclineButton :friendId="friend.id" />
    </div>
    <div v-else-if="cancelButton">
      <ChallengeCancelButton :friendId="friend.id" />
    </div>
    <div v-else>
      <ChallengeButton :friendId="friend.id" :availability="availability" />
    </div>
    <ProfilePreview v-if="showProfile" :user="friend" @toggle-profilepreview="toggleShowProfile" />
     <div v-if="showProfile">previewProf</div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject, defineProps } from 'vue';
import AvailabilityIcon from './AvailabilityIcon.vue';
import ChallengeButton from './ChallengeButton.vue';
import ChallengeCancelButton from './ChallengeCancelButton.vue';
import ChallengeAcceptButton from './ChallengeAcceptButton.vue';
import ChallengeDeclineButton from './ChallengeDeclineButton.vue';
import ProfilePreview from '@/components/ProfilePreview.vue';
import { Availabilities } from '../models/enums/availabilityEnum';
import { getFirstName } from '../utils/userUtils';

const props = defineProps({
  friend: Object
});

const socket = inject('socket');
const gameRoom = inject('gameRoom');
const currentPage = inject('currentPage')
const showProfile = ref(false);
const availability = ref(Availabilities.OFFLINE);
const challengedMe = ref(false);
const cancelButton = ref(false);

const toggleShowProfile = () => {
  showProfile.value = !showProfile.value
}

onMounted(() => {
  socket.on('friend_status', ({ userId, status, challengedMe, amIChallenger }) => {
    if (userId === props.friend.id) {
      if (status === Availabilities.OFFLINE) {
        challengedMe.value = false
        cancelButton.value = false;
      }
      availability.value = status
      if (challengedMe && amIChallenger) {
        cancelButton.value = true
      }
      if (challengedMe && !amIChallenger) {
        challengedMe.value = true
      }
    }
  });
  socket.on('challenge_notification', (challengerUserId) => {
    if (props.friend.id === challengerUserId) {
      challengedMe.value = true
    }
  });
  socket.on('challenge_sent', (targetUserId) => {
    if (props.friend.id === targetUserId) {
      availability.value = Availabilities.PENDING;
      cancelButton.value = true
    }
  });
  socket.on('challenge_cancelled_ch', (targetUserId) => {
    if (props.friend.id === targetUserId) {
      cancelButton.value = false
      availability.value = Availabilities.ONLINE;
    }
  });
  socket.on('challenge_cancelled_ta', (challengerUserId) => {
    if (props.friend.id === challengerUserId) {
      challengedMe.value = false
      availability.value = Availabilities.ONLINE;
    }
  });
  socket.on('rejected_successfully', (challengerUserId) => {
    if (props.friend.id === challengerUserId) {
      challengedMe.value = false
      availability.value = Availabilities.ONLINE;
    }
  });
  socket.on('challenge_rejected', (targetUserId) => {
    if (props.friend.id === targetUserId) {
      cancelButton.value = false
    }
  });
  socket.on('accept_error_ch', (targetUserId) => {
    if (props.friend.id === targetUserId) {
      cancelButton.value = false
      availability.value = Availabilities.ONLINE;
    }
  });
  socket.on('accept_error_ta', (challengerUserId) => {
    if (props.friend.id === challengerUserId) {
      challengedMe.value = false
      availability.value = Availabilities.ONLINE;
    }
  });
  socket.on('start_game', (newRoomId) => {
    gameRoom.value = newRoomId;
    currentPage.value = 'game'
  })
});
</script>

<style scoped>
.frienditem {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: var(--bg-alt);
  margin: 10px 0 10px 0;
  padding: 15px;
  border-radius: 10px;
}

.frienditem-name-wrapper {
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  overflow: hidden;
  margin-right: 15px;
}

.friend-img {
  width: 32px;
  margin-right: 10px;
  border-radius: 100px;
}

.frienditem-name {
  display: flex;
  justify-content: start;
  align-items: center;
  flex: 1;
  overflow: hidden;
  cursor: pointer;
}

.frienditem-name-span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.challenge-response-wrapper {
  width: 110px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.challenged-me {
  background-color: var(--bg-alt-d);
}
</style>
