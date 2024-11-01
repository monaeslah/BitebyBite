import React, { useState, useEffect } from 'react'

const Sidebar = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={scrolled ? 'sidebar scrolled' : 'sidebar'}>
      <ul className='sidebar-list'></ul>
    </div>
  )
}

export default Sidebar
