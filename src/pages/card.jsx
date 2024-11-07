import { Link } from 'react-router-dom'
import Fav from '../assets/icons/heart.png'
import unFav from '../assets/icons/emptyheart.png'

export const Card = ({ imgSrc, imgAlt, title, id, fav }) => {
  return (
    <div className='card-container card card-orange'>
      <Link to={`/recipe/${id}`}>
        <div className='ranking-badge ranking-badge-orange'></div>
        <div className='serving'></div>
        <div className='card-image-wrapper'>
          <img src={imgSrc && imgSrc[0]} alt={imgAlt} className='card-image' />
        </div>
        <div className='card-content '>
          <div className='fav-icon'>
            {fav ? (
              <img src={Fav} alt='Favorite icon' />
            ) : (
              <img src={unFav} alt='Unfavorite icon' />
            )}
          </div>
          <div className='card-title '>
            <p>{title}</p>
          </div>
          <div className='card-actions'></div>
        </div>
      </Link>
    </div>
  )
}

export default Card
