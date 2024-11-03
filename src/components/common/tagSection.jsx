import React from 'react'

const TagsSection = ({ tags, selectedTags = [], onTagClick }) => (
  <div className='tags-section'>
    <label>Tags:</label>
    <div className='tag-buttons'>
      {tags.map(tag => (
        <button
          type='button'
          key={tag}
          className={`tag-button ${selectedTags.includes(tag) ? 'active' : ''}`}
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

export default TagsSection
