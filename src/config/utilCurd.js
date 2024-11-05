import { Base_URL } from './api'
import axios from 'axios'

const getRecipes = () => {
  return axios
    .get(`${Base_URL}/recipes.json`)
    .then(res => {
      const data = res.data
      const recipes = Object.keys(data).map(id => ({
        id,
        ...data[id]
      }))
      return recipes
    })
    .catch(e => {
      console.log('The get api has error', e)
      return []
    })
}

const getFavRecipes = () => {
  return axios
    .get(`${Base_URL}/fav.json`)
    .then(res => {
      const data = res.data
      const recipes = Object.keys(data).map(id => ({
        id,
        ...data[id]
      }))
      return recipes
    })
    .catch(e => {
      console.log('The get api has error', e)
      return []
    })
}

export { getRecipes, getFavRecipes }

// Default export
export default { getRecipes, getFavRecipes }
