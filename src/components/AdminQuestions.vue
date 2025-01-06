<template>
  <div class="admin-questions-wrapper popup-wrapper">
    <div class="admin-questions">
      <div
        class="questions-close"
        @click="$emit('toggle-adminquestions')"
      >close</div>
      <div class="admin-questions-outer">
        <AdminQuestion
          v-for="question in questions"
          :key="question.id"
          :id="question.id"
          :question="question.question"
          :category="question.category"
          :level="question.level"
          :answer1="question.answer1"
          :answer2="question.answer2"
          :answer3="question.answer3"
          :answer4="question.answer4"
          :correctId="question.correctId"
          :source="question.source"
          :userId="question.userId"
        />
        <LoaderRing v-if="!questions.length" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue';
import LoaderRing from '@/components/LoaderRing.vue';
import AdminQuestion from '@/components/AdminQuestion.vue';

const props = defineProps({
  toggleShowAdminQuestions: Function,
});

const socket = inject('socket');
const questions = ref([]);

onMounted(() => {
  socket.emit('get_all_questions');
});

socket.on('get_all_questions_success', (receivedQuestions) => {
  questions.value = receivedQuestions;
});
</script>

<style scoped>
.admin-questions-wrapper {
  z-index: 700;
  padding: 60px 30px;
}

.admin-questions {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 60px 30px;
  background-color: var(--bg-primary);
  border-radius: 10px;
}

.questions-close {
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
}

.admin-questions-outer {
  overflow-y: auto;
}

.admin-questions-outer::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.admin-questions-outer {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>