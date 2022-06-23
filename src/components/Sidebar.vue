<script setup lang="ts">
import {ref} from 'vue'
const closen = ref(false)

function closenav(){
   closen.value = !closen.value
}
</script>

<template>
<aside class="flex flex-grow bg-slate-400 text-white md:h-full fixed lg-static lg-h-auto h-screen" v-show="closen">
   <div class="flex flex-col overflow-y-auto overscroll-contain h-screen">
   <div class="flex items-center py-2 mx-4 flex-shrink-0">
      <button class="relative md-btn flex items-center px-3 -mr-2 justify-center  rounded-full px-0 w-64" @click="closenav">
        
            <span class="material-symbols-outlined flex items-center justify-center font-medium select-none">
         close
         </span>
      </button>
   </div>
   <div class="footer">
    
   </div>
   </div>
</aside>
</template>

<!-- <span class="material-symbols-outlined">
close
</span>
<span class="material-symbols-outlined">
home
</span>

<span class="material-symbols-outlined">
logout
</span>

 -->

 <style scoped>

 aside{
    padding: 1rem;
    right: 0;
    top:0;
    z-index: 50;
    box-shadow: rgba(0, 0, 0, 0.1) -25px 0px 9px -25px inset;
    min-width: 256px;
 }
  
 </style>