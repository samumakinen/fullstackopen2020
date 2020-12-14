const Contacts = (props) => {
  return (
    <ul>
      {props.persons.map(person => 
        <li key={person.id}><button onClick={() => props.onClick(person)}>delete</button> {person.name} {person.number}</li>
      )}
    </ul>
  )
}

export default Contacts