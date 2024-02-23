const Filter = ({ filter, setFilter }) => {
    return (
        <div>
            find countries:
            <input
                name="filter"
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
            />
        </div>
    )
}

export default Filter