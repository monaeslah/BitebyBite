import React from 'react'
import InputField from './inputField'

const NutritionalInfo = ({ data, onChange }) => (
  <fieldset className='nutrition inputContainer'>
    <legend>Nutritional Information</legend>
    {['calories', 'protein', 'fat', 'carbohydrates'].map(field => (
      <InputField
        key={field}
        label={field.charAt(0).toUpperCase() + field.slice(1)}
        name={field}
        value={data[field] || ''}
        onChange={e => onChange(e)}
        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
      />
    ))}
  </fieldset>
)

export default NutritionalInfo
