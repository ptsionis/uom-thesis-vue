<script setup>
import { inject, onMounted, ref } from 'vue';
import LoaderRing from '@/components/LoaderRing.vue';
import QuickPlayButton from '@/components/QuickPlayButton.vue';
import PlayVsFriendButton from '@/components/PlayVsFriendButton.vue'
import SubmitQuestionButton from '@/components/SubmitQuestionButton.vue'
import AdminPendingButton from '@/components/AdminPendingButton.vue'
import AdminQuestionsButton from '@/components/AdminQuestionsButton.vue'
import FriendList from '@/components/FriendList.vue'
import LogoutButton from '@/components/LogoutButton.vue'
import OpenChallengeModal from '@/components/OpenChallengeModal.vue'
import ChallengeModal from '@/components/ChallengeModal.vue'
import ModalCustom from '@/components/ModalCustom.vue'
import QuestionForm from '@/components/QuestionForm.vue'
import AdminPendingQuestions from '@/components/AdminPendingQuestions.vue'
import AdminQuestions from '@/components/AdminQuestions.vue'
import ProfilePreview from '@/components/ProfilePreview.vue'
import { urlInitialization } from '@/utils/pageUtils';
import { getFirstName } from '@/utils/userUtils';
import { Roles } from '@/models/enums/rolesEnum';

const socket = inject("socket")
const user = inject("user")
const gameRoom = inject("gameRoom")
const currentPage = inject("currentPage")
const showProfile = ref(false)
const showFriendlist = ref(false)
const showQuestionForm = ref(false)
const showChallengeModal = ref(false)
const showOpenChallengeModal = ref(false)
const showAdminPending = ref(false)
const showAdminQuestions = ref(false)
const showErrorModal = ref(false)
const errorText = ref("")
const challenger = ref(null)

onMounted(() => {
  urlInitialization()
  socket.connect()
  socket.emit("user_init");
  socket.on("user_init_success", (userData) => {
    user.value = userData
  });
  currentPage.value = '/'
  socket.emit("available");
  socket.on("challenge_notification_detailed", (challengerProfile) => {
    challenger.value = challengerProfile
    showChallengeModal.value = true
  });
  socket.on("challenge_cancelled_ta", () => {
    showChallengeModal.value = false
  });
  socket.on("challenger_left", () => {
    showChallengeModal.value = false
  });
  socket.on("challenge_error", (challengeErrorMsg) => {
    showErrorModal.value = true
    errorText.value = challengeErrorMsg
  });
  socket.on("rejected_successfully", () => {
    showChallengeModal.value = false
  });
  socket.on("open_challenge_created", () => {
    showOpenChallengeModal.value = true
  });
  socket.on("open_challenge_cancelled", () => {
    showOpenChallengeModal.value = false
  });
  socket.on("start_game", (newRoomId) => {
    gameRoom.value = newRoomId
    currentPage.value = 'game'
  });
})

const handleImageError = (event) => {
  event.target.onerror = null;
  event.target.src = "/images/noPicture.webp";
};
const closeModal = () => {
  showErrorModal.value = false
};
const toggleShowProfile = () => {
  showProfile.value = !showProfile.value
};
const toggleShowFriendlist = () => {
  showFriendlist.value = !showFriendlist.value
}
const toggleShowQuestionForm = () => {
  showQuestionForm.value = !showQuestionForm.value
}
const toggleShowAdminPending = () => {
  showAdminPending.value = !showAdminPending.value
}
const toggleShowAdminQuestions = () => {
  showAdminQuestions.value = !showAdminQuestions.value
}
</script>

<template>
  <main class="home-main">
    <div v-if="user">
      <div class="home-welcome-wrapper">
      <img
        class="home-avatar-img"
        :src="user.profilePicUrl ? user.profilePicUrl : '/images/noPicture.webp'"
        alt="Pic"
        @error="handleImageError"
        @click="toggleShowProfile"
      />
      <h3 class="home-welcome-text" @click="toggleShowProfile">
        Welcome, {{getFirstName(user.username)}}!
      </h3>
      </div>
      <div class="home-main-buttons">
        <QuickPlayButton />
        <PlayVsFriendButton @toggle-friendlist="toggleShowFriendlist" />
        <SubmitQuestionButton @toggle-question-form="toggleShowQuestionForm" />
        <template v-if="user.role !== Roles.USER">
          <AdminPendingButton @toggle-admin-pending="toggleShowAdminPending" />
          <AdminQuestionsButton @toggle-admin-questions="toggleShowAdminQuestions" />
        </template>
        <LogoutButton />
      </div>
      <FriendList @toggle-friendlist="toggleShowFriendlist" v-if="showFriendlist" />
      <OpenChallengeModal v-if="showOpenChallengeModal" />
      <ChallengeModal v-if="showChallengeModal" :challenger="challenger" />
      <ModalCustom v-if="showErrorModal" :modalMsg="errorText" :isError="true" :callback="closeModal" />
      <QuestionForm @toggle-questionform="toggleShowQuestionForm" v-if="showQuestionForm" />
      <AdminPendingQuestions @toggle-adminpending="toggleShowAdminPending" v-if="showAdminPending" />
      <AdminQuestions @toggle-adminquestions="toggleShowAdminQuestions" v-if="showAdminQuestions" />
      <ProfilePreview :user="user" @toggle-profilepreview="toggleShowProfile" v-if="showProfile" />
    </div>
    <LoaderRing v-else />
  </main>
</template>

<style scoped>
.home-main {
  display: flex;
  padding: 35px 25px 35px 25px;
  width: 100%;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: var(--bg-primary);
}

.home-welcome-wrapper {
  margin-bottom: 30px;
}

.home-avatar-img {
  width: 75px;
  margin-bottom: 15px;
  border-radius: 100%;
  cursor: pointer;
}

.home-welcome-text {
  font-size: 16px;
  cursor: pointer;
}

.home-main-buttons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
