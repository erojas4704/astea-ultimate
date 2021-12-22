import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./OrderView.css";
import moment from "moment";
import { useParams } from "react-router-dom";
import { capitalizeNames } from "../helpers/StringUtils";
import useTechnicians from "../hooks/useTechnicians";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import InteractionsView from "./InteractionsView";
import MaterialsView from "./MaterialsView";
import LoadingSpinner from "../components/LoadingSpinner";
import useAsync from "../hooks/useAsync";
import Api from "../api";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadOrder, getOrderById, assignTechnician } from "./orderSlice";

const ServiceOrder = (props) => {
    const dispatch = useDispatch();
    const params = useParams();
    const id = params.id;
    const { technicians, isLoadingTechnicians } = useTechnicians();
    const { order, status, error } = useSelector((state) => getOrderById(state, id));
    const summary = useSelector(state => state.locator.orders[id]);

    //TEMPORARY HACK because these states are immutable and can't be updated. Once we have
    //interactions and materials properly implemented, we can remove this.
    const serviceOrder = order ? { ...order } : summary;
    const isLoading = status === "pending";

    useEffect(() => {
        dispatch(loadOrder({ id }));
    }, [id])


    const handleTechnicianChange = (event) => {
        const technicianId = event.target.value;
        dispatch(assignTechnician({ id, technicianId }));
    }

    return (
        <div className="sv-view" style={{ paddingTop: "14px" }}>
            <div style={{ textAlign: "left", marginLeft: '4px', marginBottom: "14px" }} className="divider">Order {id} {isLoading && <FontAwesomeIcon className="fa-spin sv-spinner" icon={faCircleNotch} />}</div>
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
                                {serviceOrder.technician?.status === "pending" && <LoadingSpinner variant="warning" />}
                                {technicians ?
                                    <select id="select-tech" onChange={handleTechnicianChange} value={serviceOrder.technician?.id || ""} className="" defaultValue="" disabled={isLoadingTechnicians}>
                                        <option value="">Unassigned</option>
                                        {technicians.map(technician => <option key={technician.id} value={technician.id}>{technician.name}</option>)}
                                    </select> :
                                    <LoadingSpinner />}

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
                        <MaterialsView serviceOrder={serviceOrder} />
                    </div>
                    <div className="order-col" style={{ flexGrow: "3" }}>
                        <div className="label">Description</div>
                        <div className="value">
                            {serviceOrder.problem}
                            {serviceOrder.problem?.length <= 60 && <>...</>}
                        </div>
                        <div className="order-row">
                            <div className="label">Open Date</div>
                            <div className="value">{moment(serviceOrder.openDate).format('MM/DD/yyyy')}</div>
                        </div>
                        <div className="divider" />
                        <InteractionsView serviceOrder={serviceOrder} />
                    </div>
                </div>
            )
            }
        </div >
    );
}

export default ServiceOrder;