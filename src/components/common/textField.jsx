import React from 'react'

const TextareaField = ({ className = '', label, ...props }) => (
  <div className='textareaContainer inputContainer'>
    {label && <p>{label}</p>}
    <textarea {...props} className={`textarea-field ${className}`} />
  </div>
)

export default TextareaField
