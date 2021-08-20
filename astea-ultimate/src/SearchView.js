import axios from "axios";
import moment from "moment";
import "./SearchView.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { capitalizeNames, nameToInitials } from "./Helpers/StringUtils";

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
                    <colgroup>
                        <col />
                        <col />
                        <col className="col-name"/>
                        <col/>
                    </colgroup>  
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tech</th>
                            <th className="col-name">Customer</th>
                            <th>Opened</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map(result => <tr key={result.id}>
                            <td>
                                <Link to={{ pathname: `/astea/ServiceOrder/${result.id}`, state: { data: result } }} >{result.id}</Link>
                            </td>
                            <td>{nameToInitials(result.technician?.name) || ""}</td>
                            <td className="col-name">{capitalizeNames(result.customer?.name) || capitalizeNames(result.caller?.name) || capitalizeNames(result.company?.name) || ""}</td>
                            <td>{moment(result.openDate).format("MM/DD/yy")}</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SearchView;