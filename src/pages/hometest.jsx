import React from 'react'
import Card from './Card'
import chefImage from '../assets/images/chef.png' // Placeholder for chef image

export const Home = () => {
  return (
    <div className='home-container'>
      {/* Hero Section */}
      <div className='hero-section'>
        <div className='hero-text'>
          <h1>
            Your everyday <span className='highlight'>cooking</span> inspiration
          </h1>
          <p>
            From the simple to elaborate recipes, you can find them all here
          </p>
          <div className='hero-buttons'>
            <button className='get-started'>Get Started</button>
            <a href='#' className='learn-more'>
              Learn More
            </a>
          </div>
          <div className='metrics'>
            <div>
              <strong>300k+</strong>
              <span> Recipe</span>
            </div>
            <div>
              <strong>20k+</strong>
              <span> User</span>
            </div>
            <div>
              <strong>50+</strong>
              <span> Features</span>
            </div>
          </div>
        </div>
        <div className='hero-image'>
          <img src={chefImage} alt='Chef holding a lobster' />
        </div>
      </div>

      {/* Recipe Cards */}
      <div className='recipe-cards'>
        <Card
          imgSrc='/path/to/danish.jpg'
          imgAlt='Giant Fruit Danish'
          title='Giant Fruit Danish'
          id='1'
          fav={true}
        />
        <Card
          imgSrc='/path/to/slush.jpg'
          imgAlt='Watermelon Slush'
          title='Watermelon Slush'
          id='2'
          fav={false}
        />
        <Card
          imgSrc='/path/to/feta-pasta.jpg'
          imgAlt='Baked Feta Pasta'
          title='Baked Feta Pasta'
          id='3'
          fav={true}
        />
      </div>
    </div>
  )
}

export default Home
