import { useEffect, useState } from "react";

const useSearch = () => {
    const [searchData, setSearchData] = useState({});

    const cacheSearch = (query, data) => {
        localStorage.setItem('search', JSON.stringify({query, data}));
    };

    useEffect(() => {
        setSearchData(JSON.parse(localStorage.getItem('search') || '{}'));
    }, []);



    return { cacheSearch, searchData };
}

export default useSearch;