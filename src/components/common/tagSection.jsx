import { CookButton } from './buttons'

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
          <CookButton
            key={tag}
            label={tag}
            enable={true}
            size='small'
            className={'tag-button'}
            selected={selectedTags.includes(tag)}
            onClick={() => onTagClick(tag)}
          />
        ))}
      </div>
    </div>
  )
}

export default TagsSection
