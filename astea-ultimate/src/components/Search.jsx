import { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";

export default function Search({ placeholder, handleSubmit, children, loading, handleChange }) {
    const [searchInput, setSearchInput] = useState('');

    return (<>
        <Form inline className="p-1" onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Control
                    type="text"
                    className="rounded-pill"
                    name="search"
                    id="search"
                    placeholder={placeholder}
                    value={searchInput}
                    disabled={loading}
                    onChange={e => {
                        handleChange(e.target.value);
                        setSearchInput(e.target.value)
                    }}
                />
            </Form.Group>
            {children}
        </Form>
    </>)
}