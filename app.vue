<template>
  <div class="h-screen">
    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>
import { useMyUserStore } from './stores/user';

onMounted(async () => {
  const store = useMyUserStore();

  await store.fetchData();
})
</script>