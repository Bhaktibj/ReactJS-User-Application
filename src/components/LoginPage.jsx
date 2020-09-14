import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    Button, Form, Label, Input
} from 'reactstrap';

import { userActions } from '../containers/user.actions';


function LoginPage() {
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const { email, password, } = inputs;
    const loggingIn = useSelector(state => state.authentication.loggingIn);
    const dispatch = useDispatch();

    // reset login status
    useEffect(() => {
        dispatch(userActions.logout());
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (email && password) {
            dispatch(userActions.login(email, password));
        }
    }

    return (
    
        <div className="col-lg-8 offset-lg-2">
            <h2>Login</h2>
            <Form name="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <Label>Email</Label>
                    <Input type="email" name="email" value={email} onChange={handleChange} className={'form-control' + (submitted && !email ? ' is-invalid' : '')} />
                    {submitted && !email &&
                        <div className="invalid-feedback">Email is required</div>
                    }
                </div>
                <div className="form-group">
                    <Label>Password</Label>
                    <Input type="password" name="password" value={password} onChange={handleChange} className={'form-control' + (submitted && !password ? ' is-invalid' : '')} />
                    {submitted && !password &&
                        <div className="invalid-feedback">Password is required</div>
                    }
                </div>
                <div className="form-group">
                    <Button className="btn btn-primary">
                        {loggingIn && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Login
                    </Button>
                    <Link to="/register" className="btn btn-link">Register</Link>
                </div>
            </Form>
        </div>
    );
}

 //         <Container>
        //             <Row className="align-items-center">
        //                 <Col sm={{ size: 6, offset: 3 }} className="mt-5">
        //                     <h1>Login</h1>
        //                     <Card>
        //                         <CardBody>
        //                             <Form>
        //                                 <FormGroup>
        //                                     <Label for="exampleEmail">Email</Label>
        //                                     <Input type="email" name="email" id="exampleEmail"
        //                                         placeholder="Enter username"
        //                                         value={email}
        //                                         onChange={handleChange}
        //                                         invalid={!email} />
        //                                     {/* <FormFeedback>{emailError}</FormFeedback> */}
        //                                 </FormGroup>
        //                                 <FormGroup>
        //                                     <Label for="examplePassword">Password</Label>
        //                                     <Input type="password" name="password" id="examplePassword"
        //                                         placeholder="Enter password" value={password}
        //                                         onChange={handleChange}
        //                                         onFocus={email}
        //                                         invalid={(password === '')} />
        //                                     <FormFeedback>Password is required</FormFeedback>
        //                                 </FormGroup>
        //                                 <Button onClick={handleSubmit}>Submit</Button>
        //                             </Form>
        //                         </CardBody>
        //                     </Card>
        //                 </Col>
        //             </Row>
        //         </Container>
        //     );
        // }





export { LoginPage };