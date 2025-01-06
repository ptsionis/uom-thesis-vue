<template>
  <div class="friendlist-wrapper popup-wrapper">
    <div class="friendlist">
      <div class="friendlist-close" @click="$emit('toggle-friendlist')">close</div>
      <ul class="friendlist-ul">
        <li v-for="(friend, index) in friends" :key="index">
          <FriendItem :friend="friend" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';
import FriendItem from '@/components/FriendItem.vue'

const socket = inject('socket');
const user = inject('user');

const friends = ref([]);

onMounted(() => {
  socket.emit('get_friends');
  
  socket.on('set_friends', (receivedFriends) => {
    friends.value = receivedFriends;
    socket.emit('get_friends_status', user.id);
  });
});
</script>

<style scoped>
.friendlist-wrapper {
  z-index: 700;
}

.friendlist {
  position: relative;
  width: 100%;
  max-width: 450px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 60px 25px;
  border-radius: 10px;
  background-color: var(--bg-primary);
}

.friendlist-close {
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
}

.friendlist-ul {
  width: 100%;
  list-style: none;
  margin-top: 15px;
  overflow-y: auto;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.friendlist-ul::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.friendlist-ul {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>