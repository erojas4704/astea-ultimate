import axios from "axios";
import moment from "moment";
import "./SearchView.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const SearchView = () => {
    const [results, setResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searching, setSearching] = useState(false);

    const changeHandler = evt => {
        setSearchTerm(evt.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault()
        doSearch(searchTerm);
    }

    const doSearch = async searchTerm => {
        setSearching(true);
        const resp = await axios.get('/ServiceOrder/search', {
            params: {
                all: searchTerm,
                actionGroup: "QNTech"
            }
        });
        console.log(resp.data);
        setResults(resp.data);
        setSearching(false);
    }

    return (
        <div className="search-view">
            <form onSubmit={handleSubmit}>
                <label htmlFor="search" className="search-label">Search</label>
                <input type="text" name="search" id="search" placeholder="Search for Service Order" onChange={changeHandler} disabled={searching} />
            </form>
            <div className="results">
                <table className="results-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Technician</th>
                            <th>Customer</th>
                            <th>Open Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map(result => <tr key={result.id}>
                            <td><Link to={`/ServiceOrder?id=${result.id}`}>{result.id}</Link></td>
                            <td>{result.technician?.name || "Unassigned"}</td>
                            <td>{result.customer?.name || result.caller?.name || result.company?.name || ""}</td>
                            <td>{moment(result.openDate).format("MM/DD/yy")}</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SearchView;