import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Signup = () => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit (e) {
    e.preventDefault()
  }

  return (
    <>
      <div className='auth-container'>
        <div className='auth-form'>
          <h2 className='auth-title'>Sign Up</h2>

          {error && <div className='error-message'>{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <input type='email' id='email' required />
            </div>

            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <input type='password' id='password' required />
            </div>

            <div className='form-group'>
              <label htmlFor='password-confirm'>Confirm Password</label>
              <input type='password' id='password-confirm' required />
            </div>

            <button disabled={loading} type='submit' className='submit-button'>
              Sign Up
            </button>
          </form>
        </div>

        <div className='login-link'>
          Already have an account? <Link to='/login'>Log In</Link>
        </div>
      </div>
    </>
  )
}
export default Signup
