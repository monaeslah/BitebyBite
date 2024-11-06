import { useRef, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import InputField from '../components/common/InputField'

import { CookButton } from '../components/common/buttons'

export default function Login () {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit (e) {
    e.preventDefault()
  }

  return (
    <div className='page'>
      <div className='form-card'>
        <h3 className='text-center mb-4'>Welcome back </h3>

        <div id='email'>
          <InputField
            className='inputField mediumInput loginForm'
            label={'Email'}
          >
            <input className='field' type='email' required />
          </InputField>
        </div>
        <div id='password'>
          <div id='password'>
            <InputField
              className='inputField mediumInput loginForm'
              label={'Password'}
            >
              <input className='field' type='email' required />
            </InputField>
          </div>
        </div>

        <CookButton
          label='Log In'
          enable={true}
          color='yellow'
          size='meduim'
          onClick={() => console.log('CookButton clicked')}
        />

        <div className=''>
          <Link to='/forgot-password' className='form-link'>
            Forgot Password?
          </Link>
        </div>
      </div>
      <div className=''>
        Need an account?{' '}
        <Link to='/signup' className='form-link'>
          Sign Up
        </Link>
      </div>
    </div>
  )
}
