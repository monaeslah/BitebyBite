import { Link } from 'react-router-dom'
const Sidebar = ({ openForm }) => {
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
        <li onClick={openForm}>Rendom</li>
      </ul>
    </div>
  )
}

export default Sidebar
