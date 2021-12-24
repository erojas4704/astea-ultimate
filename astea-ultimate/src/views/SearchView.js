import moment from "moment";
import "./SearchView.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { capitalizeNames, nameToInitials } from "../helpers/StringUtils";
import { useDispatch, useSelector } from "react-redux";
import { resetSearch, search } from "../actions/locator";
import OrderListing from "../components/OrderListing";

const SearchView = () => {
    const results = useSelector(state => state.locator.data);
    const loading = useSelector(state => state.locator.loading);
    const orders = useSelector(state => state.orders);

    const dispatch = useDispatch();
    const [searchInput, setSearchInput] = useState("");
    const [includeHistory, setIncludeHistory] = useState(false);
    const [selected, setSelected] = useState(useParams().id || '');

    //TODO maybe a search hook that simplifies all this crap

    useEffect(() => {
        dispatch(resetSearch());
    }, [dispatch]);

    const changeHandler = evt => {
        setSearchInput(evt.target.value);
        //TODO maybe filter the current results based on what's here?
    };

    const historyChangeHandler = evt => {
        setIncludeHistory(evt.target.checked);
    };

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(search(searchInput, includeHistory));
        //TODO call a method to get a cached search result if the search is redudant while we wait for the newer results.
    }


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
                            <OrderListing
                                selected={selected === result.id}
                                onSelect={() => setSelected(result.id)} key={result.id} 
                                order={orders[result.id]?.order || result}
                            />
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SearchView;