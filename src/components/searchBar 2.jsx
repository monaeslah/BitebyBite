const SearchBar = ({ query, setQuery }) => {
  return (
    <div>
      <div>
        <div>
          <span>Search</span>
        </div>
        <input
          type='text'
          className='search-bar'
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>
    </div>
  )
}

export default SearchBar
