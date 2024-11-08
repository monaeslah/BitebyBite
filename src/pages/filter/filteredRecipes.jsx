import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getRecipes } from '../../config/utilCurd'
import { Link } from 'react-router-dom'

const TagPage = () => {
  const { tag } = useParams()
  const [filteredRecipes, setFilteredRecipes] = useState([])

  useEffect(() => {
    const fetchFilteredRecipes = async () => {
      try {
        const recipes = await getRecipes()
        const taggedRecipes = recipes.filter(recipe =>
          recipe.tags.includes(tag)
        )
        setFilteredRecipes(taggedRecipes)
      } catch (error) {
        console.error('Error fetching filtered recipes:', error)
      }
    }

    fetchFilteredRecipes()
  }, [tag])

  return (
    <div className='tag-page'>
      <h2>Recipes tagged with {tag}</h2>
      {filteredRecipes.length > 0 ? (
        <div className='recipe-cards'>
          {filteredRecipes.map((recipe, index) => (
            <Link
              to={`/recipe/${recipe.id}`}
              key={index}
              className='recipe-card'
            >
              <img
                src={recipe.photos[0]}
                alt={recipe.name}
                className='recipe-card__image'
              />
              <div className='recipe-card__content'>
                <h3 className='recipe-card__title'>{recipe.name}</h3>
                <div className='recipe-card__tags'>
                  {recipe.tags.map((tag, idx) => (
                    <span key={idx} className='recipe-card__tag'>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>No recipes found for this tag.</p>
      )}
    </div>
  )
}

export default TagPage
