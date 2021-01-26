
import React, { useEffect, useState } from "react";
import "./Home.scss";
import allActions from "../../actions/index";
import { useDispatch, useSelector, connect } from "react-redux";
import { API_INSTANCE } from "../../config/connection";
import Device from "../Device/Device";
import DeviceModel from "../Device/DeviceModel";
import Pusher from "pusher-js";


import {  
  Card,
  Tabs,
  Tab,  
} from "react-bootstrap";
import { sortArray } from "../../helpers/common";
import MyRequests from "./MyRequests";

function Home(props) {
  
  useEffect(() => {
    let pusher, channel, channel_user, device_assignment;
    const userId = auth.user.id;
    const initializePusher = async () => {
      // const userId = auth.user.id;
      pusher = new Pusher("3ea5ea66ea7831bc126d", {
        cluster: "ap2",
        encrypted: true,
        // authEndpoint: '/broadcasting/auth',
        authTransport: "ajax",
        auth: {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${auth.access_token}`,
          },
          params: null,
        },
      });

      channel = pusher.subscribe("DevicesAvailabilty");
      channel.bind("App\\Events\\DeviceAssignedEvent", (data) => {
        dispatch(allActions.deviceActions.updateDevice(data.device));
      });

      channel_user = pusher.subscribe("user." + auth.user.id);
      channel_user.bind("App\\Events\\CollectDeviceEvent", (data) => {
        console.log(data.request);
        dispatch(allActions.requestActions.updateRequest(data.request));
      });

      device_assignment = pusher.subscribe("DevicesAssignment");
      device_assignment.bind("App\\Events\\DeviceAssignedEvent", (data) => {
        console.log(data);
        dispatch(allActions.deviceActions.updateDevice(data.device));
        dispatch(allActions.requestActions.updateRequest(data.request));
      });
    };

    
    props.doGetDevices();
    // getDevicesLogs();
    // getMyRequests();
    initializePusher();
    return () => {
      pusher.unsubscribe("DevicesAvailabilty");
      pusher.unsubscribe("User." + userId);
      pusher.unsubscribe("DevicesAssignment");
    };
  }, []);

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();  
  const devices = props.devices.devices;
  const requestObj = useSelector((state) => state.requests);
  const myRequests = requestObj.requests;
  const [booking_status, setBookingStatus] = useState("");
  const [modalStatus, setModalStatus] = useState(false);
  const [deviceData, setDeviceData] = useState([]);
  const [devicesLogs, setDevicesLogs] = useState([]);

  async function getDevicesLogs() {
    await API_INSTANCE.get("/devices-logs").then((log_obj) => {
      setDevicesLogs(log_obj.data);
    });
  }

  const handleDeviceClickEvent = (item) => {
    setDeviceData(item);
    setModalStatus(true);
  };

  const handleModalClose = () => {
    setModalStatus(false);
  };

  async function sendDeviceRequest(message) {
    await API_INSTANCE.post("/devices/request", {
      device_id: deviceData.id,
      request_detail: message,
    })
      .then(
        (response) => {
          console.log(response);
          let temp_array = [...myRequests];
          if (temp_array.length >= 5) {
            temp_array.pop();
          }
          temp_array.push(response);
          dispatch(
            allActions.requestActions.fetchRequests(sortArray(temp_array))
          );
          setModalStatus(false);
        },
        (error) => console.log(error.message)
      )
      .catch((error) => console.log("In error", error.message));
  }

  const handleSendRequest = (message) => {
    sendDeviceRequest(message);
  };

  async function getMyRequests() {
    await API_INSTANCE.get("/devices/request").then((req_obj) => {
      dispatch(allActions.requestActions.fetchRequests(req_obj.data));
    });
  }

  
  return (
    <div className="App">
      <header className="App-header">
        <a href="#" onClick={props.doUserLogout}>
          <i className="fas fa-power-off"></i>
        </a>
      </header>
      <div className="main-container">
        <div className="devices-container">
          {devices.map((item) => {            
             return(
              <Device
                key={item.id}
                {...item}
                device={item}
                deviceClick={handleDeviceClickEvent}
              />
            );
          })}
        </div>
        <div className="logs-container">
          <Tabs
            defaultActiveKey="general"
            id="uncontrolled-tab-example"
            className="nav-justified"
          >
            <Tab eventKey="general" title="General Logs">
              {devicesLogs.forEach((item, key) => {
                return (
                  <Card key={item.id} className="mb-2 card-box">
                    <Card.Body>
                      <Card.Subtitle className="mb-2">
                        {item.devices.device_name} ({item.devices.device_model})
                      </Card.Subtitle>
                      <Card.Text>{item.log_detail}</Card.Text>
                    </Card.Body>
                  </Card>
                );
              })}
            </Tab>
            <Tab eventKey="my_requests" title="My Requests">
              <MyRequests requests={myRequests} />
            </Tab>
          </Tabs>
        </div>
      </div>
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

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    devices: state.devices
  };
};
export default connect(mapStateToProps, { ...allActions.authActions, ...allActions.deviceActions })(Home);
