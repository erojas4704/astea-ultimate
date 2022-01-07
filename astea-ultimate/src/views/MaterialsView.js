import { useMaterials } from "../hooks/serviceOrderHooks";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";

const MaterialsView = ({ materialsData }) => {
    //const { materials, loading, error } = useMaterials(serviceOrder);
    if(!materialsData){
        console.log(materialsData);
        return <>No material data available.</>
    }
    const {materials, status, error} = materialsData;
    const loading = status === "pending";

    return (
        <>
            <div className="label">Materials</div>
            {loading && <div>Loading...</div>}
            {error && <div className="error">{error.toString()}</div>}
            {materials && materials.map(material => (
                <div className="material" key={uuid()}>
                    <div className="material-partnumber">
                        {material.sourceDocument ? <Link to={`/Product?id=${material.id}`}>{material.id} </Link> : <span>{material.id}</span>}
                    </div>
                    <div className="material-name">{material.name}</div>
                </div>
            ))}
        </>
    );
}

export default MaterialsView;