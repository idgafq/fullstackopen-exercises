const Display = ({ persons }) => {
    return(
      <ul style={{ listStyle:'none', paddingLeft:0 }}>
        {persons.map((person) => 
          <li key={person.name}>{person.name} {person.number}</li>
        )}
      </ul>
    )
}

export default Display