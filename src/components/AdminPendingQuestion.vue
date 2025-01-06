<template>
  <div v-if="isDisplayed" class="admin-pending-item">
    <p class="pending-item-id">
      No. <span>{{ id }}</span>
    </p>
    <div class="pending-item-section">
      <label>
        Question <span class="pending-item-required">*</span>
      </label>
      <input
        class="pending-item-control"
        type="text"
        v-model="editedQuestion"
      />
      <div class="pending-item-note">(Maximum length 500 characters)</div>
    </div>
    <div class="pending-item-section">
      <label>
        Category <span class="pending-item-required">*</span>
      </label>
      <div class="pending-item-radio-group">
        <div
          v-for="category in categories"
          :key="category"
          class="pending-item-radio-option"
        >
          <input
            type="radio"
            :name="`category-q${id}`"
            :value="category"
            :id="`category${category}-q${id}`"
            v-model="editedCategory"
            required
          />
          <label
            class="pending-item-radio-label"
            :for="`category${category}-q${id}`"
          >
            {{ capitalizeFirstLetter(category) }}
          </label>
        </div>
      </div>
    </div>
    <div class="pending-item-section">
      <label>
        Level <span class="pending-item-required">*</span>
      </label>
      <div class="pending-item-radio-group">
        <div
          v-for="level in [1, 2, 3]"
          :key="level"
          class="pending-item-radio-option"
        >
          <input
            type="radio"
            :name="`level-q${id}`"
            :value="level"
            :id="`level${level}-q${id}`"
            v-model="editedLevel"
            required
          />
          <label
            class="pending-item-radio-label"
            :for="`level${level}-q${id}`"
          >
            {{ level }}
          </label>
        </div>
      </div>
    </div>
    <div class="pending-item-section">
      <label>
        Answer 1 <span class="pending-item-required">*</span>
      </label>
      <input
        class="pending-item-control"
        type="text"
        v-model="editedAnswer1"
      />
    </div>
    <div class="pending-item-section">
      <label>
        Answer 2 <span class="pending-item-required">*</span>
      </label>
      <input
        class="pending-item-control"
        type="text"
        v-model="editedAnswer2"
      />
    </div>
    <div class="pending-item-section">
      <label>
        Answer 3 <span class="pending-item-required">*</span>
      </label>
      <input
        class="pending-item-control"
        type="text"
        v-model="editedAnswer3"
      />
    </div>
    <div class="pending-item-section">
      <label>
        Answer 4 <span class="pending-item-required">*</span>
      </label>
      <input
        class="pending-item-control"
        type="text"
        v-model="editedAnswer4"
      />
    </div>
    <div class="pending-item-section">
      <label>
        Correct Answer <span class="pending-item-required">*</span>
      </label>
      <div class="pending-item-radio-group">
        <div
          v-for="correctId in [1, 2, 3, 4]"
          :key="correctId"
          class="pending-item-radio-option"
        >
          <input
            type="radio"
            :name="`correctId-q${id}`"
            :value="correctId"
            :id="`correctId${correctId}-q${id}`"
            v-model="editedCorrectId"
            required
          />
          <label
            class="pending-item-radio-label"
            :for="`correctId${correctId}-q${id}`"
          >
            {{ correctId }}
          </label>
        </div>
      </div>
    </div>
    <p>
      Source:
      <a v-if="source" :href="source" target="_blank">{{ source }}</a>
    </p>
    <p>User ID: {{ userId }}</p>
    <div class="pending-item-button-wrapper">
      <button
        class="pending-item-button pending-item-button-accept"
        @click="saveQuestion"
      >
        Save
      </button>
      <button
        class="pending-item-button pending-item-button-delete"
        @click="deletePending"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue';
import { Categories } from '@/models/enums/categoriesEnum';
import { capitalizeFirstLetter } from '@/utils/otherUtils';
import { Question } from '@/models/Question';

const props = defineProps({
  id: Number,
  question: String,
  category: String,
  level: Number,
  answer1: String,
  answer2: String,
  answer3: String,
  answer4: String,
  correctId: Number,
  source: String,
  userId: Number,
});

const socket = inject('socket');

const editedQuestion = ref(props.question);
const editedCategory = ref(props.category);
const editedLevel = ref(props.level);
const editedAnswer1 = ref(props.answer1);
const editedAnswer2 = ref(props.answer2);
const editedAnswer3 = ref(props.answer3);
const editedAnswer4 = ref(props.answer4);
const editedCorrectId = ref(props.correctId);
const isDisplayed = ref(true);

const categories = Object.values(Categories);

const deletePending = () => {
  socket.emit('delete_pending_question', props.id);
};

const saveQuestion = async () => {
  const acceptedQuestion = new Question(
    props.id,
    editedQuestion.value,
    editedCategory.value,
    editedLevel.value,
    editedAnswer1.value,
    editedAnswer2.value,
    editedAnswer3.value,
    editedAnswer4.value,
    editedCorrectId.value
  );

  socket.emit('accept_pending_question', acceptedQuestion);
};

socket.on('accept_pending_success', (pendingQuestionId) => {
  if (props.id === pendingQuestionId) isDisplayed.value = false;
});

socket.on('delete_pending_success', (pendingQuestionId) => {
  if (props.id === pendingQuestionId) isDisplayed.value = false;
});
</script>

<style scoped>
.admin-pending-item {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 40px 0px;
  padding: 30px;
  background-color: var(--bg-primary-d);
  border-radius: 10px;
}

.pending-item-id {
  text-align: center;
  margin: 25px 0px;
  padding: 5px 0px;
  background-color: var(--btn-secondary);
  border-radius: 10px;
}

.pending-item-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  border-radius: 10px;
}

.pending-item-required {
  color: var(--btn-secondary);
}

.pending-item-control {
  margin: 5px 0px 5px 0px;
  padding: 5px 10px 5px 10px;
  border-radius: 10px;
  border: none;
  background-color: var(--text-primary-d);
}

.pending-item-note {
  font-size: small;
  font-weight: lighter;
}

.pending-item-radio-group {
  display: flex;
  justify-content: center;
  align-items: center;
}

.pending-item-radio-option {
  margin-right: 20px;
}

.pending-item-radio-label {
  padding-left: 4px;
}

.pending-item-button-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0px;
}

.pending-item-button {
  width: 100px;
  height: 40px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 5px;
  padding: 15px 35px 15px 35px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  color: var(--text-primary);
}

.pending-item-button-accept {
  background-color: var(--btn-primary);
}

.pending-item-button-accept:hover {
  background-color: var(--btn-primary-d);
}

.pending-item-button-modify {
  background-color: var(--btn-third);
}

.pending-item-button-modify:hover {
  background-color: var(--btn-third-d);
}

.pending-item-button-delete {
  background-color: var(--btn-secondary);
}

.pending-item-button-delete:hover {
  background-color: var(--btn-secondary-d);
}

@media screen and (max-width: 1200px) {
  .pending-item-radio-group {
    flex-direction: column;
  }

  .pending-item-radio-option {
    margin-right: 0px;
  }

  .pending-item-button-wrapper {
    flex-direction: column;
  }

  .pending-item-button {
    margin: 10px 0px;
  }
}
</style>
