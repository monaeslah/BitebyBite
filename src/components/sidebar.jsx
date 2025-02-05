import { Link } from 'react-router-dom'
import { useState } from 'react'
import wlogo from '../assets/images/logomain.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHome,
  faPlus,
  faBook,
  faLightbulb,
  faTags,
  faHeart,
  faCalendarAlt,
  faList,
  faClock,
  faBars, // Icon for the toggle button
  faTimes // Icon for closing the menu
} from '@fortawesome/free-solid-svg-icons'

const Sidebar = ({ openForm, openAddRecipe }) => {
  const [openSidebar, setOpenSidebar] = useState(false)

  const toggleSidebar = () => setOpenSidebar(!openSidebar)

  return (
    <>
      {/* Toggle button */}
      <button className='sidebar-toggle-btn' onClick={toggleSidebar}>
        <FontAwesomeIcon icon={openSidebar ? faTimes : faBars} />
      </button>

      <div className={`sidebar ${openSidebar ? 'open' : 'closed'}`}>
        <div className='re-nav'>
          <img src={wlogo} className='logo-image' alt='Logo' />
        </div>
        <ul className='sidebar-list'>
          <li className='menu-item'>
            <Link to='/'>
              <span>Home</span>
              <FontAwesomeIcon icon={faHome} className='icon' />
            </Link>
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
          <li className='menu-item responsive'>
            <Link to='/shopping-lists'>
              <span>Shopping Lists</span>
              <FontAwesomeIcon icon={faList} className='icon' />
            </Link>
          </li>

          <h3 className='responsive'>Tools</h3>
          <li className='menu-item responsive'>
            <Link to='/timers'>
              <span>Timers</span>
              <FontAwesomeIcon icon={faClock} className='icon' />
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Sidebar
