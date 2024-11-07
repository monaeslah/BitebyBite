import React from 'react'
import { format, getDate } from 'date-fns'

const DayCard = ({ day, mealPlans, onClick }) => {
  const dateKey = getDate(day)
  const meals = mealPlans[dateKey] || []

  return (
    <div className='day' onClick={onClick}>
      <span>{format(day, 'EEEE')}</span>
      <div className='meals'>
        {meals.map((meal, index) => (
          <div key={index} className='meal-item'>
            <div
              className='meal-color'
              style={{ backgroundColor: meal.color }}
            ></div>
            <span className='meal-name'>
              {meal.recipe?.name || meal.recipe}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DayCard
