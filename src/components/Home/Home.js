import React, { useEffect, useState } from "react";
import logo from "../../logo.svg";
import "./Home.scss";
import allActions from "../../actions/index";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import API_INSTANCE from "../../config/connection";
import Device from "../Device/Device";
import DeviceModel from "../Device/DeviceModel";
import Pusher from 'pusher-js';
import pushid from 'pushid';

import {
  Navbar,
  Nav,
  Image,
  Container,
  Row,
  Col,
  Card,
  Tabs,
  Tab,
} from "react-bootstrap";

function Home() {
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();
  const [devices, setDevices] = useState([]);
  const [modalStatus, setModalStatus] = useState(false);
  const [deviceData, setDeviceData] = useState([]);
  const [devicesLogs, setDevicesLogs] = useState([]);

  useEffect(() => {

    const initiazliePusher = () => {
        const pusher = new Pusher('3ea5ea66ea7831bc126d', {
            cluster: 'ap2',
            encrypted: true,
          });
          
          const channel = pusher.subscribe('User.'+auth.user.id);
          console.log(channel)
          channel.bind('DeviceAssignedEvent', data => {
                console.log(data)
          });
    }
    async function getAllDevices() {
      await API_INSTANCE.get("/devices", {
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        },
      })
        .then((resp) => resp.data)
        .then((device_obj) => {
          console.log(device_obj);
          setDevices(device_obj.data);
        });
    }
    API_INSTANCE.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${auth.access_token}`;
    initiazliePusher();
    getAllDevices();
    getDevicesLogs();
  }, []);

  async function getDevicesLogs() {
    await API_INSTANCE.get("/devices-logs", {
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },
    })
      .then((resp) => resp.data)
      .then((log_obj) => {
        console.log(log_obj);
        setDevicesLogs(log_obj.data);
      });
  }

  const logoutUser = async () => {
    await API_INSTANCE.post("/logout")
      .then(
        (resp) => {
          console.log(resp.data);
          dispatch(allActions.authActions.logOut());
          history.replace("/auth/login");
          delete API_INSTANCE.defaults.headers.common["Authorization"];
        },
        (error) => console.log(error)
      )
      .catch((error) => {
        console.log("issue in logout");
        console.log(error);
      });
  };

  const handleDeviceClickEvent = (item) => {
    setDeviceData(item);
    setModalStatus(true);
  };

  const handleModalClose = () => {
    console.log("hi");
    setModalStatus(false);
  };

  async function sendDeviceRequest(message) {
    await API_INSTANCE.post(
      "/devices-request",
      { device_id: deviceData.id, request_detail: message },
      {
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        },
      }
    )
      .then((resp) => resp.data)
      .then((result) => {
        console.log(result);
        // setDevicesLogs(log_obj.data);
        setModalStatus(false);
      });
  }

  const handleSendRequest = (message) => {
    sendDeviceRequest(message);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Navbar bg="dark" expand="lg" variant="dark">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Brand href="#home">
            <Image src={logo} className="app-logo" alt="logo" />
          </Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link>Home</Nav.Link>
              {/* <Nav.Link>My Requests</Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
          <Nav>
            <Nav.Link onClick={logoutUser}>Logout</Nav.Link>
          </Nav>
        </Navbar>
      </header>
      <Container className="pt-5" fluid>
        <Row>
          <Col md={8}>
            <Row>
              {devices.map((item) => {
                return (
                  <Col xs={6} key={item.id}>
                    <Device {...item} deviceClick={handleDeviceClickEvent} />
                  </Col>
                );
              })}
            </Row>
          </Col>
          <Col md={4}>
            <Tabs defaultActiveKey="general" id="uncontrolled-tab-example">
              <Tab eventKey="general" title="General Logs">
                {devicesLogs.map((item) => {
                  return (
                    <Card key={item.id} className="mb-2">
                      <Card.Body>
                        <Card.Subtitle className="mb-2 text-muted">
                          {item.devices.device_name} (
                          {item.devices.device_model})
                        </Card.Subtitle>
                        <Card.Text>{item.log_detail}</Card.Text>
                      </Card.Body>
                    </Card>
                  );
                })}
              </Tab>
              <Tab eventKey="my_requests" title="My Requests">
                {devicesLogs.map((item) => {
                  return (
                    <Card key={item.id} className="mb-2">
                      <Card.Body>
                        <Card.Subtitle className="mb-2 text-muted">
                          {item.devices.device_name} (
                          {item.devices.device_model})
                        </Card.Subtitle>
                        <Card.Text>{item.log_detail}</Card.Text>
                      </Card.Body>
                    </Card>
                  );
                })}
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
      <DeviceModel
        setShow={modalStatus}
        modalClose={handleModalClose}
        sendRequest={handleSendRequest}
        {...deviceData}
      />
    </div>
  );
}

export default Home;
