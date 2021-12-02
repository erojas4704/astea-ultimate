import axios from "axios";
import moment from "moment";
import "./SearchView.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { capitalizeNames, nameToInitials } from "../helpers/StringUtils";
import { useDispatch, useSelector } from "react-redux";
import { resetSearch, search } from "../actions/locator";

const SearchView = () => {
    const results = useSelector(state => state.locator.data);
    const searchCriteria = useSelector(state => state.locator.searchCriteria);
    const loading = useSelector(state => state.locator.loading);
    const error = useSelector(state => state.locator.error);
    const getCachedSearch = useSelector(state => state.locator.getCachedSearch);

    const dispatch = useDispatch();
    const [searchInput, setSearchInput] = useState("");
    const [includeHistory, setIncludeHistory] = useState(false);
    const [selected, setSelected] = useState(useParams().id || '');

    useEffect(() => {
        dispatch(resetSearch());
    }, [dispatch]);

    const changeHandler = evt => {
        setSearchInput(evt.target.value);
    };

    const historyChangeHandler = evt => {
        setIncludeHistory(evt.target.checked);
    };

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(search(searchInput, includeHistory));
    }

    /*
    const doSearch = async searchTerm => {
        setSearching(true);
        const params = {
            all: searchTerm,
            actionGroup: "QNTech"
        }
        if(!includeHistory){
            params.inHistory = "N";
        }
        s
        const resp = await axios.get('/ServiceOrder/search', {
            params
        });

        cacheSearch(params, resp.data);
        setResults(resp.data);
        setSearching(false);
    }
    */

    return (
        <div className="search-view" style={{ height: '100%' }}>
            <form onSubmit={handleSubmit} className="form-inline">
                <div className="input-group ">
                    <input type="text" className=" form-control rounded-pill m-1" name="search" id="search" placeholder="Search by name or SV number" value={searchInput} onChange={changeHandler} disabled={loading} />
                    <label className="form-check-label mx-2 my-auto">
                        <input onChange={historyChangeHandler} type="checkbox" className="form-check-input" name="includeHistory" value="" selected={includeHistory} /> History
                    </label>
                </div>
            </form>
            <div className="results">
                <table className="results-table table table-hover table-sm">
                    <colgroup>
                        <col />
                        <col />
                        <col className="col-name" />
                        <col />
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
                                className={result.inHistory === "Y" ? 'in-history' : ''}
                                style={selected === result.id ? { backgroundColor: '#fff1db' } : null}>
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