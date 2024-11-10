import axios from 'axios'
import { useEffect, useState } from 'react'
import IngredientsList from './ingredientsList'
import InstructionsList from './instructions'
import { Link, useNavigate, useParams } from 'react-router-dom'
import NutritionalInfo from './nut'
import Fav from '../assets/icons/heart.png'
import unFav from '../assets/icons/emptyheart.png'
const RecipeDetail = () => {
  const [recipe, setRecipe] = useState(null)
  const { recipeId } = useParams()
  const navigate = useNavigate()

  const getRecipe = () => {
    axios
      .get(`${import.meta.env.VITE_COOK_LAND_API}/recipes/${recipeId}.json`)
      .then(res => {
        const data = res.data
        if (data) {
          setRecipe(data)
        } else {
          console.error('Recipe not found')
          navigate('/404')
        }
      })
      .catch(e => {
        console.log('The get api has error', e)
      })
  }

  const deleteRecipe = () => {
    axios
      .delete(`${import.meta.env.VITE_COOK_LAND_API}/recipes/${recipeId}.json`)
      .then(response => {
        navigate('/my-recipes')
      })
      .catch(error => console.log('Error deleting recipe...', error))
  }
  const toggleFavorite = () => {
    axios
      .patch(`${import.meta.env.VITE_COOK_LAND_API}/recipes/${recipeId}.json`, {
        fav: !recipe.fav
      })
      .then(response => {
        setRecipe(prevRecipe => ({
          ...prevRecipe,
          fav: !prevRecipe.fav
        }))
      })
      .catch(error => console.log('Error updating favorite status...', error))
  }
  useEffect(() => {
    getRecipe()
  }, [])

  if (!recipe) {
    return <p>Loading recipe...</p>
  }

  return (
    <div id='recipe-detail'>
      <div className='action-buttons'>
        <Link to={`/recipe/edit/${recipeId}`} className='edit'>
          <button>Edit</button>
        </Link>
        <button className='delete' onClick={deleteRecipe}>
          Delete
        </button>
      </div>

      <p className='rate'>
        <strong>Rating:</strong> {recipe.rate} ⭐
      </p>
      <div className='recipe-container'>
        <div className='summery'>
          <div className='image-border'>
            <img
              src={recipe.photos && recipe.photos[0]}
              alt={`Image of ${recipe.name}`}
              className='recipe-image'
            />
            <div className='fav-icon' onClick={toggleFavorite}>
              {' '}
              {recipe.fav ? <img src={Fav} /> : <img src={unFav} />}
            </div>
          </div>
          <div className='words'>
            {' '}
            <h1>{recipe.name}</h1>
            <div className='nut-info'>
              <NutritionalInfo
                nutritionalInfo={recipe.nutritionalInformation}
              />
            </div>
            <p>
              {' '}
              <strong>Time:</strong> {recipe.time}
            </p>
            <h3>Tags:</h3>
            <ul className='tags-list'>
              {recipe.tags &&
                recipe.tags.map((tag, index) => <li key={index}>{tag}</li>)}
            </ul>
            <p>
              <strong>Description:</strong> {recipe.description}
            </p>
          </div>
        </div>

        <div className='detail'>
          <IngredientsList ingredients={recipe.ingredients} />

          {/* پاس دادن لیست دستور پخت به InstructionsList */}
          <InstructionsList instructions={recipe.instructions} />
        </div>
        <p>
          <strong>Note:</strong> {recipe.recipeNote}
        </p>
      </div>
    </div>
  )
}

export default RecipeDetail
