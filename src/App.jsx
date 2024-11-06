import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { getRecipes } from './config/utilCurd'
import Sidebar from './components/sidebar'
import Navbar from './components/navbar'
import AllRecipes from './pages/allRecipes'
import AddRecipe from './pages/addRecipe'
import RecipeDetail from './pages/recipeDetail'
import RecipeEdit from './pages/recipeEdit'
import CategoryPage from './pages/filter/recipeTags'
import FilteredRecipes from './pages/filter/filteredRecipes'
import Modal from './components/modal'
import SurpriseCard from './components/randomRecipe'
import Login from './pages/login'

function App () {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const closeAddRecipeModal = () => setIsAddRecipeOpen(false)
  const [isAddRecipeOpen, setIsAddRecipeOpen] = useState(false)
  const [cards, setCards] = useState([])
  const [rcards, setRcards] = useState([])
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
      <Navbar />

      <Sidebar openForm={openModal} openAddRecipe={openAddRecipeModal} />

      <Modal
        isOpen={isFormOpen}
        onClose={closeForm}
        className='modal-overlay  '
        classNo='modal-content'
      >
        <SurpriseCard surprise={rcards} reselect={selectRandom} />
      </Modal>
      <Modal
        isOpen={isAddRecipeOpen}
        onClose={closeAddRecipeModal}
        large
        className='modal-overlay  modal-bottomtotop'
        classNo='modal-content-recipe'
      >
        <AddRecipe />
      </Modal>
      <div className='main-content'>
        <Routes>
          <Route path='/' element={<AllRecipes />} />
          <Route path='/login' element={<Login />} />

          <Route path='/recipe/:recipeId' element={<RecipeDetail />} />
          <Route path='/recipe/edit/:recipeId' element={<RecipeEdit />} />
          <Route path='/tags' element={<CategoryPage />} />

          <Route path='/tag/:tag' element={<FilteredRecipes />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
