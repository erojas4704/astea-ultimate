import { faBan, faCircleNotch, faDollarSign, faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Col, Container, Dropdown, Row, Spinner, Alert, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { capitalizeNames } from "../helpers/StringUtils";
import useTechnicians from "../hooks/useTechnicians";
import { getOrderById, loadOrder, retrieveDetails } from "./orderSlice";
import CutoffTester from "../helpers/CutoffTester";
import "./OrderView.css";
import { useEffect } from "react";
import moment from "moment";
import Interaction from "../components/Interaction";
import { useContext } from "react";
import { NavContext } from "../App";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { useRef } from "react";

export default function ServiceOrderView() {
    const dispatch = useDispatch();
    const params = useParams();
    const id = params.id;
    const { technicians, isLoadingTechnicians } = useTechnicians();
    const { order: orderData, status, error, interactions, materials, expenses } = useSelector((state) => getOrderById(state, id));
    const interactionsElement = useRef();

    const summary = useSelector(state => state.locator.summaries[id]);

    const { isExpanded: nav } = useContext(NavContext);

    //What if neither the order or the summary is loaded?
    const order = orderData || summary;

    useEffect(() => {
        dispatch(loadOrder({ id, history: summary?.inHistory === "Y" }));
        dispatch(retrieveDetails({ id }));
        interactionsElement.current.scrollTop = interactionsElement.current.scrollHeight;
    }, [id])

    //console.table console.group
    // return (
    //     <div style={{ height: '45vh' }}>
    //         <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
    //             <div style={{ background: '#ffcc00', padding: '5rem', minHeight: '10rem' }}>
    //                 Heading
    //             </div>
    //             <div style={{ flex: 1, overflow: 'auto' }}>
    //                 {"here is my scrollable content".repeat(30000)}
    //             </div>
    //         </div>
    //     </div >
    // )

    if (!order) {
        return (<Container fluid className="m-2">
            {status === "pending" ? <>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </> : (<>
                <h3>404 - Order not found</h3>
                <Alert variant="danger">{error}</Alert>
            </>)}
        </Container>)
    }

    return (
        <Container fluid className="pt-2 px-2 sv-view d-flex flex-column" style={{ overflowX: 'hidden', overflowY: "auto", height: '100vh' }}>
            <Row style={{ textAlign: "left", backgroundColor: 'white' }} className="divider d-flex align-items-end">
                <Col>
                    Order {id} {status === "pending" && <FontAwesomeIcon className="fa-spin sv-spinner" icon={faCircleNotch} style={{ position: "absolute" }} />}
                </Col>
                <Col className="d-flex flex-row-reverse mx-4">
                    End
                </Col>
            </Row>
            <Row className='order-container d-flex flex-row flex-grow-1 pt-3'>
                <Col className="d-flex flex-column" xs={12} md={nav ? 12 : 6} lg={nav ? 12 : 6} xl={6}>
                    <Row>
                        <Col xs={12} xl={nav ? 12 : 6} className="d-flex">
                            <Card className="mb-4" style={{ flexGrow: 1 }}>
                                <Card.Body>
                                    <Card.Title className="customer-name">
                                        <Row>
                                            <Col>{capitalizeNames(order.caller?.name || order.customer?.name || "Customer")}</Col>
                                            {status === "pending" &&
                                                <Col className="d-flex flex-row-reverse mx-4">
                                                    <Spinner animation="border" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </Spinner>
                                                </Col>
                                            }
                                        </Row>
                                    </Card.Title>
                                    <Card.Text>
                                        <Row>
                                            <Col className="label">Action Group</Col>
                                            <Col className="value">{order.actionGroup}</Col>
                                        </Row>
                                        <Row>
                                            <Col className="label">Warehouse</Col>
                                            <Col className="value">{order.warehouse}</Col>
                                        </Row>
                                        <Row>
                                            {order.tag && <>
                                                <Col className="label">Tag</Col>
                                                <Col className="value">{order.tag}</Col>
                                            </>
                                            }
                                        </Row>
                                        <Row>
                                            <Col className="label">Request Type</Col>
                                            <Col className="value">{order.type}</Col>
                                        </Row>
                                        <Row className="mt-3 d-flex align-items-center">
                                            <Col className="label">Technician</Col>
                                            <Col>
                                                {isLoadingTechnicians && <Spinner animation="border" role="status" />}
                                                {technicians &&
                                                    <Dropdown>
                                                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                                            {order.technician?.name || "Select Technician"}
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu style={{ zIndex: "200", position: "relative/absolute" }}>
                                                            {technicians.map(technician => (
                                                                <Dropdown.Item key={technician.id} onClick={() => ""}>{technician.name}</Dropdown.Item>
                                                            ))}
                                                        </Dropdown.Menu>
                                                    </Dropdown>}
                                                {!technicians && !isLoadingTechnicians && <>Error getting data</>}
                                            </Col>
                                        </Row>
                                        <Row>
                                        </Row>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={12} xl={nav ? 12 : 6} className="d-flex">
                            <Card className="mb-4" style={{ flexGrow: 1 }}>
                                <Card.Body>
                                    <Row>
                                        <Col className="label">Equipment</Col>
                                        <Col className="value">{order.product}</Col>
                                    </Row>
                                    <Row>
                                        <Col className="label">Serial Number</Col>
                                        <Col className="value">{order.serialNumber}</Col>
                                    </Row>
                                    <Row>
                                        <Col className="label">Status</Col>
                                        <Col className="value">{order.status}</Col>
                                    </Row>
                                    <Row>
                                        <Col className="label">Opened</Col>
                                        <Col className="value">{moment(order.openDate).format('MM/DD/yyyy')}</Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Card className="mb-4" style={{ minHeight: "8rem", flexGrow: 1 }}>
                        <Card.Body>
                            <Card.Title>
                                <Row>
                                    <Col>Materials</Col>
                                    <Col className="d-flex flex-row-reverse mx-4">
                                        {expenses.status === "pending" ?
                                            <Spinner animation="border" role="status" /> :
                                            <FontAwesomeIcon
                                                icon={faPlus}
                                                color="Gray"
                                                style={{ cursor: 'pointer' }}
                                            />
                                        }
                                    </Col>
                                </Row>
                            </Card.Title>
                            <Card.Text>
                                {materials.materials &&
                                    <Table striped bordered hover size="sm">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Description</th>
                                                <th>Price</th>
                                                <th>Billable</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {materials.materials.map(mat => (
                                                <tr key={mat.id}>
                                                    <td>{mat.id}</td>
                                                    <td>{mat.description}</td>
                                                    <td>{mat.price}</td>
                                                    <td>{mat.isBillable ?
                                                        <FontAwesomeIcon icon={faDollarSign} color="Green" /> :
                                                        <span className="fa-layers fa-fw">
                                                            <FontAwesomeIcon icon={faDollarSign} color="Tomato" />
                                                            <FontAwesomeIcon icon={faBan} color="Tomato" />
                                                        </span>
                                                    }</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                }
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    <Card className="mb-4" style={{ minHeight: "8rem", flexGrow: 1 }}>
                        <Card.Body>
                            <Card.Title>
                                <Row>
                                    <Col>Expenses</Col>
                                    <Col className="d-flex flex-row-reverse mx-4">
                                        {expenses.status === "pending" ?
                                            <Spinner animation="border" role="status" /> :
                                            <FontAwesomeIcon
                                                icon={faPlus}
                                                color="Gray"
                                                style={{ cursor: 'pointer' }}
                                            />
                                        }
                                    </Col>

                                </Row>
                            </Card.Title>
                            <Card.Text>
                                {expenses.expenses &&
                                    <Table striped bordered hover size="sm">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Description</th>
                                                <th>Price</th>
                                                <th>Billable</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {expenses.expenses.map(expense => (
                                                <tr key={expense.id}>
                                                    <td>{expense.id}</td>
                                                    <td>{expense.description}</td>
                                                    <td>{expense.price}</td>
                                                    <td>{expense.isBillable ?
                                                        <FontAwesomeIcon icon={faDollarSign} color="Green" /> :
                                                        <span className="fa-layers fa-fw">
                                                            <FontAwesomeIcon icon={faDollarSign} color="Tomato" />
                                                            <FontAwesomeIcon icon={faBan} color="Tomato" />
                                                        </span>
                                                    }</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                }
                            </Card.Text>
                        </Card.Body>
                    </Card>

                </Col>
                <Col className="d-flex flex-column" xs={12} md={nav ? 12 : 6} lg={nav ? 12 : 6} xl={6}>
                    <Card className="mb-4" style={{ display: 'flex', flexGrow: 1, overflowY: "auto" }}>
                        <Card.Body>
                            <Card.Title className="customer-name row">
                                    Description
                                <div className="d-flex flex-row-reverse mx-4">
                                </div>
                            </Card.Title>
                            <Card.Text className="value">
                                {order.problem}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className="mb-4">
                        <Card.Body style={{ display: 'flex', flexDirection: 'column', height: '45vh', overflow: 'hidden' }}>
                            <Card.Title className="customer-name row  align-items-end">
                                <Col>
                                    Interactions
                                </Col>
                                <Col className="d-flex flex-row-reverse mx-4">
                                    {interactions.status === "pending" ?
                                        <Spinner animation="border" role="status" /> :
                                        <FontAwesomeIcon
                                            icon={faPlus}
                                            color="Gray"
                                            style={{ cursor: 'pointer' }}
                                        />
                                    }
                                </Col>
                            </Card.Title>
                            <Card.Text ref={interactionsElement} className="value" style={{ flex: 1, overflow: 'auto' }}>
                                {interactions.interactions && interactions.interactions.map(interaction => (<>
                                    <Interaction key={interaction.id} interaction={interaction} />
                                </>
                                ))}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}