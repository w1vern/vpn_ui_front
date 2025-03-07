<template>
  <div class="flex justify-between items-center w-full border-b-2 border-slate-900 p-4">
    <div class="shrink-0">
      <a>
        <NuxtImg src="/images/blank_logo.png" class="h-10" alt="Logo"/>
        <!-- <img alt="logo" src="@/assets/images/blank_logo.png" class="w-32 h-auto"/> -->
      </a>
    </div>

    <div >
      <nav>
        <NuxtLink to="/"></NuxtLink>
        <!-- <NuxtLink ></NuxtLink>
        <NuxtLink ></NuxtLink> -->
      </nav>
    </div>

    <div>
      <Icon name="material-symbols-light:dark-mode" size="4em" />
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>