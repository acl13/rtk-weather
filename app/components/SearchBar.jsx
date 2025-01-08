const SearchBar = ({city, onChange, onSearch}) => {
  return (
<form>
<input type='text' onChange={onChange} value={city}></input>
<button type='button' onClick={onSearch}>Search</button>
</form>
  )
}

export default SearchBar