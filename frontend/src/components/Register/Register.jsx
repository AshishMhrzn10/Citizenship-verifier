import React, { useState } from 'react';
import "./register.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const { name, email, password, confirmPassword } = user;
    const handleChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const register = (e) => {
        e.preventDefault();
        if (name && email && password && (password === confirmPassword)) {
            axios.post("http://localhost:8800/register", user)
                .then(res => {
                    alert(res.data.message);
                    navigate("/login");
                })
                .catch(err => console.log(err));
        }
        else {
            alert("Invalid or incomplete details");
        }
    };

    return (
        <div className="register">
            <h1>REGISTER</h1>
            <form className="form">
                <input type="text" name="name" value={name} placeholder="username" className="input" onChange={handleChange} />
                <input type="text" name="email" value={email} placeholder="email" className="input" onChange={handleChange} />
                <input type="password" name="password" value={password} placeholder="password" className="input" onChange={handleChange} />
                <input type="password" name="confirmPassword" value={confirmPassword} placeholder="Confirm password" className="input" onChange={handleChange} />
                <button className="button" onClick={register}>Sign Up</button>
                <Link to="/login">Already logged in?</Link>
            </form>
        </div>
    );
};

export default Register;
