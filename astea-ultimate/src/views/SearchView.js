import "./SearchView.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { resetSearch, search } from "../actions/locator";
import { search } from "../reducers/locatorSlice";

import OrderListing from "../components/OrderListing";
import HistoryInput from "../components/HistoryInput";

const SearchView = () => {
    const {results, status} = useSelector(state => state.locator);

    const dispatch = useDispatch();
    const [searchInput, setSearchInput] = useState("");
    const [includeHistory, setIncludeHistory] = useState(false);
    const [selected, setSelected] = useState(useParams().id || '');

    //TODO maybe a search hook that simplifies all this crap

    //useEffect(() => {
    //    dispatch(resetSearch());
    //}, [dispatch]);

    const changeHandler = evt => {
        setSearchInput(evt.target.value);
        //TODO maybe filter the current results based on what's here?
    };

    const historyChangeHandler = value => {
        setIncludeHistory(value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        //TODO dynamically build up the search based on input
        dispatch(search({
            query: { all: searchInput },
            includeHistory
        }));
        //TODO call a method to get a cached search result if the search is redudant while we wait for the newer results.
    }


    return (
        <div className="search-view" style={{ height: '100%' }}>
            <form onSubmit={handleSubmit} className="form-inline">
                <div className="input-group ">
                    <input type="text"
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
                        {results.map(result =>
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