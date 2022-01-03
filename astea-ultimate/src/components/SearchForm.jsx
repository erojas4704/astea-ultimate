import { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";

export default function SearchForm({ placeholder, handleSubmit, children, loading, handleChange, sidebar }) {
    const [searchInput, setSearchInput] = useState('');

    return (<>
        <Form className="p-1 d-flex" onSubmit={handleSubmit}>
            <Form.Group className="w-100">
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
            {sidebar}
        </Form>
        {children}
    </>)
}