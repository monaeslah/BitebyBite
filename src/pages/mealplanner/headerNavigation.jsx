import React from 'react'
import { CookButton } from '../../components/common/buttons'
import { subWeeks, addWeeks } from 'date-fns'
const HeaderNavigation = ({ selectedDate, setSelectedDate, goToToday }) => {
  return (
    <header className='planner-header'>
      <CookButton
        enable={true}
        label='Previous'
        onClick={() => setSelectedDate(prev => subWeeks(prev, 1))}
        className={'prev'}
      />

      <CookButton
        label='Today'
        onClick={goToToday}
        enable={true}
        className={'prev'}
      />
      <CookButton
        enable={true}
        label='Next'
        onClick={() => setSelectedDate(prev => addWeeks(prev, 1))}
        className={'prev'}
      />
    </header>
  )
}

export default HeaderNavigation
