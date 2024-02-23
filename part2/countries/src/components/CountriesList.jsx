const CountriesList = ({ countries, setCountries }) => {
    return (
        <div>
            <ul style={{ listStyle:'none', paddingLeft:0 }}>
                {countries.map((country) => {
                    return (
                        <li key={country.name}>
                            {country.name}
                            <button onClick={() => setCountries([country])}>show</button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default CountriesList