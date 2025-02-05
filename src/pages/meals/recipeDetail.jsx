import axios from 'axios'
import { useEffect, useState } from 'react'
import IngredientsList from './ingredientsList'
import InstructionsList from './instructions'
import { Link, useNavigate, useParams } from 'react-router-dom'
import NutritionalInfo from '../nut'
import Fav from '../../assets/icons/heart.png'
import unFav from '../../assets/icons/emptyheart.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import staticPhoto from '../../assets/images/healthy.jpeg'
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
  const editRecipe = id => {
    navigate(`/recipe/edit/${id}`)
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
      <Link className='back-button' to='/my-recipes'>
        <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '8px' }} />
        Back
      </Link>
      <div className='action-buttons'>
        {' '}
        <FontAwesomeIcon
          icon={faEdit}
          className='edit'
          title='Edit'
          onClick={() => editRecipe(recipeId)}
        />
        <FontAwesomeIcon
          icon={faTrash}
          className='delete'
          onClick={deleteRecipe}
          style={{ cursor: 'pointer' }}
          title='Delete'
        />
      </div>

      <p className='rate'>
        <strong>Rating:</strong> {recipe.rate} ⭐
      </p>
      <div className='recipe-container'>
        <div className='summary'>
          <div className='image-border'>
            <img
              src={
                recipe.photos ? recipe.photos && recipe.photos[0] : staticPhoto
              }
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
          </div>
        </div>

        <div className='detail'>
          <IngredientsList ingredients={recipe.ingredients} />

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
