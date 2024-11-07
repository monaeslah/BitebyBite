import React, { useState } from 'react'
import classNames from 'classnames'

export const CookButton = ({
  size,
  className,
  enable,
  onClick,
  label,
  selected,
  options
}) => {
  const [showOption, setShowOption] = useState(false)
  const buttonClasses = classNames(
    'mainBtn',
    {
      smallButton: size === 'small',
      mediumButton: size === 'medium',
      largeButton: size === 'large',
      xlargeButton: size === 'xlarge',
      selected: selected,
      deselected: !selected
    },
    className
  )

  return (
    <div
      className={`${buttonClasses} ${enable ? 'pointer' : 'not_allowed'}`}
      onClick={enable ? onClick : undefined}
    >
      {options ? (
        <>
          <span
            onClick={e => {
              e.stopPropagation()
              setShowOption(!showOption)
            }}
            className='innerButton'
          >
            {label}
          </span>
          {showOption && (
            <div className='options'>
              {options.map((item, index) => (
                <div
                  key={index}
                  className='optionitem'
                  onClick={() => {
                    setShowOption(false)
                    console.log(`${item} selected`)
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <span className='innerButton'>{label}</span>
      )}
    </div>
  )
}
