import { useState } from 'react'
import InputField from './inputField'
import { CookButton } from './buttons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'

const InstructionsSection = ({
  instructions,
  onAdd,
  onDelete,
  instruction,
  setInstruction,
  setInstructions
}) => {
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

    const updatedInstructions = [...instructions]
    const [movedItem] = updatedInstructions.splice(draggedIndex, 1)
    updatedInstructions.splice(dropIndex, 0, movedItem)

    setInstructions(updatedInstructions)
    setDraggedIndex(null)
  }
  const onDragEnd = event => {
    event.currentTarget.classList.remove('dragging')
  }
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onAdd()
    }
  }

  return (
    <div className='main-section'>
      <div className='input'>
        <InputField className='inputField largeInput' label={'Instructions'}>
          <input
            name='instruction'
            value={instruction}
            onChange={e => setInstruction(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder='Add an instruction'
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
          {instructions &&
            instructions.map((item, index) => (
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

export default InstructionsSection
