import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons'

export const Card = ({ imgSrc, imgAlt, title, id, fav }) => {
  return (
    <div className='card-container card card-purple'>
      <Link to={`/recipe/${id}`}>
        <div className='ranking-badge ranking-badge-purple'></div>
        <div className='serving'></div>
        <div className='card-image-wrapper'>
          <img src={imgSrc && imgSrc[0]} alt={imgAlt} className='card-image' />
        </div>
        <div className='card-content '>
          <div className='fav-icon'>
            {fav ? (
              <FontAwesomeIcon icon={faSolidHeart} />
            ) : (
              <FontAwesomeIcon icon={faRegularHeart} />
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
