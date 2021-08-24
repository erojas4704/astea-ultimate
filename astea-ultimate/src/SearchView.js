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
    const [selected, setSelected] = useState(null);

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
                <label htmlFor="search" className="search-label mr-2">Search: </label>
                <input type="text" name="search" id="search" placeholder="Search for Service Order" onChange={changeHandler} disabled={searching} />
            </form>
            <div className="results">
                <table className="results-table table table-hover table-sm">
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
                        {results.map(result => 
                        <tr key={result.id}
                            className={result.inHistory==="Y"?'in-history':''}
                            style={selected===result.id?{backgroundColor: '#fff1db'}:null}>
                            <td>
                                <Link onClick={() => setSelected(result.id)} to={{ pathname: `/astea/ServiceOrder/${result.id}`, state: { data: result } }} >{result.id}</Link>
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