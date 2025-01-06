<template>
  <div>
    <LoaderRing v-if="isLoading" />
    <div v-else>
      <router-view v-if="!isAuthenticated" />
      <component :is="currentView" v-else />
    </div>
  </div>
</template>

<script setup>
import { ref, provide, onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import LoaderRing from './components/LoaderRing.vue';
import HomeView from './views/HomeView.vue';
import GameView from './views/GameView.vue';
import { checkIfAuthenticated } from './utils/authUtils';
import socket from './socket';

const isAuthenticated = ref(false);
const user = ref(null);
const gameRoom = ref("");
const isLoading = ref(true);
const currentPage = ref('/');

const router = useRouter();

const currentView = computed(() => {
  if (currentPage.value === "/") {
    return HomeView;
  } else if (currentPage.value === "game") {
    return GameView;
  }
  return null;
});

const handlePageChange = () => {
  if (currentPage.value !== "/" && currentPage.value !== "game") {
    socket.emit("not_available");
  } else if (currentPage.value === "/") {
    socket.emit("available");
  }
};

onMounted(async () => {
  try {
    isAuthenticated.value = await checkIfAuthenticated();
  } finally {
    isLoading.value = false;
    if (isAuthenticated.value) {
      if (router.currentRoute.value.path === "/login") {
        router.replace("/");
      }
    } else {
      if (router.currentRoute.value.path !== "/login") {
        router.replace("/login");
      }
    }
  }
});

provide("socket", socket);
provide("isAuthenticated", isAuthenticated);
provide("user", user);
provide("gameRoom", gameRoom);
provide("currentPage", currentPage)

watch(currentPage, handlePageChange);
</script>
