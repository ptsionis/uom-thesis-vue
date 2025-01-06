<template>
  <div class="admin-question-item" v-if="isDisplayed">
    <p class="question-item-id">
      No. <span>{{ id }}</span>
    </p>
    <div class="question-item-section">
      <label>
        Question <span class="question-item-required">*</span>
      </label>
      <input
        class="question-item-control"
        type="text"
        v-model="editedQuestion"
      />
      <div class="question-item-note">
        (Maximum length 500 characters)
      </div>
    </div>
    <div class="question-item-section">
      <label for="category">
        Category <span class="question-item-required">*</span>
      </label>
      <div class="question-item-radio-group">
        <div
          class="question-item-radio-option"
          v-for="categoryOption in Object.values(Categories)"
          :key="categoryOption"
        >
          <input
            type="radio"
            :name="`category-q${id}`"
            :value="categoryOption"
            :id="`category${categoryOption}-q${id}`"
            v-model="editedCategory"
            required
          />
          <label
            class="question-item-radio-label"
            :for="`category${categoryOption}-q${id}`"
          >
            {{ capitalizeFirstLetter(categoryOption) }}
          </label>
        </div>
      </div>
    </div>
    <div class="question-item-section">
      <label for="level">
        Level <span class="question-item-required">*</span>
      </label>
      <div class="question-item-radio-group">
        <div
          class="question-item-radio-option"
          v-for="levelOption in [1, 2, 3]"
          :key="levelOption"
        >
          <input
            type="radio"
            :name="`level-q${id}`"
            :value="levelOption"
            :id="`level${levelOption}-q${id}`"
            v-model="editedLevel"
            required
          />
          <label
            class="question-item-radio-label"
            :for="`level${levelOption}-q${id}`"
          >
            {{ levelOption }}
          </label>
        </div>
      </div>
    </div>
    <div class="question-item-section">
      <label>
        Answer 1 <span class="question-item-required">*</span>
      </label>
      <input
        class="question-item-control"
        type="text"
        v-model="editedAnswer1"
      />
    </div>
    <div class="question-item-section">
      <label>
        Answer 2 <span class="question-item-required">*</span>
      </label>
      <input
        class="question-item-control"
        type="text"
        v-model="editedAnswer2"
      />
    </div>
    <div class="question-item-section">
      <label>
        Answer 3 <span class="question-item-required">*</span>
      </label>
      <input
        class="question-item-control"
        type="text"
        v-model="editedAnswer3"
      />
    </div>
    <div class="question-item-section">
      <label>
        Answer 4 <span class="question-item-required">*</span>
      </label>
      <input
        class="question-item-control"
        type="text"
        v-model="editedAnswer4"
      />
    </div>
    <div class="question-item-section">
      <label for="correctId">
        Correct Answer <span class="question-item-required">*</span>
      </label>
      <div class="question-item-radio-group">
        <div
          class="question-item-radio-option"
          v-for="correctOption in [1, 2, 3, 4]"
          :key="correctOption"
        >
          <input
            type="radio"
            :name="`correctId-q${id}`"
            :value="correctOption"
            :id="`correctId${correctOption}-q${id}`"
            v-model="editedCorrectId"
            required
          />
          <label
            class="question-item-radio-label"
            :for="`correctId${correctOption}-q${id}`"
          >
            {{ correctOption }}
          </label>
        </div>
      </div>
    </div>
    <div class="question-item-button-wrapper">
      <button
        class="question-item-button question-item-button-modify"
        @click="updateQuestion"
      >
        Save
      </button>
      <button
        class="question-item-button question-item-button-delete"
        @click="deleteQuestion"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue';
import { capitalizeFirstLetter } from '../utils/otherUtils';
import { Question } from '../models/Question';
import { Categories } from '../models/enums/categoriesEnum';

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

const deleteQuestion = () => {
  socket.emit('delete_question', props.id);
};

const updateQuestion = () => {
  const updatedQuestion = new Question(
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

  socket.emit('update_question', props.id, updatedQuestion);

  socket.on('delete_question_success', (questionId) => {
    if (props.id === questionId) isDisplayed.value = false;
  });
};

</script>

<style scoped>
.admin-question-item {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 40px 0px;
  padding: 30px;
  background-color: var(--bg-primary-d);
  border-radius: 10px;
}

.question-item-id {
  text-align: center;
  margin: 25px 0px;
  padding: 5px 0px;
  background-color: var(--btn-secondary);
  border-radius: 10px;
}

.question-item-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  border-radius: 10px;
}

.question-item-required {
  color: var(--btn-secondary);
}

.question-item-control {
  margin: 5px 0px 5px 0px;
  padding: 5px 10px 5px 10px;
  border-radius: 10px;
  border: none;
  background-color: rgb(199, 199, 199);
}

.question-item-note {
  font-size: small;
  font-weight: lighter;
}

.question-item-radio-group {
  display: flex;
}

.question-item-radio-option {
  margin-right: 20px;
}

.question-item-radio-label {
  padding-left: 4px;
}

.question-item-button-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0px;
}

.question-item-button {
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

.question-item-button-modify {
  background-color: var(--btn-third);
}

.question-item-button-modify:hover {
  background-color: var(--btn-third-d);
}

.question-item-button-delete {
  background-color: var(--btn-secondary);
}

.question-item-button-delete:hover {
  background-color: var(--btn-secondary-d);
}

@media screen and (max-width: 1200px) {
  .question-item-radio-group {
    flex-direction: column;
  }

  .question-item-radio-option {
    margin-right: 0px;
  }
}
</style>
