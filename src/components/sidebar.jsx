import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHome,
  faPlus,
  faBook,
  faSearch,
  faTrashAlt,
  faLightbulb,
  faTags,
  faHeart,
  faCalendarAlt,
  faList,
  faClock
} from '@fortawesome/free-solid-svg-icons'

const Sidebar = ({ openForm, openAddRecipe }) => {
  return (
    <div className='sidebar'>
      <ul className='sidebar-list'>
        <li className='menu-item'>
          <Link to='/'>
            <span>Home</span>
          </Link>
          <FontAwesomeIcon icon={faHome} className='icon' />
        </li>

        <h3>Recipes</h3>
        <li className='menu-item' onClick={openAddRecipe}>
          <span>Add A Recipe</span>
          <FontAwesomeIcon icon={faPlus} className='icon' />
        </li>
        <li className='menu-item'>
          <Link to='/my-recipes'>
            <span>My Recipes</span>
            <FontAwesomeIcon icon={faBook} className='icon' />
          </Link>
        </li>
        <li className='menu-item'>
          <Link to='/search'>
            <span>Search</span>
            <FontAwesomeIcon icon={faSearch} className='icon' />
          </Link>
        </li>
        <li className='menu-item'>
          <Link to='/search-leftovers'>
            <span>Search Leftovers</span>
            <FontAwesomeIcon icon={faTrashAlt} className='icon' />
          </Link>
        </li>
        <li className='menu-item' onClick={openForm}>
          <span>Lucky Choice!</span>
          <FontAwesomeIcon icon={faLightbulb} className='icon' />
        </li>
        <li className='menu-item'>
          <Link to='/tags'>
            <span>Tags</span>
            <FontAwesomeIcon icon={faTags} className='icon' />
          </Link>
        </li>
        <li className='menu-item'>
          <Link to='/favourites'>
            <span>Favourites</span>
            <FontAwesomeIcon icon={faHeart} className='icon' />
          </Link>
        </li>

        <h3>Plan & Shop</h3>
        <li className='menu-item'>
          <Link to='/meal-planner'>
            <span>Meal Planner</span>
            <FontAwesomeIcon icon={faCalendarAlt} className='icon' />
          </Link>
        </li>
        <li className='menu-item'>
          <Link to='/shopping-lists'>
            <span>Shopping Lists</span>
            <FontAwesomeIcon icon={faList} className='icon' />
          </Link>
        </li>

        <h3>Tools</h3>
        <li className='menu-item'>
          <Link to='/timers'>
            <span>Timers</span>
            <FontAwesomeIcon icon={faClock} className='icon' />
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
