import React, { useContext, useState } from "react";
import { Col, Container, Form, Row, Button, Spinner } from "react-bootstrap";
import { useLoginUserMutation } from "../services/appApi";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { AppContext } from "../context/appContext";

function Login() {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate();
    const { socket } = useContext(AppContext);
    const [loginUser, { isLoading, error }] = useLoginUserMutation();
    function handlelogin(e) {
        e.preventDefault();
        // login logic
        loginUser({ email, password }).then(({ data }) => {
            if (data) {
                // socket work
                socket.emit("new-user");
                // navigate to the chat
                navigate("/chat");
            }
        });
    }

    return (
        <Row style={{width:"100%"}}>
        <Col md={6} className="login_bg"></Col>
        <Col md={6} className="d-flex align-items-center justify-content-center flex-direction-column">
    <div className="cc">
        <Form style={{width: "70%" , maxWidth:500 ,marginLeft:"50px" , marginTop:"10px"}} onSubmit={handlelogin}>
<Form.Group className="mb-3" controlId="formBasicEmail">
  <Form.Label>Email address</Form.Label>
  <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setemail(e.target.value)} value={email} />
  <Form.Text className="text-muted">
    We'll never share your email with anyone else.
  </Form.Text>
</Form.Group>

<Form.Group className="mb-3" controlId="formBasicPassword">
  <Form.Label>Password</Form.Label>
  <Form.Control type="password" placeholder="Password" onChange={(e)=>setpassword(e.target.value)} value={password} />
</Form.Group>

<Button variant="primary" type="submit">
 Login
</Button>
<div className="py-4">
    <p className='text-center'>
        Don't have any account ? <Link to="/signup">Signup</Link>
    </p>
</div>
</Form>
</div>
</Col>
    </Row>

    );
}

export default Login;
