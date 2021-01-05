import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import allActions from "../../../actions/index";
import { useHistory } from "react-router-dom";
import { API_INSTANCE } from "../../../config/connection";
import "./Login.scss";
import {
  Container,
  Row,
  Col,
  Image,
  Alert,
  Card,
  Button,
  Form,
} from "react-bootstrap";

function Login(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.is_logged_in);
  const objUser = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [formErrors, setErrors] = useState({});
  const formError = checkIfErrorExits(objUser);

  const handleInputChange = (event) => {
    if (event.target.name === "email") {
      setEmail(event.target.value);
    } else if (event.target.name === "password") {
      setPassword(event.target.value);
    }
  };

  useEffect(() => {
    const resetInputFields = () => {
      setEmail("");
      setPassword("");
    };
    resetInputFields();
    if(isAuth){
      history.replace("/dashboard");
    }
    
  }, [isAuth]);

  useEffect(() => {
    return function cleanup() {
      setErrors({});
      setEmail("");
      setPassword("");
    };
    // eslint-disable-next-line
  }, []);

  const handleLoginAction = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    setValidated(true);

    props.doUserLogin(email, password);
  };

  /**
   *
   * @param {string} uemail | user email address
   * @param {string} upassword | user password
   */
  // const doUserLogin = async (uemail, upassword) => {
  //   await API_INSTANCE.post("/auth/login", {
  //     email: uemail,
  //     password: upassword,
  //   })
  //     .then((resp) => {
  //       dispatch(
  //         allActions.authActions.loginSuccess({
  //           user: resp.user,
  //           access_token: resp.access_token,
  //         })
  //       );

  //       history.replace("/dashboard");
  //     })
  //     .catch((error) => {
  //       // validation error
  //       if (error.message === "Network Error") {
  //         alert("Network error detected.");
  //       } else if (error?.response?.status === 422) {
  //         handleServerRespError(error?.response?.data.errors);
  //         dispatch(
  //           allActions.authActions.loginError(error?.response?.data.message)
  //         );
  //       } else {
  //         dispatch(allActions.authActions.loginError(error?.message));
  //       }
  //     });
  // };

  /**
   *
   * @param {array} errors object array
   */
  const handleServerRespError = (errors) => {
    let tempError = {};

    if (errors?.email) {
      tempError.email = {
        content: errors.email[0],
        pointing: "below",
      };
    }

    if (errors?.password) {
      tempError.password = {
        content: errors.password[0],
        pointing: "below",
      };
    }
    setErrors(tempError);
    tempError = [];
  };

  return (
    <Container className="text-center">
      <Row className="row-box align-items-center">
        <Col>
          <Image
            className="app-logo"
            src={require("../../../assets/logo.png")}
          />
          <h5 className="mb-4">Log-in to your account</h5>
          <Card className="auth-card shadow">
            <Card.Body>
              {formError}
              <Form
                noValidate
                className="text-left"
                validated={validated}
                onSubmit={handleLoginAction}
              >
                <Form.Group controlId="email">
                  <Form.Control
                    required
                    type="email"
                    defaultValue={email}
                    placeholder="Enter email"
                    onChange={handleInputChange}
                    name="email"
                    error={formErrors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter valid email.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Control
                    required
                    type="password"
                    defaultValue={password}
                    placeholder="Password"
                    onChange={handleInputChange}
                    name="password"
                    error={formErrors.password}
                  />
                </Form.Group>
                <Button variant="success" type="submit" block>
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

function checkIfErrorExits(props) {
  return (
    props &&
    props?.hasError && (
      <Alert variant="danger">Ops Error....! {props.lastError}</Alert>
    )
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}
export default connect(mapStateToProps, {...allActions.authActions})(Login);
