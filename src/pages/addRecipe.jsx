import React, { useState } from 'react'
import InputField from '../components/common/inputField'
import TextareaField from '../components/common/textField'
import TagsSection from '../components/common/tagSection'
import NutritionalInfo from '../components/common/nutritionalInfo'

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

  const handleChange = (e, field = null) => {
    const { name, value } = e.target
    setRecipe(prev => {
      if (field) {
        return {
          ...prev,
          [field]: { ...prev[field], [name]: value }
        }
      }
      return { ...prev, [name]: value }
    })
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

  const handleDeleteIngredient = index => {
    setRecipe(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }))
  }

  const handleTagClick = tag => {
    setRecipe(prev => {
      const newTags = prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
      return { ...prev, tags: newTags }
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log('Recipe JSON:', JSON.stringify(recipe, null, 2))
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
          onDelete={handleDeleteIngredient}
          setIngredient={setIngredient}
        />

        <TextareaField
          label='Instructions (comma separated)'
          name='instructions'
          value={recipe.instructions.join(', ')}
          onChange={e => handleArrayChange(e, 'instructions')}
          placeholder='Instructions'
        />

        <button type='submit' className='submit-btn'>
          Create Recipe JSON
        </button>
      </form>
    </div>
  )
}

const IngredientsSection = ({
  ingredients,
  ingredient,
  onAdd,
  onDelete,
  setIngredient
}) => (
  <div className='ingredients-section'>
    <label>Ingredients:</label>
    <div className='ingredient-input'>
      <input
        type='text'
        value={ingredient}
        onChange={e => setIngredient(e.target.value)}
        placeholder='Add an ingredient'
      />
      <button type='button' onClick={onAdd}>
        Add
      </button>
    </div>
    <ul className='ingredient-list'>
      {ingredients.map((item, index) => (
        <li key={index}>
          {item}
          <button type='button' onClick={() => onDelete(index)}>
            Remove
          </button>
        </li>
      ))}
    </ul>
  </div>
)

export default AddRecipe
