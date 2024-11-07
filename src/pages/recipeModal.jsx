import React, { useState } from 'react'
import Modal from '../components/modal'
import './mealplanner.css'

const RecipeModal = ({ isOpen, onClose, recipes, onSelectRecipe }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null)

  const handleSelect = recipe => {
    setSelectedRecipe(recipe) // Highlight selection in modal
    onSelectRecipe(recipe) // Pass the recipe to MealPlanner
    onClose() // Close the modal after selection
    console.log(recipe)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} className='modal-overlay'>
      <div className='modal-content'>
        <h2>Select a Recipe</h2>
        <ul className='recipe-list'>
          {recipes.map((recipe, index) => (
            <li
              key={index}
              className={`recipe-item ${
                selectedRecipe === recipe ? 'selected' : ''
              }`}
              onClick={() => handleSelect(recipe)}
            >
              {recipe.name}
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  )
}

export default RecipeModal
