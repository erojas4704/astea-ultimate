import { Container, Form, InputGroup, Row } from "react-bootstrap";

export default function ResolvedAuditView() {
  return (
    <Container className="m-3">
      <Row>
        <Form>
          <Form.Group controlId="orderNum">
            <Form.Control type="input" placeholder="SV Number" />
          </Form.Group>
          Col
          <Form.Group controlId="location">
            <Form.Control type="input" placeholder="Zone" />
          </Form.Group>
        </Form>
      </Row>
    </Container>
  );
}
