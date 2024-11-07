import notFound from '../assets/icons/notFound.png'
import { Link } from 'react-router-dom'
const NotFound = () => {
  return (
    <div className='page-not'>
      <img src={notFound} alt='' />
      <p>Page not found</p>
      <Link to='./'>Back Home</Link>
    </div>
  )
}

export default NotFound
