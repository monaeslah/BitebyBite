import React from 'react'
import InputField from './common/InputField'

const IngredientsSection = ({
  ingredients,
  ingredient,
  onAdd,
  onDelete,
  setIngredient
}) => {
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onAdd()
    }
  }

  return (
    <div className='ingredients-section'>
      <div className='ingredient-input'>
        <InputField
          label='Ingredients:'
          value={ingredient}
          onChange={e => setIngredient(e.target.value)}
          placeholder='Add an ingredient'
          onKeyPress={handleKeyPress}
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
}

export default IngredientsSection
