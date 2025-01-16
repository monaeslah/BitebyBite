import { useState } from 'react'
import InputField from './common/inputField'
import { CookButton } from './common/buttons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'
const IngredientsSection = ({
  ingredients,
  ingredient,
  onAdd,
  onDelete,
  setIngredient,
  setIngredients
}) => {
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onAdd()
    }
  }

  const [draggedIndex, setDraggedIndex] = useState(null)

  const onDragStart = (event, index) => {
    setDraggedIndex(index)
    event.currentTarget.classList.add('dragging')
  }

  const onDragOver = event => {
    event.preventDefault()
  }

  const onDrop = (event, dropIndex) => {
    event.preventDefault()
    if (draggedIndex === null || draggedIndex === dropIndex) return

    const updatedIngredients = [...ingredients]
    const [movedItem] = updatedIngredients.splice(draggedIndex, 1)
    updatedIngredients.splice(dropIndex, 0, movedItem)

    setIngredients(updatedIngredients)
    setDraggedIndex(null)
  }

  const onDragEnd = event => {
    event.currentTarget.classList.remove('dragging')
  }

  return (
    <div className='main-section'>
      <div className='input'>
        <InputField className='inputField largeInput' label='Ingredients'>
          <input
            value={ingredient}
            onChange={e => setIngredient(e.target.value)}
            placeholder='Add an ingredient'
            onKeyPress={handleKeyPress}
          />
          <CookButton
            onClick={onAdd}
            label='Add'
            enable={true}
            size='small'
            className={'primary-btn'}
          />
        </InputField>

        <ul className='list'>
          {ingredients &&
            (ingredients || []).map((item, index) => (
              <li
                key={index}
                draggable
                onDragStart={e => onDragStart(e, index)}
                onDragOver={onDragOver}
                onDrop={e => onDrop(e, index)}
                onDragEnd={onDragEnd}
                className='item'
              >
                {item}

                <FontAwesomeIcon
                  icon={faWindowClose}
                  onClick={() => onDelete(index)}
                />
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default IngredientsSection
