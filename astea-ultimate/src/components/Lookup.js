import { useState } from "react";

const Lookup = ( {handleSubmit} ) => {
    const [form, setForm] = useState({});

    const updateForm = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const submitForm = e => {
        e.preventDefault();
        handleSubmit(form);
    }

    return (
        <div>
            <form onChange={updateForm} onSubmit={submitForm}>
                <input type="text" name="id" placeholder="Order SV number" />
                <button type="submit">Look up</button>
            </form>
        </div>
    );
};

export default Lookup;