import InputField from './common/inputField'
const SearchBar = ({ query, setQuery }) => {
  return (
    <div id='searchbar'>
      <InputField
        className='inputField xlargeInput'
        // label={field.charAt(0).toUpperCase() + field.slice(1)}
      >
        <input
          type='text'
          className='search-bar'
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder='search your food name here '
        />
      </InputField>
    </div>
  )
}

export default SearchBar
