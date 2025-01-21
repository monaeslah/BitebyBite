import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { getRecipes } from './config/utilCurd'

import AllRecipes from './pages/allRecipes'
import Sidebar from './components/sidebar'
import AddRecipe from './pages/addRecipe'
import RecipeDetail from './pages/recipeDetail'
import MealPlanner from './pages/mealplanner/mealPlanner'
import RecipeEdit from './pages/recipeEdit'
import CategoryPage from './pages/filter/recipeTags'
import FilteredRecipes from './pages/filter/filteredRecipes'
import Modal from './components/modal'
import SurpriseCard from './components/randomRecipe'

import Landing from './pages/landing-page'
import NotFound from './pages/notFound'
import Timer from './pages/timer'

function App () {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const closeAddRecipeModal = () => setIsAddRecipeOpen(false)
  const [isAddRecipeOpen, setIsAddRecipeOpen] = useState(false)
  const [cards, setCards] = useState([])
  const [rcards, setRcards] = useState([])
  const location = useLocation()
  const openModal = () => {
    selectRandom()
    setIsFormOpen(true)
  }
  const closeForm = () => setIsFormOpen(false)
  const openAddRecipeModal = () => {
    setIsAddRecipeOpen(true)
  }

  useEffect(() => {
    getRecipes().then(fetchedRecipes => {
      setCards(fetchedRecipes)
    })
  }, [])
  const selectRandom = () => {
    let neRan = cards[Math.floor(Math.random() * cards.length)]

    setRcards(neRan)
    setIsFormOpen(true)
  }
  return (
    <div className='page-layout'>
      <Modal
        isOpen={isFormOpen}
        onClose={closeForm}
        className='modal-overlay  '
        classNo='modal-content'
      >
        <SurpriseCard
          surprise={rcards}
          reselect={selectRandom}
          onClose={closeForm}
        />
      </Modal>
      <Modal
        isOpen={isAddRecipeOpen}
        onClose={closeAddRecipeModal}
        large
        className='modal-overlay  modal-bottomtotop'
        classNo='modal-content-recipe'
      >
        <AddRecipe onClose={closeAddRecipeModal} />
      </Modal>
      <div className={location.pathname !== '/' ? 'main-content' : ''}>
        {location.pathname !== '/' && (
          <Sidebar openForm={openModal} openAddRecipe={openAddRecipeModal} />
        )}

        <Routes>
          <Route path='/' element={<Landing />} />

          <Route
            path='/my-recipes'
            element={
              <AllRecipes
                openForm={openModal}
                openAddRecipe={openAddRecipeModal}
              />
            }
          />
          <Route
            path='/favourites'
            element={
              <AllRecipes
                openForm={openModal}
                openAddRecipe={openAddRecipeModal}
              />
            }
          />
          <Route path='/recipe/:recipeId' element={<RecipeDetail />} />
          <Route path='/meal-planner' element={<MealPlanner />} />
          <Route path='/recipe/edit/:recipeId' element={<RecipeEdit />} />
          <Route path='/tags' element={<CategoryPage />} />

          <Route path='/tag/:tag' element={<FilteredRecipes />} />
          <Route path='/timers' element={<Timer />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
