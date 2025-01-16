import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CookButton } from '../components/common/buttons'
import staticPhoto from '../assets/images/healthy.jpeg'
const SurpriseCard = ({ surprise, reselect, onClose }) => {
  const [randomRecipe, setRandomRecipe] = useState(null)

  useEffect(() => {
    setRandomRecipe(surprise)
    console.log(surprise)
  }, [surprise])

  const handleLinkClick = () => {
    if (randomRecipe) {
      window.location.href = `/recipe/${randomRecipe.id}`
      if (onClose) onClose()
    }
  }

  return (
    <div className='surprise-modal'>
      {randomRecipe &&
        randomRecipe.photos.map((item, index) => (
          <img
            src={item ? item : staticPhoto}
            alt={randomRecipe.name}
            key={index}
          />
        ))}
      <div onClick={handleLinkClick} style={{ cursor: 'pointer' }}>
        <p>{randomRecipe && randomRecipe.name}</p>
      </div>

      <CookButton
        size='medium'
        className='lucky-btn'
        enable={true}
        onClick={reselect}
        label={'Another One!'}
      />
    </div>
  )
}

export default SurpriseCard
