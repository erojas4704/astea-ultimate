import moment from "moment";
import { useEffect, useState } from "react";
import { Container, Form, Row, Col, Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateAuditOrder, createNewAudit, resetAudit, addToAudit } from "../actions/audit";
import useSearch from "../hooks/useSearch";
import useScanner from "../hooks/useScanner";
import { findOrderById } from "../helpers/ServiceOrderUtils";
import AuditTableRow from "../components/AuditTableRow";
import { FOUND } from "../actions/auditTypes";
import { sameDay } from "../helpers/DateUtils";

//TODO needs to be simplified
//TODO broke after API update. Needs tests.
export default function ResolvedAuditView() {
    const dispatch = useDispatch();
    const [form, setForm] = useState({ id: "", location: "" });
    const audit = useSelector(state => state.audit);
    const scan = useScanner();

    useEffect(() => {
        if (scan) {
            if (scan.length <= 4)
                setForm(form => ({ ...form, location: scan }));
            else
                dispatch(updateAuditOrder(scan, form.location, audit.name));
        }
    }, [scan, dispatch, form.location]);


    const { data: resolvedOrders, execute: getResolvedOrders, status } = useSearch({
        status: 500,
        actionGroup: "QNTech",
        inHistory: "N"
    }, false);

    useEffect(() => {
        if (!sameDay(audit.date, new Date())) {
            console.log("Audit date is not today. Discarding old audit."); //TODO this makes the audit reset at midnight, which is not ideal.
            getResolvedOrders();
        }
    }, [dispatch, audit.date, getResolvedOrders])

    useEffect(() => {
        if (resolvedOrders)
            dispatch(createNewAudit(resolvedOrders, `Audit_${moment().format("MM/DD/YY")}`));
    }, [resolvedOrders])

    useEffect(() => {
        if (scan) {
            console.log("Scanning for order: " + scan);
            const id = scan;
            if (scan.length <= 4)
                setForm(form => ({ ...form, location: scan }));
            else {
                const location = form.location || "SD";
                //TODO extract method
                if (audit.orders.find(findOrderById(id))) {
                    dispatch(updateAuditOrder(id, location, audit.name, FOUND));
                } else {
                    dispatch(addToAudit(id, location));
                }
            }
        }
    }, [scan, dispatch, form.location]);

    const handleReset = () => {
        dispatch(resetAudit());
        getResolvedOrders();
    }

    const submitForm = (id, location) => {
        if (location === "") location = "SD";
        if (audit.orders.find(findOrderById(id))) {
            dispatch(updateAuditOrder(id, location, audit.name, FOUND));
        } else {
            dispatch(addToAudit(id, location));
        }
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        submitForm(form.id, form.location);
        setForm({ ...form, id: "" });
    }

    return (
        <div className="sv-view" >
            <Container fluid className="my-3">
                <Row>
                    <Form className="form-inline" onSubmit={handleSubmit}>
                        <Row>
                            <Col xs={3} style={{ width: "6rem" }}>
                                <Form.Group controlId="location">
                                    <Form.Control
                                        type="input"
                                        placeholder="Zone"
                                        value={form.location}
                                        onChange={handleChange}
                                        name="location"
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="id">
                                    <Form.Control
                                        type="input"
                                        placeholder="SV Number"
                                        value={form.id}
                                        onChange={handleChange}
                                        name="id"
                                    />
                                </Form.Group>
                            </Col>
                            <Col className="d-flex justify-content-end">
                                <Button variant="primary" type="submit">Add</Button>
                                <Button variant="warning" onClick={handleReset}>Reset</Button>
                            </Col>
                        </Row>
                    </Form>
                </Row>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Customer</th>
                            <th>Technician</th>
                            <th>Location</th>
                            <th>Age</th>
                        </tr>
                    </thead>
                    <tbody>
                        {audit && audit.orders.map(order => <AuditTableRow key={order.id} order={order} />)}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
}
