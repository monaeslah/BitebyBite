import { Link } from 'react-router-dom'
const Sidebar = ({ openForm, openAddRecipe }) => {
  return (
    <div className='sidebar'>
      <ul className='sidebar-list'>
        {' '}
        <li>
          <Link to='/'>My Recipes</Link>
        </li>
        <li onClick={openAddRecipe}>Add Recipe</li>
        <li onClick={openForm}>Lucky Choice</li>
      </ul>
    </div>
  )
}

export default Sidebar
