const Search = (props) => {
  return (
    <div>
      Search name: <input value={props.value} onChange={props.onChange} />
    </div>
  )
}

export default Search