import React, { useEffect, useState, useRef } from 'react'
import { getRecipes } from '../config/utilCurd'
import {
  format,
  addWeeks,
  subWeeks,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  getDate
} from 'date-fns'
import Modal from '../components/modal'
import MealPlanForm from '../components/mealPlanForm'
import './mealplanner.css'

function MealPlanner () {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState(null)
  const [mealPlans, setMealPlans] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false)
  const [recipes, setRecipes] = useState([])
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const foodPlanRef = useRef(null)

  useEffect(() => {
    getRecipes().then(fetchedRecipes => {
      setRecipes(fetchedRecipes)
    })
  }, [])

  const daysInWeek = eachDayOfInterval({
    start: startOfWeek(selectedDate, { weekStartsOn: 0 }),
    end: endOfWeek(selectedDate, { weekStartsOn: 0 })
  })

  const openModal = day => {
    setSelectedDay(day)
    setSelectedRecipe(null)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedDay(null)
  }

  const saveMealPlan = mealData => {
    const dateKey = getDate(selectedDay)
    setMealPlans(prevPlans => ({
      ...prevPlans,
      [dateKey]: [...(prevPlans[dateKey] || []), mealData]
    }))
    closeModal()
  }

  const removeMealPlan = mealIndex => {
    const dateKey = getDate(selectedDay)
    if (mealPlans[dateKey]) {
      const updatedMeals = mealPlans[dateKey].filter(
        (_, index) => index !== mealIndex
      )
      setMealPlans(prevPlans => ({
        ...prevPlans,
        [dateKey]: updatedMeals.length > 0 ? updatedMeals : undefined
      }))
    }
    closeModal()
  }

  const goToPreviousWeek = () => {
    setSelectedDate(subWeeks(selectedDate, 1))
  }

  const goToNextWeek = () => {
    setSelectedDate(addWeeks(selectedDate, 1))
  }

  const goToToday = () => {
    setSelectedDate(new Date())
  }

  const scrollToFoodPlan = day => {
    const dateKey = getDate(day)
    setSelectedDay(day)
    if (foodPlanRef.current && mealPlans[dateKey]?.length) {
      const targetElement = document.getElementById(`food-plan-${dateKey}`)
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
    openModal(day)
  }

  const getMealTypeColor = mealType => {
    switch (mealType) {
      case 'Breakfast':
        return 'orange'
      case 'Lunch':
        return 'green'
      case 'Snack':
        return 'yellow'
      case 'Dinner':
        return 'blue'
      default:
        return 'gray'
    }
  }

  const openRecipeModal = () => {
    setIsRecipeModalOpen(true)
  }

  const closeRecipeModal = () => {
    setIsRecipeModalOpen(false)
  }

  const selectRecipe = recipe => {
    setSelectedRecipe(recipe) // Store the entire recipe object
    closeRecipeModal()
  }

  return (
    <div className='meal-planner'>
      <header className='planner-header'>
        <button onClick={goToPreviousWeek}>Previous</button>
        <button onClick={goToToday}>Today</button>
        <button onClick={goToNextWeek}>Next</button>
      </header>

      <div className='header-fields'>
        <label>
          Month:{' '}
          <input type='text' value={format(selectedDate, 'MMMM')} readOnly />
        </label>
        <label>
          Week:{' '}
          <input
            type='text'
            value={`${format(startOfWeek(selectedDate), 'd MMM')} - ${format(
              endOfWeek(selectedDate),
              'd MMM'
            )}`}
            readOnly
          />
        </label>
      </div>

      <div className='calendar'>
        {daysInWeek.map(day => {
          const dateKey = getDate(day)
          const meals = mealPlans[dateKey] || []

          return (
            <div
              key={day}
              className='day'
              onClick={() => scrollToFoodPlan(day)}
            >
              <span>{format(day, 'EEEE')}</span>
              <div className='meals'>
                {meals.map((meal, index) => (
                  <div key={index} className='meal-item'>
                    <div
                      className='meal-color'
                      style={{
                        backgroundColor: getMealTypeColor(meal.mealType)
                      }}
                    ></div>
                    <span className='meal-name'>
                      {meal.recipe?.name || meal.recipe}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <div className='notes-section'>
        <h3>Notes</h3>
        <textarea placeholder='Write your notes here...'></textarea>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        className='modal-overlay'
        classNo='modal-content'
      >
        <MealPlanForm
          onSave={saveMealPlan}
          onRemove={removeMealPlan}
          existingData={{
            ...mealPlans[getDate(selectedDay)],
            recipe: selectedRecipe?.name || ''
          }}
          onSearch={openRecipeModal}
        />
      </Modal>

      <Modal
        isOpen={isRecipeModalOpen}
        onClose={closeRecipeModal}
        className='modal-overlay'
        classNo='modal-content'
      >
        <h2>Select a Recipe</h2>
        <ul className='recipe-list'>
          {recipes.map((recipe, index) => (
            <li key={index} onClick={() => selectRecipe(recipe)}>
              {recipe.name} {/* Display recipe name only */}
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  )
}

export default MealPlanner
