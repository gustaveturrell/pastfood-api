import Axios from "./caller_service";

let getAllRecipes = () => {
    return Axios.get('pastfood/v1/recipes/')
}

let getRecipes = (cid) => {
    return Axios.get('pastfood/v1/recipes/'+cid)
}

export const recipeService = {
    getAllRecipes,
    getRecipes,
}