import axios from 'axios'
import { useEffect, useState } from 'react'
import Card from './card'
import { Base_URL } from '../config/api'
import { Link } from 'react-router-dom'
import SearchBar from '../components/searchBar'
const AllRecipes = () => {
  const [cards, setCards] = useState([])
  const [query, setQuery] = useState('')
  const getRecipes = () => {
    axios
      .get(`${Base_URL}/recipes.json`)
      .then(res => {
        const data = res.data

        const recipes = Object.keys(data).map(id => ({
          id,
          ...data[id]
        }))
        setCards(recipes)
        console.log(data)
      })
      .catch(e => {
        console.log('The get api has error', e)
      })
  }
  useEffect(() => {
    getRecipes()
  }, [])
  const filteredRecipes = cards.filter(recipe =>
    recipe.name.toLowerCase().includes(query.toLowerCase())
  )
  // const filteredList = cards.filter(recipe => {
  //   if (calorieFilter === 'low') return recipe.calories < 200
  //   if (calorieFilter === 'medium')
  //     return recipe.calories >= 200 && recipe.calories <= 400
  //   if (calorieFilter === 'high') return recipe.calories > 400
  //   return true
  // })

  return (
    <div>
      {/* <div className='filter-controls'>
        <select
          value={calorieFilter}
          onChange={e => setCalorieFilter(e.target.value)}
        >
          <option value='all'>Filter by Calories:</option>
          <option value='low'>Low Calories (&lt; 200)</option>
          <option value='medium'>Medium Calories (200-400)</option>
          <option value='high'>High Calories (&gt; 400)</option>
        </select>
      </div> */}
      <SearchBar query={query} setQuery={setQuery} />
      <div className='card-container'>
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map(recipe => (
            <Link to={`/recipe/${recipe.id}`} key={recipe.id}>
              <Card
                imgSrc={recipe.photos}
                imgAlt={`Image of ${recipe.title}`}
                title={recipe.name}
                id={recipe.id}
              />
            </Link>
          ))
        ) : (
          <p>No recipes match this calorie range.</p>
        )}
      </div>
    </div>
  )
}

export default AllRecipes
