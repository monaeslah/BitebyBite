import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/sidebar'
import Navbar from './components/navbar'
import AllRecipes from './pages/allRecipes'
import AddRecipe from './pages/addRecipe'
import RecipeDetail from './pages/recipeDetail'
import RecipeEdit from './pages/recipeEdit'

function App () {
  return (
    <div className='page-layout'>
      <Navbar />

      <Sidebar />

      <div className='main-content'>
        <Routes>
          <Route path='/' element={<AllRecipes />} />
          <Route path='/add-recipe' element={<AddRecipe />} />
          <Route path='/recipe/:recipeId' element={<RecipeDetail />} />
          <Route path='/recipe/edit/:recipeId' element={<RecipeEdit />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
