<script setup lang="ts">
import {onMounted, ref} from 'vue'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

/**
 * *Temporaire it seems importanting routerview, routerlink
 */
import { RouterView, RouterLink } from "vue-router";
{
  RouterView;
  RouterLink;
}


const openav = ref(false)

function navclick(){
    openav.value = !openav.value
}



// const props = defineProps<{
//     toggledark: Boolean,

// }>();



</script>

<script lang="ts">
import { userService } from '../services/user_service';
import { accountService } from '../services/account_service';

export default {
    name: 'Home',
    data(){
      return{
        user: null as any,
        // props:['user']
        }
    },
     mounted(){
        userService.getMe()
            .then((res) => {
                res.data
                this.user = res.data;
            })
            .catch((err) => console.log(err))
    }, 
    methods:{
        logout(){
        accountService.logout()
        this.$router.push('/Register')
        console.log('déconnecté')
        },
        
     },
}


</script>


<template>
  <!-- 
    <div class=" bg-no-repeat bg-center h-[50vh]"> 
        bg-[#2c2c2c]
  -->

  <!--
     TODO: finir layout navside / login or create 
  -->

  <div class="banner bg-white dark:bg-[#202020]">
    <div class="mx-auto max-w-8xl xl:px-8">
      <div
        class="flex items-center justify-between border-b border-red-600 px-2 py-2 sm:px-6 lg:px-8 xl:px-0"
      >
        <div class="logo block flex flex-row justify-center items-center">
          <div id="menu_sidebar">
            <button
              class="btn-sidebar text-dark hover:text-red-600"
              @click="navclick"
            >
              <font-awesome-icon
                icon="bars"
                class="h-6 dark:text-white dark:hover:text-red-600"
              />
            </button>
          </div>
          <div>
            <img src="../assets/test/logo_4.png" class="h-12" />
          </div>
        </div>
        <!-- <div class="flex justify-center"><div id="search-bar" class="xl:w-96"><input type="search"
      class="form-control block w-full px-3 py-1 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0
        focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none" placeholder="rechercher une recette..."/></div></div>-->
        <div
          id="banner-login"
          class=" flex flex-row items-center justify-center"
        >
          <div >
            <h1 v-if="user" class="dark:text-white">{{user.data.doc.name}}</h1>
            <h1 v-if="!user" class="dark:text-white">Se connecter</h1>
          </div>
          <Menu as="div">
            <MenuButton class="inline-flex w-full justify-center rounded-md">
              <font-awesome-icon
                icon="user"
                class="text-black-200 hover:text-red-400 h-6 dark:text-white dark:hover:text-red-600"
              />
            </MenuButton>
            <MenuItems
              class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 dark:divide-red-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-[#202020]"
            >
              <div class="px-1 py-1">
                <MenuItem v-slot="{ active }">
                  <router-link to="/Register">
                    <button v-if="!user"
                      
                      :class="[
                  active ? 'bg-black text-white dark:bg-purple-400 dark:text-black' : 'text-gray-900 dark:text-white',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]"
                    >
                      <font-awesome-icon
                        icon="hammer"
                        :active="active"
                        class="mr-2 h-5 w-5 text-dark-400"
                        aria-hidden="true"
                      />login
                    </button>
                  </router-link>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <router-link to="/Compte">
                    <button v-if="user"
                      :class="[
                  active ? 'bg-black text-white dark:bg-purple-400 dark:text-black' : 'text-gray-900 dark:text-white',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]"
                    >
                      <font-awesome-icon
                        icon="hammer"
                        :active="active"
                        class="mr-2 h-5 w-5 text-dark-400"
                        aria-hidden="true"
                      />Compte
                    </button>
                  </router-link>
                </MenuItem>
                 <MenuItem v-slot="{ active }">
                  <router-link to="/Register">
                    <button v-if="user" @click="logout"
                      :class="[
                  active ? 'bg-black text-white dark:bg-purple-400 dark:text-black' : 'text-gray-900 dark:text-white',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]"
                    >
                      <font-awesome-icon
                        icon="arrow-right-from-bracket"
                        :active="active"
                        class="mr-2 h-5 w-5 text-dark-400"
                        aria-hidden="true"
                      />Se déconnecter
                    </button>
                  </router-link>
                </MenuItem>
              </div>
              <div class="px-1 py-1">
                <MenuItem disabled>
                  <button
                    :class="[
                  'opacity-75',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]"
                  >
                    <font-awesome-icon
                      icon="hammer"
                      class="mr-2 h-5 w-5 text-dark-400"
                      aria-hidden="true"
                    />favoris (soon)
                  </button>
                </MenuItem>
                <MenuItem disabled>
                  <button
                    :class="[
                    'opacity-75',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]"
                  >
                    <font-awesome-icon
                      icon="hammer"
                      class="mr-2 h-5 w-5 text-dark-400"
                      aria-hidden="true"
                    />Aides (soon)
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
          <!-- <div class="inline-flex w-full justify-center rounded-md">
            <button v-if="user" @click="logout">
              <font-awesome-icon
                icon="arrow-right-from-bracket"
                class="text-black-200 hover:text-red-400 h-6 dark:text-white dark:hover:text-red-600"
              />
            </button>
          </div> -->
        </div>

        <transition name="sidebar-fluide">
          <div v-show="openav" class="sidebar fixed top-0 left-0">
            <transition name="sibar-content">
              <div
                class="sidebar-close bg-[#f0f1f2] dark:bg-[#202020] flex flex-grow text-black dark:text-white h-full shadow-md w-64"
                v-show="openav"
              >
                <div
                  class="flex flex-col overflow-y-auto overscroll-contain h-screen w-full"
                >
                  <div
                    class="flex items-center justify-between py-2 mx-4 flex-shrink-0"
                  >
                    <div class="fe">
                      <span>
                        <img
                          class="h-12 w-12"
                          src="../../src/assets/test/logo_3.png"
                          alt="logo"
                        />
                      </span>
                    </div>
                    <button
                      class="md-btn flex items-center px-3 justify-center rounded-full px-0 hover:text-red-600"
                      @click="navclick"
                    >
                      <font-awesome-icon
                        icon="angles-left"
                        class="h-6 dark:hover:text-red-600"
                      />
                    </button>
                  </div>
                  <hr class="dark:text-red-900" />
                  <div class="liens flex flex-col flex-shrink-0 px-4 pt-6">
                    <router-link :to="{name:'Home'}">
                      <div
                        class="home mb-4 hover:bg-black hover:text-white dark:hover:bg-purple-400 dark:hover:text-black rounded-md"
                      >
                        <button class="btn-home h-8">
                          <font-awesome-icon icon="house" class="h-6 mr-2" />Accueil
                        </button>
                      </div>
                    </router-link>
                    <router-link to="/Recettes">
                      <div
                        class="transcript mb-4 hover:bg-black hover:text-white dark:hover:bg-purple-400 dark:hover:text-black rounded-md"
                      >
                        <button class="btn-transcript h-8">
                          <font-awesome-icon icon="book-open" class="h-6 mr-2" />Recettes Card
                        </button>
                      </div>
                    </router-link>
                    <router-link to="/About">
                      <div
                        class="about mb-4 hover:bg-black hover:text-white dark:hover:bg-purple-400 dark:hover:text-black rounded-md"
                      >
                        <button class="btn-about h-8">
                          <font-awesome-icon
                            icon="people-group"
                            class="h-6 mr-2"
                          />Projet
                        </button>
                      </div>
                    </router-link>
                    <router-link to="/Compte">
                      <div
                        class="compte hover:bg-black hover:text-white dark:hover:bg-purple-400 dark:hover:text-black rounded-md"
                        hidden
                      >
                        <button class="btn-compte h-8">
                          <font-awesome-icon
                            icon="people-group"
                            class="h-6 mr-2"
                          />Compte
                        </button>
                      </div>
                    </router-link>
                  </div>
                </div>

                <div class="footer fixed bottom-0">
                  <hr class="mb-4" />
                  <div class="px-4 pt-6">
                    <div id="f-team" class="mb-4">
                      <span>By Team PaF</span>
                    </div>
                    <div id="f-cesr" class="mb-4">
                      <span>
                        <a
                          href="https://cesr.univ-tours.fr/"
                          class="hover:text-white dark:hover:text-black"
                        >CESR Université de Tours</a>
                      </span>
                    </div>
                    <div id="f-copy" class="mb-4">
                      <span>
                        <font-awesome-icon icon="copyright" />PastFood 2022
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </transition>
      </div>
    </div>
  </div>

  <!-- </div> -->
</template>


<style scoped>
/* .banner{
    background-image: url('../assets/test/w3.png');
    height: 50vh;
     bg-no-repeat bg-center
} */

/* .banner{
    position: sticky;
    position: -webkit-sticky;
    top:0px;
    

} */

.sidebar-fluide-enter-from,
.sidebar-fluide-leave-to{
    transform: translate3d(-100%, 0, 0);
}

/* .sidebar-content-leave-from{
     transform: translate3d(-100%, 0, 0);
} */

.sidebar{
    
    transition: .5s all;
}

.sidebar-close{
     transition: .5s all;
}
  
</style>
