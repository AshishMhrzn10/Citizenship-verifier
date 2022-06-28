import { Container, Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./form.css";
import FileBase from 'react-file-base64';
import axios from 'axios';

const Form = () => {
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({
        name: "",
        email: JSON.parse(localStorage.getItem("users")).email,
        gender: "male",
        permanentAddress: "",
        temporaryAddress: "",
        birthDate: "",
        fathersName: "",
        mothersName: "",
        citizenshipNo: "",
        issueDate: "",
        issueAt: "",
        image: "",
    });
    const { name, email, gender, permanentAddress, temporaryAddress, birthDate, fathersName, mothersName, citizenshipNo, issueDate, issueAt, image } = userInfo;
    const handleChange = e => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };
    const handleSelectChange = () => {
        var select = document.getElementById('gender');
        var option = select.options[select.selectedIndex];
        setUserInfo({ ...userInfo, gender: option.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && email && permanentAddress && temporaryAddress && birthDate && fathersName && mothersName && citizenshipNo && issueDate && issueAt && image) {
            axios.post("http://localhost:8800/submitInfo", userInfo)
                .then(res => {
                    alert(res.data.message);
                    localStorage.removeItem('users');
                    navigate("/login");
                })
                .catch(err => console.log(err));
        }
        else {
            alert("Invalid or incomplete details");
        }
    };

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <input type="text" name="name" value={name} placeholder="Full Name" className='inputForm' onChange={handleChange} />
                </Grid>
                <Grid item xs={4}>
                    <input type="text" name="birthDate" value={birthDate} placeholder="Birth Date" className="inputForm" onChange={handleChange} />
                </Grid>
                <Grid item xs={4}>
                    <label>Gender: </label>
                    <select
                        id="gender"
                        onChange={handleSelectChange}
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="others">Others</option>
                    </select>
                </Grid>
                <Grid item xs={6}>
                    <input type="text" name="fathersName" value={fathersName} placeholder="Father's Name" className="inputForm" onChange={handleChange} />
                </Grid>
                <Grid item xs={6}>
                    <input type="text" name="mothersName" value={mothersName} placeholder="Mother's Name" className="inputForm" onChange={handleChange} />
                </Grid>
                <Grid item xs={4}>
                    <input type="text" name="permanentAddress" value={permanentAddress} placeholder="Permanent Address" className="inputForm" onChange={handleChange} />
                </Grid>
                <Grid item xs={4}>
                    <input type="text" name="temporaryAddress" value={temporaryAddress} placeholder="Temporary Address" className="inputForm" onChange={handleChange} />
                </Grid>
                <Grid item xs={8}>
                    <input type="text" name="citizenshipNo" value={citizenshipNo} placeholder="Citizenship Number" className="inputForm" onChange={handleChange} />
                </Grid>
                <Grid item xs={8}>
                    <input type="text" name="issueDate" value={issueDate} placeholder="Issue Date" className="inputForm" onChange={handleChange} />
                </Grid>
                <Grid item xs={8}>
                    <input type="text" name="issueAt" value={issueAt} placeholder="Issued At" className="inputForm" onChange={handleChange} />
                </Grid>
                <Grid item xs={8}>
                    <Typography style={{ marginTop: "1rem" }} variant="h6">Upload citizenship image:</Typography>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => setUserInfo({ ...userInfo, image: base64 })}
                    />
                </Grid>
                <button className="buttonForm" onClick={handleSubmit}>Submit</button>
            </Grid>
        </Container>
    );
};

export default Form;