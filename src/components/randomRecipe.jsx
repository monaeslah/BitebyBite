import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { CookButton } from '../components/common/buttons'
import staticPhoto from '../assets/images/healthy.jpeg'
const SurpriseCard = ({ surprise, reselect, onClose }) => {
  const [randomRecipe, setRandomRecipe] = useState(null)

  useEffect(() => {
    setRandomRecipe(surprise)
  }, [surprise])

  const handleLinkClick = () => {
    if (randomRecipe) {
      window.location.href = `/recipe/${randomRecipe.id}`
      if (onClose) onClose()
    }
  }

  return (
    <div className='lucky-card'>
      <div className='surprise-modal' onClick={handleLinkClick}>
        {randomRecipe && randomRecipe.photos ? (
          randomRecipe.photos.map((item, index) => (
            <img src={item} alt={randomRecipe.name} key={index} />
          ))
        ) : (
          <img src={staticPhoto} alt='random' />
        )}
      </div>

      <div onClick={handleLinkClick} style={{ cursor: 'pointer' }}>
        <p>{randomRecipe && randomRecipe.name}</p>
      </div>

      <CookButton
        size='xlarge'
        className='lucky-btn'
        enable={true}
        onClick={reselect}
        label={'Another One!'}
      />
    </div>
  )
}

export default SurpriseCard
