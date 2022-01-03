import { useEffect, useState } from "react";
import Api from "../api";
import NavTable from "../components/NavTable";
import SearchForm from "../components/SearchForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddButton from "../components/AddButton";
import { useMatch } from "react-router-dom";

const PartsView = () => {
    const currentPathIsOrder = useMatch('/astea/ServiceOrder/:id');
    const [materials, setMaterials] = useState([]);

    const addToServiceOrder = (data) => {
        //Add a part to the service order if it's currently open.
    }

    const onSearchSubmit = (search) => {
        console.log("Submitted", search);
    }

    const onSearchChange = (change) => {
        console.log("Change", change);
    }

    useEffect(() => {
        (async () => {
            const materials = await Api.searchMaterials({ id: 'TM-' }, true);
            setMaterials(materials);
        })();
    }, [])

    const columns = [
        { label: 'Part', key: 'id', width: "20%", route: `astea/material/{id}` },
        { label: 'Search Key', key: 'searchKey', width: "20%" },
        { label: 'Description', key: 'description' },
    ];

    if (currentPathIsOrder) //Add a button to add a part to the service order if one is currently open.
        columns.push({ content: <AddButton />, width: "5%", onClick: addToServiceOrder });

    return (
        <>
            <SearchForm
                handleSubmit={onSearchSubmit}
                handleChange={onSearchChange}
                placeholder="Part Number">
            </SearchForm>
            <NavTable columns={columns} data={materials} route="astea/materials/{id}" />
        </>
    )
}

export default PartsView;