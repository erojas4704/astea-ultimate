import { Card, Spinner } from "react-bootstrap";

export default function ExpensesView({ expensesData }) {

    console.log(expensesData);
    return (<>
        
        <Card>
            <Card.Body>
                <Card.Title className="customer-name">
                    Expenses
                    {expensesData.status === "pending" &&
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    }
                </Card.Title>

            </Card.Body>
        </Card>
    </>
    )
}