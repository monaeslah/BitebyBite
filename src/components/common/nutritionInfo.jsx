import React from 'react'
import InputField from './inputField'
import { CookButton } from './buttons'

const NutritionalInfo = ({ data, onChange }) => (
  <fieldset className='nutrition inputContainer'>
    <legend>Nutritional Information</legend>
    {['calories', 'protein', 'fat', 'carbohydrates'].map(field => (
      <div className='button-section' key={field}>
        <InputField className='inputField smallInput'>
          <input
            name={field}
            value={data[field] || ''}
            onChange={e => onChange(e)}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            type='number'
          />
        </InputField>
      </div>
    ))}
  </fieldset>
)

export default NutritionalInfo
