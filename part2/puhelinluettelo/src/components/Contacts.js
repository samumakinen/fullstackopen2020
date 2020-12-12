const Contacts = (props) => {
  return (
    <ul>
      {props.array.map(person => 
        <li key={person.key}>{person.key} {person.number}</li>
      )}
    </ul>
  )
}

export default Contacts