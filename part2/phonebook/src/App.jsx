import { useEffect, useState } from 'react'

import personService from './services/persons'
import './App.css'

import Person from './components/Person'
import NewPersonForm from './components/NewPersonForm'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [message, setMessage] = useState('')
  const [gotError, setGotError] = useState(false)

  useEffect(() => {
    personService
      .getAll()
      .then((data) => {
        setPersons(data)
        displayMessage({ message: `Program initializedd`, delay: 5000 })
      })
      .catch((err) => console.log(err))
  }, [])

  const personsToShow = (nameFilter === '') ? persons : persons.filter((person) => {
    return person.name.toLowerCase().includes(nameFilter.toLowerCase())
  })

  const addPerson = (event) => {
    event.preventDefault()
    const samePerson = persons.find((person) => person.name === newName)
    if (samePerson) {
      const changedPerson = { ...samePerson, number: newNumber }
      if (window.confirm(`${samePerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(changedPerson.id, changedPerson)
          .then((data) => {
            setPersons(persons.map((p) => p.id !== data.id ? p : data))
            displayMessage({ message: `Changed ${data.name}'s number to ${data.number}`, delay: 5000 })
          })
        setNewName('')
        setNewNumber('')
      }
      return
    }
    
    personService
      .create({name: newName, number: newNumber})
      .then((data) => {
        setPersons(persons.concat(data))
        displayMessage({ message: `Added ${data.name}`, delay: 5000 })
      })
      .catch((err) => console.log(err))
    setNewName('')
    setNewNumber('')
  }

  const removePerson = (id) => {
    if (window.confirm(`Delete ${persons.find((person) => person.id === id).name}?`)) {
      personService
        .remove(id)
        .then((data) => displayMessage({ message: `Deleted ${data.name}`, delay: 5000 }))
        .catch((err) => {
          console.log(err)
          setGotError(true)
          displayMessage(
            {
              message: `Information of ${persons.find((person) => person.id === id).name} has already been removed from server`,
              delay: 5000
            })
        })
      setPersons(persons.filter((person) => person.id !== id))
    }
  }

  const displayMessage = ({ message, delay }) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
      setGotError(false)
    }, delay)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} isError={gotError} />
      <Filter name='name' filter={nameFilter} setFilter={setNameFilter} />

      <h3>Add a new</h3>
      <NewPersonForm
        newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} addPerson={addPerson}
      />

      <h3>Numbers</h3>
      <ul style={{ listStyle:'none', paddingLeft:0 }}>
        {personsToShow
          .map((person) =>
            <Person key={person.id} person={person} remove={() => removePerson(person.id)} />)
        }
      </ul>
    </div>
  )
}

export default App