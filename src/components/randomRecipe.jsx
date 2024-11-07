import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SurpriseCard = ({ surprise, reselect, onClose }) => {
  const [randomRecipe, setRandomRecipe] = useState(null)
  const navigate = useNavigate()

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
          <img src={item} alt={randomRecipe.name} key={index} />
        ))}
      <div onClick={handleLinkClick} style={{ cursor: 'pointer' }}>
        <p>{randomRecipe && randomRecipe.name}</p>
      </div>
      <button onClick={reselect}>try me</button>
    </div>
  )
}

export default SurpriseCard
