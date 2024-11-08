import { useState } from 'react'
import axios from 'axios'

import InputField from '../components/common/inputField'
import TagsSection from '../components/common/tagSection'
import NutritionalInfo from '../components/common/nutritionInfo'
import IngredientsSection from '../components/ingredients'
import InstructionsSection from '../components/common/instructions'
import { useNavigate } from 'react-router-dom'
import { CookButton } from '../components/common/buttons'
import mouse from '../assets/icons/recipead.jpeg'
const AddRecipe = ({ onClose }) => {
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

  const [ingredient, setIngredient] = useState('')
  const [instruction, setInstruction] = useState('')
  const navigate = useNavigate()

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
        ingredients: [...prev.ingredients, ingredient]
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
  const handleAddInstruction = () => {
    if (instruction.trim()) {
      setRecipe(prev => ({
        ...prev,
        instructions: [...prev.instructions, instruction]
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
  const handleSubmit = e => {
    e.preventDefault()

    axios
      .post(`${import.meta.env.VITE_COOK_LAND_API}/recipes.json`, recipe)
      .then(() => {
        onClose()
        navigate('/my-recipes')
      })
      .catch(e => {
        console.log('The API has an error', e)
      })
  }
  const triggerFileInput = e => {
    e.preventDefault()
    document.getElementById('hiddenFileInput').click()
  }
  return (
    <div id='recipe-form'>
      <h2>Create Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-container'>
          <div className='left-side'>
            <InputField className='inputField largeInput' label='Name'>
              <input
                type='text'
                name='name'
                value={recipe.name}
                onChange={handleChange}
                placeholder='Recipe Name'
              />
            </InputField>

            <InputField
              className='inputField textareaContainer largeInput'
              label='Description'
            >
              <textarea
                name='description'
                value={recipe.description}
                onChange={handleChange}
                placeholder='Recipe Description'
              />
            </InputField>

            <InputField
              className='inputField textareaContainer largeInput'
              label='Recipe Note'
            >
              <textarea
                name='recipeNote'
                value={recipe.recipeNote}
                onChange={handleChange}
                placeholder='Recipe Note'
              />
            </InputField>

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
                onClick={triggerFileInput}
                className='customButtonStyle'
                disabled={waitingForImageUrl}
              >
                {waitingForImageUrl ? 'Uploading...' : 'Upload Image'}
              </button>
            </InputField>
            {recipe.photos.length > 0 && (
              <div>
                <h4>Uploaded Images</h4>
                {recipe.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Uploaded ${index}`}
                    style={{ width: '100px', margin: '5px' }}
                  />
                ))}
              </div>
            )}

            <InputField className='inputField smallInput' label='Rating'>
              <input
                name='rate'
                value={recipe.rate}
                onChange={handleChange}
                placeholder='Recipe Rating'
                type='number'
              />
            </InputField>

            <InputField className='inputField smallInput' label='Time'>
              <input
                name='time'
                value={recipe.time}
                onChange={handleChange}
                placeholder='Cooking Time'
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
            <div className='mouse-image'>
              <img src={mouse} alt='' />
            </div>
          </div>
        </div>

        <CookButton
          size='xlarge'
          className='submit-btn'
          enable={!waitingForImageUrl}
          onClick={handleSubmit}
          label={waitingForImageUrl ? 'Uploading...' : 'Create Recipe'}
        />
      </form>
    </div>
  )
}

export default AddRecipe
