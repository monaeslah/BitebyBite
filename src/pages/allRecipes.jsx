import { useEffect, useState } from 'react'
import Card from './card'
import { getRecipes } from '../config/utilCurd'
import girlChef from '../assets/icons/Ratatouille.jpeg'
import SearchBar from '../components/searchBar'

const AllRecipes = () => {
  const [cards, setCards] = useState([])

  const [query, setQuery] = useState('')

  useEffect(() => {
    getRecipes().then(fetchedRecipes => {
      setCards(fetchedRecipes)
    })
  }, [])
  const isFavouritesRoute = location.pathname === '/favourites'
  console.log(isFavouritesRoute, 'route?')
  // Filter recipes based on query and route
  const filteredRecipes = cards.filter(recipe => {
    const matchesQuery = recipe.name.toLowerCase().includes(query.toLowerCase())
    const matchesFavourite = isFavouritesRoute ? recipe.fav === true : true
    return matchesQuery && matchesFavourite
  })
  // const filteredList = cards.filter(recipe => {
  //   if (calorieFilter === 'low') return recipe.calories < 200
  //   if (calorieFilter === 'medium')
  //     return recipe.calories >= 200 && recipe.calories <= 400
  //   if (calorieFilter === 'high') return recipe.calories > 400
  //   return true
  // })

  return (
    <div id='recipes-container'>
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
      <div className='content-countainer'>
        <div className='recipe-area'>
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map(recipe => (
              <Card
                key={recipe.id}
                imgSrc={recipe.photos}
                imgAlt={`Image of ${recipe.title}`}
                title={recipe.name}
                id={recipe.id}
                fav={recipe.fav}
              />
            ))
          ) : (
            <p>No recipes match this calorie range.</p>
          )}
        </div>
        <img src={girlChef} alt='chef' />
      </div>
    </div>
  )
}

export default AllRecipes
