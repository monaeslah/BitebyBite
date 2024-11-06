const InputField = ({ className = '', label, children }) => {
  return (
    <div className='inputContainer'>
      {label && <p className='form-field'>{label}</p>}
      <div className={`input-wrapper ${className}`}>
        {children || <span>No content provided</span>}
      </div>
    </div>
  )
}

export default InputField
