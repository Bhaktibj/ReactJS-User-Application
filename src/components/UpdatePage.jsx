import React, { useState, useEffect, useReducer } from "react";
import { userService } from '../services/user.service';
import { updateuser, initialState } from "../reducers/update.reducer";
import { Link } from 'react-router-dom';
import * as Yup from "yup";
import { history } from '../helpers';
// import { Card, TextField, CardContent, Button } from "@material-ui/core";
import {
  Card, Col, Button,
  Form, FormGroup, Label, Input,
  FormText, Container, FormFeedback, Row, CardBody
} from 'reactstrap';

import {
  setFirstname,
  setLastname,
  setPhoneNumber,
  setEmail,
  setPassword,
  setFirstnameError,
  setLastnameError,
  setPhoneNumberError,
  setId

} from "../actions/Updateuser";
const UpdatePage = (props) => {
  const [state, dispatch] = useReducer(updateuser, initialState);

  const {
    id,
    first_name,
    last_name,
    email,
    phone_number,
    password,
    first_name_error,
    last_name_error,
    phone_number_error
  } = state;

  initialState.id = props.match.params.id;
  console.log("Edit user", state);
  const handleChange = (event) => {
    dispatch({
      type: `SET_${event.target.name.toUpperCase()}`,
      payload: event.target.value,
    });
  };

  useEffect(() => {
    showUser();
  }, []);


  const showUser = () => {
    console.log("hello");
    console.log(id);
    let userId = state.id;
    console.log("userId", state.id);
    userService.getById(userId).then((response) => {
      console.log("Responsse", response);
      dispatch(setId(response.data.id));
      dispatch(setFirstname(response.data.first_name));
      dispatch(setLastname(response.data.last_name));
      dispatch(setEmail(response.data.email));
      dispatch(setPassword(response.data.password));
      dispatch(setPhoneNumber(response.data.phone_number));
    });
  };

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("First Name is Required"),
    last_name: Yup.string().required("last Name is Required"),
    phone_number: Yup.string().required("phone Name is Required"),
  });

  const updateUsers = () => {
    validationSchema
      .validate({ first_name, phone_number, last_name }, { abortEarly: false })
      .then(() => {
        let user = {};
        // var token = localStorage.getItem("token");
        user.id = id;
        console.log("user.id", user.id)
        user.first_name = first_name;
        user.last_name = last_name;
        user.email = email;
        user.password = password;
        user.phone_number = phone_number;
        console.log(user);
        userService.updateUser(user.id, user)
          .then((response) => {
            console.log(response);
            alert(response.message);
            history.push(`/get/${id}`);
          })
          .catch((error) => {
            console.log("Error", error.message);
            console.log(
              error.response.message,
              "User Registration failed"
            );
            alert(error.response.message);
          });
      })
      .catch((error) => {
        error.inner.forEach((element) => {
          if (element.path === "first_name") {
            dispatch(setFirstnameError(element.message));
            console.log(element.message);
          }
          if (element.path === "phone_number") {
            dispatch(setPhoneNumberError(element.message));
            console.log(element.message);
          }
          if (element.path === "last_name") {
            dispatch(setLastnameError(element.message));
            console.log(element.message);
          }
        });
      });
  };
  return (
    <div className="col-lg-8 offset-lg-2">
      <h2>Update</h2>
      <Form>
        <FormGroup>
          <Label for="exampleFirstname">First Name</Label>
          <Input type="text" name="first_name" id="exampleFirstname"
            placeholder="First Name"
            value={first_name}
            onChange={handleChange}
            invalid={!first_name} />
          <FormFeedback>{first_name_error}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="exampleLastname">Last Name</Label>
          <Input type="text" name="last_name" id="exampleLastname"
            placeholder="Last Name "
            value={last_name}
            onChange={handleChange}
            invalid={!last_name} />
          <FormFeedback>{last_name_error}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="examplePhone">Phone Number</Label>
          <Input type="phone" name="phone_number" id="examplePhone"
            placeholder="Enter Phone"
            value={phone_number}
            onChange={handleChange}
            invalid={!phone_number} />
          <FormFeedback>{phone_number_error}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input type="email" name="email" id="exampleEmail"
            placeholder="Enter username"
            value={email}
            onChange={handleChange}
            invalid={!email} />
          {/* <FormFeedback>{emailError}</FormFeedback> */}
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input type="password" name="password" id="examplePassword"
            placeholder="Enter password" value={password}
            onChange={handleChange}
            onFocus={email}
            invalid={(password === '')} />
          <FormFeedback>Password is required</FormFeedback>
        </FormGroup>
        <Button onClick={() => updateUsers()} position="end">Update</Button>
        <Link to={`/get/${id}`} className="btn btn-link">Cancel</Link> 
      </Form>
    </div>
  );
}
export { UpdatePage };