import axios from 'axios'
import { useEffect, useState } from 'react'
import InputField from '../components/common/inputField'
import TagsSection from '../components/common/tagSection'
import NutritionalInfo from '../components/common/nutritionInfo'
import IngredientsSection from '../components/ingredients'
import InstructionsSection from '../components/common/instructions'

import { Base_URL } from '../config/api'
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

  const [ingredient, setIngredient] = useState('')
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
      .catch(e => console.error('Error fetching recipe:', e))
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
    axios
      .put(`${Base_URL}/recipes/${recipeId}.json`, recipe)
      .then(() => navigate(`/recipe/${recipeId}`))
      .catch(e => console.error('Error updating recipe:', e))
  }

  if (!recipe) {
    return <p>Loading recipe data...</p>
  }

  return (
    <div className='recipe-edit'>
      <h2>Edit Recipe</h2>
      <form onSubmit={handleSubmit}>
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

        <TagsSection selectedTags={recipe.tags} onTagClick={handleTagClick} />

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
          Update Recipe
        </button>
      </form>
    </div>
  )
}

export default RecipeEdit
