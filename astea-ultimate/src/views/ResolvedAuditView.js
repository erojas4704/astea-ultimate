import moment from "moment";
import { useEffect, useState } from "react";
import { Container, Form, Row, Col, Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToAudit } from "../actions/audit";
import { capitalizeNames } from "../helpers/StringUtils";
import { getPureId } from "../helpers/ServiceOrderUtils";
import useSearch from "../hooks/useSearch";
import useKey from "../hooks/useKey";
import useScanner from "../hooks/useScanner";


const findOrderById = id => {
    //Returns a callback to be used by array.find
    //Removes all whitespace and finds by the digits preceeding the '@@' symbol.
    id = getPureId(id);
    console.log(id);
    return order => {
        return getPureId(order.id) === id;
    }
}

//TODO needs to be simplified
export default function ResolvedAuditView() {
    const dispatch = useDispatch();
    const currentAudit = useSelector(state => state.audit);
    const [form, setForm] = useState({ id: "", location: "" });
    const scan = useScanner();

    useEffect(() => {
        if (scan)
            submitAudit(scan, form.location);
    }, [scan]);

    const { data: orders } = useSearch({
        status: 500,
        actionGroup: "QNTech",
        includeHistory: false
    });

    const submitAudit = (id, location) => {
        const order = orders.find(findOrderById(id));
        if (location === "") location = "~";

        if (order) {
            dispatch(addToAudit(order, location));
        } else {
            alert(`Order ${id} not found`);
        }

    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        submitAudit(form.id, form.location);
        setForm({ ...form, id: "" });
    }

    return (
        <Container className="m-3">
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
                        <Col className="d-flex justify-content-end"><Button variant="primary" type="submit">Add</Button></Col>
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
                    {orders && orders.map(order => {
                        const audit = currentAudit.orders[order.id];

                        return (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{capitalizeNames(order.caller?.name || "")}</td>
                                <td>{order.technician?.name || ""}</td>
                                <td>{"" || audit?.location}</td>
                                <td>{moment().diff(order.openDate, "days")}</td>
                                <td></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </Container>
    );
}
