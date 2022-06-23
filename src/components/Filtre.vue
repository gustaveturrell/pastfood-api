<script setup lang="ts">
    import {ref} from 'vue'

    const filtres = ref(false)
    const openF = ref(true)
    const closeF = ref(false)

    

  const openFiltre = ()=>{
        filtres.value = !filtres.value
        openF.value = !openF.value
        closeF.value = !closeF.value
    }

    function closeFiltre(){
        filtres.value = !filtres.value
        openF.value = !openF.value
        closeF.value = !closeF.value
    }

</script>


<template>
<div id="filter">
    <div>
            <div class="flex flex-row-reverse w-full">

                    <div class="input-group flex flex-wrap items-stretch w-full mb-4">
                    <input id="searching" type="search" class="flex-auto min-w-0 block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon3">
                    <button class="btn inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" type="button" id="button-addon3">Search</button>
            </div>
                    
            </div></div>  
    <div >
    <button @click="openFiltre" v-show="openF"><span class="material-symbols-outlined mb-2 bg-sky-400 rounded-full">
    filter_alt
    </span></button>
    <button @click="closeFiltre" v-show="closeF"><span class="material-symbols-outlined bg-red-400 rounded-full">
    filter_alt_off
    </span></button></div>
    <div v-show="filtres" class="flex flex-row gap-3 mb-6">
        <button class="basis-1/4 md:basis-1/3 bg-blue-400 rounded">Notes</button>
        <button class="basis-1/4 md:basis-1/3 bg-blue-400 rounded">Nom alphabetique</button>
        <button class="basis-1/4 md:basis-1/3 bg-blue-400 rounded">dates</button>
    </div>
</div>
</template>

