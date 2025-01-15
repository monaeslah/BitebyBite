import { useState } from 'react'
import axios from 'axios'
import InputField from '../components/common/inputField'
import { CookButton } from '../components/common/buttons'
import { useNavigate } from 'react-router-dom'
import spoon from '../assets/icons/lglogo.jpeg'
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
  }

  return <div className='page'></div>
}

export default LoginPage
