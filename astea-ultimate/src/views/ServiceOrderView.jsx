import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Col, Container, Dropdown, Row, Spinner, Accordion, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { capitalizeNames } from "../helpers/StringUtils";
import useTechnicians from "../hooks/useTechnicians";
import { getOrderById, loadOrder, retrieveDetails } from "./orderSlice";
import CutoffTester from "../helpers/CutoffTester";
import "./OrderView.css";
import { useEffect } from "react";
import moment from "moment";

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
        <Container fluid className="pt-2 mx-2 sv-view">
            <CutoffTester />

            <Row style={{ textAlign: "left", marginBottom: "14px" }} className="divider">
                <Col>
                    Order {id} {status === "pending" && <FontAwesomeIcon className="fa-spin sv-spinner" icon={faCircleNotch} style={{ position: "absolute" }} />}
                </Col>
                <Col className="d-flex flex-row-reverse mx-4">
                    End
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={6} lg={6} xl={6}>
                    <Card className="mb-4" style={{ minHeight: "10rem", overflow: "visible" }}>
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
                                    <Col sm={6} lg={3} className="label">Action Group</Col>
                                    <Col className="value">{order.actionGroup}</Col>
                                </Row>
                                <Row>
                                    <Col sm={6} lg={3} className="label">Warehouse</Col>
                                    <Col className="value">{order.warehouse}</Col>
                                </Row>
                                <Row>
                                    <Col sm={6} lg={3} className="label">Status</Col>
                                    <Col className="value">{order.status}</Col>
                                </Row>
                                <Row>
                                    {order.tag && <>
                                        <Col sm={6} lg={3} className="label">Tag</Col>
                                        <Col className="value">{order.tag}</Col>
                                    </>
                                    }
                                </Row>
                                <Row className="mt-3 d-flex align-items-center">
                                    <Col sm={6} lg={3} className="label">Technician</Col>
                                    <Col>
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
                                    </Col>
                                </Row>
                                <Row>
                                </Row>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className="mb-4" style={{ minHeight: "8rem" }}>
                        <Card.Body>
                            <Row>
                                <Col sm={6} lg={3} className="label">Equipment</Col>
                                <Col className="value">{order.product}</Col>
                            </Row>
                            <Row>
                                <Col xs={6} lg={3} className="label">Serial Number</Col>
                                <Col className="value">{order.serialNumber}</Col>
                            </Row>
                            <Row>
                                <Col sm={6} lg={3} className="label">Request Type</Col>
                                <Col className="value">{order.type}</Col>
                            </Row>
                            <Row>
                                <Col sm={6} lg={3} className="label">Opened</Col>
                                <Col className="value">{moment(order.openDate).format('MM/DD/yyyy')}</Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    <Card className="mb-4" style={{ minHeight: "8rem" }}>
                        <Card.Body>
                            <Card.Title>
                                <Row>
                                    <Col>Demands</Col>

                                    {materials.status === "pending" &&
                                        <Col className="d-flex flex-row-reverse mx-4"><Spinner animation="border" role="status" /></Col>
                                    }
                                </Row>

                            </Card.Title>
                            <Card.Text>
                                {materials.materials &&
                                    <Table striped bordered hover size="sm">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Description</th>
                                                <th>Price</th>
                                                <th>Is Billable</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[...expenses.expenses, ...materials.materials].map(mat => (
                                                <tr key={mat.id}>
                                                    <td>{mat.id}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                }
                            </Card.Text>
                        </Card.Body>
                    </Card>

                </Col>
                <Col xs={12} md={6} lg={6} xl={6}>
                    <Card className="mb-4" style={{ height: "22rem", overflowY: "auto" }}>
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