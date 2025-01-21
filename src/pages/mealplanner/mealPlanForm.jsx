import React, { useState, useEffect } from 'react'

function MealPlanForm ({ onSave, onRemove, existingData, onSearch }) {
  const [recipe, setRecipe] = useState('')
  const [mealType, setMealType] = useState(
    existingData?.mealType || 'Breakfast'
  )

  useEffect(() => {
    setRecipe(existingData.name)
  }, [existingData])

  const handleSave = () => {
    const mealData = { recipe, mealType }
    console.log('existingData', existingData, mealData)
    onSave(mealData)
  }

  return (
    <div className='meal-plan-form'>
      <h2>Add / Edit Plan</h2>

      <div className='form-row'>
        {existingData ? (
          <div
            className='select-recipe'
            onClick={() => {
              setRecipe('')
              onSearch()
            }}
          >
            {existingData?.name}
          </div>
        ) : (
          <button className='select-recipe' onClick={onSearch}>
            Select Recipe
          </button>
        )}
        <select
          className='meal-type-dropdown'
          value={mealType}
          onChange={e => setMealType(e.target.value)}
        >
          <option value='Breakfast'>Breakfast</option>
          <option value='Snack'>Snack</option>
          <option value='Lunch'>Lunch</option>
          <option value='Dinner'>Dinner</option>
        </select>
      </div>

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
