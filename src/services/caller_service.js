import axios from 'axios'
import { accountService } from './account_service'

const Axios = axios.create({
    baseURL: `${import.meta.env.VITE_APP_API_URL}`
})


/**
 * Interceptor pour injection token
 */
 Axios.interceptors.request.use(request => {
    
    //  ajoute le token dans l'entête
    if(accountService.isLogged()){
        request.headers.Authorization = 'Bearer '+ accountService.getToken()
    }
  
    return request
})

/**
 * Interceptor des réponses de l'API
 */
 Axios.interceptors.response.use(response => {
    return response
}, error => {

   
    console.log(error)
    

    if(!error.response){
        store.commit('displayNotif', {d: true, mes: error})
        return Promise.reject(error)
    }else{
        if(error.response.status == 401){
            accountService.logout()
            router.push('/')
        }else{
            // Erreur de l'API
            store.commit('displayNotif', {d: true, mes: error.response.data.message})
            return Promise.reject(error)
        }
    }
})

export default Axios