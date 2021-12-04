import moment from "moment";
import { useState } from "react";
import { Container, Form, Row, Col, Table } from "react-bootstrap";
import { capitalizeNames } from "../helpers/StringUtils";
import useSearch from "../hooks/useSearch";

export default function ResolvedAuditView() {

    //TODO maybe make a hook that does all the searching and use it in places where this becomes redundant.
    const { data: orders } = useSearch({
        status: 500,
        actionGroup: "QNTech",
        includeHistory: false
    });

    const [form, setForm] = useState({
        id: "",
        location: "",
    });


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <Container className="m-3">
            <Row>
                <Form>
                    <Row>
                        <Col xs={3} style={{ width: "6rem" }}>
                            <Form.Group controlId="location">
                                <Form.Control
                                    type="input"
                                    placeholder="Zone"
                                    value={form.location}
                                    onChange={handleChange}
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
                                />
                            </Form.Group>
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
                        <th>Scanned?</th>
                    </tr>
                </thead>
                <tbody>
                    {orders && orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{capitalizeNames(order.caller?.name || "")}</td>
                            <td>{order.technician?.name || ""}</td>
                            <td>{order.location}</td>
                            <td>{moment().diff(order.openDate, "days")}</td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}
