import { useState } from 'react'
import axios from 'axios'
import InputField from '../components/common/InputField'

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' })

  const handleChange = e => {
    const { name, value } = e.target
    setCredentials(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    axios
      .post('/login', credentials)
      .then(res => {
        console.log('Login successful:', res.data)
      })
      .catch(err => {
        console.error('Login error:', err)
      })
  }

  return (
    <div className='login-form'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <InputField label='Email'>
          <input
            type='email'
            name='email'
            value={credentials.email}
            onChange={handleChange}
            placeholder='Enter email'
          />
        </InputField>
        <InputField label='Password'>
          <input
            type='password'
            name='password'
            value={credentials.password}
            onChange={handleChange}
            placeholder='Enter password'
          />
        </InputField>
        <button type='submit' className='submit-btn'>
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginPage
