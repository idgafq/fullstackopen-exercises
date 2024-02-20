import { useEffect, useState } from 'react'
import axios from 'axios'

import Display from './components/Display'
import NewPersonForm from './components/NewPersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((response) => setPersons(response.data))
  }, [])

  const personsToShow = (nameFilter === '') ? persons : persons.filter((person) => {
    return person.name.toLowerCase().includes(nameFilter.toLowerCase())
  })

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons(persons.concat({ name: newName, number: newNumber }))
    setNewName('')
    setNewNumber('')  
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
      <Display persons={personsToShow} />
    </div>
  )
}

export default App