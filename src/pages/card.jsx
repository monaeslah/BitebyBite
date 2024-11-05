import Fav from '../assets/icons/heart.png'
import unFav from '../assets/icons/emptyheart.png'
export const Card = ({ imgSrc, imgAlt, title, id, fav }) => {
  return (
    <div id='home-container'>
      <div className='image-border'>
        <img src={imgSrc} alt={imgAlt} />
        <div className='fav-icon'>
          {' '}
          {fav ? <img src={Fav} /> : <img src={unFav} />}
        </div>
      </div>
      <div className='card-box'>
        <div className='title'>
          <p>{title}</p>
        </div>

        <div className='btn-controler'></div>
      </div>
    </div>
  )
}

export default Card
