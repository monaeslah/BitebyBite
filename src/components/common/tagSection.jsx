import React from 'react'

const TagsSection = ({ selectedTags = [], onTagClick }) => {
  const predefinedTags = [
    'Appetizers',
    'Breakfast',
    'Dinner',
    'Drinks',
    'Healthy',
    'Lunch',
    'Smoothies',
    'Soup',
    'Vegetarian'
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
    </div>
  )
}

export default TagsSection
