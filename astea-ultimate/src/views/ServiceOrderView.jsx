import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Col, Container, Dropdown, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { capitalizeNames } from "../helpers/StringUtils";
import useTechnicians from "../hooks/useTechnicians";
import { getOrderById, loadOrder, retrieveDetails } from "./orderSlice";
import CutoffTester from "../helpers/CutoffTester";
import "./OrderView.css";
import { useEffect } from "react";

export default function ServiceOrderView() {
    const dispatch = useDispatch();
    const params = useParams();
    const id = params.id;
    const { technicians, isLoadingTechnicians } = useTechnicians();
    const { order: orderData, status, error, interactions, materials, expenses } = useSelector((state) => getOrderById(state, id));
    const summary = useSelector(state => state.locator.orders[id]);

    const order = orderData || summary;
    
    useEffect(() => {
        dispatch(loadOrder({ id, history: summary?.inHistory === "Y" }));
        dispatch(retrieveDetails({ id }));
    }, [id])


    return (
        <Container fluid className="mt-2 mx-2">
            <CutoffTester />

            <Row style={{ textAlign: "left", marginBottom: "14px" }} className="divider">
                <Col>
                    Order {id} {status === "pending" && <FontAwesomeIcon className="fa-spin sv-spinner" icon={faCircleNotch} />}
                </Col>
                <Col className="d-flex flex-row-reverse mx-4">
                    End
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={6} lg={6} xl={6}>
                    <Card className="mb-4" style={{ height: "12rem", overflow: "visible" }}>
                        <Card.Body>
                            <Card.Title className="customer-name">
                                <Row>
                                    <Col>{capitalizeNames(order.caller?.name || order.customer?.name || "")}</Col>
                                    {status === "pending" &&
                                        <Col className="d-flex flex-row-reverse mx-4"><Spinner animation="border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </Spinner></Col>
                                    }
                                </Row>
                            </Card.Title>
                            <Card.Text>
                                <Row>
                                    <Col sm={6} lg={4} className="label">Action Group</Col>
                                    <Col className="value">{order.actionGroup}</Col>
                                </Row>
                                <Row>
                                    <Col sm={6} lg={4} className="label">Warehouse</Col>
                                    <Col className="value">{order.warehouse}</Col>
                                </Row>
                                <Row>
                                    <Col sm={6} lg={4} className="label">Tag</Col>
                                    <Col className="value">{order.tag}</Col>
                                </Row>
                                <Row>
                                    <Col sm={6} lg={4} className="label">Status</Col>
                                    <Col className="value">{order.status}</Col>
                                </Row>
                                <Row>
                                    {technicians ?
                                        <Dropdown>
                                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                                {order.technician?.name || "Select Technician"}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu style={{ zIndex: "200", position: "relative/absolute" }}>
                                                {technicians.map(technician => (
                                                    <Dropdown.Item key={technician.id} onClick={() => ""}>{technician.name}</Dropdown.Item>
                                                ))}
                                            </Dropdown.Menu>
                                        </Dropdown> :
                                        <Spinner animation="border" role="status" />}
                                </Row>
                                <Row>
                                </Row>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className="mb-4" style={{ height: "8rem", overflowY: "auto" }}>
                        <Card.Body>
                            <Row>
                                <Col sm={6} lg={4} className="label">Equipment</Col>
                                <Col className="value">{order.product}</Col>
                            </Row>
                            <Row>
                                <Col xs={6} lg={4} className="label">Serial Number</Col>
                                <Col className="value">{order.serialNumber}</Col>
                            </Row>
                            <Row>
                                <Col sm={6} lg={4} className="label">Request Type</Col>
                                <Col className="value">{order.type}</Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={6} lg={6} xl={6}>
                    <Card className="mb-4" style={{ height: "19.5rem", overflowY: "auto" }}>
                        <Card.Body>
                            <Card.Title className="customer-name">
                                Description
                            </Card.Title>
                            <Card.Text className="value">
                                {order.problem}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </Container>
    )
}