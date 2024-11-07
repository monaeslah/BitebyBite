import { useState } from 'react'
import axios from 'axios'
import InputField from '../components/common/inputField'
import { CookButton } from '../components/common/buttons'
import { useNavigate } from 'react-router-dom'
const LoginPage = ({ setAuth }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const navigate = useNavigate()
  const handleChange = e => {
    const { name, value } = e.target
    setCredentials(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    setAuth(true)
    navigate('/my-recipes')
    // axios
    //   .post('/login', credentials)
    //   .then(res => {
    //     console.log('Login successful:', res.data)
    //   })
    //   .catch(err => {
    //     console.error('Login error:', err)
    //   })
  }

  return (
    <div className='page'>
      <div className='login-form'>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <InputField label='Email' className='inputField largeInput'>
            <input
              type='email'
              name='email'
              value={credentials.email}
              onChange={handleChange}
              placeholder='Enter email'
            />
          </InputField>
          <InputField label='Password' className='inputField largeInput'>
            <input
              type='password'
              name='password'
              value={credentials.password}
              onChange={handleChange}
              placeholder='Enter password'
            />
          </InputField>

          <CookButton
            onClick={handleSubmit}
            label='Login'
            enable={true}
            size='small'
            className={'primary-btn submit-btn'}
          />
        </form>
      </div>
    </div>
  )
}

export default LoginPage
