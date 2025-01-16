import React from 'react'
import Select from 'react-select'

const CountrySelect = ({ selectedCountry, onCountryChange }) => {
  // لیست کشورها
  const countries = [
    { value: 'US', label: 'United States' },
    { value: 'FR', label: 'France' },
    { value: 'IR', label: 'Iran' },
    { value: 'DE', label: 'Germany' },
    { value: 'JP', label: 'Japan' },
    { value: 'IN', label: 'India' },
    { value: 'CN', label: 'China' }
  ]

  return (
    <div className='country'>
      <label>Select Country:</label>
      <Select
        options={countries}
        value={selectedCountry}
        onChange={onCountryChange}
        placeholder='Choose a country...'
        isClearable
      />
    </div>
  )
}

export default CountrySelect
