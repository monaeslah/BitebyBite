import { Link } from 'react-router-dom'
const Sidebar = () => {
  return (
    <div className='sidebar'>
      <ul className='sidebar-list'>
        {' '}
        <li>
          <Link to='/'>My Recipes</Link>
        </li>
        <li>
          <Link to='/add-recipe'>Add New Recipe</Link>
        </li>
        <li>
          <Link to='/about'>About Us</Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
