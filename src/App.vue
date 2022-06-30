<script setup lang="ts">
import {ref} from 'vue'
import Banner from './components/Banner.vue'
const isDark = ref(false)

function toggleDark(){
  isDark.value = !isDark.value
}
</script>

<template>
  <div :class="isDark ?  'dark' :''">
    <div class="dark:bg-[#141414]">
        <div class="banner-theme sticky top-0">
          <Banner />
          <button
            @click="toggleDark"
            class="rounded-md border border-solid border-gray-300 dark:border-orange-300 w-10">
            <font-awesome-icon icon="moon" class="h-6 dark:text-white" />
          </button>
        </div>
        <div id="views">
          <router-view></router-view>
        </div>
    </div>
  </div>
</template>

<style>
/* @import url('http://fonts.cdnfonts.com/css/renaissance');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0'); */

</style>
