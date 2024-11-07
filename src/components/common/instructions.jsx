import { useState } from 'react'
import InputField from './inputField'
import { CookButton } from './buttons'
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
    <div className='main-section'>
      <div className='input'>
        <InputField className='inputField largeInput' label={'Instructions:'}>
          <input
            name={instruction}
            value={instruction}
            onChange={e => setInstruction(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder='Add an instruction'
          />

          <CookButton
            onClick={handleAddInstruction}
            label='Add'
            enable={true}
            size='small'
            className={'primary-btn'}
          />
        </InputField>
      </div>
      <ul className='list'>
        {instructions?.map((item, index) => (
          <li key={index}>
            {item}

            <CookButton
              onClick={() => onDelete(index)}
              label='Remove'
              enable={true}
              size='small'
              className={'remove'}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default InstructionsSection
