import { useState } from 'react'
import axios from 'axios'
import { Base_URL } from '../config/api'
import InputField from '../components/common/InputField'
import TagsSection from '../components/common/tagSection'
import NutritionalInfo from '../components/common/nutritionInfo'
import IngredientsSection from '../components/ingredients'
import InstructionsSection from '../components/common/instructions'
import { useNavigate } from 'react-router-dom'

const AddRecipe = () => {
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
  const [ingredient, setIngredient] = useState('')
  const navigate = useNavigate()

  const handleChange = (e, field = null) => {
    const { name, value } = e.target
    setRecipe(prev =>
      field
        ? { ...prev, [field]: { ...prev[field], [name]: value } }
        : { ...prev, [name]: value }
    )
  }

  const handleArrayChange = (e, field) => {
    const arrayData = e.target.value
      .split(',')
      .map(item => item.trim())
      .filter(Boolean)
    setRecipe(prev => ({ ...prev, [field]: arrayData }))
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

  const handleAddInstruction = instruction => {
    setRecipe(prev => ({
      ...prev,
      instructions: [...prev.instructions, instruction]
    }))
  }

  const handleDeleteItem = (field, index) => {
    setRecipe(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log('Recipe JSON:', JSON.stringify(recipe, null, 2))

    axios
      .post(`${Base_URL}/recipes.json`, recipe)
      .then(() => {
        navigate('/')
      })
      .catch(e => {
        console.log('The API has an error', e)
      })
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

            <InputField className='inputField largeInput' label='Photo URL'>
              <input
                name='photos'
                value={recipe.photos.join(', ')}
                onChange={e => handleArrayChange(e, 'photos')}
                placeholder='Photo URL (comma separated for multiple URLs)'
              />
            </InputField>

            <InputField className='inputField largeInput' label='Rating'>
              <input
                name='rate'
                value={recipe.rate}
                onChange={handleChange}
                placeholder='Recipe Rating'
                type='number'
              />
            </InputField>

            <InputField className='inputField largeInput' label='Time'>
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
              onAdd={handleAddInstruction}
              onDelete={index => handleDeleteItem('instructions', index)}
            />
          </div>
        </div>

        <button type='submit' className='submit-btn'>
          Create Recipe
        </button>
      </form>
    </div>
  )
}

export default AddRecipe
