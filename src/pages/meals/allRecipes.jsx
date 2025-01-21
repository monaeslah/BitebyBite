import { useEffect, useState } from 'react'
import Card from './card'
import { getRecipes } from '../../config/utilCurd'

import SearchBar from '../../components/searchBar'

const AllRecipes = () => {
  const [cards, setCards] = useState([])

  const [query, setQuery] = useState('')

  useEffect(() => {
    getRecipes().then(fetchedRecipes => {
      setCards(fetchedRecipes)
    })
  }, [])
  const isFavouritesRoute = location.pathname === '/favourites'

  const filteredRecipes = cards.filter(recipe => {
    const matchesQuery = recipe.name.toLowerCase().includes(query.toLowerCase())
    const matchesFavourite = isFavouritesRoute ? recipe.fav === true : true
    return matchesQuery && matchesFavourite
  })

  return (
    <div id='recipes-container'>
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
      </div>
    </div>
  )
}

export default AllRecipes
