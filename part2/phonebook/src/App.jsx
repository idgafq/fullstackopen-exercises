import { useEffect, useState } from 'react'

import personService from './services/persons'

import Person from './components/Person'
import NewPersonForm from './components/NewPersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then((allPersons) => setPersons(allPersons))
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
          .then((res) => setPersons(persons.map((p) => p.id !== res.id ? p : res)))
        setNewName('')
        setNewNumber('')
      }
      return
    }
    
    personService
      .create({name: newName, number: newNumber})
      .then((addedPerson) => setPersons(persons.concat(addedPerson)))
      .catch((err) => console.log(err))
    setNewName('')
    setNewNumber('')
  }

  const removePerson = (id) => {
    if (window.confirm(`Delete ${persons.find((person) => person.id === id).name}?`)) {
      personService
        .remove(id)
        .catch((err) => console.log(err))
      setPersons(persons.filter((person) => person.id !== id))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

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