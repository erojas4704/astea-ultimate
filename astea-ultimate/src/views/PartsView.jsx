import Search from "../components/Search";

const PartsView = () => {
    const columns = [
        { label: 'Part', key: 'id' }
    ]

    const onSearchSubmit = (search) => {
        console.log("Submitted", search);
    }

    const onSearchChange = (change) => {
        console.log("Change", change);
    }

    return (
        <>
            <Search
                handleSubmit={onSearchSubmit}
                handleChange={onSearchChange}
                placeholder="SP-"
            >
                <button className="btn btn-primary">Search</button>
            </Search>
        </>
    )
}

export default PartsView;