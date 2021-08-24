import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./OrderView.css";
import moment from "moment";
import { useParams } from "react-router-dom";
import { capitalizeNames } from "./Helpers/StringUtils";
import { useServiceOrder } from "./hooks/serviceOrderHooks";
import useTechnicians from "./hooks/useTechnicians";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import InteractionsView from "./InteractionsView";

const ServiceOrder = (props) => {
    const params = useParams();
    const id = params.id;
    const { technicians, isLoadingTechnicians } = useTechnicians();
    const { serviceOrder, isLoading, error } = useServiceOrder(id, props);


    return (
        <div className="sv-view" style={{ paddingTop: "14px" }}>
            <div style={{ textAlign: "left", marginBottom: "14px" }} className="divider">Order {id} {isLoading ? <FontAwesomeIcon className="fa-spin sv-spinner" icon={faCircleNotch} /> : ''}</div>
            {serviceOrder && (
                <div className="order-details">
                    <div className="order-col" style={{ flexGrow: "1", marginBottom: "2px" }}>
                        <div className="order-row">
                            <h4 className="customer-name">{capitalizeNames(serviceOrder.caller?.name || serviceOrder.customer?.name)}</h4>
                        </div>
                        <div className="order-row">
                            <div className="label action-group">Action Group</div>
                            <div className="value">{serviceOrder.actionGroup}</div>
                        </div>
                        <div className="order-row">
                            <div className="label">Warehouse</div>
                            <div className="value">{serviceOrder.warehouse}</div>
                        </div>
                        <div className="order-row form-inline">
                            <div className="form-group form-inline">
                                <label htmlFor="select-tech" className="label">Technician</label>
                                <select id="select-tech" className="" defaultValue="" disabled={isLoadingTechnicians}>
                                    <option value="">Unassigned</option>
                                    {technicians && technicians.map(technician => <option key={technician.id} value={technician.id} selected={technician.id === serviceOrder.technician.id}>{technician.name}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="divider" />
                        <div className="order-row">
                            <div className="label">Status</div>
                            <div className="value single-line">{serviceOrder.status}</div>
                        </div>
                        <div className="order-row">
                            <div className="label">Equipment</div>
                            <div className="value">{serviceOrder.product}</div>
                        </div>
                        <div className="order-row">
                            <div className="label">Serial Number</div>
                            <div className="value">{serviceOrder.serialNumber}</div>
                        </div>
                        <div className="order-row">
                            <div className="label">Type</div>
                            <div className="value">{serviceOrder.type}</div>
                        </div>
                        <div className="divider" />
                        <div className="label">Materials</div>
                        {serviceOrder.materials && serviceOrder.materials.map(material => (
                            <div className="material" key={uuid()}>
                                <div className="material-partnumber">
                                    {material.sourceDocument ? <Link to={`/Product?id=${material.id}`}>{material.id} </Link> : <span>{material.id}</span>}
                                </div>
                                <div className="material-name">{material.name}</div>
                            </div>
                        ))}
                    </div>
                    <div className="order-col" style={{ flexGrow: "3" }}>
                        <div className="label">Issue</div>
                        <div className="value">{serviceOrder.problem}</div>
                        <div className="order-row">
                            <div className="label">Open Date</div>
                            <div className="value">{moment(serviceOrder.openDate).format('MM/DD/yyyy')}</div>
                        </div>
                        <div className="divider" />

                        <InteractionsView serviceOrder={serviceOrder}/>
                    </div>
                </div>
            )
            }
        </div >
    );
}

export default ServiceOrder;