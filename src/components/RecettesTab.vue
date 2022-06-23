<script setup lang="ts">
import {ref} from 'vue';
import Cart from '../components/Cart.vue'

const filtres = ref(false)
// const showmodal = ref(false)
const isRed = ref(false)
// let index = ref(1)


const openFiltre = ()=>{
        filtres.value = !filtres.value
        isRed.value = !isRed.value
        console.log(filtres.value)
};


// function showmodals(id:number){
//    index.value = id
//    showmodal.value = !showmodal.value
//    console.log(index.value)
//    console.log(id)
//    console.log(showmodal.value)
   

// }

/**
*TODO: filters names,rating / dark theme
* * https://stackoverflow.com/questions/71550585/close-modal-in-vue3
* * * filtres 
*! problem true/false modal
 */

</script>

<script lang="ts">
import {defineComponent} from 'vue'
import { recipeService } from '../services/recipes_services';
export default defineComponent({
    data(){
        return{
            recette: {},
            showmodal:false,
            index:{},
             search: {},
        }
    },
    created(){
        recipeService.getAllRecipes()
            .then((res) => {(this.recette = res.data.data.data);
             console.log(this.recette)
             
             }).catch(err => console.log(err))
            
            // .
    },
    methods:{      
    showmodals(id:number){
    this.index = id;
    this.showmodal = !this.showmodal
    console.log(this.index)
    console.log(id)
    console.log(this.showmodal)
}
    },
    computed: {
        comptage(){
            return (this.recette.length == 0) ? ' Aucune recette ' : ` Il y en a ${this.recette.length} `
        },
        dateFormat(){
            return this.recette.map(c => c.createdAt.split('T')[0].split('-').reverse().join('/'))
        },
        filteredProducts() {
      return this.recette.filter(p => {
        // return true if the product should be visible
        console.log(this.recette)

        // in this example we just check if the search string
        // is a substring of the product name (case insensitive)
        return p.description.name.toLowerCase().indexOf(this.search.toLowerCase()) != -1;
        
      });
      },
    }
})

</script>


<template>

<div class="dark:bg-[#141414] h-screen">
  <div
    id="search-bar"
    class="xl:w-96 container mx-auto mb-6 dark:bg-[#141414]"
  >
    <!-- <form @submit.prevent="">
    <input v-model="question" type="search"
      class="form-control block w-full px-3 py-1 text-base font-normal text-gray-700 bg-white dark:bg-[#212121f2] dark:text-white bg-clip-padding border border-solid border-gray-300 dark:border-grey-900 rounded transition ease-in-out m-0
        focus:text-gray-700 focus:bg-white focus:border-black dark:focus:border-purple-600 focus:outline-none" placeholder="rechercher une recette..."/></form>
        <p>{{answer}}</p>
    <button @click="">click</button>-->
    <!-- <div v-for="(recette,index) in recette" :key="index">
        <p>{{recette.description.name}}</p>
    </div>-->
   
  </div>
  <div id="filter">
    <div id="btn-filters">
      <button @click="openFiltre">
        <font-awesome-icon
          icon="filter"
          class="h-6 dark:text-white"
          :class="{red : isRed}"
        />
      </button>
    </div>
    <div v-show="filtres" class="flex flex-row gap-3 mb-6">
      <button class="basis-1/4 md:basis-1/3 bg-blue-400 rounded">
        <font-awesome-icon icon="arrow-down-1-9" />
      </button>
      <button class="basis-1/4 md:basis-1/3 bg-blue-400 rounded">
        <font-awesome-icon icon="arrow-down-a-z" />
      </button>
      <button class="basis-1/4 md:basis-1/3 bg-blue-400 rounded">
        <font-awesome-icon icon="calendar" />
      </button>
    </div>
  </div>
  <div id="last-update" class="container mx-auto dark:bg-[#141414]">
    <div>
      <h4 class="dark:text-white">{{ comptage }}</h4>
       <div class="search-wrapper panel-heading col-sm-12">
    <input type="text" v-model="search" placeholder="Search" /> <br> <br>
  </div>  
    </div>
    <div
      id="tab_rec"
      class="tab_recettes bg-[#f1f1f1] text-[#476582] dark:bg-[#2a2929] dark:text-white grid grid-cols-3 gap-2 rounded p-2 mb-4 overflow-y-auto"
      v-for="(item, index) in recette"
      :key="index"
    >
      <div id="star_score">
        <p class>
          <font-awesome-icon icon="star" class="text-blue dark:text-[#facc15]" />
          {{item.ratingsAverage}}/5
        </p>
      </div>
      <div id="name_recette" class="flex justify-center items-center flex-col">
        <div id="rec_name">
          <h1 class="tab-title-recipe">{{item.description.name}}</h1>
        </div>
        <div
          class="btn-detail bg-[#242424] dark:bg-orange-600 rounded px-2 py-2 text-white hover:bg-red-600 dark:hover:bg-orange-400 dark:hover:text-black"
        >
          <button
            type="button"
            @click="showmodals(item)"
            class="btn-modal-show"
          >Détails</button>
        </div>
      </div>
      <div id="date_add" class="flex justify-end">
        <p class="text-base">{{dateFormat[index]}}</p>
      </div>
    </div>
    <div id="modal-carousel">
      <Cart @close="showmodal= false" :show="showmodal" :recettes="index"></Cart>
    </div>

    <!-- <Teleport to="body"> -->

    <!-- </Teleport>    -->
  </div>
</div>
</template>


<style scoped>

.red{
    color:red;
}

.btn-pg{
    height: 40px;
    width: 30px;
}
</style>
