import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getRecipes } from '../../config/utilCurd'

const TagPage = () => {
  const { tag } = useParams()
  const [filteredRecipes, setFilteredRecipes] = useState([])
  console.log(tag)
  useEffect(() => {
    const fetchFilteredRecipes = async () => {
      try {
        const recipes = await getRecipes()
        console.log('1', recipes)
        const taggedRecipes = recipes.filter(recipe =>
          recipe.tags.includes(tag)
        )
        setFilteredRecipes(taggedRecipes)
        console.log('2', taggedRecipes)
      } catch (error) {
        console.error('Error fetching filtered recipes:', error)
      }
    }

    fetchFilteredRecipes()
  }, [tag])

  return (
    <div className='tag-page'>
      <h2>Recipes tagged with "{tag}"</h2>
      {filteredRecipes.length > 0 ? (
        filteredRecipes.map((recipe, index) => (
          <div key={index} className='recipe-card'>
            <img
              src={recipe.photos[0]}
              alt={recipe.name}
              className='recipe-image'
            />
            <h3>{recipe.name}</h3>
            <p>{recipe.description}</p>
          </div>
        ))
      ) : (
        <p>No recipes found for this tag.</p>
      )}
    </div>
  )
}

export default TagPage
