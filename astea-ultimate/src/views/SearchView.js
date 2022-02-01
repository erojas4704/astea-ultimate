import "./SearchView.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { resetSearch, search } from "../actions/locator";
import { resetSearch, search } from "../reducers/locatorSlice";

import OrderListing from "../components/OrderListing";
import HistoryInput from "../components/HistoryInput";

const filterByAny = (results, criteria) => {
    //TODO this is a potentially extremely expensive and needlessly greedy operation.
    //Check to see if any of the fields in every result match the criteria.
    criteria = criteria.toLowerCase().trim().replace(/\s+/g, "");
    const filteredResults = [];



    function matchesCriteria(val) {
        if (typeof val === "string" && val.toLowerCase().trim().includes(criteria))
            return true;
        if (typeof val === "object") {
            for (const key in val) {
                if (matchesCriteria(val[key])) return true;
            }
        }
    }

    //O(n)^2 for now. TODO
    Object.values(results).forEach(result => {
        Object.values(result).some(val => {
            if (matchesCriteria(val)) {
                filteredResults.push(result);
                return true;
            }
        });
    });
    return filteredResults;
}


const SearchView = () => {
    const { results, status } = useSelector(state => state.locator);

    const dispatch = useDispatch();
    const [searchInput, setSearchInput] = useState("");
    const [includeHistory, setIncludeHistory] = useState("");
    const [selected, setSelected] = useState(useParams().id || '');
    const [filtered, setFiltered] = useState([]);
    const orderSummaries = useSelector(state => state.locator.summaries);

    useEffect(() => {
        dispatch(resetSearch());
    }, []);


    //TODO maybe a search hook that simplifies all this crap

    const changeHandler = evt => {
        setSearchInput(evt.target.value);
        // if (evt.target.value.length > 1) { //TODO remove magic number
        //     setFiltered(filterByAny(orderSummaries, evt.target.value));
        // } else {
        //     setFiltered([]);
        // }
    };

    const historyChangeHandler = value => {
        setIncludeHistory(value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        setFiltered([]);
        //TODO dynamically build up the search based on input
        //TODO get action group from auth
        dispatch(search({
            all: searchInput,
            actionGroup: "QNTech",
            inHistory: includeHistory || null,
        }));
        //TODO need error handling otherwise the field will freeze forever.
        //TODO call a method to get a cached search result if the search is redudant while we wait for the newer results.
    }

    const finalResults = filtered.length > 0 ? filtered : results;

    return (
        <div className="search-view" style={{ height: '100%' }}>
            <form onSubmit={handleSubmit} className="form-inline">
                <div className="input-group ">
                    <input type="text"
                        autoComplete="off"
                        className="form-control rounded-pill m-1"
                        name="search"
                        id="search"
                        placeholder="Search by name or SV number"
                        value={searchInput}
                        onChange={changeHandler}
                        disabled={status === "pending"}
                    />
                    <HistoryInput name="includeHistory" onChange={historyChangeHandler} />
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
                        {finalResults.map(result =>
                            <OrderListing
                                selected={selected === result.id}
                                onSelect={() => { setSelected(result.id) }}
                                key={result.id}
                                order={result}
                            />
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SearchView;