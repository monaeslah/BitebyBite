import React, { useState } from 'react'
import Modal from '../components/modal'

const RecipeModal = ({ isOpen, onClose, recipes, onSelectRecipe }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null)

  const handleSelect = recipe => {
    setSelectedRecipe(recipe)
    onSelectRecipe(recipe)
    onClose()
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
              <div className='planner-image'>
                <img src={recipe.photos} alt='' />
              </div>
              <h5>{recipe.name}</h5>
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  )
}

export default RecipeModal
