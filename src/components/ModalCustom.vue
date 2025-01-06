<template>
  <div class="modal-form-wrapper popup-wrapper">
    <div class="modal-form">
      <span :class="['modal-form-text', props.isError ? '' : 'modal-form-text-fail']">
        {{ props.modalMsg }}
      </span>
      <button class="modal-form-close" @click="props.callback">
        <div v-if="isError" class="modal-confirm-yes">Yes</div>
        <div v-else class="modal-confirm-no">No</div>
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modalMsg: {
    type: String,
    required: true,
  },
  isError: {
    type: Boolean,
    required: true,
  },
  callback: {
    type: Function,
    required: true,
  },
});
</script>

<style scoped>
.modal-form-wrapper {
  z-index: 800;
}

.modal-form {
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  background-color: var(--bg-alt);
  border-radius: 10px;
  text-align: center;
}

.modal-form-text {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.modal-form-text-fail {
  color: red;
}

.modal-form-close {
  margin-top: 20px;
  padding: 15px 20px 15px 20px;
  border: none;
  border-radius: 10px;
  background-color: var(--bg-primary);
  cursor: pointer;
}

.modal-form-close:hover {
  background-color: var(--bg-primary-d);
}
</style>
