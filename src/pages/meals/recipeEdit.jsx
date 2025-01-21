import axios from 'axios'
import { useEffect, useState } from 'react'
import InputField from '../../components/common/inputField'
import TagsSection from '../../components/common/tagSection'
import NutritionalInfo from '../../components/common/nutritionInfo'
import IngredientsSection from '../../components/ingredients'
import InstructionsSection from '../../components/common/instructions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import CountrySelect from '../countriesselect'

import { faStar } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useParams } from 'react-router-dom'

const RecipeEdit = () => {
  const [recipe, setRecipe] = useState({
    name: '',
    description: '',
    recipeNote: '',
    tags: [],
    photos: [],
    rate: '',
    time: '',
    nutritionalInformation: {
      calories: '',
      protein: '',
      fat: '',
      carbohydrates: ''
    },
    ingredients: [],
    instructions: []
  })
  const [waitingForImageUrl, setWaitingForImageUrl] = useState(false)
  const [removedPhotos, setRemovedPhotos] = useState([])
  const [ingredient, setIngredient] = useState('')
  const [instruction, setInstruction] = useState('')

  const { recipeId } = useParams()
  const navigate = useNavigate()

  const getRecipe = () => {
    axios
      .get(`${import.meta.env.VITE_COOK_LAND_API}/recipes/${recipeId}.json`)
      .then(res => {
        const data = res.data
        if (data) {
          setRecipe({ ...data, photos: data.photos ? data.photos : [] })
        } else {
          console.error('Recipe not found')
          navigate('/404')
        }
      })
      .catch(e => console.error('Error fetching recipe:', e))
  }
  const handleImageUpload = e => {
    e.preventDefault()
    const file = e.target.files[0]
    if (!file) return

    setWaitingForImageUrl(true)

    const formData = new FormData()
    formData.append('file', file)
    formData.append(
      'upload_preset',
      import.meta.env.VITE_UNSIGNED_UPLOAD_PRESET
    )

    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_CLOUDINARY_NAME
    }/upload`

    axios
      .post(cloudinaryUrl, formData)
      .then(response => {
        const imageUrl = response.data.secure_url
        setRecipe(prev => ({
          ...prev,
          photos: [...prev.photos, imageUrl]
        }))
        setWaitingForImageUrl(false)
      })
      .catch(error => {
        console.error('Image upload failed:', error)
        setWaitingForImageUrl(false)
      })
  }

  useEffect(() => {
    getRecipe()
  }, [recipeId])

  const handleChange = (e, field = null) => {
    const { name, value } = e.target
    setRecipe(prev =>
      field
        ? { ...prev, [field]: { ...prev[field], [name]: value } }
        : { ...prev, [name]: value }
    )
  }

  const handleAddIngredient = () => {
    if (ingredient.trim()) {
      setRecipe(prev => ({
        ...prev,

        ingredients: [...(prev.ingredients || []), ingredient]
      }))
      setIngredient('')
    }
  }

  const handleTagClick = tag => {
    setRecipe(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }))
  }

  const handleAddInstruction = () => {
    if (instruction.trim()) {
      setRecipe(prev => ({
        ...prev,
        instructions: [...(prev.instructions || []), instruction]
      }))
      setInstruction('')
    }
  }

  const handleDeleteItem = (field, index) => {
    setRecipe(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      await Promise.all(
        removedPhotos.map(photo =>
          axios.delete(`${import.meta.env.VITE_COOK_LAND_API}/deleteImage`, {
            data: { url: photo }
          })
        )
      )

      await axios.put(
        `${import.meta.env.VITE_COOK_LAND_API}/recipes/${recipeId}.json`,
        recipe
      )
      navigate(`/recipe/${recipeId}`)
    } catch (error) {
      console.error('Error updating recipe or deleting images:', error)
    }
  }
  const setIngredients = newIngredients => {
    setRecipe(prev => ({
      ...prev,
      ingredients: newIngredients
    }))
  }
  const setInstructions = newInstructions => {
    setRecipe(prev => ({
      ...prev,
      instructions: newInstructions
    }))
  }
  if (!recipe) {
    return <p>Loading recipe data...</p>
  }
  const handleCountryChange = selectedOption => {
    setRecipe(prev => ({
      ...prev,
      country: selectedOption
    }))
  }
  const handleStarClick = value => {
    setRating(value)
    handleChange({ target: { name: 'rate', value } })
  }
  const handleRemoveImage = index => {
    setRecipe(prev => {
      const updatedPhotos = [...prev.photos]
      const [removedImage] = updatedPhotos.splice(index, 1) // Remove the image from photos array
      setRemovedPhotos(prevRemoved => [...prevRemoved, removedImage]) // Track for potential backend deletion
      return { ...prev, photos: updatedPhotos }
    })
  }

  return (
    <div id='recipe-form'>
      <h2>Edit Recipe</h2>
      <div
        className='back-button'
        onClick={() => navigate(-1)}
        style={{ marginLeft: 'auto', marginRight: '60px' }}
      >
        <FontAwesomeIcon icon={faTimes} style={{ marginRight: '8px' }} />
        Cancel
      </div>
      <form onSubmit={handleSubmit}>
        <div className='form-container'>
          <div className='left-side'>
            <InputField className='inputField largeInput' label='Name'>
              <input
                name='name'
                value={recipe.name}
                onChange={handleChange}
                placeholder='Recipe Name'
              />
            </InputField>

            <InputField className='inputField largeInput' label='Description'>
              <input
                name='description'
                value={recipe.description}
                onChange={handleChange}
                placeholder='Recipe Description'
              />
            </InputField>

            <InputField className='inputField largeInput' label='Recipe Note'>
              <input
                name='recipeNote'
                value={recipe.recipeNote}
                onChange={handleChange}
                placeholder='Recipe Note'
              />
            </InputField>
            <CountrySelect
              selectedCountry={recipe.country}
              onCountryChange={handleCountryChange}
            />
            <TagsSection
              selectedTags={recipe.tags}
              onTagClick={handleTagClick}
            />

            <InputField className='inputField largeInput' label='Upload Photo'>
              <input
                type='file'
                accept='image/*'
                onChange={handleImageUpload}
                id='hiddenFileInput'
                style={{ display: 'none' }}
              />
              <button
                type='button'
                onClick={e =>
                  document.getElementById('hiddenFileInput').click()
                }
                className='customButtonStyle'
                disabled={waitingForImageUrl}
              >
                {waitingForImageUrl ? 'Uploading...' : 'Upload Image'}
              </button>
            </InputField>
            {recipe.photos && recipe.photos.length > 0 && (
              <div>
                <h4>Uploaded Images</h4>
                {recipe.photos.map((photo, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'inline-block',
                      position: 'relative',
                      margin: '5px'
                    }}
                  >
                    <img
                      src={photo}
                      alt={`Uploaded ${index}`}
                      style={{ width: '100px' }}
                    />
                    <button
                      onClick={() => handleRemoveImage(index)}
                      style={{
                        position: 'absolute',
                        top: '5px',
                        right: '5px'
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className='rating-area'>
              <label>Rating</label>
              <div className='starRating'>
                {[1, 2, 3, 4, 5].map(star => (
                  <FontAwesomeIcon
                    key={star}
                    icon={faStar}
                    onClick={() => handleStarClick(star)}
                    style={{
                      cursor: 'pointer',
                      color: star <= recipe.rate ? '#f5c518' : '#dcdcdc',
                      fontSize: '24px',
                      marginRight: '5px'
                    }}
                  />
                ))}
              </div>
            </div>

            <InputField className='inputField largeInput' label='Time'>
              <input
                name='time'
                value={recipe.time}
                onChange={handleChange}
                placeholder='Cooking Time'
                type='number'
              />
            </InputField>

            <NutritionalInfo
              data={recipe.nutritionalInformation}
              onChange={e => handleChange(e, 'nutritionalInformation')}
            />
          </div>
          <div className='right-side'>
            <IngredientsSection
              ingredients={recipe.ingredients}
              ingredient={ingredient}
              onAdd={handleAddIngredient}
              onDelete={index => handleDeleteItem('ingredients', index)}
              setIngredient={setIngredient}
              setIngredients={setIngredients}
            />

            <InstructionsSection
              instructions={recipe.instructions}
              instruction={instruction}
              onAdd={handleAddInstruction}
              onDelete={index => handleDeleteItem('instructions', index)}
              setInstruction={setInstruction}
              setInstructions={setInstructions}
            />
          </div>
        </div>
        <button type='submit' className='submit-btn'>
          Update Recipe
        </button>
      </form>
    </div>
  )
}

export default RecipeEdit
