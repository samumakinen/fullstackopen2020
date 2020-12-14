import React, { useState, useEffect } from 'react'
import personService from '../services/persons'
import Contacts from './Contacts'
import Search from './Search'
import AddContact from './AddContact'
import Notification from './Notification'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchTerm, setSearchTerm ] = useState('')
  const [ notificationMessage, setNotificationMessage ] = useState()
  const [ notificationClass, setNotificationClass ] = useState()

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  

  const addName = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }

    const existingPerson = persons.filter(x => x.name.toLocaleLowerCase() === newPerson.name.toLowerCase())

    if (existingPerson.length > 0) {
      if (window.confirm(`${newName} is already added to phonebook, would you like to replace the old number ${existingPerson[0].number} with the new one?`)) {
        personService.update(existingPerson[0].id, newPerson)
          .then(response => {
              setPersons(persons.map(x => x.id !== response.data.id ? x : response.data))
              setNewName('')
              setNewNumber('')
              setNotificationMessage(`Number for ${response.data.name} updated!`)
              setNotificationClass(`notification-success`)
              setTimeout(() => {
                setNotificationMessage(null)
                setNotificationClass(null)
              }, 5000)
          }).catch(error => {
            console.log(error)
            setNotificationMessage(`Something went wrong! Please refresh the page and try again.`)
            setNotificationClass(`notification-error`)
            setTimeout(() => {
              setNotificationMessage(null)
              setNotificationClass(null)
            }, 5000)
          })
      }
    } else {
    personService.create(newPerson)
      .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          setNotificationMessage(`${response.data.name} was added to the phonebook!`)
          setNotificationClass(`notification-success`)
          setTimeout(() => {
            setNotificationMessage(null)
            setNotificationClass(null)
          }, 5000)
        }).catch(error => {
          console.log(error)
          setNotificationMessage(`Something went wrong! Please refresh the page and try again.`)
          setNotificationClass(`notification-error`)
          setTimeout(() => {
            setNotificationMessage(null)
            setNotificationClass(null)
          }, 5000)
        })
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
  
  const onClickDelete = (person) =>  {
    if (window.confirm(`Are you sure you want to delete ${person.name} from the phonebook?`)) {
      personService.remove(person.id).then(response => {
          setPersons(persons.filter(x => x.id !== person.id))
          setNotificationMessage(`${person.name} was deleted from the phonebook!`)
          setNotificationClass(`notification-success`)
          setTimeout(() => {
            setNotificationMessage(null)
            setNotificationClass(null)
          }, 5000)
      }).catch(error => {
        console.log(error)
        setNotificationMessage(`Something went wrong! Please refresh the page and try again.`)
        setNotificationClass(`notification-error`)
        setTimeout(() => {
          setNotificationMessage(null)
          setNotificationClass(null)
        }, 5000)
      })
    }
  }

  const searchResults = () => {
    return persons.filter(x => x.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()))
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notificationMessage} class={notificationClass} />
      <Search keyvalue={searchTerm} onChange={handleSearch} />
      <h2>Add a new contact</h2>
      <AddContact onSubmit={addName} nameValue={newName} nameOnChange={handleNameChange} numberValue={newNumber} numberOnChange={handleNumberChange}/>
      <h2>Contacts</h2>
      <Contacts persons={searchResults()} onClick={onClickDelete} />
    </div>
  )
}

export default App