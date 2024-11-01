import { Link } from 'react-router-dom'
export const Card = ({ imgSrc, imgAlt, title, id }) => {
  return (
    <div className='card-area'>
      <div className='card-box'>
        <div className='image-border'>
          <img src={imgSrc} alt={imgAlt} />
        </div>
        <Link className='card-title' to={`/recipe/${id}`}>
          <h3>{title}</h3>
        </Link>

        <div className='btn-controler'>
          {/* <Link to={`/recipe/edit/${id}`}>
            <EditNoteIcon />
          </Link> */}
        </div>
      </div>
    </div>
  )
}

export default Card
