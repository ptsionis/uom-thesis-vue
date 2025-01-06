<template>
  <div class="submit-form-wrapper popup-wrapper">
    <form @submit="handleSubmit" class="submit-form">
      <div class="submit-form-close" @click="$emit('toggle-questionform')">close</div>
      <div class="submit-form-outer">
        <div class="submit-form-section">
          <label for="question">
            Question <span class="submit-form-required">*</span>
          </label>
          <input class="submit-form-control" type="text" name="question" maxlength="500" required />
          <div class="submit-form-note">(Maximum length 500 characters)</div>
        </div>
        <div class="submit-form-section">
          <label for="category">
            Category <span class="submit-form-required">*</span>
          </label>
          <div class="submit-form-radio-group">
            <div class="submit-form-radio-option" v-for="category in Object.values(Categories)" :key="category">
              <input type="radio" name="category" :value="category" :id="category" required />
              <label class="submit-form-radio-label" :for="category">
                {{ capitalizeFirstLetter(category) }}
              </label>
            </div>
          </div>
        </div>
        <div class="submit-form-section">
          <label for="level">
            Level <span class="submit-form-required">*</span>
          </label>
          <div class="submit-form-radio-group">
            <div class="submit-form-radio-option" v-for="level in [1, 2, 3]" :key="level">
              <input type="radio" name="level" :value="level" :id="'level-' + level" required />
              <label class="submit-form-radio-label" :for="'level-' + level">{{ level }}</label>
            </div>
          </div>
        </div>
        <div class="submit-form-section">
          <label for="answer1">
            Answer 1 <span class="submit-form-required">*</span>
          </label>
          <input class="submit-form-control" type="text" name="answer1" maxlength="100" required />
        </div>
        <div class="submit-form-section">
          <label for="answer2">
            Answer 2 <span class="submit-form-required">*</span>
          </label>
          <input class="submit-form-control" type="text" name="answer2" maxlength="100" required />
        </div>
        <div class="submit-form-section">
          <label for="answer3">
            Answer 3 <span class="submit-form-required">*</span>
          </label>
          <input class="submit-form-control" type="text" name="answer3" maxlength="100" required />
        </div>
        <div class="submit-form-section">
          <label for="answer4">
            Answer 4 <span class="submit-form-required">*</span>
          </label>
          <input class="submit-form-control" type="text" name="answer4" maxlength="100" required />
        </div>
        <div class="submit-form-section">
          <label for="correctId">
            Correct Answer <span class="submit-form-required">*</span>
          </label>
          <div class="submit-form-radio-group">
            <div class="submit-form-radio-option" v-for="correctId in [1, 2, 3, 4]" :key="correctId">
              <input type="radio" name="correctId" :value="correctId" :id="'correctId-ci' + correctId" required />
              <label class="submit-form-radio-label" :for="'correctId-ci' + correctId">{{ correctId }}</label>
            </div>
          </div>
        </div>
        <div class="submit-form-section">
          <label for="source">Source URL</label>
          <input class="submit-form-control" type="text" name="source" maxlength="2048" />
        </div>
        <div class="submit-form-buttons-wrapper">
          <button type="button" class="submit-form-cancel" @click="$emit('toggle-questionform')">
            Cancel
          </button>
          <button class="submit-form-submit" type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
    <ModalCustom
      v-if="showFormModal"
      :modalMsg="submitSuccess ? msgSuccess : msgFail"
      :isError="submitSuccess"
      :callback="closeModal"
    />
  </div>
</template>

<script setup>
import { ref, inject } from 'vue';
import { PendingQuestion } from '@/models/PendingQuestion';
import { Categories } from '@/models/enums/categoriesEnum';
import { capitalizeFirstLetter } from '@/utils/otherUtils';
import ModalCustom from '@/components/ModalCustom.vue';

const props = defineProps({
  toggleShowQuestionForm: {
    type: Function,
    required: true,
  },
});

const socket = inject('socket');
const submitSuccess = ref(false);
const showFormModal = ref(false);
const msgSuccess = 'Question submitted successfully!';
const msgFail = 'An error occurred, please try again!';

const closeModal = () => {
  showFormModal.value = false;
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const pendingQuestion = new PendingQuestion(
    null,
    formData.get('question'),
    formData.get('category'),
    formData.get('level'),
    formData.get('answer1'),
    formData.get('answer2'),
    formData.get('answer3'),
    formData.get('answer4'),
    formData.get('correctId'),
    formData.get('source'),
    null
  );

  const postData = { ...pendingQuestion };
  delete postData.id;
  delete postData.userId;

  socket.emit('submit_pending_question', postData);
};

socket.on('submit_pending_success', () => {
  submitSuccess.value = true;
  showFormModal.value = true;
});

socket.on('submit_pending_fail', () => {
  submitSuccess.value = false;
  showFormModal.value = true;
});
</script>

<style scoped>
.submit-form-wrapper {
  z-index: 700;
}

.submit-form {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 60px 30px;
  background-color: var(--bg-primary);
  border-radius: 10px;
}

.submit-form-close {
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
}

.submit-form-outer {
  overflow-y: auto;
}

.submit-form-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 20px 0px;
  border-radius: 10px;
}

.submit-form-required {
  color: var(--btn-secondary);
}

.submit-form-control {
  margin: 5px 0px;
  padding: 5px 10px;
  border-radius: 10px;
  border: none;
  background-color: rgb(199, 199, 199);
}

.submit-form-note {
  font-size: small;
  font-weight: lighter;
}

.submit-form-radio-group {
  display: flex;
  justify-content: center;
  align-items: center;
}

.submit-form-radio-option {
  margin-right: 20px;
}

.submit-form-radio-label {
  padding-left: 4px;
}

.submit-form-buttons-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.submit-form-submit {
  width: 100px;
  height: 40px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  padding: 15px 35px 15px 35px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  color: var(--text-primary);
  background-color: var(--btn-primary-d);
}

.submit-form-submit:hover {
  background-color: var(--btn-primary);
}

.submit-form-cancel {
  width: 100px;
  height: 40px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  padding: 15px 35px 15px 35px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  color: var(--text-primary);
  background-color: var(--btn-secondary-d);
}

.submit-form-cancel:hover {
  background-color: var(--btn-secondary);
}

/* Hide scrollbar for Chrome, Safari and Opera */
.submit-form-outer::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.submit-form-outer {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

@media screen and (max-width: 1200px) {
  .submit-form-radio-group {
    flex-direction: column;
  }

  .submit-form-radio-option {
    margin-right: 0px;
  }
}
</style>
