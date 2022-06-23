import Axios from './caller_service'

let Sign = ()=>{
    return Axios.post('pastfood/v1/users/signup/')
}

let login = (credentials) => {
    return Axios.post('pastfood/v1/users/login/', credentials)
}

let logout = () => {
    localStorage.removeItem('token')
}

let getToken = () => {
    return localStorage.getItem('token')
}

let saveToken = (token) => {
    localStorage.setItem('token', token)
}

let isLogged = () => {
    let token = localStorage.getItem('token')
    return !!token
}

export const accountService = {
    login,
    logout,
    saveToken,
    getToken,
    isLogged,
    Sign,
}