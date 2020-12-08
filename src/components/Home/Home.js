import React, { useEffect, useState } from "react";
import logo from "../../logo.svg";
import "./Home.scss";
import allActions from "../../actions/index";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {API_INSTANCE} from "../../config/connection";
import Device from "../Device/Device";
import DeviceModel from "../Device/DeviceModel";
import Pusher from "pusher-js";

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
  Badge,
} from "react-bootstrap";
import { sortArray } from "../../helpers/common";

function Home() {
  const auth      = useSelector((state) => state.auth);
  const history   = useHistory();
  const dispatch  = useDispatch();
  const deviceObj = useSelector((state) => state.device);
  const devices   = deviceObj.devices;
  const requestObj = useSelector(state => state.requests);
  const myRequests = requestObj.requests;

  const [booking_status, setBookingStatus] = useState('');
  const [modalStatus, setModalStatus] = useState(false);
  const [deviceData, setDeviceData]   = useState([]);
  const [devicesLogs, setDevicesLogs] = useState([]);
  
  useEffect(() => {
    let pusher, channel,channel_user,device_assignment;
    const userId = auth.user.id;
    const initializePusher = async () => {
      // const userId = auth.user.id;
      pusher = new Pusher("3ea5ea66ea7831bc126d", {
        cluster: "ap2",
        encrypted: true,
        // authEndpoint: '/broadcasting/auth',
        authTransport: 'ajax',
        auth: {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${auth.access_token}`
            },
            params: null
        }
      });

      channel = pusher.subscribe("DevicesAvailabilty");
      channel.bind("App\\Events\\DeviceAssignedEvent", (data) => {
        dispatch(allActions.deviceActions.updateDevice(data.device));
      });

      channel_user = pusher.subscribe("user."+ auth.user.id);
      channel_user.bind("App\\Events\\CollectDeviceEvent", (data) => {
        console.log(data.request)
        dispatch(allActions.requestActions.updateRequest(data.request));
      })

      device_assignment = pusher.subscribe("DevicesAssignment");
      device_assignment.bind("App\\Events\\DeviceAssignedEvent", (data) => {
        console.log(data)
        dispatch(allActions.deviceActions.updateDevice(data.device));
        dispatch(allActions.requestActions.updateRequest(data.request));
      })
    };

    async function getAllDevices() {
      await API_INSTANCE.get("/devices")
        .then((device_obj) => {
          dispatch(allActions.deviceActions.fetchDevices(device_obj.data));
        });
    }
    
    getAllDevices();
    getDevicesLogs();
    getMyRequests();
    initializePusher();
    return () => {
      pusher.unsubscribe("DevicesAvailabilty");
      pusher.unsubscribe('User.'+userId);
      pusher.unsubscribe('DevicesAssignment');
    };
  }, []);

  async function getDevicesLogs() {
    await API_INSTANCE.get("/devices-logs")
      .then((log_obj) => {
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
          // delete API_INSTANCE.defaults.headers.common["Authorization"];
        },
        (error) => console.log(error)
      )
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeviceClickEvent = (item) => {
    
    setDeviceData(item);
    setModalStatus(true);
  };

  const handleModalClose = () => {
    setModalStatus(false);
  };

  async function sendDeviceRequest(message) {
    await API_INSTANCE.post(
      "/devices/request",
      { device_id: deviceData.id, request_detail: message }      
    )      
      .then((response) => {
        console.log(response);
        let temp_array = [...myRequests];        
        if(temp_array.length >= 5) {
          temp_array.pop();
        }
        temp_array.push(response);
        dispatch(allActions.requestActions.fetchRequests(sortArray(temp_array)));
        setModalStatus(false);
      }, error => console.log(error.message))
      .catch(error => console.log("In error", error.message));
  }

  const handleSendRequest = (message) => {
    sendDeviceRequest(message);
  };

  async function getMyRequests() {
    await API_INSTANCE.get("/devices/request")
      .then((req_obj) => {   
        dispatch(allActions.requestActions.fetchRequests(req_obj.data));
      });
  }


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
            </Nav>
          </Navbar.Collapse>
          <Nav>
            <Nav.Link onClick={logoutUser}>Logout</Nav.Link>
          </Nav>
        </Navbar>
      </header>
      <Container className="main-container" fluid>
        <Row>
          <Col md={8} className="devices-container">
            <Row>
              {devices.map((item) => {
                return (
                  <Col xs={6} key={item.id}>
                    <Device {...item} device={item} deviceClick={handleDeviceClickEvent} />
                  </Col>
                );
              })}
            </Row>
          </Col>
          <Col md={4} className="logs-container">
            <Tabs
              defaultActiveKey="general"
              id="uncontrolled-tab-example"
              className="nav-justified"
            >
              <Tab eventKey="general" title="General Logs">
                {devicesLogs.map((item, key) => {
                  return (
                    <Card key={item.id} className="mb-2 card-box">
                      <Card.Body>
                        <Card.Subtitle className="mb-2">
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
                {myRequests.map((item) => {
                  let requestStatusClass = "warning";
                  // eslint-disable-next-line default-case
                  switch (item.request_status) {
                    case "PENDING":
                      requestStatusClass = "warning";
                      break;
                    case "PLEASE_COLLECT":
                      requestStatusClass = "success";
                      break;
                    case "APPROVED":
                      requestStatusClass = "primary";
                      break;
                  }
                  return (
                    <Card key={item.id} className="mb-2 card-box">
                      <Card.Body>
                        <Card.Subtitle className="mb-2 text-muted">
                          {item.device.device_name} ({item.device.device_model})
                        </Card.Subtitle>
                        <Card.Text className="mb-0">
                          {item.request_detail}
                        </Card.Text>
                        <Badge variant={requestStatusClass}>
                          {item.request_status}
                        </Badge>
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
        bookingStatus={booking_status}
        {...deviceData}
      />
    </div>
  );
}

export default Home;
