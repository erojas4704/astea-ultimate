import { useEffect, useState } from "react";
import Api from "../api";
import NavTable from "../components/NavTable";
import SearchForm from "../components/SearchForm";

const PartsView = () => {
    const columns = [
        { label: 'Part', key: 'id', width: "20%", link: true },
        { label: 'Search Key', key: 'searchKey', width: "20%"  },
        { label: 'Description', key: 'description' }
    ]

    const onSearchSubmit = (search) => {
        console.log("Submitted", search);
    }

    const onSearchChange = (change) => {
        console.log("Change", change);
    }

    const [materials, setMaterials] = useState([]);
    useEffect(() => {
        (async () => {
            const materials = await Api.searchMaterials({ id: 'TM-' }, true);
            console.log(materials);
            setMaterials(materials);
        })();
    }, [])


    return (
        <>
            <SearchForm
                handleSubmit={onSearchSubmit}
                handleChange={onSearchChange}
                placeholder="Part Number">
            </SearchForm>
            <NavTable columns={columns} data={materials} route="astea/material/"/>
        </>
    )
}

export default PartsView;