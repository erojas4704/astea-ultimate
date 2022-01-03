import { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";

export default function SearchForm({ placeholder, handleSubmit, children, loading, handleChange, sidebar }) {
    const [form, setForm] = useState({});

    return (<>
        <Form className="p-1 d-flex"
            style={{marginRight: "1rem"}}
            onSubmit={(e) => { e.preventDefault(); handleSubmit(form) }}
            onChange={handleChange}
        >
            <Form.Group className="w-100">
                <Form.Control
                    type="text"
                    className="rounded-pill"
                    name="search"
                    id="search"
                    placeholder={placeholder}
                    value={form.search}
                    disabled={loading}
                    onChange={e => {
                        setForm({ ...form, search: e.target.value });
                    }}
                />
            </Form.Group>
            {sidebar}
        </Form>
        {children} {/* TODO These children will not work with the form! */}
    </>)
}