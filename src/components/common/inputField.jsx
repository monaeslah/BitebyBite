import React from 'react'

const InputField = ({ className = '', label, icon, ...props }) => {
  return (
    <div className='inputContainer'>
      {label && <p className='form-field'>{label}</p>}
      <div className={`input-wrapper ${className}`}>
        <img src={icon} alt='Input icon' className='icon-before' />

        <input {...props} className='input-field' />
      </div>
    </div>
  )
}

export default InputField
