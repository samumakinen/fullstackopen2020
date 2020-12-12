import React, { useState, useEffect } from 'react'
import Contacts from './Contacts'
import Search from './Search'
import AddContact from './AddContact'

const App = () => {
  const [ persons, setPersons] = useState([
    { key: 'Arto Hellas', number: '' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState(persons)

  const addName = (event) => {
    event.preventDefault()
    if (persons.some(x => x.key === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const person = {
        key: newName,
        number: newNumber
      }
  
      setPersons(persons.concat(person))
      // tuo alempi rivi piti tehdä noin oudosti, koska muuten searchResults -taulukko oli "aina yhden olion jäljessä", 
      // eli ruudulle päivittyi uusi yhteystieto vasta kun hakupalkkiin koski tai lisäsi seuraavan yhteystiedon, jolloin edellisenä lisätty tuli näkyviin.
      // en keksinyt parempaa tapaa tai löytänyt netistä, saa kertoa jos sellainen on.
      setSearchResults(searchResults.concat(person))
      setNewName('')
      setNewNumber('')
      setSearchTerm('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  useEffect(() => {
    const results = persons.filter(person =>
      person.key.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setSearchResults(results)
  }, [searchTerm])

  return (
    <div>
      <h2>Phonebook</h2>
      <Search value={searchTerm} onChange={handleSearch} />
      <h2>Add a new contact</h2>
      <AddContact onSubmit={addName} nameValue={newName} nameOnChange={handleNameChange} numberValue={newNumber} numberOnChange={handleNumberChange}/>
      <h2>Contacts</h2>
      <Contacts array={searchResults} />
    </div>
  )
}

export default App