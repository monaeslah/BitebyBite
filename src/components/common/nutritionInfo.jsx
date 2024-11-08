import React from 'react'
import InputField from './inputField'
import { CookButton } from './buttons'

const NutritionalInfo = ({ data, onChange }) => (
  <fieldset className='nutrition inputContainer'>
    <legend>Nutritional Information</legend>
    {['calories', 'protein', 'fat', 'carbohydrates'].map(field => (
      <div className='button-section' key={field}>
        <InputField
          className='inputField smallInput'
          // label={field.charAt(0).toUpperCase() + field.slice(1)}
        >
          <input
            name={field}
            value={data[field] || ''}
            onChange={e => onChange(e)}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          />
        </InputField>

        {/* <CookButton
          onClick={() => console.log(`${field} added`)}
          label={'Select Unit'}
          enable={true}
          size='small'
          className={'primary-btn'}
          options={['kcl', 'kj']}
        /> */}
      </div>
    ))}
  </fieldset>
)

export default NutritionalInfo
