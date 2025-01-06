<template>
  <div class="admin-pending-wrapper popup-wrapper">
    <div class="admin-pending-questions">
      <div class="pending-questions-close" @click="$emit('toggle-adminpending')">close</div>
      <div class="admin-pending-outer">
        <div v-if="pendingQuestions.length >= 0">
          <AdminPendingQuestion
            v-for="pendingQuestion in pendingQuestions"
            :key="pendingQuestion.id"
            :id="pendingQuestion.id"
            :question="pendingQuestion.question"
            :category="pendingQuestion.category"
            :level="pendingQuestion.level"
            :answer1="pendingQuestion.answer1"
            :answer2="pendingQuestion.answer2"
            :answer3="pendingQuestion.answer3"
            :answer4="pendingQuestion.answer4"
            :correctId="pendingQuestion.correctId"
            :source="pendingQuestion.source"
            :userId="pendingQuestion.userId"
          />
        </div>
        <LoaderRing v-else />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue';
import AdminPendingQuestion from '@/components/AdminPendingQuestion.vue';
import LoaderRing from '@/components/LoaderRing.vue';

const props = defineProps({
  toggleShowAdminPending: {
    type: Function,
    required: true,
  },
});

const socket = inject('socket');
const pendingQuestions = ref([]);

onMounted(() => {
  socket.emit('get_all_pending_questions');
});

socket.on('get_all_pending_success', (questions) => {
  pendingQuestions.value = questions;
});
</script>

<style scoped>
.admin-pending-wrapper {
  z-index: 700;
  padding: 60px 30px;
}

.admin-pending-questions {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 60px 30px;
  background-color: var(--bg-primary);
  border-radius: 10px;
}

.pending-questions-close {
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
}

.admin-pending-outer {
  overflow-y: auto;
}

.admin-pending-outer::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.admin-pending-outer {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
