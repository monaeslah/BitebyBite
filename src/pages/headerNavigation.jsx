import React from 'react'
import { CookButton } from '../components/common/buttons'

const HeaderNavigation = ({ selectedDate, setSelectedDate, goToToday }) => {
  return (
    <header className='planner-header'>
      <CookButton
        label='Previous'
        onClick={() => setSelectedDate(prev => subWeeks(prev, 1))}
      />
      <CookButton label='Today' onClick={goToToday} />
      <CookButton
        label='Next'
        onClick={() => setSelectedDate(prev => addWeeks(prev, 1))}
      />
    </header>
  )
}

export default HeaderNavigation
