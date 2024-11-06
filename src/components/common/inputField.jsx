const InputField = ({ className = '', label, icon = '', children }) => {
  return (
    <div className='inputContainer'>
      {label && <p className='form-field'>{label}</p>}
      <div className={`input-wrapper ${className}`}>
        {icon ? (
          <img src={icon} alt='Input icon' className='icon-before' />
        ) : null}
        {children || <span>No content provided</span>}
      </div>
    </div>
  )
}

export default InputField
