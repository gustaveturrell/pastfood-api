
<script>
import axios from 'axios'
import useVueValidate from '@vuelidate/core'
import {required} from "@vuelidate/validators"
import { reactive } from 'vue';


// const data = reactive({
//         nameC :'',
//         emailC : '',
//         passwordC :'',
//         passwordConfirmC :'',
// })

// const onSubmit = async()=>{
//   const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}pastfood/v1/users/signup/`,{
//         name: this.nameC,
//         email: this.emailC,
//         password: this.passwordC,
//         passwordConfirm: this.passwordConfirmC,
//       });
//       console.log(response);
//       this.$router.push('/Register');
//       }  
// }

export default {
  data() {
    return {
        name :'',
        email : '',
        password :'',
        passwordConfirm :'',
        errors:[]
       
    } 
  },
  methods: {
    async onSubmit(){
      this.errors = []
       if (this.name == ''){
        this.errors.push('doit contenir un nom')
      }
      if (this.email == ''){
        this.errors.push('doit contenir un email valide')
      }
      // if (this.password == ''){
      //   this.errors.push('doit contenir un email valide')
      // }
      if (this.password.length < 8){
        this.errors.push('mot de passe doit avoir 8 caractères')
      }
      if (this.password != this.passwordConfirm){
        this.errors.push('mot de passe ne correspond pas')
      }
      if(this.errors.length == 0){
      const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}pastfood/v1/users/signup/`,{
        name: this.name,
        email: this.email,
        password: this.password,
        passwordConfirm: this.passwordConfirm,
      });
      console.log(response);
     await this.$router.push('/Register');
      }    
    }
  }
}

</script>

<!-- <script setup lang="ts">
import axios from 'axios';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const data = reactive({
  nameC :'',
  emailC : '',
  passwordC :'',
  passwordConfirmC :'',
});

const router = useRouter();

const onSubmit= async()=>{
      const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}pastfood/v1/users/signup/`,{
        body: data,
      });
      console.log(response);
      console.log(data);
      await router.push('/Register');
      }   
</script> -->

<template>
  <form @submit.prevent="onSubmit">
  <div class="grid grid-cols gap-4">
        <div class="form-group mb-6">
          <input required type="text" class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none invalid:border-pink-600 invalid:text-pink-600 dark:invalid:border-red-900 dark:invalid:text-red-900 dark:border-2" id="name"
            placeholder="name" v-model="name" >
        </div>
      </div>
            <div class="mb-6">
              <div class></div>
              <input
                id="email-address" name="email" type="email" autocomplete="email" required
                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none invalid:border-pink-600 invalid:text-pink-600 dark:invalid:border-red-900 dark:invalid:text-red-900 dark:border-2"
                placeholder="ex: prout@gmail.com" v-model="email" 
              />
            </div>
            <div class="mb-6">
              <input
                id="password" name="password" type="password" autocomplete="current-password" required
                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none invalid:border-pink-600 invalid:text-pink-600 dark:invalid:border-red-900 dark:invalid:text-red-900 dark:border-2"
                placeholder="mot de passe" v-model="password" 
              />
            </div>
            <div class="mb-6">
              <input
                id="passwordd" name="passwordd" type="password" autocomplete="current-password" required
                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none invalid:border-pink-600 invalid:text-pink-600 dark:invalid:border-red-900 dark:invalid:text-red-900 dark:border-2"
                placeholder="confirmer mot de passe" v-model="passwordConfirm" 
              />
            </div>
            <button
              type="submit" value="login"
              class="inline-block mb-4 px-7 py-3 bg-blue-600 text-white dark:bg-orange-600 dark:text-black font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 dark:hover:bg-orange-700 hover:shadow-lg focus:bg-blue-700 dark:focus:bg-orange-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light" 
            >
              Valider
            </button>
    </form>
    <div v-if="errors.length" class="inline-block px-7 py-3 bg-blue-600 text-white dark:bg-orange-600 dark:text-black font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 dark:hover:bg-orange-700 hover:shadow-lg focus:bg-blue-700 dark:focus:bg-orange-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full">
      <p>
            <h1>Erreurs</h1>
            <ul>
                <li v-for="error in errors">{{error}}</li>
            </ul>
        </p>
    </div>
</template>

