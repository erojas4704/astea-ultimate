import { useState } from "react";
import { Container, Form, Row, Col, Table } from "react-bootstrap";

export default function ResolvedAuditView() {
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
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody></tbody>
      </Table>
    </Container>
  );
}
