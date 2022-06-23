import {axios} from 'axios'

const url='http://localhost:8000/pastfood/v1/recipes';

class RecipeService{
    static getRecipes(){
        return new Promise(async(resolve, reject)=>{
            try{
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data.map(recipe =>({
                        ...recipe,
                        createdAt: new Date(recipe.createdAt)
                    }))
                );
            } catch(err){
                reject(err);

            }
        })
    }
}

export default RecipeService;