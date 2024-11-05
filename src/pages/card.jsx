import { Link } from 'react-router-dom'
import Fav from '../assets/icons/heart.png'
import unFav from '../assets/icons/emptyheart.png'

export const Card = ({ imgSrc, imgAlt, title, id, fav }) => {
  return (
    <div className='card-container'>
      <Link to={`/recipe/${id}`}>
        <div className='card-image-wrapper'>
          <img src={imgSrc} alt={imgAlt} className='card-image' />
          <div className='fav-icon'>
            {fav ? (
              <img src={Fav} alt='Favorite icon' />
            ) : (
              <img src={unFav} alt='Unfavorite icon' />
            )}
          </div>
        </div>
        <div className='card-content'>
          <div className='card-title'>
            <p>{title}</p>
          </div>
          <div className='card-actions'></div>
        </div>
      </Link>
    </div>
  )
}

export default Card
