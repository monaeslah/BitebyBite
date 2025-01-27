import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <div id='home-container'>
      <div className='hero-section'>
        <div className='hero-text'>
          <h1>
            Your everyday <span className='highlight'>cooking</span> inspiration
          </h1>
          <div>
            <p>
              From the simple to elaborate recipes, you can find them all here
            </p>
            <div className='hero-buttons'>
              <Link className='box__link button-animation' to='/my-recipes'>
                Get Started
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </Link>
              <Link to='/about' className=' learn-more'>
                About me
              </Link>
            </div>
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
        <div className='hero-image'></div>
      </div>{' '}
    </div>
  )
}

export default Home
