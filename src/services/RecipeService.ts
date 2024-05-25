import axios from 'axios'
import { CategoriesAPIResponseSchema, DrinksAPIResponse, RecipeAPIResponseSchema } from '../utils/recipes-schema'
import { Drink, SearchFilter } from '../types'



const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error('VITE_API_BASE_URL no está definida');
}


export async function getCategories() {
    const url = `${API_BASE_URL}list.php?c=list`;
    const { data } = await axios(url)
    const result = CategoriesAPIResponseSchema.safeParse(data)
    if(result.success) {
        return result.data
    }
}

export async function getRecipes(filters: SearchFilter) {
    const url = `${API_BASE_URL}filter.php?c=${filters.category}&i=${filters.ingredient}`;
    const { data } = await axios(url)
    const result = DrinksAPIResponse.safeParse(data)
    if(result.success){
        return result.data
    }
}

export async function getRecipeById(id: Drink['idDrink']) {
    const url = `${API_BASE_URL}lookup.php?i=${id}`;
    const { data } = await axios(url)
    const result = RecipeAPIResponseSchema.safeParse(data.drinks[0])
    if(result.success) {
        return result.data
    }
}