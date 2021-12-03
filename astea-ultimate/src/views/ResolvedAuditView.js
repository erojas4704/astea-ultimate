import { useEffect, useState } from "react";
import { Container, Form, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { resetSearch, search } from "../actions/locator";

export default function ResolvedAuditView() {
  const orders = useSelector(state => state.locator.data);
  const loading = useSelector(state => state.locator.loading);
  const error = useSelector(state => state.locator.error);

  const dispatch = useDispatch();
  const [form, setForm] = useState({
    id: "",
    location: "",
  });

  useEffect(() => {
    dispatch(resetSearch());
    dispatch(search({
      status: 500,
      actionGroup: "QNTech"
    }, false));
  }, [dispatch]);

  //TODO maybe make a hook that does all the searching and use it in places where this becomes redundant.


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
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer?.name || ""}</td>
              <td>{order.technician?.name || ""}</td>
              <td>{order.location}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
