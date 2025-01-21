const SearchBar = ({city, onChange, onSearch}) => {
  return (
<form className="mt-5">
  <div className="form-group d-flex">
      <input type='text' onChange={onChange} value={city} placeholder="Get a five day forecast in your favorite cities" className="form-control"></input>
      <button type='button' onClick={onSearch} className="btn btn-primary">Search</button>
  </div>

</form>
  )
}

export default SearchBar