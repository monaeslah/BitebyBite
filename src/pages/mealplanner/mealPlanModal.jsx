import React from 'react'
import Modal from '../../components/modal'
import MealPlanForm from './mealPlanForm'

const MealPlanModal = ({
  isOpen,
  onClose,
  onSave,
  onRemove,
  selectedRecipe,
  setIsRecipeModalOpen
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <MealPlanForm
        onSave={onSave}
        onRemove={onRemove}
        existingData={selectedRecipe || ''}
        onSearch={() => setIsRecipeModalOpen(true)}
      />
    </Modal>
  )
}

export default MealPlanModal
