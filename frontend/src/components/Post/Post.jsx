import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Grid, TextField } from '@material-ui/core';
import axios from 'axios';
import "./post.css";

const Post = () => {
    const navigate = useNavigate();
    const [post, setPost] = useState();
    const { id, email } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8800/post/${id}/${email}`)
            .then(res => {
                setPost(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const verify = () => {
        axios.post(`http://localhost:8800/verify/${id}/${email}`)
            .then(res => {
                alert(res.data.message);
                navigate("/");
            })
            .catch(err => console.log(err));
    };
    const cancel = () => {
        axios.post(`http://localhost:8800/cancel/${id}/${email}`)
            .then(res => {
                alert(res.data.message);
                navigate("/");
            })
            .catch(err => console.log(err));
    };


    return (
        <>
            <h1>All Details</h1>
            {post && (
                <div className='mainDiv'>
                    <div className='leftDiv'>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <TextField
                                    disabled
                                    variant='outlined'
                                    label="Full Name"
                                    defaultValue={post.name}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    disabled
                                    id="outlined-disabled"
                                    variant='outlined'
                                    label="Birth Date"
                                    defaultValue={post.birthDate}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    disabled
                                    id="outlined-disabled"
                                    variant='outlined'
                                    label="Gender"
                                    defaultValue={post.gender}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    disabled
                                    id="outlined-disabled"
                                    variant='outlined'
                                    label="Father's Name"
                                    defaultValue={post.fathersName}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    disabled
                                    id="outlined-disabled"
                                    variant='outlined'
                                    label="Mother's Name"
                                    defaultValue={post.mothersName}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    disabled
                                    id="outlined-disabled"
                                    variant='outlined'
                                    label="Permanent Address"
                                    defaultValue={post.permanentAddress}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    disabled
                                    id="outlined-disabled"
                                    variant='outlined'
                                    label="Temporary Address"
                                    defaultValue={post.temporaryAddress}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    disabled
                                    id="outlined-disabled"
                                    variant='outlined'
                                    label="Citizenship Number"
                                    defaultValue={post.citizenshipNo}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    disabled
                                    id="outlined-disabled"
                                    variant='outlined'
                                    label="Issue Date"
                                    defaultValue={post.issueDate}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    disabled
                                    id="outlined-disabled"
                                    variant='outlined'
                                    label="Issue At"
                                    defaultValue={post.issueAt}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={4}>
                            </Grid>
                            {post.status === "verified" ? (
                                <>
                                    <Grid item xs={4}>
                                        <button className="buttonForm" style={{ backgroundColor: "green" }} disabled>Already Verified</button>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Link to="/"><button className="buttonForm" style={{ backgroundColor: "#0a009d" }} >Back</button></Link>
                                    </Grid>
                                </>
                            ) : (
                                <>
                                    <Grid item xs={4}>
                                        <button className="buttonForm" style={{ backgroundColor: "green" }} onClick={verify}>Verify</button>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <button className="buttonForm" style={{ backgroundColor: "red" }} onClick={cancel}>Cancel</button>
                                    </Grid>
                                </>
                            )}
                        </Grid>
                    </div>
                    <div className='rightDiv'>
                        <img src={post.image} alt="" height="550px" width="100%" />
                    </div>
                </div>
            )}
        </>
    );
};

export default Post;