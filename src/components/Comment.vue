<script setup lang="ts">
import {ref} from 'vue'
// import reviews from '../../../pastfood-api-main/dev-data/data/reviews.json'

const nb_avis = ref(0)
const toggle = ref(false)
const text = ref('')


function showComs(){
    toggle.value = ! toggle.value
}


</script>

<template>
  <div id="comment">
    <button
      @click="showComs"
      type="button"
      id="avis"
      class="button_avis p-2 rounded-lg bg-red-500 hover:bg-red-900 focus:outline-none mb-4"
    >{{nb_avis}} Avis</button>
    <div class="comms bg-gray-300 rounded p-8" v-show="toggle">
      <div
        class="bg-gray-600 rounded mb-2 grid grid-cols-1 row-auto gap-2 divide-y divide-gray-500 p-2"
      >
        <div id="posts" class="flex flex-grow flex-row justify-between">
          <div id="user">Piway</div>
          <div id="user_scores">3 stars</div>
          <div id="date_user">22/09/2022</div>
        </div>
        <div id="textes_user">{{text}}</div>
      </div>
      <div class="flex flex-col justify-center">
        <form action="">
          <textarea
            v-model="text"
            type="text"
            placeholder="Ecrivez..."
            class="rounded w-full text-black caret-red-500"
          ></textarea>
          <!-- add emoticon -->
          <button
            type="button"
            class="button_send bg-red-500 rounded-lg p-2 hover:bg-red-900 focus:outline-none"
          >Envoyer</button>
        </form>
      </div>
    </div>
  </div>
</template>