import { useState } from 'react'
import Display from './components/Display'
import NewPersonForm from './components/NewPersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

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