import Axios from './caller_service'

let getMe = (credentials)=>{
    return Axios.get('pastfood/v1/users/me/',credentials)
}

/*
* * Pour admin
*/
let getAllUsers = () => {
    return Axios.get('/users')
}

let getUser = (uid) => {
    return Axios.get('/users/'+uid)
}

let updateUser = (user) => {
    return Axios.patch('/users/'+user.id, user)
}

let createUser = (user) => {
    return Axios.put('/users', user)
}

let deleteUser = (uid) => {
    return Axios.delete('/users/'+uid)
}


export const userService = {
    getMe,
    getAllUsers,
    getUser,
    updateUser,
    createUser,
    deleteUser
}