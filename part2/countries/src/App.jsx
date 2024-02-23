import { useState, useEffect, useRef } from 'react'

import countryService from './services/countries'

import CountriesList from './components/CountriesList'
import OneCountry from './components/OneCountry'
import Filter from './components/Filter'

const App = () => {
  const [nameFilter, setNameFilter] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])

  const countriesData = useRef([])

  useEffect(() => {
    countryService
      .getAll()
      .then((data) => {
        countriesData.current = data.map((country) => {
          return !data ? null :
            {
              name: country.name.common,
              capitals: country.capital,
              area: country.area,
              languages: country.languages,
              flagUrl: country.flags.png,
              flagAlt: country.flags.alt
            }
        })
        if (countriesData.current) {
          console.log(`Countries data initialized`)
        }
      })
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    if (countriesData.current) {
      setFilteredCountries(countriesData.current.filter((country) => {
        return country.name.toLowerCase().includes(nameFilter.toLowerCase())
      }))
    }
  }, [nameFilter])

  const display = () => {
    if (!filteredCountries) {
      return null
    }
    if(filteredCountries.length > 10) {
      return (
        <div>
          <p>Too many matches, specify another filter</p>
        </div>
      )
    }
    if (filteredCountries.length === 1) {
      return (
        <OneCountry country={filteredCountries[0]} />
      )
    }
    return (
      <CountriesList countries={filteredCountries} setCountries={setFilteredCountries} />
    )
  } 

  return (
    <div>
      <Filter filter={nameFilter} setFilter={setNameFilter} />
      {display()}
    </div>
  )
}

export default App