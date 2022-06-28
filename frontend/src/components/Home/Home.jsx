import React, { useEffect, useState } from 'react';
import "./home.css";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box, Card, CardMedia, CardContent, CardActions, Grid } from "@material-ui/core";
import Form from '../Form/Form';
import axios from 'axios';

const Home = () => {
    const [allPost, setAllPost] = useState();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("users"));
    const remove = () => {
        localStorage.removeItem('users');
        navigate("/login");
    };
    useEffect(() => {
        if (user.status === "pending" || user.status === "verified") {
            navigate("/status");
        }

        axios.get("http://localhost:8800/posts")
            .then(res => {
                setAllPost(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            KYC Verifier
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Hello, {user.name}
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <Button color="inherit" onClick={remove}>Logout</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            {user.isAdmin ? (
                <Grid container spacing={2} style={{ marginTop: "2rem" }}>
                    {allPost?.map((item) => (
                        <Grid item xs={4} key={item._id}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    component="img"
                                    height="240"
                                    image={item.image}
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {item.name}
                                    </Typography>
                                    <Typography variant="body2" >
                                        {item.email}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Link to={`post/${item._id}/${item.email}`}>Check for details</Link>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <>
                    <Typography variant="h4" style={{ marginTop: "2rem" }}>Submit your Details below:</Typography>
                    <Form />
                </>
            )}
        </>
    );
};

export default Home;
