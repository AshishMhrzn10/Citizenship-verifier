import { Button, Typography } from '@material-ui/core';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Status = () => {
    const navigate = useNavigate();
    const remove = () => {
        localStorage.removeItem('users');
        navigate("/login");
    };
    const status = JSON.parse(localStorage.getItem("users")).status;
    return (
        <>
            {status === "pending" && (
                <Typography variant='h1' style={{ color: "red" }}>Your status is in pending mode. Please wait for verification.</Typography>
            )}

            {status === "verified" && (
                <Typography variant='h1' style={{ color: "green" }}>Your KYC is already verified. Thanks.</Typography>
            )}

            <Button color="primary" onClick={remove} style={{ backgroundColor: "#bac2ff" }}>Logout</Button>
        </>
    );
};

export default Status;