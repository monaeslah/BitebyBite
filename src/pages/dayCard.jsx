import React from 'react'
import { format, getDate } from 'date-fns'
import chefM from '../assets/icons/chef.png'

const DayCard = ({ day, mealPlans, onClick, isLast }) => {
  const dateKey = getDate(day)
  const meals = mealPlans[dateKey] || []

  return (
    <div className='day-card'>
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
      {isLast && (
        <div className='image-notes'>
          <img src={chefM} alt='Chef' />
        </div>
      )}
    </div>
  )
}

export default DayCard
