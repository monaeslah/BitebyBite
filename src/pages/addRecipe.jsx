import { useState } from 'react'
import axios from 'axios'
import { Base_URL } from '../config/api'
import InputField from '../components/common/InputField'
import TextareaField from '../components/common/textField'
import TagsSection from '../components/common/tagSection'
import NutritionalInfo from '../components/common/nutritionInfo'
import IngredientsSection from '../components/ingredients'
import InstructionsSection from '../components/instructions'
import { useNavigate } from 'react-router-dom'

const AddRecipe = () => {
  const predefinedTags = [
    'breakfast',
    'lunch',
    'dinner',
    'sweet',
    'savory',
    'snack',
    'healthy',
    'quick',
    'vegetarian',
    'pancakes'
  ]

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
    // const newRecipe = JSON.stringify(recipe, null, 2)

    axios
      .post(`${Base_URL}/recipes.json`, recipe)
      .then(res => {
        navigate('/')
      })
      .catch(e => {
        console.log('The get api has error', e)
      })
  }

  return (
    <div className='recipe-form'>
      <h2>Create Recipe</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          label='Name'
          name='name'
          value={recipe.name}
          onChange={handleChange}
          placeholder='Recipe Name'
        />
        <TextareaField
          label='Description'
          name='description'
          value={recipe.description}
          onChange={handleChange}
          placeholder='Recipe Description'
        />
        <TextareaField
          label='Recipe Note'
          name='recipeNote'
          value={recipe.recipeNote}
          onChange={handleChange}
          placeholder='Recipe Note'
        />

        <TagsSection
          tags={predefinedTags}
          selectedTags={recipe.tags}
          onTagClick={handleTagClick}
        />

        <InputField
          label='Photo URL'
          name='photos'
          value={recipe.photos.join(', ')}
          onChange={e => handleArrayChange(e, 'photos')}
          placeholder='Photo URL'
        />
        <InputField
          label='Rating'
          name='rate'
          value={recipe.rate}
          onChange={handleChange}
          placeholder='Recipe Rating'
          type='number'
        />
        <InputField
          label='Time'
          name='time'
          value={recipe.time}
          onChange={handleChange}
          placeholder='Cooking Time'
        />

        <NutritionalInfo
          data={recipe.nutritionalInformation}
          onChange={e => handleChange(e, 'nutritionalInformation')}
        />

        <IngredientsSection
          ingredients={recipe.ingredients}
          ingredient={ingredient}
          onAdd={handleAddIngredient}
          onDelete={index => handleDeleteItem('ingredients', index)}
          setIngredient={setIngredient}
        />

        <InstructionsSection
          instructions={recipe.instructions}
          onAdd={handleAddInstruction}
          onDelete={index => handleDeleteItem('instructions', index)}
        />

        <button type='submit' className='submit-btn'>
          Create Recipe
        </button>
      </form>
    </div>
  )
}

export default AddRecipe
