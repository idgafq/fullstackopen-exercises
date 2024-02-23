import { useState, useEffect } from 'react'
import weatherService from '../services/weather'

const OneCountry = ({ country }) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        weatherService
            .getWeather(country.capitals[0])
            .then((weather) => {
                setWeather(weather)
            })
            .catch((err) => console.log(err))
    }, [country])

    const weatherDisplay = () => {
        if (!weather) {
            return null
        }
        return (
            <div>
                <p>temperature {weather.temperature} Celcius</p>
                <img src={weather.iconUrl} />
                <p>wind {(weather.windSpeed * 5 / 18).toFixed(2)} m/s</p>
            </div>
        )
    }

    return (
        <div>
            <h1>{country.name}</h1>
            <p>
                capital {country.capitals.join(' ')}<br />
                area {country.area}
            </p>
            <b>languages:</b>
            <ul>
                {Object.entries(country.languages).map(([key, value]) => {
                    return <li key={key}>{value}</li>
                })}
            </ul>
            <img src={country.flagUrl} alt={country.flagAlt} width={200} />
            <h2>Weather in {country.capitals[0]}</h2>
            {weatherDisplay()}
        </div>
    )
}

export default OneCountry