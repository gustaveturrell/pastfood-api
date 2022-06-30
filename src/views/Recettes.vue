<script setup>
import Comment from '../components/Comment.vue';
</script>

<script>
import {defineComponent} from 'vue'
import { recipeService } from '../services/recipes_services';
export default defineComponent({
    data(){
        return{
            recette: []
        }
    },
    mounted(){
        recipeService.getAllRecipes()
            .then((res) => {this.recette = res.data.data.data;
             console.log(this.recette)
             });
            
            // .catch(err => console.log(err))
    },
    computed: {
        comptage(){
            return (this.recette.length == 0) ? ' Aucune recette ' : ` Il y en a ${this.recette.length} `
        },
        dateFormat(){
            return this.recette.map(c => c.createdAt.split('T')[0].split('-').reverse().join('/'))
        }
    }
})

</script>


<template>
  <div class="dark:bg-[#141414] min-h-screen">
    <div id="card-recette" class=" dark:bg-[#141414] h-screen overflow-y-auto scrollbar">
      <div
        class="modal-container mx-auto relative p-4 w-full max-w-2xl "
        v-for="(recette, index) in recette"
        :key="index"
      >
        <div class="shrink-0">
          <div id="card-image">
            <img src="../assets/test/vertumnus.jpg" class="w-fit" alt="Image" />
          </div>
          <div
            id="card-desc"
            class="descript bg-[#1a1a1a] px-6 py-4 text-white"
          >
            <div class="flex flex-row item-center">
              <div class="font-bold text-xl mb-2 grow">
                <h4>{{ recette.description.name|| 'pas de données émises' }}</h4>
              </div>
              <div id="star_score" class="-order-1">
                <font-awesome-icon icon="star" />
                <p>{{recette.ratingsAverage}}</p>
              </div>
              <div id="addHeart" class="order-last">
                <button type="button" disabled class="cursor-not-allowed">
                  <font-awesome-icon icon="heart" size="lg" />
                </button>
              </div>
            </div>
            <div id="desc_recette" class="mb-4 overflow-y-auto">
              <div class="bg-[#242424] p-2 rounded">
                <div id="periode">
                  <h4 class="font-bold text-xl flex justify-center items-center">Période</h4>
                  <p class="flex justify-center items-center">{{recette.description.period}}</p>
                </div>
                <div id="description">
                  <h4 class="font-bold text-xl flex justify-center items-center">Résumé</h4>
                  <div>
                    <p class="flex justify-center items-center">{{recette.description.resume}}</p>
                  </div>
                 
                </div>
                <div id="ingredient">
                  <h4 class="font-bold text-xl flex justify-center items-center">Ingrédient</h4>
                   <div
                          v-for="(recette, index) in recette.ingredientsAll">
                          <div id="intitule">
                            <div>
                              <span>
                                <p>Ingrédient {{index+1}}:</p>
                                <a :href="recette._ingTranscript"></a>
                                {{recette._ingTranscript}}
                              </span>
                            </div>
                            <div>wikidataQID: {{recette.wikidataQID}}</div>
                          </div>
                        </div>
                  <!-- <div class="grid grid-cols-1">
                    <div v-for="(recette, index) in recette.ingredientsAll">
                    <div id="intitule">
                     <div>Index: {{index}}</div>
                     <div>Unité: {{recette.unit}}</div>
                     <div>max/min: {{recette.maximun}}/{{recette.minimun}}</div>
                     <div>wikidataQID: {{recette.wikidataQID}}</div>
                    <div><span><p>Ingrédient transcript:</p> <a :href="recette._ingTranscript"></a>{{recette._ingTranscript}}</span></div>
                    <div>Ingrédient traduit: {{recette._ingTranslated}}</div>
                    </div>
                    </div> 
                  </div>-->
                  <!-- <table class="md:table-fixed" >
                    <thead>
                        <tr>
                            <th>Unité</th>
                            <th>Max</th>
                            <th>Min</th>
                            <th>wikidataQID</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(recette) in recette.ingredientsAll">
                            <td>{{recette.unit}}</td>
                            <td>{{recette.maximun}}</td>
                            <td>{{recette.minimun}}</td>
                            <td>{{recette.wikidataQID}}</td>
                         
                        </tr>
                    </tbody>

                </table>
                <table class="md:table-fixed">
                    <thead>
                        <tr>
                            <th>Ingréd Transcript</th>
                            <th>Ingréd Traduit</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(recette) in recette.ingredientsAll" :key="index">
                            <td>{{recette._ingTranscript}}</td>
                            <td>{{recette._ingTranslated}}</td>
                        </tr>
                    </tbody>
                </table>
                  -->
                </div>
                <div id="instruction">
                  <h4 class="font-bold text-xl flex justify-center items-center">Instruction</h4>
                  <div
                    v-for="(recette, index) in recette.instructionsAll"
                    :key="index"
                  >
                    <div id="instruct-transcription">
                      <div>
                        <h2>Etape : {{recette.key}}</h2>
                        <h1>Transcription</h1>
                        <p>{{recette._textTranscript}}</p>
                        <h1>Traduction</h1>
                        <p>{{recette._textTranslated}}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <!--
                TODO: implementer les comms
              -->
              <Comment />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>

.modal-container{
    /* position: relative;
    max-width: 600px;
    width:50%; */
  
    padding-bottom: 2rem;
    /* padding: 10px 15px; */
    box-shadow: 0 2px 8px rgba(175, 173, 173, 0.33);
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

</style>
