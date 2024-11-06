import axios from 'axios'
import { useEffect, useState } from 'react'
import { Base_URL } from '../config/api'
import { Link, useNavigate, useParams } from 'react-router-dom'
// import Loader from "../components/Loader";
import Fav from '../assets/icons/heart.png'
import unFav from '../assets/icons/emptyheart.png'
const RecipeDetail = () => {
  const [recipe, setRecipe] = useState(null)
  const { recipeId } = useParams()
  const navigate = useNavigate()

  const getRecipe = () => {
    axios
      .get(`${Base_URL}/recipes/${recipeId}.json`)
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
      .delete(`${Base_URL}/recipes/${recipeId}.json`)
      .then(response => {
        navigate('/recipes')
      })
      .catch(error => console.log('Error deleting recipe...', error))
  }
  const toggleFavorite = () => {
    axios
      .patch(`${Base_URL}/recipes/${recipeId}.json`, {
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
      <Link to={`/recipe/edit/${recipeId}`}>
        <button>Edit</button>
      </Link>
      <button onClick={deleteRecipe}>Delete</button>

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
              <h3>Nutritional Information:</h3>
              <p>Calories: {recipe.nutritionalInformation.calories}</p>
              <p>
                Carbohydrates: {recipe.nutritionalInformation.carbohydrates}
              </p>
              <p>Fat: {recipe.nutritionalInformation.fat}</p>
              <p>Protein: {recipe.nutritionalInformation.protein}</p>
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
          <div className='ingredient'>
            <h3>Ingredients:</h3>
            <ul>
              {recipe.ingredients &&
                recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
            </ul>
          </div>
          <div className='instruction'>
            {' '}
            <h3>Instructions:</h3>
            <ol>
              {recipe.instructions &&
                recipe.instructions.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
            </ol>
            <p>
              <strong>Note:</strong> {recipe.recipeNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeDetail
