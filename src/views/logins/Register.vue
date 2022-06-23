<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import nouveau from '../logins/AccountCreate.vue'

// const isSubmitting = (false)

// import { defineComponent } from 'vue'

</script>

<script lang="ts">
import { accountService } from '../../services/account_service';
export default {
  data() {
    return {
      user:{ 
        email :'',
        password : '',
        },      
    }
  },
  methods: {
    loginSubmit (){
      accountService.login(this.user)
      .then( res=>{
        accountService.saveToken(res.data.token);
        this.$router.push('/');
        console.log(res);
        console.log('co');
      }).catch(err=>console.log(err))
      }    
  }
}

// import {useRouter} from "vue-router";
// import axios from "axios";
  
//     const router = useRouter();

//     const loginSubmit = async e => {
//       const form = new FormData(e.target);
//       const inputs = Object.fromEntries(form.entries());
//       const {data} = await axios.post(`${import.meta.env.VITE_APP_API_URL}pastfood/v1/users/login/`, inputs, {
//         withCredentials: true
//       });
//       axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
//       await router.push('/');
//     }
   
  
</script>

<template>
<section class="flex flex-col">
  <div class="container px-6 py-12 h-full">
    <div
      class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800"
    >
      <div class="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
        <img src="../../assets/test/vertumnus.jpg" class="w-full" alt="Image" />
      </div>
      <div class="md:w-8/12 lg:w-5/12 lg:ml-20">
        <TabGroup>
          <TabList
            class="flex space-x-1 rounded-xl bg-blue-900/20 dark:bg-orange-600 p-1 mb-6"
          >
            <Tab v-slot="{selected}" as="template">
              <button
                :class="[
              'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 dark:text-black',
              'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 dark:ring-offset-blue-900 focus:outline-none focus:ring-2',
              selected
                ? 'bg-white shadow'
                : 'text-dark hover:bg-white/[0.12] dark:hover:bg-orange-400 hover:text-red-400 dark:hover:text-black',
            ]"
              >Se connecter</button>
            </Tab>
            <Tab v-slot="{selected}" as="template">
              <button
                :class="[
              'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 dark:text-black',
              'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 dark:ring-offset-blue-900 focus:outline-none focus:ring-2',
              selected
                ? 'bg-white shadow'
                : 'text-dark hover:bg-white/[0.12] hover:text-red-400',
            ]"
              >S'inscrire</button>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <form @submit.prevent="loginSubmit">
                <div class="mb-6">
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autocomplete="email"
                    required
                    class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none invalid:border-pink-600 invalid:text-pink-600 dark:invalid:border-red-900 dark:invalid:text-red-900 dark:border-2"
                    placeholder="ex: jean@gmail.com"
                    v-model="user.email"
                  />
                </div>
                <div class="mb-6">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autocomplete="current-password"
                    required
                    class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none invalid:border-pink-600 invalid:text-pink-600 dark:invalid:border-red-900 dark:invalid:text-red-900 dark:border-2"
                    placeholder="mot de passe"
                    v-model="user.password"
                  />
                </div>

                <div class="flex justify-between items-center mb-6">
                  <div class="form-group form-check">
                    <input
                      type="checkbox"
                      class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      id="exampleCheck3"
                    />
                    <label
                      class="form-check-label inline-block text-gray-800"
                      for="exampleCheck2"
                    >Remember me</label>
                  </div>
                  <a
                    href="#!"
                    class="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 dark:text-white dark:hover:text-orange-700 dark:focus:text-blue-700 dark:active:text-orange-800 duration-200 transition ease-in-out"
                  >Forgot password?</a>
                </div>
                <button
                  type="submit"
                  value="login"
                  class="inline-block px-7 py-3 bg-blue-600 text-white dark:bg-orange-600 dark:text-black font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 dark:hover:bg-orange-700 hover:shadow-lg focus:bg-blue-700 dark:focus:bg-orange-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >Valider</button>

                <!-- <div
            class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
          >
            <p class="text-center font-semibold mx-4 mb-0">OR</p>
          </div>

          <a
            class="px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
            style="background-color: #3b5998"
            href="#!"
            role="button"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
          >
            Continue with Facebook
          </a>
          <a
            class="px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center"
            style="background-color: #55acee"
            href="#!"
            role="button"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
          >
           Continue with Twitter
                </a>-->
              </form>
            </TabPanel>
            <TabPanel>
              <nouveau />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  </div>
</section>
</template>