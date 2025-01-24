import { useSelector } from "react-redux"

const SearchBar = ({city, onChange, onSearch}) => {
  const isLoading = useSelector((state) => state.weather.isLoading);
  return (
<form className="mt-5 p-2">
  <div className="form-group d-flex">
      <input type='text' onChange={onChange} value={city} placeholder="Get a five day forecast in your favorite cities" className="form-control"></input>
      {isLoading ? <button type='button'  className="btn btn-primary">Loading</button> : <button type='button' onClick={onSearch} className="btn btn-primary">Search</button>}
  </div>

</form>
  )
}

export default SearchBar