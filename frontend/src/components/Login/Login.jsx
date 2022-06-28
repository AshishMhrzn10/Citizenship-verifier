import React, { useState } from 'react';
import "./login.css";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const Login = ({ }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const { email, password } = user;
    const handleChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const login = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8800/login", user)
            .then(res => {
                alert(res.data.message);
                localStorage.setItem('users', JSON.stringify(res.data.user));
                if (res.data.user) {
                    navigate("/");
                    window.location.reload();
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="login">
            <h1>SIGN IN</h1>
            <form className="form">
                <input type="text" name="email" value={email} placeholder="email" className="input" onChange={handleChange} />
                <input type="password" name="password" value={password} placeholder="password" className="input" onChange={handleChange} />
                <button className="button" onClick={login}>LOGIN</button>
                <Link to="/register">CREATE A NEW ACCOUNT</Link>
            </form>
        </div>
    );
};

export default Login;
