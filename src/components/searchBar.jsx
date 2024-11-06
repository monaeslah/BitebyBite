import InputField from './common/inputField'
const SearchBar = ({ query, setQuery }) => {
  return (
    <div>
      <div>
        <div>
          <span>Search</span>
        </div>
        <InputField
          className='inputField xlargeInput'
          // label={field.charAt(0).toUpperCase() + field.slice(1)}
        >
          <input
            type='text'
            className='search-bar'
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </InputField>
      </div>
    </div>
  )
}

export default SearchBar
