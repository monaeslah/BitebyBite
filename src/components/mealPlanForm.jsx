import React, { useState, useEffect } from 'react'
import './mealPlanForm.css'

function MealPlanForm ({ onSave, onRemove, existingData, onSearch }) {
  const [recipe, setRecipe] = useState(existingData?.recipe || '')
  const [mealType, setMealType] = useState(
    existingData?.mealType || 'Breakfast'
  )
  const [date, setDate] = useState(
    existingData?.date || new Date().toLocaleDateString()
  )
  const [servings, setServings] = useState(existingData?.servings || 2)
  const [notes, setNotes] = useState(existingData?.notes || '')

  useEffect(() => {
    if (existingData?.recipe) {
      setRecipe(existingData.recipe)
    }
  }, [existingData?.recipe])

  const handleSave = () => {
    const mealData = { recipe, mealType, date, servings, notes }
    onSave(mealData)
  }

  return (
    <div className='meal-plan-form'>
      <h2>Add / Edit Plan</h2>
      <div className='form-row'>
        <button className='select-recipe' onClick={onSearch}>
          Select recipe
        </button>
        <input
          type='text'
          className='meal-type'
          value={mealType}
          onChange={e => setMealType(e.target.value)}
          placeholder='Meal Type'
        />
      </div>
      <div className='form-row'>
        <input
          type='text'
          className='recipe-name'
          value={recipe}
          onChange={e => setRecipe(e.target.value)}
          placeholder='Recipe Name'
        />
        <input
          type='text'
          className='date-picker'
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <input
          type='number'
          className='servings'
          value={servings}
          onChange={e => setServings(e.target.value)}
          placeholder='Servings'
        />
      </div>
      <textarea
        className='notes'
        placeholder='Enter recipe notes or an ingredient per line'
        value={notes}
        onChange={e => setNotes(e.target.value)}
      />
      <div className='form-actions'>
        <button className='remove-button' onClick={onRemove}>
          Remove
        </button>
        <button className='save-button' onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  )
}

export default MealPlanForm
