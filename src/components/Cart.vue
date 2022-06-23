<script setup>
import Comment from '../components/Comment.vue'

// const props = defineProps<{
//     recettes:[],
//     show: Boolean,
// }>();
/**
 * TODO: optimiser  props et emits
 * * utiliser data du parent component
 */
const props = defineProps({
  show:Boolean,
  recettes:Object,
})

// const emit =  defineEmits(['close'])

// const close = ()=>{
//     emit("close")
//     console.log(props.show)
// }


console.log(props.recettes)


</script>

<template>
  <!--
    TODO: avis + comments + modal height
  -->

  <Transition name="modal-fluide">
    <div
      id="card-recette"
      class="modal fixed top-0 left-0 z-50 w-full md:inset-0 min-h-screen h-full justify-center overflow-y-auto"
      v-if="show"
    >
      <Transition name="modal-content">
        <div
          class="modal-container rounded relative p-4 w-full max-w-2xl h-full overflow-y-auto scrollbar bg-white dark:bg-red-600"
        >
          <div class="md:shrink-0">
            <div class="flex justify-end">
              <button @click="$emit('close')" class="px-4 m-4">
                <font-awesome-icon
                  icon="circle-xmark"
                  class="h-8 hover:text-red-600 dark:text-white dark:hover:text-red-600"
                />
              </button>
            </div>
            <div id="card-image">
              <img class="cover-fit" src="../../src/assets/test/vertumnus.jpg" />
            </div>
            <div
              id="card-desc"
              class="descript bg-gray-300 dark:bg-[#1a1a1a] px-6 py-4 dark:text-white "
            >
              <div class="flex flex-col flex-shrink-0">
                <div class="font-bold text-xl mb-2 grow">
                  <h4>{{ recettes.description.name|| 'pas de données émises' }} , {{recettes.id}}</h4>
                </div>
                <div id="star_score" class="-order-1">
                  <font-awesome-icon icon="star" />
                  {{recettes.ratingsAverage}}
                </div>
                <div id="addHeart" class="order-last">
                  <button type="button" disabled class="cursor-not-allowed">
                    <font-awesome-icon icon="heart" size="lg" />
                  </button>
                </div>
              </div>
              <div id="desc_recette" class="mb-4 overflow-y-auto">
                <div class="dark:bg-[#242424] p-2 rounded">
                  <div id="periode">
                    <h4>Période: {{recettes.description.period}}</h4>
                  </div>
                  <div id="description">
                    <h4>description</h4>
                    <div>
                      <h4>Résumé:</h4>
                      <div>
                        <p>{{recettes.description.resume}}</p>
                      </div>
                    </div>
                    <div id="ingredient">
                      <h2>Ingrédient</h2>
                      <div class="grid grid-cols-1">
                        <div
                          v-for="(recettes, index) in recettes.ingredientsAll"
                        >
                          <div id="intitule">
                            <div>Index: {{index}}</div>
                            <div>Unité: {{recettes.unit}}</div>
                            <div>max/min: {{recettes.maximun || 'rien'}}/{{recettes.minimun ||'rien'}}</div>
                            <div>wikidataQID: {{recettes.wikidataQID}}</div>
                            <div>
                              <span>
                                <p>Ingrédient transcript:</p>
                                <a :href="recettes._ingTranscript"></a>
                                {{recettes._ingTranscript}}
                              </span>
                            </div>
                            <div>Ingrédient traduit: {{recettes._ingTranslated}}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="instruction">
                      <h1>Instruction</h1>
                      <div
                        v-for="(recettes, index) in recettes.instructionsAll"
                        :key="index"
                      >
                        <div id="instruct-transcription">
                          <div>
                            <h2>Etape : {{recettes.index}}</h2>
                            <h1>Transcription</h1>
                            <p>{{recettes._textTranscript}}</p>
                            <h1>Traduction</h1>
                            <p>{{recettes._textTranslated}}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!--
                TODO: implementer les comms
                -->
                <Comment />
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<style scoped>
/**
*TODO: optimisation > mettre du tailwind 
*/
.modal-fluide-enter-from,
.modal-fluide-leave-to{
    opacity: 0;
}

.modal-content-enter-from{
    opacity: 0;
    transform: scale(0.8);
}

.modal-content-leave-to{
    transform: scale(0.8);
}

.modal{
    /* position: fixed;
    top:0;
    left:0; */
    background-color: #5b575796;
    transition: opacity 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.modal-container{
    /* position: relative;
    max-width: 600px;
    width:50%; */
    margin: 0px auto;
    /* padding: 10px 15px; */
    box-shadow: 0 2px 8px rgba(0, 0, 0);
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
</style>