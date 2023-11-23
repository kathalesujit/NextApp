import React, { useState, useEffect } from 'react'
import NavBar from '../Components/NavBar';
import { Card, CardBody, Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import Router from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
// const regForpassword = RegExp(
//     "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
// );
export default function Login(props) {
    const [loginInfo, setLoginInfo] = useState({
        email: "", password: ""
    })
    const [errors, setErrors] = useState({
        email: true, password: true
    })
    useEffect(() => {
        if (sessionStorage.getItem("userdetails")) {
            Router.push('/home')
        }
    }, [])
    const success = (data) => toast.success(data, { position: toast.POSITION.TOP_RIGHT });
    const failure = (data) => toast.error(data, { position: toast.POSITION.TOP_RIGHT });

    // this function is for Validation
    const HandleChange = (event) => {
        const { value, name } = event.target;
        switch (name) {
            case 'email': setLoginInfo({ ...loginInfo, email: value })
                regForEmail.test(value) ? setErrors({ ...errors, email: true }) : setErrors({ ...errors, email: false })
                break;
            case 'password': setLoginInfo({ ...loginInfo, password: value })
                value.length > 4 ? setErrors({ ...errors, password: true }) : setErrors({ ...errors, password: false })
                break;
        }
    }

    // Login functionality with static data
    const HandleLogin = () => {
        if (loginInfo.email == "abc@gmail.com" && loginInfo.password == "12345") {
            sessionStorage.setItem('userdetails', loginInfo.email)
            success('Welcome User')
            Router.push('/home')
        }
        else {
            failure('Invalid Credentials')
            // Router.push("/static")
        }
    }
    return (
        <div>
            <NavBar id={null} path={"/"} />
            <ToastContainer />
            <br /><br /><br />
            <Container>
                <Row>
                    <Col lg={5} className="container">
                        <Card>
                            <h4 style={{ color: '#45474B', textAlign: 'center', paddingTop: '10px' }}>LOGIN</h4>
                            <CardBody>
                                <Form>
                                    <FormGroup>
                                        <Label for="exampleEmail">Email</Label>
                                        <Input
                                            id="exampleEmail"
                                            name="email"
                                            type="email"
                                            onChange={HandleChange}
                                            placeholder="Enter Email"
                                        />
                                        {
                                            errors.email ? "" : <span className='text-danger errmsg'>Enter valid email</span>
                                        }
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="examplePassword">Password</Label>
                                        <Input
                                            id="examplePassword"
                                            name="password"
                                            type="password"
                                            placeholder="Enter Password"
                                            onChange={HandleChange}
                                        />
                                        {
                                            errors.password ? "" : <span className='text-danger errmsg'>Enter valid Password</span>
                                        }
                                    </FormGroup>
                                    <div className='text-center'>
                                        <Button className='btn-sm' color='success' onClick={HandleLogin} data-testid="LoginButton">Login</Button>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

