import { useEffect, useState } from "react";
import Api from "../api";
import NavTable from "../components/NavTable";
import SearchForm from "../components/SearchForm";
import AddButton from "../components/AddButton";
import { useMatch } from "react-router-dom";

const PartsView = () => { //TODO rename to MaterialsView
    const currentPathIsOrder = useMatch('/astea/ServiceOrder/:id');
    const [materials, setMaterials] = useState([]);

    const addToServiceOrder = (data) => {
        //Add a part to the service order if it's currently open.
        console.log("Need to add part to order ", data);
        //Maybe add a modal?
    }

    const onSearchSubmit = (search) => {
        console.log("Submitted", search);
    }

    const onSearchChange = (change) => {
        console.log("Change", change);
    }

    useEffect(() => {
        (async () => {
            const materials = await Api.searchMaterials({ id: 'SP-' }, false);
            setMaterials(materials);
        })();
    }, [])

    const columns = [
        { label: 'Part', key: 'id', width: "20%", route: `astea/material/{id}` },
        { label: 'Search Key', key: 'searchKey', width: "20%" },
        { label: 'Price', key: 'price', width: "10%", className: "text-danger" }, //TODO a way to format the text
        { label: 'Description', key: 'description' },
    ];

    if (currentPathIsOrder) //Add a button to add a part to the service order if one is currently open.
        columns.push({ content: <AddButton />, width: "5%", onClick: addToServiceOrder });

        //Removed route so that it doesn't go to the part detail page. under NavTable route="astea/materials/{id}"
    return (
        <>
            <SearchForm
                handleSubmit={onSearchSubmit}
                handleChange={onSearchChange}
                placeholder="Part Number">
            </SearchForm>
            <NavTable columns={columns} data={materials}  />
        </>
    )
}

export default PartsView;