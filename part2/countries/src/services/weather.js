import axios from 'axios'

const geoCodeUrl = (city) => `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`
const weatherUrl = (latitude, longitude) => `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m`
const openWeatherIconUrl = (wwCode, dOrN) => `https://openweathermap.org/img/wn/${codeTranslation(wwCode)}${dOrN}@2x.png`

const codeTranslation = (wwCode) => {
    switch (wwCode) {
        case (0):
            return '01'
        case (1):
            return '02'
        case (2):
            return '03'
        case (3):
            return '04'
        case (45 || 48):
            return '50'
        case (51 || 53 || 55):
            return '09'
        case (56 || 57):
            return '13'
        case (61 || 63 || 65):
            return '10'
        case (66 || 67):
            return '13'
        case (71 || 73 || 75):
            return '13'
        case (77):
            return '13'
        case (80 || 81 || 82):
            return '09'
        case (85 || 86):
            return '13'
        case (95):
            return '11'
        case (96 || 99):
            return '11'
        default:
            return '01'
    }
}

const dayOrNight = (hours) => {
    if (hours > 6 && hours < 20) {
        return 'd'
    }
    return 'n'
}

const getWeather = (city) => {
    return axios
        .get(geoCodeUrl(city))
        .then((res) => res.data.results[0])
        .then(({ latitude, longitude }) => axios.get(weatherUrl(latitude, longitude)))
        .then((res) => res.data.current)
        .then((current) => {
            return {
                temperature: current.temperature_2m,
                iconUrl: openWeatherIconUrl(current.weather_code, dayOrNight(parseInt(current.time.slice(11,13)))),
                windSpeed: current.wind_speed_10m
            }
        })
}

export default { getWeather }