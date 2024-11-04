import { useState } from 'react'
import InputField from './inputField'

const InstructionsSection = ({ instructions, onAdd, onDelete }) => {
  const [instruction, setInstruction] = useState('')

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddInstruction()
    }
  }

  const handleAddInstruction = () => {
    if (instruction.trim()) {
      onAdd(instruction.trim())
      setInstruction('')
    }
  }

  return (
    <div className='instructions-section'>
      <div className='instruction-input'>
        <InputField
          label={'Instructions:'}
          name={instruction}
          value={instruction}
          onChange={e => setInstruction(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder='Add an instruction'
        />
        <button type='button' onClick={handleAddInstruction}>
          Add
        </button>
      </div>
      <ul className='instruction-list'>
        {instructions?.map((item, index) => (
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

export default InstructionsSection
