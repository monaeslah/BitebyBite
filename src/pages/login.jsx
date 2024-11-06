import React, { useRef, useState } from 'react'
import { Form, Card, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import InputField from '../components/common/inputField'

import { CookButton } from '../components/common/buttons'

export default function Login () {
  const emailRef = useRef()
  const passwordRef = useRef()

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
            <input className='field' type='email' ref={emailRef} required />
          </InputField>
        </div>
        <Form.Group id='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            className='field'
            type='password'
            ref={passwordRef}
            required
          />
        </Form.Group>

        <CookButton
          label='Log In'
          enable={true}
          color='yellow'
          size='meduim'
          onClick={() => console.log('CookButton clicked')}
        />

        <div className='w-100 text-center mt-3'>
          <Link to='/forgot-password' className='form-link'>
            Forgot Password?
          </Link>
        </div>
      </div>
      <div className='w-100 text-center mt-2'>
        Need an account?{' '}
        <Link to='/signup' className='form-link'>
          Sign Up
        </Link>
      </div>
    </div>
  )
}
