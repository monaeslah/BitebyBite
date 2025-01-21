import { useEffect, useState } from 'react'
import { getRecipes } from '../../config/utilCurd'
import {
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  getDate
} from 'date-fns'
import InputField from '../../components/common/inputField'
import HeaderNavigation from './headerNavigation'
import DayCard from './dayCard'
import NotesSection from '../notSection'
import MealPlanModal from './mealPlanModal'
import RecipeModal from './recipeModal'
import axios from 'axios'
import chefM from '../../assets/icons/chef.png'
import { CookButton } from '../../components/common/buttons'
function MealPlanner () {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState(null)
  const [mealPlans, setMealPlans] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false)
  const [recipes, setRecipes] = useState([])
  const [selectedRecipe, setSelectedRecipe] = useState(null)

  useEffect(() => {
    getRecipes().then(setRecipes)
  }, [])

  const daysInWeek = eachDayOfInterval({
    start: startOfWeek(selectedDate),
    end: endOfWeek(selectedDate)
  })

  const handleDayClick = day => {
    setSelectedDay(day)
    setIsModalOpen(true)
  }

  const saveMealPlan = mealData => {
    if (!selectedDay) return
    const dateKey = getDate(selectedDay)
    setMealPlans(prev => ({
      ...prev,
      [dateKey]: [
        ...(prev[dateKey] || []),
        { ...mealData, recipe: selectedRecipe }
      ]
    }))
    setIsModalOpen(false)
    setSelectedRecipe(null)
  }

  const removeMealPlan = mealIndex => {
    if (!selectedDay) return
    const dateKey = getDate(selectedDay)
    setMealPlans(prev => ({
      ...prev,
      [dateKey]: prev[dateKey].filter((_, idx) => idx !== mealIndex)
    }))
    setIsModalOpen(false)
  }

  const selectRecipe = recipe => {
    setSelectedRecipe(recipe)
    setIsRecipeModalOpen(false)
  }

  const sendMealPlansToServer = () => {
    return axios
      .post(
        `${import.meta.env.VITE_COOK_LAND_API}/mealplanner.json`,
        mealPlans,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      .then(response => {
        console.log('Meal plans successfully sent to the server')
        return response.data
      })
      .catch(error => {
        console.error('Failed to send meal plans to the server', error)
        throw new Error('Failed to send meal plans to the server')
      })
  }

  return (
    <div className='meal-planner'>
      <HeaderNavigation
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        goToToday={() => setSelectedDate(new Date())}
      />
      <div className='header-fields'>
        <InputField label='Month'>
          <input type='text' value={format(selectedDate, 'MMMM')} readOnly />
        </InputField>
        <InputField label='Week'>
          <input
            type='text'
            value={`${format(startOfWeek(selectedDate), 'd MMM')} - ${format(
              endOfWeek(selectedDate),
              'd MMM'
            )}`}
            readOnly
          />
        </InputField>
      </div>
      <div className='calendar'>
        {daysInWeek.map(day => (
          <DayCard
            key={day}
            day={day}
            mealPlans={mealPlans}
            onClick={() => handleDayClick(day)}
          />
        ))}
        <div className='day-cards'></div>
        <div className='image-notes'>
          <img src={chefM} alt='' />
        </div>
      </div>
      <NotesSection />
      <MealPlanModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={saveMealPlan}
        onRemove={removeMealPlan}
        selectedRecipe={selectedRecipe}
        setIsRecipeModalOpen={setIsRecipeModalOpen}
      />
      <RecipeModal
        isOpen={isRecipeModalOpen}
        onClose={() => setIsRecipeModalOpen(false)}
        recipes={recipes}
        onSelectRecipe={selectRecipe}
      />

      <CookButton
        label={'Save'}
        enable={true}
        size='large'
        className={'tag-button left-align'}
        onClick={sendMealPlansToServer}
      />
    </div>
  )
}

export default MealPlanner
