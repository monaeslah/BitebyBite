import React from 'react'

const TagsSection = ({ selectedTags = [], onTagClick }) => {
  const predefinedTags = [
    'breakfast',
    'pasta',
    'Italian',
    'quick',
    'lunch',
    'dinner',
    'sweet',
    'savory',
    'snack',
    'healthy',
    'vegetarian',
    'pancakes'
  ]

  return (
    <div className='tags-section'>
      <label>Tags:</label>
      <div className='tag-buttons'>
        {predefinedTags.map(tag => (
          <button
            type='button'
            key={tag}
            className={`tag-button ${
              selectedTags.includes(tag) ? 'selected' : 'deselected'
            }`}
            onClick={() => onTagClick(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      <p className='selected-tags'>
        Selected tags:{' '}
        {selectedTags.length > 0 ? selectedTags.join(', ') : 'None'}
      </p>
    </div>
  )
}

export default TagsSection
