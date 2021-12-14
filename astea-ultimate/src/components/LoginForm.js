import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const LoginForm = ({ onSubmit, isLoading }) => {
    const [form, setForm] = useState({
        username: "",
        password: ""
    });

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit(form);
    }

    return (
        <div>
            <form className="login-form" onSubmit={handleSubmit} onChange={handleChange} data-testid="login-form">
                <div className="form-group">
                    <label htmlFor="username">Username: </label>
                    <input type="text" name="username" id="username" placeholder="Username" disabled={isLoading}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" id="password" placeholder="password" disabled={isLoading} />
                </div>
                {!isLoading ? <button type="submit">Log in</button> : <FontAwesomeIcon className="fa-spin sv-spinner" icon={faCircleNotch} />}
            </form>
        </div>
    );
}

export default LoginForm;