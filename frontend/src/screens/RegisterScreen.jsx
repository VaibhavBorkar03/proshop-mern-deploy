import React, { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import { Button, Col, Form, FormGroup, Row, Toast } from "react-bootstrap";
import { Link, redirect, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../redux/slices/usersApiSlice";
import Loader from "../components/Loader";
import { toast } from "react-toastify"; // Import toast
// import { setCredentials } from "../redux/slices/authSlice";

function RegisterScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [register, { isLoading }] = useRegisterMutation();
  const search = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect" || "/");

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  const registerHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password do not match");
      return;
    } else {
      try {
        const res = await register({
          name,
          email,
          password,
        }).unwrap();
        // dispatch(setCredentials({ ...res }));
        toast.success(res?.message);
        // navigate(redirect || "/");
        navigate("/login");
      } catch (error) {
        toast.error(error?.data?.message);
      }
    }
  };
  return (
    <FormContainer>
      <h1 className="fw-bold mt-5">Sign Up</h1>
      <Form onSubmit={registerHandler}>
        <FormGroup className="my-3 fw-medium w-75" controlId="name">
          <Form.Label>Enter Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup controlId="email" className="my-3 fw-medium w-75">
          <Form.Label>Enter Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup controlId="password" className="my-3 fw-medium w-75">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword" className="my-3 fw-medium w-75">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Your Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </FormGroup>
        <Button
          className="mt-2"
          type="submit"
          // disabled={isLoading}
          variant="dark"
        >
          Register
        </Button>
        {isLoading && <Loader />}
        <Row className="py-3">
          <Col>
            If you have already account?{" "}
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              Login
            </Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
}

export default RegisterScreen;
