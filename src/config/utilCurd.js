import axios from 'axios'

const getRecipes = () => {
  return axios
    .get(`${import.meta.env.VITE_COOK_LAND_API}/recipes.json`)
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
    .get(`${import.meta.env.VITE_COOK_LAND_API}/fav.json`)
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

const getWeekPlan = () => {
  return axios
    .get(`${import.meta.env.VITE_COOK_LAND_API}/mealplanner.json`)
    .then(res => {
      const data = res.data
      console.log(data)
      const planner = Object.keys(data).map(id => ({
        id,
        ...data[id]
      }))
      return planner
    })
    .catch(e => {
      console.log('The get api has error', e)
      return []
    })
}

export { getRecipes, getFavRecipes, getWeekPlan }

// Default export
export default { getRecipes, getFavRecipes, getWeekPlan }
